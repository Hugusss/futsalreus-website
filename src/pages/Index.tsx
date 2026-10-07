import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuiSom } from "@/components/QuiSom";
import { PartitsLink } from "@/components/PartitsLink";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";
import type { Language } from "@/App";

interface IndexProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Index = ({ language, onLanguageChange }: IndexProps) => {
  usePageTitle();

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main>
        <Hero language={language} />
        <QuiSom language={language} />
        <PartitsLink language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
