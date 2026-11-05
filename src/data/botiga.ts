import type { Language } from "@/lib/language";

type Localised = Record<Language, string>;

export interface Product {
  id: string;
  name: Localised;
  description: Localised;
  /** Euros. */
  price: number;
  sizes: string[];
  /** Whether the checkout asks for a name and a number. */
  personalised: boolean;
  /** Stripe Payment Link. Without it the button only opens the demo dialog. */
  paymentUrl?: string;
}

// One campaign at a time: the Payment Links are switched on and off in the Stripe dashboard
// on the same dates, so the page can say whether ordering is open.
export const CAMPAIGN = {
  opensAt: "2026-11-01T00:00:00",
  closesAt: "2026-12-15T23:59:59",
};

const KIDS_SIZES = ["6", "8", "10", "12", "14", "S", "M", "L"];

// Example products and prices for the demo; the real list comes from the directors.
export const PRODUCTS: Product[] = [
  {
    id: "samarreta-joc",
    name: { ca: "Samarreta de joc", es: "Camiseta de juego" },
    description: {
      ca: "Samarreta de partit amb l'escut del club.",
      es: "Camiseta de partido con el escudo del club.",
    },
    price: 28,
    sizes: KIDS_SIZES,
    personalised: true,
  },
  {
    id: "pantalo-joc",
    name: { ca: "Pantaló de joc", es: "Pantalón de juego" },
    description: {
      ca: "Pantaló curt a joc amb la samarreta.",
      es: "Pantalón corto a juego con la camiseta.",
    },
    price: 16,
    sizes: KIDS_SIZES,
    personalised: false,
  },
  {
    id: "dessuadora",
    name: { ca: "Dessuadora d'entrenament", es: "Sudadera de entrenamiento" },
    description: {
      ca: "Per als dies de fred, amb nom i dorsal a l'esquena.",
      es: "Para los días de frío, con nombre y dorsal en la espalda.",
    },
    price: 38,
    sizes: KIDS_SIZES,
    personalised: true,
  },
  {
    id: "mitjons",
    name: { ca: "Mitjons", es: "Calcetines" },
    description: {
      ca: "Mitjons de joc, per número de calçat.",
      es: "Calcetines de juego, por número de calzado.",
    },
    price: 8,
    sizes: ["27-30", "31-34", "35-38", "39-42"],
    personalised: false,
  },
];
