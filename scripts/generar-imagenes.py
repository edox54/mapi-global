"""Genera las imágenes de fondo blueprint (navy institucional) del sitio.

Uso: python3 scripts/generar-imagenes.py
Reemplazables: basta con sobrescribir el archivo en public/img/ con una foto real
(tratamiento duotono navy se aplica por CSS).
"""
import math
import random
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

NAVY = (15, 32, 64)
NAVY_OSCURO = (8, 18, 38)
LINEA = (36, 62, 108)
CLARO = (226, 233, 245)
OUT = 'public/img/'

random.seed(7)


def lienzo(w, h):
    im = Image.new('RGB', (w, h), NAVY)
    d = ImageDraw.Draw(im)
    # degradado vertical
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)], fill=tuple(round(NAVY[i] + (NAVY_OSCURO[i] - NAVY[i]) * t) for i in range(3)))
    # rejilla blueprint
    paso = max(w, h) // 34
    for x in range(0, w, paso):
        d.line([(x, 0), (x, h)], fill=LINEA, width=1)
    for y in range(0, h, paso):
        d.line([(0, y), (w, y)], fill=LINEA, width=1)
    return im, d


def chevrones(im, w, h, escala=1.0, alpha=26):
    """Las tres líneas ascendentes a 45° de la marca."""
    capa = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    grosor = int(w * 0.055 * escala)
    paso = int(w * 0.1 * escala)
    ox, oy = int(w * 0.52), int(h * 1.02)
    for i in range(3):
        x = ox + i * paso
        d.line([(x, oy), (x + int(w * 0.62), oy - int(w * 0.62))], fill=(255, 255, 255, alpha), width=grosor)
    im.paste(Image.alpha_composite(im.convert('RGBA'), capa).convert('RGB'), (0, 0))


def trazo(d, puntos, ancho=3, alpha=150):
    d.line(puntos, fill=CLARO + (alpha,), width=ancho, joint='curve')


