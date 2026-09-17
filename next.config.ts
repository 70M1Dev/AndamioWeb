import type { NextConfig } from 'next';

// Export estático: `next build` deja el sitio entero en out/ y GitHub Pages lo
// sirve tal cual. No hay servidor de Node en ningún lado.
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
