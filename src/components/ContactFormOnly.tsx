import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const ContactFormOnly = () => {
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
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Form Contatti Home',
          content_category: 'Dichiarazione di Successione',
        });
      }
      // Google Ads conversion tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18018460148/S1ScCOf3kI0cEPTD749D',
          'value': 50.0,
          'currency': 'EUR'
        });
      }
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.2 }}
      className="relative bg-gradient-to-b from-card to-background border border-yellow-500/20 rounded-2xl p-10 space-y-7 shadow-[0_0_60px_-15px_rgba(184,142,67,0.15)]"
      onSubmit={handleSubmit}
    >
      {/* Decorazione angolo top-left */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-yellow-500/30 rounded-tl-2xl pointer-events-none" />
      {/* Decorazione angolo bottom-right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-yellow-500/30 rounded-br-2xl pointer-events-none" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="font-body text-[10px] font-semibold text-yellow-500/70 block uppercase tracking-[0.25em]">Nome e Cognome <span className="text-yellow-500">*</span></label>
          <Input
            placeholder="Mario Rossi"
            className="font-body bg-background/60 border-border/60 focus:border-yellow-500/50 focus:ring-yellow-500/20 rounded-lg h-11 transition-all duration-300"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="font-body text-[10px] font-semibold text-yellow-500/70 block uppercase tracking-[0.25em]">Telefono</label>
          <Input
            placeholder="+39 333 000 0000"
            className="font-body bg-background/60 border-border/60 focus:border-yellow-500/50 focus:ring-yellow-500/20 rounded-lg h-11 transition-all duration-300"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-body text-[10px] font-semibold text-yellow-500/70 block uppercase tracking-[0.25em]">Email <span className="text-yellow-500">*</span></label>
        <Input
          type="email"
          placeholder="mario@email.com"
          className="font-body bg-background/60 border-border/60 focus:border-yellow-500/50 focus:ring-yellow-500/20 rounded-lg h-11 transition-all duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-body text-[10px] font-semibold text-yellow-500/70 block uppercase tracking-[0.25em]">Descrivi la tua situazione <span className="text-yellow-500">*</span></label>
        <Textarea
          placeholder="Descrivi brevemente la tua situazione"
          rows={5}
          className="font-body resize-none bg-background/60 border-border/60 focus:border-yellow-500/50 focus:ring-yellow-500/20 rounded-lg transition-all duration-300"
          value={messaggio}
          onChange={(e) => setMessaggio(e.target.value)}
          required
        />
      </div>

      <div className="pt-2 space-y-4">
        <Button
          variant="gold"
          size="lg"
          className="w-full h-12 text-sm tracking-[0.15em] uppercase font-semibold shadow-[0_0_30px_-8px_rgba(184,142,67,0.4)] hover:shadow-[0_0_40px_-8px_rgba(184,142,67,0.6)] transition-all duration-300"
          type="submit"
          disabled={sending}
        >
          <Send className="w-4 h-4 mr-2" />
          {sending ? "Invio in corso..." : "Invia messaggio"}
        </Button>
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-yellow-500/20" />
          <p className="font-body text-[10px] text-muted-foreground/60 text-center tracking-wider uppercase">Le tue informazioni sono trattate con la massima riservatezza</p>
          <span className="h-px w-8 bg-yellow-500/20" />
        </div>
      </div>
    </motion.form>
  );
};

export default ContactFormOnly;
