'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

const pesos = (n: number) => '$ ' + Math.round(n).toLocaleString('es-UY');

// Número que cuenta desde 0 al entrar en pantalla. El HTML ya trae el valor
// final, así que sin JavaScript (o para buscadores) se ve el precio correcto.
export default function Contador({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const el = ref.current!;
    if (!visto) {
      if (el.getBoundingClientRect().top > innerHeight) el.textContent = pesos(0);
      return;
    }
    const control = animate(0, valor, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => { el.textContent = pesos(Math.round(v / 10) * 10); },
    });
    return () => control.stop();
  }, [visto, valor]);

  return <span ref={ref} className="tabular-nums">{pesos(valor)}</span>;
}
