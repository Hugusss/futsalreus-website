import { useNavigate } from "react-router-dom";
import quiSomPhoto from "@/assets/quiSom-photo.jpg";
import bossesImg from "@/assets/fundadors/bosses_pic.jpg";
import angelImg from "@/assets/fundadors/angel_pfp.png";
import lupeImg from "@/assets/fundadors/lupe_pfp.png";
import navarroImg from "@/assets/fundadors/navarro_pfp.jpg";
import ricouImg from "@/assets/fundadors/ricou_pfp.jpg";
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
  { name: "Àngel Borràs Barberà", image: angelImg },
  { name: "Marc López Garreta", image: lupeImg },
  { name: "Àlex Navarro Ramos", image: navarroImg },
  { name: "Aleix Ricou Boza", image: ricouImg },
];

const texts = {
  ca: {
    badge: "EL NOSTRE CLUB",
    title: "Qui Som",
    description:
      "Som una família unida per l'amor al futsal. Des de Reus, treballem cada dia per formar jugadors i persones amb valors.",
    imageTitle: "Som club, som futsal, som família i amics",
    imageSubtitle: "Escola Montsant · Reus",
    bossesTitle: "La Directiva",
    bossesSubtitle: "Liderant el projecte",
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
    bossesTitle: "La Directiva",
    bossesSubtitle: "Liderando el proyecto",
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

        {/* Team Images + Founders */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Column: Images */}
          <div className="flex flex-col gap-6">
            {/* Primera Foto */}
            <div className="relative rounded-2xl overflow-hidden shadow-elevated group">
              <img
                src={quiSomPhoto}
                alt="Joves jugadors a l'Escola Montsant"
                // Aquí está el cambio: forzamos alturas panorámicas según la pantalla
                className="w-full h-64 lg:h-56 xl:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/70 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-primary-foreground font-bold text-lg md:text-xl">
                  {t.imageTitle}
                </p>
                <p className="text-primary-foreground/80 text-sm font-medium">
                  {t.imageSubtitle}
                </p>
              </div>
            </div>

            {/* Foto Bosses */}
            <div className="relative rounded-2xl overflow-hidden shadow-elevated group">
              <img
                src={bossesImg}
                alt="Directiva del Club"
                className="w-full h-64 lg:h-56 xl:h-64 object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/70 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-primary-foreground font-bold text-lg md:text-xl">
                  {t.bossesTitle}
                </p>
                <p className="text-primary-foreground/80 text-sm font-medium">
                  {t.bossesSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founders */}
          <div className="flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={32} />
              <h3 className="text-3xl font-black text-foreground">
                {t.foundersTitle}
              </h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t.foundersDescription}
            </p>
            
            {/* Founders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/20 bg-muted">
                    <img
                      src={founder.image}
                      alt={`Foto de ${founder.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-foreground text-base leading-tight">
                      {founder.name}
                    </p>
                    <p className="text-sm text-primary font-medium mt-0.5">
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