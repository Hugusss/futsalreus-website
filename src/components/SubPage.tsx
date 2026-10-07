import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import type { Language } from "@/App";

interface SubPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  subtitle: string;
  back: string;
  children: ReactNode;
}

export function SubPage({ language, onLanguageChange, icon: Icon, eyebrow, title, subtitle, back, children }: SubPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="pt-24 md:pt-28">
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Icon className="mx-auto mb-4 text-primary-foreground/80" size={48} aria-hidden="true" />
            {eyebrow && (
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/10 text-primary-foreground text-sm font-bold rounded-full mb-4">
                {eyebrow}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">{title}</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <Button variant="ghost" asChild className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/">
              <ArrowLeft size={18} />
              {back}
            </Link>
          </Button>
          {children}
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
}
