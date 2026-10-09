import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { services, site } from "@/lib/content";

const description = "Canal de contacto de Impronta para evaluar proyectos de IA o software.";

export const metadata: Metadata = {
  title: "Contacto",
  description,
  alternates: { canonical: "/contacto" },
  openGraph: { title: `Contacto | ${site.name}`, description, url: "/contacto" },
};

const next = [
  { title: "Recibimos tu solicitud", body: "Leemos el contexto y el servicio que te interesa." },
  { title: "Definimos objetivo y prioridad", body: "Te contactamos para entender qué querés resolver primero." },
  { title: "Plan concreto", body: "Te proponemos alcance, tiempos y un plan de implementación." },
];

export default function Contacto() {
  return (
    <section className="page-head contact">
      <div className="wrap contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">Contacto</p>
          <h1 className="page-head__title">
            Evaluación <em>de proyectos</em>
          </h1>
          <p className="page-head__lede">
            Analizamos contexto, objetivos y desafío para diseñar una propuesta enfocada en resultados.
          </p>
          <ol className="contact__next">
            {next.map((s, i) => (
              <li key={s.title}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p className="muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <ContactForm
          services={services.map((s) => ({
            name: s.name,
            short: s.short,
            objective: s.objective,
            template: s.template,
          }))}
        />
      </div>
    </section>
  );
}
