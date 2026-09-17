'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { reduceMotion, setLenis } from '@/lib/scroll';

export default function SmoothScroll() {
  useEffect(() => {
    if (reduceMotion()) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    setLenis(lenis);
    // Si se entra con #ancla, Lenis arranca arriba: lo llevamos a mano.
    if (location.hash) {
      const destino = document.getElementById(location.hash.slice(1));
      if (destino) setTimeout(() => lenis.scrollTo(destino, { offset: -80, immediate: true }), 50);
    }
    return () => { setLenis(null); lenis.destroy(); };
  }, []);
  return null;
}
