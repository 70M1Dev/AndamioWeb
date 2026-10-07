'use client';

import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Magnetico from '../efectos/Magnetico';
import Reveal from '../efectos/Reveal';
import { CASOS, type Caso } from '@/lib/datos';
import { reduceMotion } from '@/lib/scroll';

// Las capturas de cada trabajo van en una ventana de navegador, con el celular
// asomando por delante. Pasan solas mientras están a la vista; cuando la
// persona elige una, quedan quietas.
function Vitrina({ caso }: { caso: Caso }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '-15% 0px' });
  const [activa, setActiva] = useState(0);
  const [elegida, setElegida] = useState(false);

  useEffect(() => {
    if (!visible || elegida || reduceMotion()) return;
    const t = setInterval(() => setActiva(a => (a + 1) % caso.capturas.length), 4500);
    return () => clearInterval(t);
  }, [visible, elegida, caso.capturas.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const suave = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const yCelular = useTransform(suave, [0, 1], [36, -36]);

  return (
    <div ref={ref}>
      <div className="relative rounded-[1.75rem] p-4 pb-9 sm:p-7 sm:pb-12 md:rounded-[2rem]" style={{ backgroundColor: caso.fondo }}>
        <div aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_15%,#fff9,transparent_60%)]" />

        <div className="relative mr-[10%] overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/25 ring-1 ring-black/10 md:rounded-2xl">
          <div aria-hidden="true" className="flex h-7 items-center gap-1.5 bg-ink-900 px-3 md:h-9 md:px-3.5">
            {['#F87171', '#F5B400', '#4ADE80'].map(c => (
              <span key={c} className="h-2 w-2 rounded-full md:h-2.5 md:w-2.5" style={{ backgroundColor: c }} />
            ))}
            <span className="ml-2 flex-1 truncate rounded-full bg-white/10 px-3 py-1 text-[10px] leading-none text-white/60 md:ml-3 md:text-[11px]">{caso.barra}</span>
          </div>
          <div className="relative" style={{ aspectRatio: caso.proporcion }}>
            {caso.capturas.map((c, i) => (
              <img
                key={c.src}
                src={c.src}
                alt={c.alt}
                aria-hidden={i !== activa}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${i === activa ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: yCelular }}
          className="absolute bottom-[-4%] right-[3.5%] w-[23%] rounded-[1.1rem] bg-ink-900 p-[5px] shadow-2xl shadow-black/40 ring-1 ring-white/10 md:rounded-[1.7rem] md:p-2"
        >
          <img
            src={caso.celular.src}
            alt={caso.celular.alt}
            width={caso.celular.ancho}
            height={caso.celular.alto}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full rounded-[0.8rem] md:rounded-[1.25rem]"
          />
        </motion.div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {caso.capturas.map((c, i) => (
          <button
            key={c.src}
            type="button"
            aria-pressed={i === activa}
            onClick={() => { setActiva(i); setElegida(true); }}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              i === activa ? 'border-ink-900 bg-ink-900 text-white' : 'border-neutral-300 bg-white text-neutral-700 hover:border-ink-900'
            }`}
          >
            {c.nombre}
          </button>
        ))}
        <span className="w-full text-xs text-neutral-500 sm:ml-auto sm:w-auto">{caso.nota}</span>
      </div>
    </div>
  );
}

// En pantallas grandes los casos se alternan: texto a la izquierda en uno y a
// la derecha en el siguiente. En celular la vitrina va siempre primero.
function Bloque({ caso, invertido }: { caso: Caso; invertido: boolean }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
      <div className={invertido ? 'md:order-2' : undefined}>
        <Reveal>
          <p className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-ink-900 px-3 py-1 font-semibold text-white">{caso.tipo}</span>
            <span className="rounded-full border border-neutral-300 px-3 py-1 text-neutral-600">{caso.rubro}</span>
          </p>
          <h3 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">{caso.nombre}</h3>
          <p className="mt-4 text-lg text-neutral-600">{caso.texto}</p>
        </Reveal>
        <ul className="mt-7 space-y-3.5">
          {caso.puntos.map((punto, i) => (
            <motion.li
              key={punto}
              className="flex gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-beam-500 text-ink-900">
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
              </span>
              <span>{punto}</span>
            </motion.li>
          ))}
        </ul>
        {caso.enlace && (
          <Reveal delay={0.2}>
            <Magnetico className="mt-9 inline-block">
              <a
                href={caso.enlace.href}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-4 font-semibold text-white transition hover:bg-ink-700"
              >
                {caso.enlace.texto}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </Magnetico>
          </Reveal>
        )}
      </div>

      <Reveal className={invertido ? 'order-first' : 'order-first md:order-none'}>
        <Vitrina caso={caso} />
      </Reveal>
    </div>
  );
}

export default function Casos() {
  return (
    <section id="caso" className="relative overflow-hidden bg-paper py-24 text-ink-900 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-600">Casos</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">Trabajos que ya están funcionando.</h2>
        </Reveal>

        <div className="mt-12 space-y-20 md:mt-20 md:space-y-28">
          {CASOS.map((caso, i) => (
            <Bloque key={caso.nombre} caso={caso} invertido={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
