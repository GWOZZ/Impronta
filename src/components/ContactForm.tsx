"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";

type ServiceOption = { name: string; short: string; objective: string; template: string };
type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

const OTHER = "Otro";

function buildTemplate(selected: string[], services: ServiceOption[]) {
  const chosen = services.filter((p) => selected.includes(p.name));
  if (chosen.length === 0) return "";
  if (chosen.length === 1) return chosen[0].template;
  return `Interés en los siguientes servicios: ${chosen.map((p) => p.name).join(", ")}.\nSe solicita una reunión para definir alcance, tiempos y próximos pasos.`;
}

export function ContactForm({ services }: { services: ServiceOption[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [objective, setObjective] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const lastTemplate = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  // Precarga desde la URL: ?servicio=…&objetivo=… (y ?producto=…, de los links anteriores).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wanted = [params.get("producto"), params.get("servicio")]
      .filter(Boolean)
      .flatMap((v) => v!.split(","))
      .map((v) => v.trim());
    const valid = services.filter((p) => wanted.includes(p.name)).map((p) => p.name);
    if (valid.length) setSelected(valid);
    const obj = params.get("objetivo");
    if (obj) setObjective(obj);
  }, [services]);

  // Completa un mensaje modelo mientras la persona no haya escrito el suyo.
  useEffect(() => {
    const next = buildTemplate(selected, services);
    setMessage((current) => {
      if (current.trim() === "" || current === lastTemplate.current) {
        lastTemplate.current = next;
        return next;
      }
      return current;
    });
  }, [selected, services]);

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));

  const reset = () => {
    formRef.current?.reset();
    setSelected([]);
    setMessage("");
    lastTemplate.current = "";
    setObjective("");
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      objective,
      service: selected.join(", "),
      message: message.trim(),
      website: String(form.get("website") ?? ""),
    };
    if (!payload.service && !payload.message) {
      setStatus({ type: "error", message: "Elegí un servicio o contanos brevemente qué necesitás." });
      return;
    }
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { message?: string; error?: string } | null;
      if (!res.ok) throw new Error(data?.error || `No pudimos enviar el mensaje (HTTP ${res.status}).`);
      setStatus({ type: "success", message: data?.message || "¡Gracias! El equipo de Impronta te va a responder a la brevedad." });
      reset();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "No pudimos enviar el mensaje. Probá de nuevo.",
      });
    }
  }

  const sending = status.type === "sending";

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__head">
        <span className="mono">Formulario de contacto</span>
        <span className="mono muted">Consultas comerciales y técnicas</span>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Nombre de la empresa o responsable</label>
          <input id="name" name="name" type="text" placeholder="Nombre o empresa" autoComplete="organization" required />
        </div>

        <div className="field">
          <label htmlFor="email">Email de contacto</label>
          <input id="email" name="email" type="email" placeholder="correo@empresa.com" autoComplete="email" required />
        </div>
      </div>

      <fieldset className="field">
        <legend>Servicio de interés</legend>
        <p className="field__hint">Podés elegir más de uno. Te completamos un mensaje modelo.</p>
        <div className="choices">
          {[...services.map((s) => ({ name: s.name, label: s.short })), { name: OTHER, label: OTHER }].map(
            (opt) => (
              <label key={opt.name} className="choice">
                <input
                  type="checkbox"
                  name="service"
                  value={opt.name}
                  checked={selected.includes(opt.name)}
                  onChange={() => toggle(opt.name)}
                />
                <span>{opt.label}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Detalle del proyecto o necesidad…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="field__hint">Opcional si ya elegiste un servicio. Si no, contanos brevemente qué necesitás.</p>
      </div>

      {/* Honeypot anti-spam: invisible para personas. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--accent" disabled={sending}>
          {sending ? "Enviando…" : "Enviar solicitud"} <Arrow />
        </button>
        <button type="button" className="btn btn--ghost" onClick={reset} disabled={sending}>
          Limpiar
        </button>
      </div>

      <p className={`form__status form__status--${status.type}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
