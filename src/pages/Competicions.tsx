import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Competicions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Banner */}
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Trophy className="mx-auto mb-4 text-primary-foreground/80" size={48} />
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              Competicions
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Tornejos, lligues i resultats dels nostres equips
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            Tornar a l'inici
          </Button>

          <article className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Les nostres competicions
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El Club Futsal Montsant de Reus participa en les competicions oficials de la 
                  Federació Catalana de Futbol. Els nostres equips competeixen amb il·lusió i 
                  compromís en cada partit.
                </p>
              </section>

              {/* Wide photo */}
              <div className="rounded-2xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Temporada actual
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Aquesta temporada els nostres equips estan donant el millor de si mateixos 
                  tant a les lligues regulars com als tornejos amistosos.
                </p>
              </section>

              {/* Three-column photo layout */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl overflow-hidden bg-muted aspect-square flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Foto</p>
                </div>
                <div className="rounded-2xl overflow-hidden bg-muted aspect-square flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Foto</p>
                </div>
                <div className="rounded-2xl overflow-hidden bg-muted aspect-square flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Foto</p>
                </div>
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Històric de resultats
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Des de la fundació del club, hem anat creixent i millorant temporada rere temporada. 
                  Aquí trobaràs el resum de les nostres participacions.
                </p>
              </section>

              {/* Two photos side by side */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
                </div>
                <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Competicions;
