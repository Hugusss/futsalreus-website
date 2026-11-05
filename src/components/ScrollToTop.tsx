import { useLayoutEffect } from "react";
import { scrollBehavior } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Layout effect: runs before paint, so a view transition snapshots the new page at the top.
  useLayoutEffect(() => {
    if (hash) {
      // Wait a frame so the target page has rendered before scrolling to the section.
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: scrollBehavior() });
      });
    } else {
      // Instant on purpose: a new page starts at the top, and the CSS smooth scrolling is for anchors.
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}
