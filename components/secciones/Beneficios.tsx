'use client';

import { motion } from 'motion/react';
import Spotlight from '../efectos/Spotlight';
import { BENEFICIOS } from '@/lib/datos';

export default function Beneficios() {
  return (
    <section className="relative bg-ink-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-24 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {BENEFICIOS.map((b, i) => (
          <motion.div
            key={b.titulo}
            initial={{ opacity: 0, y: 60, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 800 }}
          >
            <Spotlight className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <motion.p
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-3xl ring-1 ring-white/10"
                whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.15 }}
                transition={{ duration: 0.6 }}
              >
                {b.icono}
              </motion.p>
              <h3 className="mb-2 text-lg font-semibold">{b.titulo}</h3>
              <p className="text-sm leading-relaxed text-white/60">{b.texto}</p>
            </Spotlight>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
