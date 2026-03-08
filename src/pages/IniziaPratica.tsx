import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Clock, CheckCircle2, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

type SuccessionType = "legittima" | "testamentaria" | "";

const steps = [
  "Dati Personali",
  "Tipo di Successione",
  "Documenti",
  "Riepilogo",
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const IniziaPratica = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // STEP 1
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codiceFiscale, setCodiceFiscale] = useState("");
  const [indirizzoResidenza, setIndirizzoResidenza] = useState("");
  const [ruolo, setRuolo] = useState("");

  // STEP 2
  const [defuntoNomeCognome, setDefuntoNomeCognome] = useState("");
  const [defuntoDataNascita, setDefuntoDataNascita] = useState("");
  const [defuntoDataDecesso, setDefuntoDataDecesso] = useState("");
  const [defuntoCodiceFiscale, setDefuntoCodiceFiscale] = useState("");
  const [defuntoComuneResidenza, setDefuntoComuneResidenza] = useState("");
  const [tipoSuccessione, setTipoSuccessione] = useState<SuccessionType>("");
  const [tipoTestamento, setTipoTestamento] = useState("");
  const [presenzaImmobili, setPresenzaImmobili] = useState<"si" | "no" | "">("");
  const [descrizioneImmobili, setDescrizioneImmobili] = useState("");
  const [presenzaRapportiBancari, setPresenzaRapportiBancari] = useState<"si" | "no" | "">("");
  const [presenzaPartecipazioni, setPresenzaPartecipazioni] = useState<"si" | "no" | "">("");
  const [presenzaImbarcazioni, setPresenzaImbarcazioni] = useState<"si" | "no" | "">("");
  const [numeroEredi, setNumeroEredi] = useState("");
  const [noteAggiuntive, setNoteAggiuntive] = useState("");

  // STEP 3
  const [docDefunto, setDocDefunto] = useState(false);
  const [docEredi, setDocEredi] = useState(false);
  const [docImmobili, setDocImmobili] = useState(false);
  const [docRapportiBancari, setDocRapportiBancari] = useState(false);
  const [docSocietari, setDocSocietari] = useState(false);
  const [docTestamento, setDocTestamento] = useState(false);
  const [docSpesePassivita, setDocSpesePassivita] = useState(false);
  const [docAltro, setDocAltro] = useState(false);
  const [fileUrls, setFileUrls] = useState<string>("");
  const [domandeAggiuntive, setDomandeAggiuntive] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js";
    script.async = true;
    script.onload = () => {
      (window as any).UPLOADCARE_PUBLIC_KEY = "f1ded879783f3f762a86";
      (window as any).UPLOADCARE_LOCALE = "it";
      (window as any).UPLOADCARE_MULTIPLE = true;

      setTimeout(() => {
        const uc = (window as any).uploadcare;
        if (uc) {
          const widget = uc.Widget("[role~=uploadcare-uploader]");
          widget.onChange((fileGroup: any) => {
            if (fileGroup) {
              fileGroup.promise().then((group: any) => {
                const urls = group.files().map((f: any) => f.cdnUrl).join(", ");
                setFileUrls(urls);
              });
            }
          });
        }
      }, 500);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const currentStepIndex = step - 1;

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateStep = (s: number) => {
    if (s === 1) {
      if (!nome.trim() || !cognome.trim() || !email.trim() || !telefono.trim() || !codiceFiscale.trim() || !indirizzoResidenza.trim()) {
        toast({
          title: "Compila tutti i campi obbligatori",
          description: "Per procedere inserisci nome, cognome, email, telefono, codice fiscale e indirizzo di residenza.",
          variant: "destructive",
        });
        return false;
      }
    }
    if (s === 2) {
      if (
        !defuntoNomeCognome.trim() ||
        !defuntoDataNascita ||
        !defuntoDataDecesso ||
        !defuntoCodiceFiscale.trim() ||
        !defuntoComuneResidenza.trim() ||
        !tipoSuccessione ||
        !presenzaImmobili ||
        !presenzaRapportiBancari ||
        !presenzaPartecipazioni ||
        !presenzaImbarcazioni ||
        !numeroEredi
      ) {
        toast({
          title: "Compila tutti i campi obbligatori",
          description: "Controlla di aver inserito tutte le informazioni richieste sulla successione.",
          variant: "destructive",
        });
        return false;
      }
      if (tipoSuccessione === "testamentaria" && !tipoTestamento) {
        toast({
          title: "Specifica il tipo di testamento",
          variant: "destructive",
        });
        return false;
      }
      if (presenzaImmobili === "si" && !descrizioneImmobili.trim()) {
        toast({
          title: "Descrivi gli immobili presenti",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }

    setSending(true);
    setSuccessMessage(null);

    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const praticaNumber = `WS-${year}-${randomNum}`;

    const defuntoParts = defuntoNomeCognome.trim().split(/\s+/);
    const defuntoNome = defuntoParts[0] ?? "";
    const defuntoCognome = defuntoParts.slice(1).join(" ") ?? "";

    const templateParams = {
      nome: nome.trim(),
      cognome: cognome.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      codice_fiscale: codiceFiscale.trim(),
      indirizzo: indirizzoResidenza.trim(),
      ruolo: ruolo.trim(),
      defunto_nome: defuntoNome,
      defunto_cognome: defuntoCognome,
      defunto_data_nascita: defuntoDataNascita,
      defunto_data_decesso: defuntoDataDecesso,
      defunto_cf: defuntoCodiceFiscale.trim(),
      defunto_comune: defuntoComuneResidenza.trim(),
      tipo_successione:
        tipoSuccessione === "legittima"
          ? "Successione legittima (senza testamento)"
          : tipoSuccessione === "testamentaria"
            ? "Successione testamentaria (con testamento)"
            : "",
      tipo_testamento: tipoTestamento || "",
      immobili: presenzaImmobili === "si" ? "Sì" : presenzaImmobili === "no" ? "No" : "",
      immobili_descrizione: presenzaImmobili === "si" ? descrizioneImmobili : "",
      conti_correnti: presenzaRapportiBancari === "si" ? "Sì" : presenzaRapportiBancari === "no" ? "No" : "",
      partecipazioni: presenzaPartecipazioni === "si" ? "Sì" : presenzaPartecipazioni === "no" ? "No" : "",
      imbarcazioni: presenzaImbarcazioni === "si" ? "Sì" : presenzaImbarcazioni === "no" ? "No" : "",
      numero_eredi: numeroEredi,
      note: noteAggiuntive || "",
      file_urls: fileUrls || "",
      domande: domandeAggiuntive || "",
    };

    try {
      await emailjs.send(
        "service_i1pju5e",
        "yzxkt76",
        templateParams,
        "qFsjEtnqQNDnN5WlA"
      );

      setSuccessMessage(
        `Pratica inviata con successo! A breve verrà inviata un'email con il numero della pratica e le coordinate bancarie per il versamento dell'acconto di €50. Numero pratica: ${praticaNumber}`
      );
      toast({
        title: "Pratica inviata con successo",
        description: `Numero pratica: ${praticaNumber}`,
      });
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un problema durante l'invio della pratica. Riprova o contattaci direttamente.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Nome *
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            placeholder="Mario"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Cognome *
          </label>
          <input
            type="text"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            placeholder="Rossi"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            placeholder="mario.rossi@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Telefono *
          </label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            placeholder="+39 333 000 0000"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Codice Fiscale *
          </label>
          <input
            type="text"
            value={codiceFiscale}
            onChange={(e) => setCodiceFiscale(e.target.value.toUpperCase())}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground uppercase tracking-[0.15em] focus:outline-none focus:border-primary/60"
            placeholder="RSSMRA80A01H501U"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Ruolo nell'eredità
          </label>
          <select
            value={ruolo}
            onChange={(e) => setRuolo(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
          >
            <option value="">Seleziona</option>
            <option value="Erede">Erede</option>
            <option value="Legatario">Legatario</option>
            <option value="Esecutore testamentario">Esecutore testamentario</option>
            <option value="Curatore eredità giacente">Curatore eredità giacente</option>
            <option value="Rappresentante legale">Rappresentante legale</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
          Indirizzo di residenza *
        </label>
        <input
          type="text"
          value={indirizzoResidenza}
          onChange={(e) => setIndirizzoResidenza(e.target.value)}
          className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
          placeholder="Via Roma 1, 20100 Milano (MI)"
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Nome e Cognome del defunto *
          </label>
          <input
            type="text"
            value={defuntoNomeCognome}
            onChange={(e) => setDefuntoNomeCognome(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            placeholder="Nome Cognome"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Codice fiscale del defunto *
          </label>
          <input
            type="text"
            value={defuntoCodiceFiscale}
            onChange={(e) => setDefuntoCodiceFiscale(e.target.value.toUpperCase())}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground uppercase tracking-[0.15em] focus:outline-none focus:border-primary/60"
            placeholder="RSSMRA80A01H501U"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Data di nascita del defunto *
          </label>
          <input
            type="date"
            value={defuntoDataNascita}
            onChange={(e) => setDefuntoDataNascita(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Data del decesso *
          </label>
          <input
            type="date"
            value={defuntoDataDecesso}
            onChange={(e) => setDefuntoDataDecesso(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Comune di residenza al decesso *
          </label>
          <input
            type="text"
            value={defuntoComuneResidenza}
            onChange={(e) => setDefuntoComuneResidenza(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            placeholder="Comune (Provincia)"
          />
        </div>
      </div>

      <div className="border border-border rounded-lg p-4 bg-secondary/40">
        <p className="text-xs font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-3">
          Tipo di successione *
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="button"
            onClick={() => setTipoSuccessione("legittima")}
            className={`flex-1 text-left border rounded-md px-4 py-3 text-sm font-body transition-colors ${
              tipoSuccessione === "legittima"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
            }`}
          >
            Successione legittima (senza testamento)
          </button>
          <button
            type="button"
            onClick={() => setTipoSuccessione("testamentaria")}
            className={`flex-1 text-left border rounded-md px-4 py-3 text-sm font-body transition-colors ${
              tipoSuccessione === "testamentaria"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
            }`}
          >
            Successione testamentaria (con testamento)
          </button>
        </div>

        {tipoSuccessione === "testamentaria" && (
          <div className="mt-4">
            <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
              Tipo di testamento *
            </label>
            <select
              value={tipoTestamento}
              onChange={(e) => setTipoTestamento(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
            >
              <option value="">Seleziona</option>
              <option value="Testamento olografo">Testamento olografo</option>
              <option value="Testamento pubblico">Testamento pubblico</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
            <p className="text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em]">
            Presenza di immobili nell'asse ereditario *
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPresenzaImmobili("si")}
              className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                presenzaImmobili === "si"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
              }`}
            >
              Sì
            </button>
            <button
              type="button"
              onClick={() => setPresenzaImmobili("no")}
              className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                presenzaImmobili === "no"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
              }`}
            >
              No
            </button>
          </div>
          {presenzaImmobili === "si" && (
            <div>
              <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2 mt-2">
                Descrizione immobili *
              </label>
              <textarea
                value={descrizioneImmobili}
                onChange={(e) => setDescrizioneImmobili(e.target.value)}
                rows={3}
                className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground resize-none focus:outline-none focus:border-primary/60"
                placeholder="Es. appartamento a Milano, box auto, terreno agricolo..."
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
              Presenza di conti correnti o investimenti *
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPresenzaRapportiBancari("si")}
                className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                  presenzaRapportiBancari === "si"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
                }`}
              >
                Sì
              </button>
              <button
                type="button"
                onClick={() => setPresenzaRapportiBancari("no")}
                className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                  presenzaRapportiBancari === "no"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
              Presenza di partecipazioni societarie o aziende individuali *
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPresenzaPartecipazioni("si")}
                className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                  presenzaPartecipazioni === "si"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
                }`}
              >
                Sì
              </button>
              <button
                type="button"
                onClick={() => setPresenzaPartecipazioni("no")}
                className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                  presenzaPartecipazioni === "no"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
              Presenza di imbarcazioni o aeromobili *
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPresenzaImbarcazioni("si")}
                className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                  presenzaImbarcazioni === "si"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
                }`}
              >
                Sì
              </button>
              <button
                type="button"
                onClick={() => setPresenzaImbarcazioni("no")}
                className={`flex-1 border rounded-md px-4 py-2 text-sm font-body ${
                  presenzaImbarcazioni === "no"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-foreground/80 hover:border-primary/40"
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Numero di eredi *
          </label>
          <select
            value={numeroEredi}
            onChange={(e) => setNumeroEredi(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground focus:outline-none focus:border-primary/60"
          >
            <option value="">Seleziona</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="Più di 5">Più di 5</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
            Note aggiuntive (facoltativo)
          </label>
          <textarea
            value={noteAggiuntive}
            onChange={(e) => setNoteAggiuntive(e.target.value)}
            rows={3}
            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground resize-none focus:outline-none focus:border-primary/60"
            placeholder="Eventuali precisazioni o informazioni utili sulla situazione ereditaria."
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <p className="font-body text-lg md:text-xl text-muted-foreground">
        Seleziona le categorie di documenti che stai caricando e allega i file in un unico caricamento.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docDefunto}
            onChange={(e) => setDocDefunto(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Documenti del defunto
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Carta d'identità, codice fiscale, certificato di morte, certificato di residenza, stato di famiglia storico, estratto atto di matrimonio, sentenza di divorzio.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docEredi}
            onChange={(e) => setDocEredi(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Documenti degli eredi
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Carta d'identità, codice fiscale, stato di famiglia, eventuali rinunce all'eredità.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docImmobili}
            onChange={(e) => setDocImmobili(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Documenti immobili
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Rogiti, visure catastali, certificato di destinazione urbanistica per terreni.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docRapportiBancari}
            onChange={(e) => setDocRapportiBancari(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Rapporti bancari
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Certificazioni bancarie alla data del decesso, estratti conto, dossier titoli.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docSocietari}
            onChange={(e) => setDocSocietari(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Documenti societari/aziendali
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Visure camerali, situazioni patrimoniali, statuti societari, visure imprese individuali.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docTestamento}
            onChange={(e) => setDocTestamento(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Documenti testamento
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Verbale di deposito del testamento olografo o verbale di pubblicazione del testamento pubblico.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docSpesePassivita}
            onChange={(e) => setDocSpesePassivita(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Spese funerarie e passività
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Fatture delle spese funerarie e documentazione relativa a debiti, mutui, finanziamenti.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 bg-secondary/40 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={docAltro}
            onChange={(e) => setDocAltro(e.target.checked)}
          />
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Altro
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Qualsiasi ulteriore documentazione utile alla pratica.
            </p>
          </div>
        </label>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em]">
          Carica tutti i documenti (PDF, JPG, PNG - max 10 file)
        </label>
        <input
          type="hidden"
          role="uploadcare-uploader"
          data-public-key="f1ded879783f3f762a86"
          data-multiple="true"
          data-locale="it"
          onChange={(e: any) => {
            if (e.target.value) setFileUrls(e.target.value);
          }}
        />
        <p className="font-body text-sm text-muted-foreground mt-2">
          Carica tutti i documenti disponibili (PDF, JPG, PNG). Puoi caricare più file contemporaneamente.
        </p>
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-foreground/70 uppercase tracking-[0.2em] mb-2">
          Domande o informazioni aggiuntive (facoltativo)
        </label>
        <textarea
          value={domandeAggiuntive}
          onChange={(e) => setDomandeAggiuntive(e.target.value)}
          rows={4}
          className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-base font-body text-foreground resize-none focus:outline-none focus:border-primary/60"
          placeholder="Indica eventuali dubbi, richieste particolari o informazioni che ritieni utili."
        />
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    const tipoSuccessioneLabel =
      tipoSuccessione === "legittima"
        ? "Successione legittima (senza testamento)"
        : tipoSuccessione === "testamentaria"
          ? "Successione testamentaria (con testamento)"
          : "Non specificato";

    return (
      <motion.div
        key="step4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
        {successMessage && (
          <div className="border border-primary/40 bg-primary/5 text-primary rounded-lg px-4 py-3 font-body text-sm">
            {successMessage}
          </div>
        )}

        <div className="border border-primary/40 bg-card rounded-lg p-5">
          <p className="font-body text-sm text-foreground">
            Dopo l'invio verrà inviata entro pochi minuti un'email di conferma con il numero della pratica. Entro 24 ore verrà inviata una comunicazione in caso di necessità di integrazioni documentali. La dichiarazione di successione completata sarà inviata entro 48 ore per la firma.
          </p>
        </div>

        <div className="border border-border bg-secondary/40 rounded-lg p-5 space-y-3">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Riepilogo dei dati inseriti
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm font-body text-foreground/80">
            <div className="space-y-1">
              <p><span className="font-semibold">Dichiarante:</span> {nome} {cognome}</p>
              <p><span className="font-semibold">Email:</span> {email}</p>
              <p><span className="font-semibold">Telefono:</span> {telefono}</p>
              <p><span className="font-semibold">Codice Fiscale:</span> {codiceFiscale}</p>
              <p><span className="font-semibold">Indirizzo:</span> {indirizzoResidenza}</p>
              <p><span className="font-semibold">Ruolo:</span> {ruolo || "Non specificato"}</p>
            </div>
            <div className="space-y-1">
              <p><span className="font-semibold">Defunto:</span> {defuntoNomeCognome}</p>
              <p><span className="font-semibold">CF defunto:</span> {defuntoCodiceFiscale}</p>
              <p><span className="font-semibold">Nascita:</span> {defuntoDataNascita}</p>
              <p><span className="font-semibold">Decesso:</span> {defuntoDataDecesso}</p>
              <p><span className="font-semibold">Residenza al decesso:</span> {defuntoComuneResidenza}</p>
              <p><span className="font-semibold">Tipo di successione:</span> {tipoSuccessioneLabel}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm font-body text-foreground/80 mt-4">
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Immobili presenti:</span>{" "}
                {presenzaImmobili === "si" ? "Sì" : presenzaImmobili === "no" ? "No" : "Non specificato"}
              </p>
              {presenzaImmobili === "si" && (
                <p><span className="font-semibold">Descrizione immobili:</span> {descrizioneImmobili}</p>
              )}
              <p>
                <span className="font-semibold">Conti correnti / investimenti:</span>{" "}
                {presenzaRapportiBancari === "si" ? "Sì" : presenzaRapportiBancari === "no" ? "No" : "Non specificato"}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Partecipazioni societarie / aziende:</span>{" "}
                {presenzaPartecipazioni === "si" ? "Sì" : presenzaPartecipazioni === "no" ? "No" : "Non specificato"}
              </p>
              <p>
                <span className="font-semibold">Imbarcazioni / aeromobili:</span>{" "}
                {presenzaImbarcazioni === "si" ? "Sì" : presenzaImbarcazioni === "no" ? "No" : "Non specificato"}
              </p>
              <p><span className="font-semibold">Numero di eredi:</span> {numeroEredi || "Non specificato"}</p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-card rounded-lg p-5 space-y-3">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Modalità di pagamento
          </h3>
          <p className="font-body text-sm text-foreground/80">
            Il pagamento dell'acconto di €50 dovrà avvenire tramite bonifico bancario. Le coordinate bancarie per il versamento ti saranno inviate via email entro pochi minuti dalla ricezione dei tuoi documenti, insieme al numero della tua pratica.
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Inizia la tua Pratica | WebSuccessioni</title>
        <meta
          name="description"
          content="Avvia online la tua dichiarazione di successione. Carica i documenti, ricevi la dichiarazione completata entro 48 ore."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">
                Avvia la tua pratica
              </p>
              <span className="line-gold w-8 inline-block" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Inizia la tua <span className="text-gradient-gold italic">Pratica</span>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Compila il form guidato in pochi minuti. Un professionista ti accompagnerà fino al deposito della dichiarazione.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              { icon: Upload, title: "Carica i documenti", desc: "Raccogli e carica i documenti richiesti in modo sicuro." },
              { icon: Clock, title: "Dichiarazione entro 48h", desc: "Elaboriamo la dichiarazione e te la inviamo pronta per la firma." },
              { icon: CheckCircle2, title: "Firma e registrazione", desc: "Firmi e noi ci occupiamo della registrazione telematica." },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-primary/15 rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body text-[10px] text-primary/50 tracking-widest uppercase">Passo {String(i + 1).padStart(2, "0")}</span>
                <p className="font-display text-lg font-semibold text-foreground mt-1.5 mb-2">{card.title}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex justify-between mb-3">
              {steps.map((label, index) => {
                const active = index === currentStepIndex;
                const completed = index < currentStepIndex;
                return (
                  <div key={label} className="flex-1 flex flex-col items-center text-center px-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body border ${
                        completed
                          ? "bg-primary text-primary-foreground border-primary"
                          : active
                            ? "bg-primary/10 text-primary border-primary"
                            : "bg-secondary text-muted-foreground border-border"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p
                      className={`mt-2.5 text-[10px] sm:text-xs md:text-sm font-body uppercase tracking-[0.12em] leading-tight ${
                        active || completed ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-300"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-5 md:p-8 shadow-lg shadow-black/20 space-y-7"
          >
            <AnimatePresence mode="wait">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center pt-4 border-t border-border/60">
              <div className="flex gap-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="font-body"
                  >
                    Indietro
                  </Button>
                )}
                {step < 4 && (
                  <Button
                    type="button"
                    variant="gold"
                    onClick={handleNext}
                    className="font-body"
                  >
                    Avanti
                  </Button>
                )}
              </div>

              {step === 4 && (
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="font-body flex items-center gap-2 justify-center"
                  disabled={sending}
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Invio in corso..." : "Invia la tua Pratica"}
                </Button>
              )}
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IniziaPratica;

