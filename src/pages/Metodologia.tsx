import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Metodologia = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Banner */}
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="mx-auto mb-4 text-primary-foreground/80" size={48} />
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              Metodologia
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              La nostra filosofia de treball i formació esportiva
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

          <article className="max-w-3xl mx-auto prose-custom">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  La nostra filosofia
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Al Club Futsal Montsant de Reus creiem en la formació integral dels nostres jugadors i jugadores. 
                  La nostra metodologia es basa en valors com el respecte, el treball en equip, la disciplina 
                  i la passió per l'esport.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Treballem perquè cada persona que passi pel club se senti part d'una família, 
                  creixi com a esportista i com a persona.
                </p>
              </section>

              {/* Photo placeholder area */}
              <div className="rounded-2xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Objectius formatius
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    Desenvolupar les habilitats tècniques i tàctiques del futsal
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    Fomentar els valors esportius i el fair play
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    Crear un ambient de companyerisme i respecte mutu
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    Preparar els jugadors per a la competició amb confiança
                  </li>
                </ul>
              </section>

              {/* Two-column photo layout */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
                </div>
                <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
                </div>
              </div>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Equip tècnic
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  El nostre equip tècnic està format per professionals amb experiència en la formació 
                  esportiva de base, compromesos amb el desenvolupament de cada jugador.
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

export default Metodologia;