def acabado(im, w, h):
    # viñeta
    v = Image.new('L', (w, h), 0)
    ImageDraw.Draw(v).ellipse([-w * 0.25, -h * 0.35, w * 1.25, h * 1.35], fill=190)
    v = v.filter(ImageFilter.GaussianBlur(w // 12))
    oscuro = Image.new('RGB', (w, h), NAVY_OSCURO)
    im = Image.composite(im, oscuro, v)
    # grano
    ruido = Image.effect_noise((w, h), 9).convert('L').point(lambda p: 128 + (p - 128) * 0.35)
    im = Image.blend(im, Image.merge('RGB', (ruido, ruido, ruido)), 0.05)
    # Tono medio: el sitio aplica duotono navy por CSS (grayscale + multiply),
    # así que la fuente debe tener luminosidad de fotografía, no de fondo navy.
    im = ImageEnhance.Brightness(im).enhance(2.35)
    return ImageEnhance.Contrast(im).enhance(1.08)


def dibujo(nombre, w, h, fn, escala_chev=1.0):
    im, _ = lienzo(w, h)
    chevrones(im, w, h, escala_chev)
    capa = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    fn(ImageDraw.Draw(capa), w, h)
    im = Image.alpha_composite(im.convert('RGBA'), capa).convert('RGB')
    im = acabado(im, w, h)
    im.save(OUT + nombre, quality=88, optimize=True)
    print(nombre, im.size)


# ---------------- composiciones ----------------

def skyline(d, w, h):
    base = h * 0.9
    x = w * 0.04
    while x < w * 0.96:
        an = w * random.uniform(0.045, 0.085)
        al = h * random.uniform(0.18, 0.52)
        trazo(d, [(x, base), (x, base - al), (x + an, base - al), (x + an, base)], 3, 120)
        f = base - al + h * 0.04
        while f < base - h * 0.02:
            trazo(d, [(x + an * 0.15, f), (x + an * 0.85, f)], 2, 55)
            f += h * 0.045
        x += an + w * 0.018
    trazo(d, [(0, base), (w, base)], 4, 170)


def edificios(d, w, h):
    for (cx, an, al) in [(0.2, 0.2, 0.42), (0.45, 0.26, 0.62), (0.74, 0.18, 0.34)]:
        x0, y0 = w * cx, h * (0.9 - al)
        x1, y1 = x0 + w * an, h * 0.9
        trazo(d, [(x0, y1), (x0, y0), (x1, y0), (x1, y1)], 3, 150)
        for i in range(1, 6):
            y = y0 + (y1 - y0) * i / 6
            trazo(d, [(x0, y), (x1, y)], 2, 60)
        for i in range(1, 4):
            x = x0 + (x1 - x0) * i / 4
            trazo(d, [(x, y0), (x, y1)], 2, 60)
    trazo(d, [(0, h * 0.9), (w, h * 0.9)], 4, 170)


def tanques(d, w, h):
    for (cx, r) in [(0.22, 0.13), (0.52, 0.18), (0.82, 0.11)]:
        x, rr = w * cx, w * r
        top, bot = h * 0.9 - rr * 2.6, h * 0.9
        d.ellipse([x - rr, top - rr * 0.28, x + rr, top + rr * 0.28], outline=CLARO + (150,), width=3)
        trazo(d, [(x - rr, top), (x - rr, bot)], 3, 150)
        trazo(d, [(x + rr, top), (x + rr, bot)], 3, 150)
        d.arc([x - rr, bot - rr * 0.28, x + rr, bot + rr * 0.28], 0, 180, fill=CLARO + (150,), width=3)
        for i in range(1, 4):
            y = top + (bot - top) * i / 4
            trazo(d, [(x - rr, y), (x + rr, y)], 2, 55)
    y = h * 0.93
    trazo(d, [(0, y), (w, y)], 4, 170)
    for x in range(0, int(w), int(w * 0.09)):
        trazo(d, [(x, y), (x, y + h * 0.03)], 3, 90)


def contenedores(d, w, h):
    an, al = w * 0.17, h * 0.13
    for fila in range(3):
        for col in range(5):
            x = w * 0.06 + col * (an + w * 0.012) - fila * w * 0.02
            y = h * 0.86 - fila * (al + h * 0.012)
            if x + an > w * 0.98:
                continue
            trazo(d, [(x, y), (x + an, y), (x + an, y - al), (x, y - al), (x, y)], 3, 130 - fila * 22)
            for i in range(1, 7):
                cx = x + an * i / 7
                trazo(d, [(cx, y - al * 0.12), (cx, y - al * 0.88)], 2, 45)
    trazo(d, [(0, h * 0.88), (w, h * 0.88)], 4, 170)


def aeronave(d, w, h):
    cx, cy = w * 0.5, h * 0.52
    l = w * 0.34
    trazo(d, [(cx - l, cy), (cx + l * 0.85, cy)], 4, 160)                      # fuselaje
    trazo(d, [(cx - l * 0.1, cy), (cx + l * 0.35, cy - l * 0.42), (cx + l * 0.5, cy - l * 0.42)], 3, 130)
    trazo(d, [(cx - l * 0.1, cy), (cx + l * 0.35, cy + l * 0.42), (cx + l * 0.5, cy + l * 0.42)], 3, 130)
    trazo(d, [(cx - l * 0.85, cy), (cx - l * 0.6, cy - l * 0.2), (cx - l * 0.5, cy - l * 0.2)], 3, 110)
    for r in (0.55, 0.75, 0.95):
        d.arc([cx - w * r, cy - w * r * 0.62, cx + w * r, cy + w * r * 0.62], 200, 340, fill=CLARO + (45,), width=3)


def grua(d, w, h):
    x, base = w * 0.24, h * 0.92
    top = h * 0.12
    trazo(d, [(x, base), (x, top)], 4, 160)
    trazo(d, [(x + w * 0.02, base), (x + w * 0.02, top)], 4, 160)
    for i in range(9):
        y0 = base - (base - top) * i / 9
        y1 = base - (base - top) * (i + 1) / 9
        trazo(d, [(x, y0), (x + w * 0.02, y1)], 2, 80)
    trazo(d, [(x - w * 0.09, top + h * 0.03), (w * 0.86, top + h * 0.03)], 4, 160)
    trazo(d, [(x, top), (w * 0.6, top + h * 0.03)], 2, 90)
    trazo(d, [(w * 0.62, top + h * 0.03), (w * 0.62, h * 0.55)], 2, 110)
    trazo(d, [(w * 0.57, h * 0.55), (w * 0.67, h * 0.55), (w * 0.67, h * 0.66), (w * 0.57, h * 0.66), (w * 0.57, h * 0.55)], 3, 120)
    trazo(d, [(0, base), (w, base)], 4, 170)


def nodos(d, w, h):
    cx, cy = w * 0.5, h * 0.72
    for i in range(5):
        a = math.radians(200 + i * 35)
        x, y = cx + math.cos(a) * w * 0.32, cy + math.sin(a) * h * 0.42
        trazo(d, [(cx, cy), (x, y)], 2, 110)
        r = w * 0.022
        d.ellipse([x - r, y - r, x + r, y + r], outline=CLARO + (160,), width=3)
    r = w * 0.045
    d.rounded_rectangle([cx - r, cy - r, cx + r, cy + r], radius=r * 0.3, outline=CLARO + (180,), width=4)


if __name__ == '__main__':
    import os
    os.makedirs(OUT, exist_ok=True)
    dibujo('hero.jpg', 2000, 1250, skyline, 1.0)
    dibujo('holding.jpg', 1600, 1200, nodos, 0.8)
    dibujo('bienes-raices.jpg', 1400, 1000, edificios, 0.7)
    dibujo('refinacion.jpg', 1400, 1000, tanques, 0.7)
    dibujo('logistica.jpg', 1400, 1000, contenedores, 0.7)
    dibujo('aeronaves.jpg', 1400, 1000, aeronave, 0.7)
    dibujo('construccion.jpg', 1400, 1000, grua, 0.7)
    dibujo('contacto.jpg', 1600, 1100, skyline, 0.8)
