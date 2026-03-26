import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Check, CheckCircle2, Send } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

import { Briefcase, FileText, Scale } from "lucide-react";

type SuccessType = "telefonica" | "scritta_acconto" | "saldo_pagato" | null;
type UploadFile = { name: string; url: string };

const EMAILJS_SERVICE_ID = "service_i1pju5e";
const EMAILJS_PUBLIC_KEY = "qFsjEtnqQNDnN5WlA";
const EMAILJS_TEMPLATE_ID = "template_uaendkg";

const UPLOADCARE_PUBLIC_KEY = "f1ded879783f3f762a86";

const CALENDLY_LINK = "https://calendly.com/alessandro-pacifici27/30min";
const IBAN = "IT24B0366901600592970601798";

type CheckoutType = "telefonica_acconto" | "scritta_acconto" | "scritta_saldo" | "telefonica_saldo";

type UploadcareFile = { name?: string; cdnUrl?: string };
type UploadcareFileGroupResolved = { files: () => UploadcareFile[] };
type UploadcareFileGroup = { promise: () => Promise<UploadcareFileGroupResolved> };
type UploadcareWidget = {
  onChange: (callback: (fileGroup: UploadcareFileGroup | null) => void) => void;
};

declare global {
  interface Window {
    UPLOADCARE_PUBLIC_KEY?: string;
    UPLOADCARE_LOCALE?: string;
    UPLOADCARE_MULTIPLE?: boolean;
    uploadcare?: {
      Widget: (selector: string) => UploadcareWidget;
    };
  }
}

const formatAreaLabel = (value: string) => {
  switch (value) {
    case "Diritto Successorio":
      return "Diritto Successorio";
    case "Diritto Commerciale":
      return "Diritto Commerciale";
    case "Diritto Privato":
      return "Diritto Privato";
    default:
      return value;
  }
};

