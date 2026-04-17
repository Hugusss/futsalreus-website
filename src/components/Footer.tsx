import { Instagram, Twitch, Mail, Phone, MapPin } from "lucide-react";

// TikTok icon (not in lucide-react)
const TikTok = ({ size = 24, className }: { size?: number | string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1Z"/>
  </svg>
);
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

type Language = "ca" | "es";

interface FooterProps {
  language?: Language;
}

interface ContactItem {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  text: string;
  href: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => false;
}

// Function to get the appropriate map link based on device
const getMapLink = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  if (isIOS) {
    // Apple Maps for iOS
    return "maps://maps.apple.com/?address=Reus,Tarragona";
  } else {
    // Google Maps for Android and other devices
    return "geo:41.1534,1.1055?q=Reus,Tarragona";
  }
};

// Function to handle map link click with fallback
const handleMapClick = (e: React.MouseEvent<HTMLAnchorElement>): false => {
  e.preventDefault();
  const mapUrl = getMapLink();
  const fallbackUrl = "https://maps.google.com/?q=Reus,Tarragona";

  // Try to open the native map app
  setTimeout(() => {
    // If app doesn't open after 1 second, fallback to browser
    window.open(fallbackUrl, "_blank");
  }, 1000);

  window.location.href = mapUrl;

  // Clear timeout if the link worked (app opened)
  return false;
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/fsmontsantreus/", label: "Instagram" },
  { icon: TikTok, href: "https://www.tiktok.com/@fsmontsantreus", label: "TikTok" },
  { icon: Twitch, href: "https://www.twitch.tv/fsmontsantreus", label: "Twitch" },
];

const contactInfo: ContactItem[] = [
  { icon: Mail, text: "futsalmontsant@gmail.com", href: "mailto:futsalmontsant@gmail.com" },
  { icon: Phone, text: "+34 683 386 660", href: "tel:+34683386660" },
  { icon: MapPin, text: "Reus, Tarragona", href: "#", onClick: handleMapClick },
];

const texts = {
  ca: {
    description: "Som un club de futsal de Reus fundat el 2025 amb l'objectiu de promoure l'esport i els valors entre els més joves de la nostra comunitat.",
    contact: "Contacta'ns",
    sendMessage: "Envia'ns un missatge",
    copyright: "© 2025 Club Futsal Montsant Reus. Tots els drets reservats.",
    madeWith: "Fet amb",
    inReus: "a Reus",
  },
  es: {
    description: "Somos un club de futsal de Reus fundado en 2025 con el objetivo de promover el deporte y los valores entre los más jóvenes de nuestra comunidad.",
    contact: "Contáctanos",
    sendMessage: "Envíanos un mensaje",
    copyright: "© 2025 Club Futsal Montsant Reus. Todos los derechos reservados.",
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
              <img src={logo} alt="Club Futsal Montsant Reus" className="h-24 w-auto" />
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                  onClick={item.onClick}
                  target={item.target}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <item.icon size={18} className="text-accent" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
            <Button variant="hero" className="w-full" asChild>
              <a href="mailto:futsalmontsant@gmail.com">{t.sendMessage}</a>
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
