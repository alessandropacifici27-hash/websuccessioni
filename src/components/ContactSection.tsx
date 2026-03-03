import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const info = [
  { icon: Phone, label: "+39 3477471921" },
  { icon: Phone, label: "02 92892296" },
  { icon: Mail, label: "info@websuccessioni.it" },
  { icon: Clock, label: "Lun – Ven: 9:00 – 18:00" },
];

const ContactSection = () => {
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
              {info.map((item, i) => (
                <div key={`${item.label}-${i}`} className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-body text-sm text-foreground/80">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card border border-border rounded-lg p-10 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Nome e Cognome</label>
                <Input placeholder="Mario Rossi" className="font-body bg-secondary border-border" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Telefono</label>
                <Input placeholder="+39 333 000 0000" className="font-body bg-secondary border-border" />
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Email</label>
              <Input type="email" placeholder="mario@email.com" className="font-body bg-secondary border-border" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-foreground/70 mb-2 block uppercase tracking-wider">Descrivi la tua situazione</label>
              <Textarea placeholder="Raccontaci brevemente la tua esigenza..." rows={4} className="font-body resize-none bg-secondary border-border" />
            </div>
            <Button variant="gold" size="lg" className="w-full">Richiedi Consulenza Gratuita</Button>
            <p className="font-body text-xs text-muted-foreground text-center">Le tue informazioni sono trattate con la massima riservatezza.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
