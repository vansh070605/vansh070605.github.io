import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { swarm } from "../swarm";
import { projects } from "../data/content";

/* One swarm of points that travels with the page.
   Hero: your portrait as a depth scan, centred. Each later section pulls the
   swarm to one side and reshapes it; hovering a project morphs it into that
   project's symbol. The mouse pushes points away, and a hero click bursts it. */

const SRC = "/best_pic.png";
const WORLD = 5; // the 500px portrait maps to 5 world units
const FACE = { cx: 257, cy: 128, w: 100, h: 122 }; // face region in source pixels

// Per-section placement and shape. side: -1 left, 0 centre, 1 right of the viewport.
const STAGES = {
  top:        { side: 0,  y: 0.1,  scale: 1,    shape: "portrait", opacity: 1,    tint: "#D4145A", mix: 0.14 },
  work:       { side: -1, y: 0.15,    scale: 0.75, shape: "project",  opacity: 0.7,  tint: null,      mix: 0.6 },
  about:      { side: 1,  y: 0,    scale: 0.8,  shape: "rings",    opacity: 0.65, tint: "#2F4BD8", mix: 0.5 },
  experience: { side: -1, y: 0,    scale: 1,    shape: "helix",    opacity: 0.85, tint: null,   mix: 0.45 },
  skills:     { side: 1,  y: 0,    scale: 0.75, shape: "torus",    opacity: 0.65, tint: "#7C3AED", mix: 0.5 },
  contact:    { side: -1,  y: -0.1, scale: 0.82, shape: "portrait", opacity: 0.95, tint: "#C2410C", mix: 0.3 },
  // Hidden in the footer so it does not clash with the sticker photo
  footer:     { side: -1, y: -0.1, scale: 0.82, shape: "portrait", opacity: 0,  tint: "#C2410C", mix: 0.3 },
};
const STAGE_IDS = Object.keys(STAGES);
const PROJECT_SHAPES = {
  ClariMed: "cross", WakeGuard: "eye", PlacementOS: "bars",
  Voxera: "wave", GlucoSense: "drop", MealSync: "plate",
};
const PROJECT_COLORS = Object.fromEntries(projects.map((p) => [p.name, p.color]));
const SPINNING = new Set(["rings", "helix", "torus", "network"]);

/* ── Shape builders: each returns Float32Array(n * 3) ───────────── */

// Draw a white symbol on a canvas, then scatter n points over its filled pixels
function fromDrawing(draw, n, size = SHAPE, depth = 0.28) {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = ctx.strokeStyle = "#fff";
  draw(ctx, S);
  const { data } = ctx.getImageData(0, 0, S, S);
  const lit = [];
  for (let i = 0; i < S * S; i++) if (data[i * 4 + 3] > 128) lit.push(i);

  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const p = lit[(Math.random() * lit.length) | 0];
    const x = ((p % S) + Math.random()) / S - 0.5;
    const y = (Math.floor(p / S) + Math.random()) / S - 0.5;
    out.set([x * size, -y * size, (Math.random() - 0.5) * depth], i * 3);
  }
  return out;
}

const SHAPE = 3.3; // world size of drawn shapes
const BAR_H = [0.18, 0.3, 0.44, 0.58, 0.74];
const BAR_X0 = 0.1, BAR_STEP = 0.165, BAR_BASE = 0.95;

/* Living shapes: given a point's resting position (x, y, z) return where it
   should be at time t. Writes into `o`. Only project symbols animate. */
