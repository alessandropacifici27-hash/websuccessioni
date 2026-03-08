import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png";

const WHATSAPP_NUMBER = "393793511586";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Inizia Pratica Online", href: "/inizia-pratica" },
  { label: "Strumenti Utili", href: "/strumenti-utili" },
  { label: "FAQ", href: "/faq" },
  { label: "Contatti", href: "/#contatti" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const SUBPAGES = ['/chi-siamo', '/come-funziona', '/faq', '/servizi-proposti', '/strumenti-utili'];
  const isSubpage = SUBPAGES.includes(location.pathname);
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          setPastHero(window.scrollY > window.innerHeight * 0.85);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change (skip hash links)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

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

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.slice(1); // e.g. "#contatti"
      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      return;
    }
  };

  const renderLink = (l: typeof navLinks[0]) => {
    const active = isActive(l.href);
    const linkClass = `text-sm font-body font-medium tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap ${
      active ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

    if (l.href.startsWith("/#")) {
      return (
        <button
          key={l.href}
          onClick={() => handleNavClick(l.href)}
          className={linkClass}
        >
          {l.label}
        </button>
      );
    }

    return (
      <Link
        key={l.href}
        to={l.href}
        onClick={() => setMobileOpen(false)}
        className={linkClass}
      >
        {l.label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        scrolled
          ? "bg-background/60 backdrop-blur-md border-border/50"
          : "bg-background/30 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="container mx-auto relative flex items-center h-14 md:h-16 px-4">
        <a href="/" className="flex items-center mr-6">
          <img src={logo} alt="WebSuccessioni" className="h-14 w-auto object-contain brightness-150 rounded-xl" />
        </a>
        {/* Desktop nav links - GPU-accelerated smooth transition */}
        <div
          className="hidden md:flex items-center gap-5 will-change-transform transition-[transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            transform: (pastHero || isSubpage) ? "translateX(0)" : "translateX(calc(50vw - 50% - 2rem))",
          }}
        >
          {navLinks.map(renderLink)}
        </div>

        {/* Desktop CTA buttons */}
        <AnimatePresence>
          {(pastHero || isSubpage) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="hidden md:flex items-center gap-2 ml-auto"
            >
              <Button variant="gold" size="sm" asChild>
                <a href="tel:+393793511586">
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
            className="md:hidden overflow-hidden bg-background/40 backdrop-blur-lg border-b border-border/30"
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
