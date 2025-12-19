import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MatchCenter } from "@/components/MatchCenter";
import { QuiSom } from "@/components/QuiSom";
import { Merchandising } from "@/components/Merchandising";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MatchCenter />
        <QuiSom />
        <Merchandising />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
