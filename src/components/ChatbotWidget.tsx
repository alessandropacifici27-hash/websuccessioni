import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface QAPair {
  keywords: string[];
  answer: string;
}

const QA_DATABASE: QAPair[] = [
  {
    keywords: ["costo", "costa", "prezzo", "prezzi", "tariffa", "tariffe", "quanto"],
    answer: "Il costo dipende dalla complessità della successione. Una successione semplice (senza immobili o con pochi beni) ha un costo inferiore rispetto a una più articolata. Contattaci tramite questa chat o su WhatsApp al +39 379 3511586 per ricevere un preventivo gratuito e personalizzato in pochi minuti."
  },
  {
    keywords: ["documenti", "documento", "documentazione", "serve", "servono", "fornire", "necessari"],
    answer: "I documenti necessari variano in base alla situazione, ma in generale sono:\n\n📋 **Documenti base obbligatori:** certificato di morte, documento d'identità e codice fiscale del defunto e di tutti gli eredi.\n\n🏠 **Se ci sono immobili:** visure catastali e atti di provenienza degli immobili.\n\n🏦 **Se ci sono conti bancari o investimenti:** estratti conto e documentazione finanziaria alla data del decesso.\n\nDopo il primo contatto ti inviamo una lista personalizzata e precisa in base alla tua situazione."
  },
  {
    keywords: ["tempo", "tempi", "durata", "veloce", "quanto ci vuole", "giorni", "settimana"],
    answer: "Una volta ricevuti tutti i documenti necessari, completiamo la dichiarazione di successione entro una settimana. Ti teniamo aggiornato durante tutto il processo e ti avvisiamo subito se dovesse servire qualcosa in più."
  },
  {
    keywords: ["cos'è", "cosa è", "cos è", "dichiarazione di successione", "chi deve", "obbligat", "presentarla"],
    answer: "La dichiarazione di successione è un documento fiscale obbligatorio da presentare all'Agenzia delle Entrate entro 12 mesi dalla data del decesso. Sono obbligati a presentarla gli eredi e i legatari. Con WebSuccessioni ci occupiamo noi di tutto — senza che tu debba recarti fisicamente in nessun ufficio."
  },
  {
    keywords: ["online", "persona", "venire", "fisicamente", "sportello", "ufficio", "sede", "di persona"],
    answer: "Tutto avviene comodamente online. Carichi i documenti dal sito, noi elaboriamo la pratica e ti inviamo tutto via email. Nessuno sportello, nessuna fila, nessun notaio da raggiungere fisicamente."
  },
  {
    keywords: ["legale", "valido", "legalmente", "valida", "ufficiale", "riconosciut"],
    answer: "Sì, assolutamente. La dichiarazione viene redatta e presentata telematicamente all'Agenzia delle Entrate nel pieno rispetto della normativa vigente. Riceverai la ricevuta ufficiale di presentazione come conferma."
  },
  {
    keywords: ["dopo", "invio", "inviato", "cosa succede", "procedura", "iter", "processo"],
    answer: "Ricevi subito una conferma via email. Il nostro team verifica che tutto sia completo, elabora la dichiarazione e te la invia per una revisione finale prima della presentazione ufficiale. Entro una settimana hai tutto pronto."
  },
  {
    keywords: ["scadenza", "termine", "entro quando", "12 mesi", "sanzioni", "multa", "ritardo"],
    answer: "La legge prevede 12 mesi dalla data del decesso. Superato questo termine si rischiano sanzioni e interessi. Non aspettare — contattaci subito e ti aiutiamo a essere in regola per tempo."
  },
  {
    keywords: ["complicat", "complessa", "più eredi", "molti eredi", "immobili", "conti", "investimenti", "difficile"],
    answer: "Nessun problema, gestiamo anche successioni complesse che includono immobili, conti correnti, investimenti e più eredi. In fase di preventivo valutiamo la tua situazione e ti diciamo esattamente cosa serve e quanto costa."
  },
  {
    keywords: ["preventivo", "stima", "quotazione"],
    answer: "Semplicissimo — scrivici tramite questa chat oppure contattaci su WhatsApp al +39 379 3511586. Ti risponderemo in tempi brevi con un preventivo gratuito e senza impegno."
  },
  {
    keywords: ["contatt", "telefono", "email", "chiamare", "scrivere", "whatsapp", "raggiungere", "orari"],
    answer: "Puoi usare questa chat, scriverci via email a info@websuccessioni.it oppure contattarci su WhatsApp al +39 379 3511586. Siamo disponibili dal lunedì al venerdì, dalle 9:00 alle 18:00."
  },
  {
    keywords: ["pagament", "pagare", "come si paga", "metodo", "bonifico", "carta"],
    answer: "Accettiamo pagamenti tramite bonifico bancario. Riceverai tutti i dettagli una volta confermato il preventivo. Il pagamento è richiesto prima della presentazione della dichiarazione."
  },
  {
    keywords: ["voltura", "catast", "catastale"],
    answer: "Ci occupiamo anche della voltura catastale degli immobili ereditati, un passaggio necessario per aggiornare l'intestazione catastale a nome degli eredi. È inclusa nel nostro servizio completo di dichiarazione di successione."
  },
  {
    keywords: ["imposte", "tasse", "imposta", "franchigia", "aliquota", "aliquote"],
    answer: "Le imposte di successione variano in base al grado di parentela e al valore dei beni ereditati. Per coniuge e figli si applica un'aliquota del 4% con franchigia di 1.000.000€ ciascuno. Per fratelli e sorelle il 6% con franchigia di 100.000€. Per altri parenti il 6% senza franchigia. Per estranei l'8%. Contattaci per un calcolo preciso sulla tua situazione."
  },
  {
    keywords: ["ciao", "salve", "buongiorno", "buonasera", "hey", "salut"],
    answer: "Ciao! 👋 Come posso aiutarti? Puoi chiedermi informazioni su costi, documenti necessari, tempi di lavorazione, scadenze e molto altro riguardo la dichiarazione di successione."
  },
  {
    keywords: ["grazie", "ringrazio", "gentile", "perfetto"],
    answer: "Grazie a te! Se hai altre domande non esitare a chiedere. Siamo qui per aiutarti. 😊"
  }
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let bestMatch: { answer: string; matchCount: number } | null = null;

  for (const qa of QA_DATABASE) {
    let matchCount = 0;
    for (const keyword of qa.keywords) {
      const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (lower.includes(normalizedKeyword)) {
        matchCount++;
      }
    }
    if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.matchCount)) {
      bestMatch = { answer: qa.answer, matchCount };
    }
  }

  if (bestMatch) return bestMatch.answer;

  return "Grazie per il tuo messaggio! Non ho trovato una risposta specifica alla tua domanda. Per assistenza personalizzata, contattaci su WhatsApp al +39 379 3511586 o via email a info@websuccessioni.it. Saremo felici di aiutarti!";
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

  const handleSend = (text?: string) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const botMsg: Message = { role: "bot", text: findAnswer(trimmed) };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
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
