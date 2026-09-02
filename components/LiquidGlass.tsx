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

void main() {
  vec2 uv = vUv;

  // Cover-fit the image inside the canvas so it isn't stretched.
  float canvasAspect = uResolution.x / uResolution.y;
  float imageAspect = uImageSize.x / uImageSize.y;
  vec2 scale = canvasAspect > imageAspect
    ? vec2(imageAspect / canvasAspect, 1.0)
    : vec2(1.0, canvasAspect / imageAspect);
  vec2 cuv = (uv - 0.5) * scale + 0.5;

  // Liquid distortion: layered sine waves drifting over time.
  float t = uTime * 0.35;
  float wave1 = sin(cuv.y * 8.0 + t * 1.3) * 0.012;
  float wave2 = sin(cuv.x * 6.0 - t * 1.7) * 0.012;
  float wave3 = sin((cuv.x + cuv.y) * 10.0 + t * 2.1) * 0.008;
  vec2 distorted = cuv + vec2(wave1 + wave3, wave2 - wave3);

  // Slight chromatic separation for a glassy refraction feel.
  float rOff = 0.0025 * sin(t * 1.9 + cuv.y * 4.0);
  float bOff = 0.0025 * cos(t * 2.3 + cuv.x * 4.0);

  float r = texture(uTexture, distorted + vec2(rOff, 0.0)).r;
  float g = texture(uTexture, distorted).g;
  float b = texture(uTexture, distorted - vec2(bOff, 0.0)).b;
  vec3 color = vec3(r, g, b);

  // Subtle sheen sweeping across the surface, like light on glass.
  float sheen = smoothstep(0.0, 1.0, sin((cuv.x + cuv.y) * 3.0 - t * 1.1) * 0.5 + 0.5);
  color += sheen * 0.05;

  float inBounds = step(0.0, distorted.x) * step(distorted.x, 1.0) * step(0.0, distorted.y) * step(distorted.y, 1.0);
  outColor = vec4(color * inBounds, 1.0);
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
 * Renders `src` into a WebGL2 canvas with an animated liquid-glass
 * distortion (layered sine-wave UV warp + light chromatic separation).
 * Falls back to a plain <img> if WebGL2 or shader compilation fails, and
 * freezes on a single frame under prefers-reduced-motion.
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
