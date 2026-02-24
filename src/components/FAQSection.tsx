import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Cos'è la dichiarazione di successione?",
    a: "La dichiarazione di successione è un adempimento fiscale obbligatorio che gli eredi devono presentare all'Agenzia delle Entrate entro 12 mesi dalla data di apertura della successione (generalmente coincidente con la data del decesso). Serve a comunicare il trasferimento dei beni del defunto agli eredi e a determinare le imposte dovute.",
  },
  {
    q: "Chi è obbligato a presentare la dichiarazione di successione?",
    a: "Sono obbligati a presentarla: gli eredi e i legatari (o i loro rappresentanti legali), gli immessi nel possesso dei beni, gli amministratori dell'eredità, i curatori delle eredità giacenti, gli esecutori testamentari e i trust. Se più soggetti sono obbligati, è sufficiente che uno solo presenti la dichiarazione.",
  },
  {
    q: "Entro quando va presentata la dichiarazione?",
    a: "La dichiarazione di successione deve essere presentata entro 12 mesi dalla data di apertura della successione, che generalmente coincide con la data del decesso del de cuius. Il superamento del termine comporta l'applicazione di sanzioni.",
  },
  {
    q: "Quali documenti sono necessari?",
    a: "I documenti principali sono: certificato di morte, stato di famiglia del defunto, documento d'identità e codice fiscale degli eredi, visure catastali degli immobili, certificati bancari e postali relativi ai rapporti intestati al defunto, eventuale testamento, e atti di donazione effettuati in vita dal defunto.",
  },
  {
    q: "Come si presenta la dichiarazione?",
    a: "Dal 23 gennaio 2017 la dichiarazione di successione deve essere presentata esclusivamente per via telematica tramite i servizi online dell'Agenzia delle Entrate (SuccessioniOnLine). È possibile affidarsi a un professionista abilitato o a un CAF per la compilazione e l'invio.",
  },
  {
    q: "Quanto costano le imposte di successione?",
    a: "Le aliquote variano in base al grado di parentela: 4% per coniuge e parenti in linea retta (con franchigia di € 1.000.000 per ciascun beneficiario), 6% per fratelli e sorelle (con franchigia di € 100.000), 6% per altri parenti fino al 4° grado, e 8% per tutti gli altri soggetti. Si aggiungono le imposte ipotecaria (2%) e catastale (1%) sugli immobili.",
  },
  {
    q: "Cos'è la voltura catastale e quando va fatta?",
    a: "La voltura catastale è l'aggiornamento dell'intestazione degli immobili presso il catasto. Con la dichiarazione telematica, la domanda di voltura catastale è integrata nella dichiarazione stessa. L'Agenzia delle Entrate provvede automaticamente all'aggiornamento delle intestazioni catastali.",
  },
  {
    q: "Entro quando devono essere pagate le imposte?",
    a: "Il pagamento delle imposte di successione deve essere effettuato entro 60 giorni dalla data in cui viene notificato l'avviso di liquidazione da parte dell'Agenzia delle Entrate. Scaduto tale termine, sono applicabili sanzioni e interessi di mora.",
  },
  {
    q: "È possibile pagare le imposte a rate?",
    a: "Sì, è ammesso il pagamento rateale per importi superiori a € 1.000. L'importo può essere versato in 8 rate trimestrali (12 rate per importi superiori a € 20.000). Sulle rate successive alla prima sono dovuti gli interessi calcolati dal primo giorno successivo al pagamento della prima rata.",
  },
  {
    q: "Cosa succede se non si presenta la dichiarazione entro i termini?",
    a: "La tardiva presentazione comporta l'applicazione di sanzioni amministrative che variano dal 120% al 240% dell'imposta dovuta. È tuttavia possibile avvalersi del ravvedimento operoso, che consente di regolarizzare la posizione con sanzioni ridotte, purché la violazione non sia stata già constatata.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="line-gold w-8 inline-block" />
            <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">FAQ</p>
            <span className="line-gold w-8 inline-block" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Domande <span className="text-gradient-gold italic">Frequenti</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-7 data-[state=open]:border-primary/20 transition-colors duration-300"
              >
                <AccordionTrigger className="font-display text-lg font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
