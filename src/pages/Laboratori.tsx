import { lazy, Suspense, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";
import { SubPage } from "@/components/SubPage";
import { Button } from "@/components/ui/button";
import { useNoIndex } from "@/hooks/use-no-index";
import { usePageTitle } from "@/hooks/use-page-title";
import type { PageProps } from "@/lib/language";

// Each experiment, with its library, is its own chunk: nothing here reaches the other pages.
// The ball and the ripple live on the real pages (the ball button on every page, the ripple on the home page),
// so this page only explains them and links to them.
const TacticsBoard = lazy(() => import("@/lab/TacticsBoard"));

const texts = {
  ca: {
    eyebrow: "EXPERIMENT",
    title: "Laboratori",
    subtitle: "Tres experiments amb tecnologies web modernes, per decidir amb una prova a la mà abans d'afegir res a la web.",
    back: "Tornar a l'inici",
    notice: "Pàgina de proves: no s'indexa ni surt al menú, i els experiments només es veuen en aquesta versió de prova. No es publicarà tal qual.",
    loading: "Carregant l'experiment…",
    verdict: "Valoració",
    tactics: {
      title: "Pissarra tàctica interactiva",
      lib: "Anime.js",
      idea: "Idea per a Metodologia: ensenyar una jugada en lloc de descriure-la. Arrossega els jugadors i la pilota, guarda cada moment com un pas, afegeix-ne o treu-ne, i reprodueix la jugada. Les línies de la pista es dibuixen amb el scroll.",
      verdict: "Encaixa i ja és una eina de veritat: un entrenador pot muntar una jugada i ensenyar-la. Només es carregaria a Metodologia. Pendent de decidir: guardar o compartir jugades, que necessita un lloc on desar-les (avui la web no en té).",
    },
    ball: {
      title: "La pilota sobre el text",
      lib: "Pretext + canvas",
      idea: "Una pilota realista, dibuixada pixel a pixel, és un botó rodó a la cantonada de cada pàgina. Prem-lo i la pilota surt: arrossega-la i llança-la, toca-la per xutar (hi ha un comptador de tocs) i el text de la pàgina s'obre al voltant seu. Torna a prémer el botó per guardar-la.",
      verdict: "És un detall per jugar i per marcar personalitat, no informació: el client decideix si el vol i a quines pàgines. No es descarrega res fins que algú prem el botó. Amb moviment reduït no té gravetat ni inèrcia: només va on l'arrossegues.",
      metodologia: "Prova-ho a Metodologia",
      competicions: "Prova-ho a Competicions",
    },
    shader: {
      title: "Ona sobre la foto de la portada",
      lib: "WebGL, amb OGL",
      idea: "Una ona surt del punter sobre la foto de la portada i s'esvaeix. Només es dibuixa mentre l'ona és viva; amb moviment reduït, estalvi de dades o sense WebGL es veu la foto fixa de sempre.",
      verdict: "Decoratiu: gasta una mica de bateria mentre l'ona és viva i no aporta contingut. Es pot deixar o treure sense tocar res més. Es carrega després que la pàgina estigui llesta, així que no frena la portada.",
      home: "Veure-ho a la portada",
    },
  },
  es: {
    eyebrow: "EXPERIMENTO",
    title: "Laboratorio",
    subtitle: "Tres experimentos con tecnologías web modernas, para decidir con una prueba en la mano antes de añadir nada a la web.",
    back: "Volver al inicio",
    notice: "Página de pruebas: no se indexa ni sale en el menú, y los experimentos solo se ven en esta versión de prueba. No se publicará tal cual.",
    loading: "Cargando el experimento…",
    verdict: "Valoración",
    tactics: {
      title: "Pizarra táctica interactiva",
      lib: "Anime.js",
      idea: "Idea para Metodología: enseñar una jugada en lugar de describirla. Arrastra a los jugadores y el balón, guarda cada momento como un paso, añade o quita pasos y reproduce la jugada. Las líneas de la pista se dibujan con el scroll.",
      verdict: "Encaja y ya es una herramienta de verdad: un entrenador puede montar una jugada y enseñarla. Solo se cargaría en Metodología. Pendiente de decidir: guardar o compartir jugadas, que necesita un sitio donde guardarlas (hoy la web no lo tiene).",
    },
    ball: {
      title: "El balón sobre el texto",
      lib: "Pretext + canvas",
      idea: "Un balón realista, dibujado píxel a píxel, es un botón redondo en la esquina de cada página. Púlsalo y el balón sale: arrástralo y lánzalo, tócalo para chutar (hay un contador de toques) y el texto de la página se abre a su alrededor. Vuelve a pulsar el botón para guardarlo.",
      verdict: "Es un detalle para jugar y dar personalidad, no información: el cliente decide si lo quiere y en qué páginas. No se descarga nada hasta que alguien pulsa el botón. Con movimiento reducido no tiene gravedad ni inercia: solo va donde lo arrastras.",
      metodologia: "Pruébalo en Metodología",
      competicions: "Pruébalo en Competiciones",
    },
    shader: {
      title: "Onda sobre la foto de la portada",
      lib: "WebGL, con OGL",
      idea: "Una onda sale del puntero sobre la foto de la portada y se desvanece. Solo se dibuja mientras la onda está viva; con movimiento reducido, ahorro de datos o sin WebGL se ve la foto fija de siempre.",
      verdict: "Decorativo: gasta algo de batería mientras la onda está viva y no aporta contenido. Se puede dejar o quitar sin tocar nada más. Se carga cuando la página ya está lista, así que no frena la portada.",
      home: "Verlo en la portada",
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
        <Experiment title={t.ball.title} lib={t.ball.lib} idea={t.ball.idea} verdictLabel={t.verdict} verdict={t.ball.verdict}>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link to="/metodologia" viewTransition>
                {t.ball.metodologia}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/competicions" viewTransition>
                {t.ball.competicions}
              </Link>
            </Button>
          </div>
        </Experiment>
        <Experiment title={t.shader.title} lib={t.shader.lib} idea={t.shader.idea} verdictLabel={t.verdict} verdict={t.shader.verdict}>
          <Button variant="outline" asChild>
            <Link to="/" viewTransition>
              {t.shader.home}
            </Link>
          </Button>
        </Experiment>
      </div>
    </SubPage>
  );
};

export default Laboratori;
