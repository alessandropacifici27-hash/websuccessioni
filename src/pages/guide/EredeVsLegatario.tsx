import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Chi è l'erede",
    content: "L'erede è colui che succede al defunto in modo universale, cioè acquista l'intero patrimonio del defunto o una quota di esso. L'erede subentra sia nei diritti che nelle obbligazioni del defunto: questo significa che risponde anche dei debiti ereditari, in linea di principio anche con il proprio patrimonio personale salvo accettazione con beneficio di inventario. L'erede può essere designato dal testamento oppure individuato dalla legge in caso di successione legittima.",
  },
  {
    title: "Chi è il legatario",
    content: "Il legatario è colui che riceve dal testamento un bene specifico o un diritto determinato, non una quota del patrimonio complessivo. Può trattarsi di un immobile, una somma di denaro, un oggetto, un diritto di usufrutto. A differenza dell'erede il legatario non risponde in linea di principio dei debiti del defunto oltre il valore di quanto ricevuto. Il legato può essere previsto solo dal testamento: non esiste il legatario nella successione legittima.",
  },
  {
    title: "Differenze nella responsabilità per i debiti",
    content: "Questa è la differenza più importante. L'erede risponde dei debiti del defunto potenzialmente anche con il proprio patrimonio personale (salvo beneficio di inventario). Il legatario invece risponde solo nei limiti del valore del bene ricevuto e solo in via sussidiaria rispetto agli eredi. Se i beni ereditari non bastano a coprire i debiti gli eredi possono chiedere la riduzione del legato.",
  },
  {
    title: "Obblighi fiscali",
    content: "Sia gli eredi che i legatari sono obbligati alla presentazione della dichiarazione di successione. Tuttavia se uno degli eredi presenta la dichiarazione gli altri sono liberati dall'obbligo. Il legatario è tenuto a presentare la dichiarazione solo se non lo ha già fatto un erede. Sia gli eredi che i legatari devono pagare l'imposta di successione sulla quota o sul bene ricevuto.",
  },
  {
    title: "Posso essere sia erede che legatario",
    content: "Sì, è possibile. Un testamento può istituire qualcuno come erede per una quota del patrimonio e allo stesso tempo lasciargli un legato specifico. In questo caso la persona cumula entrambe le qualità con i relativi diritti e obblighi. È anche possibile che una persona sia legataria in un testamento ma erede legittima per la parte non coperta dal testamento.",
  },
];

const EredeVsLegatario = () => (
  <GuideArticleLayout
    seoTitle="Differenza tra erede e legatario nella successione | WebSuccessioni"
    seoDescription="Erede e legatario sono figure molto diverse: scopri le differenze in termini di diritti, obblighi, responsabilità per i debiti e obbligo di dichiarazione di successione."
    canonical="/guide/erede-vs-legatario"
    category="Nozioni"
    categoryColor="bg-teal-500/15 text-teal-400"
    title="Differenza tra erede e legatario nella successione"
    highlightWord="successione"
    sections={sections}
  />
);

export default EredeVsLegatario;
