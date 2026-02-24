import { useState } from "react";
import { Calendar, AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { format, addYears, addDays } from "date-fns";
import { it } from "date-fns/locale";

const DateCalculators = () => {
  const [deathDate, setDeathDate] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  const successionDeadline = deathDate ? addYears(new Date(deathDate), 1) : null;
  const paymentDeadline = submissionDate ? addDays(new Date(submissionDate), 60) : null;

  const formatDate = (d: Date) => format(d, "dd MMMM yyyy", { locale: it });

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Strumenti Utili</p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Calcola le Tue <span className="text-gradient-gold italic">Scadenze</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Calculator 1: Death date → Succession deadline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-background border border-border rounded-lg p-8 hover:border-primary/20 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Scadenza Dichiarazione</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Inserisci la data di decesso per calcolare il termine di presentazione della dichiarazione di successione (12 mesi).
            </p>
            <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">
              Data di Decesso
            </label>
            <input
              type="date"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
              className="w-full h-11 rounded-md border border-input bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {successionDeadline && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-lg border border-primary/20 bg-primary/5"
              >
                <p className="font-body text-xs text-primary uppercase tracking-wider mb-1">Termine Presentazione</p>
                <p className="font-display text-2xl font-bold text-foreground">{formatDate(successionDeadline)}</p>
                <div className="flex items-start gap-2 mt-3">
                  <AlertTriangle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    La dichiarazione deve essere presentata entro 12 mesi dalla data di apertura della successione.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Calculator 2: Submission date → Payment deadline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-background border border-border rounded-lg p-8 hover:border-primary/20 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Scadenza Pagamento Imposte</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Inserisci la data di notifica dell'avviso di liquidazione per calcolare il termine di pagamento delle imposte (60 giorni).
            </p>
            <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">
              Data Notifica Avviso di Liquidazione
            </label>
            <input
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full h-11 rounded-md border border-input bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {paymentDeadline && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-lg border border-primary/20 bg-primary/5"
              >
                <p className="font-body text-xs text-primary uppercase tracking-wider mb-1">Termine Pagamento</p>
                <p className="font-display text-2xl font-bold text-foreground">{formatDate(paymentDeadline)}</p>
                <div className="flex items-start gap-2 mt-3">
                  <AlertTriangle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Il pagamento deve essere effettuato entro 60 giorni dalla notifica dell'avviso di liquidazione. Scaduto tale termine, sono applicabili sanzioni e interessi di mora.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DateCalculators;
