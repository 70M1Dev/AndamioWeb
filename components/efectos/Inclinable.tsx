'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

// Tarjeta que se inclina en 3D siguiendo al mouse, con un reflejo encima.
export default function Inclinable({ children, className = '', grados = 10 }: { children: ReactNode; className?: string; grados?: number }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [grados, -grados]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-grados, grados]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, v => `${v * 100}%`);
  const gy = useTransform(py, v => `${v * 100}%`);
  const reflejo = useMotionTemplate`radial-gradient(500px circle at ${gx} ${gy}, rgba(255,255,255,.14), transparent 40%)`;

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={e => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
      className={`group relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ background: reflejo }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}
