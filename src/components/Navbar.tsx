import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_NUMBER = "393477471921";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Come Funziona", href: "/come-funziona" },
  { label: "FAQ", href: "/faq" },
  { label: "Servizi Proposti", href: "/servizi-offerti" },
  { label: "Strumenti Utili", href: "/strumenti-utili" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

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
      <div className="container mx-auto relative flex items-center h-14 md:h-16 px-4">
        {/* Desktop nav links - centered normally, left-aligned when CTA buttons visible */}
        <div className={`hidden md:flex items-center gap-5 transition-all duration-300 ${pastHero ? "" : "mx-auto"}`}>
          {navLinks.map(renderLink)}
        </div>

        {/* Desktop CTA buttons - absolute right, appear after scrolling past hero */}
        <AnimatePresence>
          {pastHero && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-2 ml-auto"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center absolute right-4">
          <button
            ref={hamburgerRef}
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
            ref={mobileMenuRef}
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
