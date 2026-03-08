import { Phone, FolderSearch, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Contattaci",
    desc: "Chiamaci o scrivici su WhatsApp per una prima consulenza gratuita e senza impegno.",
  },
  {
    icon: FolderSearch,
    step: "02",
    title: "Raccolta Documenti",
    desc: "Ti indichiamo tutti i documenti necessari e ti assistiamo nella raccolta.",
  },
  {
    icon: Send,
    step: "03",
    title: "Presentazione Pratica",
    desc: "Elaboriamo e trasmettiamo la dichiarazione di successione all'Agenzia delle Entrate.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Tutto Risolto",
    desc: "Ricevi la conferma di avvenuta presentazione e le volture catastali completate.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">
              Il Nostro Processo
            </p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Come <span className="text-gradient-gold italic">Funziona</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-px bg-border" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.12, delay: i * 0.02 }}
              className="relative text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-body text-primary/50 text-xs tracking-widest uppercase">
                Passo {s.step}
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">
                {s.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
