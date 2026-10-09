"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * - Al cambiar de página (sin #ancla), vuelve arriba de forma instantánea.
 *   Next.js ya lo intenta, pero puede quedar a mitad de camino con scroll suave
 *   o con la inercia del trackpad.
 * - Los links a anclas de la misma página (#branding) se desplazan con suavidad.
 *   Por eso el sitio no usa `scroll-behavior: smooth` global.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.location.hash) return;
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    toTop();
    // Un scroll que venía en movimiento (inercia del trackpad, scroll suave) puede
    // aplicar un último paso después del cambio de página: se repite en los dos
    // frames siguientes.
    let raf = requestAnimationFrame(() => {
      toTop();
      raf = requestAnimationFrame(toTop);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href^='#']");
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
