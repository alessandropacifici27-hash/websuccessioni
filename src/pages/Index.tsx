import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import PracticeAreas from "@/components/PracticeAreas";
import HowItWorks from "@/components/HowItWorks";
import ContactSection from "@/components/ContactSection";
import ContactFormOnly from "@/components/ContactFormOnly";
import ContactInfoOnly from "@/components/ContactInfoOnly";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>WebSuccessioni — Dichiarazioni di Successione Online</title>
        <meta
          name="description"
          content="Servizio professionale di dichiarazioni di successione interamente online. Preventivo gratuito, risposta entro 24h. Competenza e qualità a costi accessibili."
        />
      </Helmet>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <WhyChooseUs />
        <StatsBar />
        <div className="md:hidden">
          <ContactSection />
        </div>
        {/* Desktop: form standalone (solo desktop) */}
        <section className="hidden md:block py-20 bg-background">
          <div className="max-w-2xl mx-auto px-4">
            <div className="inline-flex items-center gap-3 mb-4 justify-center w-full">
              <span className="line-gold w-8 inline-block" />
              <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">Contattaci</p>
              <span className="line-gold w-8 inline-block" />
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground text-center mb-3">
              Consulenza <span className="text-gradient-gold italic">Gratuita</span>
            </h2>
            <p className="font-body text-muted-foreground text-center mb-10">
              Raccontaci la tua situazione. Un nostro esperto ti ricontatterà entro 24 ore.
            </p>
            <ContactFormOnly />
          </div>
        </section>
        <div className="hidden md:block">
          <PracticeAreas />
        </div>
        <div className="hidden md:block">
          <HowItWorks />
        </div>
        {/* Desktop: Contattaci (sinistra) + Perché affidarti (destra) */}
        <section id="contatti-info" className="hidden md:block py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20">
              <ContactInfoOnly />
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="line-gold w-8 inline-block" />
                    <p className="text-primary font-body font-medium text-xs tracking-[0.3em] uppercase">I Nostri Punti di Forza</p>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Perché scegliere <span className="text-gradient-gold italic">WebSuccessioni</span>
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
                    Ogni pratica è seguita con la stessa attenzione e dedizione, dal primo contatto fino alla consegna definitiva.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { title: "Esperienza certificata", desc: "Competenza specializzata nel diritto successorio italiano con anni di esperienza sul campo." },
                    { title: "100% da remoto", desc: "Gestiamo l'intera pratica online: nessuno spostamento, nessuna perdita di tempo." },
                    { title: "Assistenza dedicata", desc: "Un professionista ti segue personalmente dalla prima consulenza alla conclusione della pratica." },
                    { title: "Risposta garantita in 24h", desc: "Ti ricontattiamo entro 24 ore lavorative con un orientamento chiaro e senza impegno." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/chi-siamo"
                  className="inline-flex items-center gap-2 group"
                >
                  <span className="h-px w-8 bg-yellow-500/40 group-hover:w-12 group-hover:bg-yellow-400 transition-all duration-500" />
                  <span className="font-body text-sm text-yellow-500/70 group-hover:text-yellow-400 tracking-[0.15em] uppercase transition-colors duration-300">
                    Scopri come lavoriamo
                  </span>
                  <span className="h-px w-8 bg-yellow-500/40 group-hover:w-12 group-hover:bg-yellow-400 transition-all duration-500" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Index;
