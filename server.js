// Punto de entrada para Passenger (cPanel "Setup Node.js App").
// Passenger espera un archivo que abra el puerto que él mismo asigna vía
// process.env.PORT; Next.js normalmente abre el suyo propio con `next start`,
// así que aquí se arranca a mano contra ese puerto.

// El hosting compartido limita la memoria por proceso (CageFS/LVE); el
// parser HTTP en WebAssembly de undici (usado internamente por Node/Next
// para fetch) no logra reservar memoria contigua ahí y tira
// "RangeError: WebAssembly.instantiate(): Out of memory". Esta variable
// fuerza el parser en JS puro, que no tiene ese requisito.
process.env.UNDICI_NO_WASM_HTTP_PARSER = '1';

const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Listo en el puerto ${port}`);
  });
});
