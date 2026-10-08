/**
 * Flecha en SVG. Reemplaza a los caracteres →, ↗ y ↓, que en Inter Tight quedan
 * desalineados respecto del texto. Mide 1em y se centra con flex en los botones.
 */
const paths = {
  right: "M3 8h10M9 4l4 4-4 4",
  "up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
  down: "M8 3v10M4 9l4 4 4-4",
};

export function Arrow({ dir = "right", className }: { dir?: keyof typeof paths; className?: string }) {
  return (
    <svg
      className={`arrow${className ? ` ${className}` : ""}`}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[dir]} />
    </svg>
  );
}
