import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import { animate } from "animejs/animation";
import { onScroll } from "animejs/events";
import { createDrawable } from "animejs/svg";
import { stagger } from "animejs/utils";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/language";

type PieceId = "gk" | "p1" | "p2" | "p3" | "p4" | "ball";
type Frame = Record<PieceId, { x: number; y: number }>;

const PIECES: PieceId[] = ["gk", "p1", "p2", "p3", "p4", "ball"];
const NUMBERS: Record<Exclude<PieceId, "ball">, string> = { gk: "1", p1: "2", p2: "3", p3: "4", p4: "5" };
const MAX_STEPS = 8;

const texts = {
  ca: {
    label:
      "Pissarra tàctica interactiva d'una pista de futsal amb cinc jugadors i la pilota. La jugada d'exemple és una sortida de pilota: el porter la treu al tancament, els laterals obren les bandes, la pilota arriba al pivot, ell la hi deixa i es dispara a porteria.",
    help: "Arrossega les peces o usa les fletxes del teclat (amb Maj, més lluny). Cada pas guarda unes posicions i Reproduir les uneix.",
    play: "Reproduir",
    pause: "Pausa",
    reset: "Jugada d'exemple",
    steps: "Passos de la jugada",
    step: (n: number) => `Pas ${n}`,
    add: "Afegeix un pas (copia l'actual)",
    remove: "Treu el pas actual",
    names: { gk: "Porter", p1: "Jugador 2", p2: "Jugador 3", p3: "Jugador 4", p4: "Jugador 5", ball: "Pilota" },
  },
  es: {
    label:
      "Pizarra táctica interactiva de una pista de futsal con cinco jugadores y el balón. La jugada de ejemplo es una salida de balón: el portero la saca al cierre, los laterales abren las bandas, el balón llega al pívot, él la deja y se dispara a puerta.",
    help: "Arrastra las piezas o usa las flechas del teclado (con Mayús, más lejos). Cada paso guarda unas posiciones y Reproducir las une.",
    play: "Reproducir",
    pause: "Pausa",
    reset: "Jugada de ejemplo",
    steps: "Pasos de la jugada",
    step: (n: number) => `Paso ${n}`,
    add: "Añade un paso (copia el actual)",
    remove: "Quita el paso actual",
    names: { gk: "Portero", p1: "Jugador 2", p2: "Jugador 3", p3: "Jugador 4", p4: "Jugador 5", ball: "Balón" },
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

// The example play, one frame per pass: goalkeeper to the closing player, wings open, ball to the pivot,
// laid off, and the shot.
const F0: Frame = { gk: { x: 28, y: 110 }, p1: { x: 105, y: 55 }, p2: { x: 105, y: 165 }, p3: { x: 118, y: 110 }, p4: { x: 250, y: 110 }, ball: { x: 40, y: 110 } };
const F1: Frame = { ...F0, ball: { x: 118, y: 110 }, p1: { x: 205, y: 50 }, p2: { x: 205, y: 170 } };
const F2: Frame = { ...F1, ball: { x: 250, y: 110 }, p3: { x: 215, y: 75 } };
const F3: Frame = { ...F2, ball: { x: 215, y: 75 } };
const F4: Frame = { ...F3, ball: { x: 412, y: 110 } };
const PRESET: Frame[] = [F0, F1, F2, F3, F4];

const smooth = (t: number) => t * t * (3 - 2 * t);
const between = (a: Frame, b: Frame, t: number): Frame =>
  Object.fromEntries(PIECES.map((id) => [id, { x: a[id].x + (b[id].x - a[id].x) * smooth(t), y: a[id].y + (b[id].y - a[id].y) * smooth(t) }])) as Frame;
const limit = (x: number, y: number) => ({ x: Math.min(Math.max(x, 4), 416), y: Math.min(Math.max(y, 4), 216) });

export default function TacticsBoard({ language }: { language: Language }) {
  const t = texts[language];
  const helpId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const framesRef = useRef<Frame[]>(PRESET);
  const touched = useRef(false);
  const [frames, setFrames] = useState<Frame[]>(PRESET);
  const [step, setStep] = useState(0);
  const [playhead, setPlayhead] = useState<Frame | null>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<PieceId | null>(null);
  framesRef.current = frames;

  const stop = () => {
    animRef.current?.revert();
    animRef.current = null;
    setPlaying(false);
    setPlayhead(null);
  };

  const play = () => {
    stop();
    const list = framesRef.current;
    if (list.length < 2) return;
    const progress = { value: 0 };
    setPlaying(true);
    setStep(0);
    animRef.current = animate(progress, {
      value: list.length - 1,
      duration: (list.length - 1) * 800,
      ease: "linear",
      onUpdate: () => {
        const i = Math.min(Math.floor(progress.value), list.length - 2);
        setPlayhead(between(list[i], list[i + 1], progress.value - i));
        setStep(Math.round(progress.value));
      },
      onComplete: () => {
        setPlaying(false);
        setPlayhead(null);
        setStep(list.length - 1);
      },
    });
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      // The example plays once, when the board is mostly in view, unless the reader has already started editing.
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          if (!touched.current) play();
        },
        { threshold: 0.8 },
      );
      observer.observe(svg);
    }
    return () => {
      observer?.disconnect();
      lines?.revert();
      animRef.current?.revert();
    };
    // play() only reads refs and stable setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const place = (id: PieceId, x: number, y: number) => {
    touched.current = true;
    const next = limit(x, y);
    setFrames((list) => list.map((frame, i) => (i === step ? { ...frame, [id]: next } : frame)));
  };

  // Pointer position in the drawing's own units (420 x 220).
  const toBoard = (event: { clientX: number; clientY: number }) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return { x: ((event.clientX - rect.left) * 420) / rect.width, y: ((event.clientY - rect.top) * 220) / rect.height };
  };

  const onPointerDown = (id: PieceId) => (event: PointerEvent<HTMLButtonElement>) => {
    if (playing || playhead) stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    setActive(id);
  };
  const onPointerMove = (id: PieceId) => (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const point = toBoard(event);
    place(id, point.x, point.y);
  };
  const onKeyDown = (id: PieceId) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const d = event.shiftKey ? 20 : 5;
    const move: Record<string, [number, number]> = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] };
    const delta = move[event.key];
    if (!delta) return;
    event.preventDefault();
    if (playing || playhead) stop();
    place(id, frames[step][id].x + delta[0], frames[step][id].y + delta[1]);
  };

  const toggle = () => {
    if (playing) {
      animRef.current?.pause();
      setPlaying(false);
    } else if (playhead && animRef.current) {
      animRef.current.resume();
      setPlaying(true);
    } else play();
  };

  const select = (index: number) => {
    stop();
    setStep(index);
  };
  const add = () => {
    stop();
    touched.current = true;
    setFrames((list) => [...list.slice(0, step + 1), list[step], ...list.slice(step + 1)]);
    setStep(step + 1);
  };
  const remove = () => {
    stop();
    touched.current = true;
    setFrames((list) => list.filter((_, i) => i !== step));
    setStep(Math.max(0, step - 1));
  };
  const reset = () => {
    stop();
    touched.current = true;
    setFrames(PRESET);
    setStep(0);
  };

  const shown = playhead ?? frames[step];
  const previous = !playhead && step > 0 ? frames[step - 1] : null;

  return (
    <figure>
      <div role="group" aria-label={t.label} className="relative">
        <svg ref={svgRef} viewBox="0 0 420 220" aria-hidden="true" className="block w-full rounded-2xl">
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
          {/* Where each piece came from in the previous step. */}
          {previous &&
            PIECES.map((id) => {
              const from = previous[id];
              const to = shown[id];
              if (Math.hypot(from.x - to.x, from.y - to.y) < 3) return null;
              return (
                <g key={id} className="pointer-events-none stroke-primary-foreground/60" fill="none">
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx={from.x} cy={from.y} r={id === "ball" ? 5 : 9} strokeWidth="1" strokeDasharray="2 3" />
                </g>
              );
            })}
          {PIECES.map((id) => {
            const { x, y } = shown[id];
            const isBall = id === "ball";
            return (
              <g key={id} transform={`translate(${x} ${y})`} className="pointer-events-none">
                {active === id && <circle r={isBall ? 11 : 15} className="fill-none stroke-accent" strokeWidth="2" strokeDasharray="3 3" />}
                {isBall ? (
                  <circle r="5" className="fill-primary-foreground stroke-foreground" strokeWidth="1.5" />
                ) : (
                  <>
                    <circle r="9" className="fill-accent stroke-primary-foreground" strokeWidth="2" />
                    <text textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="800" className="select-none fill-primary">
                      {NUMBERS[id]}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
        {/* The draggable parts are real buttons laid over the drawing: browsers do not honour touch-action on SVG
            elements, and these give a touch target of 44 px even where the drawn piece is small. */}
        {PIECES.map((id) => (
          <button
            key={id}
            type="button"
            aria-label={t.names[id]}
            aria-describedby={helpId}
            onPointerDown={onPointerDown(id)}
            onPointerMove={onPointerMove(id)}
            onKeyDown={onKeyDown(id)}
            onFocus={() => setActive(id)}
            onBlur={() => setActive((current) => (current === id ? null : current))}
            className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full outline-none active:cursor-grabbing"
            style={{ left: `${(shown[id].x / 420) * 100}%`, top: `${(shown[id].y / 220) * 100}%` }}
          />
        ))}
      </div>
      <figcaption className="mt-3 flex flex-col gap-3">
        <span id={helpId} className="text-sm text-muted-foreground">
          {t.help}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={toggle} aria-pressed={playing} disabled={frames.length < 2}>
            {playing ? <Pause /> : <Play />}
            {playing ? t.pause : t.play}
          </Button>
          <span role="group" aria-label={t.steps} className="flex flex-wrap items-center gap-1">
            {frames.map((_, i) => (
              <Button
                key={i}
                variant={i === step ? "default" : "ghost"}
                aria-pressed={i === step}
                aria-label={t.step(i + 1)}
                onClick={() => select(i)}
                className="h-10 w-10 px-0"
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" aria-label={t.add} title={t.add} onClick={add} disabled={frames.length >= MAX_STEPS} className="h-10 w-10 px-0">
              <Plus />
            </Button>
            <Button variant="outline" aria-label={t.remove} title={t.remove} onClick={remove} disabled={frames.length < 2} className="h-10 w-10 px-0">
              <Minus />
            </Button>
          </span>
          <Button variant="ghost" onClick={reset}>
            <RotateCcw />
            {t.reset}
          </Button>
        </span>
      </figcaption>
    </figure>
  );
}
