import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  objective?: string;
  service?: string;
  message?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: los bots completan este campo; respondemos OK sin enviar nada.
  if (body.website) return NextResponse.json({ message: "Gracias." });

  const name = clip(body.name, 200);
  const email = clip(body.email, 200);
  const objective = clip(body.objective, 200);
  const service = clip(body.service, 500);
  const message = clip(body.message, 5000);

  if (!name) return NextResponse.json({ error: "Falta el nombre o la empresa." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Revisá el email de contacto." }, { status: 400 });
  if (!service && !message) {
    return NextResponse.json(
      { error: "Elegí un producto o contanos brevemente qué necesitás." },
      { status: 400 },
    );
  }

  const text = [
    `Nombre / empresa: ${name}`,
    `Email: ${email}`,
    `Producto(s): ${service || "—"}`,
    `Objetivo: ${objective || "—"}`,
    "",
    message || "(sin mensaje)",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL sin configurar. Mensaje:\n" + text);
      return NextResponse.json({ message: "Mensaje recibido (modo desarrollo, no se envió email)." });
    }
    console.error("[contact] Falta configurar RESEND_API_KEY y CONTACT_TO_EMAIL.");
    return NextResponse.json(
      { error: "El formulario no está disponible en este momento. Probá más tarde." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Ongenia <web@ongenia.com>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `Nueva solicitud web: ${service || name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend respondió", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "No pudimos enviar el mensaje. Probá de nuevo." }, { status: 502 });
  }

  return NextResponse.json({ message: "¡Gracias! El equipo de Ongenia te va a responder a la brevedad." });
}
