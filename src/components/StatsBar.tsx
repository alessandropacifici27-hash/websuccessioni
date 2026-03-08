import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Anni di Esperienza" },
  { value: "2.000+", label: "Pratiche Concluse" },
  { value: "98%", label: "Clienti Soddisfatti" },
  { value: "24h", label: "Risposta Garantita" },
];

const StatsBar = () => {
  return (
    <section className="relative z-10 -mt-1">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border glow-gold"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-8 text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
              <p className="font-body text-muted-foreground text-xs tracking-wider uppercase mt-2">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
