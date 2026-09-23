'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import IconoWhatsApp from '../IconoWhatsApp';
import Magnetico from '../efectos/Magnetico';
import { WA_BOCETO } from '@/lib/datos';

// Andamio dibujado en SVG que se arma con el scroll, detrás del llamado final.
const LINEAS = [
  'M80 400V40', 'M280 400V40', 'M480 400V40', 'M680 400V40', 'M880 400V40', 'M1080 400V40',
  'M80 120H1080', 'M80 240H1080', 'M80 360H1080',
  'M80 120L280 240', 'M280 240L480 120', 'M480 120L680 240', 'M680 240L880 120', 'M880 120L1080 240',
  'M80 360L280 240', 'M480 240L680 360', 'M880 240L1080 360',
];

export default function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const trazo = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const escala = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radio = useTransform(scrollYProgress, [0, 1], ['6rem', '2rem']);

  return (
    <section ref={ref} className="bg-paper px-4 pb-24 sm:px-6">
      <motion.div
        style={{ scale: escala, borderRadius: radio }}
        className="relative mx-auto max-w-6xl overflow-hidden bg-beam-500 px-6 py-20 text-center text-ink-900 md:py-28"
      >
        <svg aria-hidden="true" viewBox="0 0 1160 440" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-25">
          {LINEAS.map(d => (
            <motion.path key={d} d={d} stroke="#101826" strokeWidth="6" strokeLinecap="round" fill="none" style={{ pathLength: trazo }} />
          ))}
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F5B400_30%,transparent_75%)]" />

        <div className="relative">
          <motion.h2
            className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            ¿Empezamos a construir tu web?
          </motion.h2>
          <p className="mt-5 text-lg text-ink-800/80">Contanos tu idea y en 48 horas te mostramos un boceto gratis, sin compromiso.</p>
          <Magnetico className="mt-10 inline-block" fuerza={0.5}>
            <a
              href={WA_BOCETO}
              target="_blank"
              rel="noopener"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink-900 px-9 py-5 text-lg font-semibold text-white shadow-2xl shadow-ink-900/40"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#1FAF38] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <IconoWhatsApp className="relative h-6 w-6" />
              <span className="relative">Pedir boceto gratis por WhatsApp</span>
            </a>
          </Magnetico>
        </div>
      </motion.div>
    </section>
  );
}
