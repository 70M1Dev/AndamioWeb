'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import Reveal from '../efectos/Reveal';
import { FAQ } from '@/lib/datos';

export default function Faq() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-28 text-ink-900">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-600">Preguntas</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">Lo que siempre nos preguntan.</h2>
        </Reveal>

        <div className="space-y-3">
          {FAQ.map((f, i) => {
            const open = abierta === i;
            return (
              <Reveal key={f.p} delay={i * 0.05} y={24}>
                <div className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${open ? 'border-ink-900 bg-ink-900 text-white' : 'border-neutral-200 bg-white hover:border-neutral-400'}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setAbierta(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-semibold"
                    >
                      {f.p}
                      <motion.span
                        animate={{ rotate: open ? 135 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none ${open ? 'bg-beam-500 text-ink-900' : 'bg-neutral-100 text-beam-600'}`}
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-white/70">{f.r}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
