"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
  a: boolean;
  /** Desplazamiento inicial y demora (ms) para la entrada. */
  ox: number;
  oy: number;
  d: number;
  /** Pertenece a la primera o la última letra (la "i" y la "a" de "impronta"). */
  edge: boolean;
};

/**
 * Entrada del logo al abrir el sitio:
 * - expand: aparecen solo la primera y la última letra juntas ("ia" en "impronta"),
 *   en color de acento; después se separan a su lugar y las letras del medio
 *   aparecen desde el centro hacia afuera.
 * - gentle: cada partícula aparece cerca de su lugar y se acomoda con una ola suave.
 * - fade: el logo de puntos aparece en su lugar con un fundido.
 * - none: el logo aparece ya armado.
 * Se puede probar cada una con ?intro=expand|gentle|fade|none.
 */
export type Intro = "expand" | "gentle" | "fade" | "none";
const INTROS: Intro[] = ["expand", "gentle", "fade", "none"];
const GENTLE_MS = 1100;
const FADE_MS = 900;
// Tiempos de "expand" (ms): aparece "ia", pausa, se abre.
const EXPAND_IN = 700;
const EXPAND_SPLIT = 1400;
const EXPAND_MOVE = 1100;
const EXPAND_MID = 1000;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * Dibuja el wordmark como una nube de partículas que se "genera" al cargar y
 * se dispersa con el cursor. El <h1> real queda debajo, transparente desde el
 * primer pintado si hay JS (para SEO y lectores de pantalla); solo se ve sin
 * JS o si el canvas no está disponible.
 *
 * El canvas cubre el contenedor marcado con `data-particle-host` (el hero
 * entero), así las partículas pueden alejarse del logo sin recortarse.
 */
