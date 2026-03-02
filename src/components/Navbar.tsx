import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_NUMBER = "393477471921";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Come Funziona", href: "/come-funziona" },
  { label: "FAQ", href: "/faq" },
  { label: "Contatti", href: "/#contatti" },
  { label: "Servizi Offerti", href: "/servizi-offerti" },
  { label: "Strumenti Utili", href: "/strumenti-utili" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  const renderLink = (l: typeof navLinks[0]) => {
    const linkClass = "text-muted-foreground hover:text-primary text-sm font-body font-medium tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap";
    return l.href.startsWith("/#") ? (
      <a
        key={l.href}
        href={l.href}
        onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
        className={linkClass}
      >
        {l.label}
      </a>
    ) : (
      <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)} className={linkClass}>
        {l.label}
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-background/80 backdrop-blur-sm"}`}>
      <div className="container mx-auto flex items-center justify-between h-14 md:h-16 px-4">
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(renderLink)}
        </div>

        {/* Desktop CTA buttons - appear after scrolling past hero */}
        <div className={`hidden md:flex items-center gap-2 transition-all duration-300 ${pastHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
          <Button variant="gold" size="sm" asChild>
            <a href="tel:+393477471921">
              <Phone className="w-3.5 h-3.5" /> Chiamaci Ora
            </a>
          </Button>
          <Button variant="heroOutline" size="sm" asChild>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-3.5 h-3.5" /> Scrivici su WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="flex flex-col items-center gap-4 py-5 px-4">
              {navLinks.map(renderLink)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
