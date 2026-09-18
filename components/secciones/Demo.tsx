'use client';

import { useRef, useState } from 'react';
import Reveal from '../efectos/Reveal';
import { DEMO_CAPITULOS } from '@/lib/datos';

// Video del recorrido completo con la tienda de Lupa Ecoart. No arranca solo:
// dura unos minutos y se mira con ganas. Los capítulos saltan a cada parte.
export default function Demo() {
  const video = useRef<HTMLVideoElement>(null);
  const [actual, setActual] = useState(-1);

  const ir = (segundo: number) => {
    const v = video.current;
    if (!v) return;
    // Con preload="none" el video todavía no cargó: hay que esperar los
    // metadatos para poder saltar.
    const saltar = () => {
      v.currentTime = segundo;
      v.play().catch(() => {});
    };
    if (v.readyState >= HTMLMediaElement.HAVE_METADATA) saltar();
    else {
      v.addEventListener('loadedmetadata', saltar, { once: true });
      v.load();
    }
  };

  const alAvanzar = () => {
    const t = video.current?.currentTime ?? 0;
    let i = -1;
    DEMO_CAPITULOS.forEach((c, j) => { if (t >= c.segundo) i = j; });
    setActual(i);
  };

  return (
    <section id="demo" className="relative overflow-hidden bg-ink-950 py-28 text-white">
      <div aria-hidden="true" className="scaffold-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-beam-400">Demo</p>
          <h2 className="mt-3 text-5xl font-extrabold tracking-tight md:text-7xl">Mirá cómo funciona</h2>
          <p className="mt-5 text-lg text-white/65">
            Un recorrido de punta a punta con la tienda de Lupa Ecoart: cargar productos, recibir pedidos y pedirnos cambios desde tu panel de soporte.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-900 shadow-2xl shadow-black/50 md:rounded-[2rem]">
            <video
              ref={video}
              className="block aspect-video w-full"
              src="/video/demo-andamio.mp4"
              poster="/video/demo-andamio.jpg"
              controls
              playsInline
              preload="none"
              onTimeUpdate={alAvanzar}
            >
              Tu navegador no puede reproducir el video.
            </video>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <ol className="mt-6 flex flex-wrap gap-2">
            {DEMO_CAPITULOS.map((c, i) => (
              <li key={c.titulo}>
                <button
                  type="button"
                  onClick={() => ir(c.segundo)}
                  aria-current={actual === i ? 'step' : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    actual === i
                      ? 'border-beam-500 bg-beam-500 text-ink-900'
                      : 'border-white/15 bg-white/5 text-white/75 hover:border-white/40 hover:text-white'
                  }`}
                >
                  <span className="mr-1.5 tabular-nums opacity-60">{i + 1}.</span>
                  {c.titulo}
                </button>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
