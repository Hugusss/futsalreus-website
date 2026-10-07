import { SubPage } from "@/components/SubPage";
import { Trophy, Users, Baby, Rabbit, Squirrel, Sparkles, Venus } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";
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
      { key: "infantil", label: "Infantil", Icon: Baby },
      { key: "cadet", label: "Cadet", Icon: Rabbit },
      { key: "juvenil", label: "Juvenil", Icon: Squirrel },
      { key: "senior", label: "Sènior", Icon: Sparkles },
      { key: "femeni", label: "Femení", Icon: Venus },
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
      { key: "infantil", label: "Infantil", Icon: Baby },
      { key: "cadet", label: "Cadete", Icon: Rabbit },
      { key: "juvenil", label: "Juvenil", Icon: Squirrel },
      { key: "senior", label: "Senior", Icon: Sparkles },
      { key: "femeni", label: "Femenino", Icon: Venus },
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
  const t = texts[language];
  usePageTitle(t.title);

  return (
    <SubPage
      language={language}
      onLanguageChange={onLanguageChange}
      icon={Trophy}
      title={t.title}
      subtitle={t.subtitle}
      back={t.back}
    >

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

              <img
                src={teamCompetiMain}
                alt={language === "ca" ? "Equip del Club Futsal Montsant en competició" : "Equipo del Club Futsal Montsant en competición"}
                className="w-full h-full object-cover rounded-2xl"
              />

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
                  {t.categories.map((cat) => {
                    const CatIcon = cat.Icon;
                    return (
                      <div
                        key={cat.key}
                        className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
                      >
                        <CatIcon
                          className="absolute -right-2 -top-2 text-primary/10 transition-all group-hover:text-primary/30 group-hover:rotate-12 group-hover:scale-110"
                          size={64}
                        />
                        <div className="relative">
                          <span className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                            {language === "ca" ? "Categoria" : "Categoría"}
                          </span>
                          <span className="block text-xl font-black text-foreground">
                            {cat.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
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
                  alt=""
                  className="w-full aspect-square object-cover rounded-2xl"
                />
                <img
                  src={teamCeleb2}
                  alt=""
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>
            </div>
          </article>
    </SubPage>
  );
};

export default Competicions;
