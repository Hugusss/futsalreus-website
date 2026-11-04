export type Language = "ca" | "es";

export interface PageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const STORAGE_KEY = "language";

// Storage access can throw (blocked site data, some private modes); the site must still render.
export function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "ca";
  } catch {
    return "ca";
  }
}

export function storeLanguage(language: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Storage unavailable: the choice lasts for this visit only.
  }
}
