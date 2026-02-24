import { useNavigate } from "react-router-dom";
import teamImage from "@/assets/team-celebration.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Trophy, CalendarHeart } from "lucide-react";

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

const texts = {
  ca: {
    badge: "EL NOSTRE CLUB",
    title: "Qui Som",
    description:
      "Som una família unida per l'amor al futsal. Des de Reus, treballem cada dia per formar jugadors i persones amb valors.",
    imageTitle: "Units per l'esport",
    imageSubtitle: "Formant futurs campions",
  },
  es: {
    badge: "NUESTRO CLUB",
    title: "Quiénes Somos",
    description:
      "Somos una familia unida por el amor al futsal. Desde Reus, trabajamos cada día para formar jugadores y personas con valores.",
    imageTitle: "Unidos por el deporte",
    imageSubtitle: "Formando futuros campeones",
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

        {/* Team Image */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={teamImage}
              alt="L'equip celebrant"
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
        </div>
      </div>
    </section>
  );
}
