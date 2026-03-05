import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Primo Contatto", desc: "Ci contatti telefonicamente o via email. Ascoltiamo la tua situazione e ti forniamo un primo orientamento gratuito." },
  { num: "02", title: "Raccolta Documenti", desc: "Ti indichiamo esattamente quali documenti servono. Li analizziamo e verifichiamo la completezza del fascicolo." },
  { num: "03", title: "Elaborazione Pratica", desc: "Prepariamo la dichiarazione di successione e tutte le pratiche accessorie con la massima precisione." },
  { num: "04", title: "Trasmissione e Chiusura", desc: "Effettuiamo la trasmissione telematica e ti consegniamo tutta la documentazione finale." },
];

const ProcessSection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Come Funziona</p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Il Nostro <span className="text-gradient-gold italic">Processo</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative text-center"
            >
              <span className="font-display text-6xl font-bold text-primary/40 block mb-4">{s.num}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-px h-12 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