export function ParticleWordmark({ text, intro = "expand" }: { text: string; intro?: Intro }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const heading = wrap?.querySelector("h1");
    if (!wrap || !canvas || !heading) return;
    const host = wrap.closest<HTMLElement>("[data-particle-host]") ?? wrap;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      wrap.classList.add("is-fallback");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fromUrl = new URLSearchParams(window.location.search).get("intro") as Intro | null;
    const mode: Intro = reduced ? "none" : fromUrl && INTROS.includes(fromUrl) ? fromUrl : intro;
    let introStart = 0;
    let introEnd = 0;
    let introDone = mode === "none";
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--ink").trim() || "#121210";
    const accent = css.getPropertyValue("--accent").trim() || "#3b2bff";

    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let size = 2;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Renderiza el texto fuera de pantalla letra por letra, en la posición exacta en
      // que el navegador dibuja cada glifo del <h1> (incluye letter-spacing y kerning).
      const hs = getComputedStyle(heading);
      const off = document.createElement("canvas");
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      const o = off.getContext("2d")!;
      o.fillStyle = "#000";
      o.font = `${hs.fontStyle} ${hs.fontWeight} ${hs.fontSize} ${hs.fontFamily}`;
      o.textBaseline = "alphabetic";
      o.textAlign = "left";

      // Línea de base real: un elemento vacío alineado a la base del texto.
      const probe = document.createElement("span");
      probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
      heading.appendChild(probe);
      const baseline = probe.getBoundingClientRect().bottom - rect.top;
      heading.removeChild(probe);

      const node = heading.firstChild;
      const lefts: number[] = [];
      const rights: number[] = [];
      if (node?.nodeType === Node.TEXT_NODE) {
        const range = document.createRange();
        const chars = node.textContent ?? "";
        for (let i = 0; i < chars.length; i++) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const r = range.getBoundingClientRect();
          lefts.push(r.left - rect.left);
          rights.push(r.right - rect.left);
          o.fillText(chars[i], r.left - rect.left, baseline);
        }
      }
      const n = lefts.length;
      const charAt = (x: number) => {
        let i = 0;
        while (i < n - 1 && x >= lefts[i + 1]) i++;
        return i;
      };
      // "expand": la primera y la última letra arrancan juntas en el centro de la palabra.
      const cx = n ? (lefts[0] + rights[n - 1]) / 2 : w / 2;
      const half = n ? (rights[n - 1] - lefts[0]) / 2 : 1;
      const firstW = n ? rights[0] - lefts[0] : 0;
      const lastW = n ? rights[n - 1] - lefts[n - 1] : 0;
      const compactLeft = cx - (firstW + lastW) / 2;
      const shiftFirst = n ? compactLeft - lefts[0] : 0;
      const shiftLast = n ? compactLeft + firstW - lefts[n - 1] : 0;

      const fontPx = parseFloat(hs.fontSize);
      const step = Math.max(3, Math.round(fontPx / 46));
      size = Math.max(1.4, step * 0.62);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const next: Particle[] = [];
      let maxDelay = 0;
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            let ox = 0;
            let oy = 0;
            let d = 0;
            let edge = false;
            if (!introDone && mode === "expand" && n > 1) {
              const c = charAt(x);
              edge = c === 0 || c === n - 1;
              if (edge) {
                ox = c === 0 ? shiftFirst : shiftLast;
              } else {
                // Las letras del medio salen del centro hacia afuera.
                ox = (cx - x) * 0.9;
                const charCenter = (lefts[c] + rights[c]) / 2;
                d = (Math.abs(charCenter - cx) / half) * 380 + Math.random() * 120;
                maxDelay = Math.max(maxDelay, d);
              }
            } else if (!introDone && mode === "gentle") {
              const angle = Math.random() * Math.PI * 2;
              const dist = fontPx * (0.04 + Math.random() * 0.1);
              ox = Math.cos(angle) * dist;
              oy = Math.sin(angle) * dist;
              // Ola de izquierda a derecha, con algo de azar.
              d = (x / w) * 500 + Math.random() * 260;
              maxDelay = Math.max(maxDelay, d);
            }
            next.push({ x: x + ox, y: y + oy, hx: x, hy: y, vx: 0, vy: 0, a: Math.random() < 0.06, ox, oy, d, edge });
          }
        }
      }
      particles = next;
      if (!introDone && !introStart) {
        introStart = performance.now();
        introEnd =
          mode === "expand"
            ? EXPAND_SPLIT + Math.max(EXPAND_MOVE, 150 + maxDelay + EXPAND_MID)
            : mode === "gentle"
              ? maxDelay + GENTLE_MS
              : FADE_MS;
      }
    };

    const draw = (now = performance.now()) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const t = now - introStart;
      if (!introDone && t >= introEnd) introDone = true;
      const gentle = !introDone && mode === "gentle";
      const expand = !introDone && mode === "expand";
      ctx.globalAlpha = !introDone && mode === "fade" ? easeOut(Math.min(1, Math.max(0, t / FADE_MS))) : 1;
      const r = Math.max(70, w * 0.07);
      const r2 = r * r;
      for (const p of particles) {
        if (expand) {
          drawExpand(p, t);
          continue;
        }
        if (gentle) {
          // Entrada suave: se acerca a su lugar mientras aparece (sin física).
          const e = easeOut(Math.min(1, Math.max(0, (t - p.d) / GENTLE_MS)));
          p.x = p.hx + p.ox * (1 - e);
          p.y = p.hy + p.oy * (1 - e);
          ctx.globalAlpha = e;
        } else if (!reduced) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const f = (1 - d2 / r2) * 6;
            const d = Math.sqrt(d2) || 1;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          p.vx += (p.hx - p.x) * 0.045;
          p.vy += (p.hy - p.y) * 0.045;
          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }
        ctx.fillStyle = p.a ? accent : ink;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
    };

    // Un cuadro de la entrada "expand" para una partícula (sin física).
    const drawExpand = (p: Particle, t: number) => {
      let alpha: number;
      let accentMix = 0; // 1 = color de acento, 0 = color normal
      if (p.edge) {
        alpha = easeOut(clamp01(t / EXPAND_IN));
        const k = easeInOut(clamp01((t - EXPAND_SPLIT) / EXPAND_MOVE));
        p.x = p.hx + p.ox * (1 - k);
        accentMix = 1 - clamp01((t - EXPAND_SPLIT - 400) / 700);
      } else {
        const k = easeOut(clamp01((t - EXPAND_SPLIT - 150 - p.d) / EXPAND_MID));
        p.x = p.hx + p.ox * (1 - k);
        alpha = k;
      }
      p.y = p.hy;
      if (alpha <= 0) return;
      const base = p.a ? accent : ink;
      if (accentMix < 1) {
        ctx.globalAlpha = alpha * (1 - accentMix);
        ctx.fillStyle = base;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
      if (accentMix > 0) {
        ctx.globalAlpha = alpha * accentMix;
        ctx.fillStyle = accent;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !reduced ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (!raf && visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Reconstruye si cambia el tamaño del hero (ventana, o el subtítulo que pasa a dos líneas).
    let resizeTimer = 0;
    let lastSize = "";
    const ro = new ResizeObserver(() => {
      const size = `${host.clientWidth}x${host.clientHeight}`;
      if (size === lastSize) return;
      lastSize = size;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        draw();
        start();
      }, 150);
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      lastSize = `${host.clientWidth}x${host.clientHeight}`;
      build();
      draw();
      start();
      io.observe(host);
      ro.observe(host);
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className="wordmark">
      <h1 className="wordmark__text">{text}</h1>
      <canvas ref={canvasRef} className="wordmark__canvas" aria-hidden="true" />
    </div>
  );
}
