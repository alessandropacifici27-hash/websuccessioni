import type { Handler } from "@netlify/functions";
import Stripe from "stripe";
import nodemailer from "nodemailer";

type CheckoutType =
  | "telefonica_acconto"
  | "scritta_acconto"
  | "scritta_saldo"
  | "telefonica_saldo";

const DOMAIN = "https://www.websuccessioni.it";
const CONSULENZA_URL = `${DOMAIN}/consulenza-giuridica`;

const sendConsulenzaEmail = async (data: {
  nome: string;
  email: string;
  telefono: string;
  area: string;
  messaggio: string;
  documenti?: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.it",
    port: 465,
    secure: true,
    auth: {
      user: process.env.IONOS_EMAIL,
      pass: process.env.IONOS_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"WebSuccessioni" <info@websuccessioni.it>',
    to: "info@websuccessioni.it",
    subject: `Nuova richiesta consulenza scritta — ${data.nome}`,
    html: `
      <h2 style="color:#1a1a1a;">
        Nuova richiesta consulenza giuridica scritta
      </h2>
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefono:</strong> ${data.telefono}</p>
      <p><strong>Area del diritto:</strong> ${data.area}</p>
      <p><strong>Descrizione caso:</strong><br/>
        ${data.messaggio}</p>
      <p><strong>Documenti caricati:</strong> 
        ${data.documenti || "Nessuno"}</p>
      <hr/>
      <p style="color:#888;font-size:12px;">
        Email generata automaticamente da WebSuccessioni
      </p>
    `,
  });
};

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const requestBody = JSON.parse(event.body || "{}");
    const type = requestBody?.type as CheckoutType | undefined;

    const prices: Record<CheckoutType, number> = {
      telefonica_acconto: 1500, // €15.00
      telefonica_saldo: 3400, // €34.00
      scritta_acconto: 2500, // €25.00
      scritta_saldo: 4400, // €44.00
    };

    const labels: Record<CheckoutType, string> = {
      telefonica_acconto: "Consulenza Telefonica — Acconto prenotazione",
      telefonica_saldo: "Consulenza Telefonica — Saldo al termine della chiamata",
      scritta_acconto: "Consulenza Scritta — Acconto",
      scritta_saldo: "Consulenza Scritta — Saldo",
    };

    if (!type || !(type in prices)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Tipo non valido" }) };
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "STRIPE_SECRET_KEY mancante" }) };
    }

    const stripe = new Stripe(stripeSecretKey);

    const success_url =
      type === "telefonica_acconto"
        ? `${CONSULENZA_URL}?success=telefonica`
        : type === "scritta_acconto"
          ? `${CONSULENZA_URL}?success=scritta_acconto`
          : `${CONSULENZA_URL}?success=saldo_pagato`;

    if (requestBody.type === "scritta_acconto") {
      try {
        await sendConsulenzaEmail({
          nome: requestBody.nome || "",
          email: requestBody.email || "",
          telefono: requestBody.telefono || "",
          area: requestBody.area || "",
          messaggio: requestBody.messaggio || "",
          documenti: requestBody.documenti || "",
        });
      } catch (emailError) {
        console.error("Nodemailer error:", emailError);
        // Non bloccare il pagamento se email fallisce
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal", "klarna"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: labels[type] },
            unit_amount: prices[type],
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url,
      cancel_url: CONSULENZA_URL,
    });

    if (!session.url) {
      return { statusCode: 500, body: JSON.stringify({ error: "URL sessione Stripe mancante" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Errore interno del server";
    console.error("Stripe error:", errorMessage);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };

