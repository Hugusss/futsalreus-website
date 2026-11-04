import { useEffect, useState, type ReactElement } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useOutletContext } from "react-router-dom";
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

interface PageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// Layout route: owns the language and hands it to the current page through the outlet context.
function Root() {
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
    <>
      <ScrollToTop />
      <Outlet context={{ language, onLanguageChange: setLanguage } satisfies PageProps} />
    </>
  );
}

// Pages keep their explicit props; this adapter reads them from the outlet context.
function withLanguage(Page: (props: PageProps) => ReactElement) {
  return function LanguagePage() {
    return <Page {...useOutletContext<PageProps>()} />;
  };
}

// A data router is needed for view transitions (the viewTransition option on Link and navigate).
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", Component: withLanguage(Index) },
      { path: "/metodologia", Component: withLanguage(Metodologia) },
      { path: "/competicions", Component: withLanguage(Competicions) },
      { path: "/activitats", Component: withLanguage(Activitats) },
      { path: "/inscripcio", Component: withLanguage(Inscripcio) },
      { path: "*", Component: withLanguage(NotFound) },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
