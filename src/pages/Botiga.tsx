import { useRef, useState } from "react";
import { ChevronDown, Shirt, ShoppingBag } from "lucide-react";
import { SubPage } from "@/components/SubPage";
import { Button } from "@/components/ui/button";
import { CAMPAIGN, PRODUCTS, type Product } from "@/data/botiga";
import { useNoIndex } from "@/hooks/use-no-index";
import { usePageTitle } from "@/hooks/use-page-title";
import { CLUB_EMAIL } from "@/lib/links";
import type { PageProps } from "@/lib/language";

const texts = {
  ca: {
    eyebrow: "DEMOSTRACIÓ",
    title: "Botiga del club",
    subtitle: "Equipació del club per encàrrec: una sola comanda al proveïdor per a tot l'equip.",
    back: "Tornar a l'inici",
    demoNotice:
      "Pàgina de demostració. Productes, preus i textos són d'exemple, les fotos encara no hi són i no es pot comprar res.",
    notOpen: (date: string) => `Campanya encara no oberta. S'obre el ${date}.`,
    open: (date: string) => `Campanya oberta fins al ${date}.`,
    closed: "Campanya tancada. Les properes dates les publiquem a les xarxes del club.",
    photoPending: "Foto pendent",
    personalised: "Amb nom i dorsal",
    sizes: "Talles",
    samplePrice: "Preu d'exemple",
    buy: "Comprar",
    unavailable: "No disponible",
    howTitle: "Com funciona",
    steps: [
      "Tria la peça i prem «Comprar».",
      "Indica la talla, el nom i el dorsal, i paga amb targeta o Bizum.",
      "Reps el rebut per correu al moment.",
      "Quan es tanca la campanya, el club fa una sola comanda al proveïdor i t'avisa quan arribi. Es recull al club.",
    ],
    faqTitle: "Preguntes freqüents",
    faq: [
      {
        q: "Com es paga?",
        a: "Amb targeta o Bizum. El pagament el gestiona Stripe i el club no veu les dades de la targeta.",
      },
      {
        q: "Quines dades rep el club?",
        a: "Nom, correu, telèfon, talla, nom i dorsal. Només s'utilitzen per gestionar la comanda.",
      },
      {
        q: "Puc canviar la talla?",
        a: `Text provisional: sí, fins que es tanqui la campanya, escrivint a ${CLUB_EMAIL}.`,
      },
      {
        q: "On recullo la comanda?",
        a: "Al club. Quan arribi, t'avisem per correu.",
      },
    ],
    dialogTitle: "Això és una demostració",
    dialogIntro: (product: string) =>
      `A la botiga real, aquest botó obre la pàgina de pagament de Stripe per a «${product}».`,
    dialogAsks: "Allà es demana:",
    dialogSize: "La talla, a triar d'una llista",
    dialogNumber: "El nom i el dorsal",
    dialogContact: "El correu i el telèfon de contacte",
    dialogPay: "El pagament amb targeta o Bizum",
    close: "Tancar",
    locale: "ca-ES",
  },
  es: {
    eyebrow: "DEMOSTRACIÓN",
    title: "Tienda del club",
    subtitle: "Equipación del club por encargo: un solo pedido al proveedor para todo el equipo.",
    back: "Volver al inicio",
    demoNotice:
      "Página de demostración. Productos, precios y textos son de ejemplo, las fotos aún no están y no se puede comprar nada.",
    notOpen: (date: string) => `Campaña todavía no abierta. Se abre el ${date}.`,
    open: (date: string) => `Campaña abierta hasta el ${date}.`,
    closed: "Campaña cerrada. Las próximas fechas las publicamos en las redes del club.",
    photoPending: "Foto pendiente",
    personalised: "Con nombre y dorsal",
    sizes: "Tallas",
    samplePrice: "Precio de ejemplo",
    buy: "Comprar",
    unavailable: "No disponible",
    howTitle: "Cómo funciona",
    steps: [
      "Elige la prenda y pulsa «Comprar».",
      "Indica la talla, el nombre y el dorsal, y paga con tarjeta o Bizum.",
      "Recibes el recibo por correo al momento.",
      "Al cerrar la campaña, el club hace un solo pedido al proveedor y te avisa cuando llegue. Se recoge en el club.",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se paga?",
        a: "Con tarjeta o Bizum. El pago lo gestiona Stripe y el club no ve los datos de la tarjeta.",
      },
      {
        q: "¿Qué datos recibe el club?",
        a: "Nombre, correo, teléfono, talla, nombre y dorsal. Solo se usan para gestionar el pedido.",
      },
      {
        q: "¿Puedo cambiar la talla?",
        a: `Texto provisional: sí, hasta que se cierre la campaña, escribiendo a ${CLUB_EMAIL}.`,
      },
      {
        q: "¿Dónde recojo el pedido?",
        a: "En el club. Cuando llegue, te avisamos por correo.",
      },
    ],
    dialogTitle: "Esto es una demostración",
    dialogIntro: (product: string) =>
      `En la tienda real, este botón abre la página de pago de Stripe para «${product}».`,
    dialogAsks: "Allí se pide:",
    dialogSize: "La talla, a elegir de una lista",
    dialogNumber: "El nombre y el dorsal",
    dialogContact: "El correo y el teléfono de contacto",
    dialogPay: "El pago con tarjeta o Bizum",
    close: "Cerrar",
    locale: "es-ES",
  },
};

