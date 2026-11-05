import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import heroImage from "@/assets/hero-futsal-1280.webp";
import type { Language } from "@/lib/language";

const texts = {
  ca: {
    alt: "Joves jugant a futsal",
    hint: "Passa el ratolí o el dit per sobre de la imatge",
    fallback: "Aquest navegador mostra la imatge fixa: sense WebGL o amb moviment reduït.",
  },
  es: {
    alt: "Jóvenes jugando a fútbol sala",
    hint: "Pasa el ratón o el dedo por encima de la imagen",
    fallback: "Este navegador muestra la imagen fija: sin WebGL o con movimiento reducido.",
  },
};

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// A ripple that spreads from the pointer and fades, over the photo (object-fit: cover), tinted like the hero.
const fragment = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uPointer;
uniform float uTime;
uniform float uEnergy;
varying vec2 vUv;

vec2 coverUv(vec2 uv) {
  float scale = max(uRes.x / uImg.x, uRes.y / uImg.y);
  vec2 size = uImg * scale;
  return uv * (uRes / size) + (1.0 - uRes / size) * 0.5;
}

void main() {
  vec2 d = vUv - uPointer;
  d.x *= uRes.x / uRes.y;
  float dist = length(d);
  float wave = sin(dist * 38.0 - uTime * 6.0) * exp(-dist * 7.0) * uEnergy;
  vec2 uv = vUv + normalize(d + 1e-4) * wave * 0.03;
  vec3 color = texture2D(uTex, coverUv(uv)).rgb;
  color = mix(color, color * vec3(0.78, 0.36, 0.36), 0.6);
  color += wave * 0.12;
  gl_FragColor = vec4(color, 1.0);
}`;

type Mode = "loading" | "webgl" | "static";

export default function ShaderHero({ language }: { language: Language }) {
  const t = texts[language];
  const hostRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("loading");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("static");
      return;
    }

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false, antialias: false, powerPreference: "low-power" });
    } catch {
      setMode("static");
      return;
    }
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.className = "absolute inset-0 h-full w-full";
    canvas.setAttribute("aria-hidden", "true");

    const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTex: { value: texture },
        uRes: { value: [1, 1] },
        uImg: { value: [1, 1] },
        uPointer: { value: [0.5, 0.5] },
        uTime: { value: 0 },
        uEnergy: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let frame = 0;
    let energy = 0;
    const pointer = { x: 0.5, y: 0.5 };

    const draw = (time: number) => {
      frame = 0;
      energy *= 0.94;
      if (energy < 0.004) energy = 0;
      program.uniforms.uTime.value = time / 1000;
      program.uniforms.uEnergy.value = energy;
      program.uniforms.uPointer.value = [pointer.x, pointer.y];
      renderer.render({ scene: mesh });
      // Render only while the ripple is alive: at rest the page costs nothing.
      if (energy > 0) frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      program.uniforms.uRes.value = [width, height];
      wake();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = 1 - (event.clientY - rect.top) / rect.height;
      energy = 1;
      wake();
    };
    host.addEventListener("pointermove", onPointerMove);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setMode("static");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const image = new Image();
    image.onload = () => {
      texture.image = image;
      program.uniforms.uImg.value = [image.naturalWidth, image.naturalHeight];
      host.appendChild(canvas);
      resize();
      renderer.render({ scene: mesh });
      setMode("webgl");
    };
    image.onerror = () => setMode("static");
    image.src = heroImage;

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div>
      <div ref={hostRef} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/9]">
        {mode !== "webgl" && <img src={heroImage} alt={t.alt} className="absolute inset-0 h-full w-full object-cover" />}
        {mode === "webgl" && <span className="sr-only">{t.alt}</span>}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{mode === "static" ? t.fallback : t.hint}</p>
    </div>
  );
}
