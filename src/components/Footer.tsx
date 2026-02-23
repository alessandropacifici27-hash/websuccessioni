const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#home" className="font-display text-2xl font-bold text-foreground tracking-wide">
              Web<span className="text-gradient-gold">Successioni</span>
            </a>
            <p className="font-body text-muted-foreground text-sm mt-5 leading-relaxed">
              Servizio professionale di presentazione delle dichiarazioni di successione. Competenza, trasparenza e dedizione al cliente.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">Navigazione</h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "Servizi", href: "#servizi" },
                { label: "Chi Siamo", href: "#chi-siamo" },
                { label: "Testimonianze", href: "#testimonianze" },
                { label: "Contatti", href: "#contatti" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">Orari</h4>
            <div className="font-body text-sm text-muted-foreground space-y-2">
              <p>Lunedì – Venerdì: 9:00 – 18:00</p>
              <p>Sabato: Su appuntamento</p>
              <p>Domenica: Chiuso</p>
              <p className="text-primary mt-4 font-medium">info@websuccessioni.it</p>
            </div>
          </div>
        </div>

        <div className="line-gold w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground/60">© 2026 WebSuccessioni. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Cookie Policy", "Termini di Servizio"].map((l) => (
              <a key={l} href="#" className="font-body text-xs text-muted-foreground/60 hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
