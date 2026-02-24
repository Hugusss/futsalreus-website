import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, CalendarHeart, Users, PartyPopper, Tent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Language } from "@/App";

interface ActivitatsProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const texts = {
  ca: {
    title: "Activitats",
    subtitle: "Esdeveniments, campus i activitats del club",
    back: "Tornar a l'inici",
    introTitle: "Activitats del club",
    intro:
      "Al Club Futsal Montsant organitzem diferents activitats al llarg de la temporada per fomentar la cohesió del grup i la diversió dels nostres jugadors i les seves famílies.",
    socialTitle: "Esdeveniments socials",
    socialDesc:
      "Sopars d'equip, celebracions, jornades de portes obertes i molt més. Perquè som club, som futsal, som família i amics. Busquem espais de trobada i convivència per enfortir el sentiment de pertinença al club.",
    campusTitle: "Campus i tecnificació",
    campusDesc:
      "Oferim campus durant les vacances escolars i sessions de tecnificació per a tots els nivells. Una oportunitat per millorar i gaudir del futsal en un ambient d'amistat i aprenentatge.",
    communityTitle: "Comunitat i famílies",
    communityDesc:
      "Fomentem una relació propera i constant entre les famílies, els entrenadors i la junta directiva. Cada equip comptarà amb un responsable de comunicació entre famílies i club.",
    upcoming: "Properes activitats",
    upcomingDesc:
      "Estigues atent a les nostres xarxes socials per conèixer les properes activitats i esdeveniments del club. T'hi esperem!",
  },
  es: {
    title: "Actividades",
    subtitle: "Eventos, campus y actividades del club",
    back: "Volver al inicio",
    introTitle: "Actividades del club",
    intro:
      "En el Club Futsal Montsant organizamos diferentes actividades a lo largo de la temporada para fomentar la cohesión del grupo y la diversión de nuestros jugadores y sus familias.",
    socialTitle: "Eventos sociales",
    socialDesc:
      "Cenas de equipo, celebraciones, jornadas de puertas abiertas y mucho más. Porque somos club, somos futsal, somos familia y amigos. Buscamos espacios de encuentro y convivencia para fortalecer el sentimiento de pertenencia al club.",
    campusTitle: "Campus y tecnificación",
    campusDesc:
      "Ofrecemos campus durante las vacaciones escolares y sesiones de tecnificación para todos los niveles. Una oportunidad para mejorar y disfrutar del futsal en un ambiente de amistad y aprendizaje.",
    communityTitle: "Comunidad y familias",
    communityDesc:
      "Fomentamos una relación cercana y constante entre las familias, los entrenadores y la junta directiva. Cada equipo contará con un responsable de comunicación entre familias y club.",
    upcoming: "Próximas actividades",
    upcomingDesc:
      "Permanece atento a nuestras redes sociales para conocer las próximas actividades y eventos del club. ¡Te esperamos!",
  },
};

const Activitats = ({ language, onLanguageChange }: ActivitatsProps) => {
  const navigate = useNavigate();
  const t = texts[language];

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="pt-24 md:pt-28">
        {/* Hero Banner */}
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <CalendarHeart className="mx-auto mb-4 text-primary-foreground/80" size={48} />
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

              {/* Photo placeholder */}
              <div className="rounded-2xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                <p className="text-muted-foreground text-sm">📷 Espai per a foto</p>
              </div>

              {/* Activity cards */}
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card text-center">
                  <PartyPopper className="mx-auto text-primary mb-3" size={32} />
                  <h3 className="font-bold text-foreground mb-2">{t.socialTitle}</h3>
                  <p className="text-sm text-muted-foreground">{t.socialDesc}</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card text-center">
                  <Tent className="mx-auto text-primary mb-3" size={32} />
                  <h3 className="font-bold text-foreground mb-2">{t.campusTitle}</h3>
                  <p className="text-sm text-muted-foreground">{t.campusDesc}</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card text-center">
                  <Users className="mx-auto text-primary mb-3" size={32} />
                  <h3 className="font-bold text-foreground mb-2">{t.communityTitle}</h3>
                  <p className="text-sm text-muted-foreground">{t.communityDesc}</p>
                </div>
              </div>

              {/* Gallery placeholders */}
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

              <section className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border text-center">
                <CalendarHeart className="mx-auto text-primary mb-3" size={32} />
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {t.upcoming}
                </h2>
                <p className="text-muted-foreground">{t.upcomingDesc}</p>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Activitats;
