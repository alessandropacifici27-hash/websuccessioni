import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Il termine ordinario di 12 mesi",
    content: "La dichiarazione di successione deve essere presentata entro 12 mesi dalla data di apertura della successione, che coincide con la data del decesso. Questo termine vale per tutti gli eredi e legatari obbligati alla presentazione. Decorre dalla data di morte indipendentemente da quando gli eredi vengono a conoscenza dell'eredità.",
  },
  {
    title: "Casi particolari di proroga",
    content: "In alcune situazioni il termine decorre da una data diversa. Se l'erede ha accettato con beneficio di inventario, il termine decorre dalla data di accettazione. Se un legatario ha ricevuto un legato sottoposto a condizione sospensiva, il termine decorre dall'avverarsi della condizione. In caso di dichiarazione di morte presunta il termine decorre dalla sentenza del tribunale.",
  },
  {
    title: "Sanzioni per presentazione tardiva",
    content: "Oltre il termine dei 12 mesi si applicano sanzioni amministrative. La sanzione base per omessa dichiarazione va dal 120% al 240% dell'imposta dovuta con un minimo di 250 euro. Per dichiarazione presentata spontaneamente in ritardo la sanzione è ridotta rispetto all'omissione totale. È fondamentale non aspettare la contestazione da parte dell'Agenzia delle Entrate.",
  },
  {
    title: "Il ravvedimento operoso",
    content: "Il ravvedimento operoso permette di regolarizzare spontaneamente la propria posizione pagando una sanzione ridotta. Entro 90 giorni dalla scadenza la sanzione è ridotta a 1/9 del minimo. Entro 1 anno è ridotta a 1/7. Entro 2 anni a 1/6. Il ravvedimento non è applicabile se la violazione è già stata contestata dall'Agenzia delle Entrate.",
  },
  {
    title: "Cosa fare se si è in ritardo",
    content: "Se hai superato i 12 mesi senza presentare la dichiarazione non aspettare. Prima agisci minore sarà la sanzione grazie al ravvedimento operoso. WebSuccessioni gestisce anche le pratiche in ritardo: contattaci per valutare la tua situazione e procedere nel modo più conveniente.",
  },
];

const ScadenzaDichiarazione = () => (
  <GuideArticleLayout
    seoTitle="Scadenza dichiarazione di successione: termini e sanzioni 2026 | WebSuccessioni"
    seoDescription="Scopri entro quando presentare la dichiarazione di successione, le sanzioni per ritardo e come usare il ravvedimento operoso per regolarizzarsi."
    canonical="/guide/scadenza-dichiarazione-successione"
    category="Scadenze"
    categoryColor="bg-rose-500/15 text-rose-400"
    title="Entro quando va presentata la dichiarazione di successione"
    highlightWord="successione"
    sections={sections}
  />
);

export default ScadenzaDichiarazione;