const o = [0, 0, 0];
const ANIMATE = {
  // Bars grow and settle in a rolling wave, left to right
  bars(x, y, z, t) {
    const u = x / SHAPE + 0.5, v = 0.5 - y / SHAPE;
    const i = Math.floor((u - BAR_X0) / BAR_STEP);
    const inBar = i >= 0 && i < BAR_H.length && u - (BAR_X0 + i * BAR_STEP) <= 0.11 && v >= BAR_BASE - BAR_H[i] - 0.01;
    if (!inBar) { o[0] = x; o[1] = y; o[2] = z; return; }
    const base = (0.5 - BAR_BASE) * SHAPE;
    const g = 0.78 + 0.22 * Math.sin(t * 2.2 - i * 0.8);
    o[0] = x; o[1] = base + (y - base) * g; o[2] = z;
  },
  // Equaliser: each bar bounces at its own rhythm
  wave(x, y, z, t) {
    const i = Math.round((x / SHAPE + 0.5 - 0.085) / 0.082);
    const g = 0.3 + 0.7 * Math.abs(Math.sin(t * 3.1 + i * 1.9)) * (0.65 + 0.35 * Math.sin(t * 1.3 + i));
    o[0] = x; o[1] = y * g; o[2] = z;
  },
  // Blinks every few seconds; the pupil follows the cursor
  eye(x, y, z, t, px, py) {
    const ph = t % 3.6;
    const b = ph < 0.28 ? 1 - Math.sin((ph / 0.28) * Math.PI) * 0.93 : 1;
    const pupil = x * x + y * y < 0.36 ? 1 : 0;
    o[0] = x + pupil * px * 0.28; o[1] = (y - pupil * py * 0.18) * b; o[2] = z;
  },
  // Double heartbeat pulse
  cross(x, y, z, t) {
    const ph = t % 1.3;
    const beat = Math.exp(-ph * 10) + (ph > 0.24 ? 0.6 * Math.exp(-(ph - 0.24) * 10) : 0);
    const k = 1 + 0.1 * beat;
    o[0] = x * k; o[1] = y * k; o[2] = z + beat * 0.15;
  },
  // Ripples run out from the centre while it bobs
  drop(x, y, z, t) {
    const r = Math.hypot(x, y);
    const k = 1 + 0.045 * Math.sin(r * 7 - t * 4);
    o[0] = x * k; o[1] = y * k + Math.sin(t * 1.6) * 0.06; o[2] = z;
  },
  // The plate turns; the cutlery stays put
  plate(x, y, z, t) {
    const r = Math.hypot(x, y);
    if (r > 0.65 && r < 1.1) {
      const a = t * 0.6, c = Math.cos(a), s = Math.sin(a);
      o[0] = x * c - y * s; o[1] = x * s + y * c;
    } else { o[0] = x; o[1] = y; }
    o[2] = z;
  },
};

