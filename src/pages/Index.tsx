import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuiSom } from "@/components/QuiSom";
import { PartitsLink } from "@/components/PartitsLink";
import { Footer } from "@/components/Footer";
import { PreviewExtras } from "@/components/PreviewExtras";
import { usePageTitle } from "@/hooks/use-page-title";
import type { PageProps } from "@/lib/language";

const Index = ({ language, onLanguageChange }: PageProps) => {
  usePageTitle();

  return (
    <div className="min-h-svh bg-background">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main id="contingut">
        <Hero language={language} />
        <QuiSom language={language} />
        <PartitsLink language={language} />
      </main>
      <Footer language={language} />
      <PreviewExtras language={language} />
    </div>
  );
};

export default Index;
