import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
}

function renderMessageText(text: string) {
  // Simple markdown-like rendering: **bold** and \n
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Split by newlines
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
  "Quanto costa?",
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
        headers: {
          "Content-Type": "application/json",
        },
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
- Orari: lunedì-venerdì 9:00-18:00
- Pagamento tramite bonifico bancario
- La dichiarazione va presentare entro 12 mesi dal decesso

Rispondi sempre in italiano, in modo cordiale e professionale. Sii conciso ma completo. Non inventare prezzi specifici — invita sempre a richiedere un preventivo gratuito personalizzato.`,
        }),
      });

      const data = await response.json();
      const botText = data.content?.[0]?.text || "Mi dispiace, si è verificato un errore. Contattaci su WhatsApp al +39 379 3511586.";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-[85vw] max-w-[370px] h-[70vh] max-h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
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
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {/* Quick question buttons */}
              {showQuickQuestions && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs font-body px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

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
                disabled={isTyping}
              />
              <Button
                variant="gold"
                size="icon"
                onClick={() => handleSend()}
                className="rounded-full w-9 h-9 shrink-0"
                disabled={isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
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