const DRAW = {
  cross: (ctx, S) => {
    const w = S * 0.24;
    ctx.fillRect(S / 2 - w / 2, S * 0.1, w, S * 0.8);
    ctx.fillRect(S * 0.1, S / 2 - w / 2, S * 0.8, w);
  },
  eye: (ctx, S) => {
    ctx.beginPath();
    ctx.moveTo(S * 0.04, S / 2);
    ctx.quadraticCurveTo(S / 2, S * 0.08, S * 0.96, S / 2);
    ctx.quadraticCurveTo(S / 2, S * 0.92, S * 0.04, S / 2);
    ctx.fill();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(S / 2, S / 2, S * 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath(); ctx.arc(S / 2, S / 2, S * 0.1, 0, Math.PI * 2); ctx.fill();
  },
  // Ascending bar chart with a trend arrow climbing over it
  bars: (ctx, S) => {
    BAR_H.forEach((h, i) => {
      ctx.fillRect(S * (BAR_X0 + i * BAR_STEP), S * (BAR_BASE - h), S * 0.11, S * h);
    });
    ctx.lineWidth = S * 0.028;
    ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(S * 0.06, S * 0.56); ctx.lineTo(S * 0.86, S * 0.08); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(S * 0.95, S * 0.03); ctx.lineTo(S * 0.78, S * 0.05); ctx.lineTo(S * 0.88, S * 0.2);
    ctx.closePath(); ctx.fill();
  },
  wave: (ctx, S) => {
    for (let i = 0; i < 11; i++) {
      const h = S * (0.12 + 0.72 * Math.abs(Math.sin(i * 1.25 + 0.4)));
      ctx.fillRect(S * 0.06 + i * S * 0.082, S / 2 - h / 2, S * 0.05, h);
    }
  },
  drop: (ctx, S) => {
    ctx.beginPath();
    ctx.moveTo(S / 2, S * 0.05);
    ctx.quadraticCurveTo(S * 0.82, S * 0.42, S * 0.8, S * 0.64);
    ctx.arc(S / 2, S * 0.64, S * 0.3, 0, Math.PI);
    ctx.quadraticCurveTo(S * 0.18, S * 0.42, S / 2, S * 0.05);
    ctx.fill();
  },
  plate: (ctx, S) => {
    ctx.beginPath(); ctx.arc(S / 2, S / 2, S * 0.32, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(S / 2, S / 2, S * 0.21, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(S * 0.06, S * 0.18, S * 0.05, S * 0.64);
    ctx.fillRect(S * 0.89, S * 0.18, S * 0.05, S * 0.64);
  },
  rings: (ctx, S) => {
    ctx.lineWidth = S * 0.022;
    [0.46, 0.33, 0.2].forEach((r) => { ctx.beginPath(); ctx.arc(S / 2, S / 2, S * r, 0, Math.PI * 2); ctx.stroke(); });
    ctx.beginPath(); ctx.arc(S / 2, S / 2, S * 0.05, 0, Math.PI * 2); ctx.fill();
  },
  // Small neural network: layers of nodes joined by every edge
  network: (ctx, S) => {
    const layers = [4, 6, 6, 3].map((count, li, arr) =>
      Array.from({ length: count }, (_, j) => [S * (0.1 + li * (0.8 / (arr.length - 1))), S * ((j + 1) / (count + 1))]));
    ctx.lineWidth = 1.2;
    for (let l = 0; l < layers.length - 1; l++)
      for (const a of layers[l]) for (const b of layers[l + 1]) {
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }
    for (const layer of layers) for (const [x, y] of layer) {
      ctx.beginPath(); ctx.arc(x, y, S * 0.03, 0, Math.PI * 2); ctx.fill();
    }
  },
};

function helix(n) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 7;
    const strand = i % 3 === 0 ? 0 : i % 3 === 1 ? Math.PI : null;
    const y = (i / n) * 4.4 - 2.2;
    if (strand === null) {
      // rungs between the two strands
      const k = Math.random() * 2 - 1;
      a.set([Math.cos(t) * 0.95 * k, y, Math.sin(t) * 0.95 * k], i * 3);
    } else {
      a.set([Math.cos(t + strand) * 0.95, y, Math.sin(t + strand) * 0.95], i * 3);
    }
  }
  return a;
}

function torus(n, R = 1.45, r = 0.5) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
    a.set([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v), (R + r * Math.cos(v)) * Math.sin(u)], i * 3);
  }
  return a;
}

function scatter(n) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 4 + Math.random() * 5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    a.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.7, r * Math.cos(ph) * 0.5 - 1], i * 3);
  }
  return a;
}

// Portrait: sample opaque pixels of the cutout; brightness becomes dot size and depth
function samplePortrait(size, cap) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, size, size);
      const { data } = ctx.getImageData(0, 0, size, size);

      const pts = [];
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        if (data[i + 3] < 140) continue;
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        const nx = x / size - 0.5, ny = y / size - 0.5;
        const across = Math.min(1, Math.abs(nx + 0.027) / 0.27);
        pts.push([nx * WORLD, -ny * WORLD, 0.45 * (1 - across * across) + (lum - 0.5) * 0.3, lum]);
      }
      // Random subsample down to the point budget
      for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; }
      const n = Math.min(cap, pts.length);
      const target = new Float32Array(n * 3), lum = new Float32Array(n);
      for (let i = 0; i < n; i++) { target.set(pts[i].slice(0, 3), i * 3); lum[i] = pts[i][3]; }
      resolve({ n, target, lum });
    };
    img.onerror = reject;
    img.src = SRC;
  });
}

