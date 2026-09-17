'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import { LogoMarca } from '@/components/Logo';
import Magnetico from '@/components/efectos/Magnetico';
import { PANEL_URL, wa } from '@/lib/datos';

const entrar = (i: number) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Portal() {
  const luz = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 text-white"
      onPointerMove={e => {
        luz.current?.style.setProperty('--x', `${e.clientX}px`);
        luz.current?.style.setProperty('--y', `${e.clientY - e.currentTarget.getBoundingClientRect().top}px`);
      }}
    >
      <div aria-hidden="true" className="scaffold-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div
        ref={luz}
        aria-hidden="true"
        className="absolute inset-0 -z-10 [--x:50%] [--y:50%]"
        style={{ background: 'radial-gradient(500px circle at var(--x) var(--y), rgb(245 180 0 / .12), transparent 60%)' }}
      />
      {/* Logo gigante girando despacio de fondo */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <LogoMarca className="h-[44rem] w-[44rem]" />
      </motion.div>

      <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6">
        <motion.p {...entrar(0)} className="mb-6 inline-block rounded-full border border-beam-500/40 bg-beam-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-beam-400">
          Área de clientes
        </motion.p>
        <motion.h1 {...entrar(1)} className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Tu portal de <span className="text-shine animate-shine">soporte</span>
        </motion.h1>
        <motion.p {...entrar(2)} className="mt-6 text-lg text-white/70">
          Acá accedés al área de soporte para abrir tickets y seguir el estado de tu web. Si tu panel ya está creado, iniciá sesión. Si todavía no lo tenés listo, escribinos por WhatsApp y lo activamos.
        </motion.p>

        <motion.div {...entrar(3)} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {PANEL_URL ? (
            <Magnetico className="block">
              <a href={PANEL_URL} className="block rounded-full bg-beam-500 px-8 py-4 font-semibold text-ink-900 shadow-[0_0_40px_-8px] shadow-beam-500 transition hover:bg-beam-400">
                Iniciar sesión
              </a>
            </Magnetico>
          ) : (
            <span aria-disabled="true" className="cursor-not-allowed rounded-full bg-beam-500 px-8 py-4 font-semibold text-ink-900 opacity-40">
              Iniciar sesión
            </span>
          )}
          <Magnetico className="block">
            <a
              href={wa('¡Hola! Soy cliente y necesito soporte.')}
              target="_blank"
              rel="noopener"
              className="block rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur transition hover:border-white/60"
            >
              Contactanos por WhatsApp
            </a>
          </Magnetico>
        </motion.div>
        {!PANEL_URL && <p className="mt-4 text-sm text-white/50">El panel todavía no está disponible.</p>}

        <motion.p {...entrar(4)} className="mt-10">
          <Link href="/" className="text-sm text-white/50 transition hover:text-white">← Volver al inicio</Link>
        </motion.p>
      </div>
    </section>
  );
}
