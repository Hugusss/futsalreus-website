import { useEffect } from "react";

// Keeps a page out of search results. The SPA fallback answers 200 for every path,
// so the tag is added on the client while the page is mounted.
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.append(meta);
    return () => meta.remove();
  }, []);
}
