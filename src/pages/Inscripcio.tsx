import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardList, CheckCircle2, Loader2, ShieldCheck, Download, FileText, Mail } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import type { Language } from "@/App";

interface InscripcioProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// --- Validation helpers -----------------------------------------------
// Loose but useful patterns. They catch typos without being overly strict
// about edge cases (NIE, non-standard formatting, etc.).
const DNI_REGEX = /^\d{8}[A-Za-z]$/;
const PHONE_REGEX = /^(?:\+34|0034)?[6789]\d{8}$/;
const IBAN_REGEX = /^ES\d{22}$/;

const normalizeSpaces = (value: string) => value.replace(/\s+/g, "");

// --- Formateadores visuales en tiempo real ---
const forceUpper = (val: string) => val.toUpperCase();

const formatIBAN = (val: string) => {
  // Quita todo lo que no sea número o letra y pasa a mayúsculas
  const cleaned = val.replace(/[^\dA-Za-z]/g, "").toUpperCase().slice(0, 24); // ES + 22 digits
  // Agrupa de 4 en 4 con un espacio
  return cleaned.replace(/(.{4})(?=.)/g, "$1 ").trim();
};

const formatPhone = (val: string) => {
  // Quita todo lo que no sea un número o el signo +
  const cleaned = val.replace(/[^\d+]/g, "").slice(0, 12); // +34 + 9 digits, generous cap
  
  // Si empieza por +34, lo separamos para formatear el resto de 3 en 3
  if (cleaned.startsWith("+34")) {
    const prefix = "+34";
    const rest = cleaned.slice(3).replace(/(\d{3})(?=\d)/g, "$1 ").trim();
    return rest ? `${prefix} ${rest}` : prefix;
  }
  // Si es un número normal (ej: 600000000), lo formatea de 3 en 3
  return cleaned.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
};

// --- Copy (Catalan / Spanish) ------------------------------------------
interface Texts {
  eyebrow: string;
  title: string;
  subtitle: string;
  back: string;
  intro: string;
  pdfAlternativeTitle: string;
  pdfAlternativeText: string;
  pdfAlternativeButton: string;
  pdfAlternativeNote: string;
  playerSection: string;
  guardianSection: string;
  bankSection: string;
  bankText: string;
  fields: {
    playerName: string;
    playerSurname: string;
    playerDni: string;
    playerBirthdate: string;
    playerPhone: string;
    guardianName: string;
    guardianSurname: string;
    guardianDni: string;
    address: string;
    guardianPhone: string;
    email: string;
    iban: string;
    signatureName: string;
  };
  placeholders: {
    playerDni: string;
    guardianDni: string;
    guardianPhone: string;
    email: string;
    iban: string;
    address: string;
    signatureName: string;
  };
  acceptSepaLabel: string;
  acceptPrivacyLabel: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  successBack: string;
  toastSuccess: string;
  toastError: string;
  notConfigured: string;
  errors: {
    required: string;
    minLength: string;
    dni: string;
    phone: string;
    email: string;
    iban: string;
    checkbox: string;
  };
}

