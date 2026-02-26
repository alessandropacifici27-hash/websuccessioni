import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "websuccessioni_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-2xl mx-auto bg-card/95 backdrop-blur border border-border rounded-md px-4 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <Cookie className="w-4 h-4 text-primary shrink-0" />
              <p className="font-body text-xs text-muted-foreground flex-1">
                Utilizziamo cookie tecnici e di profilazione.{" "}
                <a href="#" className="text-primary hover:underline">Cookie Policy</a>
              </p>
              <div className="flex gap-2 shrink-0">
                <Button variant="gold" size="sm" className="h-7 text-xs px-3" onClick={accept}>
                  Accetta
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs px-3" onClick={decline}>
                  Rifiuta
                </Button>
              </div>
              <button onClick={decline} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" aria-label="Chiudi">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
