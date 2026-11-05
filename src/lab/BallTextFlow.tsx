import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { layout, layoutNextLine, prepareWithSegments, type LayoutCursor, type PreparedTextWithSegments } from "@chenglou/pretext";
import type { Language } from "@/lib/language";

const TEXT: Record<Language, string> = {
  ca: "Som una família unida per l'amor al futsal. Des de Reus, treballem cada dia per formar jugadors i persones amb valors. Quatre amics que van compartir els anys d'escola a l'Escola Montsant, no només com a alumnes sinó també com a jugadors de futbol sala. Avui, aquest vincle es transforma en un projecte compartit: un club on cada nen i cada nena trobi el seu lloc, aprengui jugant i creixi amb valors. Som club, som futsal, som família i amics.",
  es: "Somos una familia unida por el amor al futsal. Desde Reus, trabajamos cada día para formar jugadores y personas con valores. Cuatro amigos que compartieron los años de escuela en la Escola Montsant, no solo como alumnos sino también como jugadores de fútbol sala. Hoy, ese vínculo se transforma en un proyecto compartido: un club donde cada niño y cada niña encuentre su sitio, aprenda jugando y crezca con valores. Somos club, somos futsal, somos familia y amigos.",
};
const LABEL = {
  ca: "Pilota: arrossega-la o usa les fletxes del teclat per veure com el text s'hi adapta",
  es: "Balón: arrástralo o usa las flechas del teclado para ver cómo se adapta el texto",
};

// Must match the CSS of the rendered lines (text-lg, normal weight, Montserrat).
const FONT = "400 18px Montserrat";
const LINE_HEIGHT = 28;
const MIN_SLOT = 56;
const RADIUS = 40;
const PADDING = 10;

interface Segment {
  text: string;
  x: number;
  y: number;
}

// Lays the text out line by line. Where the ball crosses a line, the text uses the free space on both
// sides of it, in reading order: something a CSS float cannot do.
function flow(prepared: PreparedTextWithSegments, width: number, ball: { x: number; y: number }): Segment[] {
  const segments: Segment[] = [];
  let cursor: LayoutCursor | undefined;
  const reach = RADIUS + PADDING;
  for (let y = 0; y < 2000; y += LINE_HEIGHT) {
    const dy = Math.abs(y + LINE_HEIGHT / 2 - ball.y);
    let slots: Array<[number, number]> = [[0, width]];
    if (dy < reach) {
      const half = Math.sqrt(reach * reach - dy * dy);
      slots = [
        [0, ball.x - half],
        [ball.x + half, width],
      ];
    }
    for (const [from, to] of slots) {
      if (to - from < MIN_SLOT) continue;
      const line = layoutNextLine(prepared, to - from, cursor);
      if (!line) return segments;
      segments.push({ text: line.text, x: from, y });
      cursor = line.end;
    }
  }
  return segments;
}

export default function BallTextFlow({ language }: { language: Language }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);
  const [ball, setBall] = useState({ x: 0, y: 120 });
  const [dragging, setDragging] = useState(false);

  // Measure after the web font is loaded, otherwise the widths come from the fallback font.
  useEffect(() => {
    let cancelled = false;
    document.fonts.load(FONT, TEXT[language]).then(() => {
      if (!cancelled) setPrepared(prepareWithSegments(TEXT[language], FONT));
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.floor(entry.contentRect.width);
      setWidth(next);
      setBall((current) => (current.x === 0 ? { x: Math.max(RADIUS, next - RADIUS - 24), y: 120 } : current));
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  // Height without the ball, from the cheap height-only call, plus room for the ball to move.
  const height = useMemo(() => {
    if (!prepared || width === 0) return 360;
    return Math.ceil(layout(prepared, width, LINE_HEIGHT).height) + 2 * (RADIUS + PADDING);
  }, [prepared, width]);

  const segments = useMemo(() => (prepared && width > 0 ? flow(prepared, width, ball) : []), [prepared, width, ball]);

  const clamp = (x: number, y: number) => ({
    x: Math.min(Math.max(x, RADIUS), Math.max(RADIUS, width - RADIUS)),
    y: Math.min(Math.max(y, RADIUS), Math.max(RADIUS, height - RADIUS)),
  });

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setBall(clamp(event.clientX - rect.left, event.clientY - rect.top));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = 24;
    const move: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = move[event.key];
    if (!delta) return;
    event.preventDefault();
    setBall((current) => clamp(current.x + delta[0], current.y + delta[1]));
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-xl select-none" style={{ height }}>
      {/* The real paragraph, for screen readers and copying; the flowing lines below repeat it. */}
      <p className="sr-only" lang={language}>
        {TEXT[language]}
      </p>
      <div aria-hidden="true">
        {segments.map((segment) => (
          <span
            key={`${segment.y}-${segment.x}`}
            className="absolute whitespace-pre text-lg font-normal text-muted-foreground"
            style={{ left: segment.x, top: segment.y, lineHeight: `${LINE_HEIGHT}px` }}
          >
            {segment.text}
          </span>
        ))}
      </div>
      <button
        type="button"
        aria-label={LABEL[language]}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={onKeyDown}
        className="absolute touch-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{ left: ball.x - RADIUS, top: ball.y - RADIUS, width: RADIUS * 2, height: RADIUS * 2, cursor: dragging ? "grabbing" : "grab" }}
      >
        <svg viewBox="0 0 80 80" aria-hidden="true" className="h-full w-full">
          <circle cx="40" cy="40" r="38" className="fill-accent stroke-foreground" strokeWidth="3" />
          <polygon points="40,24 55,35 49,53 31,53 25,35" className="fill-foreground" />
          <g className="stroke-foreground" strokeWidth="3" strokeLinecap="round">
            <path d="M40 24V6M55 35L72 29M49 53L60 68M31 53L20 68M25 35L8 29" />
          </g>
        </svg>
      </button>
    </div>
  );
}
