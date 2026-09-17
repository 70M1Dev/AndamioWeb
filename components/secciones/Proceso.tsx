'use client';

import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { PROCESO } from '@/lib/datos';

// En pantallas grandes la sección se "clava" y los pasos pasan de costado
// mientras un caño amarillo avanza por abajo. En celular es una línea vertical.

function Paso({ i, titulo, texto, progreso }: { i: number; titulo: string; texto: string; progreso: MotionValue<number> }) {
  const centro = i / (PROCESO.length - 1);
  const activo = useTransform(progreso, [centro - 0.25, centro, centro + 0.25], [0.35, 1, 0.35]);
  const escala = useTransform(progreso, [centro - 0.25, centro, centro + 0.25], [0.92, 1, 0.92]);
  return (
    <motion.li style={{ opacity: activo, scale: escala }} className="relative w-[26rem] shrink-0 rounded-[2rem] border border-white/10 bg-ink-800/60 p-10 backdrop-blur">
      <p className="text-shine animate-shine text-8xl font-extrabold leading-none tracking-tighter">{String(i + 1).padStart(2, '0')}</p>
      <h3 className="mt-6 text-3xl font-bold">{titulo}</h3>
      <p className="mt-3 text-lg leading-relaxed text-white/65">{texto}</p>
    </motion.li>
  );
}

export default function Proceso() {
  const ref = useRef<HTMLDivElement>(null);
  const pista = useRef<HTMLOListElement>(null);
  const [recorrido, setRecorrido] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progreso = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const x = useTransform(progreso, v => -v * recorrido);
  const barra = useTransform(progreso, [0, 1], ['0%', '100%']);

  useLayoutEffect(() => {
    const medir = () => {
      if (pista.current) setRecorrido(Math.max(pista.current.scrollWidth - innerWidth + 96, 0));
    };
    medir();
    addEventListener('resize', medir);
    return () => removeEventListener('resize', medir);
  }, []);

  return (
    <section id="proceso" className="relative bg-ink-950 text-white">
      {/* Escritorio: scroll horizontal clavado */}
      <div ref={ref} className="relative hidden h-[400vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div aria-hidden="true" className="scaffold-bg absolute inset-0 opacity-60" />
          <div className="relative mx-auto mb-12 w-full max-w-6xl px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-400">Proceso</p>
            <h2 className="mt-3 text-6xl font-extrabold tracking-tight">Cómo trabajamos</h2>
          </div>
          <motion.ol ref={pista} style={{ x }} className="relative flex gap-8 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-12">
            {PROCESO.map((p, i) => <Paso key={p.titulo} i={i} progreso={progreso} {...p} />)}
          </motion.ol>
          <div className="relative mx-auto mt-14 w-full max-w-6xl px-6">
            <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div style={{ width: barra }} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-beam-600 to-beam-400 shadow-[0_0_20px] shadow-beam-500" />
            </div>
            <div className="mt-3 flex justify-between text-xs uppercase tracking-widest text-white/40">
              {PROCESO.map(p => <span key={p.titulo}>{p.titulo}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Celular y tablet: línea de tiempo vertical */}
      <MovilProceso />
    </section>
  );
}

function MovilProceso() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const alto = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), { stiffness: 100, damping: 30 });

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:hidden">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-400">Proceso</p>
      <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Cómo trabajamos</h2>
      <div className="relative mt-12">
        <div aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-0.5 bg-white/10">
          <motion.div style={{ height: alto }} className="w-full bg-beam-500 shadow-[0_0_12px] shadow-beam-500" />
        </div>
        <ol ref={ref} className="space-y-10 pl-12">
          {PROCESO.map((p, i) => (
            <motion.li
              key={p.titulo}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-beam-500 text-xs font-extrabold text-ink-900 ring-4 ring-ink-950">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold">{p.titulo}</h3>
              <p className="mt-1 text-white/65">{p.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
