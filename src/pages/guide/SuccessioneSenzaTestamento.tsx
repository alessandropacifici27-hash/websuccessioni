import GuideArticleLayout from "./GuideArticleLayout";

const sections = [
  {
    title: "Cos'è la successione legittima",
    content: "Si parla di successione legittima quando il defunto non ha lasciato alcun testamento valido. In questo caso la legge stabilisce automaticamente chi sono gli eredi e in quale proporzione si dividono i beni. Le norme che regolano la successione legittima sono contenute nel Codice Civile agli articoli 565 e seguenti e seguono un ordine preciso basato sul grado di parentela.",
  },
  {
    title: "Chi sono gli eredi legittimi",
    content: "La legge prevede una gerarchia precisa. Al primo posto ci sono i figli: se il defunto lascia solo figli, questi ereditano in parti uguali. Se lascia sia il coniuge che figli, il coniuge ha diritto a un terzo dell'eredità e i figli si dividono i restanti due terzi. Se il defunto lascia solo il coniuge senza figli, il coniuge eredita l'intero patrimonio. In assenza di coniuge e figli subentrano i genitori e i fratelli. Solo in assenza di tutti questi eredi subentrano i parenti fino al sesto grado.",
  },
  {
    title: "La quota del coniuge superstite",
    content: "Il coniuge superstite ha sempre diritto alla quota legittima dell'eredità, che varia in base alla presenza di altri eredi. Con un solo figlio, coniuge e figlio si dividono l'eredità al 50% ciascuno. Con due o più figli, il coniuge ha diritto a un quarto e i figli si dividono i restanti tre quarti. Il coniuge ha inoltre sempre diritto di abitazione sulla casa familiare e di uso dei mobili che la arredano.",
  },
  {
    title: "I diritti dei figli nati fuori dal matrimonio",
    content: "Dal 2013 la legge italiana equipara completamente i figli nati fuori dal matrimonio a quelli nati durante il matrimonio. Non esiste più alcuna distinzione tra figli legittimi e naturali: tutti i figli hanno gli stessi diritti successori indipendentemente dalla circostanza della loro nascita.",
  },
  {
    title: "Cosa fare concretamente",
    content: "Quando si apre una successione senza testamento è necessario: verificare chi sono gli eredi legittimi secondo le norme del Codice Civile, raccogliere tutta la documentazione necessaria, presentare la dichiarazione di successione entro 12 mesi dal decesso, procedere alla divisione dei beni tra gli eredi. WebSuccessioni ti guida in ogni fase del processo gestendo la pratica completamente online.",
  },
];

const SuccessioneSenzaTestamento = () => (
  <GuideArticleLayout
    seoTitle="Successione senza testamento: cosa fare e come funziona | WebSuccessioni"
    seoDescription="Guida completa alla successione legittima: chi sono gli eredi, come si dividono i beni e cosa fare quando il defunto non ha lasciato testamento."
    canonical="/guide/successione-senza-testamento"
    category="Successione"
    categoryColor="bg-sky-500/15 text-sky-400"
    title="Successione senza testamento: cosa fare e come funziona"
    highlightWord="testamento"
    sections={sections}
  />
);

export default SuccessioneSenzaTestamento;
