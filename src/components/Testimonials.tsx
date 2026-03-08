import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Marco R.", role: "Erede", text: "Ci hanno guidato in un momento molto difficile con grande umanità e competenza. Pratica conclusa senza intoppi e nei tempi previsti." },
  { name: "Lucia T.", role: "Imprenditrice", text: "Servizio impeccabile. Hanno gestito una successione complessa con immobili in diverse regioni, risolvendo ogni problematica catastale." },
  { name: "Giovanni M.", role: "Professionista", text: "Trasparenza e professionalità al massimo livello. Il preventivo è stato rispettato e la comunicazione sempre puntuale." },
];

const Testimonials = () => {
  return (
    <section id="testimonianze" className="py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Testimonianze</p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            La Voce dei Nostri <span className="text-gradient-gold italic">Clienti</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className="bg-card rounded-lg p-9 border border-border relative group hover:border-primary/20 transition-colors duration-300"
            >
              <Quote className="w-10 h-10 text-primary/10 absolute top-7 right-7" />
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-7">"{t.text}"</p>
              <div className="line-gold w-8 mb-5" />
              <p className="font-display text-lg font-semibold text-foreground">{t.name}</p>
              <p className="font-body text-muted-foreground text-xs tracking-wider uppercase">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
