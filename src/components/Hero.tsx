import heroImage from "@/assets/hero-futsal.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inici"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Joves jugant futsal"
          className="w-full h-full object-cover scale-105 animate-[scale-in_1.5s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/80 via-maroon/70 to-maroon-dark/90" />
        {/* Animated overlay particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--gold)/0.1)_0%,_transparent_50%)] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 animate-slide-up leading-tight drop-shadow-lg">
            CLUB FUTSAL
            <br />
            <span className="text-gradient bg-clip-text">MONTSANT REUS</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary-foreground/90 mb-8 animate-slide-up [animation-delay:200ms] drop-shadow-md">
            Som club, som futsal, som família i amics
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:400ms]">
            <Button variant="hero" size="lg" asChild className="group relative overflow-hidden">
              <a href="#contacte">
                <span className="relative z-10">Uneix-te al club</span>
                <div className="absolute inset-0 bg-gold-dark/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild className="group">
              <a href="#qui-som" className="relative">
                Descobreix-nos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-foreground group-hover:w-full transition-all duration-300" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#partits"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-float cursor-pointer"
      >
        <ChevronDown size={32} className="drop-shadow-lg" />
      </a>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
