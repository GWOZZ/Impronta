import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Ícono para la pantalla de inicio del iPhone: la misma "i" del favicon, a sangre
// (iOS redondea las esquinas por su cuenta).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#121210" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <rect x="13.4" y="13" width="5.2" height="11" fill="#f1eee6" />
          <rect x="11" y="13" width="7.6" height="2" fill="#f1eee6" />
          <rect x="10.5" y="22.4" width="11" height="2" fill="#f1eee6" />
          <circle cx="16" cy="8.2" r="3" fill="#4a3aff" />
        </svg>
      </div>
    ),
    size,
  );
}
