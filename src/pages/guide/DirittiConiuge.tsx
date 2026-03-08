import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "La quota del coniuge superstite",
    content: "Il coniuge superstite è sempre tra i primi eredi nella successione italiana e ha diritto a una quota che varia in base alla presenza di altri eredi. Se il defunto lascia solo il coniuge senza figli né altri parenti il coniuge eredita tutto. Se lascia il coniuge e un solo figlio entrambi ereditano al 50%. Se lascia il coniuge e due o più figli il coniuge ha diritto a un quarto e i figli si dividono i tre quarti. Se lascia il coniuge e genitori o fratelli il coniuge ha diritto ai due terzi.",
  },
  {
    title: "Il diritto di abitazione sulla casa familiare",
    content: "Oltre alla quota ereditaria il coniuge superstite ha sempre diritto di abitare nella casa che costituiva la residenza familiare e di usare i mobili che la arredano. Questo diritto di abitazione è riconosciuto anche quando il valore della quota ereditaria è inferiore al valore del diritto stesso. Non può essere tolto dal testamento: è un diritto che la legge garantisce in ogni caso.",
  },
  {
    title: "La quota di riserva",
    content: "Il coniuge ha diritto a una quota di riserva chiamata legittima che non può essere eliminata nemmeno dal testamento. Se il testamento lede la quota di riserva del coniuge, questi può impugnarlo con l'azione di riduzione. La quota di riserva del coniuge è pari a un quarto del patrimonio in presenza di figli, alla metà in assenza di figli.",
  },
  {
    title: "Coniuge separato e divorziato",
    content: "Il coniuge legalmente separato mantiene i diritti successori salvo che la separazione sia stata pronunciata con addebito a suo carico: in quel caso perde il diritto alla quota di riserva ma mantiene solo il diritto agli alimenti se ne aveva diritto. Il coniuge divorziato invece perde completamente i diritti successori al momento del divorzio. Mantiene solo il diritto a un assegno periodico a carico dell'eredità se al momento della morte riceveva un assegno divorzile.",
  },
  {
    title: "Differenza con il convivente di fatto",
    content: "Il convivente di fatto non ha diritti successori salvo quanto eventualmente previsto dal testamento. La legge Cirinnà del 2016 ha introdotto alcune tutele per i conviventi di fatto: il convivente superstite ha diritto di continuare ad abitare nella casa comune per un periodo da due a cinque anni in base alla durata della convivenza. Non ha però diritto alla quota ereditaria né alla quota di riserva.",
  },
];

const DirittiConiuge = () => (
  <GuideArticleLayout
    seoTitle="Diritti del coniuge superstite nella successione | WebSuccessioni"
    seoDescription="Scopri tutti i diritti del coniuge superstite nella successione italiana: quota ereditaria, diritto di abitazione, tutele particolari e differenze con il convivente."
    canonical="/guide/diritti-coniuge-superstite"
    category="Coniuge"
    categoryColor="bg-pink-500/15 text-pink-400"
    title="Diritti del coniuge superstite nella successione"
    highlightWord="successione"
    sections={sections}
  />
);

export default DirittiConiuge;
