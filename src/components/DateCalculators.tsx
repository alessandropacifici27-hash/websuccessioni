import { useState, useRef, type ReactNode } from "react";
import { Calendar, AlertTriangle, Clock, Users, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import { format, addYears, addDays } from "date-fns";
import { it } from "date-fns/locale";

/* ─── Kinship Data ─── */
const KINSHIP_DEGREES = [
  { relation: "Coniuge", degree: "—", line: "Affinità", taxRate: "4%", franchise: "1.000.000 €" },
  { relation: "Figlio/a", degree: "1°", line: "Retta discendente", taxRate: "4%", franchise: "1.000.000 €" },
  { relation: "Genitore", degree: "1°", line: "Retta ascendente", taxRate: "4%", franchise: "1.000.000 €" },
  { relation: "Nipote (figlio di figlio)", degree: "2°", line: "Retta discendente", taxRate: "4%", franchise: "1.000.000 €" },
  { relation: "Nonno/a", degree: "2°", line: "Retta ascendente", taxRate: "4%", franchise: "1.000.000 €" },
  { relation: "Fratello/Sorella", degree: "2°", line: "Collaterale", taxRate: "6%", franchise: "100.000 €" },
  { relation: "Zio/a", degree: "3°", line: "Collaterale", taxRate: "6%", franchise: "Nessuna" },
  { relation: "Nipote (figlio di fratello)", degree: "3°", line: "Collaterale", taxRate: "6%", franchise: "Nessuna" },
  { relation: "Cugino/a", degree: "4°", line: "Collaterale", taxRate: "6%", franchise: "Nessuna" },
  { relation: "Estraneo / Non parente", degree: "—", line: "—", taxRate: "8%", franchise: "Nessuna" },
];

type DateCalculatorsProps = {
  suppressIntroHeading?: boolean;
  insertAfterDeadlines?: ReactNode;
};

const DateCalculators = ({ suppressIntroHeading, insertAfterDeadlines }: DateCalculatorsProps = {}) => {
  const deathDateRef = useRef<HTMLInputElement>(null);
  const submissionDateRef = useRef<HTMLInputElement>(null);
  const [deathDate, setDeathDate] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [anteRiforma, setAnteRiforma] = useState(false);

  const successionDeadline = deathDate ? addYears(new Date(deathDate), 1) : null;
  const paymentDeadline = submissionDate ? addDays(new Date(submissionDate), anteRiforma ? 60 : 90) : null;

  const formatDate = (d: Date) => format(d, "dd MMMM yyyy", { locale: it });

  const cardClass = "bg-background border border-border rounded-lg p-6 md:p-8 hover:border-primary/20 transition-colors duration-300";

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
            Calcola le Tue <span className="text-gradient-gold italic">Scadenze e Imposte</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Strumenti gratuiti per calcolare scadenze, imposte di successione e comprendere i gradi di parentela.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto px-1">
          {/* Calculator 1: Death date → Succession deadline */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.12 }}
            className={`w-full overflow-hidden ${cardClass}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground leading-tight whitespace-normal">Scadenza presentazione Dichiarazione<br />di Successione</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Inserisci la data di decesso per calcolare il termine di presentazione della dichiarazione di successione (12 mesi).
            </p>
            <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">
              Data di Decesso
            </label>
            <div className="w-full overflow-hidden relative min-w-0 block rounded-lg">
              <input
                ref={deathDateRef}
                type="date"
                value={deathDate}
                onChange={(e) => setDeathDate(e.target.value)}
                className="w-full max-w-full box-border h-11 rounded-md border border-input bg-secondary px-3 py-2 pr-10 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500 cursor-pointer" onClick={() => deathDateRef.current?.showPicker()} />
            </div>
            {successionDeadline && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 rounded-lg border border-primary/20 bg-primary/5">
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
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.12, delay: 0.02 }}
            className={`w-full overflow-hidden ${cardClass}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground leading-tight whitespace-normal">Scadenza pagamento Imposte<br />di Successione</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Per le successioni successive al 1° gennaio 2025 l'imposta deve essere corrisposta entro 90 giorni dal termine di presentazione della dichiarazione di successione. Per le successioni ante 1° gennaio 2025 il termine di pagamento è di 60 giorni dalla notifica dell'avviso di liquidazione.
            </p>
            <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">
              Data Notifica Avviso di Liquidazione
            </label>
            <div className="w-full overflow-hidden relative min-w-0 block rounded-lg">
              <input
                ref={submissionDateRef}
                type="date"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full max-w-full box-border h-11 rounded-md border border-input bg-secondary px-3 py-2 pr-10 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500 cursor-pointer" onClick={() => submissionDateRef.current?.showPicker()} />
            </div>
            <label className="flex items-center gap-3 mt-3 cursor-pointer group">
              <div
                onClick={() => setAnteRiforma(!anteRiforma)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                  anteRiforma ? "bg-yellow-500 border-yellow-500" : "bg-secondary border-border group-hover:border-yellow-500/50"
                }`}
              >
                {anteRiforma && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
              </div>
              <span className="font-body text-sm text-foreground/80 leading-snug">
                Successione ante 1° gennaio 2025
                <span className="block text-xs text-muted-foreground mt-0.5">Il termine è di 60 giorni dalla notifica dell'avviso di liquidazione</span>
              </span>
            </label>
            {paymentDeadline && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 rounded-lg border border-primary/20 bg-primary/5">
                <p className="font-body text-xs text-primary uppercase tracking-wider mb-1">Termine Pagamento</p>
                <p className="font-display text-2xl font-bold text-foreground">{formatDate(paymentDeadline)}</p>
                <div className="flex items-start gap-2 mt-3">
                  <AlertTriangle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {anteRiforma
                      ? "Il pagamento deve essere effettuato entro 60 giorni dalla notifica dell'avviso di liquidazione (successione ante 1° gennaio 2025)."
                      : "Il pagamento deve essere effettuato entro 90 giorni dal termine di presentazione della dichiarazione di successione (D.Lgs. 139/2024)."}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {insertAfterDeadlines && (
            <div className="md:col-span-2 w-full max-w-full min-w-0">{insertAfterDeadlines}</div>
          )}

          {/* Tool 4: Kinship Degrees Table */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.12, delay: 0.06 }}
            className={cardClass}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Gradi di Parentela e Aliquote</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Tabella riepilogativa dei gradi di parentela con le corrispondenti aliquote e franchigie previste dalla legge.
            </p>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-body text-xs font-semibold text-foreground/70 uppercase tracking-wider py-2 px-2">Parentela</th>
                    <th className="font-body text-xs font-semibold text-foreground/70 uppercase tracking-wider py-2 px-2">Grado</th>
                    <th className="font-body text-xs font-semibold text-foreground/70 uppercase tracking-wider py-2 px-2">Aliquota</th>
                    <th className="font-body text-xs font-semibold text-foreground/70 uppercase tracking-wider py-2 px-2">Franchigia</th>
                  </tr>
                </thead>
                <tbody>
                  {KINSHIP_DEGREES.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="font-body text-[13px] text-foreground py-2.5 px-2">{row.relation}</td>
                      <td className="font-body text-[13px] text-muted-foreground py-2.5 px-2">{row.degree}</td>
                      <td className="font-body text-[13px] text-primary font-medium py-2.5 px-2">{row.taxRate}</td>
                      <td className="font-body text-[13px] text-muted-foreground py-2.5 px-2">{row.franchise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Hereditary Shares Info */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.12, delay: 0.08 }}
          className="max-w-5xl mx-auto mt-10"
        >
          <div className={cardClass}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Quote Ereditarie Legittime</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Quote spettanti agli eredi legittimi in assenza di testamento, secondo il Codice Civile italiano.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { scenario: "Solo coniuge", share: "Tutto il patrimonio" },
                { scenario: "Coniuge + 1 figlio", share: "½ al coniuge, ½ al figlio" },
                { scenario: "Coniuge + 2 o più figli", share: "⅓ al coniuge, ⅔ ai figli (divisi in parti uguali)" },
                { scenario: "Solo figli (senza coniuge)", share: "Tutto ai figli in parti uguali" },
                { scenario: "Coniuge + genitori (senza figli)", share: "⅔ al coniuge, ⅓ ai genitori" },
                { scenario: "Solo genitori (senza coniuge e figli)", share: "Tutto ai genitori in parti uguali" },
                { scenario: "Solo fratelli/sorelle", share: "Tutto ai fratelli in parti uguali" },
                { scenario: "Nessun parente entro il 6° grado", share: "I beni vanno allo Stato" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <p className="font-body text-sm font-medium text-foreground mb-1">{item.scenario}</p>
                  <p className="font-body text-xs text-muted-foreground">{item.share}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DateCalculators;
