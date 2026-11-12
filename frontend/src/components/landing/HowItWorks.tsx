/**
 * ============================================================================
 * ARCHIVO: HowItWorks.tsx
 * COMPONENTE: Sección explicativa "Cómo Reservar"
 * Banda oscura tipo menú de videojuego: números grandes, acento lima y
 * tarjetas de vidrio sobre líneas de cancha.
 * ============================================================================
 */

import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Elegí tu cancha',
    description: 'Filtrá por disciplina (fútbol, pádel, tenis, básquet) y revisá medidas, capacidad y estado de cada escenario.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
  },
  {
    number: '02',
    title: 'Elegí fecha y hora',
    description: 'Mirá la disponibilidad real del día y quedate con el turno que te sirve, sin llamadas ni esperas.',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2.5" strokeWidth={1.6} />
        <path strokeLinecap="round" strokeWidth={1.6} d="M8 3v4m8-4v4M3 10h18" />
        <path strokeLinecap="round" strokeWidth={1.6} d="M9 15h2m4 0h1" />
      </>
    ),
  },
  {
    number: '03',
    title: 'Confirmá y jugá',
    description: 'Pagá con QR o tarjeta y recibí la confirmación al instante. Solo queda llegar y entrar a la cancha.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 13l4 4L19 7" />
      </>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="como-funciona"
      className="relative isolate overflow-hidden border-y border-white/10 bg-arena-base px-6 py-20 text-arena-ivory dark:bg-arena-night sm:py-24"
    >
      <div aria-hidden="true" className="pitch-lines pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-arena-accent/[0.09] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.26em] text-arena-accent-soft">
              <span className="h-px w-8 bg-arena-accent" />
              Cómo funciona
            </span>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-balance sm:text-4xl lg:text-[2.9rem]">
              Reservar es así de simple
            </h2>
            <p className="mt-3 max-w-[520px] text-base leading-relaxed text-arena-ivory/55">
              Tres pasos, cero vueltas. Todo el proceso vive en la misma pantalla.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 md:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-arena-ivory/40">Tiempo promedio</span>
            <span className="font-mono text-lg font-bold text-arena-accent-soft">45 s</span>
          </div>
        </div>

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-[transform,border-color,background-color] duration-300 ease-out-soft hover:border-arena-accent/40 hover:bg-white/[0.055] motion-safe:hover:-translate-y-1"
            >
              {/* Filo de acento que aparece al pasar el mouse */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] w-0 bg-arena-accent transition-[width] duration-300 ease-out-soft group-hover:w-full"
              />

              <div className="mb-7 flex items-center justify-between">
                <span className="font-mono text-[2.6rem] font-black leading-none tracking-tighter text-arena-ivory/12 transition-colors duration-300 group-hover:text-arena-accent-soft/70">
                  {step.number}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-arena-accent-soft transition-colors duration-300 group-hover:border-arena-accent/30 group-hover:bg-arena-accent/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {step.icon}
                  </svg>
                </span>
              </div>

              <h3 className="text-base font-extrabold uppercase tracking-[0.06em] text-arena-ivory">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-arena-ivory/55">{step.description}</p>

              <span className="mt-6 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-arena-ivory/25">
                Paso {i + 1} de 3
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
