'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Pantalla de entrada: se dibuja el logo y la cortina sube.
// Sale una vez por sesión; el script del <head> la oculta en las siguientes
// (y para quien pidió menos movimiento) antes de que se pinte nada.
export const DURACION_INTRO = 1.7;

export const hayIntro = () =>
  typeof document !== 'undefined' && !document.documentElement.classList.contains('sin-intro');

const trazos = ['M11 30V10', 'M29 30V10', 'M11 16h18', 'M11 24h18', 'M11 16l18 8'];

export default function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!hayIntro()) { setVisible(false); return; }
    try { sessionStorage.setItem('intro', '1'); } catch {}
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = '';
    }, DURACION_INTRO * 1000);
    return () => { clearTimeout(t); document.documentElement.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="intro"
          aria-hidden="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-4">
            <motion.svg
              viewBox="0 0 40 40"
              className="w-20 h-20"
              initial={{ rotate: -90, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.rect
                width="40" height="40" rx="10" fill="#F5B400"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ originX: '50%', originY: '50%' }}
                transition={{ duration: 0.5, ease: 'backOut' }}
              />
              {trazos.map((d, i) => (
                <motion.path
                  key={d} d={d} stroke="#101826" strokeWidth="3" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.12, ease: 'easeOut' }}
                />
              ))}
            </motion.svg>
            <div className="overflow-hidden leading-none text-white">
              <motion.p
                className="text-4xl font-extrabold tracking-tight"
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                ANDAMIO
              </motion.p>
              <motion.p
                className="mt-1 text-xs tracking-[0.5em] text-white/60"
                initial={{ opacity: 0, letterSpacing: '1.2em' }} animate={{ opacity: 1, letterSpacing: '0.5em' }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                WEB · UY
              </motion.p>
            </div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-beam-500"
            initial={{ width: '0%' }} animate={{ width: '100%' }}
            transition={{ duration: DURACION_INTRO - 0.1, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
