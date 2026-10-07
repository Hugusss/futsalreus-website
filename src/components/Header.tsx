import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import type { Language } from "@/App";

const navLinks = [
  { href: "#inici", label: { ca: "Inici", es: "Inicio" } },
  { href: "#qui-som", label: { ca: "Qui Som", es: "Quiénes Somos" } },
  { href: "#partits", label: { ca: "Partits", es: "Partidos" } },
  { href: "#contacte", label: { ca: "Contacte", es: "Contacto" } },
];

const languages: { code: Language; label: string }[] = [
  { code: "ca", label: "Català" },
  { code: "es", label: "Español" },
];

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

function LanguageSwitch({ language, onLanguageChange }: HeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe size={20} className="text-muted-foreground" aria-hidden="true" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          lang={lang.code}
          aria-label={lang.label}
          aria-pressed={language === lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-3 py-1.5 rounded-md text-base font-semibold transition-colors ${
            language === lang.code
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      // Navigate to home page first, then scroll to section
      navigate("/" + href);
    } else {
      // Already on home, just scroll
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleJoinClick = () => {
    setIsOpen(false);
    navigate("/inscripcio");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <button onClick={() => handleNavClick("#inici")} className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Club Futsal Montsant Reus" 
              className="h-20 md:h-24 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block md:hidden lg:block">
              <span className="block text-base md:text-lg font-bold text-primary leading-tight">
                CLUB FUTSAL
              </span>
              <span className="block text-sm md:text-base font-semibold text-muted-foreground leading-tight">
                MONTSANT REUS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-5 py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {link.label[language]}
              </button>
            ))}
            
            <div className="ml-2">
              <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
            </div>

            <Button variant="cta" className="ml-4 text-base px-6 py-3" onClick={handleJoinClick}>
              {language === "ca" ? "Uneix-te" : "Únete"}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-foreground hover:text-primary transition-colors"
            aria-label={language === "ca" ? "Obrir o tancar el menú" : "Abrir o cerrar el menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-lg font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-left"
                >
                  {link.label[language]}
                </button>
              ))}
              
              <div className="px-4 py-3">
                <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
              </div>

              <Button variant="cta" className="mt-2 mx-4 text-lg py-4" onClick={handleJoinClick}>
                {language === "ca" ? "Uneix-te al club" : "Únete al club"}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
