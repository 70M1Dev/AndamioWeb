'use client';

import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { wa } from '@/lib/datos';

const LETRAS = 'ANDAMIO'.split('');

export default function Footer() {
  // El año se calcula en el navegador: el HTML se genera una sola vez al publicar.
  const [año, setAño] = useState(2026);
  // Se observa el contenedor: las letras arrancan fuera de su caja recortada
  // y nunca "entrarían en pantalla" por sí solas.
  const marca = useRef<HTMLDivElement>(null);
  const visto = useInView(marca, { once: true, margin: '0px 0px -40px 0px' });
  useEffect(() => setAño(new Date().getFullYear()), []);

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-sm text-white/55">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 pt-14 sm:px-6 md:flex-row">
        <p>© {año} Andamio Web · Montevideo, Uruguay</p>
        <div className="flex gap-6">
          <Link href="/soporte" className="transition hover:text-beam-400">Área de clientes</Link>
          <a href={wa()} target="_blank" rel="noopener" className="transition hover:text-beam-400">WhatsApp</a>
        </div>
      </div>

      {/* Marca gigante que emerge letra por letra */}
      <div ref={marca} aria-hidden="true" className="mx-auto flex max-w-6xl select-none justify-between px-4 pt-6 sm:px-6">
        {LETRAS.map((l, i) => (
          <span key={i} className="overflow-hidden">
            <motion.span
              className="block bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-[19vw] font-extrabold leading-[0.8] text-transparent transition-colors duration-300 hover:from-beam-500 hover:to-beam-500/10 lg:text-[13.5rem]"
              initial={{ y: '100%' }}
              animate={{ y: visto ? '15%' : '100%' }}
              transition={{ duration: 1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </div>
    </footer>
  );
}
