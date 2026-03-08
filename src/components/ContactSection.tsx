import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import LandlineIcon from "@/components/LandlineIcon";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const info = [
  { icon: "phone" as const, label: "+39 379 3511586", href: "tel:+393793511586" },
  { icon: "landline" as const, label: "+39 02 92892296", href: "tel:+390292892296" },
  { icon: "whatsapp" as const, label: "WhatsApp", href: "https://wa.me/393793511586" },
  { icon: "telegram" as const, label: "Telegram", href: "https://t.me/WebSuccessioni" },
  { icon: "mail" as const, label: "info@websuccessioni.it", href: "mailto:info@websuccessioni.it" },
  { icon: "clock" as const, label: "Lun – Ven: 9:00 – 18:00 | Sab: 9:00 – 13:00" },
];

const ContactSection = () => {
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !messaggio.trim()) {
      toast({ title: "Campi obbligatori", description: "Compila almeno nome, email e descrizione.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        "service_i1pju5e",
        "template_cffzon9",
        { from_name: nome.trim(), from_email: email.trim(), phone: telefono.trim() || "Non fornito", message: messaggio.trim() },
        "qFsjEtnqQNDnN5WlA"
      );
      toast({ title: "Messaggio inviato!", description: "Ti risponderemo entro 24 ore." });
      setNome("");
      setTelefono("");
      setEmail("");
      setMessaggio("");
    } catch (error) {
      toast({ title: "Errore nell'invio", description: "Riprova o contattaci direttamente su WhatsApp.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "phone": return <Phone className="w-5 h-5 text-primary" />;
      case "landline": return <LandlineIcon className="w-5 h-5 text-primary" />;
      case "whatsapp": return <WhatsAppIcon />;
      case "telegram": return <TelegramIcon />;
      case "mail": return <Mail className="w-5 h-5 text-primary" />;
      case "clock": return <Clock className="w-5 h-5 text-primary" />;
      default: return null;
    }
  };

  return (
    <section id="contatti" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Contattaci</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Consulenza <span className="text-gradient-gold italic">Gratuita</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-10 text-base">
              Raccontaci la tua situazione. Un nostro esperto ti ricontatterà entro 24 ore per offrirti un orientamento gratuito e senza impegno.
            </p>

            <div className="space-y-6">
              {info.map((item, i) => {
                const content = (
                  <div className="flex items-center gap-5">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      {renderIcon(item.icon)}
                    </div>
                    <p className="font-body text-sm text-foreground/80">{item.label}</p>
                  </div>
                );
                return item.href ? (
                  <a key={`${item.label}-${i}`} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={`${item.label}-${i}`}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card border border-border rounded-lg p-10 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Nome e Cognome *</label>
                <Input placeholder="Mario Rossi" className="font-body bg-secondary border-border" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Telefono</label>
                <Input placeholder="+39 333 000 0000" className="font-body bg-secondary border-border" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Email *</label>
              <Input type="email" placeholder="mario@email.com" className="font-body bg-secondary border-border" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Descrivi la tua situazione *</label>
              <Textarea placeholder="Raccontaci brevemente la tua esigenza..." rows={4} className="font-body resize-none bg-secondary border-border" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} required />
            </div>
            <Button variant="gold" size="lg" className="w-full" type="submit" disabled={sending}>
              <Send className="w-4 h-4" />
              {sending ? "Invio in corso..." : "Invia messaggio"}
            </Button>
            <p className="font-body text-xs text-muted-foreground text-center">Le tue informazioni sono trattate con la massima riservatezza.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