type CampaignState = "not-open" | "open" | "closed";

function campaignState(now: Date): CampaignState {
  if (now < new Date(CAMPAIGN.opensAt)) return "not-open";
  return now <= new Date(CAMPAIGN.closesAt) ? "open" : "closed";
}

const Botiga = ({ language, onLanguageChange }: PageProps) => {
  const t = texts[language];
  usePageTitle(t.title);
  useNoIndex();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  const state = campaignState(new Date());
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(t.locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
  const formatPrice = (euros: number) =>
    new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR" }).format(euros);

  const statusText =
    state === "open"
      ? t.open(formatDate(CAMPAIGN.closesAt))
      : state === "not-open"
        ? t.notOpen(formatDate(CAMPAIGN.opensAt))
        : t.closed;

  const buy = (product: Product) => {
    if (product.paymentUrl) {
      window.location.assign(product.paymentUrl);
      return;
    }
    setSelected(product);
    dialogRef.current?.showModal();
  };

  return (
    <SubPage
      language={language}
      onLanguageChange={onLanguageChange}
      icon={ShoppingBag}
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
      back={t.back}
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <p role="note" className="rounded-2xl border border-accent bg-accent/15 p-4 text-sm font-medium text-foreground">
          {t.demoNotice}
        </p>

        <p
          className={`rounded-2xl border p-4 text-lg font-semibold ${
            state === "open" ? "border-primary/30 bg-primary/5 text-primary" : "border-border bg-muted/50 text-muted-foreground"
          }`}
        >
          {statusText}
        </p>

        <ul className="reveal-group grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <li key={product.id} className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-card">
              <div className="mb-4 flex aspect-[4/3] sm:aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/50 text-sm text-muted-foreground">
                <Shirt aria-hidden="true" size={32} />
                {t.photoPending}
              </div>
              <h2 className="text-lg font-bold text-foreground">{product.name[language]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{product.description[language]}</p>
              {product.personalised && <p className="mt-2 text-sm font-medium text-primary">{t.personalised}</p>}
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.sizes}</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <li key={size} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                    {size}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <p className="text-2xl font-black text-foreground">{formatPrice(product.price)}</p>
                {!product.paymentUrl && <p className="mb-3 text-xs text-muted-foreground">{t.samplePrice}</p>}
                <Button
                  variant="cta"
                  className="w-full"
                  disabled={state !== "open"}
                  aria-haspopup={product.paymentUrl ? undefined : "dialog"}
                  onClick={() => buy(product)}
                >
                  {state === "open" ? t.buy : t.unavailable}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <section className="max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{t.howTitle}</h2>
          <ol className="space-y-4">
            {t.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-lg text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{t.faqTitle}</h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {t.faq.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {item.q}
                  <ChevronDown aria-hidden="true" className="shrink-0 transition group-open:rotate-180" size={20} />
                </summary>
                <p className="mt-3 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="botiga-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        className="w-[min(92vw,28rem)] rounded-2xl bg-card p-0 text-card-foreground shadow-elevated backdrop:bg-foreground/50"
      >
        {selected && (
          <form method="dialog" className="p-6 md:p-8">
            <h2 id="botiga-dialog-title" className="text-xl font-bold text-foreground">
              {t.dialogTitle}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.dialogIntro(selected.name[language])}</p>
            <p className="mt-5 text-sm font-semibold text-foreground">{t.dialogAsks}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>{t.dialogSize}</li>
              {selected.personalised && <li>{t.dialogNumber}</li>}
              <li>{t.dialogContact}</li>
              <li>{t.dialogPay}</li>
            </ul>
            <Button type="submit" variant="outline" className="mt-6 w-full">
              {t.close}
            </Button>
          </form>
        )}
      </dialog>
    </SubPage>
  );
};

export default Botiga;
