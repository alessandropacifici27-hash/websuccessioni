import { FileText, Building2, Scale } from "lucide-react";
import { motion } from "framer-motion";

const areas = [
  {
    icon: FileText,
    title: "Dichiarazione di Successione",
    desc: "Ci occupiamo dell'intero iter: dall'analisi patrimoniale alla trasmissione telematica all'Agenzia delle Entrate, garantendo il rispetto di tutte le scadenze.",
  },
  {
    icon: Building2,
    title: "Volture Catastali",
    desc: "Aggiornamento delle intestazioni catastali degli immobili ereditati presso l'Agenzia del Territorio, con precisione e rapidità documentale.",
  },
  {
    icon: Scale,
    title: "Consulenza Ereditaria",
    desc: "Assistenza qualificata su quote ereditarie, testamenti, donazioni pregresse e pianificazione della successione per proteggere il patrimonio familiare.",
  },
];

const PracticeAreas = () => {
  return (
    <section id="servizi" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">I Nostri Servizi</p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Competenza al Tuo <span className="text-gradient-gold italic">Servizio</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {areas.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative bg-card border border-border rounded-lg p-10 hover:border-primary/30 transition-all duration-500 hover:glow-gold"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-7 group-hover:bg-primary/20 transition-colors duration-300">
                <a.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{a.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              <div className="mt-6 line-gold w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
