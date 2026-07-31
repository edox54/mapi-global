# MAPI GLOBAL — Sitio corporativo

Sitio institucional multipágina del holding MAPI GLOBAL. Next.js 15 (App Router) con **export
estático**: el resultado es HTML plano, apto para hosting compartido cPanel sin Node.

## Rutas

| Ruta | Contenido |
|------|-----------|
| `/` | Hero, ADN del holding, grid de divisiones, tríada logística, CTA |
| `/nosotros` | Posicionamiento, sello paraguas (diagrama de nodos), valores |
| `/servicios` | Índice de las 5 divisiones |
| `/servicios/bienes-raices` | División de bienes raíces |
| `/servicios/refinacion` | División de refinación |
| `/servicios/logistica` | División de logística + tríada detallada |
| `/servicios/aeronaves` | División de aeronaves |
| `/servicios/construccion` | División de construcción |
| `/contacto` | Formulario (solo UI) y datos institucionales |

Las 5 páginas de servicio se generan desde `lib/servicios.js` con una plantilla única
(`app/servicios/[slug]/page.js`). Para editar textos de una división, se edita ese archivo.

## Datos editables

- `lib/site.js` — correo, teléfono, dirección, horario, URL del sitio.
- `lib/servicios.js` — títulos, descripciones y capacidades de cada división.

## Desarrollo

```bash
npm install
npm run dev
```

## Build y despliegue en cPanel

```bash
npm run build
```

Genera la carpeta `out/`. Subir **el contenido** de `out/` (no la carpeta) a `public_html` por
File Manager o FTP. Incluye `.htaccess` con la página 404 y cabeceras de caché.

No requiere "Setup Node.js App": el sitio es HTML estático.

## Marca

- Azul Marino Institucional `#0F2040` (Pantone 289C) y blanco puro. Gris grafito solo para texto
  secundario.
- Isotipo en `public/isotipo.png` (positivo) y `public/isotipo-blanco.png` (reverso), extraídos del
  archivo original de marca. No distorsionar, rotar ni recolorear.
- Titulares y navegación en mayúsculas con tracking amplio.

## Pendiente

- Conectar el formulario de contacto a un destinatario real (hoy solo muestra un aviso).
- Reemplazar los datos placeholder de `lib/site.js`.
