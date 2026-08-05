"""Genera placeholders neutros (gris/plata claro) para las zonas de fotografía
del sitio. A diferencia de scripts/generar-imagenes.py (gráficos ilustrados),
estos son deliberadamente vacíos: un degradado suave, sin ilustración, para
que se lean como "espacio para foto real" y no como arte terminado.

Uso: python3 scripts/generar-placeholders.py
Reemplazo: sobrescribir el archivo en public/img/ con la fotografía real,
manteniendo el mismo nombre — el resto del sitio no necesita cambios.
"""
from PIL import Image, ImageDraw, ImageFilter
import random

BASE = (238, 241, 244)      # gris muy claro
BASE2 = (223, 228, 233)     # gris algo más marcado, para el degradado
LINEA = (255, 255, 255)
OUT = 'public/img/'

random.seed(11)


def placeholder(nombre, w, h):
    im = Image.new('RGB', (w, h), BASE)
    d = ImageDraw.Draw(im)
    # degradado diagonal muy suave, gris a gris-plata
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)], fill=tuple(round(BASE[i] + (BASE2[i] - BASE[i]) * t) for i in range(3)))
    # rejilla apenas visible, para dar sensación de "boceto" sin ser un gráfico
    paso = max(w, h) // 22
    rejilla = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rejilla)
    for x in range(0, w, paso):
        rd.line([(x, 0), (x, h)], fill=(255, 255, 255, 90), width=1)
    for y in range(0, h, paso):
        rd.line([(0, y), (w, y)], fill=(255, 255, 255, 90), width=1)
    im = Image.alpha_composite(im.convert('RGBA'), rejilla).convert('RGB')
    # viñeta suave plateada en una esquina, para que no quede totalmente plano
    brillo = Image.new('L', (w, h), 0)
    ImageDraw.Draw(brillo).ellipse([w * 0.55, -h * 0.3, w * 1.35, h * 0.55], fill=70)
    brillo = brillo.filter(ImageFilter.GaussianBlur(w // 8))
    claro = Image.new('RGB', (w, h), (250, 251, 252))
    im = Image.composite(claro, im, brillo)
    im.save(OUT + nombre, quality=90, optimize=True)
    print(nombre, im.size)


if __name__ == '__main__':
    import os
    os.makedirs(OUT, exist_ok=True)
    for nombre, w, h in [
        ('hero.jpg', 1600, 1600),
        ('holding.jpg', 1200, 1600),
        ('bienes-raices.jpg', 1400, 1000),
        ('refinacion.jpg', 1400, 1000),
        ('logistica.jpg', 1400, 1000),
        ('aeronaves.jpg', 1400, 1000),
        ('construccion.jpg', 1400, 1000),
        ('contacto.jpg', 1600, 1100),
    ]:
        placeholder(nombre, w, h)
