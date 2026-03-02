import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_NUMBER = "393477471921";
const PHONE_NUMBER = "+393477471921";
const EMAIL = "info@websuccessioni.it";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover md:bg-fixed"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-28 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="line-gold w-12 inline-block" />
          <span className="text-primary font-body font-medium text-xs tracking-[0.35em] uppercase">Studio Professionale</span>
          <span className="line-gold w-12 inline-block" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-8"
        >
          Dichiarazioni di{" "}
          <span className="text-gradient-gold italic">Successione</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Trasformiamo la complessità burocratica in un percorso sereno. Ti accompagniamo con competenza, discrezione e la massima cura in ogni fase della pratica successoria.
          <br /><br />
          Il costo del servizio parte da 250€ a seconda della complessità del caso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <Button variant="hero" size="xl" className="md:h-14 md:px-10 md:text-base h-[3.15rem] px-8 text-[0.85rem]" asChild>
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="w-4 h-4" />
              Chiamaci Ora
            </a>
          </Button>
          <Button variant="heroOutline" size="xl" className="md:h-14 md:px-10 md:text-base h-[3.15rem] px-8 text-[0.85rem]" asChild>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salve,%20vorrei%20richiedere%20un%20preventivo%20gratuito%20per%20una%20dichiarazione%20di%20successione.`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Scrivici su WhatsApp
            </a>
          </Button>
          <Button variant="heroOutline" size="xl" className="md:h-14 md:px-10 md:text-base h-[3.15rem] px-8 text-[0.85rem]" asChild>
            <a href={`mailto:${EMAIL}?subject=Richiesta%20Preventivo%20Gratuito`}>
              <Mail className="w-4 h-4" />
              Scrivici per Email
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="font-body text-muted-foreground/60 text-xs tracking-wider mt-10"
        >
          Preventivo gratuito · Risposta entro 24h · Nessun vincolo
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
