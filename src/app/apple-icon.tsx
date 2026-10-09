import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Partículas de la "i" (cuadraditos, como en el wordmark del hero), en la grilla de 32 del favicon.
const SIZE = 2.2;
const STEM = [
  [13.3, 13.5],
  [16, 13.5],
  [16, 16.2],
  [16, 18.9],
  [16, 21.6],
  [13.3, 24.3],
  [16, 24.3],
  [18.7, 24.3],
];
// El punto de la i: un bloque de 2 × 2 partículas en ultramar.
const TITTLE = [
  [14.65, 6.85],
  [17.35, 6.85],
  [14.65, 9.55],
  [17.35, 9.55],
];

// Ícono para la pantalla de inicio del iPhone: la misma "i" del favicon, a sangre
// (iOS redondea las esquinas por su cuenta).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#121210" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          {STEM.map(([cx, cy]) => (
            <rect key={`s${cx}-${cy}`} x={cx - SIZE / 2} y={cy - SIZE / 2} width={SIZE} height={SIZE} fill="#f1eee6" />
          ))}
          {TITTLE.map(([cx, cy]) => (
            <rect key={`t${cx}-${cy}`} x={cx - SIZE / 2} y={cy - SIZE / 2} width={SIZE} height={SIZE} fill="#4a3aff" />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
