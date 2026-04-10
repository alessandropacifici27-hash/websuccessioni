import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.webp";

const WHATSAPP_NUMBER = "393793511586";
const PHONE_NUMBER = "+393793511586";
const EMAIL = "info@websuccessioni.it";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <img
        src={heroBg}
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
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
          <span className="text-primary font-body font-medium text-xs tracking-[0.35em] uppercase">Servizi Professionali</span>
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
          className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light"
        >
          Trasformiamo la complessità burocratica in un percorso sereno. Ti accompagniamo con competenza, discrezione e la massima cura in ogni fase della pratica successoria.
        </motion.p>

        {/* CTA contatto - via principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center"
        >
          <Button
            variant="heroOutline"
            size="default"
            className="rounded-full py-3 px-4 sm:px-5 min-w-[240px] font-medium transition-all duration-200 md:text-[0.7rem] text-[0.65rem]"
            asChild
          >
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="w-3.5 h-3.5" />
              Chiamaci Ora
            </a>
          </Button>
          <Button
            variant="heroOutline"
            size="default"
            className="rounded-full py-3 px-4 sm:px-5 min-w-[240px] font-medium transition-all duration-200 md:text-[0.7rem] text-[0.65rem]"
            asChild
          >
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salve,%20vorrei%20richiedere%20un%20preventivo%20gratuito%20per%20una%20dichiarazione%20di%20successione.`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Scrivici su WhatsApp
            </a>
          </Button>
          <Button
            variant="heroOutline"
            size="default"
            className="rounded-full py-3 px-4 sm:px-5 min-w-[240px] font-medium transition-all duration-200 md:text-[0.7rem] text-[0.65rem]"
            asChild
          >
            <a href={`mailto:${EMAIL}?subject=Richiesta%20Preventivo%20Gratuito`}>
              <Mail className="w-3.5 h-3.5" />
              Scrivici per Email
            </a>
          </Button>
        </motion.div>

        {/* CTA secondaria - Inizia Pratica Online */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-5 flex justify-center"
        >
          <Link
            to="/inizia-pratica-online"
            className="font-body text-sm text-white/50 underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            Inizia pratica online
          </Link>
        </motion.div>

        {/* Link Calcola scadenze - solo desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center"
        >
          <Link
            to="/calcola-scadenze-e-imposte"
            className="hidden md:inline-flex font-body text-sm text-white/50 underline underline-offset-4 hover:text-white/80 transition-colors mt-6"
          >
            Calcola scadenze e imposte
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="font-body text-white/90 text-xs tracking-wider mt-10"
        >
          Preventivo gratuito · Risposta entro 24h · Nessun vincolo
        </motion.p>

        {/* Link Calcola scadenze - solo mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="md:hidden mt-4"
        >
          <Link
            to="/calcola-scadenze-e-imposte"
            className="md:hidden inline-flex font-body text-sm text-white/50 underline underline-offset-4 hover:text-white/80 transition-colors mt-4"
          >
            Calcola scadenze e imposte
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
