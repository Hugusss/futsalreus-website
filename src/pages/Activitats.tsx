import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Activitats = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Banner */}
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <CalendarHeart className="mx-auto mb-4 text-primary-foreground/80" size={48} />
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              Activitats
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Esdeveniments, campus i activitats del club
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
                  Activitats del club
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Al Club Futsal Montsant organitzem diferents activitats al llarg de la temporada 
                  per fomentar la cohesió del grup i la diversió dels nostres jugadors i les seves famílies.
                </p>
              </section>

              {/* Hero photo */}
              <div className="rounded-2xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Campus i tecnificació
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Oferim campus durant les vacances escolars i sessions de tecnificació per a 
                  tots els nivells. Una oportunitat per millorar i gaudir del futsal.
                </p>
              </section>

              {/* Alternating layout: text + image */}
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Esdeveniments socials
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sopars d'equip, celebracions, jornades de portes obertes i molt més. 
                    Perquè som club, som futsal, som família i amics.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
                </div>
              </div>

              {/* Three-column gallery */}
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
                  Properes activitats
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estigues atent a les nostres xarxes socials per conèixer les properes activitats 
                  i esdeveniments del club. T'hi esperem!
                </p>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activitats;
