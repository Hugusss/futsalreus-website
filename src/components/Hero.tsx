import heroImage from "@/assets/hero-futsal.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Language = "ca" | "es";

interface HeroProps {
  language?: Language;
}

const texts = {
  ca: {
    slogan: "Som club, som futsal, som família i amics",
    cta: "Uneix-te al club",
    discover: "Descobreix-nos",
  },
  es: {
    slogan: "Somos club, somos futsal, somos familia y amigos",
    cta: "Únete al club",
    discover: "Descúbrenos",
  },
};

export function Hero({ language = "ca" }: HeroProps) {
  const t = texts[language];

  return (
    <section
      id="inici"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Joves jugant futsal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/80 via-maroon/70 to-maroon-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 animate-slide-up leading-tight">
            CLUB FUTSAL
            <br />
            <span className="text-gradient">MONTSANT REUS</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary-foreground/90 mb-8 animate-slide-up-delay-1">
            {t.slogan}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Button variant="hero" size="lg" asChild>
              <a href="#contacte">{t.cta}</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#qui-som">{t.discover}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#partits"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-float"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
