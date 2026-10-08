"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

/**
 * Animación de entrada para `[data-reveal]`.
 * Lo que ya está en pantalla se marca `is-in` antes del primer pintado (sin
 * animación, para que la página no aparezca vacía); lo que está más abajo
 * recibe `reveal-wait` y se muestra al entrar en pantalla.
 */
export function Reveal() {
  const pathname = usePathname();
  const first = useRef(true);

  useLayoutEffect(() => {
    const isNavigation = !first.current;
    first.current = false;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in):not(.reveal-wait)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    // En una navegación, Next.js todavía no volvió arriba: medimos contra el inicio del documento.
    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      if (isNavigation && !window.location.hash) return r.top + window.scrollY < window.innerHeight;
      return r.top < window.innerHeight && r.bottom > 0;
    };
    els.forEach((el) => {
      if (inView(el)) {
        el.classList.add("is-in");
      } else {
        el.classList.add("reveal-wait");
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
