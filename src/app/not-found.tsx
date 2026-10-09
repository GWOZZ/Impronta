import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

// Mismo encuadre que el hero del inicio, pero tipográfico y quieto:
// las partículas quedan solo para el logo.
export default function NotFound() {
  return (
    <section className="hero notfound">
      <div className="hero__grid" aria-hidden="true" />
      <h1 className="notfound__code" aria-label="Error 404">
        4<em>0</em>4
      </h1>
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
