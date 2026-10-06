'use client';

import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Logo } from './Logo';
import { INSTAGRAM, NAV, WA_BOCETO, wa } from '@/lib/datos';
import { irA } from '@/lib/scroll';

const LETRAS = 'ANDAMIO'.split('');
const SECCIONES = NAV.filter(n => n.href.startsWith('/#'));
const enlace = 'transition hover:text-beam-400';

export default function Footer() {
  const enHome = usePathname() === '/';
  // El año se calcula en el navegador: el HTML se genera una sola vez al publicar.
  const [año, setAño] = useState(2026);
  // Se observa el contenedor: las letras arrancan fuera de su caja recortada
  // y nunca "entrarían en pantalla" por sí solas.
  const marca = useRef<HTMLDivElement>(null);
  const visto = useInView(marca, { once: true, margin: '0px 0px -40px 0px' });
  useEffect(() => setAño(new Date().getFullYear()), []);

  // En la home las secciones se recorren con el mismo scroll suave del menú.
  const click = (e: MouseEvent, href: string) => {
    if (enHome && irA(href.slice(2))) e.preventDefault();
  };

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-sm text-white/55">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 pt-16 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block text-white">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed">
            Landings empresariales, tiendas online y webs con reservas para negocios de Uruguay.
          </p>
          <a href={WA_BOCETO} target="_blank" rel="noopener" className="group mt-5 inline-flex items-center gap-2 font-semibold text-beam-400 transition hover:text-beam-300">
            Pedir boceto gratis
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <nav aria-label="Secciones">
          <p className="font-semibold text-white">Secciones</p>
          <ul className="mt-4 space-y-2.5">
            {SECCIONES.map(n => (
              <li key={n.href}>
                <Link href={n.href} onClick={e => click(e, n.href)} className={enlace}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-white">Contacto</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href={wa()} target="_blank" rel="noopener" className={enlace}>WhatsApp</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noopener" className={enlace}>Instagram</a></li>
            <li><Link href="/soporte" className={enlace}>Área de clientes</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <p className="border-t border-white/10 pt-6">© {año} Andamio Web · Montevideo, Uruguay</p>
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
