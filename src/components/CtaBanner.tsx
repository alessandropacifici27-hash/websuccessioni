import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const CtaBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      <div className="absolute inset-0 bg-background/80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hai Bisogno di <span className="text-gradient-gold italic">Assistenza?</span>
          </h2>
          <p className="font-body text-muted-foreground text-sm md:text-base mb-8 leading-relaxed">
            Contattaci ora per una consulenza gratuita. Siamo disponibili per rispondere 
            a tutte le tue domande sulla dichiarazione di successione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+393477471921"
              className="inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              Chiamaci Ora
            </a>
            <a
              href="https://wa.me/393477471921"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-card border border-border text-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:border-primary/30 hover:glow-gold transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 text-primary" />
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaBanner;
