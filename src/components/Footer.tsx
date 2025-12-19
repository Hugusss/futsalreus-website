import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

type Language = "ca" | "es";

interface FooterProps {
  language?: Language;
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const contactInfo = [
  { icon: Mail, text: "info@cfmontsant.cat", href: "mailto:info@cfmontsant.cat" },
  { icon: Phone, text: "+34 977 000 000", href: "tel:+34977000000" },
  { icon: MapPin, text: "Reus, Tarragona", href: "#" },
];

const texts = {
  ca: {
    description: "Som un club de futsal de Reus fundat el 2024 amb l'objectiu de promoure l'esport i els valors entre els més joves de la nostra comunitat.",
    contact: "Contacta'ns",
    sendMessage: "Envia'ns un missatge",
    copyright: "© 2024 Club Futsal Montsant Reus. Tots els drets reservats.",
    madeWith: "Fet amb",
    inReus: "a Reus",
  },
  es: {
    description: "Somos un club de futsal de Reus fundado en 2024 con el objetivo de promover el deporte y los valores entre los más jóvenes de nuestra comunidad.",
    contact: "Contáctanos",
    sendMessage: "Envíanos un mensaje",
    copyright: "© 2024 Club Futsal Montsant Reus. Todos los derechos reservados.",
    madeWith: "Hecho con",
    inReus: "en Reus",
  },
};

export function Footer({ language = "ca" }: FooterProps) {
  const t = texts[language];

  return (
    <footer id="contacte" className="bg-maroon-dark text-primary-foreground">
      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="Club Futsal Montsant Reus" className="h-16 w-auto" />
              <div>
                <h2 className="text-2xl font-black">CLUB FUTSAL</h2>
                <p className="text-primary-foreground/80 font-semibold">MONTSANT REUS</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              {t.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Contact */}
          <div className="bg-primary-foreground/5 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">{t.contact}</h3>
            <div className="space-y-4 mb-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <item.icon size={18} className="text-accent" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
            <Button variant="hero" className="w-full" asChild>
              <a href="mailto:info@cfmontsant.cat">{t.sendMessage}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>{t.copyright}</p>
            <p>
              {t.madeWith} <span className="text-accent">♥</span> {t.inReus}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
