import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "393331234567";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Servizi", href: "#servizi" },
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contatti" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href="#home" className="font-display text-2xl font-bold text-foreground tracking-wide">
          Web<span className="text-gradient-gold">Successioni</span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-primary text-xs font-body font-medium tracking-[0.15em] uppercase transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2">
            <Button variant="heroOutline" size="sm" asChild>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </Button>
            <Button variant="gold" size="sm" asChild>
              <a href="tel:+393331234567">
                <Phone className="w-3.5 h-3.5" /> Chiama Ora
              </a>
            </Button>
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary text-sm font-body font-medium tracking-[0.15em] uppercase py-2 transition-colors">
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 mt-2">
                <Button variant="gold" size="sm" className="w-fit" asChild>
                  <a href="tel:+393331234567">
                    <Phone className="w-3.5 h-3.5" /> Chiama
                  </a>
                </Button>
                <Button variant="heroOutline" size="sm" className="w-fit" asChild>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
