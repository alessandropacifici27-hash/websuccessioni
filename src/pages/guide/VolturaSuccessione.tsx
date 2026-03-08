import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Cos'è la voltura catastale",
    content: "La voltura catastale è l'aggiornamento delle intestazioni catastali degli immobili ereditati: in sostanza si tratta di comunicare all'Agenzia delle Entrate — Territorio che la proprietà di un immobile è passata dal defunto agli eredi. Senza la voltura catastale gli immobili risulterebbero ancora intestati al defunto nei registri pubblici, il che potrebbe creare problemi in caso di futura vendita o utilizzo dell'immobile.",
  },
  {
    title: "Quando va fatta",
    content: "La voltura catastale deve essere eseguita dopo la presentazione della dichiarazione di successione. In molti casi avviene automaticamente: quando la dichiarazione di successione viene presentata telematicamente all'Agenzia delle Entrate e include immobili, l'ufficio provvede d'ufficio alla voltura catastale contestualmente alla registrazione. Non è quindi sempre necessario fare una procedura separata.",
  },
  {
    title: "Quando la voltura non è automatica",
    content: "In alcuni casi la voltura catastale non avviene automaticamente e deve essere richiesta separatamente. Questo accade principalmente quando la dichiarazione di successione è stata presentata in forma cartacea (per successioni aperte prima del 2017), quando ci sono immobili in comuni che gestiscono il catasto autonomamente, o quando si verificano errori nella registrazione automatica.",
  },
  {
    title: "Documenti necessari",
    content: "Per richiedere la voltura catastale manualmente sono necessari: copia della dichiarazione di successione con ricevuta di presentazione, estratti catastali degli immobili oggetto di voltura, documenti di identità degli eredi richiedenti. La richiesta va presentata all'ufficio provinciale dell'Agenzia delle Entrate competente per territorio.",
  },
  {
    title: "Costi e tempi",
    content: "I tributi speciali catastali per la voltura ammontano a 55 euro per ogni immobile. L'imposta ipotecaria per la trascrizione nei registri immobiliari è di 35 euro. I tempi di esecuzione della voltura automatica sono generalmente di 7-10 giorni lavorativi dalla registrazione della dichiarazione. Per le volture manuali i tempi possono variare da 2 a 4 settimane. WebSuccessioni include la gestione della voltura catastale nel servizio di assistenza completa.",
  },
];

const VolturaSuccessione = () => (
  <GuideArticleLayout
    seoTitle="Voltura catastale dopo la successione: guida completa 2026 | WebSuccessioni"
    seoDescription="Come fare la voltura catastale dopo una successione: procedura, documenti necessari, costi e tempi per aggiornare la titolarità degli immobili."
    canonical="/guide/voltura-catastale-successione"
    category="Immobili"
    categoryColor="bg-amber-500/15 text-amber-400"
    title="Voltura catastale dopo la successione: tempi e procedura"
    highlightWord="successione"
    sections={sections}
  />
);

export default VolturaSuccessione;
