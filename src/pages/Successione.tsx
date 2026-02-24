import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Clock, Calculator, Building2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: FileText,
    title: "Cos'è la Dichiarazione di Successione",
    content:
      "La dichiarazione di successione è un adempimento fiscale obbligatorio con il quale gli eredi, i legatari o gli altri soggetti obbligati comunicano all'Agenzia delle Entrate il trasferimento di beni e diritti dal defunto (de cuius) ai suoi successori. Non va confusa con l'accettazione dell'eredità, che è un atto giuridico distinto. La dichiarazione serve a determinare le imposte di successione, ipotecaria e catastale dovute sui beni trasferiti. Dal 23 gennaio 2017 la dichiarazione deve essere presentata esclusivamente per via telematica attraverso i servizi online dell'Agenzia delle Entrate.",
  },
  {
    icon: Users,
    title: "Chi è Obbligato a Presentarla",
    content:
      "Sono obbligati alla presentazione della dichiarazione di successione: gli eredi e i legatari (o i loro rappresentanti legali), gli immessi nel possesso dei beni in caso di assenza del defunto o di dichiarazione di morte presunta, gli amministratori dell'eredità, i curatori delle eredità giacenti, gli esecutori testamentari e i trust. Se più soggetti sono obbligati alla presentazione, è sufficiente presentarne una sola. Non c'è obbligo di presentazione quando l'eredità è devoluta al coniuge e ai parenti in linea retta del defunto e l'attivo ereditario ha un valore non superiore a 100.000 euro e non comprende beni immobili o diritti reali immobiliari.",
  },
  {
    icon: Clock,
    title: "Termini di Presentazione",
    content:
      "La dichiarazione di successione deve essere presentata entro 12 mesi dalla data di apertura della successione, che generalmente coincide con la data del decesso. In caso di presentazione tardiva, si applicano sanzioni amministrative. È tuttavia possibile avvalersi dell'istituto del ravvedimento operoso per ridurre le sanzioni dovute, purché la violazione non sia già stata contestata dall'Agenzia delle Entrate.",
  },
  {
    icon: Calculator,
    title: "Le Imposte di Successione",
    content:
      "Le aliquote delle imposte di successione variano in base al grado di parentela tra il defunto e il beneficiario: 4% per il coniuge e i parenti in linea retta, con una franchigia di 1.000.000 di euro per ciascun beneficiario; 6% per fratelli e sorelle, con franchigia di 100.000 euro; 6% per gli altri parenti fino al 4° grado, affini in linea retta e affini in linea collaterale fino al 3° grado, senza franchigia; 8% per tutti gli altri soggetti. Per i beneficiari portatori di handicap grave (Legge 104/92, art. 3, comma 3), la franchigia è elevata a 1.500.000 euro indipendentemente dal grado di parentela.",
  },
  {
    icon: Building2,
    title: "Imposte Ipotecaria e Catastale sugli Immobili",
    content:
      "Se nell'asse ereditario sono compresi beni immobili o diritti reali immobiliari, sono dovute anche l'imposta ipotecaria nella misura del 2% e l'imposta catastale nella misura dell'1% del valore degli immobili. Se almeno uno degli eredi possiede i requisiti per le agevolazioni \"prima casa\", le imposte ipotecaria e catastale si applicano in misura fissa di 200 euro ciascuna. Le imposte ipotecaria e catastale devono essere autoliquidate prima della presentazione della dichiarazione.",
  },
  {
    icon: AlertTriangle,
    title: "Pagamento e Scadenze",
    content:
      "L'imposta di successione viene liquidata dall'Agenzia delle Entrate sulla base della dichiarazione presentata e notificata mediante avviso di liquidazione. Il pagamento deve essere effettuato entro 60 giorni dalla data di notifica dell'avviso. Scaduto tale termine, sono applicabili sanzioni e interessi di mora. È ammesso il pagamento rateale per importi superiori a 1.000 euro: l'importo può essere versato in almeno 8 rate trimestrali (12 rate per importi superiori a 20.000 euro). Sulle rate successive alla prima sono dovuti gli interessi legali.",
  },
];

const Successione = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" className="mb-8 text-muted-foreground" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Torna alla Home
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Guida Completa</p>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              La Dichiarazione di <span className="text-gradient-gold italic">Successione</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-3xl">
              Tutto quello che devi sapere sull'adempimento fiscale previsto dalla normativa italiana in caso di trasferimento di beni per causa di morte. Fonte: Agenzia delle Entrate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-12">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg p-8 md:p-10 hover:border-primary/20 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">{s.title}</h2>
                </div>
                <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Successione;
