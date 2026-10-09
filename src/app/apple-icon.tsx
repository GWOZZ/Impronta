import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Contornos de la "i" de Instrument Serif (la tipografía del logo), agrandada en la grilla
// de 32 del favicon: el tronco cortado por el borde inferior y el punto acercado al tronco
// (la separación original queda muy grande a esta escala).
const STEM =
  "M10.69 56.16Q9.55 56.16 9.55 55.32Q9.55 54.64 10.54 54.41L11.45 54.26Q13.35 53.96 13.88 53.31Q14.42 52.66 14.42 51.07L14.42 25.53Q14.42 24.16 14.0 23.67Q13.58 23.18 12.52 23.02L10.92 22.8Q9.93 22.72 9.93 21.96Q9.93 21.35 11.15 21.12Q13.5 20.74 14.95 19.91Q16.39 19.07 17.76 17.86Q18.44 17.17 18.9 17.17Q19.58 17.17 19.58 18.08L19.58 51.07Q19.58 52.66 20.04 53.34Q20.5 54.03 21.79 54.18L23.69 54.41Q24.52 54.56 24.52 55.25Q24.52 56.16 23.38 56.16Z";
const DOT =
  "M17.08 14.48Q15.48 14.48 14.38 13.34Q13.28 12.2 13.28 10.45Q13.28 8.7 14.38 7.6Q15.48 6.5 17.08 6.5Q18.67 6.5 19.73 7.6Q20.8 8.7 20.8 10.45Q20.8 12.2 19.73 13.34Q18.67 14.48 17.08 14.48Z";

// Ícono para la pantalla de inicio del iPhone, a sangre (iOS redondea las esquinas
// por su cuenta). El tronco se corta en el borde, igual que en el favicon.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#121210" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d={STEM} fill="#f1eee6" />
          <path d={DOT} fill="#4a3aff" />
        </svg>
      </div>
    ),
    size,
  );
}
