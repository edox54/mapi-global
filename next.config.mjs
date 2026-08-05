/** @type {import('next').NextConfig} */
const nextConfig = {
  // ponytail: hosting compartido limita procesos por cuenta (CageFS); sin
  // esto el build lanza workers en paralelo y revienta con EAGAIN.
  experimental: { cpus: 1, workerThreads: false },
};

export default nextConfig;
