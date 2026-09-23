'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type MouseEvent } from 'react';
import { Logo } from './Logo';
import Magnetico from './efectos/Magnetico';
import { NAV, WA_CONSULTA } from '@/lib/datos';
import { irA } from '@/lib/scroll';

export default function Navbar() {
  const enHome = usePathname() === '/';
  const { scrollY } = useScroll();
  const [compacta, setCompacta] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [abierto, setAbierto] = useState(false);

  // Se achica al bajar, se esconde si seguís bajando y vuelve al subir.
  useMotionValueEvent(scrollY, 'change', y => {
    const antes = scrollY.getPrevious() ?? 0;
    setCompacta(y > 40);
    setOculta(y > 600 && y > antes && !abierto);
  });

  const click = (e: MouseEvent, href: string) => {
    setAbierto(false);
    if (enHome && href.startsWith('/#') && irA(href.slice(2))) e.preventDefault();
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      animate={{ y: oculta ? -110 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`mx-auto flex items-center justify-between rounded-full border text-white transition-all duration-500 ${
          compacta
            ? 'h-14 max-w-5xl border-white/10 bg-ink-900/70 px-3 pl-4 shadow-2xl shadow-black/40 backdrop-blur-xl'
            : 'h-16 max-w-6xl border-transparent bg-transparent px-3'
        }`}
      >
        <Link href="/" onClick={e => click(e, '/#top')}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 text-sm text-white/75 md:flex">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={e => click(e, n.href)}
              className="relative rounded-full px-3.5 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Magnetico>
            <a
              href={WA_CONSULTA}
              target="_blank"
              rel="noopener"
              className="block rounded-full bg-beam-500 px-4 py-2 text-sm font-semibold text-ink-900 shadow-[0_0_30px_-5px] shadow-beam-500/60 transition hover:bg-beam-400"
            >
              Hablemos
            </a>
          </Magnetico>
          <button
            type="button"
            className="relative h-10 w-10 rounded-full border border-white/15 md:hidden"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            onClick={() => setAbierto(a => !a)}
          >
            <motion.span className="absolute left-3 right-3 h-0.5 rounded bg-white" animate={abierto ? { top: 19, rotate: 45 } : { top: 15, rotate: 0 }} />
            <motion.span className="absolute left-3 right-3 h-0.5 rounded bg-white" animate={abierto ? { top: 19, rotate: -45 } : { top: 23, rotate: 0 }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900/90 p-3 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            {NAV.map((n, i) => (
              <motion.div key={n.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Link href={n.href} onClick={e => click(e, n.href)} className="block rounded-2xl px-4 py-3 text-lg font-semibold text-white hover:bg-white/10">
                  {n.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
