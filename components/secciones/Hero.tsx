'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import IconoWhatsApp from '../IconoWhatsApp';
import Magnetico from '../efectos/Magnetico';
import { DURACION_INTRO, hayIntro } from '../efectos/Intro';
import { WA_BOCETO } from '@/lib/datos';
import { esLiviano } from '@/lib/dispositivo';
import { irA } from '@/lib/scroll';

const EscenaAndamio = dynamic(() => import('../efectos/EscenaAndamio'), { ssr: false });

const TITULO = ['Construimos', 'la', 'web', 'de', 'tu', 'negocio.'];

// Retraso de cada entrada, sumado a --base (ver .hero-entra en globals.css).
const retraso = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

// Andamio estático para celular, en lugar de la escena 3D.
const TRAZOS = ['M40 300V20', 'M160 300V20', 'M280 300V20', 'M40 100H280', 'M40 200H280', 'M40 100L160 200', 'M160 200L280 100', 'M40 300L160 200', 'M160 100L280 200'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const luz = useRef<HTMLDivElement>(null);
  // Si hay intro, la escena 3D espera a que suba la cortina.
  const [base] = useState(() => (hayIntro() ? DURACION_INTRO - 0.2 : 0.1));
  // 'movil': andamio estático. '3d': la escena, que se carga recién cuando el
  // navegador queda libre (con intro se carga ya: la cortina tapa el tirón).
  const [modo, setModo] = useState<'espera' | 'movil' | '3d'>('espera');
  // La escena cuenta su tiempo desde que se monta: si llega tarde, no espera.
  const [inicioEscena, setInicioEscena] = useState(base);
  useEffect(() => {
    if (esLiviano()) { setModo('movil'); return; }
    const cargar = () => {
      setInicioEscena(Math.max(0, base - performance.now() / 1000));
      setModo('3d');
    };
    if (hayIntro()) { cargar(); return; }
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(cargar, { timeout: 1500 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(cargar, 800);
    return () => clearTimeout(t);
  }, [base]);

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

      {/* Escena 3D en escritorio; en celular, el andamio dibujado */}
      {modo === '3d' && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: inicioEscena }}
        >
          <EscenaAndamio inicio={inicioEscena} />
        </motion.div>
      )}
      {modo === 'movil' && (
        <svg aria-hidden="true" viewBox="0 0 320 320" className="absolute -right-16 top-24 -z-10 w-[26rem] opacity-25">
          {TRAZOS.map(d => (
            <path key={d} d={d} stroke="#F5B400" strokeWidth="5" strokeLinecap="round" fill="none" />
          ))}
        </svg>
      )}
      {/* En celular el texto va sobre el 3D: un velo lo hace legible */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/30 via-ink-950/60 to-ink-950 md:bg-gradient-to-r md:from-ink-950 md:via-ink-950/50 md:to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <motion.div style={{ y: yTexto, opacity: opacidad }} className="mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6">
        <div className="max-w-2xl">
          {/* Las entradas del texto son CSS (.hero-entra): arrancan con el
              primer pintado, sin esperar a que cargue el JavaScript. */}
          <p
            className="hero-entra mb-6 inline-flex items-center gap-2 rounded-full border border-beam-500/40 bg-beam-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-beam-400 backdrop-blur"
            style={retraso(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-beam-500" />
            </span>
            Diseño web en Uruguay
          </p>

          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {TITULO.map((palabra, i) => (
              <span key={i} className="-mb-[0.12em] mr-[0.22em] inline-block overflow-hidden pb-[0.16em] align-bottom">
                <span className="hero-palabra inline-block" style={retraso(0.15 + i * 0.08)}>
                  <span className={palabra === 'negocio.' ? 'text-shine animate-shine' : undefined}>{palabra}</span>
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-entra hero-desenfoque mt-7 max-w-lg text-lg text-white/70 md:text-xl" style={retraso(0.7)}>
            Landings empresariales, tiendas online y webs con reservas, hechas a medida. Rápidas, pensadas para el celular y conectadas a tu WhatsApp.
          </p>

          <div className="hero-entra mt-10 flex flex-col gap-3 sm:flex-row" style={retraso(0.9)}>
            <Magnetico className="block">
              <a
                href={WA_BOCETO}
                target="_blank"
                rel="noopener"
                className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-beam-500 px-8 py-4 text-center font-semibold text-ink-900 shadow-[0_0_40px_-8px] shadow-beam-500"
              >
                <IconoWhatsApp className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Pedir boceto gratis en 48 h</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </Magnetico>
            <Magnetico className="block">
              <a
                href="#demo"
                onClick={e => { if (irA('demo')) e.preventDefault(); }}
                className="block rounded-full border border-white/20 bg-white/5 px-8 py-4 text-center font-semibold backdrop-blur transition hover:border-white/60 hover:bg-white/10"
              >
                Ver la demo
              </a>
            </Magnetico>
          </div>
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
