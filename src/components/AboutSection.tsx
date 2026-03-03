import { Scale, MapPin, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    icon: Scale,
    title: "Avvocati Specializzati",
    desc: "Professionisti del diritto successorio con anni di esperienza nel settore, pronti a tutelare i tuoi interessi.",
  },
  {
    icon: MapPin,
    title: "Tecnici del Catasto",
    desc: "Esperti in visure catastali, volture e pratiche immobiliari per una gestione impeccabile del patrimonio ereditario.",
  },
  {
    icon: Shield,
    title: "Riservatezza Garantita",
    desc: "Ogni pratica viene gestita con la massima discrezione e nel pieno rispetto della privacy dei nostri clienti.",
  },
  {
    icon: Users,
    title: "Assistenza Personalizzata",
    desc: "Un referente dedicato ti segue in ogni fase, dalla consulenza iniziale fino alla conclusione della pratica.",
  },
];

const AboutSection = () => {
  return (
    <section id="chi-siamo" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Chi Siamo</p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Professionisti al{" "}
            <span className="text-gradient-gold italic">Tuo Servizio</span>
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            WebSuccessioni nasce dall'unione di avvocati, tecnici del catasto e professionisti del settore legale con l'obiettivo di offrire un servizio di eccellenza nella gestione delle dichiarazioni di successione. Da anni mettiamo a disposizione la nostra competenza con serietà, trasparenza e dedizione al cliente.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {team.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <t.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="font-body text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Il nostro team garantisce la qualità e la precisione di uno studio notarile, con costi accessibili e tempi rapidi. Ogni pratica è seguita con la cura che meriti.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
