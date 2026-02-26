import { BookOpen, FileCheck, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const guides = [
  {
    icon: BookOpen,
    title: "Guida alla Successione",
    summary: "Tutto quello che devi sapere sulla dichiarazione di successione: chi deve presentarla, quando e come.",
    tag: "Guida Completa",
  },
  {
    icon: FileCheck,
    title: "Documenti Necessari",
    summary: "L'elenco completo dei documenti da raccogliere per la presentazione della dichiarazione di successione.",
    tag: "Checklist",
  },
  {
    icon: Landmark,
    title: "Imposte e Franchigie",
    summary: "Come si calcolano le imposte di successione, le aliquote per grado di parentela e le franchigie applicabili.",
    tag: "Fiscalità",
  },
];

const GuidesSection = () => {
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
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/25 transition-all duration-400 hover:glow-gold"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <g.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-[10px] tracking-widest uppercase text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full">
                    {g.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {g.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {g.summary}
                </p>
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
