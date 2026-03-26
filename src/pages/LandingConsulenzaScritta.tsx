import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { Phone, MessageCircle, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type UploadFile = { name: string; url: string };

const EMAILJS_SERVICE_ID = "service_i1pju5e";
const EMAILJS_PUBLIC_KEY = "qFsjEtnqQNDnN5WlA";
const EMAILJS_TEMPLATE_ID = "[INSERIRE_TEMPLATE_ID]";

const UPLOADCARE_PUBLIC_KEY = "f1ded879783f3f762a86";

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
    gtag?: (...args: unknown[]) => void;
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

const LandingConsulenzaScritta = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const utm = useMemo(() => {
    const params: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = searchParams.get(k);
      if (v) params[k] = v;
    });
    return params;
  }, [searchParams]);

  const [stripeLoading, setStripeLoading] = useState(false);
  const [formSending, setFormSending] = useState(false);

  const [nome, setNome] = useState("");
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
                nome: nome.trim(),
                email: email.trim(),
                telefono: telefono.trim(),
                area: areaDiritto,
                messaggio: descrizione.trim(),
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
    if (!nome.trim()) {
      toast({ title: "Nome richiesto", description: "Compila tutti i campi obbligatori.", variant: "destructive" });
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
      email: email.trim(),
      telefono: telefono.trim(),
      area_diritto: formatAreaLabel(areaDiritto),
      descrizione_caso: descrizione.trim(),
      file_urls: fileUrls,
      accetto_disclaimer: accettoDisclaimer ? "Sì" : "No",
      ...utm,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-18018460148/S1ScCOf3kI0cEPTD749D",
          value: 70.0,
          currency: "EUR",
        });
      }

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

  return (
    <>
      <Helmet>
        <title>Consulenza Giuridica Scritta Online | WebSuccessioni</title>
        <meta
          name="description"
          content="Consulenza giuridica scritta online: ricevi un parere personalizzato in PDF entro 24 ore. Elaborato da un dottore in legge con la collaborazione di avvocati specializzati."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0C] font-body text-foreground flex flex-col">
        {/* Header minimal */}
        <header className="shrink-0 border-b border-yellow-500/20 px-4 sm:px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img src={logo} alt="" className="h-12 w-12 rounded-full shrink-0 object-cover" />
              <span className="font-display text-xl sm:text-2xl text-[hsl(40_55%_55%)] tracking-tight truncate">WebSuccessioni</span>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-end gap-x-2 gap-y-1 sm:gap-x-4 md:gap-x-5 shrink-0">
              <a
                href="tel:+390292892296"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md p-1.5 sm:p-0 -m-1.5 sm:m-0 text-[hsl(40_55%_55%)] hover:text-yellow-400/90 transition-colors"
                aria-label="Chiama +39 02 92892296"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden />
                <span className="hidden sm:inline text-xs sm:text-sm font-medium whitespace-nowrap">+39 02 92892296</span>
              </a>
              <a
                href="https://wa.me/393793511586"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md p-1.5 sm:p-0 -m-1.5 sm:m-0 text-[hsl(40_55%_55%)] hover:text-yellow-400/90 transition-colors"
                aria-label="WhatsApp +39 379 3511586"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
                <span className="hidden sm:inline text-xs sm:text-sm font-medium whitespace-nowrap">+39 379 3511586</span>
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-10 sm:py-14">
          {/* Hero */}
          <section className="max-w-4xl mx-auto text-center space-y-5 mb-10 sm:mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-[hsl(40_55%_55%)] px-2">
              Consulenza Giuridica Scritta Online
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ricevi un parere personalizzato in PDF entro 24 ore. Elaborato da un dottore in legge con la collaborazione di avvocati specializzati.
            </p>
          </section>

          {/* Trust bar */}
          <section className="max-w-5xl mx-auto mb-10">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                "📄 Documento PDF personalizzato",
                "⏱ Risposta entro 24 ore",
                "✓ Rimborso garantito se non consegniamo",
              ].map((t) => (
                <div key={t} className="rounded-xl border border-yellow-500/20 bg-card/40 px-4 py-3 text-sm text-white/80">
                  {t}
                </div>
              ))}
            </div>
          </section>

          {/* Price + steps */}
          <section className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-10">
            <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-b from-card to-background p-6 sm:p-8 shadow-[0_0_60px_-15px_rgba(184,142,67,0.12)]">
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-500/70 font-semibold">Prezzo</p>
              <div className="mt-2 flex items-baseline gap-3 justify-center lg:justify-start">
                <p className="font-display text-4xl sm:text-5xl font-bold text-[hsl(40_55%_55%)]">€70</p>
                <p className="text-sm text-white/70">(€25 acconto + €45 saldo)</p>
              </div>
              <div className="mt-6 grid gap-3">
                {[
                  "1. Compila il form con i dettagli del tuo caso",
                  "2. Paga l'acconto di €25 in modo sicuro",
                  "3. Ricevi il PDF entro 24 ore. Saldi i restanti €45",
                ].map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm text-white/80 leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-card/40 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-500/70 font-semibold mb-3">Note</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Questa pagina può essere raggiunta con parametri UTM dalle campagne ads. Se presenti, li includiamo nei parametri inviati via EmailJS.
              </p>
            </div>
          </section>

          {/* Form */}
          <section className="max-w-3xl mx-auto w-full">
            <form
              ref={formRef}
              onSubmit={onSubmitForm}
              className="relative bg-gradient-to-b from-card to-background border border-yellow-500/20 rounded-2xl p-5 sm:p-8 shadow-[0_0_60px_-15px_rgba(184,142,67,0.15)] space-y-7 overflow-hidden w-full"
            >
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-yellow-500/30 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-yellow-500/30 rounded-br-2xl pointer-events-none" />

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">Nome *</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="mario.rossi@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">Telefono *</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="+39 333 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">Area del diritto *</label>
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
                <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">Descrizione dettagliata del caso *</label>
                <textarea
                  value={descrizione}
                  onChange={(e) => setDescrizione(e.target.value)}
                  rows={6}
                  className="w-full bg-background/60 border border-border/60 focus:border-yellow-500/50 rounded-lg px-3 py-3 text-base font-body text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all duration-300 min-h-[200px]"
                  placeholder="Descrivi il tuo caso nel modo più dettagliato possibile."
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em] mb-2">
                  Carica documenti pertinenti (opzionale) — contratti, visure, atti notarili, etc.
                </label>
                <div
                  className="mt-3 [&_.uc-widget-button]:!min-h-[40px] [&_.uc-widget-button]:!rounded-lg [&_.uc-widget-button]:!bg-primary/10 [&_.uc-widget-button]:!border [&_.uc-widget-button]:!border-primary/30 [&_.uc-widget-button]:!text-foreground [&_.uc-widget-button]:!font-body"
                  role="uploadcare-uploader"
                  data-public-key={UPLOADCARE_PUBLIC_KEY}
                  data-multiple="true"
                  data-locale="it"
                />
              </div>

              <div className="rounded-xl border border-border/50 bg-secondary/40 p-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accettoDisclaimer}
                    onChange={(e) => setAccettoDisclaimer(e.target.checked)}
                    className="mt-1 accent-primary"
                  />
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    Ho letto e accetto il disclaimer: consulenza informativa e documentale. Non sostituisce il parere di un avvocato iscritto all&apos;albo.
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2 border-t border-border/60">
                <p className="font-body text-sm text-muted-foreground">
                  Pagamento acconto: <span className="text-primary font-semibold">€25</span>
                </p>
                <Button type="submit" variant="gold" size="lg" disabled={formSending || stripeLoading} className="font-body flex items-center gap-2 justify-center">
                  {formSending ? "Invio in corso..." : "Invia e Paga Acconto €25"}
                </Button>
              </div>

              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Consulenza informativa e documentale. Non sostituisce il parere di un avvocato iscritto all&apos;albo.
              </p>
            </form>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingConsulenzaScritta;

