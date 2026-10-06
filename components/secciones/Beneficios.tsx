'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import IconoWhatsApp from '../IconoWhatsApp';
import Reveal from '../efectos/Reveal';
import Spotlight from '../efectos/Spotlight';
import { BENEFICIOS, type Beneficio } from '@/lib/datos';

// Cada beneficio lleva un dibujo animado en vez de un ícono. Son decorativos:
// los textos que aparecen adentro son de ejemplo.

// Una mini web que va cambiando de paleta: "con tus colores".
const PALETAS = ['#F5B400', '#5CC8B5', '#FF7A59', '#9B8CFF'];

function DibujoDiseno() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setN(v => (v + 1) % PALETAS.length), 2200);
    return () => clearInterval(t);
  }, [visible]);
  const color = PALETAS[n];
  const tinte = 'transition-colors duration-700';

  return (
    <div ref={ref} className="mx-auto flex h-full max-w-md items-start gap-4">
      <div className="flex-1 rounded-xl border border-white/10 bg-ink-950/80 p-3.5 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between">
          <span className={`h-3 w-3 rounded-[4px] ${tinte}`} style={{ backgroundColor: color }} />
          <span className="flex gap-1.5">
            {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-6 rounded-full bg-white/15" />)}
          </span>
        </div>
        <div className="mt-4 h-2.5 w-3/4 rounded-full bg-white/85" />
        <div className={`mt-2 h-2.5 w-2/5 rounded-full ${tinte}`} style={{ backgroundColor: color }} />
        <div className="mt-3 h-1.5 w-3/5 rounded-full bg-white/15" />
        <div className="mt-4 flex gap-2">
          <span className={`h-5 w-16 rounded-full ${tinte}`} style={{ backgroundColor: color }} />
          <span className="h-5 w-12 rounded-full border border-white/20" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <span className={`h-12 rounded-lg ${tinte}`} style={{ backgroundColor: `${color}40` }} />
          <span className="h-12 rounded-lg bg-white/[0.07]" />
          <span className="h-12 rounded-lg bg-white/[0.07]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {PALETAS.map((p, i) => (
          <span key={p} className={`rounded-full border-2 p-[3px] transition duration-500 ${i === n ? 'scale-110 border-white/80' : 'border-transparent'}`}>
            <span className="block h-6 w-6 rounded-full" style={{ backgroundColor: p }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// Un celular que asoma desde abajo, con la página deslizándose sola.
function DibujoCelular() {
  return (
    <div className="flex h-full items-end justify-center">
      <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(245_180_0/.22),transparent)]" />
      <div className="relative -mb-5 h-[calc(100%+0.5rem)] w-32 overflow-hidden rounded-t-[1.5rem] border-[3px] border-b-0 border-white/15 bg-ink-950 px-2.5 pt-2.5 shadow-2xl shadow-black/40">
        <span className="mx-auto block h-1.5 w-10 rounded-full bg-white/15" />
        <div className="mt-3 animate-desliza space-y-2">
          <div className="h-16 rounded-lg bg-beam-500" />
          <div className="h-2 w-4/5 rounded-full bg-white/85" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
          <div className="h-6 rounded-full bg-[#1FAF38]" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 rounded-lg bg-white/10" />
            <div className="h-12 rounded-lg bg-white/10" />
          </div>
          <div className="h-2 w-3/4 rounded-full bg-white/85" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
          <div className="h-14 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// Mensajes que van llegando al WhatsApp del negocio.
function DibujoWhatsApp() {
  const entrada = (delay: number) => ({
    initial: { opacity: 0, y: 14, scale: 0.92 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { type: 'spring' as const, stiffness: 260, damping: 22, delay },
  });
  const burbuja = 'max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2 text-white/85';

  return (
    <div className="flex h-full flex-col justify-end gap-2 text-[13px] leading-snug">
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1FAF38] text-white shadow-lg shadow-[#1FAF38]/30">
        <IconoWhatsApp className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-beam-500 text-[10px] font-bold text-ink-900">2</span>
      </span>
      <motion.p {...entrada(0.2)} className={burbuja}>¡Hola! Vi la web y quiero hacer un pedido.</motion.p>
      <motion.p {...entrada(0.9)} className={burbuja}>¿Hacen envíos a Canelones?</motion.p>
      <motion.span {...entrada(1.6)} className="flex items-center gap-1 self-end rounded-2xl rounded-br-md bg-[#1FAF38] px-3.5 py-3">
        {[0, 1, 2].map(i => (
          <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </motion.span>
    </div>
  );
}

// Pedidos como se ven en el panel de clientes, con los mismos estados.
const TICKETS = [
  { n: 104, titulo: 'Cambiar foto de portada', estado: 'Resuelto', clases: 'bg-emerald-400/15 text-emerald-300' },
  { n: 105, titulo: 'Agregar sección de promos', estado: 'En curso', clases: 'bg-sky-400/15 text-sky-300', activo: true },
  { n: 106, titulo: 'Nuevo horario de atención', estado: 'Nuevo', clases: 'bg-beam-500/15 text-beam-400' },
];

function DibujoSoporte() {
  return (
    <div className="mx-auto flex h-full max-w-lg flex-col justify-center gap-2.5 text-[13px]">
      {TICKETS.map((t, i) => (
        <motion.div
          key={t.n}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-950/80 px-3.5 py-2.5"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hidden tabular-nums text-white/35 lg:inline">#{t.n}</span>
          <span className="min-w-0 flex-1 truncate text-white/85">{t.titulo}</span>
          <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.clases}`}>
            {t.activo && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
            {t.estado}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const DIBUJOS: Record<Beneficio['dibujo'], () => ReactNode> = {
  diseno: DibujoDiseno,
  celular: DibujoCelular,
  whatsapp: DibujoWhatsApp,
  soporte: DibujoSoporte,
};

// En pantallas grandes forman un mosaico: ancha + angosta, angosta + ancha.
const ANCHAS: Beneficio['dibujo'][] = ['diseno', 'soporte'];

export default function Beneficios() {
  return (
    // overflow-hidden: la entrada en 3D agranda la tarjeta proyectada y, sin el
    // recorte, en celular aparece scroll horizontal.
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-400">Incluido</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">Qué incluye tu web.</h2>
        </Reveal>

        {/* grid-cols-1 explícito: sin él la columna crece con los textos que no cortan línea */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS.map((b, i) => {
            const Dibujo = DIBUJOS[b.dibujo];
            return (
              <motion.div
                key={b.titulo}
                className={ANCHAS.includes(b.dibujo) ? 'lg:col-span-2' : undefined}
                initial={{ opacity: 0, y: 60, rotateX: 25 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 800 }}
              >
                <Spotlight className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-2.5">
                  <div aria-hidden="true" className="relative h-52 overflow-hidden rounded-[1.1rem] bg-white/[0.04]">
                    <div className="scaffold-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
                    <div className="relative h-full p-5">
                      <Dibujo />
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-5">
                    <h3 className="text-lg font-semibold">{b.titulo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{b.texto}</p>
                  </div>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
