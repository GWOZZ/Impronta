"use client";

import { useEffect, useState } from "react";

/** Escribe y borra cada palabra en loop. El HTML del servidor muestra la primera. */
export function TypedWord({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let chars = words[0].length;
    let deleting = true;
    let timer = 0;

    const tick = () => {
      if (deleting) {
        chars -= 1;
        if (chars <= 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
      } else {
        chars += 1;
      }
      setText(words[i].slice(0, Math.max(chars, 0)));
      const done = !deleting && chars >= words[i].length;
      if (done) deleting = true;
      timer = window.setTimeout(tick, done ? 2200 : deleting ? 55 : 95);
    };

    timer = window.setTimeout(tick, 2400);
    return () => window.clearTimeout(timer);
  }, [words]);

  return (
    <span className="typed">
      <span aria-hidden="true">{text}</span>
      <span className="typed__caret" aria-hidden="true" />
      <span className="sr-only">{words.join(" y ")}</span>
    </span>
  );
}
