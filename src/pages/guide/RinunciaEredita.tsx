import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Quando conviene rinunciare all'eredità",
    content: "Rinunciare all'eredità è una scelta che può convenire in alcune situazioni specifiche. Il caso più frequente è quando il defunto aveva debiti superiori ai beni: accettando l'eredità gli eredi rischierebbero di dover pagare i debiti con il proprio patrimonio personale. La rinuncia libera completamente l'erede da qualsiasi responsabilità patrimoniale nei confronti dei creditori del defunto.",
  },
  {
    title: "Come si rinuncia: la procedura",
    content: "La rinuncia all'eredità è un atto formale che deve essere fatto per iscritto davanti a un notaio oppure davanti al cancelliere del tribunale del circondario in cui si è aperta la successione. Non è possibile rinunciare informalmente o semplicemente non presentandosi. La rinuncia deve essere pura e semplice: non si può rinunciare parzialmente o con condizioni.",
  },
  {
    title: "Entro quando si può rinunciare",
    content: "Non c'è un termine fisso per rinunciare all'eredità, ma ci sono alcune limitazioni importanti. Se si è già entrati in possesso dei beni ereditari o si sono compiuti atti che presuppongono l'accettazione dell'eredità, non è più possibile rinunciare. Il tribunale può comunque fissare un termine entro il quale l'erede deve dichiarare se accetta o rinuncia, su richiesta di chi ha interesse.",
  },
  {
    title: "Conseguenze per gli altri eredi",
    content: "Quando un erede rinuncia la sua quota si accresce automaticamente a quella degli altri eredi nella stessa quota. Se tutti i figli rinunciano subentrano i nipoti per rappresentazione. È importante valutare attentamente le conseguenze della rinuncia sull'intera famiglia prima di procedere, possibilmente con l'assistenza di un professionista.",
  },
  {
    title: "Rinuncia e debiti del defunto",
    content: "La rinuncia all'eredità è lo strumento principale per proteggersi dai debiti del defunto. Una volta formalizzata la rinuncia i creditori del defunto non potranno rivalersi sull'erede rinunciante. Tuttavia è importante agire prima di compiere qualsiasi atto che possa essere interpretato come accettazione tacita dell'eredità, come ad esempio pagare i funerali con i soldi del defunto o ritirare somme dai suoi conti.",
  },
];

const RinunciaEredita = () => (
  <GuideArticleLayout
    seoTitle="Come rinunciare all'eredità: guida completa 2026 | WebSuccessioni"
    seoDescription="Scopri come rinunciare all'eredità in Italia: quando conviene, la procedura davanti al notaio o al tribunale, i termini e le conseguenze per gli altri eredi."
    canonical="/guide/rinuncia-eredita"
    category="Rinuncia"
    categoryColor="bg-violet-500/15 text-violet-400"
    title="Come rinunciare all'eredità: guida completa"
    highlightWord="eredità"
    sections={sections}
  />
);

export default RinunciaEredita;
