# impronta.com.uy

Sitio de Impronta: IA y software para empresas. Next.js 15 (App Router), TypeScript y CSS sin frameworks.

## Concepto de diseño

"Impronta" lleva la IA adentro: empieza con *i* y termina con *a*. El sitio juega con eso y con la idea de un sistema generativo:

- **Wordmark de partículas.** En la home, "impronta" está hecho de miles de puntos que se dispersan con el cursor. Al cargar aparece "ia" en color de acento y se abre desde el medio hasta formar la palabra (entrada `expand`; también hay `gentle`, `fade` y `none`, que se prueban con `?intro=`). El `<h1>` real queda debajo para SEO, lectores de pantalla y navegadores sin JS.
- **El catálogo como una frase.** "Quiero *mejorar la atención* / *automatizar procesos* / *ganar presencia digital*": elegís el objetivo y aparece el producto recomendado como una respuesta generada. Funciona solo con CSS (radios + `:has`).
- **Sistema visual:** papel cálido y tinta, acento ultramar eléctrico y señal lima en las secciones oscuras. Instrument Serif para display, Inter Tight para lectura y JetBrains Mono para etiquetas.

## Qué resuelve respecto del sitio anterior

Según el *Manual de contenidos* del sitio anterior (ongenia.com):

- Todo el contenido (productos, métricas, equipo, formulario) se **renderiza en el servidor**: las páginas son estáticas y las métricas nunca aparecen como "US$0K+".
- **Contacto** en el header, además del footer y los CTAs.
- `/clientes` → **`/productos`** con redirección 301 (se conservan los query params).
- Se quitó el logo "Cliente C".
- Tono unificado en **voseo** ("Construimos con vos", "Volvete más efectivo").
- Etiqueta de sección corregida ("Proceso" en vez de "Inicio").
- Las 6 fichas del equipo, con rol y bio visibles, sin carrusel.
- `sitemap.xml` con las 4 páginas, `robots.txt`, y canonical/og por página (Nosotros ya no apunta a la home).
- Datos estructurados `Organization` + `FAQPage`.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

El contenido editable está en `src/lib/content.ts`.

## Formulario de contacto

`POST /api/contact` recibe `{ name, email, objective, service, message, website }` (el mismo payload que el sitio anterior; `website` es un honeypot) y envía el mensaje por [Resend](https://resend.com). Configurá las variables de `.env.example`:

| Variable | Uso |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend |
| `CONTACT_TO_EMAIL` | Destinatario(s), separados por coma |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend |

Sin estas variables, en desarrollo el mensaje se loguea en consola y en producción el endpoint responde 503.

El formulario se puede precargar con `/contacto?producto=<nombre>&objetivo=<objetivo>` (también acepta `servicio=`, que usaba el sitio anterior).

## Pendientes que no están en el contenido

- Datos de contacto directo, redes y páginas legales (privacidad, términos) para el footer.
- La tarjeta de "Páginas web" lista prestaciones derivadas de su descripción (el sitio anterior no tenía).
