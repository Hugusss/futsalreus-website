import { useEffect, useRef, type RefObject } from "react";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// A ripple that spreads from the pointer and fades, over the hero photo (object-fit: cover). The hero's own
// gradient is drawn on top of this canvas, so the tint stays in CSS.
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
  float wave = sin(dist * 34.0 - uTime * 6.0) * exp(-dist * 6.0) * uEnergy;
  vec2 uv = vUv + normalize(d + 1e-4) * wave * 0.04;
  vec3 color = texture2D(uTex, coverUv(uv)).rgb;
  color += wave * 0.35;
  gl_FragColor = vec4(color, 1.0);
}`;

// Draws over the hero photo and listens on the whole hero section (its content sits above the canvas).
// At rest nothing is drawn, so the page costs nothing; without WebGL the photo underneath simply stays.
export default function HeroRipple({ imageRef }: { imageRef: RefObject<HTMLImageElement> }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const img = imageRef.current;
    const section = host?.closest("section");
    if (!host || !img || !section) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false, antialias: false, powerPreference: "low-power" });
    } catch {
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
    let ready = false;
    const pointer = { x: 0.5, y: 0.5 };

    const draw = (time: number) => {
      frame = 0;
      energy *= 0.94;
      if (energy < 0.004) energy = 0;
      program.uniforms.uTime.value = time / 1000;
      program.uniforms.uEnergy.value = energy;
      program.uniforms.uPointer.value = [pointer.x, pointer.y];
      renderer.render({ scene: mesh });
      if (energy > 0) frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (ready && !frame) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      program.uniforms.uRes.value = [width, height];
      if (ready) renderer.render({ scene: mesh });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const onPointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = 1 - (event.clientY - rect.top) / rect.height;
      energy = 1;
      wake();
    };
    section.addEventListener("pointermove", onPointer);
    section.addEventListener("pointerdown", onPointer);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      canvas.remove();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    // Use the photo that is already on screen as the texture: no second request.
    const start = () => {
      texture.image = img;
      program.uniforms.uImg.value = [img.naturalWidth, img.naturalHeight];
      host.appendChild(canvas);
      ready = true;
      resize();
      renderer.render({ scene: mesh });
    };
    if (img.complete && img.naturalWidth > 0) start();
    else img.addEventListener("load", start, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerdown", onPointer);
      img.removeEventListener("load", start);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [imageRef]);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
