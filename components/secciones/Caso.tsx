'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import IconoWhatsApp from '../IconoWhatsApp';
import Magnetico from '../efectos/Magnetico';
import Reveal from '../efectos/Reveal';
import { CASO_PASOS } from '@/lib/datos';

// TODO: reemplazar el boceto por capturas reales de lupaecoart.site
const PRODUCTOS = [
  { color: '#7ABFB1', nombre: 'Agenda reciclada', precio: '$ 690' },
  { color: '#FCA321', nombre: 'Cuaderno A5', precio: '$ 420' },
  { color: '#A68A26', nombre: 'Portalápices láser', precio: '$ 380' },
  { color: '#8F9B2F', nombre: 'Set de stickers', precio: '$ 150' },
];

export default function Caso() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const suave = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const yVentana = useTransform(suave, [0, 1], [80, -80]);
  const giro = useTransform(suave, [0, 1], [8, -8]);
  const yAviso = useTransform(suave, [0, 1], [180, -160]);
  const yStock = useTransform(suave, [0, 1], [-60, 120]);
  const escala = useTransform(suave, [0, 0.4, 1], [0.85, 1, 1]);

  return (
    <section id="caso" ref={ref} className="relative overflow-hidden bg-paper py-28 text-ink-900">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-600">Caso real</p>
            <h2 className="mt-3 text-5xl font-extrabold tracking-tight md:text-7xl">Lupa Ecoart</h2>
            <p className="mt-5 text-lg text-neutral-600">
              Tienda online de papelería, corte láser y productos reciclables. Construimos el catálogo, el carrito y un panel propio para que la dueña maneje todo desde el celular.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {CASO_PASOS.map((paso, i) => (
              <motion.li
                key={paso}
                className="flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-neutral-200 hover:bg-white"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-beam-500 text-sm font-extrabold text-ink-900">{i + 1}</span>
                <span>{paso}</span>
              </motion.li>
            ))}
          </ul>
          <Reveal delay={0.3}>
            <Magnetico className="mt-10 inline-block">
              <a
                href="https://lupaecoart.site"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-4 font-semibold text-white transition hover:bg-ink-700"
              >
                Visitar lupaecoart.site
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </Magnetico>
          </Reveal>
        </div>

        <div aria-hidden="true" className="relative">
          <motion.div style={{ scale: escala }} className="relative rounded-[2rem] bg-[#E6EBB1] p-8 md:p-10">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,#fff8,transparent_60%)]" />
            <motion.div style={{ y: yVentana, rotate: giro }} className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-[#8F9B2F]/30">
              <div className="flex h-10 items-center gap-2 bg-[#8F9B2F] px-4 text-sm font-semibold text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                Lupa Ecoart
              </div>
              <div className="grid grid-cols-2 gap-4 p-5">
                {PRODUCTOS.map((p, i) => (
                  <motion.div
                    key={p.nombre}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                  >
                    <motion.div
                      className="h-24 rounded-xl"
                      style={{ backgroundColor: p.color + '66' }}
                      animate={{ backgroundColor: [p.color + '55', p.color + '99', p.color + '55'] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
                    />
                    <p className="text-xs font-semibold text-neutral-700">{p.nombre}</p>
                    <p className="text-xs font-bold text-[#FCA321]">{p.precio}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Aviso de pedido que entra flotando */}
            <motion.div
              style={{ y: yAviso }}
              className="absolute -left-4 top-1/2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-2xl md:-left-12"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1FAF38] text-white">
                <IconoWhatsApp className="h-5 w-5" />
              </span>
              <span className="text-xs leading-tight">
                <b className="block text-sm">¡Pedido nuevo!</b>
                <span className="text-neutral-500">2 productos · $ 1.110</span>
              </span>
            </motion.div>

            <motion.div
              style={{ y: yStock }}
              className="absolute -right-3 top-6 rounded-2xl bg-ink-900 px-4 py-3 text-white shadow-2xl md:-right-8"
            >
              <p className="text-[10px] uppercase tracking-widest text-white/50">Stock</p>
              <p className="text-2xl font-extrabold text-beam-500">
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>●</motion.span> 12
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
