import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

type CheckoutType =
  | "telefonica_acconto"
  | "scritta_acconto"
  | "scritta_saldo"
  | "telefonica_saldo";

const DOMAIN = "https://www.websuccessioni.it";
const CONSULENZA_URL = `${DOMAIN}/consulenza-giuridica`;

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const type = payload?.type as CheckoutType | undefined;

    const prices: Record<CheckoutType, number> = {
      telefonica_acconto: 1500, // €15.00
      telefonica_saldo: 3400, // €34.00
      scritta_acconto: 2500, // €25.00
      scritta_saldo: 4500, // €45.00
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "paypal"],
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore interno del server" }),
    };
  }
};

export { handler };

