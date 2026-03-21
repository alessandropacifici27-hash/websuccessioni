import { useEffect, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Check } from "lucide-react";
import logo from "@/assets/logo.png";

const EMAILJS_SERVICE = "service_i1pju5e";
const EMAILJS_TEMPLATE = "template_cffzon9";
const EMAILJS_PUBLIC_KEY = "qFsjEtnqQNDnN5WlA";

function firstNameFromFullName(full: string): string {
  const t = full.trim();
  if (!t) return "";
  return t.split(/\s+/)[0] ?? t;
}

const LandingGoogle = () => {
  const [fromName, setFromName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name: fromName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim() || "—",
      });
      setSuccessName(firstNameFromFullName(fromName));
      setFromName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Invio non riuscito. Riprova tra qualche minuto o chiama il numero in alto.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] font-body text-foreground flex flex-col">
      {/* Header minimal */}
      <header className="shrink-0 border-b border-yellow-500/20 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={logo}
              alt=""
              className="h-12 w-12 rounded-full shrink-0 object-cover"
            />
            <span className="font-display text-xl sm:text-2xl text-[hsl(40_55%_55%)] tracking-tight truncate">
              WebSuccessioni
            </span>
          </div>
          <a
            href="tel:+390292892296"
            className="flex items-center gap-2 text-[hsl(40_55%_55%)] hover:text-yellow-400/90 transition-colors shrink-0"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
            <span className="text-sm sm:text-base font-medium whitespace-nowrap">02 92892296</span>
          </a>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-10 sm:py-14">
        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center space-y-5 mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full border border-yellow-500/20 px-3 py-1.5">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-yellow-500/70">
              Consulenza gratuita · Risposta in 24 ore
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-[hsl(40_55%_55%)] px-2">
            Hai bisogno di fare la dichiarazione di successione?
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Compila il modulo: ti ricontattiamo entro 24 ore e ti spieghiamo tutto senza impegno e senza
            tecnicismi.
          </p>
        </section>

        {/* Form */}
        <div className="max-w-xl mx-auto w-full">
          {successName !== null ? (
            <div
              className="relative bg-gradient-to-b from-card to-background border border-yellow-500/20 rounded-2xl p-8 shadow-[0_0_60px_-15px_rgba(184,142,67,0.15)] text-center"
              role="status"
            >
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-yellow-500/30 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-yellow-500/30 rounded-br-2xl pointer-events-none" />
              <p className="font-body text-lg text-white/90 pt-2">
                Grazie {successName}! Ti contatteremo entro 24 ore.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative bg-gradient-to-b from-card to-background border border-yellow-500/20 rounded-2xl p-8 shadow-[0_0_60px_-15px_rgba(184,142,67,0.15)] space-y-6"
            >
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-yellow-500/30 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-yellow-500/30 rounded-br-2xl pointer-events-none" />

              <div className="space-y-2">
                <label
                  htmlFor="landing-name"
                  className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em]"
                >
                  Nome e Cognome
                </label>
                <input
                  id="landing-name"
                  name="from_name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className="bg-background/60 border border-border/60 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 rounded-lg transition-all duration-300 w-full px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                  placeholder="Mario Rossi"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="landing-phone"
                  className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em]"
                >
                  Numero di telefono
                </label>
                <input
                  id="landing-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-background/60 border border-border/60 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 rounded-lg transition-all duration-300 w-full px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                  placeholder="+39 333 000 0000"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="landing-email"
                  className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em]"
                >
                  Email
                </label>
                <input
                  id="landing-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/60 border border-border/60 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 rounded-lg transition-all duration-300 w-full px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                  placeholder="mario@email.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="landing-message"
                  className="block text-[10px] font-semibold text-yellow-500/70 uppercase tracking-[0.25em]"
                >
                  Messaggio opzionale
                </label>
                <textarea
                  id="landing-message"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descrivi brevemente la tua situazione (opzionale)"
                  className="bg-background/60 border border-border/60 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 rounded-lg transition-all duration-300 w-full px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400/90" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:opacity-60 disabled:pointer-events-none text-white rounded-lg py-4 font-semibold text-base transition-colors"
              >
                {sending ? "Invio in corso…" : "Richiedi Consulenza Gratuita"}
              </button>
            </form>
          )}
        </div>

        {/* Trust bar */}
        <section className="max-w-3xl mx-auto mt-12 sm:mt-16">
          <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
            <li className="flex items-center gap-2 text-sm text-white/60 max-w-xs sm:max-w-none">
              <Check className="w-4 h-4 text-[hsl(40_55%_55%)] shrink-0" aria-hidden />
              <span>100% Online — senza sportelli</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-white/60 max-w-xs sm:max-w-none">
              <Check className="w-4 h-4 text-[hsl(40_55%_55%)] shrink-0" aria-hidden />
              <span>Professionisti del settore</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-white/60 max-w-xs sm:max-w-none">
              <Check className="w-4 h-4 text-[hsl(40_55%_55%)] shrink-0" aria-hidden />
              <span>Acconto di soli €50</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="shrink-0 py-8 px-4">
        <p className="text-center text-xs text-white/30 max-w-2xl mx-auto">
          © 2026 WebSuccessioni · info@websuccessioni.it · P.IVA in fase di registrazione
        </p>
      </footer>
    </div>
  );
};

export default LandingGoogle;
