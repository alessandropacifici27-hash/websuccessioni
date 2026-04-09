import { useState, useEffect, useRef } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.webp";

const WHATSAPP_NUMBER = "393793511586";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Inizia Pratica Online", href: "/inizia-pratica-online" },
  { label: "Consulenza Giuridica", href: "/consulenza-giuridica" },
  { label: "Calcola scadenze e imposte", href: "/calcola-scadenze-e-imposte" },
  { label: "Guide", href: "/guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Contatti", href: "/#contatti" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const SUBPAGES = ['/chi-siamo', '/come-funziona', '/faq', '/servizi-proposti', '/calcola-scadenze-e-imposte', '/inizia-pratica-online', '/guide'];
  const isSubpage = SUBPAGES.includes(pathname) || pathname.startsWith('/guide/');
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
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

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
    if (href === "/") return pathname === "/" && !hash;
    if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
    return pathname === href;
  };

  const renderLink = (l: typeof navLinks[0]) => {
    const active = isActive(l.href);
    const linkClass = `text-sm font-body font-medium tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap ${
      active ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

    if (l.href.startsWith("/#")) {
      const handleContattiClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      
        const doScroll = () => {
          const el = document.getElementById('contatti');
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        };
      
        if (window.location.pathname === '/') {
          // Già sulla home: chiudi menu e aspetta che il menu 
          // si chiuda prima di calcolare la posizione
          setMobileOpen(false);
          setTimeout(doScroll, 350);
        } else {
          // Su altra pagina: naviga alla home con hash
          setMobileOpen(false);
          window.location.href = '/#contatti';
        }
      };
      return (
        <a
          key={l.href}
          href="/#contatti"
          className={linkClass}
          onClick={handleContattiClick}
        >
          Contatti
        </a>
      );
    }

    return (
      <Link
        key={l.href}
        to={l.href}
        onClick={() => {
          setMobileOpen(false);
          if (pathname === l.href) {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setTimeout(() => window.location.reload(), 50);
          }
        }}
        className={linkClass}
      >
        {l.label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        scrolled
          ? "z-50 bg-background/60 backdrop-blur-md border-border/50"
          : "z-40 bg-background/30 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="container mx-auto relative flex items-center justify-between h-14 md:h-16 px-4">
        <a href="/" className="flex items-center mr-6 rounded-full overflow-hidden shrink-0">
          <img src={logo} alt="WebSuccessioni" width="56" height="56" className="h-14 w-auto object-contain brightness-150 rounded-full" />
        </a>
        {/* Desktop nav links - centrati con absolute per bilanciamento indipendente da logo/CTA */}
        <div
          className="hidden md:flex absolute left-1/2 items-center gap-5 will-change-transform transition-[transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: "translate(-50%, 0)" }}
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
              className="hidden md:flex items-center gap-2 ml-auto z-40"
            >
              <a
                href="tel:+390292892296"
                aria-label="Chiamaci"
                className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <a
                href="mailto:info@websuccessioni.it"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
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
