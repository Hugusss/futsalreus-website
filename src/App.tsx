import { useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Metodologia from "./pages/Metodologia";
import Competicions from "./pages/Competicions";
import Activitats from "./pages/Activitats";
import Inscripcio from "./pages/Inscripcio";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

export type Language = "ca" | "es";

const App = () => {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("language") === "es" ? "es" : "ca"),
  );

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <Sonner />
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
    </>
  );
};

export default App;
