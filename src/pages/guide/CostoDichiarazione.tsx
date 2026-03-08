import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Panoramica dei costi",
    content: "Il costo totale di una dichiarazione di successione nel 2026 dipende da diversi fattori: il valore del patrimonio ereditato, il grado di parentela tra il defunto e gli eredi, la presenza o meno di immobili nell'asse ereditario e la complessità della situazione familiare. È fondamentale distinguere tra le imposte dovute allo Stato, calcolate su aliquote fisse, e il costo del professionista che gestisce la pratica.",
  },
  {
    title: "L'imposta di successione",
    content: "L'imposta di successione è calcolata sul valore netto dell'asse ereditario ed è dovuta solo quando il patrimonio supera determinate franchigie. Per il coniuge e i parenti in linea retta si applica un'aliquota del 4% sulla parte che eccede 1.000.000 di euro per ciascun erede: nella maggior parte delle successioni familiari l'imposta non è quindi dovuta. Per fratelli e sorelle l'aliquota è del 6% con franchigia di 100.000 euro. Per gli altri parenti fino al quarto grado l'aliquota è del 6% senza franchigia. Per tutti gli altri soggetti si applica l'8% senza franchigia. I beneficiari portatori di handicap grave ai sensi della Legge 104/92 hanno una franchigia elevata a 1.500.000 euro.",
  },
  {
    title: "Imposte ipotecaria e catastale",
    content: "Se nell'eredità sono presenti immobili, sono dovute anche l'imposta ipotecaria al 2% e l'imposta catastale all'1% del valore degli immobili. Entrambe vanno autoliquidate prima della presentazione della dichiarazione. Se almeno uno degli eredi ha i requisiti prima casa, le imposte si applicano in misura fissa di 200 euro ciascuna.",
  },
  {
    title: "Bolli e spese accessorie",
    content: "L'imposta di bollo è di 64 euro per ogni documento. La tassa ipotecaria per la trascrizione è di 35 euro. I tributi catastali per la voltura ammontano a circa 55 euro. I certificati necessari (anagrafici, visure, estratti atti) costano complessivamente tra 50 e 200 euro.",
  },
  {
    title: "Il costo del professionista",
    content: "Per una successione semplice, senza immobili e con pochi eredi, il costo professionale si aggira tra 300 e 600 euro. Per successioni più complesse, con immobili e volture catastali, il costo può arrivare tra 600 e 1.500 euro. WebSuccessioni offre un servizio completamente online con tariffe trasparenti: contattaci per un preventivo personalizzato senza impegno.",
  },
  {
    title: "Esempio pratico",
    content: "Un figlio eredita dal padre un appartamento del valore di 200.000 euro e un conto corrente di 30.000 euro. Essendo figlio, la franchigia è di 1.000.000 euro quindi l'imposta di successione non è dovuta. Sono invece dovute l'imposta ipotecaria (200.000 x 2% = 4.000 euro) e quella catastale (200.000 x 1% = 2.000 euro), salvo agevolazione prima casa. A questo si aggiunge il costo del professionista e le spese accessorie.",
  },
];

const CostoDichiarazione = () => (
  <GuideArticleLayout
    seoTitle="Quanto costa la dichiarazione di successione nel 2026 | WebSuccessioni"
    seoDescription="Scopri tutti i costi della dichiarazione di successione nel 2026: imposte, ipotecaria, catastale, onorari professionali e spese accessorie."
    canonical="/guide/costo-dichiarazione-successione"
    category="Costi"
    categoryColor="bg-primary/15 text-primary"
    title="Quanto costa la dichiarazione di successione nel 2026"
    highlightWord="successione"
    sections={sections}
  />
);

export default CostoDichiarazione;