const ConsulenzaGiuridica = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const success: SuccessType = useMemo(() => {
    const s = searchParams.get("success");
    if (s === "telefonica") return "telefonica";
    if (s === "scritta_acconto") return "scritta_acconto";
    if (s === "saldo_pagato") return "saldo_pagato";
    return null;
  }, [searchParams]);

  const [stripeLoading, setStripeLoading] = useState(false);
  const [formSending, setFormSending] = useState(false);

  // FORM (Consulenza Scritta)
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [areaDiritto, setAreaDiritto] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [accettoDisclaimer, setAccettoDisclaimer] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js";
    script.async = true;

    script.onload = () => {
      window.UPLOADCARE_PUBLIC_KEY = UPLOADCARE_PUBLIC_KEY;
      window.UPLOADCARE_LOCALE = "it";
      window.UPLOADCARE_MULTIPLE = true;

      setTimeout(() => {
        const uc = window.uploadcare;
        if (!uc) return;

        const widget = uc.Widget("[role~=uploadcare-uploader]");
        widget.onChange((fileGroup) => {
          if (!fileGroup) {
            setUploadedFiles([]);
            return;
          }

          fileGroup
            .promise()
            .then((group) => {
              const files = group.files() || [];
              const list = files.map((f) => ({
                name: f.name ?? "Documento",
                url: f.cdnUrl ?? "",
              }));
              setUploadedFiles(list.filter((f: UploadFile) => Boolean(f.url)));
            })
            .catch(() => {
              setUploadedFiles([]);
            });
        });
      }, 500);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const callStripeCheckout = async (type: CheckoutType) => {
    setStripeLoading(true);
    try {
      const documenti = uploadedFiles.map((f) => f.url).join(", ");
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          ...(type === "scritta_acconto"
            ? {
                nome: `${nome} ${cognome}`.trim(),
                email,
                telefono,
                area: areaDiritto,
                messaggio: descrizione,
                documenti: documenti || "",
              }
            : {}),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: "Pagamento non disponibile",
          description: data?.error || "Impossibile avviare Stripe Checkout.",
          variant: "destructive",
        });
        return;
      }

      const url = data?.url as string | undefined;
      if (!url) {
        toast({
          title: "Pagamento non disponibile",
          description: "Stripe Checkout non ha restituito la URL di pagamento.",
          variant: "destructive",
        });
        return;
      }

      window.location.href = url;
    } catch {
      toast({
        title: "Errore di pagamento",
        description: "Si è verificato un problema durante l'avvio del pagamento. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setStripeLoading(false);
    }
  };

  const validateForm = () => {
    if (!nome.trim() || !cognome.trim()) {
      toast({ title: "Nome e cognome richiesti", description: "Compila tutti i campi obbligatori.", variant: "destructive" });
      return false;
    }
    if (!email.trim() || !telefono.trim() || !areaDiritto || !descrizione.trim()) {
      toast({ title: "Compila tutti i campi obbligatori", description: "Controlla di non aver lasciato campi vuoti.", variant: "destructive" });
      return false;
    }
    if (!accettoDisclaimer) {
      toast({
        title: "Consenso richiesto",
        description: "Devi accettare il disclaimer per poter procedere.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formSending) return;
    setFormSending(true);

    const fileUrls = uploadedFiles.map((f) => f.url).join(", ");

    const templateParams = {
      nome: nome.trim(),
      cognome: cognome.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      area_diritto: formatAreaLabel(areaDiritto),
      descrizione_caso: descrizione.trim(),
      file_urls: fileUrls,
      accetto_disclaimer: accettoDisclaimer ? "Sì" : "No",
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });

      // IMPORTANTISSIMO: inviamo prima i dati via email, poi avviamo Stripe.
      await callStripeCheckout("scritta_acconto");
    } catch {
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un problema durante l'invio del form. Non procediamo con il pagamento.",
        variant: "destructive",
      });
    } finally {
      setFormSending(false);
    }
  };

  const faqs = [
    {
      q: "Questa consulenza sostituisce un avvocato?",
      a: "No. Si tratta di consulenza informativa e documentale che ti aiuta a comprendere la tua situazione e le opzioni disponibili. Per atti legali formali o rappresentanza in giudizio è necessario un avvocato iscritto all'albo.",
    },
    {
      q: "Entro quando ricevo la consulenza scritta?",
      a: "Entro 24 ore dalla ricezione dell'acconto e di tutti i documenti necessari. In caso di mancata consegna nei tempi previsti, rimborso completo garantito.",
    },
    {
      q: "Posso fare domande dopo aver ricevuto la consulenza?",
      a: "Sì. È incluso nel prezzo un follow-up via email per chiarimenti sulla consulenza ricevuta.",
    },
    {
      q: "Come funziona il pagamento in due rate?",
      a: "Per la consulenza scritta: paghi €25 di acconto all'invio del form, poi €44 di saldo quando la consulenza è pronta — prima della consegna del PDF. Per la consulenza telefonica: paghi €15 di acconto per prenotare la chiamata, poi €34 di saldo al termine della stessa tramite carta o bonifico.",
    },
    {
      q: "Quali metodi di pagamento accettate?",
      a: "Accettiamo carta di credito e debito (Visa, Mastercard, Amex), Klarna (paga in 3 rate senza interessi), PayPal, Apple Pay e Google Pay. Per il saldo è possibile anche il bonifico bancario.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Consulenza Giuridica Online | WebSuccessioni</title>
        <meta
          name="description"
          content="Consulenza Giuridica Online: risposte personalizzate in materia successoria, commerciale e di diritto privato. Pagamento in due rate con Stripe Checkout."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Success banners (Stripe redirect) */}
        <AnimatePresence>
          {success && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.25 }}
              className="container mx-auto px-4 max-w-4xl mb-10"
            >
              {success === "telefonica" && (
                <div className="border border-primary/25 bg-primary/5 rounded-2xl p-6 shadow-[0_0_60px_-15px_rgba(184,142,67,0.12)]">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Pagamento acconto ricevuto.
                  </h2>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
                    Prenota ora la tua chiamata scegliendo giorno e orario:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <Button
                      variant="gold"
                      onClick={() => window.open(CALENDLY_LINK, "_blank", "noopener,noreferrer")}
                      disabled={stripeLoading}
                    >
                      Prenota la chiamata
                    </Button>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      Il saldo di €34 potrà essere pagato al termine della chiamata tramite carta o bonifico bancario (IBAN:{" "}
                      <span className="text-primary">{IBAN}</span>).
                    </p>
                  </div>
                </div>
              )}

              {success === "scritta_acconto" && (
                <div className="border border-primary/25 bg-primary/5 rounded-2xl p-6 shadow-[0_0_60px_-15px_rgba(184,142,67,0.12)]">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Acconto ricevuto.
                  </h2>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    Puoi ora inviare il tuo caso compilando il form qui sotto. Riceverai la consulenza in PDF entro 24 ore. Il saldo di €44 sarà
                    richiesto prima della consegna del documento.
                  </p>
                </div>
              )}

              {success === "saldo_pagato" && (
                <div className="border border-primary/25 bg-primary/5 rounded-2xl p-6 shadow-[0_0_60px_-15px_rgba(184,142,67,0.12)]">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3">Pagamento completato. Grazie.</h2>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="container mx-auto px-4 max-w-5xl mb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <span className="line-gold w-10 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Consulenza Giuridica</p>
              <span className="line-gold w-10 inline-block" />
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5">
              Consulenza Giuridica Online
            </h1>

            <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Risposte chiare e personalizzate in materia successoria, commerciale e di diritto privato. Elaborata da un dottore in legge con la
              collaborazione di avvocati specializzati.
            </p>

            {/* Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mt-8 mb-10">
              {["Risposta entro 24 ore", "Documento PDF personalizzato", "Con la collaborazione di avvocati"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary text-sm font-body font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Button
                  variant="gold"
                  size="lg"
                  className="h-12 md:h-12 w-full md:w-auto font-body"
                  onClick={() => scrollToSection("come-funziona")}
                >
                  Consulenza Telefonica — €49
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="h-12 md:h-12 w-full md:w-auto font-body border border-primary/40"
                  onClick={() => scrollToSection("form-consulenza")}
                >
                  Consulenza Scritta — €69
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AREE DI COMPETENZA */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Di cosa ci occupiamo
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                title: "Diritto Successorio",
                desc: "Successioni, eredità, testamenti, rinuncia all'eredità, divisione dei beni tra eredi, dichiarazione di successione.",
              },
              {
                icon: Briefcase,
                title: "Diritto Commerciale",
                desc: "Contratti commerciali, costituzione società, controversie tra soci, responsabilità d'impresa.",
              },
              {
                icon: FileText,
                title: "Diritto Privato",
                desc: "Contratti civili, responsabilità extracontrattuale, questioni condominiali, locazioni, tutela dei diritti.",
              },
            ].map((a) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-primary/20 rounded-xl p-8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <a.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{a.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COME FUNZIONA */}
        <section id="come-funziona" className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Come funziona</p>
              <span className="line-gold w-8 inline-block" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Scegli il tipo di consulenza
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* CARD TELEFONICA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-primary/25 rounded-2xl p-7 md:p-9"
            >
              <div className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-primary text-sm font-body font-medium">
                Risposta immediata
              </div>
              <div className="mt-5">
                <p className="text-muted-foreground text-sm font-body">Prezzo</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="font-display text-4xl font-bold text-foreground">€49</p>
                </div>
                <p className="font-body text-muted-foreground text-sm mt-2">€15 acconto ora + €34 saldo dopo la chiamata</p>
              </div>

              <div className="mt-5 flex items-center gap-3 text-muted-foreground text-sm font-body">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Durata: 20-30 minuti</span>
              </div>

              <ul className="mt-7 space-y-3">
                {[
                  "Spieghi il tuo caso direttamente al telefono",
                  "Ricevi risposta e orientamento immediato",
                  "Scegli tu giorno e orario tramite calendario online",
                  "Acconto sicuro con carta, Klarna o PayPal",
                  "Saldo al termine della chiamata: carta o bonifico",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span className="font-body text-muted-foreground text-sm leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full font-body"
                  onClick={() => callStripeCheckout("telefonica_acconto")}
                  disabled={stripeLoading}
                >
                  Prenota — Paga acconto €15
                </Button>
                <p className="font-body text-xs text-muted-foreground mt-3 leading-relaxed">
                  Dopo il pagamento dell&apos;acconto riceverai il link per scegliere giorno e orario della chiamata.
                </p>
              </div>
            </motion.div>

            {/* CARD SCRITTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.25, delay: 0.06 }}
              className="bg-card border border-primary/25 rounded-2xl p-7 md:p-9"
            >
              <div className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-primary text-sm font-body font-medium">
                Entro 24 ore
              </div>

              <div className="mt-5">
                <p className="text-muted-foreground text-sm font-body">Prezzo</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="font-display text-4xl font-bold text-foreground">€69</p>
                </div>
                <p className="font-body text-muted-foreground text-sm mt-2">€25 acconto ora + €44 saldo prima della consegna</p>
              </div>

              <ul className="mt-7 space-y-3">
                {[
                  "Descrivi il tuo caso in dettaglio tramite il form",
                  "Carica i documenti pertinenti",
                  "Ricevi un documento PDF personalizzato entro 24 ore",
                  "Follow-up via email per chiarimenti incluso",
                  "Rimborso garantito se non consegniamo nei tempi",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span className="font-body text-muted-foreground text-sm leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="w-full font-body border border-primary/40"
                  onClick={() => scrollToSection("form-consulenza")}
                >
                  Richiedi — Paga acconto €25
                </Button>
                <p className="font-body text-xs text-muted-foreground mt-3 leading-relaxed">
                  Pagamento acconto richiesto all&apos;invio del form. Il saldo sarà richiesto prima della consegna del documento PDF.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FORM CONSULENZA SCRITTA */}
        <section id="form-consulenza" className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Consulenza Scritta</p>
              <span className="line-gold w-8 inline-block" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Richiedi la tua Consulenza Scritta</h2>
            <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mt-4 leading-relaxed">
              Compila il form con tutti i dettagli del tuo caso. Più informazioni fornisci, più precisa sarà la consulenza.
            </p>
          </div>

          <form ref={formRef} onSubmit={onSubmitForm} className="relative bg-gradient-to-b from-card to-background border border-yellow-500/20 rounded-2xl p-5 md:p-10 shadow-[0_0_60px_-15px_rgba(184,142,67,0.15)] space-y-7 overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-yellow-500/30 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-yellow-500/30 rounded-br-2xl pointer-events-none" />

            <div className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    value={`${nome} ${cognome}`.trim()}
                    onChange={(e) => {
                      const parts = e.target.value.trim().split(/\s+/);
                      setNome(parts[0] ?? "");
                      setCognome(parts.slice(1).join(" "));
                    }}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="mario.rossi@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="+39 333 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                    Area del diritto *
                  </label>
                  <select
                    value={areaDiritto}
                    onChange={(e) => setAreaDiritto(e.target.value)}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                  >
                    <option value="">Seleziona</option>
                    <option value="Diritto Successorio">Diritto Successorio</option>
                    <option value="Diritto Commerciale">Diritto Commerciale</option>
                    <option value="Diritto Privato">Diritto Privato</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                  Descrizione dettagliata del caso *
                </label>
                <textarea
                  value={descrizione}
                  onChange={(e) => setDescrizione(e.target.value)}
                  rows={6}
                  className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 min-h-[200px]"
                  placeholder="Descrivi il tuo caso nel modo più dettagliato possibile: contesto, persone coinvolte, documenti esistenti, domanda specifica a cui vuoi risposta. Più dettagli fornisci, più precisa sarà la consulenza."
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                  Carica documenti pertinenti (opzionale) — contratti, visure, atti notarili, etc.
                </label>

                <div className="relative">
                  <div
                    id="uc-trigger"
                    className="[&_.uploadcare-widget-button]:hidden [&_.uploadcare--widget__button]:hidden"
                    role="uploadcare-uploader"
                    data-public-key={UPLOADCARE_PUBLIC_KEY}
                    data-multiple="true"
                    data-locale="it"
                  />
                  <label
                    htmlFor="uc-trigger"
                    className="flex items-center gap-3 w-full cursor-pointer border border-primary/30 border-dashed rounded-lg px-4 py-4 bg-background/40 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-sm text-foreground font-medium">
                        Carica i tuoi documenti
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">
                        Contratti, visure, atti notarili — opzionale
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <ul className="space-y-2">
                  {uploadedFiles.map((f, i) => (
                    <li key={`${f.url}-${i}`} className="flex items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 font-body text-sm text-foreground">
                      <span className="truncate flex-1 min-w-0" title={f.name}>
                        {f.name}
                      </span>
                      <span className="text-primary text-xs font-medium">Caricato</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="rounded-xl border border-border/50 bg-secondary/40 p-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accettoDisclaimer}
                    onChange={(e) => setAccettoDisclaimer(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border border-primary/40 bg-background/60 checked:bg-primary checked:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none cursor-pointer appearance-none [&:checked]:bg-primary relative"
                    style={{
                      backgroundImage: accettoDisclaimer
                        ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
                        : "none",
                      backgroundColor: accettoDisclaimer ? "hsl(40 55% 55%)" : "transparent",
                      borderColor: "hsl(40 55% 55% / 0.4)",
                    }}
                  />
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    Ho letto e accetto il disclaimer: questa consulenza è informativa e documentale e non costituisce parere legale ai sensi della L.
                    247/2012.
                  </span>
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between pt-2 border-t border-border/60">
                <p className="font-body text-sm text-muted-foreground">
                  Pagamento acconto: <span className="text-primary font-semibold">€25</span>
                </p>
                <Button type="submit" variant="gold" size="lg" disabled={formSending || stripeLoading} className="font-body flex items-center gap-2 justify-center">
                  <Send className="w-4 h-4" />
                  {formSending ? "Invio in corso..." : "Invia e Paga Acconto €25"}
                </Button>
              </div>

              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Riceverai conferma via email prima di essere reindirizzato a Stripe Checkout.
              </p>
            </div>
          </form>
        </section>

        {/* SALDO CONSULENZA SCRITTA */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="bg-card border border-primary/25 rounded-2xl p-7 md:p-9">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">Hai già pagato l&apos;acconto? Paga il saldo</h2>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  Quando ti comunichiamo che la consulenza è pronta, procedi con il saldo di €44 per ricevere il documento PDF.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="font-body"
                  onClick={() => callStripeCheckout("scritta_saldo")}
                  disabled={stripeLoading || formSending}
                >
                  Paga Saldo Consulenza Scritta — €44
                </Button>

                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  In alternativa puoi saldare tramite bonifico bancario a: <span className="text-primary">{IBAN}</span> — causale:{" "}
                  <span className="text-primary font-medium">Saldo consulenza scritta + tuo nome</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHI ELABORA LA CONSULENZA */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="bg-background border border-border/50 rounded-2xl p-7 md:p-9 relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full border border-primary/20" />
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Chi elabora</p>
              <span className="line-gold w-8 inline-block" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Dottore in legge + avvocati specializzati
                </p>
                <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
                  Le consulenze sono elaborate personalmente dal Dott. Alessandro Pacifici, collaboratore notarile, laureato in legge ed aspirante notaio, con la collaborazione di un team di avvocati specializzati nelle rispettive materie. Ogni consulenza è personalizzata sul caso specifico del cliente e prodotta in formato PDF professionale.
                </p>
              </div>

              <div className="w-full md:w-56 flex-shrink-0">
                <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/80 to-primary/30 rounded-full mb-6" />
                <div className="border border-primary/20 rounded-2xl p-6 bg-card/40">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.22em] mb-3">Progettazione</p>
                  <p className="font-display text-xl font-semibold text-foreground">PDF personalizzato</p>
                  <div className="line-gold w-full mt-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">FAQ</p>
              <span className="line-gold w-8 inline-block" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Domande <span className="text-gradient-gold italic">frequenti</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-lg px-7 data-[state=open]:border-primary/20 transition-colors duration-300"
                >
                  <AccordionTrigger className="font-display text-lg font-semibold text-foreground hover:no-underline py-5">{faq.q}</AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ConsulenzaGiuridica;

