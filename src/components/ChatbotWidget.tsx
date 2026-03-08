import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
}

function renderMessageText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    const lines = part.split("\n");
    return lines.map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </span>
    ));
  });
}

const QUICK_QUESTIONS = [
  "Qual è il costo del servizio?",
  "Quali documenti servono?",
  "Quanto tempo ci vuole?",
  "Come vi contatto?",
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Ciao! 👋 Sono l'assistente di WebSuccessioni. Come posso aiutarti? Puoi chiedermi informazioni su costi, documenti, tempi, scadenze e molto altro." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

  const handleSend = async (text?: string) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...conversationHistory,
            { role: "user", content: trimmed },
          ],
          systemPrompt: `Sei l'assistente virtuale di WebSuccessioni, un servizio professionale online per la presentazione delle dichiarazioni di successione in Italia. 
        
Il tuo compito è rispondere in modo chiaro, preciso e professionale alle domande degli utenti riguardo:
- Dichiarazioni di successione (costi, documenti necessari, tempi, scadenze)
- Volture catastali
- Imposte di successione e franchigie
- Come funziona il servizio WebSuccessioni

Informazioni importanti su WebSuccessioni:
- Tutto avviene online, nessun ufficio da visitare
- Tempi di elaborazione: entro una settimana dalla ricezione dei documenti
- Contatti: WhatsApp +39 379 3511586, email info@websuccessioni.it
- Orari: lunedì-venerdì 9:00-18:00, sabato 9:00-13:00
- Pagamento tramite bonifico bancario
- La dichiarazione va presentare entro 12 mesi dal decesso

Rispondi sempre in italiano, in modo cordiale e professionale. Sii conciso ma completo. Non inventare prezzi specifici — invita sempre a richiedere un preventivo gratuito personalizzato.`,
        }),
      });

      const data = await response.json();
      const botText = data.content?.[0]?.text || "Mi dispiace, si è verificato un errore. Contattaci su WhatsApp al +39 379 3511586.";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Si è verificato un errore. Contattaci direttamente su WhatsApp al +39 379 3511586 o via email a info@websuccessioni.it." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const showQuickQuestions = messages.length <= 1;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-20 right-0 w-[88vw] max-w-[400px] h-[72vh] max-h-[540px] bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_-10px_hsl(40_55%_55%/0.08)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-gradient-to-r from-secondary/80 to-secondary/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground leading-tight">Assistente AI</p>
                  <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase">WebSuccessioni</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-[1.6] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md shadow-sm"
                        : "bg-secondary/70 text-foreground rounded-bl-md border border-border/30"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-secondary/70 text-foreground rounded-2xl rounded-bl-md border border-border/30 px-5 py-3.5 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              {showQuickQuestions && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] font-body px-3.5 py-2 rounded-xl border border-primary/20 text-primary/90 hover:bg-primary/8 hover:border-primary/40 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/40 px-4 py-3 bg-secondary/20">
              <div className="flex gap-2 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 bg-secondary/60 text-foreground text-sm rounded-xl px-4 py-2.5 outline-none placeholder:text-muted-foreground/60 border border-border/40 focus:border-primary/30 transition-colors font-body"
                  disabled={isTyping}
                />
                <Button
                  variant="gold"
                  size="icon"
                  onClick={() => handleSend()}
                  className="rounded-xl w-10 h-10 shrink-0 shadow-sm"
                  disabled={isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        ref={fabRef}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-primary rounded-2xl shadow-lg glow-gold px-5 h-13"
        style={{ height: '52px' }}
        aria-label="Apri chat assistente"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-primary-foreground" />
        ) : (
          <>
            <Bot className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground font-body text-xs font-semibold tracking-wide hidden sm:inline">Chat AI</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
