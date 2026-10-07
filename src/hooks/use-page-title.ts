import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Club Futsal Montsant Reus";
const SITE_URL = "https://futsalmontsant.cat";

export function usePageTitle(title?: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    // SPA: index.html ships the homepage URL, so point canonical/og:url at the current route.
    const url = SITE_URL + pathname;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  }, [title, pathname]);
}