const texts: Record<Language, Texts> = {
  ca: {
    eyebrow: "TEMPORADA 2026-2027",
    title: "Full d'Inscripció",
    subtitle:
      "Omple les dades del jugador/a i del pare, mare o tutor legal per formalitzar la inscripció al club.",
    back: "Tornar a l'inici",
    intro:
      "Tots els camps marcats amb * són obligatoris. Les dades es tractaran de forma confidencial i només s'utilitzaran per a la gestió esportiva i administrativa del club.",
    pdfAlternativeTitle: "Prefereixes fer-ho a mà?",
    pdfAlternativeText: "Descarrega el full, imprimeix-lo, signa'l i fes-nos-el arribar.",
    pdfAlternativeButton: "Descarregar PDF",
    pdfAlternativeNote: "També pots portar-lo signat directament al club.",
    playerSection: "Dades del jugador/a",
    guardianSection: "Dades del pare/mare o representant legal",
    bankSection: "Autorització de domiciliació bancària",
    bankText:
      "Mitjançant la signatura d'aquest formulari, autoritzo el CLUB FUTSAL MONTSANT DE REUS per a l'enviament d'ordres de domiciliació bancària a la seva entitat financera per carregar els imports corresponents a les quotes mensuals de l'activitat de futbol sala del meu fill/a.",
    fields: {
      playerName: "Nom",
      playerSurname: "Cognoms",
      playerDni: "DNI",
      playerBirthdate: "Data de naixement",
      playerPhone: "Telèfon de contacte (opcional)",
      guardianName: "Nom",
      guardianSurname: "Cognoms",
      guardianDni: "DNI",
      address: "Adreça",
      guardianPhone: "Telèfon de contacte",
      email: "E-mail",
      iban: "IBAN",
      signatureName: "Nom i cognoms (signatura digital)",
    },
    placeholders: {
      playerDni: "12345678A",
      guardianDni: "12345678A",
      guardianPhone: "612 345 678",
      email: "nom@exemple.com",
      iban: "ES00 0000 0000 0000 0000 0000",
      address: "Carrer, número, pis, Reus",
      signatureName: "Escriu el teu nom complet",
    },
    acceptSepaLabel: "Accepto l'autorització de domiciliació bancària descrita anteriorment.",
    acceptPrivacyLabel:
      "Accepto que les meves dades i les del/de la menor siguin tractades pel Club Futsal Montsant de Reus per a la gestió de la inscripció, d'acord amb el RGPD i la LOPDGDD.",
    submit: "Enviar inscripció",
    submitting: "Enviant...",
    successTitle: "Inscripció enviada correctament!",
    successText:
      "Hem rebut les dades. La junta directiva es posarà en contacte amb tu per confirmar la inscripció i els següents passos.",
    successBack: "Tornar a l'inici",
    toastSuccess: "Inscripció enviada correctament.",
    toastError: "No s'ha pogut enviar el formulari. Torna-ho a provar o escriu-nos a futsalmontsant@gmail.com.",
    notConfigured:
      "El formulari encara no està connectat a cap servei d'enviament. Contacta amb la persona responsable del web per configurar la clau de Web3Forms.",
    errors: {
      required: "Aquest camp és obligatori.",
      minLength: "Aquest camp és massa curt.",
      dni: "Introdueix un DNI vàlid (8 números + 1 lletra).",
      phone: "Introdueix un telèfon vàlid.",
      email: "Introdueix un e-mail vàlid.",
      iban: "Introdueix un IBAN vàlid (ES + 22 dígits).",
      checkbox: "Cal acceptar aquesta condició per continuar.",
    },
  },
  es: {
    eyebrow: "TEMPORADA 2026-2027",
    title: "Hoja de Inscripción",
    subtitle:
      "Rellena los datos del jugador/a y del padre, madre o tutor legal para formalizar la inscripción en el club.",
    back: "Volver al inicio",
    intro:
      "Todos los campos marcados con * son obligatorios. Los datos se tratarán de forma confidencial y solo se usarán para la gestión deportiva y administrativa del club.",
    pdfAlternativeTitle: "¿Prefieres hacerlo a mano?",
    pdfAlternativeText: "Descarga la hoja, imprímela, fírmala y hazla llegar.",
    pdfAlternativeButton: "Descargar PDF",
    pdfAlternativeNote: "También puedes traerla firmada directamente al club.",
    playerSection: "Datos del jugador/a",
    guardianSection: "Datos del padre/madre o representante legal",
    bankSection: "Autorización de domiciliación bancaria",
    bankText:
      "Mediante la firma de este formulario, autorizo al CLUB FUTSAL MONTSANT DE REUS para el envío de órdenes de domiciliación bancaria a su entidad financiera para cargar los importes correspondientes a las cuotas mensuales de la actividad de fútbol sala de mi hijo/a.",
    fields: {
      playerName: "Nombre",
      playerSurname: "Apellidos",
      playerDni: "DNI",
      playerBirthdate: "Fecha de nacimiento",
      playerPhone: "Teléfono de contacto (opcional)",
      guardianName: "Nombre",
      guardianSurname: "Apellidos",
      guardianDni: "DNI",
      address: "Dirección",
      guardianPhone: "Teléfono de contacto",
      email: "E-mail",
      iban: "IBAN",
      signatureName: "Nombre y apellidos (firma digital)",
    },
    placeholders: {
      playerDni: "12345678A",
      guardianDni: "12345678A",
      guardianPhone: "612 345 678",
      email: "nombre@ejemplo.com",
      iban: "ES00 0000 0000 0000 0000 0000",
      address: "Calle, número, piso, Reus",
      signatureName: "Escribe tu nombre completo",
    },
    acceptSepaLabel: "Acepto la autorización de domiciliación bancaria descrita anteriormente.",
    acceptPrivacyLabel:
      "Acepto que mis datos y los del/de la menor sean tratados por el Club Futsal Montsant de Reus para la gestión de la inscripción, conforme al RGPD y la LOPDGDD.",
    submit: "Enviar inscripción",
    submitting: "Enviando...",
    successTitle: "¡Inscripción enviada correctamente!",
    successText:
      "Hemos recibido los datos. La junta directiva se pondrá en contacto contigo para confirmar la inscripción y los siguientes pasos.",
    successBack: "Volver al inicio",
    toastSuccess: "Inscripción enviada correctamente.",
    toastError: "No se ha podido enviar el formulario. Inténtalo de nuevo o escríbenos a futsalmontsant@gmail.com.",
    notConfigured:
      "El formulario todavía no está conectado a ningún servicio de envío. Contacta con la persona responsable de la web para configurar la clave de Web3Forms.",
    errors: {
      required: "Este campo es obligatorio.",
      minLength: "Este campo es demasiado corto.",
      dni: "Introduce un DNI válido (8 números + 1 letra).",
      phone: "Introduce un teléfono válido.",
      email: "Introduce un e-mail válido.",
      iban: "Introduce un IBAN válido (ES + 22 dígitos).",
      checkbox: "Debes aceptar esta condición para continuar.",
    },
  },
};

