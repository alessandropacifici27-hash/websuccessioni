import { useState } from "react";
import { Calendar, AlertTriangle, Clock, Users, Calculator, TreePine } from "lucide-react";
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

/* ─── Tax Calculator Logic ─── */
const TAX_BRACKETS = [
  { label: "Coniuge / Figlio", rate: 0.04, franchise: 1000000 },
  { label: "Fratello / Sorella", rate: 0.06, franchise: 100000 },
  { label: "Altro parente (entro 4° grado)", rate: 0.06, franchise: 0 },
  { label: "Estraneo / Non parente", rate: 0.08, franchise: 0 },
];

const DateCalculators = () => {
  const [deathDate, setDeathDate] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  // Tax calculator
  const [inheritanceValue, setInheritanceValue] = useState("");
  const [selectedBracket, setSelectedBracket] = useState(0);
  const [disabilityExemption, setDisabilityExemption] = useState(false);

  const successionDeadline = deathDate ? addYears(new Date(deathDate), 1) : null;
  const paymentDeadline = submissionDate ? addDays(new Date(submissionDate), 60) : null;

  const formatDate = (d: Date) => format(d, "dd MMMM yyyy", { locale: it });

  // Tax calculation
  const bracket = TAX_BRACKETS[selectedBracket];
  const valueNum = parseFloat(inheritanceValue) || 0;
  const effectiveFranchise = disabilityExemption ? 1500000 : bracket.franchise;
  const taxableAmount = Math.max(0, valueNum - effectiveFranchise);
  const taxAmount = taxableAmount * bracket.rate;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

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
            className={cardClass}
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
            className={cardClass}
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
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 rounded-lg border border-primary/20 bg-primary/5">
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

          {/* Calculator 3: Inheritance Tax Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.12, delay: 0.04 }}
            className={cardClass}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Calcolo Imposte di Successione</h3>
            </div>
            <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
              Stima le imposte di successione in base al valore dei beni ereditati e al grado di parentela con il defunto.
            </p>

            <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">
              Grado di Parentela
            </label>
            <select
              value={selectedBracket}
              onChange={(e) => setSelectedBracket(Number(e.target.value))}
              className="w-full h-11 rounded-md border border-input bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-4"
            >
              {TAX_BRACKETS.map((b, i) => (
                <option key={i} value={i}>{b.label} — aliquota {(b.rate * 100)}%</option>
              ))}
            </select>

            <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">
              Valore Beni Ereditati (€)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={inheritanceValue}
              onChange={(e) => setInheritanceValue(e.target.value)}
              placeholder="Es. 500000"
              className="w-full h-11 rounded-md border border-input bg-secondary px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-4"
            />

            <label className="flex items-center gap-3 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={disabilityExemption}
                onChange={(e) => setDisabilityExemption(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="font-body text-sm text-foreground/80">Erede con disabilità grave (franchigia 1.500.000 €)</span>
            </label>

            {valueNum > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-5 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Valore beni:</span>
                  <span className="text-foreground font-medium">{formatCurrency(valueNum)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Franchigia:</span>
                  <span className="text-foreground font-medium">{formatCurrency(effectiveFranchise)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Imponibile:</span>
                  <span className="text-foreground font-medium">{formatCurrency(taxableAmount)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-body text-sm text-primary font-medium">Imposta stimata:</span>
                  <span className="font-display text-xl font-bold text-foreground">{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Calcolo indicativo. Le imposte ipotecarie e catastali (2% + 1% sul valore degli immobili) sono escluse da questa stima.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

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
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.2, delay: 0.16 }}
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
