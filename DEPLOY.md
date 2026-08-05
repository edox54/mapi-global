# Deploy — MAPI GLOBAL

## Arquitectura

Hosting: cPanel compartido (CloudLinux/Passenger), dominio `mapiglobal.us`, usuario `mapiglobal`.

El sitio es un **export estático de Next.js** (`out/`) servido por un **Express propio** (`server.js`). El runtime completo de Next.js (`next start` o un servidor custom con `next()`) **no se usa en producción** — se probó y revienta con:

```
RangeError: WebAssembly.instantiate(): Out of memory: Cannot allocate Wasm memory for new instance
    at lazyllhttp (node:internal/deps/undici/undici:...)
```

Esto pasa porque el runtime de Next.js usa `fetch`/`undici` internamente, y en este hosting (vía Apache/Passenger específicamente — el límite de memoria de la *cuenta* cPanel no es el problema, se confirmó con "Resource Usage" en 1GB con 0 faults) esa instanciación de WASM falla apenas Passenger arranca el proceso. Correr el mismo código a mano por SSH (`node server.js` directo) SÍ funciona — el límite lo aplica Apache/Passenger al proceso hijo, no la cuenta.

`server.js` evita el problema por completo: nunca ejecuta el runtime de Next, solo sirve archivos ya generados con Express (`express.static`) y atiende `/api/contacto` con nodemailer directamente. Mismo patrón que corre bien en el hosting de Colmedikal (`colmed-website-2026`).

**No volver a intentar** `output: 'export'` quitado + `next()`/`next start` en este hosting sin resolver antes el límite de Apache/Passenger con el proveedor.

## Variables de entorno (cPanel → Setup Node.js App → Environment Variables)

| Variable | Valor |
|---|---|
| `SMTP_HOST` | host SMTP del hosting |
| `SMTP_PORT` | `587` (o `465` si es SSL) |
| `SMTP_USER` | `contacto@mapiglobal.us` |
| `SMTP_PASS` | contraseña de esa casilla |
| `MAIL_TO` | `contacto@mapiglobal.us` |

## Configuración de la app Node en cPanel

- Node.js version: 22
- Application root: `mapi-global`
- Application URL: `mapiglobal.us`
- Application startup file: `server.js`

## Deploy inicial

```bash
cd ~
git clone https://github.com/edox54/mapi-global.git
# (o dejar que cPanel lo clone vía Git Version Control al crear la app)
source /home/mapiglobal/nodevenv/mapi-global/22/bin/activate
cd mapi-global
npm install
npm run build
touch tmp/restart.txt
```

## Actualizar (cada cambio)

```bash
source /home/mapiglobal/nodevenv/mapi-global/22/bin/activate
cd /home/mapiglobal/mapi-global
git pull
npm install
npm run build
touch tmp/restart.txt
```

El `source` no persiste entre sesiones de terminal — hay que correrlo de nuevo cada vez que se abre una terminal nueva.

## Troubleshooting

**Build falla con `EAGAIN` en "Collecting page data"**
Hosting compartido limita procesos por cuenta (CageFS) y `next build` lanza workers en paralelo. Ya resuelto en `next.config.mjs` con `experimental: { cpus: 1, workerThreads: false }` — no quitar esa línea.

**503 al cargar el sitio**
Revisar el log real del proceso (la ruta exacta puede variar, buscarla con `find`):
```bash
find /home/mapiglobal -iname "stderr.log"
tail -50 /home/mapiglobal/mapi-global/stderr.log
```
Si dice `WebAssembly.instantiate(): Out of memory` → algo volvió a levantar el runtime de Next.js (revisar que `server.js` siga siendo Express + `output:'export'` en `next.config.mjs`, no un `next()`/`next start`).

**Formulario de contacto no envía**
Confirmar que las 5 variables de entorno SMTP estén configuradas en cPanel y que se haya hecho `restart` después de agregarlas (las variables de entorno no se aplican en caliente).

**Probar `server.js` a mano** (para ver errores reales sin pasar por Passenger):
```bash
source /home/mapiglobal/nodevenv/mapi-global/22/bin/activate
cd /home/mapiglobal/mapi-global
PORT=3000 node server.js
```
