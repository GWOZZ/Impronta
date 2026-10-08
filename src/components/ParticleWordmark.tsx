"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; a: boolean };

/**
 * Dibuja el wordmark como una nube de partículas que se "genera" al cargar y
 * se dispersa con el cursor. El <h1> real queda debajo (para SEO, lectores
 * de pantalla y como fallback sin JS); se vuelve transparente cuando el
 * canvas está listo.
 *
 * El canvas cubre el contenedor marcado con `data-particle-host` (el hero
 * entero), así las partículas pueden alejarse del logo sin recortarse.
 */
export function ParticleWordmark({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const heading = wrap?.querySelector("h1");
    if (!wrap || !canvas || !heading) return;
    const host = wrap.closest<HTMLElement>("[data-particle-host]") ?? wrap;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      if (node?.nodeType === Node.TEXT_NODE) {
        const range = document.createRange();
        const chars = node.textContent ?? "";
        for (let i = 0; i < chars.length; i++) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          o.fillText(chars[i], range.getBoundingClientRect().left - rect.left, baseline);
        }
      }

      const step = Math.max(3, Math.round(parseFloat(hs.fontSize) / 46));
      size = Math.max(1.4, step * 0.62);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const next: Particle[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            const start = reduced
              ? { x, y }
              : { x: Math.random() * w, y: Math.random() * h };
            next.push({ x: start.x, y: start.y, hx: x, hy: y, vx: 0, vy: 0, a: Math.random() < 0.06 });
          }
        }
      }
      particles = next;
      wrap.classList.add("is-live");
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const r = Math.max(70, w * 0.07);
      const r2 = r * r;
      for (const p of particles) {
        if (!reduced) {
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

    const loop = () => {
      draw();
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
