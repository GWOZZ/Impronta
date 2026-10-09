import type { Metadata } from "next";
import Link from "next/link";
import { contactHref, services, site } from "@/lib/content";
import { Arrow } from "@/components/Arrow";

const description =
  "Branding, software interno, automatizaciones y páginas web: qué incluye cada servicio de Impronta.";

export const metadata: Metadata = {
  title: "Servicios",
  description,
  alternates: { canonical: "/servicios" },
  openGraph: { title: `Servicios | ${site.name}`, description, url: "/servicios" },
};

export default function Servicios() {
  return (
    <>
      <section className="page-head page-head--screen">
        <div className="wrap">
          <p className="eyebrow">Servicios</p>
          <h1 className="page-head__title">
            Servicios claros, <em>orientados a resultado</em>
          </h1>
          <p className="page-head__lede">{description}</p>

          <nav className="picker" aria-label="Servicios">
            <p className="mono picker__label">Elegí un servicio para ver el detalle</p>
            <ol className="picker__list">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="picker__item">
                    <span className="mono">0{i + 1}</span>
                    <strong>{s.short}</strong>
                    <span className="muted">{s.tagline}</span>
                    <Arrow dir="down" className="picker__arrow" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`spec${i % 2 === 1 ? " section--ink" : ""}`}
          aria-labelledby={`${s.slug}-title`}
        >
          <div className="wrap spec__grid">
            <div className="spec__main" data-reveal>
              <p className="eyebrow">
                <span className="eyebrow__num">0{i + 1}</span> {s.tagline}
              </p>
              <h2 id={`${s.slug}-title`} className="spec__title">
                {s.name}
              </h2>
              <p className="spec__desc">{s.description}</p>
              <p className="mono spec__objective">Objetivo · {s.objective}</p>
              <div className="spec__actions">
                <Link href={contactHref(s)} className="btn btn--accent">
                  {s.cta} <Arrow />
                </Link>
              </div>
            </div>

            <div className="spec__sheet" data-reveal>
              <div className="spec__metric">
                <p className="mono">Qué te llevás</p>
                <p className="spec__metric-value">{s.outcome}</p>
              </div>
              <ul className="spec__features">
                {s.features.map((f, j) => (
                  <li key={f}>
                    <span className="mono">{String(j + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
