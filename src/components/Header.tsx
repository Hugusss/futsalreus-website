import { useState, type MouseEvent } from "react";
import { scrollBehavior } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/language";

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
  const location = useLocation();
  const closeMenu = () => setIsOpen(false);

  // Section links are real links to /#section, so they work for crawlers and in a new tab.
  // On the home page a same-document hash change would not scroll, so scroll by hand there.
  const handleSectionClick = (event: MouseEvent, href: string) => {
    closeMenu();
    if (location.pathname === "/") {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: scrollBehavior() });
    }
  };

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <a
        href="#contingut"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-foreground"
      >
        {language === "ca" ? "Salta al contingut" : "Saltar al contenido"}
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" viewTransition onClick={(event) => handleSectionClick(event, "#inici")} className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Club Futsal Montsant Reus"
              width={512}
              height={362}
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={"/" + link.href}
                viewTransition
                onClick={(event) => handleSectionClick(event, link.href)}
                className="px-5 py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {link.label[language]}
              </Link>
            ))}
            
            <div className="ml-2">
              <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
            </div>

            <Button variant="cta" className="ml-4 text-base px-6 py-3" asChild>
              <Link to="/inscripcio" viewTransition onClick={closeMenu}>
                {language === "ca" ? "Uneix-te" : "Únete"}
              </Link>
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
            <div className="menu-enter flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={"/" + link.href}
                  viewTransition
                  onClick={(event) => handleSectionClick(event, link.href)}
                  className="px-4 py-3 text-lg font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {link.label[language]}
                </Link>
              ))}
              
              <div className="px-4 py-3">
                <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
              </div>

              <Button variant="cta" className="mt-2 mx-4 text-lg py-4" asChild>
                <Link to="/inscripcio" viewTransition onClick={closeMenu}>
                  {language === "ca" ? "Uneix-te al club" : "Únete al club"}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
