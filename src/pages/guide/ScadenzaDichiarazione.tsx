import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Il termine ordinario di 12 mesi",
    content: "La dichiarazione di successione deve essere presentata entro 12 mesi dalla data di apertura della successione, che coincide con la data del decesso. Questo termine vale per tutti gli eredi e legatari obbligati alla presentazione. Il termine decorre dalla data di morte del defunto indipendentemente da quando gli eredi vengono a conoscenza dell'eredità.",
  },
  {
    title: "Casi particolari di proroga",
    content: "Esistono alcune situazioni in cui il termine può decorrere da una data diversa. Se l'erede ha accettato l'eredità con beneficio di inventario, il termine decorre dalla data di accettazione. Se un legatario ha ricevuto un legato sottoposto a condizione sospensiva, il termine decorre dall'avverarsi della condizione. In caso di dichiarazione di morte presunta, il termine decorre dalla sentenza del tribunale.",
  },
  {
    title: "Sanzioni per presentazione tardiva",
    content: "Se la dichiarazione viene presentata oltre il termine dei 12 mesi si applicano sanzioni amministrative. La sanzione base per omessa dichiarazione va dal 120% al 240% dell'imposta dovuta, con un minimo di 250 euro. Per dichiarazione tardiva (presentata spontaneamente dopo la scadenza) la sanzione è ridotta. È fondamentale non aspettare la contestazione da parte dell'Agenzia delle Entrate.",
  },
  {
    title: "Il ravvedimento operoso",
    content: "Il ravvedimento operoso è uno strumento che permette di regolarizzare spontaneamente la propria posizione pagando una sanzione ridotta rispetto a quella ordinaria. Più tempestiva è la regolarizzazione, minore è la sanzione. Entro 90 giorni dalla scadenza la sanzione è ridotta a 1/9 del minimo. Entro 1 anno è ridotta a 1/7. Entro 2 anni a 1/6. Il ravvedimento non è più applicabile se la violazione è già stata contestata dall'Agenzia delle Entrate.",
  },
  {
    title: "Cosa fare se si è in ritardo",
    content: "Se ti accorgi di aver superato i 12 mesi senza presentare la dichiarazione, non aspettare. Prima presenti la dichiarazione, minore sarà la sanzione da pagare grazie al ravvedimento operoso. WebSuccessioni gestisce anche le pratiche in ritardo: contattaci per valutare la tua situazione e procedere nel modo più conveniente.",
  },
];

const ScadenzaDichiarazione = () => (
  <GuideArticleLayout
    seoTitle="Entro quando presentare la dichiarazione di successione | WebSuccessioni"
    seoDescription="Scopri i termini per presentare la dichiarazione di successione, le sanzioni per ritardo e come usare il ravvedimento operoso per regolarizzarsi."
    canonical="/guide/scadenza-dichiarazione-successione"
    category="Scadenze"
    categoryColor="bg-rose-500/15 text-rose-400"
    title="Entro quando va presentata la dichiarazione di successione"
    highlightWord="successione"
    sections={sections}
  />
);

export default ScadenzaDichiarazione;
