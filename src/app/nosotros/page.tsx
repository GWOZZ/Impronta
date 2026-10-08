import type { Metadata } from "next";
import Image from "next/image";
import { principles, team } from "@/lib/content";

const description = "Equipo fundador y principios de ejecución de Ongenia.";

export const metadata: Metadata = {
  title: "Nosotros",
  description,
  alternates: { canonical: "/nosotros" },
  openGraph: { title: "Nosotros | Ongenia", description, url: "/nosotros" },
};

export default function Nosotros() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Nosotros</p>
          <h1 className="page-head__title">
            Equipo y <em>forma de trabajo</em>
          </h1>
          <p className="page-head__lede">
            Seis personas entre producto, ingeniería y negocio. Construimos IA y software que se usa de
            verdad.
          </p>
        </div>
      </section>

      <section className="section section--flush" aria-label="Equipo">
        <div className="wrap">
          <ul className="team">
            {team.map((m, i) => (
              <li key={m.name} className="member" data-reveal style={{ ["--i" as string]: i % 3 }}>
                <div className="member__photo">
                  <Image
                    src={m.photo}
                    alt={`Retrato de ${m.name}`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  <span className="member__index mono" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <div className="member__info">
                  <h2 className="member__name">{m.name}</h2>
                  <p className="mono member__role">{m.role}</p>
                  <p className="member__bio">{m.bio}</p>
                  {m.linkedin && (
                    <a href={m.linkedin} className="member__link" target="_blank" rel="noopener">
                      LinkedIn <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="principios">
        <div className="wrap">
          <div className="section__head" data-reveal>
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 id="principios" className="section__title">
              Principios <em>de ejecución</em>
            </h2>
          </div>
          <ol className="principles">
            {principles.map((p, i) => (
              <li key={p.title} className="principle" data-reveal>
                <span className="principle__num">0{i + 1}</span>
                <h3 className="principle__title">{p.title}</h3>
                <p className="principle__body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
