import type { Metadata } from "next";
import Link from "next/link";
import { ParticleWordmark } from "@/components/ParticleWordmark";
import { Arrow } from "@/components/Arrow";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

// Mismo hero que el inicio: con la entrada "expand" aparecen los dos 4 juntos
// y el 0 se abre desde el medio.
export default function NotFound() {
  return (
    <section className="hero notfound" data-particle-host>
      <div className="hero__grid" aria-hidden="true" />
      <ParticleWordmark text="404" />
      <div className="wrap hero__copy">
        <h2 className="hero__sub">
          Esta página no existe. <em>Todavía.</em>
        </h2>
        <p className="hero__lede">
          Puede que el link esté mal escrito o que la página se haya mudado. Si es algo que tu
          empresa necesita, lo construimos.
        </p>
        <div className="hero__actions">
          <Link href="/" className="btn btn--accent">
            Volver al inicio <Arrow />
          </Link>
          <Link href="/contacto" className="btn btn--ghost">
            Contanos qué buscabas
          </Link>
        </div>
      </div>
    </section>
  );
}
