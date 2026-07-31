/** @type {import('next').NextConfig} */
// ponytail: static export — cPanel compartido sirve `out/` como HTML plano, sin Node.
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
