import { lazy, Suspense } from "react";
import { isDemoHost } from "@/lib/environment";
import type { Language } from "@/lib/language";

// Experiments shown only on a developer machine and on branch previews, until the club decides to keep them.
// The chunk is never requested on the production domain.
const BallToy = lazy(() => import("@/lab/BallToy"));

export function PreviewExtras({ language }: { language: Language }) {
  if (!isDemoHost()) return null;
  return (
    <Suspense fallback={null}>
      <BallToy language={language} />
    </Suspense>
  );
}
