'use client';

import { useRef, type ReactNode } from 'react';

// Tarjeta con un halo que sigue al cursor, en el fondo y en el borde.
export default function Spotlight({ children, className = '', color = '245 180 0' }: { children: ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={e => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty('--sx', `${e.clientX - r.left}px`);
        ref.current!.style.setProperty('--sy', `${e.clientY - r.top}px`);
      }}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--sx) var(--sy), rgb(${color} / .16), transparent 45%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: 1,
          background: `radial-gradient(260px circle at var(--sx) var(--sy), rgb(${color} / .9), transparent 60%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  );
}
