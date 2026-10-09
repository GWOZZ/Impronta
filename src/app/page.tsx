import Image from "next/image";
import Link from "next/link";
import { IntentBuilder } from "@/components/IntentBuilder";
import { ParticleWordmark } from "@/components/ParticleWordmark";
import { TypedWord } from "@/components/TypedWord";
import { clients, faqs, heroWords, site, steps } from "@/lib/content";
import { Arrow } from "@/components/Arrow";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: `${site.wordmark} - ${site.signature}`,
  url: site.url,
  logo: `${site.url}/og-impronta.jpg`,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, faqJsonLd]) }}
      />

      {/* 1 · Hero */}
      <section className="hero" data-particle-host>
        <div className="hero__grid" aria-hidden="true" />
        <ParticleWordmark text={site.wordmark} />
        <div className="wrap hero__copy">
          <h2 className="hero__sub">
            Soluciones estratégicas en <TypedWord words={heroWords} />
          </h2>
          <p className="hero__lede">
            Diseñamos e implementamos IA y software a medida para empresas que quieren menos tareas
            manuales y mejores decisiones.
          </p>
          <div className="hero__actions">
            <Link href="/contacto" className="btn btn--accent">
              Agendar una reunión gratis <Arrow />
            </Link>
            <Link href="/servicios" className="btn btn--ghost">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · Catálogo */}
      <section className="section" aria-labelledby="catalogo">
        <div className="wrap">
          <div data-reveal>
            <IntentBuilder>
              <h2 id="catalogo" className="intent__title">
                Nuestros servicios. <em>Empezá por el objetivo.</em>
              </h2>
            </IntentBuilder>
          </div>
        </div>
      </section>

      {/* 3 · Proceso */}
      <section className="section section--ink process" aria-labelledby="proceso">
        <div className="wrap">
          <div className="section__head" data-reveal>
            <h2 id="proceso" className="section__title">
              Quiénes somos y qué hacemos. <em>De la idea a la operación, en cuatro pasos.</em>
            </h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="step" data-reveal style={{ ["--i" as string]: i }}>
                <span className="step__num">0{i + 1}</span>
                <span className="step__node" aria-hidden="true" />
                <h3 className="step__title">{s.title}</h3>
                <p className="step__body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 · Clientes (solo si hay logos cargados) */}
      {clients.length > 0 && (
        <section className="section section--tight clients" aria-labelledby="clientes">
          <div className="wrap clients__head" data-reveal>
            <h2 id="clientes" className="clients__title">
              Empresas con las que trabajamos
            </h2>
          </div>
          <div className="marquee">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee__track" aria-hidden={copy === 1 ? true : undefined}>
                {[...clients, ...clients].map((c, i) => {
                  // Solo la primera aparición de cada logo es accesible; el resto es la cinta repetida.
                  const repeat = copy === 1 || i >= clients.length;
                  const logo = (
                    <Image
                      src={c.logo}
                      alt={repeat ? "" : c.name}
                      width={c.width}
                      height={c.height}
                      sizes="200px"
                    />
                  );
                  return (
                    <li
                      key={`${c.name}-${i}`}
                      className="marquee__item"
                      aria-hidden={repeat && copy === 0 ? true : undefined}
                    >
                      {c.href ? (
                        <a
                          href={c.href}
                          className="marquee__link"
                          target="_blank"
                          rel="noopener"
                          tabIndex={repeat ? -1 : undefined}
                        >
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </section>
      )}

      {/* 5 · FAQ */}
      <section className="section faq" aria-labelledby="faq">
        <div className="wrap faq__grid">
          <div className="faq__aside" data-reveal>
            <h2 id="faq" className="section__title">
              Preguntas <em>frecuentes</em>
            </h2>
            <p className="muted">
              ¿No encontrás tu respuesta? <Link href="/contacto">Escribinos</Link>.
            </p>
          </div>
          <div className="faq__list" data-reveal>
            {faqs.map((f, i) => (
              <details key={f.q} className="faq__item" open={i === 0}>
                <summary>
                  <span className="mono faq__n">0{i + 1}</span>
                  <span>{f.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
