import { useState } from "react";
import { BookOpen, FileCheck, Landmark, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const guides = [
  {
    icon: BookOpen,
    title: "Guida alla Successione",
    summary: "Tutto quello che devi sapere sulla dichiarazione di successione: chi deve presentarla, quando e come.",
    tag: "Guida Completa",
    details: [
      { heading: "Cos'è", text: "La dichiarazione di successione è un adempimento fiscale obbligatorio che deve essere presentato entro 12 mesi dalla data del decesso all'Agenzia delle Entrate." },
      { heading: "Chi deve presentarla", text: "Sono obbligati alla presentazione gli eredi, i chiamati all'eredità, i legatari, i rappresentanti legali, gli immessi nel possesso dei beni e gli amministratori dell'eredità." },
      { heading: "Quando presentarla", text: "Entro 12 mesi dalla data di apertura della successione (generalmente la data del decesso). Il mancato rispetto del termine comporta sanzioni amministrative." },
      { heading: "Come si presenta", text: "Dal 2019 esclusivamente per via telematica tramite i servizi dell'Agenzia delle Entrate. È possibile avvalersi di intermediari abilitati come il nostro studio." },
      { heading: "Esonero", text: "Non è obbligatoria se l'eredità è devoluta al coniuge e ai parenti in linea retta, l'attivo non supera 100.000 € e non comprende beni immobili." },
    ],
  },
  {
    icon: FileCheck,
    title: "Documenti Necessari",
    summary: "L'elenco completo dei documenti da raccogliere per la presentazione della dichiarazione di successione.",
    tag: "Checklist",
    details: [
      { heading: "", text: "Estratto per riassunto dell'atto di morte (in caso di testamento)" },
      { heading: "", text: "Certificato di morte (in ogni caso)" },
      { heading: "", text: "Fotocopie di carta d'identità e codice fiscale del defunto e di tutti gli eredi" },
      { heading: "", text: "Copie degli atti di provenienza (rogiti o altre dichiarazioni di successione)" },
      { heading: "", text: "Prospetto dei conti correnti bancari e/o postali e delle relative attività, rilasciato dall'istituto con riferimento alla data della morte" },
      { heading: "", text: "Eventuali partecipazioni in società (SNC, SAS, SPA, SRL, SRLS)" },
      { heading: "", text: "Segnalazione di eventuali aziende (per titolari di ditte o imprese individuali)" },
      { heading: "", text: "Codice IBAN dell'erede dichiarante" },
    ],
  },
  {
    icon: Landmark,
    title: "Imposte e Franchigie",
    summary: "Come si calcolano le imposte di successione, le aliquote per grado di parentela e le franchigie applicabili.",
    tag: "Fiscalità",
    details: [
      { heading: "Coniuge e linea retta", text: "Aliquota 4% sul valore eccedente la franchigia di 1.000.000 € per ciascun beneficiario." },
      { heading: "Fratelli e sorelle", text: "Aliquota 6% sul valore eccedente la franchigia di 100.000 € per ciascun beneficiario." },
      { heading: "Parenti fino al 4° grado", text: "Aliquota 6% senza franchigia." },
      { heading: "Altri soggetti", text: "Aliquota 8% senza franchigia." },
      { heading: "Handicap grave (L. 104/92)", text: "Franchigia elevata a 1.500.000 €, indipendentemente dal grado di parentela." },
      { heading: "Imposte ipotecarie e catastali", text: "Imposta ipotecaria 2% e catastale 1% del valore catastale degli immobili. Con agevolazione prima casa: 200 € ciascuna in misura fissa." },
    ],
  },
];

const GuidesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">
              Risorse Utili
            </p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Guide e <span className="text-gradient-gold italic">Approfondimenti</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {guides.map((g, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.12, delay: i * 0.02 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className={`w-full text-left bg-card border rounded-lg p-6 transition-all duration-300 ${
                    isOpen ? "border-primary/30 glow-gold" : "border-border hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <g.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-semibold text-foreground">{g.title}</h3>
                        <span className="font-body text-[10px] tracking-widest uppercase text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full hidden sm:inline">
                          {g.tag}
                        </span>
                      </div>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{g.summary}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 bg-card border border-t-0 border-border rounded-b-lg -mt-2">
                        <div className="pt-4 space-y-3">
                          {g.details.map((d, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                {d.heading && <span className="text-foreground font-medium">{d.heading}: </span>}
                                {d.text}
                              </p>
                            </div>
                          ))}
                          {i === 2 && (
                            <p className="font-body text-xs text-muted-foreground/60 mt-4 italic">
                              Fonte: Agenzia delle Entrate
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
