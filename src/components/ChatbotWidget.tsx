import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
}

const PREDEFINED_ANSWERS: Record<string, string> = {
  costo: "Il costo del nostro servizio parte da 250€ a seconda della complessità della pratica. Contattaci per un preventivo gratuito!",
  prezzo: "Il costo del nostro servizio parte da 250€ a seconda della complessità della pratica. Contattaci per un preventivo gratuito!",
  documenti: "Per la dichiarazione di successione servono: certificato di morte, stato di famiglia, documenti catastali degli immobili, estratti conto bancari e documentazione dei beni del defunto. Ti guidiamo noi passo passo!",
  documento: "Per la dichiarazione di successione servono: certificato di morte, stato di famiglia, documenti catastali degli immobili, estratti conto bancari e documentazione dei beni del defunto. Ti guidiamo noi passo passo!",
  tempi: "I tempi medi per completare una pratica di successione sono di 30-60 giorni dalla ricezione di tutti i documenti necessari.",
  tempo: "I tempi medi per completare una pratica di successione sono di 30-60 giorni dalla ricezione di tutti i documenti necessari.",
  contatto: "Puoi contattarci al numero 347 747 1921 (anche WhatsApp), oppure via email a info@websuccessioni.it. Rispondiamo entro 24h!",
  contatti: "Puoi contattarci al numero 347 747 1921 (anche WhatsApp), oppure via email a info@websuccessioni.it. Rispondiamo entro 24h!",
  telefono: "Puoi chiamarci al numero 347 747 1921, siamo disponibili per assisterti!",
  successione: "La dichiarazione di successione è un adempimento fiscale obbligatorio da presentare entro 12 mesi dal decesso. Ci occupiamo di tutto noi, dalla raccolta documenti alla presentazione telematica.",
  scadenza: "La dichiarazione di successione va presentata entro 12 mesi dalla data del decesso. Non aspettare l'ultimo momento, contattaci per tempo!",
  immobili: "Ci occupiamo della voltura catastale degli immobili ereditati, inclusa nel nostro servizio di dichiarazione di successione.",
};

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, answer] of Object.entries(PREDEFINED_ANSWERS)) {
    if (lower.includes(key)) return answer;
  }
  return "Grazie per il tuo messaggio! Per una risposta più dettagliata, ti consigliamo di contattarci al 347 747 1921 o via email a info@websuccessioni.it. Saremo felici di aiutarti!";
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Ciao! 👋 Sono l'assistente di WebSuccessioni. Come posso aiutarti? Puoi chiedermi informazioni su costi, documenti, tempi e molto altro." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        chatRef.current && !chatRef.current.contains(e.target as Node) &&
        fabRef.current && !fabRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    const botMsg: Message = { role: "bot", text: findAnswer(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-[85vw] max-w-[340px] h-[65vh] max-h-[480px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-display text-sm font-semibold text-foreground">Assistente WebSuccessioni</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border px-3 py-2.5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Scrivi un messaggio..."
                className="flex-1 bg-secondary/60 text-foreground text-sm rounded-full px-4 py-2 outline-none placeholder:text-muted-foreground border border-border focus:border-primary/40 transition-colors"
              />
              <Button
                variant="gold"
                size="icon"
                onClick={handleSend}
                className="rounded-full w-9 h-9 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB - Distinct chatbot icon with label */}
      <motion.button
        ref={fabRef}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-primary rounded-full shadow-lg glow-gold px-4 h-14"
        aria-label="Apri chat assistente"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <>
            <Bot className="w-6 h-6 text-primary-foreground" />
            <span className="text-primary-foreground font-body text-sm font-semibold hidden sm:inline">Chat AI</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
