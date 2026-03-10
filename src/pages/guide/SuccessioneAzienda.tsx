import GuideArticleLayout from "./GuideArticleLayout";

const SuccessioneAzienda = () => (
  <GuideArticleLayout
    seoTitle="Dichiarazione di successione con azienda o ditta individuale | WebSuccessioni"
    seoDescription="Come si valuta e si include un'azienda o ditta individuale nella dichiarazione di successione: documenti necessari, valutazione e trattamento fiscale."
    canonical="/guide/successione-azienda-ditta"
    category="Aziende"
    categoryColor="bg-orange-500/15 text-orange-400"
    title="Dichiarazione di successione con azienda o ditta individuale"
    highlightWord="successione"
  >
    <p>
      Quando il defunto era titolare di una ditta individuale o di una partecipazione in una società, questi beni devono essere inclusi nell'asse ereditario e dichiarati nella successione. Il trasferimento di aziende a coniuge o eredi in linea retta può beneficiare dell'esenzione dall'imposta di successione
      <span className="text-sm text-gray-400 italic ml-1">(art. 3, comma 4-ter, D.Lgs. 346/1990)</span>, a condizione che il controllo dell'azienda sia mantenuto per almeno 5 anni
      <span className="text-sm text-gray-400 italic ml-1">(art. 3, comma 4-ter, D.Lgs. 346/1990)</span>. In materia di cessione delle quote entro il quinquennio si applica l'interpretazione dell'Agenzia delle Entrate (Risoluzione n. 75/E del 26 luglio 2010).
    </p>

    <h2>Documenti necessari per le aziende</h2>
    <p>
      Per includere una ditta individuale o un'azienda nella dichiarazione di successione sono necessari: visura camerale aggiornata, situazione patrimoniale dell'azienda alla data del decesso (al netto dell'avviamento), atto costitutivo o atto di acquisto, statuto vigente o ultimo atto notarile contenente i patti sociali aggiornati. Per azioni, obbligazioni o altri titoli servono le relative certificazioni.
    </p>

    <h2>Come si valuta l'azienda</h2>
    <p>
      Il valore da dichiarare per una ditta individuale o una partecipazione societaria è il valore venale in comune commercio alla data del decesso, cioè il prezzo che si otterrebbe vendendo l'azienda sul mercato. Tuttavia la normativa fiscale prevede alcune regole specifiche: per le società non quotate il valore è determinato in proporzione al patrimonio netto risultante dall'ultimo bilancio. L'avviamento non viene incluso nel valore ai fini successori.
    </p>

    <h2>Agevolazioni per le aziende familiari</h2>
    <p>
      Esiste una importante agevolazione fiscale per le aziende familiari: se l'erede o i coeredi continuano l'attività aziendale per almeno cinque anni, il trasferimento dell'azienda è esente dall'imposta di successione indipendentemente dal valore. Questa agevolazione si applica alle aziende individuali, alle quote di società di persone e alle partecipazioni di controllo nelle società di capitali.
    </p>

    <h2>Continuare o chiudere l'azienda</h2>
    <p>
      Gli eredi che ricevono un'azienda possono scegliere se continuare l'attività, cedere l'azienda a terzi o liquidarla. Ciascuna scelta ha conseguenze fiscali e pratiche diverse. La continuazione permette di beneficiare delle agevolazioni successorie. La cessione genera una plusvalenza tassabile. La liquidazione comporta la chiusura di tutti i rapporti commerciali e fiscali dell'impresa.
    </p>
  </GuideArticleLayout>
);

export default SuccessioneAzienda;
