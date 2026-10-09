"""La "i" de Instrument Serif agrandada y recortada: el punto arriba, el tronco sale por abajo.
Genera los contornos del favicon (grilla de 32) como datos de path SVG.

Uso: glyph_i_crop.py <ttf> <escala> <y del punto> <x del tronco> [bajar el punto]
Favicon actual: glyph_i_crop.py InstrumentSerif-Regular.ttf 0.076 2.2 17 4.3"""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

font = TTFont(sys.argv[1])
s, dot_top, stem_x = (float(v) for v in sys.argv[2:5])
# A esta escala la separación original deja el punto suelto: se baja hacia el tronco.
dot_dy = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
gs = font.getGlyphSet()
rec = RecordingPen()
gs[font.getBestCmap()[ord("i")]].draw(rec)

contours, cur = [], []
for op, args in rec.value:
    cur.append((op, args))
    if op in ("closePath", "endPath"):
        contours.append(cur)
        cur = []

def ys(c):
    return [p[1] for _, a in c for p in a]

contours.sort(key=lambda c: -max(ys(c)))
dot, stem = contours
top_units = max(ys(dot))
# Centro del tronco: promedio de los x de la parte vertical (por debajo del banderín).
xs = [p[0] for _, a in stem for p in a if 60 < p[1] < 410]
stem_cx = (min(xs) + max(xs)) / 2

def tx(p, dy=0.0):
    return round(stem_x + (p[0] - stem_cx) * s, 2), round(dot_top + (top_units - p[1]) * s + dy, 2)

def to_path(c, dy=0.0):
    out = []
    for op, args in c:
        pts = [tx(p, dy) for p in args]
        if op == "moveTo":
            out.append("M%s %s" % pts[0])
        elif op == "lineTo":
            out.append("L%s %s" % pts[0])
        elif op == "qCurveTo":
            ctrl, end = pts[:-1], pts[-1]
            for i, c1 in enumerate(ctrl):
                if i < len(ctrl) - 1:
                    n = ctrl[i + 1]
                    out.append("Q%s %s %s %s" % (c1 + (round((c1[0] + n[0]) / 2, 2), round((c1[1] + n[1]) / 2, 2))))
                else:
                    out.append("Q%s %s %s %s" % (c1 + end))
        elif op == "closePath":
            out.append("Z")
    return "".join(out)

print("DOT", to_path(dot, dot_dy))
print("STEM", to_path(stem))
print("stem width", round((max(xs) - min(xs)) * s, 2), file=sys.stderr)