function buildShapes({ n, target }) {
  const shapes = { portrait: target, helix: helix(n), torus: torus(n), scatter: scatter(n) };
  for (const key of Object.keys(DRAW)) shapes[key] = fromDrawing(DRAW[key], n);
  return shapes;
}

/* ── Shaders ────────────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  attribute float aRand;
  attribute float aLum;
  uniform float uTime;
  uniform float uDrift;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  uniform float uRepel;
  uniform float uFadeBottom;
  uniform float uBandY;
  uniform float uBand;
  varying float vSignal;
  varying float vLum;
  varying float vFade;
  varying float vPick;
  varying float vBand;

  void main() {
    vec3 p = position;
    // Glowing band across the helix marking the current Experience entry
    float band = uBand * (1.0 - smoothstep(0.0, 0.42, abs(position.y - uBandY)));
    vBand = band;
    vPick = fract(aRand * 13.7);
    float amp = 0.018 * uDrift;
    p.x += sin(uTime * 0.5 + aRand * 40.0) * amp;
    p.y += cos(uTime * 0.4 + aRand * 31.0) * amp;

    // Push points away from the cursor
    vec2 d = p.xy - uMouse.xy;
    float r = length(d);
    float f = (1.0 - smoothstep(0.0, 0.85, r)) * uRepel;
    p.xy += (d / max(r, 0.0001)) * f * 0.45;
    p.z += f * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // On paper, darker source pixels become larger, denser ink dots
    float tone = 1.0 - aLum;
    gl_PointSize = uSize * (0.55 + tone * 0.7) * (1.0 + band * 0.9) * uPixelRatio / -mv.z;
    vSignal = step(0.993, aRand);
    vLum = tone;
    // Portrait dissolves toward the bottom so the name below stays clean
    vFade = mix(1.0, smoothstep(-2.1, -0.4, position.y), uFadeBottom);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uSignal;
  uniform vec3 uAccent;
  uniform float uMix;
  uniform float uOpacity;
  varying float vSignal;
  varying float vLum;
  varying float vFade;
  varying float vPick;
  varying float vBand;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // A share of the points (uMix) take the section's colour; a few stay signal pink
    vec3 c = mix(uInk, uAccent, step(1.0 - uMix, vPick));
    c = mix(c, uSignal, vSignal);
    c = mix(c, uAccent, vBand);
    float a = smoothstep(0.5, 0.15, d) * uOpacity * vFade * mix(0.45 + 0.55 * vLum, 1.0, max(vSignal, vBand));
    gl_FragColor = vec4(c, a);
    #include <colorspace_fragment>
  }
`;

/* ── Swarm ──────────────────────────────────────────────────────── */
function Swarm({ data, isMobile, finePointer, reducedMotion, faceBoxRef, workBoxRef }) {
  const group = useRef();
  const geo = useRef();
  const pts = useRef();
  const pointer = useRef({ x: 0, y: 0, moved: 0 });
  const sections = useRef({});
  const spinRef = useRef(0);
  const layout = useRef({ y: -1, tick: 0, id: "top", anchor: null });
  const lastKey = useRef(null);
  const keyAt = useRef(0);
  const keyFrames = useRef(0);
  // New point data (e.g. after switching phone/desktop) starts scattered: let it re-form
  useEffect(() => { keyFrames.current = 0; }, [data]);
  const { camera, size } = useThree();

  const shapes = useMemo(() => buildShapes(data), [data]);
  const { positions, rand, speed } = useMemo(() => {
    const positions = shapes.scatter.slice(); // start scattered; it assembles on load
    const rand = new Float32Array(data.n), speed = new Float32Array(data.n);
    for (let i = 0; i < data.n; i++) { rand[i] = Math.random(); speed[i] = 0.035 + Math.random() * 0.05; }
    return { positions, rand, speed };
  }, [shapes, data.n]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDrift: { value: reducedMotion ? 0 : 1 },
    uSize: { value: isMobile ? 26 : 22 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
    uMouse: { value: new THREE.Vector3(99, 99, 0) },
    uRepel: { value: 0 },
    uFadeBottom: { value: 1 },
    uInk: { value: new THREE.Color("#1C2321") },
    uSignal: { value: new THREE.Color("#D4145A") },
    uOpacity: { value: 1 },
    uAccent: { value: new THREE.Color("#D4145A") },
    uMix: { value: 0 },
    uBandY: { value: 2 },
    uBand: { value: 0 },
  }), [isMobile, reducedMotion]);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.moved = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const tmp = useMemo(() => ({ v: new THREE.Vector3(), a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Color() }), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !geo.current) return;
    const now = performance.now();
    const vh = window.innerHeight;

    // Layout reads are costly: redo them only after a scroll, or every 20 frames
    const L = layout.current;
    if (window.scrollY !== L.y || ++L.tick % 20 === 0) {
      L.y = window.scrollY;
      L.id = "top"; L.anchor = null;
      for (const key of STAGE_IDS) {
        // Re-query if a section was re-mounted (e.g. Work swaps layout on resize)
        let el = sections.current[key];
        if (!el || !el.isConnected) el = sections.current[key] = document.getElementById(key);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) {
          L.id = key;
          const anchor = !isMobile && el.querySelector("[data-cloud-anchor]");
          L.anchor = anchor ? anchor.getBoundingClientRect() : null;
          break;
        }
      }
    }
    const id = L.id;
    const stage = STAGES[id];

    let key = stage.shape === "project" ? PROJECT_SHAPES[swarm.project] || "network" : stage.shape;
    // Stay scattered behind the preloader, then assemble on the reveal
    if (!swarm.revealed || now - swarm.burstAt < 380) key = "scatter";
    const T = shapes[key];
    const anim = reducedMotion ? null : ANIMATE[key];
    const t = state.clock.elapsedTime, px = pointer.current.x, py = pointer.current.y;
    if (key !== lastKey.current) { lastKey.current = key; keyAt.current = now; keyFrames.current = 0; }
    keyFrames.current++;

    // Each point eases toward its target at its own speed: the swarm flows, not snaps.
    // Once a still shape has settled the loop stops; the shader keeps it drifting.
    // Counted in frames, not time, so slow devices still finish forming the shape.
    if (anim || keyFrames.current < 260) {
      for (let i = 0, n = data.n; i < n; i++) {
        const s = reducedMotion ? 0.25 : speed[i], j = i * 3;
        let tx = T[j], ty = T[j + 1], tz = T[j + 2];
        if (anim) { anim(tx, ty, tz, t, px, py); tx = o[0]; ty = o[1]; tz = o[2]; }
        positions[j]     += (tx - positions[j])     * s;
        positions[j + 1] += (ty - positions[j + 1]) * s;
        positions[j + 2] += (tz - positions[j + 2]) * s;
      }
      geo.current.attributes.position.needsUpdate = true;
    }

    const ease = reducedMotion ? 1 : 0.045;
    // Centre of the left/right third of the visible width, whatever the screen shape
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    let tx = isMobile ? 0 : stage.side * halfW * 0.55;
    let ty = isMobile ? (id === "top" ? 1.05 : 0) : stage.y;
    let ts = isMobile ? (id === "top" ? 0.52 : 0.7) : stage.scale;

    // Centre on the section's empty area ([data-cloud-anchor]) and shrink to fit it
    if (L.anchor) {
      const a = L.anchor;
      const sx = a.left + a.width / 2;
      // Short anchors: their centre. Tall ones: follow the viewport middle, held inside the anchor
      const sy = a.height < vh * 0.7
        ? a.top + a.height / 2
        : Math.min(Math.max(vh / 2, a.top + vh * 0.35), a.bottom - vh * 0.35);
      tx = (sx / size.width * 2 - 1) * halfW;
      ty = -(sy / size.height * 2 - 1) * halfH;
      const fitW = (a.width / size.width) * 2 * halfW * 0.9 / 3.4;
      const fitH = (Math.min(a.height, vh) / size.height) * 2 * halfH * 0.9 / 3.4;
      ts = Math.min(stage.scale, fitW, fitH);
    }
    g.position.x += (tx - g.position.x) * ease;
    g.position.y += (ty - g.position.y) * ease;
    g.scale.setScalar(g.scale.x + (ts - g.scale.x) * ease);

    // Spinning shapes turn continuously; others settle on the nearest full turn so they face forward
    // The Experience helix turns with your scroll instead of on its own
    if (key === "helix") spinRef.current += (swarm.xp * Math.PI * 3 - spinRef.current) * 0.08;
    else if (SPINNING.has(key) && !reducedMotion) spinRef.current += delta * 0.25;
    else spinRef.current += (Math.round(spinRef.current / (Math.PI * 2)) * Math.PI * 2 - spinRef.current) * 0.12;
    // Project symbols only tilt a little with the mouse so they always read face-on
    const tilt = ANIMATE[key] ? 0.16 : 0.35;
    g.rotation.y += (pointer.current.x * tilt + spinRef.current - g.rotation.y) * 0.06;
    g.rotation.x += (pointer.current.y * 0.12 + (key === "torus" ? 0.5 : 0) - g.rotation.x) * 0.05;

    // Phones: the cloud lives only in the hero; behind text on a small screen it hurts reading
    const targetOpacity = isMobile && id !== "top" ? 0 : stage.opacity;
    uniforms.uOpacity.value += (targetOpacity - uniforms.uOpacity.value) * 0.06;
    // Skip drawing entirely while invisible
    if (pts.current) pts.current.visible = uniforms.uOpacity.value > 0.01;
    uniforms.uFadeBottom.value += ((key === "portrait" ? 1 : 0) - uniforms.uFadeBottom.value) * 0.08;
    uniforms.uTime.value = state.clock.elapsedTime;
    const tint = stage.tint || (id === "experience" ? swarm.tint : PROJECT_COLORS[swarm.project]) || "#0E7C6B";
    uniforms.uAccent.value.lerp(tmp.c.set(tint), 0.06);
    uniforms.uMix.value += (stage.mix - uniforms.uMix.value) * 0.06;
    // Band walks down the helix (y +2.2 to -2.2) as Experience scrolls
    // Portraits get a scan line sweeping top to bottom; the helix band follows scroll
    const bandOn = key === "helix" ? 1 : key === "portrait" && !reducedMotion ? 0.6 : 0;
    uniforms.uBand.value += (bandOn - uniforms.uBand.value) * 0.08;
    if (key === "portrait") uniforms.uBandY.value = 2.7 - ((t * 0.32) % 1) * 5.8;
    else uniforms.uBandY.value += (2.0 - swarm.xp * 4.0 - uniforms.uBandY.value) * 0.12;

    // Cursor position on the z=0 plane, in the swarm's local space
    const active = finePointer && now - pointer.current.moved < 2500;
    uniforms.uRepel.value += ((active ? 1 : 0) - uniforms.uRepel.value) * 0.1;
    tmp.v.set(pointer.current.x, -pointer.current.y, 0.5).unproject(camera).sub(camera.position).normalize();
    tmp.v.multiplyScalar(-camera.position.z / tmp.v.z).add(camera.position);
    g.updateMatrixWorld();
    uniforms.uMouse.value.copy(g.worldToLocal(tmp.v));

    // Detection box locked onto the project symbol in Work
    const wbox = workBoxRef.current;
    if (wbox) {
      const a = g.localToWorld(tmp.a.set(-SHAPE / 2 - 0.12, SHAPE / 2 + 0.12, 0)).project(camera);
      const b = g.localToWorld(tmp.b.set(SHAPE / 2 + 0.12, -SHAPE / 2 - 0.12, 0)).project(camera);
      wbox.style.transform = `translate3d(${(a.x * 0.5 + 0.5) * size.width}px, ${(-a.y * 0.5 + 0.5) * size.height}px, 0)`;
      wbox.style.width = `${(b.x - a.x) * 0.5 * size.width}px`;
      wbox.style.height = `${(a.y - b.y) * 0.5 * size.height}px`;
      const show = !isMobile && id === "work" && !!ANIMATE[key] && now - keyAt.current > 900;
      if (show && wbox.dataset.name !== swarm.project) {
        wbox.dataset.name = swarm.project;
        const label = swarm.project.toLowerCase();
        wbox.firstChild.textContent = `${label} 0.${97 - (label.length % 5)}`;
      }
      wbox.style.opacity = show ? 1 : 0;
    }

    // Detection box around the face, only while the hero portrait is up
    const box = faceBoxRef.current;
    if (!box) return;
    const fx = (FACE.cx / 500 - 0.5) * WORLD, fy = -(FACE.cy / 500 - 0.5) * WORLD;
    const hw = (FACE.w / 500) * WORLD / 2, hh = (FACE.h / 500) * WORLD / 2;
    const a = g.localToWorld(tmp.a.set(fx - hw, fy + hh, 0.45)).project(camera);
    const b = g.localToWorld(tmp.b.set(fx + hw, fy - hh, 0.45)).project(camera);
    const left = (a.x * 0.5 + 0.5) * size.width, top = (-a.y * 0.5 + 0.5) * size.height;
    box.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    box.style.width = `${(b.x - a.x) * 0.5 * size.width}px`;
    box.style.height = `${(a.y - b.y) * 0.5 * size.height}px`;
    const settled = key === "portrait" && now - keyAt.current > 2200 && now - swarm.burstAt > 1600;
    box.style.opacity = id === "top" && window.scrollY < vh * 0.15 && settled ? 1 : 0;
  });

  return (
    <group ref={group}>
      <points ref={pts} frustumCulled={false}>
        <bufferGeometry ref={geo}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} usage={THREE.DynamicDrawUsage} />
          <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
          <bufferAttribute attach="attributes-aLum" args={[data.lum, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function PointCloud() {
  // Live, so a window resized (or devtools switched) to phone width gets the phone layout
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 720px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const on = () => setIsMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const finePointer = useMemo(() => window.matchMedia("(pointer: fine)").matches, []);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const [data, setData] = useState(null);
  const faceBoxRef = useRef(null);
  const workBoxRef = useRef(null);

  useEffect(() => {
    let alive = true;
    samplePortrait(isMobile ? 180 : 260, isMobile ? 8000 : 12000)
      .then((d) => { if (alive) { setData(d); swarm.loaded = true; } })
      .catch(() => { swarm.loaded = true; }); // let the preloader finish even without the cloud
    return () => { alive = false; };
  }, [isMobile]);

  return (
    <div className="scene" aria-hidden="true">
      {data && (
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
          <Swarm data={data} isMobile={isMobile} finePointer={finePointer} reducedMotion={reducedMotion} faceBoxRef={faceBoxRef} workBoxRef={workBoxRef} />
        </Canvas>
      )}
      <div
        ref={faceBoxRef}
        className="det"
        style={{ left: 0, top: 0, opacity: 0, transition: "opacity 0.4s", willChange: "transform" }}
      >
        <span className="det-label">person 0.99</span>
      </div>
      <div
        ref={workBoxRef}
        className="det"
        style={{ left: 0, top: 0, opacity: 0, transition: "opacity 0.4s", willChange: "transform" }}
      >
        <span className="det-label" />
      </div>
    </div>
  );
}
