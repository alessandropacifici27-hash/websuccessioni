import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Check, FileText, Phone, Scale, Briefcase, Send } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

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
type UploadcareWidgetController = UploadcareWidget & {
  openDialog?: () => void;
  openPanel?: () => void;
  open?: () => void;
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
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [areaDiritto, setAreaDiritto] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [accettoDisclaimer, setAccettoDisclaimer] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const uploaderRef = useRef<UploadcareWidgetController | null>(null);

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

        const widget = uc.Widget("[role~=uploadcare-uploader]") as UploadcareWidgetController;
        uploaderRef.current = widget;
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
      uploaderRef.current = null;
      document.body.removeChild(script);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
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
                nome: nomeCompleto.trim(),
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
    const trimmedNome = nomeCompleto.trim();
    if (!/\s/.test(trimmedNome)) {
      toast({ title: "Inserisci nome e cognome completi", variant: "destructive" });
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
      nome: nomeCompleto.trim(),
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
      a: "Per la consulenza scritta: Consulenza completa €149; inizi con €49; saldo di €100 solo dopo aver ricevuto la consulenza (prima della consegna del PDF). Per la consulenza telefonica: Consulenza completa €119; inizi con €39; saldo di €80 solo al termine della chiamata (carta o bonifico).",
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
                      Saldo di €80 solo al termine della chiamata — tramite carta o bonifico bancario (IBAN:{" "}
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
                    Puoi ora inviare il tuo caso compilando il form qui sotto. Riceverai la consulenza in PDF entro 24 ore. Saldo di €100 solo dopo aver
                    ricevuto la consulenza, prima della consegna del documento.
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
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <span className="line-gold w-10 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Consulenza Giuridica</p>
              <span className="line-gold w-10 inline-block" />
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5">Consulenza Giuridica Online</h1>

            <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              Risposte chiare ai tuoi dubbi legali, dal diritto successorio al diritto commerciale e privato.
            </p>
            <p className="font-body text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              Ogni situazione giuridica e&apos; unica. Il nostro servizio ti affianca con un&apos;analisi personalizzata del tuo caso, documenti
              redatti su misura e risposte concrete - non risposte generiche.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-10">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <Button
                  variant="gold"
                  size="lg"
                  className="rounded-full bg-transparent border border-yellow-500/50 text-yellow-500/90 font-medium tracking-wide text-base italic py-4 px-10 min-w-[240px] text-center inline-flex items-center justify-center hover:bg-yellow-900/10 hover:border-yellow-500/70 hover:text-yellow-400/95 transition-all duration-200"
                  onClick={() => scrollToSection("form-consulenza")}
                >
                  Consulenza Scritta
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 }}>
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="rounded-full bg-transparent border border-yellow-500/50 text-yellow-500/90 font-medium tracking-wide text-base italic py-4 px-10 min-w-[240px] text-center inline-flex items-center justify-center hover:bg-yellow-900/10 hover:border-yellow-500/70 hover:text-yellow-400/95 transition-all duration-200"
                  onClick={() => scrollToSection("card-telefonica")}
                >
                  Consulenza Telefonica
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-2 items-center">
            {[
              { emoji: "⚖️", testo: "Elaborata da giuristi" },
              { emoji: "⏱", testo: "Risposta entro 24h" },
              { emoji: "🔒", testo: "Pagamento sicuro con Stripe" },
              { emoji: "📩", testo: "Follow-up via email incluso" },
            ].map((item) => (
              <div
                key={item.testo}
                className="flex items-center gap-2 rounded-full sm:py-1 sm:px-3 sm:border sm:border-white/10 sm:bg-white/5"
              >
                <span className="text-lg leading-none flex-shrink-0">{item.emoji}</span>
                <span className="font-body text-xs text-gray-400 font-medium whitespace-nowrap">{item.testo}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AREE DI COMPETENZA */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-12">
            <p className="text-[hsl(40,55%,55%)] uppercase tracking-[0.2em] text-sm font-medium mb-3 flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
              AMBITO DEL DIRITTO
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-white">Le nostre aree di competenza</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                title: "Diritto Successorio",
                examples: [
                  "Dichiarazioni di successione e adempimenti fiscali",
                  "Divisione dell'eredita' tra coeredi",
                  "Impugnazione testamento e tutela della quota legittima",
                  "Rinuncia all'eredita' e accettazione con beneficio d'inventario",
                  "Successione in presenza di debiti o ipoteche",
                ],
              },
              {
                icon: Briefcase,
                title: "Diritto Commerciale",
                examples: [
                  "Costituzione e scioglimento di societa'",
                  "Redazione e revisione di contratti commerciali",
                  "Gestione controversie tra soci",
                  "Cessione d'azienda e passaggio generazionale",
                  "Analisi statuti societari",
                ],
              },
              {
                icon: FileText,
                title: "Diritto Privato",
                examples: [
                  "Contratti di compravendita e locazione",
                  "Diritti reali e questioni condominiali",
                  "Separazione e divorzio - aspetti patrimoniali",
                  "Responsabilita' civile e risarcimento danni",
                  "Tutele e amministrazione di sostegno",
                ],
              },
            ].map((a, idx) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.22, delay: idx * 0.03 }}
                className="bg-card border border-primary/20 rounded-xl p-7 md:p-8"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <a.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{a.title}</h3>
                <ul className="space-y-2.5">
                  {a.examples.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="font-body text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COME FUNZIONA */}
        <section id="come-funziona" className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-12">
            <p className="text-[hsl(40,55%,55%)] uppercase tracking-[0.2em] text-sm font-medium mb-3 flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
              IL PROCESSO
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-white">Come funziona</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: "✍🏻",
                title: "Descrivi il tuo caso",
                text: "Compila il form con tutti i dettagli della tua situazione. Piu' informazioni fornisci, piu' precisa sara' la risposta.",
              },
              {
                icon: "📊",
                title: "Analizziamo la tua situazione",
                text: "Entro 24 ore esaminiamo il tuo caso e prepariamo una risposta personalizzata basata sulla normativa vigente.",
              },
              {
                icon: "📝",
                title: "Ricevi la tua consulenza",
                text: "Consulenza scritta: ricevi un documento PDF dettagliato via email. Consulenza telefonica: parli direttamente con un esperto su Calendly.",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.24, delay: idx * 0.04 }}
                className="rounded-xl border border-primary/20 bg-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-3xl leading-none">{step.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIPOLOGIE DI CONSULENZA */}
        <section id="scegli-consulenza" className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-12">
            <p className="text-[hsl(40,55%,55%)] uppercase tracking-[0.2em] text-sm font-medium mb-3 flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
              I NOSTRI SERVIZI
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-white">Scegli il tipo di consulenza</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-primary/25 rounded-2xl p-7 md:p-9"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-foreground">Consulenza Scritta</h3>
              <p className="font-body text-muted-foreground text-sm mt-2">Risposta approfondita via PDF entro 24 ore</p>

              <ul className="mt-7 space-y-3">
                {[
                  { emoji: "📄", testo: "Analisi dettagliata del tuo caso specifico" },
                  { emoji: "📋", testo: "Documento PDF professionale da conservare" },
                  { emoji: "📚", testo: "Riferimenti normativi e giurisprudenziali" },
                  { emoji: "📩", testo: "Follow-up via email incluso" },
                  { emoji: "✅", testo: "Rimborso garantito se non consegniamo in tempo" },
                ].map((item) => (
                  <li key={item.testo} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5 flex-shrink-0">{item.emoji}</span>
                    <span className="font-body text-muted-foreground text-sm leading-relaxed">{item.testo}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-white/8 bg-white/3 p-4 space-y-1">
                <p className="font-body text-sm font-semibold text-white/90">Consulenza completa: €149</p>
                <p className="font-body text-sm text-[hsl(40,55%,55%)] font-medium">Inizia oggi con soli €49</p>
                <p className="font-body text-xs text-white/50">Saldo di €100 solo dopo aver ricevuto la consulenza</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  variant="gold"
                  size="lg"
                  className="rounded-full py-4 px-10 min-w-[300px] font-body font-semibold transition-all duration-200"
                  onClick={() => scrollToSection("form-consulenza")}
                >
                  Richiedi Consulenza Scritta
                </Button>
              </div>
            </motion.div>

            <motion.div
              id="card-telefonica"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.06 }}
              className="bg-card border border-primary/25 rounded-2xl p-7 md:p-9"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-foreground">Consulenza Telefonica</h3>
              <p className="font-body text-muted-foreground text-sm mt-2">Chiamata diretta con un esperto</p>

              <ul className="mt-7 space-y-3">
                {[
                  { emoji: "🎙️", testo: "Dialogo diretto per chiarire ogni dubbio" },
                  { emoji: "📅", testo: "Prenotazione immediata su Calendly" },
                  { emoji: "🕐", testo: "Flessibilità di orario lun-ven 9:00-18:00" },
                  { emoji: "⚡", testo: "Risposta immediata e interattiva" },
                  { emoji: "💬", testo: "Possibilità di porre domande di approfondimento" },
                ].map((item) => (
                  <li key={item.testo} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5 flex-shrink-0">{item.emoji}</span>
                    <span className="font-body text-muted-foreground text-sm leading-relaxed">{item.testo}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-white/8 bg-white/3 p-4 space-y-1">
                <p className="font-body text-sm font-semibold text-white/90">Consulenza completa: €119</p>
                <p className="font-body text-sm text-[hsl(40,55%,55%)] font-medium">Inizia oggi con soli €39</p>
                <p className="font-body text-xs text-white/50">Saldo di €80 solo al termine della chiamata</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="rounded-full py-4 px-10 min-w-[300px] font-body font-semibold border border-primary/40 transition-all duration-200"
                  onClick={() => callStripeCheckout("telefonica_acconto")}
                >
                  Prenota ora la chiamata
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="rounded-2xl border border-yellow-500/25 bg-gradient-to-b from-card to-background p-7 md:p-10 shadow-[0_0_40px_-15px_rgba(184,142,67,0.15)]">
            <p className="text-[hsl(40,55%,55%)] uppercase tracking-[0.2em] text-sm font-medium mb-8 flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
              PERCHÉ SCEGLIERCI
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  emoji: "🔒",
                  titolo: "Pagamento sicuro",
                  desc: "Stripe con carta, PayPal e Klarna. Nessun dato finanziario transita sui nostri server.",
                },
                {
                  emoji: "⏱",
                  titolo: "Risposta in 24 ore",
                  desc: "Consegna del PDF garantita entro 24 ore dalla ricezione dell'acconto e dei documenti.",
                },
                {
                  emoji: "📩",
                  titolo: "Follow-up incluso",
                  desc: "Hai diritto a chiedere chiarimenti via email sulla consulenza ricevuta, senza costi aggiuntivi.",
                },
                {
                  emoji: "⚖️",
                  titolo: "Professionisti del settore",
                  desc: "Team di collaboratori notarili e avvocati specializzati.",
                },
              ].map((item) => (
                <div key={item.titolo} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl leading-none">{item.emoji}</span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white/90 mb-1">{item.titolo}</p>
                    <p className="font-body text-xs text-white/55 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM CONSULENZA SCRITTA */}
        <section id="form-consulenza" className="container mx-auto px-4 max-w-6xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="text-center mb-10"
          >
            <p className="text-[hsl(40,55%,55%)] uppercase tracking-[0.2em] text-sm font-medium mb-3 flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
              CONSULENZA SCRITTA
              <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
            </p>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Descrivi il tuo caso</h2>
            <p className="font-body text-muted-foreground text-sm max-w-3xl mx-auto mt-4 leading-relaxed">
              Compila il modulo - ti risponderemo entro 24 ore
            </p>
          </motion.div>

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
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
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
                    className="hidden"
                    role="uploadcare-uploader"
                    data-public-key={UPLOADCARE_PUBLIC_KEY}
                    data-multiple="true"
                    data-locale="it"
                  />
                  <div
                    onClick={() => uploaderRef.current?.openDialog?.() ?? uploaderRef.current?.openPanel?.() ?? uploaderRef.current?.open?.()}
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
                  </div>
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
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={accettoDisclaimer}
                    onChange={(e) => setAccettoDisclaimer(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                      accettoDisclaimer ? "bg-yellow-500 border-yellow-500" : "bg-secondary border-border group-hover:border-yellow-500/50"
                    }`}
                  >
                    {accettoDisclaimer && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
                  </div>
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    Ho letto e accetto il disclaimer: questa consulenza è informativa e documentale e non costituisce parere legale ai sensi della L.
                    247/2012.
                  </span>
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between pt-2 border-t border-border/60">
                <Button type="submit" variant="gold" size="lg" disabled={formSending || stripeLoading} className="font-body flex items-center gap-2 justify-center">
                  <Send className="w-4 h-4" />
                  {formSending ? "Invio in corso..." : "Invia Richiesta"}
                </Button>
              </div>

              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Consulenza completa €149. Dopo l&apos;invio verrai reindirizzato al pagamento dell&apos;acconto di €49 tramite Stripe per confermare la richiesta.
              </p>
            </div>
          </form>
        </section>

        {/* SALDO CONSULENZA SCRITTA */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="bg-[#101014] border border-border/60 rounded-xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Saldo consulenza scritta</h2>
                <p className="font-body text-muted-foreground text-xs md:text-sm leading-relaxed">
                  Saldo di €100 solo dopo aver ricevuto la consulenza: quando ti comunichiamo che il PDF è pronto, procedi con il pagamento per ricevere il documento.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="heroOutline"
                  size="sm"
                  className="font-body border border-primary/35"
                  onClick={() => callStripeCheckout("scritta_saldo")}
                  disabled={stripeLoading || formSending}
                >
                  Paga saldo €100
                </Button>

                <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                  In alternativa puoi saldare tramite bonifico bancario a: <span className="text-primary">{IBAN}</span> — causale:{" "}
                  <span className="text-primary font-medium">Saldo consulenza scritta + tuo nome</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-center mb-12">
              <p className="text-[hsl(40,55%,55%)] uppercase tracking-[0.2em] text-sm font-medium mb-3 flex items-center justify-center gap-3">
                <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
                EROGAZIONE SERVIZIO
                <span className="block w-8 h-px bg-[hsl(40,55%,55%)]"></span>
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-white">Chi si occupa della consulenza</h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-[#111116] p-7 md:p-9">
              <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full border border-[hsl(40,55%,55%)] opacity-20 pointer-events-none" />
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                {`Il servizio e' erogato dal Dott. Alessandro Pacifici, collaboratore notarile, laureato in legge e aspirante notaio, in collaborazione con avvocati specializzati nelle rispettive aree.

Ogni consulenza e' trattata con la stessa cura di uno studio professionale tradizionale, con il vantaggio della comodita' del servizio online e tempi di risposta rapidi.

⚖️ Il servizio costituisce consulenza informativa e documentale ai sensi della L. 247/2012.`}
              </p>
            </div>
          </motion.div>
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
            viewport={{ once: true }}
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

