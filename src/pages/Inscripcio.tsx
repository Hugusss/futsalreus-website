import { ClipboardList, Download, FileText, Mail } from "lucide-react";
import { SubPage } from "@/components/SubPage";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import type { Language } from "@/App";

interface InscripcioProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const CLUB_EMAIL = "futsalmontsant@gmail.com";

const texts = {
  ca: {
    eyebrow: "TEMPORADA 2026-2027",
    title: "Full d'Inscripció",
    subtitle: "Descarrega el full d'inscripció, omple'l i signa'l per formalitzar la inscripció al club.",
    back: "Tornar a l'inici",
    pdfTitle: "Full d'inscripció (PDF)",
    pdfText: "Descarrega el full, imprimeix-lo, omple'l i signa'l. Després envia'l per correu o porta'l al club.",
    pdfButton: "Descarregar PDF",
    pdfNote: "També pots portar-lo signat directament al club.",
    privacy:
      "Les dades es tractaran de forma confidencial i només s'utilitzaran per a la gestió esportiva i administrativa del club.",
  },
  es: {
    eyebrow: "TEMPORADA 2026-2027",
    title: "Hoja de Inscripción",
    subtitle: "Descarga la hoja de inscripción, rellénala y fírmala para formalizar la inscripción en el club.",
    back: "Volver al inicio",
    pdfTitle: "Hoja de inscripción (PDF)",
    pdfText: "Descarga la hoja, imprímela, rellénala y fírmala. Después envíala por correo o tráela al club.",
    pdfButton: "Descargar PDF",
    pdfNote: "También puedes traerla firmada directamente al club.",
    privacy:
      "Los datos se tratarán de forma confidencial y solo se usarán para la gestión deportiva y administrativa del club.",
  },
};

const Inscripcio = ({ language, onLanguageChange }: InscripcioProps) => {
  const t = texts[language];
  usePageTitle(t.title);

  return (
    <SubPage
      language={language}
      onLanguageChange={onLanguageChange}
      icon={ClipboardList}
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
      back={t.back}
    >
      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent p-6 md:p-7 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <FileText size={22} />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-foreground mb-1">{t.pdfTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2.5">{t.pdfText}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <a
                  href={`mailto:${CLUB_EMAIL}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-2"
                >
                  <Mail size={14} />
                  {CLUB_EMAIL}
                </a>
                <span className="text-sm text-muted-foreground">{t.pdfNote}</span>
              </div>
            </div>

            <Button variant="cta" className="w-full sm:w-auto shrink-0" asChild>
              <a href="/inscripcio.pdf" download="Inscripcio_Futsal_Montsant.pdf">
                <Download className="mr-2 h-4 w-4" />
                {t.pdfButton}
              </a>
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{t.privacy}</p>
      </div>
    </SubPage>
  );
};

export default Inscripcio;
