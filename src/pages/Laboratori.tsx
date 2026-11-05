import { lazy, Suspense, type ReactNode } from "react";
import { FlaskConical } from "lucide-react";
import { SubPage } from "@/components/SubPage";
import { useNoIndex } from "@/hooks/use-no-index";
import { usePageTitle } from "@/hooks/use-page-title";
import type { PageProps } from "@/lib/language";

// Each experiment, with its library, is its own chunk: nothing here reaches the other pages.
const TacticsBoard = lazy(() => import("@/lab/TacticsBoard"));
const BallTextFlow = lazy(() => import("@/lab/BallTextFlow"));
const ShaderHero = lazy(() => import("@/lab/ShaderHero"));

const texts = {
  ca: {
    eyebrow: "EXPERIMENT",
    title: "Laboratori",
    subtitle: "Tres experiments amb tecnologies web modernes, per decidir amb una prova a la mà abans d'afegir res a la web.",
    back: "Tornar a l'inici",
    notice: "Pàgina de proves: no s'indexa ni surt al menú. No es publicarà tal qual.",
    loading: "Carregant l'experiment…",
    verdict: "Valoració",
    tactics: {
      title: "Pissarra tàctica",
      lib: "Anime.js",
      idea: "Idea per a Metodologia: ensenyar una jugada en lloc de descriure-la. Les línies de la pista es dibuixen amb el scroll i una línia de temps mou els jugadors i la pilota.",
      verdict: "Encaixa. Només es carregaria a Metodologia i, amb moviment reduït, la pista es veu sencera i la jugada no es reprodueix sola.",
    },
    flow: {
      title: "Text que envolta la pilota",
      lib: "Pretext",
      idea: "Pretext mesura el text sense tocar el DOM i deixa que cada línia tingui una amplada diferent. Aquí el text s'obre a banda i banda de la pilota mentre l'arrossegues.",
      verdict: "Vistós però sense necessitat real: avui el CSS cobreix el que fa la web. Tindria sentit amb una galeria o un llistat molt llarg.",
    },
    shader: {
      title: "Foto amb ona",
      lib: "WebGL, amb OGL",
      idea: "Una ona surt del punter sobre la foto de la portada. Només es dibuixa mentre l'ona és viva; amb moviment reduït o sense WebGL es veu la foto fixa.",
      verdict: "Decoratiu. Es pot fer, però costa bateria i complexitat i no aporta contingut: no el recomano per a la portada.",
    },
  },
  es: {
    eyebrow: "EXPERIMENTO",
    title: "Laboratorio",
    subtitle: "Tres experimentos con tecnologías web modernas, para decidir con una prueba en la mano antes de añadir nada a la web.",
    back: "Volver al inicio",
    notice: "Página de pruebas: no se indexa ni sale en el menú. No se publicará tal cual.",
    loading: "Cargando el experimento…",
    verdict: "Valoración",
    tactics: {
      title: "Pizarra táctica",
      lib: "Anime.js",
      idea: "Idea para Metodología: enseñar una jugada en lugar de describirla. Las líneas de la pista se dibujan con el scroll y una línea de tiempo mueve a los jugadores y el balón.",
      verdict: "Encaja. Solo se cargaría en Metodología y, con movimiento reducido, la pista se ve entera y la jugada no se reproduce sola.",
    },
    flow: {
      title: "Texto que rodea el balón",
      lib: "Pretext",
      idea: "Pretext mide el texto sin tocar el DOM y deja que cada línea tenga un ancho distinto. Aquí el texto se abre a ambos lados del balón mientras lo arrastras.",
      verdict: "Vistoso pero sin necesidad real: hoy el CSS cubre lo que hace la web. Tendría sentido con una galería o un listado muy largo.",
    },
    shader: {
      title: "Foto con onda",
      lib: "WebGL, con OGL",
      idea: "Una onda sale del puntero sobre la foto de la portada. Solo se dibuja mientras la onda está viva; con movimiento reducido o sin WebGL se ve la foto fija.",
      verdict: "Decorativo. Se puede hacer, pero cuesta batería y complejidad y no aporta contenido: no lo recomiendo para la portada.",
    },
  },
};

function Experiment({ title, lib, idea, verdictLabel, verdict, children }: { title: string; lib: string; idea: string; verdictLabel: string; verdict: string; children: ReactNode }) {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">{lib}</p>
      <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{idea}</p>
      <div className="mt-6 overflow-hidden">{children}</div>
      <p className="mt-4 max-w-3xl rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
        <span className="font-semibold text-foreground">{verdictLabel}: </span>
        {verdict}
      </p>
    </section>
  );
}

const Laboratori = ({ language, onLanguageChange }: PageProps) => {
  const t = texts[language];
  usePageTitle(t.title);
  useNoIndex();

  const loading = <p className="py-16 text-center text-muted-foreground">{t.loading}</p>;

  return (
    <SubPage language={language} onLanguageChange={onLanguageChange} icon={FlaskConical} eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} back={t.back}>
      <div className="mx-auto max-w-5xl space-y-16">
        <p role="note" className="rounded-2xl border border-accent bg-accent/15 p-4 text-sm font-medium text-foreground">
          {t.notice}
        </p>
        <Experiment title={t.tactics.title} lib={t.tactics.lib} idea={t.tactics.idea} verdictLabel={t.verdict} verdict={t.tactics.verdict}>
          <Suspense fallback={loading}>
            <TacticsBoard language={language} />
          </Suspense>
        </Experiment>
        <Experiment title={t.flow.title} lib={t.flow.lib} idea={t.flow.idea} verdictLabel={t.verdict} verdict={t.flow.verdict}>
          <Suspense fallback={loading}>
            <BallTextFlow language={language} />
          </Suspense>
        </Experiment>
        <Experiment title={t.shader.title} lib={t.shader.lib} idea={t.shader.idea} verdictLabel={t.verdict} verdict={t.shader.verdict}>
          <Suspense fallback={loading}>
            <ShaderHero language={language} />
          </Suspense>
        </Experiment>
      </div>
    </SubPage>
  );
};

export default Laboratori;
