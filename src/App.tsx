import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Metodologia from "./pages/Metodologia";
import Competicions from "./pages/Competicions";
import Activitats from "./pages/Activitats";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

export type Language = "ca" | "es";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<Language>("ca");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index language={language} onLanguageChange={setLanguage} />} />
            <Route path="/metodologia" element={<Metodologia language={language} onLanguageChange={setLanguage} />} />
            <Route path="/competicions" element={<Competicions language={language} onLanguageChange={setLanguage} />} />
            <Route path="/activitats" element={<Activitats language={language} onLanguageChange={setLanguage} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
