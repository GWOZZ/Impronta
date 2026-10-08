import Image from "next/image";
import Link from "next/link";
import { IntentBuilder } from "@/components/IntentBuilder";
import { ParticleWordmark } from "@/components/ParticleWordmark";
import { TypedWord } from "@/components/TypedWord";
import { clients, faqs, heroWords, site, steps } from "@/lib/content";

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
  logo: `${site.url}/og-card-social.jpg`,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, faqJsonLd]) }}
      />

      {/* 1 · Hero */}
      <section className="hero">
        <div className="hero__grid" aria-hidden="true" />
        <div className="wrap hero__meta mono" aria-hidden="true">
          <span>{site.signature}</span>
          <span>IA · Software · Empresas</span>
        </div>
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
              Agendar una reunión gratis <span aria-hidden="true">→</span>
            </Link>
            <Link href="/productos" className="btn btn--ghost">
              Ver productos
            </Link>
          </div>
        </div>
        <p className="hero__hint mono" aria-hidden="true">
          Mové el cursor sobre el logo
        </p>
      </section>

      {/* 2 · Catálogo */}
      <section className="section" aria-labelledby="catalogo">
        <div className="wrap">
          <div data-reveal>
            <IntentBuilder>
              <p className="eyebrow">
                <span className="eyebrow__num">01</span> Catálogo
              </p>
              <h2 id="catalogo" className="intent__title">
                Nuestros productos. <em>Empezá por el objetivo.</em>
              </h2>
            </IntentBuilder>
          </div>
        </div>
      </section>

      {/* 3 · Proceso */}
      <section className="section section--ink process" aria-labelledby="proceso">
        <div className="wrap">
          <div className="section__head" data-reveal>
            <p className="eyebrow">
              <span className="eyebrow__num">02</span> Proceso
            </p>
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

      {/* 4 · Clientes */}
      <section className="section section--tight clients" aria-labelledby="clientes">
        <div className="wrap clients__head" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__num">03</span> Clientes
          </p>
          <h2 id="clientes" className="clients__title">
            Empresas con las que trabajamos
          </h2>
        </div>
        <div className="marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee__track" aria-hidden={copy === 1 ? true : undefined}>
              {[...clients, ...clients].map((c, i) => (
                <li key={`${c.name}-${i}`} className="marquee__item">
                  <Image
                    src={c.logo}
                    alt={copy === 0 && i < clients.length ? c.name : ""}
                    width={c.width}
                    height={c.height}
                    sizes="200px"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 5 · FAQ */}
      <section className="section faq" aria-labelledby="faq">
        <div className="wrap faq__grid">
          <div className="faq__aside" data-reveal>
            <p className="eyebrow">
              <span className="eyebrow__num">04</span> FAQ
            </p>
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
