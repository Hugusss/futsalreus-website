import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Trophy, ExternalLink, Users, Sparkles, Baby, Bike, Zap, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import teamCompetiMain from "@/assets/competicions/team-competi.jpg";
import teamCeleb1 from "@/assets/competicions/team-celeb1.jpg";
import teamCeleb2 from "@/assets/competicions/team-celeb2.jpg";
import type { Language } from "@/App";

interface CompetitionsProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const texts = {
  ca: {
    title: "Competicions",
    subtitle: "Tornejos, lligues i resultats dels nostres equips",
    back: "Tornar a l'inici",
    introTitle: "Les nostres competicions",
    intro:
      "El Club Futsal Montsant de Reus participa en les competicions oficials de la Federació Catalana de Futbol. Els nostres equips competeixen amb il·lusió i compromís en cada partit.",
    categoriesTitle: "Categories d'equip",
    categoriesDesc:
      "Iniciem el camí amb la voluntat d'obrir, progressivament, les següents categories perquè tothom pugui formar part del club:",
    categories: [
      { key: "infantil", label: "Infantil" },
      { key: "cadet", label: "Cadet" },
      { key: "juvenil", label: "Juvenil" },
      { key: "senior", label: "Sènior" },
      { key: "femeni", label: "Femení" },
    ],
    calendarTitle: "Calendari oficial",
    calendarDesc:
      "Consulta el calendari de partits, resultats i classificacions al web oficial de la FCF:",
    calendarButton: "Veure calendari FCF",
    futureTitle: "Objectius de futur",
    future:
      "Volem expandir-nos a totes les categories posteriors al futbol escolar, competint amb excel·lència i portant els nostres valors a cada pista.",
  },
  es: {
    title: "Competiciones",
    subtitle: "Torneos, ligas y resultados de nuestros equipos",
    back: "Volver al inicio",
    introTitle: "Nuestras competiciones",
    intro:
      "El Club Futsal Montsant de Reus participa en las competiciones oficiales de la Federación Catalana de Fútbol. Nuestros equipos compiten con ilusión y compromiso en cada partido.",
    categoriesTitle: "Categorías de equipo",
    categoriesDesc:
      "Iniciamos el camino con la voluntad de abrir, progresivamente, las siguientes categorías para que todos puedan formar parte del club:",
    categories: [
      { key: "infantil", label: "Infantil" },
      { key: "cadet", label: "Cadete" },
      { key: "juvenil", label: "Juvenil" },
      { key: "senior", label: "Senior" },
      { key: "femeni", label: "Femenino" },
    ],
    calendarTitle: "Calendario oficial",
    calendarDesc:
      "Consulta el calendario de partidos, resultados y clasificaciones en la web oficial de la FCF:",
    calendarButton: "Ver calendario FCF",
    futureTitle: "Objetivos de futuro",
    future:
      "Queremos expandirnos a todas las categorías posteriores al fútbol escolar, compitiendo con excelencia y llevando nuestros valores a cada pista.",
  },
};

const Competicions = ({ language, onLanguageChange }: CompetitionsProps) => {
  const navigate = useNavigate();
  const t = texts[language];

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="pt-24 md:pt-28">
        {/* Hero Banner */}
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Trophy className="mx-auto mb-4 text-primary-foreground/80" size={48} />
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {t.subtitle}
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
            {t.back}
          </Button>

          <article className="max-w-3xl mx-auto">
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t.introTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.intro}
                </p>
              </section>

              <img src={teamCompetiMain} className="w-full h-full object-cover rounded-2xl" />

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-primary" size={28} />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t.categoriesTitle}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {t.categoriesDesc}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {t.categories.map((cat) => (
                    <div
                      key={cat.key}
                      className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
                    >
                      <Sparkles
                        className="absolute -right-2 -top-2 text-primary/10 transition-all group-hover:text-primary/30 group-hover:rotate-12"
                        size={64}
                      />
                      <div className="relative">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1">
                          {language === "ca" ? "Categoria" : "Categoría"}
                        </span>
                        <span className="block text-xl font-black text-foreground">
                          {cat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t.futureTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.future}
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-4">
                <img
                  src={teamCeleb1}
                  className="w-full aspect-square object-cover rounded-2xl"
                />
                <img
                  src={teamCeleb2}
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Competicions;
