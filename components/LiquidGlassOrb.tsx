"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const VERTEX_SRC = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// Self-contained metaball "liquid glass": several droplets wander and
// merge/separate (true water-blob physics via a smooth-min SDF field,
// not a fixed shape), refracting a procedural brand-color field rather
// than an external image — this is a decorative glass element in its
// own right, not an overlay on top of a photo.
const FRAGMENT_SRC = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform float uTime;
uniform vec2 uResolution;

#define DROPLETS 4

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

vec2 dropletCenter(int i, float t, vec2 res) {
  float fi = float(i);
  float speed = 0.12 + fi * 0.035;
  float px = sin(t * speed + fi * 2.1) * 0.5 + cos(t * speed * 0.6 + fi) * 0.22;
  float py = cos(t * speed * 0.8 + fi * 1.7) * 0.5 + sin(t * speed * 0.5 + fi * 3.0) * 0.2;
  // Biased toward the right/outer margin so droplets wander clear of the
  // hero image card that sits centered in front of this canvas.
  return res * vec2(0.7, 0.5) + vec2(px, py) * res * vec2(0.26, 0.34);
}

float dropletRadius(int i, float t) {
  float fi = float(i);
  float base = min(uResolution.x, uResolution.y) * (0.1 + 0.016 * mod(fi, 3.0));
  return base * (1.0 + 0.08 * sin(t * 0.9 + fi * 1.3));
}

// Combined signed-distance field for all droplets at once.
float sceneField(vec2 p, float t) {
  float k = min(uResolution.x, uResolution.y) * 0.045;
  float field = 1e5;
  for (int i = 0; i < DROPLETS; i++) {
    vec2 c = dropletCenter(i, t, uResolution);
    float r = dropletRadius(i, t);
    float d = length(p - c) - r;
    field = smin(field, d, k);
  }
  return field;
}

// A slow-moving brand-colored gradient field: what the glass refracts.
vec3 palette(vec2 uv, float t) {
  float n = sin(uv.x * 2.6 + t * 0.25) * 0.5 + sin(uv.y * 3.1 - t * 0.2) * 0.5;
  n = n * 0.5 + 0.5;
  vec3 violet = vec3(0.66, 0.33, 0.97);
  vec3 magenta = vec3(0.85, 0.29, 0.94);
  vec3 gold = vec3(0.93, 0.67, 0.05);
  vec3 col = mix(violet, magenta, smoothstep(0.15, 0.85, n));
  float goldMix = smoothstep(0.55, 1.0, sin(uv.x * 1.7 - uv.y * 1.3 + t * 0.15) * 0.5 + 0.5);
  col = mix(col, gold, goldMix * 0.55);
  return col;
}

void main() {
  vec2 res = uResolution;
  vec2 p = vUv * res;
  vec2 uv = vUv;
  float t = uTime;

  float field = sceneField(p, t);

  float aa = 2.0;
  float inGlass = 1.0 - smoothstep(-aa, aa, field);
  if (inGlass < 0.003) {
    // Soft outer glow so droplet edges don't cut off harshly.
    float glow = 1.0 - smoothstep(0.0, 46.0, field);
    vec3 glowColor = palette(uv, t);
    outColor = vec4(glowColor, glow * glow * 0.12);
    return;
  }

  // Surface normal from the SDF gradient — this is what makes merged
  // blobs shade like one continuous liquid surface instead of separate
  // circles.
  float eps = 1.5;
  float dx = sceneField(p + vec2(eps, 0.0), t) - sceneField(p - vec2(eps, 0.0), t);
  float dy = sceneField(p + vec2(0.0, eps), t) - sceneField(p - vec2(0.0, eps), t);
  vec2 normal = length(vec2(dx, dy)) > 0.0001 ? normalize(vec2(dx, dy)) : vec2(0.0);

  float edgeFactor = 1.0 - smoothstep(0.0, min(res.x, res.y) * 0.05, abs(field));
  float refractPx = min(res.x, res.y) * 0.045;
  vec2 refractUv = (normal * edgeFactor * refractPx) / res;

  vec3 base = palette(uv - refractUv, t);
  vec3 chromaR = palette(uv - refractUv + vec2(0.006, 0.0) * edgeFactor, t);
  vec3 chromaB = palette(uv - refractUv - vec2(0.006, 0.0) * edgeFactor, t);
  vec3 color = vec3(chromaR.r, base.g, chromaB.b);

  // Frost + gentle brightening.
  color = mix(color, vec3(1.0), 0.08) * 1.05;

  // Specular highlight, biased top-left, following the real surface normal.
  vec2 lightDir = normalize(vec2(-0.6, -0.8));
  float spec = pow(max(0.0, dot(normal, -lightDir)), 4.0);
  color += spec * 0.5;

  // Bright rim right at the boundary.
  float rim = 1.0 - smoothstep(0.0, aa * 4.0, abs(field));
  color += rim * 0.55;

  outColor = vec4(color, inGlass);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[LiquidGlassOrb] shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * A decorative ambient "liquid glass" layer: several droplets wander,
 * merge, and separate (a real smooth-min metaball field, so it behaves
 * like water rather than sliding fixed shapes), refracting a procedural
 * brand-color field with glass shading (fresnel rim, specular, frost).
 * The canvas is transparent outside the droplets, so it composites over
 * whatever sits behind it in normal DOM flow — no image is involved.
 * Freezes on a single frame under prefers-reduced-motion.
 */
export function LiquidGlassOrb({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      setSupported(false);
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) {
      setSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setSupported(false);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[LiquidGlassOrb] program link error:", gl.getProgramInfoLog(program));
      setSupported(false);
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLoc = gl.getAttribLocation(program, "aPosition");
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const resolutionLoc = gl.getUniformLocation(program, "uResolution");

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let destroyed = false;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl!.viewport(0, 0, w, h);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    let rafId = 0;
    const start = performance.now();

    function frame(now: number) {
      if (destroyed) return;
      const t = reduce ? 0 : (now - start) / 1000;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(timeLoc, t);
      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      if (!reduce) rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [reduce]);

  if (!supported) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
