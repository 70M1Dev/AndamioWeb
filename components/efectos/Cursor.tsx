'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

// Anillo que sigue al mouse y se llena sobre links y botones.
// Es decorativo: el cursor del sistema sigue visible.
export default function Cursor() {
  const [activo, setActivo] = useState(false);
  const [sobreLink, setSobreLink] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setActivo(true);
    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setSobreLink(Boolean((e.target as Element).closest?.('a, button, summary, [data-cursor]')));
    };
    addEventListener('pointermove', mover);
    return () => removeEventListener('pointermove', mover);
  }, [x, y]);

  if (!activo) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-beam-500 mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      initial={false}
      animate={{
        width: sobreLink ? 56 : 22,
        height: sobreLink ? 56 : 22,
        backgroundColor: sobreLink ? 'rgba(245,180,0,1)' : 'rgba(245,180,0,0)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  );
}
