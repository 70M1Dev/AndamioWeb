'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import type { ReactNode } from 'react';

// El elemento se deja atraer por el cursor cuando pasa cerca.
export default function Magnetico({ children, fuerza = 0.35, className = 'inline-block' }: { children: ReactNode; fuerza?: number; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={e => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * fuerza);
        y.set((e.clientY - r.top - r.height / 2) * fuerza);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
