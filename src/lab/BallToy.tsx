import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/language";
import { createBall, identity, spin } from "./football";

const texts = {
  ca: {
    toggle: "Pilota: deixa-la anar sobre el text",
    ball: "Pilota. Arrossega-la o toca-la per xutar. Amb el teclat: fletxes per moure-la, Intro per xutar, Escape per guardar-la.",
    hint: "Arrossega la pilota o toca-la",
    touches: (n: number) => `Tocs: ${n}`,
  },
  es: {
    toggle: "Balón: suéltalo sobre el texto",
    ball: "Balón. Arrástralo o tócalo para chutar. Con el teclado: flechas para moverlo, Intro para chutar, Escape para guardarlo.",
    hint: "Arrastra el balón o tócalo",
    touches: (n: number) => `Toques: ${n}`,
  },
};

const GRAVITY = 2400; // px/s²
const RESTITUTION = 0.62;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A round button with a football on it. Pressing it lets the ball out onto the page: drag and throw it, tap it to
// kick it (the counter shows how long you keep it up), and the paragraphs of the page open up around it.
// With reduced motion there is no gravity or momentum: the ball only goes where it is dragged.
export default function BallToy({ language }: { language: Language }) {
  const t = texts[language];
  const [pressed, setPressed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touches, setTouches] = useState(0);
  const [reduced] = useState(reducedMotion);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const ballRef = useRef<HTMLButtonElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const pressedRef = useRef(false);
  const controls = useRef<{ giveBack: () => void; keep: () => void } | null>(null);
  pressedRef.current = pressed;

  useEffect(() => {
    const icon = createBall(44);
    const orientation = identity();
    spin(orientation, 0.7, 0.45, 0.25, 1);
    icon.draw(orientation);
    iconRef.current?.appendChild(icon.canvas);
    return () => icon.canvas.remove();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = ballRef.current!;
    const shadow = shadowRef.current!;
    const toggle = toggleRef.current!;
    const R = window.innerWidth < 640 ? 30 : 36;
    const ball = createBall(R * 2);
    el.style.width = el.style.height = `${R * 2}px`;
    el.appendChild(ball.canvas);

    const box = toggle.getBoundingClientRect();
    const home = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    const s = {
      x: reduced ? Math.max(R, home.x - 100) : home.x,
      y: home.y,
      vx: reduced ? 0 : -380,
      vy: reduced ? 0 : -820,
      spinZ: 0,
      grabbed: false,
      onFloor: false,
      restFor: 0,
      touches: 0,
      returning: null as null | { t0: number; fromX: number; fromY: number },
      running: false,
      last: 0,
      frame: 0,
      scale: 1,
    };
    const m = identity();
    spin(m, 1, 2, 0.5, 1.7);
    let drawn = false;
    let flow: { update: (c: { x: number; y: number; r: number }) => void; release: () => void } | undefined;
    let disposed = false;
    import("./textFlow").then(({ createTextFlow }) => {
      if (disposed) return;
      flow = createTextFlow(document);
      request();
    });

    const floor = () => window.innerHeight - R - 4;
    const clamp = () => {
      s.x = Math.min(Math.max(s.x, R), Math.max(R, window.innerWidth - R));
      s.y = Math.min(Math.max(s.y, R), Math.max(R, window.innerHeight - R));
    };

    function step(now: number) {
      s.running = false;
      const dt = Math.min((now - s.last) / 1000 || 0, 1 / 30);
      s.last = now;
      let alive = false;
      let w = [0, 0, 0];
      if (s.returning) {
        const p = Math.min((now - s.returning.t0) / 380, 1);
        const e = 1 - (1 - p) ** 3;
        s.x = s.returning.fromX + (home.x - s.returning.fromX) * e;
        s.y = s.returning.fromY + (home.y - s.returning.fromY) * e;
        s.scale = 1 - 0.55 * e;
        w = [0, 0, 6];
        alive = true;
        if (p >= 1) {
          setMounted(false);
          return;
        }
      } else if (!s.grabbed && !reduced) {
        s.vy += GRAVITY * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < R) [s.x, s.vx] = [R, Math.abs(s.vx) * RESTITUTION];
        if (s.x > window.innerWidth - R) [s.x, s.vx] = [window.innerWidth - R, -Math.abs(s.vx) * RESTITUTION];
        if (s.y < R) [s.y, s.vy] = [R, Math.abs(s.vy) * RESTITUTION];
        const f = floor();
        s.onFloor = false;
        if (s.y >= f) {
          s.y = f;
          if (s.vy > 160) s.vy = -s.vy * RESTITUTION;
          else {
            s.vy = 0;
            s.onFloor = true;
            s.vx *= Math.exp(-0.9 * dt);
          }
        }
        if (s.onFloor) s.spinZ = s.vx / R;
        else s.spinZ *= Math.exp(-0.5 * dt);
        const resting = s.onFloor && Math.abs(s.vx) < 6;
        if (resting) s.vx = 0;
        alive = !resting || s.vy !== 0;
        s.restFor = resting ? s.restFor + dt : 0;
        if (s.restFor > 1 && s.touches) {
          s.touches = 0;
          setTouches(0);
        }
      }
      if (!s.returning) {
        const tumble = s.onFloor ? 0 : 0.35;
        w = [(-tumble * s.vy) / R, (tumble * s.vx) / R, s.spinZ];
      }
      if (alive || s.grabbed || !drawn) {
        spin(m, w[0], w[1], w[2], dt);
        ball.draw(m);
        drawn = true;
      }
      el.style.transform = `translate(${s.x - R}px,${s.y - R}px) scale(${s.scale})`;
      const height = Math.max(0, floor() - s.y);
      shadow.style.width = `${R * 1.7 * (1 - Math.min(height, 300) / 900)}px`;
      shadow.style.height = `${R * 0.34}px`;
      shadow.style.transform = `translate(${s.x - (R * 1.7 * (1 - Math.min(height, 300) / 900)) / 2}px,${window.innerHeight - R * 0.5 - 6}px)`;
      shadow.style.opacity = s.returning ? "0" : `${Math.max(0, 0.5 - height / 700)}`;
      flow?.update({ x: s.x, y: s.y, r: R * s.scale });
      if (alive || s.grabbed) request();
    }
    function request() {
      if (s.running || disposed) return;
      s.running = true;
      s.last = performance.now();
      s.frame = requestAnimationFrame(step);
    }

    const kick = (offset: number) => {
      if (reduced) return;
      s.vx = -offset * 520 + (Math.random() - 0.5) * 80;
      s.vy = -(820 + (1 - Math.abs(offset)) * 180);
      s.spinZ = offset * 10;
      s.restFor = 0;
      s.touches += 1;
      setTouches(s.touches);
      request();
    };

    let grab: null | { id: number; dx: number; dy: number; sx: number; sy: number; moved: boolean; samples: Array<{ x: number; y: number; t: number }> } = null;
    const onDown = (e: PointerEvent) => {
      if (s.returning) return;
      el.setPointerCapture(e.pointerId);
      grab = { id: e.pointerId, dx: s.x - e.clientX, dy: s.y - e.clientY, sx: e.clientX, sy: e.clientY, moved: false, samples: [] };
      s.grabbed = true;
      s.vx = s.vy = 0;
      request();
    };
    const onMove = (e: PointerEvent) => {
      if (!grab || e.pointerId !== grab.id) return;
      if (Math.hypot(e.clientX - grab.sx, e.clientY - grab.sy) > 6) grab.moved = true;
      if (!grab.moved) return;
      s.x = e.clientX + grab.dx;
      s.y = e.clientY + grab.dy;
      clamp();
      grab.samples.push({ x: s.x, y: s.y, t: e.timeStamp });
      if (grab.samples.length > 8) grab.samples.shift();
      request();
    };
    const onUp = (e: PointerEvent) => {
      if (!grab || e.pointerId !== grab.id) return;
      const { moved, samples } = grab;
      grab = null;
      s.grabbed = false;
      if (!moved) kick((e.clientX - s.x) / R);
      else if (!reduced && samples.length > 1) {
        const first = samples[0];
        const last = samples[samples.length - 1];
        const span = Math.max((last.t - first.t) / 1000, 0.016);
        s.vx = Math.max(-2400, Math.min(2400, (last.x - first.x) / span));
        s.vy = Math.max(-2400, Math.min(2400, (last.y - first.y) / span));
      }
      request();
    };
    const onKey = (e: KeyboardEvent) => {
      const move: Record<string, [number, number]> = { ArrowLeft: [-28, 0], ArrowRight: [28, 0], ArrowUp: [0, -28], ArrowDown: [0, 28] };
      if (move[e.key]) {
        e.preventDefault();
        s.x += move[e.key][0];
        s.y += move[e.key][1];
        clamp();
        s.vx = s.vy = 0;
        request();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        kick(0);
      } else if (e.key === "Escape") setPressed(false);
    };
    const onViewport = () => {
      clamp();
      request();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("keydown", onKey);
    window.addEventListener("resize", onViewport);
    window.addEventListener("scroll", onViewport, { passive: true });
    controls.current = {
      giveBack: () => {
        const b = toggle.getBoundingClientRect();
        home.x = b.left + b.width / 2;
        home.y = b.top + b.height / 2;
        s.returning = { t0: performance.now(), fromX: s.x, fromY: s.y };
        grab = null;
        s.grabbed = false;
        request();
      },
      keep: () => {
        s.returning = null;
        s.scale = 1;
        request();
      },
    };
    request();

    return () => {
      disposed = true;
      controls.current = null;
      cancelAnimationFrame(s.frame);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onViewport);
      window.removeEventListener("scroll", onViewport);
      flow?.release();
      ball.canvas.remove();
      setTouches(0);
    };
  }, [mounted, reduced]);

  const toggle = () => {
    if (pressed) {
      setPressed(false);
      controls.current?.giveBack();
    } else {
      setPressed(true);
      if (mounted) controls.current?.keep();
      else setMounted(true);
    }
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-label={t.toggle}
        aria-pressed={pressed}
        onClick={toggle}
        className="fixed bottom-4 right-4 z-[55] grid h-14 w-14 place-items-center rounded-full bg-card shadow-card ring-1 ring-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring print:hidden"
      >
        <span ref={iconRef} aria-hidden="true" className={pressed ? "opacity-30 transition-opacity" : "transition-opacity"} />
      </button>
      {pressed && !reduced && (
        <output aria-live="off" className="fixed bottom-6 right-20 z-[55] rounded-full bg-card px-3 py-1 text-sm font-semibold text-foreground shadow-card ring-1 ring-border print:hidden">
          {touches ? t.touches(touches) : t.hint}
        </output>
      )}
      {mounted && (
        <>
          <div ref={shadowRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[54] rounded-full bg-black blur-[3px] print:hidden" style={{ opacity: 0 }} />
          <button
            ref={ballRef}
            type="button"
            aria-label={t.ball}
            className="fixed left-0 top-0 z-[56] cursor-grab touch-none select-none rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring active:cursor-grabbing print:hidden"
          />
        </>
      )}
    </>
  );
}
