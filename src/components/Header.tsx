import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#inici", label: "Inici" },
  { href: "#qui-som", label: "Qui Som" },
  { href: "#partits", label: "Partits" },
  { href: "#botiga", label: "Botiga" },
  { href: "#contacte", label: "Contacte" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inici" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Club Futsal Montsant Reus" 
              className="h-12 md:h-14 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="block text-sm md:text-base font-bold text-primary leading-tight">
                CLUB FUTSAL
              </span>
              <span className="block text-xs md:text-sm font-semibold text-muted-foreground leading-tight">
                MONTSANT REUS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {link.label}
              </a>
            ))}
            <Button variant="cta" size="sm" className="ml-4">
              Uneix-te
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className="px-4 py-3 text-base font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button variant="cta" className="mt-2 mx-4">
                Uneix-te al club
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
