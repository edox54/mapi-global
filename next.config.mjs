/** @type {import('next').NextConfig} */
// ponytail: export estático servido por un Express propio (server.js) — el
// runtime completo de Next.js (next start / servidor custom con next()) se
// probó en este hosting y su uso interno de fetch/undici revienta con
// "WebAssembly.instantiate(): Out of memory" bajo Passenger. Mismo patrón
// que ya funciona en el hosting de Colmedikal.
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Sin esto, `next build` lanza workers en paralelo y revienta con EAGAIN
  // en cuentas cPanel con límite bajo de procesos (CageFS).
  experimental: { cpus: 1, workerThreads: false },
};

export default nextConfig;
