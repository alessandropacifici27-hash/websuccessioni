import { useState } from "react";
import { Calendar, Clock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addYears, addDays } from "date-fns";
import { it } from "date-fns/locale";

const formatDate = (d: Date) => format(d, "dd MMMM yyyy", { locale: it });

const FloatingCalculators = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [deathDate, setDeathDate] = useState("");
  const [notificationDate, setNotificationDate] = useState("");

  const successionDeadline = deathDate ? addYears(new Date(deathDate), 1) : null;
  const paymentDeadline = notificationDate ? addDays(new Date(notificationDate), 60) : null;

  return (
    <>
      {/* LEFT — Succession deadline calculator */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <AnimatePresence>
          {leftOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-72"
            >
              <div className="bg-card/80 backdrop-blur-md border border-border rounded-r-lg p-5 shadow-xl overflow-hidden w-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-display text-sm font-semibold text-foreground">Scadenza Dichiarazione</h4>
                </div>
                <label className="font-body text-[10px] font-medium text-foreground/60 mb-1.5 block uppercase tracking-wider">
                  Data di Decesso
                </label>
                <input
                  type="date"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                  className="w-full max-w-full box-border h-9 rounded border border-input bg-secondary px-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {successionDeadline && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded border border-primary/20 bg-primary/5"
                  >
                    <p className="font-body text-[10px] text-primary uppercase tracking-wider mb-0.5">Termine</p>
                    <p className="font-display text-lg font-bold text-foreground">{formatDate(successionDeadline)}</p>
                    <div className="flex items-start gap-1.5 mt-2">
                      <AlertTriangle className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                      <p className="font-body text-[10px] text-muted-foreground leading-relaxed">
                        Entro 12 mesi dalla data di decesso.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setLeftOpen(!leftOpen)}
          className={`absolute top-1/2 -translate-y-1/2 ${leftOpen ? "left-72" : "left-0"} bg-card/80 backdrop-blur-md border border-border border-l-0 rounded-r-md p-2 shadow-lg transition-all duration-300 hover:bg-primary/10 group`}
        >
          {leftOpen ? (
            <ChevronLeft className="w-4 h-4 text-primary" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          )}
        </button>
      </div>

      {/* RIGHT — Payment deadline calculator */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <AnimatePresence>
          {rightOpen && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-72"
            >
              <div className="bg-card/80 backdrop-blur-md border border-border rounded-l-lg p-5 shadow-xl overflow-hidden w-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-display text-sm font-semibold text-foreground">Scadenza Pagamento</h4>
                </div>
                <label className="font-body text-[10px] font-medium text-foreground/60 mb-1.5 block uppercase tracking-wider">
                  Data Notifica Avviso
                </label>
                <input
                  type="date"
                  value={notificationDate}
                  onChange={(e) => setNotificationDate(e.target.value)}
                  className="w-full max-w-full box-border h-9 rounded border border-input bg-secondary px-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {paymentDeadline && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded border border-primary/20 bg-primary/5"
                  >
                    <p className="font-body text-[10px] text-primary uppercase tracking-wider mb-0.5">Termine</p>
                    <p className="font-display text-lg font-bold text-foreground">{formatDate(paymentDeadline)}</p>
                    <div className="flex items-start gap-1.5 mt-2">
                      <AlertTriangle className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                      <p className="font-body text-[10px] text-muted-foreground leading-relaxed">
                        Entro 60 giorni dalla notifica dell'avviso di liquidazione.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setRightOpen(!rightOpen)}
          className={`absolute top-1/2 -translate-y-1/2 ${rightOpen ? "right-72" : "right-0"} bg-card/80 backdrop-blur-md border border-border border-r-0 rounded-l-md p-2 shadow-lg transition-all duration-300 hover:bg-primary/10 group`}
        >
          {rightOpen ? (
            <ChevronRight className="w-4 h-4 text-primary" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <ChevronLeft className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingCalculators;
