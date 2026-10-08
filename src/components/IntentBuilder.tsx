import Link from "next/link";
import { products } from "@/lib/content";
import { CountUp } from "./CountUp";

/**
 * Catálogo como una frase para completar: "Quiero ___".
 * Funciona sin JavaScript (radios + :has); las tres respuestas están en el HTML.
 */
export function IntentBuilder({ children }: { children?: React.ReactNode }) {
  return (
    <div className="intent">
      <div className="intent__side">
        {children}
        <fieldset className="intent__prompt">
          <legend className="intent__lead">Quiero</legend>
          <div className="intent__options">
            {products.map((p, i) => (
              <label key={p.slug} className="intent__chip">
                <input type="radio" name="intent" value={p.slug} defaultChecked={i === 0} />
                <span>{p.intent}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="intent__outputs">
        {products.map((p, i) => (
          <article key={p.slug} className={`intent__out intent__out--${p.slug}`} data-slug={p.slug}>
            <header className="intent__out-head mono">
              <span className="intent__status" aria-hidden="true" />
              <span>Producto recomendado</span>
              <span className="intent__index">
                0{i + 1} / 0{products.length}
              </span>
            </header>
            <div className="intent__out-body">
              <div>
                <p className="intent__objective mono">Objetivo · {p.objective}</p>
                <h3 className="intent__name">{p.name}</h3>
                <p className="intent__desc">{p.description}</p>
                <ul className="tags" aria-label="Incluye">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="intent__metric">
                <p className="mono intent__metric-label">{p.metric.label}</p>
                <div className="intent__metric-row">
                  <p className="intent__metric-value">
                    {p.metric.count ? <CountUp {...p.metric.count} /> : p.metric.value}
                  </p>
                  <Link href={`/productos#${p.slug}`} className="btn btn--ink">
                    Ver detalle del producto <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
