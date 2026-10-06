'use client';

import { useRef, useState } from 'react';
import Reveal from '../efectos/Reveal';
import { DEMO_CAPITULOS } from '@/lib/datos';

// 90.5 -> "1:30"
const minutos = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// Video del recorrido completo con la tienda de Lupa Ecoart, narrado. No arranca solo:
// dura unos minutos y se mira con ganas. Los capítulos saltan a cada parte.
export default function Demo() {
  const video = useRef<HTMLVideoElement>(null);
  const [actual, setActual] = useState(-1);
  // Hasta el primer play se muestra un botón grande sobre la portada, sin los
  // controles del navegador; después quedan los controles de siempre.
  const [iniciado, setIniciado] = useState(false);

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
          <h2 className="mt-3 text-5xl font-extrabold tracking-tight md:text-7xl">Mirá cómo funciona.</h2>
          <p className="mt-5 text-lg text-white/65">
            Un recorrido de punta a punta con la tienda de Lupa Ecoart: cargar productos, recibir pedidos y pedirnos cambios desde tu panel de soporte.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-900 shadow-2xl shadow-black/50 md:rounded-[2rem]">
            <video
              ref={video}
              className="block aspect-video w-full"
              src="/video/demo-andamio-voz-valentina.mp4"
              poster="/video/demo-andamio.jpg"
              controls={iniciado}
              playsInline
              preload="none"
              onPlay={() => setIniciado(true)}
              onTimeUpdate={alAvanzar}
            >
              Tu navegador no puede reproducir el video.
            </video>
            {!iniciado && (
              <button
                type="button"
                onClick={() => video.current?.play().catch(() => {})}
                className="group absolute inset-0 flex items-end justify-center pb-[4%] md:pb-[7%]"
              >
                <span className="flex items-center gap-2.5 rounded-full bg-beam-500 py-1 pl-1 pr-4 text-[13px] font-semibold text-ink-900 shadow-[0_0_50px_-8px] shadow-beam-500 transition duration-300 group-hover:scale-105 group-hover:bg-beam-400 md:gap-3 md:py-2 md:pl-2 md:pr-7 md:text-base">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-beam-400 md:h-11 md:w-11">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-0.5 h-3.5 w-3.5 md:h-5 md:w-5" fill="currentColor"><path d="M6 3.8v12.4a.8.8 0 0 0 1.2.7l10-6.2a.8.8 0 0 0 0-1.4l-10-6.2a.8.8 0 0 0-1.2.7z" /></svg>
                  </span>
                  Ver el recorrido
                  <span className="font-medium opacity-60">3:30</span>
                </span>
              </button>
            )}
          </div>
        </Reveal>

        {/* Capítulos con una miniatura de cada parte (public/video/capitulos).
            En celular es una fila que se desliza de costado. */}
        <Reveal delay={0.25}>
          <ol className="-mx-4 mt-5 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {DEMO_CAPITULOS.map((c, i) => (
              <li key={c.titulo} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
                <button
                  type="button"
                  onClick={() => ir(c.segundo)}
                  aria-current={actual === i ? 'step' : undefined}
                  className={`group block w-full overflow-hidden rounded-2xl border text-left transition ${
                    actual === i ? 'border-beam-500 bg-beam-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/40'
                  }`}
                >
                  <span className="relative block overflow-hidden bg-ink-900" style={{ aspectRatio: '560 / 294' }}>
                    <img
                      src={`/video/capitulos/${i + 1}.webp`}
                      alt=""
                      width={560}
                      height={294}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-100 ${actual === i ? 'opacity-100' : 'opacity-75'}`}
                    />
                    <span className="absolute bottom-1.5 right-1.5 rounded-md bg-ink-950/85 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white/85">
                      {minutos(c.segundo)}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/85">
                    <span className={`tabular-nums ${actual === i ? 'text-beam-400' : 'text-white/40'}`}>{i + 1}</span>
                    {c.titulo}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
