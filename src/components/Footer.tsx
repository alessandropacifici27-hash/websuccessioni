import { Scale } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#home" className="font-display text-xl font-bold text-primary-foreground tracking-wide">
              Sterling <span className="text-gradient-gold">&</span> Associates
            </a>
            <p className="font-body text-primary-foreground/60 text-sm mt-4 leading-relaxed">
              Providing exceptional legal representation with integrity and dedication for over three decades.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Practice Areas", "About", "Testimonials", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`} className="block font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Office Hours</h4>
            <div className="font-body text-sm text-primary-foreground/60 space-y-1">
              <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
              <p>Saturday: By Appointment</p>
              <p>Sunday: Closed</p>
              <p className="text-accent mt-3">Emergency line available 24/7</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/40">© 2026 Sterling & Associates. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((l) => (
              <a key={l} href="#" className="font-body text-xs text-primary-foreground/40 hover:text-accent transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
