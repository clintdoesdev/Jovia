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

const FRAGMENT_SRC = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uImageSize;

// Signed distance to a rounded box centered at the origin.
float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 res = uResolution;
  vec2 fragCoord = vUv * res;

  // Cover-fit the image inside the canvas so it isn't stretched.
  float canvasAspect = res.x / res.y;
  float imageAspect = uImageSize.x / uImageSize.y;
  vec2 scale = canvasAspect > imageAspect
    ? vec2(imageAspect / canvasAspect, 1.0)
    : vec2(1.0, canvasAspect / imageAspect);
  vec2 cuv = (vUv - 0.5) * scale + 0.5;
  vec3 bg = texture(uTexture, cuv).rgb;

  // A glass panel sized to the image itself gently hovers in place,
  // refracting the sharp photo beneath it — strongest at its own rim.
  float minDim = min(res.x, res.y);
  vec2 glassHalf = res * 0.5 * 0.94;
  float cornerR = minDim * 0.12;

  float t = uTime * 0.9;
  vec2 center = res * 0.5 + vec2(0.0, sin(t) * minDim * 0.018);

  vec2 p = fragCoord - center;
  float d = sdRoundBox(p, glassHalf, cornerR);

  float aa = 2.5;
  float inGlass = 1.0 - smoothstep(-aa, aa, d);

  // Refraction: bends more sharply near the rim, like a real lens.
  vec2 pn = p / glassHalf;
  float rNorm = clamp(length(pn), 0.0, 1.4);
  float bulge = smoothstep(0.0, 1.0, rNorm);
  vec2 dir = length(p) > 0.0001 ? normalize(p) : vec2(0.0);
  float maxDispPx = minDim * 0.055;
  vec2 dispUv = (dir * bulge * maxDispPx) / res * scale;

  float chroma = 0.006 * bulge;
  vec3 refracted = vec3(
    texture(uTexture, cuv - dispUv + vec2(chroma, 0.0)).r,
    texture(uTexture, cuv - dispUv).g,
    texture(uTexture, cuv - dispUv - vec2(chroma, 0.0)).b
  );

  // Light blur inside the glass for a frosted feel.
  vec2 texel = (1.0 / res) * scale * 2.0;
  vec3 blurred = refracted
    + texture(uTexture, cuv - dispUv + texel * vec2(1.0, 0.0)).rgb
    + texture(uTexture, cuv - dispUv - texel * vec2(1.0, 0.0)).rgb
    + texture(uTexture, cuv - dispUv + texel * vec2(0.0, 1.0)).rgb
    + texture(uTexture, cuv - dispUv - texel * vec2(0.0, 1.0)).rgb;
  blurred *= 0.2;

  vec3 glassColor = mix(blurred, vec3(1.0), 0.1) * 1.04;

  // Specular highlight biased toward the top-left, like light on glass.
  vec2 lightDir = normalize(vec2(-0.6, -0.8));
  float spec = pow(max(0.0, dot(pn, -lightDir)), 3.0) * (1.0 - rNorm * 0.5);
  glassColor += spec * 0.35;

  // Bright rim at the glass boundary.
  float rim = 1.0 - smoothstep(0.0, aa * 3.0, abs(d));
  glassColor += rim * 0.5;

  // Soft drop shadow cast just outside the glass edge.
  float shadow = smoothstep(24.0, 0.0, d) * step(0.0, d);
  vec3 shadowed = bg * (1.0 - shadow * 0.35);

  outColor = vec4(mix(shadowed, glassColor, inGlass), 1.0);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Renders `src` sharp into a WebGL2 canvas, with a "liquid glass" panel
 * sized to the image itself sitting on top — refracting, blurring, and
 * lighting the sharp photo beneath it (strongest near its own rim),
 * gently hovering rather than sliding around (Apple-style Liquid Glass,
 * not a full-image warp). Falls back to a plain <img> if WebGL2 or
 * shader compilation fails, and freezes the hover under
 * prefers-reduced-motion.
 */
export function LiquidGlass({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
    if (!gl) {
      setSupported(false);
      return;
    }
    // WebGL's texture origin is bottom-left; image sources are top-left,
    // so without this every texture renders vertically flipped.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

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
    const imageSizeLoc = gl.getUniformLocation(program, "uImageSize");
    const textureLoc = gl.getUniformLocation(program, "uTexture");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 8, 16, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imageWidth = 1;
    let imageHeight = 1;
    let destroyed = false;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (destroyed) return;
      imageWidth = img.naturalWidth;
      imageHeight = img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    };

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
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(textureLoc, 0);

    let rafId = 0;
    const start = performance.now();

    function frame(now: number) {
      if (destroyed) return;
      const t = reduce ? 0 : (now - start) / 1000;
      gl!.uniform1f(timeLoc, t);
      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl!.uniform2f(imageSizeLoc, imageWidth, imageHeight);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      if (!reduce) rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [src, reduce]);

  if (!supported) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }

  return <canvas ref={canvasRef} role="img" aria-label={alt} className={`h-full w-full ${className}`} />;
}
