import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { animate } from "animejs/animation";
import { onScroll } from "animejs/events";
import { createDrawable } from "animejs/svg";
import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/language";

const texts = {
  ca: {
    label:
      "Pissarra tàctica d'una pista de futsal amb cinc jugadors del club. El porter treu de mans a un company, el equip avança per les bandes, la pilota arriba al pivot, ell la hi deixa i es dispara a porteria.",
    play: "Reproduir",
    pause: "Pausa",
    restart: "Tornar a començar",
    caption: "Sortida de pilota: porter, passada al tancament, bandes obertes, pivot i tir.",
  },
  es: {
    label:
      "Pizarra táctica de una pista de futsal con cinco jugadores del club. El portero saca de mano a un compañero, el equipo avanza por las bandas, el balón llega al pívot, él la deja y se dispara a puerta.",
    play: "Reproducir",
    pause: "Pausa",
    restart: "Volver a empezar",
    caption: "Salida de balón: portero, pase al cierre, bandas abiertas, pívot y tiro.",
  },
};

// 10 px per metre: the court is 40 x 20 m, the goals are 3 m wide, the penalty area has a 6 m radius.
const COURT_LINES = [
  "M10 10H410V210H10Z",
  "M210 10V210",
  "M180 110a30 30 0 1 0 60 0a30 30 0 1 0 -60 0",
  "M10 35A60 60 0 0 1 70 95V125A60 60 0 0 1 10 185",
  "M410 35A60 60 0 0 0 350 95V125A60 60 0 0 0 410 185",
];

const PLAYERS = [
  { id: "gk", x: 28, y: 110 },
  { id: "p1", x: 105, y: 55 },
  { id: "p2", x: 105, y: 165 },
  { id: "p3", x: 118, y: 110 },
  { id: "p4", x: 250, y: 110 },
];

export default function TacticsBoard({ language }: { language: Language }) {
  const t = texts[language];
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const el = (id: string) => svg.querySelector<SVGElement>(`#${id}`)!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = createTimeline({
      autoplay: false,
      defaults: { ease: "inOutQuad" },
      onComplete: () => setPlaying(false),
    })
      .add(el("ball"), { cx: 118, cy: 110, duration: 550 }, 0)
      .add(el("p1"), { cx: 205, cy: 50, duration: 900 }, 0)
      .add(el("p2"), { cx: 205, cy: 170, duration: 900 }, 0)
      .add(el("ball"), { cx: 250, cy: 110, duration: 500 }, 700)
      .add(el("p3"), { cx: 215, cy: 75, duration: 700 }, 700)
      .add(el("ball"), { cx: 215, cy: 75, duration: 450 }, 1300)
      .add(el("ball"), { cx: 412, cy: 110, duration: 550, ease: "outQuad" }, 1950);
    timelineRef.current = play;

    let lines: ReturnType<typeof animate> | undefined;
    let observer: IntersectionObserver | undefined;
    if (!reduceMotion) {
      // The court lines are drawn as the board scrolls into view: progress follows the scroll position.
      // Thresholds read "<container> <target>": from the board's top meeting the viewport's bottom
      // until the board's centre is 70% of the way down the viewport, so the court is complete well
      // before the reader centres it.
      lines = animate(createDrawable(svg.querySelectorAll(".court-line")), {
        draw: ["0 0", "0 1"],
        ease: "linear",
        delay: stagger(60),
        autoplay: onScroll({ target: svg, enter: "bottom top", leave: "70% center", sync: true }),
      });
      // The play starts once, when the board is mostly in view.
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          play.play();
          setPlaying(true);
          observer?.disconnect();
        },
        { threshold: 0.8 },
      );
      observer.observe(svg);
    }

    return () => {
      observer?.disconnect();
      lines?.revert();
      play.revert();
      setPlaying(false);
    };
  }, []);

  const toggle = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (playing) {
      timeline.pause();
      setPlaying(false);
    } else {
      if (timeline.completed) timeline.restart();
      else timeline.play();
      setPlaying(true);
    }
  };

  const restart = () => {
    timelineRef.current?.restart();
    setPlaying(true);
  };

  return (
    <figure>
      <svg ref={svgRef} viewBox="0 0 420 220" role="img" aria-label={t.label} className="w-full rounded-2xl">
        <rect width="420" height="220" className="fill-primary" />
        <rect x="4" y="95" width="6" height="30" className="fill-primary-foreground/70" />
        <rect x="410" y="95" width="6" height="30" className="fill-primary-foreground/70" />
        <g className="fill-none stroke-primary-foreground/80" strokeWidth="2">
          {COURT_LINES.map((d) => (
            <path key={d} d={d} className="court-line" />
          ))}
        </g>
        <g className="fill-primary-foreground/80">
          <circle cx="210" cy="110" r="2" />
          <circle cx="70" cy="110" r="2" />
          <circle cx="350" cy="110" r="2" />
          <circle cx="110" cy="110" r="2" />
          <circle cx="310" cy="110" r="2" />
        </g>
        {PLAYERS.map((p) => (
          <circle key={p.id} id={p.id} cx={p.x} cy={p.y} r="9" className="fill-accent stroke-primary-foreground" strokeWidth="2" />
        ))}
        <circle id="ball" cx="40" cy="110" r="5" className="fill-primary-foreground stroke-foreground" strokeWidth="1.5" />
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">{t.caption}</span>
        <span className="flex gap-2">
          <Button variant="outline" size="default" onClick={toggle} aria-pressed={playing}>
            {playing ? <Pause /> : <Play />}
            {playing ? t.pause : t.play}
          </Button>
          <Button variant="ghost" onClick={restart}>
            <RotateCcw />
            {t.restart}
          </Button>
        </span>
      </figcaption>
    </figure>
  );
}
