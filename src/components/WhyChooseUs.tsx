import { ShieldCheck, Clock, HeartHandshake, Award } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Assistenza Completa",
    desc: "Ti seguiamo in ogni fase della pratica, dalla raccolta dei documenti fino alla conclusione.",
  },
  {
    icon: Clock,
    title: "Tempi Rapidi",
    desc: "Gestiamo le pratiche con efficienza per rispettare tutte le scadenze di legge.",
  },
  {
    icon: HeartHandshake,
    title: "Consulenza Dedicata",
    desc: "Un referente personale a tua disposizione per rispondere a ogni dubbio o necessità.",
  },
  {
    icon: Award,
    title: "Esperienza Certificata",
    desc: "Oltre 2.000 pratiche gestite con un tasso di soddisfazione del 98%.",
  },
];

const valueProposition = {
  title: "Offriamo competenza e qualità del servizio al pari di uno studio notarile ma al costo di un CAF",
  description:
    "Offriamo un servizio a costi contenuti, paragonabili a quelli di un CAF, ma con la qualità, la precisione e l'efficienza di uno studio notarile. Il nostro team, composto da professionisti, tecnici del catasto ed avvocati, garantisce un'assistenza di altissimo livello in ogni fase della pratica.",
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">
              I Nostri Punti di Forza
            </p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Perché <span className="text-gradient-gold italic">Sceglierci</span>
          </h2>
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12 bg-card border border-primary/20 rounded-lg p-10 text-center glow-gold"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            {valueProposition.title}
          </h3>
          <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
            {valueProposition.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileTap={{
                boxShadow: "0 0 20px hsl(40 55% 55% / 0.4)",
                borderColor: "hsl(40 55% 55% / 0.25)",
              }}
              transition={{
                duration: 0.2,
                opacity: { duration: 0.45, delay: i * 0.1 },
              }}
              className="group text-center bg-card border border-border rounded-lg p-8 hover:border-primary/25 hover:glow-gold will-change-[box-shadow] transition-[box-shadow_0.3s_ease,border-color_0.3s_ease]"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {r.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
