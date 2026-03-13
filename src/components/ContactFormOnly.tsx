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
  );
};

export default ContactFormOnly;
