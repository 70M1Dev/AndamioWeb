// Celulares y tablets (pantalla chica o dedo en vez de mouse): ahí no van la
// intro, la escena 3D ni el scroll suave, que son lo que más pesa al cargar.
// El script del <head> usa la misma consulta antes del primer pintado.
export const CONSULTA_LIVIANO = '(max-width: 767px), (pointer: coarse)';

export const esLiviano = () =>
  typeof window !== 'undefined' && window.matchMedia(CONSULTA_LIVIANO).matches;