// Schema factory so validation messages follow the selected language.
function buildSchema(t: Texts) {
  return z.object({
    playerName: z.string().trim().min(2, t.errors.minLength),
    playerSurname: z.string().trim().min(2, t.errors.minLength),
    playerDni: z
      .string()
      .trim()
      .toUpperCase()
      .refine((v) => DNI_REGEX.test(v), t.errors.dni),
    playerBirthdate: z.string().min(1, t.errors.required),
    playerPhone: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || PHONE_REGEX.test(normalizeSpaces(v)), t.errors.phone),
    guardianName: z.string().trim().min(2, t.errors.minLength),
    guardianSurname: z.string().trim().min(2, t.errors.minLength),
    guardianDni: z
      .string()
      .trim()
      .toUpperCase()
      .refine((v) => DNI_REGEX.test(v), t.errors.dni),
    address: z.string().trim().min(5, t.errors.minLength),
    guardianPhone: z
      .string()
      .trim()
      .refine((v) => PHONE_REGEX.test(normalizeSpaces(v)), t.errors.phone),
    email: z.string().trim().email(t.errors.email),
    iban: z
      .string()
      .trim()
      .toUpperCase()
      .refine((v) => IBAN_REGEX.test(normalizeSpaces(v)), t.errors.iban),
    signatureName: z.string().trim().min(3, t.errors.minLength),
    acceptSepa: z.boolean().refine((v) => v === true, t.errors.checkbox),
    acceptPrivacy: z.boolean().refine((v) => v === true, t.errors.checkbox),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

// Public Web3Forms access key — safe to expose client-side by design
// (it's an alias for the destination inbox, not a secret).
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

const Inscripcio = ({ language, onLanguageChange }: InscripcioProps) => {
  const navigate = useNavigate();
  const t = texts[language];
  const schema = useMemo(() => buildSchema(t), [t]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      playerName: "",
      playerSurname: "",
      playerDni: "",
      playerBirthdate: "",
      playerPhone: "",
      guardianName: "",
      guardianSurname: "",
      guardianDni: "",
      address: "",
      guardianPhone: "",
      email: "",
      iban: "",
      signatureName: "",
      acceptSepa: false,
      acceptPrivacy: false,
    },
    mode: "onBlur",
  });

  // Vigilamos los checkboxes en tiempo real
  const { acceptSepa, acceptPrivacy } = form.watch();
  const canSubmit = acceptSepa && acceptPrivacy;

  const onSubmit = async (data: FormValues) => {
    // Silently drop likely-bot submissions (hidden honeypot field).
    if (honeypotRef.current?.checked) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error(t.notConfigured);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nova inscripció: ${data.playerName} ${data.playerSurname}`,
          from_name: "Web Club Futsal Montsant Reus",
          replyto: data.email,
          "Jugador/a": `${data.playerName} ${data.playerSurname}`,
          "DNI jugador/a": data.playerDni,
          "Data de naixement": data.playerBirthdate,
          "Telèfon jugador/a": data.playerPhone || "-",
          "Pare/Mare/Tutor legal": `${data.guardianName} ${data.guardianSurname}`,
          "DNI representant": data.guardianDni,
          Adreça: data.address,
          "Telèfon de contacte": data.guardianPhone,
          Email: data.email,
          IBAN: normalizeSpaces(data.iban),
          "Signatura digital": data.signatureName,
          "Autorització domiciliació bancària": "Sí",
          "Consentiment RGPD": "Sí",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        toast.success(t.toastSuccess);
        form.reset();
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Inscripció submission failed:", error);
      toast.error(t.toastError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="pt-24 md:pt-28">
        {/* Hero Banner */}
        <div className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <ClipboardList className="mx-auto mb-4 text-primary-foreground/80" size={48} />
            <span className="inline-block px-4 py-1.5 bg-primary-foreground/10 text-primary-foreground text-sm font-bold rounded-full mb-4">
              {t.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            {t.back}
          </Button>

          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-16 px-6 rounded-2xl bg-card border border-border shadow-card">
                <CheckCircle2 className="mx-auto mb-4 text-primary" size={56} />
                <h2 className="text-2xl font-bold text-foreground mb-3">{t.successTitle}</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">{t.successText}</p>
                <Button variant="cta" onClick={() => navigate("/")}>
                  {t.successBack}
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-8 leading-relaxed">{t.intro}</p>
                {/* Alternative path: download, sign by hand, send back */}
                <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent p-6 md:p-7 mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary shrink-0">
                      <FileText size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-1">{t.pdfAlternativeTitle}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2.5">
                        {t.pdfAlternativeText}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <a
                          href="mailto:futsalmontsant@gmail.com"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-2"
                        >
                          <Mail size={14} />
                          futsalmontsant@gmail.com
                        </a>
                        <span className="text-sm text-muted-foreground">{t.pdfAlternativeNote}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full sm:w-auto shrink-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                      asChild
                    >
                      <a href="/inscripcio.pdf" download="Inscripcio_Futsal_Montsant.pdf" target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        {t.pdfAlternativeButton}
                      </a>
                    </Button>
                  </div>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10" noValidate>
                    {/* Honeypot field — hidden from real users, bots tend to fill it */}
                    <input
                      type="checkbox"
                      ref={honeypotRef}
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Player data */}
                    <section>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        {t.playerSection}
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="playerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.playerName} *</FormLabel>
                              <FormControl>
                                <Input {...field}
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="playerSurname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.playerSurname} *</FormLabel>
                              <FormControl>
                                <Input {...field}
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="playerDni"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.playerDni} *</FormLabel>
                              <FormControl>
                                <Input placeholder={t.placeholders.playerDni} maxLength={9} {...field}
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="playerBirthdate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.playerBirthdate} *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="playerPhone"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>{t.fields.playerPhone}</FormLabel>
                              <FormControl>
                                <Input type="tel" inputMode="tel" placeholder={t.placeholders.guardianPhone} {...field}
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </section>

                    {/* Guardian data */}
                    <section>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        {t.guardianSection}
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="guardianName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.guardianName} *</FormLabel>
                              <FormControl>
                                <Input {...field} 
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="guardianSurname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.guardianSurname} *</FormLabel>
                              <FormControl>
                                <Input {...field} 
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="guardianDni"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.guardianDni} *</FormLabel>
                              <FormControl>
                                <Input placeholder={t.placeholders.guardianDni} maxLength={9} {...field} 
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="guardianPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.fields.guardianPhone} *</FormLabel>
                              <FormControl>
                                <Input type="tel" inputMode="tel" placeholder={t.placeholders.guardianPhone} {...field} 
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>{t.fields.address} *</FormLabel>
                              <FormControl>
                                <Input placeholder={t.placeholders.address} {...field}
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>{t.fields.email} *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder={t.placeholders.email} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="iban"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>{t.fields.iban} *</FormLabel>
                              <FormControl>
                                <Input placeholder={t.placeholders.iban}
                                maxLength={29}
                                {...field}
                                onChange={(e) => field.onChange(formatIBAN(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </section>

                    {/* Bank authorization */}
                    <section className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="text-primary" size={22} />
                        <h2 className="text-xl font-bold text-foreground">{t.bankSection}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {t.bankText}
                      </p>

                      <FormField
                        control={form.control}
                        name="signatureName"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel>{t.fields.signatureName} *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.placeholders.signatureName}
                                className="font-serif italic"
                                {...field}
                                onChange={(e) => field.onChange(forceUpper(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="acceptSepa"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start gap-3 space-y-0 mb-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="leading-tight">
                              <FormLabel className="font-normal">{t.acceptSepaLabel}</FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="acceptPrivacy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start gap-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="leading-tight">
                              <FormLabel className="font-normal">{t.acceptPrivacyLabel}</FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </section>

                    {!WEB3FORMS_ACCESS_KEY && (
                      <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                        {t.notConfigured}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full text-lg py-6"
                      disabled={isSubmitting || !canSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          {t.submitting}
                        </>
                      ) : (
                        t.submit
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Inscripcio;