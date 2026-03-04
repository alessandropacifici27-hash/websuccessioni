import { useState } from "react";
import { BookOpen, FileCheck, Landmark, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const guides = [
  {
    icon: BookOpen,
    title: "Guida alla Successione",
    summary: "Tutto quello che devi sapere sulla dichiarazione di successione: chi deve presentarla, quando e come.",
    tag: "Guida Completa",
    detail: `La dichiarazione di successione è un adempimento fiscale obbligatorio che deve essere presentato entro 12 mesi dalla data del decesso all'Agenzia delle Entrate.

Chi deve presentarla: sono obbligati alla presentazione gli eredi, i chiamati all'eredità, i legatari, i rappresentanti legali degli eredi o dei legatari, gli immessi nel possesso dei beni in caso di assenza del defunto e gli amministratori dell'eredità.

Quando presentarla: la dichiarazione va presentata entro 12 mesi dalla data di apertura della successione, che generalmente coincide con la data del decesso. Il mancato rispetto del termine comporta l'applicazione di sanzioni amministrative.

Come si presenta: dal 2019 la dichiarazione di successione deve essere presentata esclusivamente per via telematica tramite i servizi dell'Agenzia delle Entrate. È possibile avvalersi di intermediari abilitati — come il nostro studio — per la compilazione e la trasmissione.

Casi di esonero: non c'è obbligo di presentazione se l'eredità è devoluta al coniuge e ai parenti in linea retta del defunto, l'attivo ereditario ha un valore non superiore a 100.000 euro e non comprende beni immobili o diritti reali immobiliari.`,
  },
  {
    icon: FileCheck,
    title: "Documenti Necessari",
    summary: "L'elenco completo dei documenti da raccogliere per la presentazione della dichiarazione di successione.",
    tag: "Checklist",
    detail: `Per la presentazione della dichiarazione di successione è necessario raccogliere i seguenti documenti:

• Estratto per riassunto dell'atto di morte (in caso di testamento).

• Certificato di morte (in ogni caso).

• Fotocopie di carta d'identità e codice fiscale del defunto e di tutti gli eredi.

• Copie (anche fotocopie) degli atti di provenienza (rogiti o altre dichiarazioni di successione).

• Prospetto dei conti correnti bancari e/o postali e delle relative attività (es. titoli azionari, obbligazioni, fondi), rilasciato dall'istituto con riferimento alla data della morte.

• Eventuali partecipazioni in società (es. SNC, SAS, SPA, SRL, SRLS).

• Segnalazione di eventuali aziende (per titolari di ditte o imprese individuali).

• Codice IBAN dell'erede dichiarante.

Il nostro team ti guiderà nella raccolta e nella verifica di ogni documento necessario.`,
  },
  {
    icon: Landmark,
    title: "Imposte e Franchigie",
    summary: "Come si calcolano le imposte di successione, le aliquote per grado di parentela e le franchigie applicabili.",
    tag: "Fiscalità",
    detail: `Le imposte di successione in Italia variano in base al grado di parentela tra il defunto e il beneficiario:

Aliquote e franchigie:
• Coniuge e parenti in linea retta (figli, genitori): aliquota del 4% sul valore eccedente la franchigia di 1.000.000 € per ciascun beneficiario.
• Fratelli e sorelle: aliquota del 6% sul valore eccedente la franchigia di 100.000 € per ciascun beneficiario.
• Altri parenti fino al 4° grado, affini in linea retta e affini in linea collaterale fino al 3° grado: aliquota del 6% senza franchigia.
• Tutti gli altri soggetti: aliquota dell'8% senza franchigia.

Per i beneficiari portatori di handicap grave (L. 104/92), la franchigia è elevata a 1.500.000 €, indipendentemente dal grado di parentela.

Imposte ipotecarie e catastali (per immobili):
• Imposta ipotecaria: 2% del valore catastale degli immobili.
• Imposta catastale: 1% del valore catastale degli immobili.
• Se almeno uno degli eredi può usufruire delle agevolazioni "prima casa", le imposte ipotecaria e catastale sono dovute nella misura fissa di 200 € ciascuna.

Tributi speciali e tassa ipotecaria sono inoltre dovuti in misura fissa al momento della presentazione.

Fonte: Agenzia delle Entrate.`,
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {guides.map((g, i) => (
            <motion.article
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-all duration-400 hover:glow-gold cursor-pointer"
              onClick={() => toggle(i)}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <g.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-[10px] tracking-widest uppercase text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full">
                    {g.tag}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground ml-auto transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {g.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {g.summary}
                </p>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-5 border-t border-border">
                        <p className="font-body text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {g.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-5 line-gold w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
