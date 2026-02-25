import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "393477471921";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Come Funziona", href: "/come-funziona" },
  { label: "FAQ", href: "/faq" },
  { label: "Contatti", href: "/#contatti" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-background/80 backdrop-blur-sm"}`}>
      <div className="container mx-auto flex items-center justify-center h-16 px-4 gap-6 flex-wrap">
        <div className="flex items-center gap-4 md:gap-8">
          {navLinks.map((l) =>
            l.href.startsWith("/#") ? (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(l.href);
                }}
                className="text-muted-foreground hover:text-primary text-[10px] sm:text-xs font-body font-medium tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className="text-muted-foreground hover:text-primary text-[10px] sm:text-xs font-body font-medium tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap"
              >
                {l.label}
              </Link>
            )
          )}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="heroOutline" size="sm" asChild>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </Button>
          <Button variant="gold" size="sm" asChild>
            <a href="tel:+393477471921">
              <Phone className="w-3.5 h-3.5" /> Chiama Ora
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
