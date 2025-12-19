import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "#inici", label: { ca: "Inici", es: "Inicio" } },
  { href: "#qui-som", label: { ca: "Qui Som", es: "Quiénes Somos" } },
  { href: "#partits", label: { ca: "Partits", es: "Partidos" } },
  { href: "#botiga", label: { ca: "Botiga", es: "Tienda" } },
  { href: "#contacte", label: { ca: "Contacte", es: "Contacto" } },
];

const languages = [
  { code: "ca", label: "Català", flag: "🇪🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

type Language = "ca" | "es";

interface HeaderProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function Header({ language = "ca", onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange?.(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#inici" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Club Futsal Montsant Reus" 
              className="h-14 md:h-16 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="block text-base md:text-lg font-bold text-primary leading-tight">
                CLUB FUTSAL
              </span>
              <span className="block text-sm md:text-base font-semibold text-muted-foreground leading-tight">
                MONTSANT REUS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {link.label[language]}
              </a>
            ))}
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="default" className="ml-2 gap-2 text-base">
                  <Globe size={20} />
                  <span className="uppercase font-bold">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as Language)}
                    className={`text-base ${language === lang.code ? "bg-primary/10 text-primary" : ""}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="cta" size="default" className="ml-4 text-base px-6 py-3">
              {language === "ca" ? "Uneix-te" : "Únete"}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-lg font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {link.label[language]}
                </a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="px-4 py-3 flex items-center gap-3">
                <Globe size={20} className="text-muted-foreground" />
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as Language)}
                      className={`px-3 py-1.5 rounded-md text-base font-semibold transition-colors ${
                        language === lang.code
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="cta" className="mt-2 mx-4 text-lg py-4">
                {language === "ca" ? "Uneix-te al club" : "Únete al club"}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
