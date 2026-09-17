import type Lenis from 'lenis';

// La instancia de Lenis vive acá para que la navbar pueda usarla sin contexto.
let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { lenis = l; };

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lleva a un ancla de la home descontando la navbar fija.
export function irA(id: string) {
  const destino = document.getElementById(id);
  if (!destino) return false;
  if (lenis) lenis.scrollTo(destino, { offset: -80, duration: 1.4 });
  else destino.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', '#' + id);
  return true;
}
