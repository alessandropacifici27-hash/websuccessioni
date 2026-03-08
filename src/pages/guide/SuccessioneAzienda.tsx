import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Aziende e ditte nella successione",
    content: "Quando il defunto era titolare di una ditta individuale o di una partecipazione in una società, questi beni devono essere inclusi nell'asse ereditario e dichiarati nella successione. La valutazione di questi beni è più complessa rispetto agli immobili o ai conti correnti e richiede documentazione specifica. Il trattamento fiscale varia inoltre in base al tipo di partecipazione.",
  },
  {
    title: "Documenti necessari per le aziende",
    content: "Per includere una ditta individuale o un'azienda nella dichiarazione di successione sono necessari: visura camerale aggiornata, situazione patrimoniale dell'azienda alla data del decesso (al netto dell'avviamento), atto costitutivo o atto di acquisto, statuto vigente o ultimo atto notarile contenente i patti sociali aggiornati. Per azioni, obbligazioni o altri titoli servono le relative certificazioni.",
  },
  {
    title: "Come si valuta l'azienda",
    content: "Il valore da dichiarare per una ditta individuale o una partecipazione societaria è il valore venale in comune commercio alla data del decesso, cioè il prezzo che si otterrebbe vendendo l'azienda sul mercato. Tuttavia la normativa fiscale prevede alcune regole specifiche: per le società non quotate il valore è determinato in proporzione al patrimonio netto risultante dall'ultimo bilancio. L'avviamento non viene incluso nel valore ai fini successori.",
  },
  {
    title: "Agevolazioni per le aziende familiari",
    content: "Esiste una importante agevolazione fiscale per le aziende familiari: se l'erede o i coeredi continuano l'attività aziendale per almeno cinque anni, il trasferimento dell'azienda è esente dall'imposta di successione indipendentemente dal valore. Questa agevolazione si applica alle aziende individuali, alle quote di società di persone e alle partecipazioni di controllo nelle società di capitali.",
  },
  {
    title: "Continuare o chiudere l'azienda",
    content: "Gli eredi che ricevono un'azienda possono scegliere se continuare l'attività, cedere l'azienda a terzi o liquidarla. Ciascuna scelta ha conseguenze fiscali e pratiche diverse. La continuazione permette di beneficiare delle agevolazioni successorie. La cessione genera una plusvalenza tassabile. La liquidazione comporta la chiusura di tutti i rapporti commerciali e fiscali dell'impresa.",
  },
];

const SuccessioneAzienda = () => (
  <GuideArticleLayout
    seoTitle="Dichiarazione di successione con azienda o ditta individuale | WebSuccessioni"
    seoDescription="Come si valuta e si include un'azienda o ditta individuale nella dichiarazione di successione: documenti necessari, valutazione e trattamento fiscale."
    canonical="/guide/successione-azienda-ditta"
    category="Aziende"
    categoryColor="bg-orange-500/15 text-orange-400"
    title="Dichiarazione di successione con azienda o ditta individuale"
    highlightWord="successione"
    sections={sections}
  />
);

export default SuccessioneAzienda;
