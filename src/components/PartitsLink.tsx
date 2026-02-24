import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "ca" | "es";

interface PartitsLinkProps {
  language?: Language;
}

const texts = {
  ca: {
    badge: "CALENDARI OFICIAL",
    title: "Partits",
    description: "Consulta els resultats i calendaris oficials de la Federació Catalana de Futbol.",
    button: "Veure calendari oficial",
  },
  es: {
    badge: "CALENDARIO OFICIAL",
    title: "Partidos",
    description: "Consulta los resultados y calendarios oficiales de la Federación Catalana de Fútbol.",
    button: "Ver calendario oficial",
  },
};

export function PartitsLink({ language = "ca" }: PartitsLinkProps) {
  const t = texts[language];

  return (
    <section id="partits" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
          {t.badge}
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          {t.description}
        </p>
        <Button
          variant="cta"
          size="lg"
          className="text-lg px-8 py-6 gap-3"
          asChild
        >
          <a
            href="https://www.fcf.cat/ff-pb-minipb-fs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.button}
            <ExternalLink size={20} />
          </a>
        </Button>
      </div>
    </section>
  );
}
