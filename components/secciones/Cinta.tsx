'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { CINTA } from '@/lib/datos';

// Dos cintas cruzadas que corren en sentidos opuestos y se inclinan con el scroll.
export default function Cinta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const giro = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const giro2 = useTransform(scrollYProgress, [0, 1], [3, -2]);
  const items = [...CINTA, ...CINTA];

  return (
    <div ref={ref} aria-hidden="true" className="relative z-10 -my-10 overflow-hidden py-16">
      <motion.div style={{ rotate: giro2 }} className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 bg-ink-800 py-3 opacity-60">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap [animation-direction:reverse]">
          {items.map((t, i) => (
            <span key={i} className="text-lg font-bold uppercase tracking-wider text-white/40">{t}</span>
          ))}
        </div>
      </motion.div>
      <motion.div style={{ rotate: giro }} className="relative inset-x-[-5%] w-[110%] bg-beam-500 py-4 shadow-2xl shadow-beam-500/20">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-2xl font-extrabold uppercase tracking-tight text-ink-900">
              {t}
              <svg viewBox="0 0 20 20" className="h-5 w-5"><path d="M4 16V4M16 16V4M4 7h12M4 13h12M4 7l12 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" /></svg>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
