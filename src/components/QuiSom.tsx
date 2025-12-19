import teamImage from "@/assets/team-celebration.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, Heart } from "lucide-react";

type Language = "ca" | "es";

interface QuiSomProps {
  language?: Language;
}

const team = [
  { name: "Marc Garcia", role: { ca: "Entrenador", es: "Entrenador" }, icon: Users },
  { name: "Jordi Puig", role: { ca: "Porter", es: "Portero" }, icon: Trophy },
  { name: "Pau Martí", role: { ca: "Ala", es: "Ala" }, icon: Trophy },
  { name: "Arnau Vila", role: { ca: "Pivot", es: "Pívot" }, icon: Trophy },
  { name: "Oriol Roca", role: { ca: "Cierre", es: "Cierre" }, icon: Trophy },
  { name: "Laia Ferrer", role: { ca: "Coordinadora", es: "Coordinadora" }, icon: Heart },
];

const texts = {
  ca: {
    badge: "EL NOSTRE EQUIP",
    title: "Qui Som",
    description: "Som una família unida per l'amor al futsal. Des de Reus, treballem cada dia per formar jugadors i persones amb valors.",
    stats: [
      { value: "2024", label: "Any de Fundació" },
      { value: "45+", label: "Jugadors" },
      { value: "4", label: "Equips" },
      { value: "100%", label: "Passió" },
    ],
    imageTitle: "Units per l'esport",
    imageSubtitle: "Formant futurs campions",
  },
  es: {
    badge: "NUESTRO EQUIPO",
    title: "Quiénes Somos",
    description: "Somos una familia unida por el amor al futsal. Desde Reus, trabajamos cada día para formar jugadores y personas con valores.",
    stats: [
      { value: "2024", label: "Año de Fundación" },
      { value: "45+", label: "Jugadores" },
      { value: "4", label: "Equipos" },
      { value: "100%", label: "Pasión" },
    ],
    imageTitle: "Unidos por el deporte",
    imageSubtitle: "Formando futuros campeones",
  },
};

export function QuiSom({ language = "ca" }: QuiSomProps) {
  const t = texts[language];

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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {t.stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-card text-center">
              <CardContent className="p-6">
                <span className="block text-3xl md:text-4xl font-black text-primary mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {team.map((member, index) => (
                <Card 
                  key={index} 
                  className="border-none shadow-card hover:shadow-elevated transition-shadow group"
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-hero rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <member.icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role[language]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
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
      </div>
    </section>
  );
}
