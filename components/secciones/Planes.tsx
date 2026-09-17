'use client';

import { motion } from 'motion/react';
import Inclinable from '../efectos/Inclinable';
import Reveal from '../efectos/Reveal';
import { AGREGADOS, FACTORES, PLANES, wa, type Plan } from '@/lib/datos';

function Tarjeta({ plan }: { plan: Plan }) {
  const d = plan.destacado;
  const contenido = (
    <article
      className={`relative flex h-full flex-col rounded-[1.4rem] p-8 ${
        d ? 'bg-ink-900 text-white' : 'border border-neutral-200 bg-white text-ink-900 shadow-sm'
      }`}
    >
      <h3 className="text-2xl font-bold">{plan.nombre}</h3>
      <p className={`mt-1 text-sm ${d ? 'text-white/65' : 'text-neutral-600'}`}>{plan.bajada}</p>
      <p className="mt-7">
        <span className={`text-4xl font-extrabold tracking-tight ${d ? 'text-beam-500' : ''}`}>A medida</span>
        <br />
        <span className={`text-sm ${d ? 'text-white/55' : 'text-neutral-500'}`}>
          Presupuesto según diseño, tecnología y visuales
        </span>
      </p>
      <ul className="mt-7 flex-1 space-y-2.5 text-sm">
        {plan.items.map((item, i) => (
          <motion.li
            key={item}
            className="flex gap-2.5"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.07 }}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${d ? 'bg-beam-500 text-ink-900' : 'bg-ink-900 text-beam-400'}`}>✓</span>
            {item}
          </motion.li>
        ))}
      </ul>
      <a
        href={wa(`¡Hola! Me interesa el plan ${plan.nombre} de Andamio Web. ¿Me pasan un presupuesto?`)}
        target="_blank"
        rel="noopener"
        className={`group/btn relative mt-9 block overflow-hidden rounded-full px-6 py-3.5 text-center font-semibold transition ${
          d ? 'bg-beam-500 text-ink-900 hover:bg-beam-400' : 'bg-ink-900 text-white hover:bg-ink-700'
        }`}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          Pedir presupuesto
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </span>
      </a>
    </article>
  );

  if (!d) return <Inclinable className="h-full rounded-[1.4rem]">{contenido}</Inclinable>;

  // El destacado lleva un borde de luz que gira alrededor.
  return (
    <Inclinable className="h-full rounded-[1.5rem] md:-translate-y-4">
      <div className="relative h-full overflow-hidden rounded-[1.5rem] p-[2px] shadow-2xl shadow-beam-500/25">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#F5B400_60deg,#FFF1C2_90deg,transparent_140deg,transparent_220deg,#F5B400_280deg,transparent_340deg)]"
        />
        <div className="relative h-full">{contenido}</div>
      </div>
      {/* Fuera del contenedor recortado para que no se corte */}
      <span className="absolute -top-3.5 left-8 z-10 rounded-full bg-beam-500 px-3 py-1 text-xs font-bold text-ink-900 shadow-lg shadow-beam-500/40">
        Más elegido
      </span>
    </Inclinable>
  );
}

export default function Planes() {
  return (
    <section id="planes" className="relative overflow-hidden bg-paper py-28 text-ink-900">
      <div aria-hidden="true" className="absolute left-1/2 top-40 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-beam-400/20 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-600">Planes</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">Elegí tu base.</h2>
          <p className="mt-4 text-lg text-neutral-600">La ajustamos a lo que necesitás y te pasamos un presupuesto a medida.</p>
        </Reveal>

        <div className="grid items-stretch gap-7 md:grid-cols-3">
          {PLANES.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 0.12} y={80} className="h-full">
              <Tarjeta plan={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="text-center text-2xl font-bold">¿De qué depende el presupuesto?</h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-neutral-600">
            Cada web es distinta. Escribinos y lo estimamos juntos según estos puntos.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FACTORES.map((f, i) => (
              <div key={f.titulo} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-beam-600">0{i + 1}</span>
                <h4 className="mt-1 text-lg font-bold">{f.titulo}</h4>
                <p className="mt-2 text-sm text-neutral-600">{f.texto}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 rounded-[1.75rem] border border-dashed border-beam-600/50 bg-white/60 p-8 backdrop-blur">
          <h3 className="text-lg font-bold">
            Agregados <span className="text-sm font-medium text-neutral-500">· costo extra, se cotizan según el proyecto</span>
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {AGREGADOS.map((a, i) => (
              <motion.li
                key={a}
                className="cursor-default rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm transition-colors hover:border-beam-500 hover:bg-beam-500 hover:text-ink-900"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
              >
                + {a}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
