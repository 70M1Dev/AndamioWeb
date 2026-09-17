import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import Cursor from '@/components/efectos/Cursor';
import SmoothScroll from '@/components/efectos/SmoothScroll';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-outfit' });

const titulo = 'Andamio Web — Construimos la web de tu negocio';

export const metadata: Metadata = {
  metadataBase: new URL('https://andamioweb.com'),
  title: titulo,
  description: 'Páginas web, webs institucionales y tiendas online para negocios de Uruguay. Diseño a medida, adaptadas al celular y con WhatsApp integrado.',
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Andamio Web',
    url: '/',
    title: titulo,
    description: 'Landings, webs institucionales y tiendas online para negocios de Uruguay. Rápidas, pensadas para el celular y conectadas a tu WhatsApp.',
    locale: 'es_UY',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0A0F18' };

// Decide antes del primer pintado si se muestra la intro (una vez por sesión).
const scriptIntro = `try{if(sessionStorage.getItem('intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('sin-intro')}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-UY" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptIntro }} />
      </head>
      <body className="grain bg-ink-950 font-sans text-ink-900 antialiased">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
