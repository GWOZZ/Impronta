import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Puntos de la "i" de partículas, en la grilla de 32 del favicon.
const DOTS = [
  [13.3, 13.5],
  [16, 13.5],
  [16, 16.2],
  [16, 18.9],
  [16, 21.6],
  [13.3, 24.3],
  [16, 24.3],
  [18.7, 24.3],
];

// Ícono para la pantalla de inicio del iPhone: la misma "i" del favicon, a sangre
// (iOS redondea las esquinas por su cuenta).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#121210" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          {DOTS.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.25" fill="#f1eee6" />
          ))}
          <circle cx="16" cy="8.2" r="2.4" fill="#4a3aff" />
        </svg>
      </div>
    ),
    size,
  );
}
