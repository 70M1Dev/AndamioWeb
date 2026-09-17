'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import Magnetico from '../efectos/Magnetico';
import { DURACION_INTRO, hayIntro } from '../efectos/Intro';
import { irA } from '@/lib/scroll';

const EscenaAndamio = dynamic(() => import('../efectos/EscenaAndamio'), { ssr: false });

const TITULO = ['Construimos', 'la', 'web', 'de', 'tu', 'negocio.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const luz = useRef<HTMLDivElement>(null);
  // Si hay intro, todo espera a que suba la cortina.
  const [base] = useState(() => (hayIntro() ? DURACION_INTRO - 0.2 : 0.1));

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacidad = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 text-white"
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        luz.current?.style.setProperty('--x', `${e.clientX - r.left}px`);
        luz.current?.style.setProperty('--y', `${e.clientY - r.top}px`);
      }}
    >
      {/* Trama de andamio tenue + una más brillante que sigue al mouse */}
      <div aria-hidden="true" className="scaffold-bg absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        ref={luz}
        aria-hidden="true"
        className="absolute inset-0 -z-20 [--x:50%] [--y:40%]"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgb(245 180 0 / .35) 1px, transparent 1px), linear-gradient(rgb(245 180 0 / .35) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(260px circle at var(--x) var(--y), black, transparent)',
          WebkitMaskImage: 'radial-gradient(260px circle at var(--x) var(--y), black, transparent)',
        }}
      />
      {/* Auras de color (solo escritorio: en celular son caras de componer) */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-10 -z-20 hidden h-[36rem] w-[36rem] rounded-full bg-beam-500/15 blur-[120px] md:block"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-40 right-0 -z-20 hidden h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-[120px] md:block"
        animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Escena 3D */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: base }}
      >
        <EscenaAndamio inicio={base} />
      </motion.div>
      {/* En celular el texto va sobre el 3D: un velo lo hace legible */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/30 via-ink-950/60 to-ink-950 md:bg-gradient-to-r md:from-ink-950 md:via-ink-950/50 md:to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <motion.div style={{ y: yTexto, opacity: opacidad }} className="mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6">
        <div className="max-w-2xl">
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-beam-500/40 bg-beam-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-beam-400 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: base }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-beam-500" />
            </span>
            Diseño web en Uruguay
          </motion.p>

          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {TITULO.map((palabra, i) => (
              <span key={i} className="-mb-[0.12em] mr-[0.22em] inline-block overflow-hidden pb-[0.16em] align-bottom">
                <motion.span
                  className={`inline-block ${palabra === 'negocio.' ? 'text-shine animate-shine' : ''}`}
                  initial={{ y: '110%', rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: base + 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {palabra}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-lg text-lg text-white/70 md:text-xl"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: base + 0.7 }}
          >
            Landings, webs institucionales y tiendas online hechas a medida. Rápidas, pensadas para el celular y conectadas a tu WhatsApp.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: base + 0.9 }}
          >
            <Magnetico className="block">
              <a
                href="#planes"
                onClick={e => { if (irA('planes')) e.preventDefault(); }}
                className="group relative block overflow-hidden rounded-full bg-beam-500 px-8 py-4 text-center font-semibold text-ink-900 shadow-[0_0_40px_-8px] shadow-beam-500"
              >
                <span className="relative z-10">Ver planes</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </Magnetico>
            <Magnetico className="block">
              <a
                href="#caso"
                onClick={e => { if (irA('caso')) e.preventDefault(); }}
                className="block rounded-full border border-white/20 bg-white/5 px-8 py-4 text-center font-semibold backdrop-blur transition hover:border-white/60 hover:bg-white/10"
              >
                Ver un caso real
              </a>
            </Magnetico>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1.6 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-beam-500"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
