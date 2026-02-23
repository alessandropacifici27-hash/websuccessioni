import { CheckCircle, Shield, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Shield, title: "Riservatezza Totale", desc: "Ogni pratica è trattata con la massima discrezione e nel pieno rispetto della privacy." },
  { icon: Clock, title: "Tempi Certi", desc: "Rispettiamo le scadenze fiscali e ti aggiorniamo su ogni fase dell'avanzamento." },
  { icon: Award, title: "Esperienza Consolidata", desc: "Oltre un decennio di esperienza e migliaia di pratiche concluse con successo." },
];

const AboutSection = () => {
  return (
    <section id="chi-siamo" className="py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Chi Siamo</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Precisione e Dedizione al{" "}
              <span className="text-gradient-gold italic">Tuo Fianco</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-base">
              Sappiamo quanto possa essere difficile affrontare questioni burocratiche in un momento delicato. Per questo ci siamo noi. Il nostro team si occupa di ogni aspetto con professionalità, trasparenza e un approccio umano.
            </p>
            <ul className="space-y-4">
              {[
                "Trasmissione telematica all'Agenzia delle Entrate",
                "Analisi completa della situazione patrimoniale",
                "Preventivo chiaro e senza sorprese",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80 font-body text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {features.map((f) => (
              <div key={f.title} className="flex gap-6 items-start bg-card border border-border rounded-lg p-7 hover:border-primary/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
