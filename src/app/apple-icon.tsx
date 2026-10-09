import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Contornos de la "i" de Instrument Serif (la tipografía del logo), en la grilla de 32
// del favicon: el tronco en papel y el punto en ultramar.
const STEM =
  "M13.3 27.5Q12.81 27.5 12.81 27.14Q12.81 26.85 13.23 26.75L13.62 26.69Q14.43 26.56 14.66 26.29Q14.88 26.01 14.88 25.33L14.88 14.45Q14.88 13.86 14.71 13.65Q14.53 13.44 14.07 13.38L13.39 13.28Q12.97 13.25 12.97 12.92Q12.97 12.66 13.49 12.57Q14.49 12.4 15.11 12.04Q15.72 11.69 16.31 11.17Q16.6 10.88 16.79 10.88Q17.09 10.88 17.09 11.27L17.09 25.33Q17.09 26.01 17.28 26.3Q17.47 26.59 18.02 26.66L18.83 26.75Q19.19 26.82 19.19 27.11Q19.19 27.5 18.7 27.5Z";
const DOT =
  "M16.02 7.9Q15.34 7.9 14.87 7.42Q14.4 6.93 14.4 6.18Q14.4 5.44 14.87 4.97Q15.34 4.5 16.02 4.5Q16.7 4.5 17.15 4.97Q17.6 5.44 17.6 6.18Q17.6 6.93 17.15 7.42Q16.7 7.9 16.02 7.9Z";

// Ícono para la pantalla de inicio del iPhone, a sangre (iOS redondea las esquinas
// por su cuenta). A este tamaño alcanza con un refuerzo leve del trazo.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#121210" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d={STEM} fill="#f1eee6" stroke="#f1eee6" strokeWidth="0.6" strokeLinejoin="round" />
          <path d={DOT} fill="#4a3aff" stroke="#4a3aff" strokeWidth="0.6" />
        </svg>
      </div>
    ),
    size,
  );
}
