import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Cos'è la voltura catastale",
    content: "La voltura catastale è l'aggiornamento delle intestazioni catastali degli immobili ereditati: si comunica all'Agenzia delle Entrate che la proprietà è passata dal defunto agli eredi. Senza voltura gli immobili risulterebbero ancora intestati al defunto nei registri pubblici, creando problemi in caso di futura vendita o utilizzo.",
  },
  {
    title: "Quando avviene automaticamente",
    content: "Quando la dichiarazione di successione viene presentata telematicamente e include immobili, l'Agenzia delle Entrate provvede d'ufficio alla voltura catastale contestualmente alla registrazione. Non è quindi sempre necessario fare una procedura separata.",
  },
  {
    title: "Quando la voltura non è automatica",
    content: "In alcuni casi la voltura va richiesta separatamente: quando la dichiarazione è stata presentata in forma cartacea, quando ci sono immobili in comuni che gestiscono il catasto autonomamente, o quando si verificano errori nella registrazione automatica.",
  },
  {
    title: "Documenti necessari",
    content: "Per richiedere la voltura manualmente servono: copia della dichiarazione di successione con ricevuta di presentazione, estratti catastali degli immobili, documenti di identità degli eredi. La richiesta va presentata all'ufficio provinciale dell'Agenzia delle Entrate competente per territorio.",
  },
  {
    title: "Costi e tempi",
    content: "I tributi catastali per la voltura ammontano a 55 euro per immobile. L'imposta ipotecaria per la trascrizione è di 35 euro. I tempi per la voltura automatica sono di 7-10 giorni lavorativi. Per le volture manuali i tempi variano da 2 a 4 settimane. WebSuccessioni include la gestione della voltura catastale nel servizio di assistenza completa.",
  },
];

const VolturaSuccessione = () => (
  <GuideArticleLayout
    seoTitle="Voltura catastale successione 2026: procedura, costi e tempi | WebSuccessioni"
    seoDescription="Guida completa alla voltura catastale dopo la successione: quando è obbligatoria, documenti necessari, costi e tempi per aggiornare la titolarità degli immobili."
    canonical="/guide/voltura-catastale-successione"
    category="Immobili"
    categoryColor="bg-amber-500/15 text-amber-400"
    title="Voltura catastale dopo la successione: tempi e procedura"
    highlightWord="successione"
    sections={sections}
  />
);

export default VolturaSuccessione;
