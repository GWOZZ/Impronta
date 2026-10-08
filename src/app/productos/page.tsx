import type { Metadata } from "next";
import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { contactHref, products } from "@/lib/content";
import { Arrow } from "@/components/Arrow";

const description = "Servicios de IA y software explicados en detalle y casos de aplicación reales.";

export const metadata: Metadata = {
  title: "Productos",
  description,
  alternates: { canonical: "/productos" },
  openGraph: { title: "Productos | Ongenia", description, url: "/productos" },
};

export default function Productos() {
  return (
    <>
      <section className="page-head page-head--screen">
        <div className="wrap">
          <p className="eyebrow">Productos</p>
          <h1 className="page-head__title">
            Servicios claros, <em>orientados a resultado</em>
          </h1>
          <p className="page-head__lede">{description}</p>

          <nav className="picker" aria-label="Productos">
            <p className="mono picker__label">Elegí un producto para ver el detalle</p>
            <ol className="picker__list">
              {products.map((p, i) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`} className="picker__item">
                    <span className="mono">0{i + 1}</span>
                    <strong>{p.short}</strong>
                    <span className="muted">{p.tagline}</span>
                    <Arrow dir="down" className="picker__arrow" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {products.map((p, i) => (
        <section
          key={p.slug}
          id={p.slug}
          className={`spec${i % 2 === 1 ? " section--ink" : ""}`}
          aria-labelledby={`${p.slug}-title`}
        >
          <div className="wrap spec__grid">
            <div className="spec__main" data-reveal>
              <p className="eyebrow">
                <span className="eyebrow__num">0{i + 1}</span> {p.tagline}
              </p>
              <h2 id={`${p.slug}-title`} className="spec__title">
                {p.name}
              </h2>
              <p className="spec__desc">{p.description}</p>
              <p className="mono spec__objective">Objetivo · {p.objective}</p>
              <div className="spec__actions">
                <Link href={contactHref(p)} className="btn btn--accent">
                  {p.cta} <Arrow />
                </Link>
                {p.externalSite && (
                  <a href={p.externalSite.href} className="btn btn--ghost" target="_blank" rel="noopener">
                    Ver sitio · {p.externalSite.label} <Arrow dir="up-right" />
                  </a>
                )}
              </div>
            </div>

            <div className="spec__sheet" data-reveal>
              <div className="spec__metric">
                <p className="mono">{p.metric.label}</p>
                <p className="spec__metric-value">
                  {p.metric.count ? <CountUp {...p.metric.count} /> : p.metric.value}
                </p>
              </div>
              <ul className="spec__features">
                {p.features.map((f, j) => (
                  <li key={f}>
                    <span className="mono">{String(j + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

          </div>
          {p.demos && (
            <div className="wrap demos" data-reveal>
              <p className="mono demos__label">Demos interactivas · Tocá un video para abrir el sitio</p>
              <div className="demos__grid">
                {p.demos.map((d) => (
                  <a key={d.name} href={d.href} className="demo" target="_blank" rel="noopener">
                    <video
                      src={d.video}
                      poster={d.video.replace(".mp4", ".jpg")}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    />
                    <span className="demo__caption">
                      <span className="mono">Demo</span>
                      <strong>{d.name}</strong>
                      <span className="demo__open">
                          Abrir sitio <Arrow dir="up-right" />
                        </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}
    </>
  );
}
