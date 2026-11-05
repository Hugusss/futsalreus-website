// A football drawn pixel by pixel on a 2D canvas, so it has no dependency, no WebGL context to lose and
// works on every browser. The surface is a truncated icosahedron (12 black pentagons, 20 white hexagons):
// each pixel of the disc is a point on the unit sphere, turned into the ball's own frame, and the panel
// that a ray along that direction would hit is the face with the largest (normal . direction) / distance.
// The seams are where the two best faces tie.

const PHI = (1 + Math.sqrt(5)) / 2;
type Vec3 = [number, number, number];
export type Mat3 = [number, number, number, number, number, number, number, number, number];

// Distance from the centre to the plane of a pentagon / hexagon for the vertex set
// (even permutations of (0, ±1, ±3φ), (±1, ±(2+φ), ±2φ), (±φ, ±2, ±(2φ+1))), checked numerically.
const PENTAGON_PLANE = 4.65488;
const HEXAGON_PLANE = 4.53457;

function variants(base: Vec3): Vec3[] {
  const out: Vec3[] = [];
  const [a, b, c] = base;
  for (const [x, y, z] of [[a, b, c], [b, c, a], [c, a, b]] as Vec3[])
    for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) {
      const v: Vec3 = [x * sx, y * sy, z * sz];
      if (!out.some((o) => o[0] === v[0] && o[1] === v[1] && o[2] === v[2])) out.push(v);
    }
  return out;
}

// [nx, ny, nz, 1 / planeDistance] for the 12 pentagons, then the 20 hexagons.
const FACES = new Float32Array(
  [
    ...variants([0, 1, PHI]).map((v) => ({ v, d: PENTAGON_PLANE })),
    ...variants([1, 1, 1]).concat(variants([0, PHI, 1 / PHI])).map((v) => ({ v, d: HEXAGON_PLANE })),
  ].flatMap(({ v, d }) => {
    const l = Math.hypot(...v);
    return [v[0] / l, v[1] / l, v[2] / l, 1 / d];
  }),
);
const FACE_COUNT = FACES.length / 4;
const PENTAGONS = 12;

export const identity = (): Mat3 => [1, 0, 0, 0, 1, 0, 0, 0, 1];

// Turns the ball by the angular velocity (rad/s, in the viewer's frame) over dt seconds.
export function spin(m: Mat3, wx: number, wy: number, wz: number, dt: number): void {
  const angle = Math.hypot(wx, wy, wz) * dt;
  if (angle < 1e-6) return;
  const k = 1 / Math.hypot(wx, wy, wz);
  const x = wx * k, y = wy * k, z = wz * k;
  const c = Math.cos(angle), s = Math.sin(angle), t = 1 - c;
  const r = [t * x * x + c, t * x * y - s * z, t * x * z + s * y, t * x * y + s * z, t * y * y + c, t * y * z - s * x, t * x * z - s * y, t * y * z + s * x, t * z * z + c];
  const next = new Array(9) as Mat3;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) next[i * 3 + j] = r[i * 3] * m[j] + r[i * 3 + 1] * m[3 + j] + r[i * 3 + 2] * m[6 + j];
  // Keep the matrix a pure rotation: normalise the first two rows and rebuild the third.
  const l0 = Math.hypot(next[0], next[1], next[2]);
  for (let i = 0; i < 3; i++) next[i] /= l0;
  const d = next[0] * next[3] + next[1] * next[4] + next[2] * next[5];
  for (let i = 0; i < 3; i++) next[3 + i] -= d * next[i];
  const l1 = Math.hypot(next[3], next[4], next[5]);
  for (let i = 0; i < 3; i++) next[3 + i] /= l1;
  next[6] = next[1] * next[5] - next[2] * next[4];
  next[7] = next[2] * next[3] - next[0] * next[5];
  next[8] = next[0] * next[4] - next[1] * next[3];
  for (let i = 0; i < 9; i++) m[i] = next[i];
}

const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// Light from the upper left, in front of the ball.
const LIGHT = (() => {
  const l = Math.hypot(-0.5, -0.62, 0.6);
  return [-0.5 / l, -0.62 / l, 0.6 / l];
})();
const HALF = (() => {
  const x = LIGHT[0], y = LIGHT[1], z = LIGHT[2] + 1;
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
})();

export interface Ball {
  canvas: HTMLCanvasElement;
  draw: (orientation: Mat3) => void;
}

export function createBall(cssSize: number, pixelRatio = Math.min(window.devicePixelRatio || 1, 2)): Ball {
  const size = Math.round(cssSize * pixelRatio);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.style.width = canvas.style.height = `${cssSize}px`;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(size, size);
  const data = image.data;

  // Per pixel: the normal of the visible hemisphere and how much of the pixel the disc covers.
  const normals = new Float32Array(size * size * 3);
  const coverage = new Float32Array(size * size);
  const radius = size / 2;
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const x = (px + 0.5 - radius) / radius;
      const y = (py + 0.5 - radius) / radius;
      const r = Math.hypot(x, y);
      const i = py * size + px;
      coverage[i] = Math.min(Math.max((1 - r) * radius, 0), 1);
      if (coverage[i] === 0) continue;
      const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
      normals[i * 3] = x;
      normals[i * 3 + 1] = y;
      normals[i * 3 + 2] = z;
    }
  }

  const draw = (m: Mat3) => {
    for (let i = 0; i < size * size; i++) {
      const cover = coverage[i];
      if (cover === 0) continue;
      const nx = normals[i * 3], ny = normals[i * 3 + 1], nz = normals[i * 3 + 2];
      // Into the ball's own frame (transpose of the orientation).
      const bx = m[0] * nx + m[3] * ny + m[6] * nz;
      const by = m[1] * nx + m[4] * ny + m[7] * nz;
      const bz = m[2] * nx + m[5] * ny + m[8] * nz;
      let best = -1, second = -1, bestFace = 0;
      for (let f = 0; f < FACE_COUNT; f++) {
        const o = f * 4;
        const ratio = (FACES[o] * bx + FACES[o + 1] * by + FACES[o + 2] * bz) * FACES[o + 3];
        if (ratio > best) {
          second = best;
          best = ratio;
          bestFace = f;
        } else if (ratio > second) second = ratio;
      }
      const pentagon = bestFace < PENTAGONS;
      const seam = 1 - smoothstep(0, pentagon ? 0.006 : 0.009, best - second);
      // Panel colour: white leather with a faint warm tint, near-black pentagons, grey seams.
      let shade = pentagon ? 0.075 : 0.97;
      shade += (0.22 - shade) * seam * (pentagon ? 0.3 : 0.9);
      // Light and a slight puffiness of every panel towards its middle.
      shade *= 0.93 + 0.07 * smoothstep(0, 0.1, best - second);
      const diffuse = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
      const rim = 0.5 + 0.5 * Math.pow(nz, 0.45);
      const spec = Math.pow(Math.max(0, nx * HALF[0] + ny * HALF[1] + nz * HALF[2]), 34) * (pentagon ? 0.5 : 0.42);
      const light = (0.5 + 0.62 * diffuse) * rim;
      const o = i * 4;
      data[o] = Math.min(255, (shade * light * 0.99 + spec) * 255);
      data[o + 1] = Math.min(255, (shade * light * 0.97 + spec) * 255);
      data[o + 2] = Math.min(255, (shade * light * 0.93 + spec) * 255);
      data[o + 3] = cover * 255;
    }
    ctx.putImageData(image, 0, 0);
  };

  return { canvas, draw };
}
