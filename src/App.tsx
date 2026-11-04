import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Metodologia from "./pages/Metodologia";
import Competicions from "./pages/Competicions";
import Activitats from "./pages/Activitats";
import Inscripcio from "./pages/Inscripcio";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

export type Language = "ca" | "es";

const STORAGE_KEY = "language";

// Storage access can throw (blocked site data, some private modes); the site must still render.
function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "ca";
  } catch {
    return "ca";
  }
}

const App = () => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage unavailable: the choice lasts for this visit only.
    }
    document.documentElement.lang = language;
  }, [language]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index language={language} onLanguageChange={setLanguage} />} />
        <Route path="/metodologia" element={<Metodologia language={language} onLanguageChange={setLanguage} />} />
        <Route path="/competicions" element={<Competicions language={language} onLanguageChange={setLanguage} />} />
        <Route path="/activitats" element={<Activitats language={language} onLanguageChange={setLanguage} />} />
        <Route path="/inscripcio" element={<Inscripcio language={language} onLanguageChange={setLanguage} />} />
        <Route path="*" element={<NotFound language={language} onLanguageChange={setLanguage} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
