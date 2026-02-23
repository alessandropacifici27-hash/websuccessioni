import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Prestigious law office" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent font-body font-semibold text-sm tracking-[0.3em] uppercase mb-6"
        >
          Trusted Legal Excellence Since 1987
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto mb-6"
        >
          Justice Delivered with{" "}
          <span className="text-gradient-gold italic">Distinction</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-body text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          We combine decades of courtroom experience with a client-first philosophy to protect your rights and secure your future.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="hero" size="xl">
            <Phone className="w-4 h-4" /> Schedule Consultation
          </Button>
          <Button variant="heroOutline" size="xl">
            Our Practice Areas <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
