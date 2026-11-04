import { useEffect, useState, type ReactElement } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useOutletContext } from "react-router-dom";
import Index from "./pages/Index";
import Metodologia from "./pages/Metodologia";
import Competicions from "./pages/Competicions";
import Activitats from "./pages/Activitats";
import Inscripcio from "./pages/Inscripcio";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";
import { readStoredLanguage, storeLanguage, type Language, type PageProps } from "./lib/language";

// Layout route: owns the language and hands it to the current page through the outlet context.
function Root() {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    storeLanguage(language);
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
