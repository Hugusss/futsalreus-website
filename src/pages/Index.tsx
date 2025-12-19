import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MatchCenter } from "@/components/MatchCenter";
import { QuiSom } from "@/components/QuiSom";
import { Merchandising } from "@/components/Merchandising";
import { Footer } from "@/components/Footer";

type Language = "ca" | "es";

const Index = () => {
  const [language, setLanguage] = useState<Language>("ca");

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero language={language} />
        <MatchCenter language={language} />
        <QuiSom language={language} />
        <Merchandising language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
