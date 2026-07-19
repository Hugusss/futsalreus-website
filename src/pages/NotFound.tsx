import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import type { Language } from "@/App";

interface NotFoundProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const texts = {
  ca: {
    message: "Ups! No hem trobat aquesta pàgina.",
    back: "Tornar a l'inici",
  },
  es: {
    message: "¡Ups! No hemos encontrado esta página.",
    back: "Volver al inicio",
  },
};

const NotFound = ({ language, onLanguageChange }: NotFoundProps) => {
  const location = useLocation();
  const t = texts[language];
  usePageTitle("404");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="text-center px-4 py-16">
          <h1 className="mb-4 text-6xl font-black text-primary">404</h1>
          <p className="mb-8 text-xl text-muted-foreground">{t.message}</p>
          <Button variant="cta" asChild>
            <Link to="/">{t.back}</Link>
          </Button>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default NotFound;
