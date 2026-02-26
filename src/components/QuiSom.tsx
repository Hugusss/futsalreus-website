import { useNavigate } from "react-router-dom";
import quiSomPhoto from "@/assets/quiSom-photo.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Trophy, CalendarHeart, Users } from "lucide-react";

type Language = "ca" | "es";

interface QuiSomProps {
  language?: Language;
}

const categories = [
  {
    id: "metodologia",
    path: "/metodologia",
    icon: BookOpen,
    title: { ca: "Metodologia", es: "Metodología" },
    description: {
      ca: "La nostra filosofia de treball i formació esportiva",
      es: "Nuestra filosofía de trabajo y formación deportiva",
    },
  },
  {
    id: "competicions",
    path: "/competicions",
    icon: Trophy,
    title: { ca: "Competicions", es: "Competiciones" },
    description: {
      ca: "Tornejos, lligues i resultats dels nostres equips",
      es: "Torneos, ligas y resultados de nuestros equipos",
    },
  },
  {
    id: "activitats",
    path: "/activitats",
    icon: CalendarHeart,
    title: { ca: "Activitats", es: "Actividades" },
    description: {
      ca: "Esdeveniments, campus i activitats del club",
      es: "Eventos, campus y actividades del club",
    },
  },
];

const founders = [
  "Àngel Borràs Barberà",
  "Marc López Garreta",
  "Alex Navarro Ramos",
  "Aleix Ricou Boza",
];

const texts = {
  ca: {
    badge: "EL NOSTRE CLUB",
    title: "Qui Som",
    description:
      "Som una família unida per l'amor al futsal. Des de Reus, treballem cada dia per formar jugadors i persones amb valors.",
    imageTitle: "Som club, som futsal, som família i amics",
    imageSubtitle: "Escola Montsant · Reus",
    foundersTitle: "Fundadors",
    foundersDescription:
      "Quatre amics que van compartir els anys d'escola a l'Escola Montsant, no només com a alumnes sinó també com a jugadors de futbol sala. Avui, aquest vincle es transforma en un projecte compartit.",
  },
  es: {
    badge: "NUESTRO CLUB",
    title: "Quiénes Somos",
    description:
      "Somos una familia unida por el amor al futsal. Desde Reus, trabajamos cada día para formar jugadores y personas con valores.",
    imageTitle: "Somos club, somos futsal, somos familia y amigos",
    imageSubtitle: "Escola Montsant · Reus",
    foundersTitle: "Fundadores",
    foundersDescription:
      "Cuatro amigos que compartieron los años de escuela en la Escola Montsant, no solo como alumnos sino también como jugadores de fútbol sala. Hoy, ese vínculo se transforma en un proyecto compartido.",
  },
};

export function QuiSom({ language = "ca" }: QuiSomProps) {
  const t = texts[language];
  const navigate = useNavigate();

  return (
    <section id="qui-som" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className="border-none shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 group overflow-hidden cursor-pointer"
            >
              <div className="bg-gradient-hero h-40 flex items-center justify-center">
                <cat.icon
                  className="text-primary-foreground/80 group-hover:scale-110 transition-transform"
                  size={64}
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {cat.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cat.description[language]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Image + Founders */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={quiSomPhoto}
              alt="Joves jugadors a l'Escola Montsant"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-primary-foreground font-bold text-lg">
                {t.imageTitle}
              </p>
              <p className="text-primary-foreground/80 text-sm">
                {t.imageSubtitle}
              </p>
            </div>
          </div>

          {/* Founders */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-primary" size={28} />
              <h3 className="text-2xl font-bold text-foreground">
                {t.foundersTitle}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t.foundersDescription}
            </p>
            <div className="space-y-3">
              {founders.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === "ca" ? "Co-fundador" : "Co-fundador"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
