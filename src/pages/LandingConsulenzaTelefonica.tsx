import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, MessageCircle, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type SuccessType = "telefonica" | null;
type CheckoutType = "telefonica_acconto";

const CALENDLY_LINK = "https://calendly.com/alessandro-pacifici27/30min";
const IBAN = "IT24B0366901600592970601798";

const LandingConsulenzaTelefonica = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const success: SuccessType = useMemo(() => {
    const s = searchParams.get("success");
    if (s === "telefonica") return "telefonica";
    return null;
  }, [searchParams]);

  const [stripeLoading, setStripeLoading] = useState(false);

  const callStripeCheckout = async (type: CheckoutType) => {
    setStripeLoading(true);
    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
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

  return (
    <>
      <Helmet>
        <title>Consulenza Giuridica Telefonica | WebSuccessioni</title>
        <meta
          name="description"
          content="Consulenza giuridica telefonica: parla con un esperto in diritto successorio, commerciale e privato. Risposta immediata, 20-30 minuti."
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
          {success === "telefonica" && (
            <section className="max-w-4xl mx-auto mb-10">
              <div className="border border-yellow-500/20 bg-card/40 rounded-2xl p-6 shadow-[0_0_60px_-15px_rgba(184,142,67,0.12)]">
                <h2 className="font-display text-2xl font-semibold text-[hsl(40_55%_55%)] mb-3">Acconto ricevuto!</h2>
                <p className="font-body text-white/80 text-sm leading-relaxed mb-5">
                  Clicca qui per scegliere giorno e orario della tua chiamata:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <Button variant="gold" onClick={() => window.open(CALENDLY_LINK, "_blank", "noopener,noreferrer")} disabled={stripeLoading}>
                    Prenota la chiamata
                  </Button>
                  <p className="font-body text-xs text-white/70 leading-relaxed">
                    Il saldo di €35 verrà richiesto al termine della chiamata tramite carta o bonifico (IBAN:{" "}
                    <span className="text-[hsl(40_55%_55%)]">{IBAN}</span>).
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Hero */}
          <section className="max-w-4xl mx-auto text-center space-y-5 mb-10 sm:mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-[hsl(40_55%_55%)] px-2">
              Consulenza Giuridica Telefonica
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Parla con un esperto in diritto successorio, commerciale e privato. Risposta immediata, 20-30 minuti.
            </p>
          </section>

          {/* Trust bar */}
          <section className="max-w-5xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              {[
                { emoji: "📞", testo: "Risposta immediata al telefono" },
                { emoji: "⏱", testo: "Durata 20-30 minuti" },
                { emoji: "✓", testo: "Scegli tu giorno e orario" },
              ].map((item) => (
                <div
                  key={item.testo}
                  className="flex items-center gap-3 px-5 py-3 rounded-full border border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 backdrop-blur-sm shadow-[0_0_20px_-8px_rgba(184,142,67,0.3)]"
                >
                  <span className="text-lg leading-none flex-shrink-0">{item.emoji}</span>
                  <span className="font-body text-sm text-white/90 font-medium">{item.testo}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Price + steps + CTA */}
          <section className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-b from-card to-background p-6 sm:p-8 shadow-[0_0_60px_-15px_rgba(184,142,67,0.12)]">
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-500/70 font-semibold">Prezzo</p>
              <div className="mt-4 space-y-2">
                <p className="font-body text-sm text-white/90 font-medium">
                  Consulenza completa: <span className="text-[hsl(40_55%_55%)] font-semibold">€49</span>
                </p>
                <p className="font-body text-sm text-white/80">
                  Inizia oggi con soli <span className="text-[hsl(40_55%_55%)] font-semibold">€14</span>
                </p>
                <p className="font-body text-sm text-white/80">
                  Saldo di <span className="text-[hsl(40_55%_55%)] font-semibold">€35</span> solo al termine della chiamata
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  "1. Paga l'acconto di €14 in modo sicuro",
                  "2. Scegli giorno e orario tramite calendario online",
                  "3. Ricevi la chiamata. Paga €35 a fine consulenza",
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

            <div className="rounded-2xl border border-yellow-500/20 bg-card/40 p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-yellow-500/70 font-semibold mb-2">Prenotazione</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  Premi il pulsante per avviare il pagamento dell&apos;acconto e prenotare la consulenza telefonica.
                </p>
              </div>
              <div className="space-y-2">
                {[
                  "Scegli tu giorno e orario su Calendly",
                  "Pagamento sicuro con Stripe — carta, PayPal, Klarna",
                  "Saldo di €35 solo al termine della chiamata",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                    <p className="font-body text-sm text-white/70 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="gold"
                size="lg"
                className="w-full font-body h-12"
                onClick={() => callStripeCheckout("telefonica_acconto")}
                disabled={stripeLoading}
              >
                Prenota ora la chiamata
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingConsulenzaTelefonica;

