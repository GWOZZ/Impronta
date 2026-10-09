# Marca

Material de marca de Impronta que no forma parte de la app de Next.js.

## `branding-sheets/`

Láminas del sistema de marca y de las cuatro propuestas de favicon (A elegida: la i). Son la copia en el repo del lienzo de diseño [Impronta — Branding sheets](https://claude.ai/artifact/NRGKYHdQaZj44pi1gLixVP).

- `Main.dc.html`: sistema de marca (logo y versión con ia, color y negativo, tipografía, recursos gráficos, sistema de partículas).
- `A-la-i.dc.html` a `D-azul.dc.html`: una lámina por propuesta de favicon.
- `canvas.json`: la disposición de las láminas en el lienzo.

Los `.dc.html` se pueden abrir directo en el navegador; el `support.js` que referencian es del editor del lienzo y no hace falta para verlos.

## `movimiento/la-i-tobogan.html`

Prototipo de transición: el punto de la i cae, rueda por el banderín del favicon, sale disparado desde la punta y abre un círculo ultramar que tapa la pantalla. Abre directo en el navegador. Versión publicada: [La i tobogán](https://claude.ai/artifact/51F99dtZW2Z9bVpsJGB68q).

## `scripts/glyph_i_crop.py`

Genera los contornos de la i del favicon (`src/app/icon.svg` y `src/app/apple-icon.tsx`) a partir de Instrument Serif, sin redibujar la letra. Necesita `fontTools` y el archivo de la fuente ([InstrumentSerif-Regular.ttf](https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf), licencia OFL):

```bash
python brand/scripts/glyph_i_crop.py InstrumentSerif-Regular.ttf 0.076 2.2 17 4.3
```

Los argumentos son la escala, la altura del punto, la posición del tronco y cuánto se baja el punto hacia el tronco (todo en la grilla de 32 del favicon).
