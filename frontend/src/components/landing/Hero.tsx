/**
 * ============================================================================
 * ARCHIVO: Hero.tsx
 * COMPONENTE: Portada de la landing
 * Lenguaje visual: "noche de estadio" (PES) — fondo profundo, líneas de
 * cancha, acento lima y marcador tipo transmisión.
 *
 * Sin canvas ni requestAnimationFrame: la portada es 100% CSS, así que no
 * cuesta frames ni batería y respeta prefers-reduced-motion de forma natural.
 * ============================================================================
 */

import React from 'react';

const MARCADOR = [
  { valor: '06', etiqueta: 'Canchas' },
  { valor: '07', etiqueta: 'Disciplinas' },
  { valor: '100%', etiqueta: 'En línea' },
  { valor: '4.9', etiqueta: 'Rating' },
];

const DISCIPLINAS = [
  'Fútbol 11',
  'Futsal',
  'Pádel',
  'Tenis',
  'Básquet',
  'Vóley',
  'Atletismo',
];

export const Hero: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden bg-arena-base text-arena-ivory dark:bg-arena-night dark:text-arena-ivory">
      {/* 1. Líneas de cancha */}
      <div aria-hidden="true" className="pitch-lines pointer-events-none absolute inset-0 opacity-70" />

      {/* 2. Reflectores */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-52 left-[8%] h-[560px] w-[560px] rounded-full bg-arena-accent/[0.13] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-6%] h-[520px] w-[520px] rounded-full bg-arena-accent/[0.12] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-arena-accent/[0.06] blur-[120px]"
      />

      {/* 3. Trama diagonal (marca de agua de transmisión) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[46%] opacity-[0.06] [background:repeating-linear-gradient(118deg,#fff_0_1px,transparent_1px_26px)]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 px-6 pb-16 pt-14 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-20 lg:pt-20">

        {/* =====================================================
            COLUMNA IZQUIERDA: mensaje
            ===================================================== */}
        <div>
          <span className="anim-rise inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-arena-ivory/70 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-arena-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-arena-accent" />
            </span>
            Temporada 2026 · Turnos 06:00–23:30
          </span>

          <h1 className="anim-rise mt-6 text-[2.65rem] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-arena-ivory text-balance sm:text-6xl lg:text-[4.15rem] [animation-delay:70ms]">
            Tu cancha.
            <br />
            Tu horario.
            <br />
            <span className="text-arena-accent-soft">Tu juego.</span>
          </h1>

          <p className="anim-rise mt-6 max-w-[540px] text-base leading-relaxed text-arena-ivory/65 sm:text-lg [animation-delay:140ms]">
            Reservá en segundos, llegá y jugá. Disponibilidad real, confirmación
            inmediata y pago con QR en el complejo deportivo más completo de la ciudad.
          </p>

          <div className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:210ms]">
            <a
              href="#canchas"
              className="press inline-flex items-center justify-center gap-2.5 rounded-xl bg-arena-accent px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-arena-ink hover:bg-arena-accent-hover motion-safe:hover:-translate-y-0.5"
            >
              Reservar ahora
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
            <a
              href="#como-funciona"
              className="press inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-arena-ivory/85 hover:border-white/30 hover:bg-white/5 hover:text-arena-ivory"
            >
              Cómo funciona
            </a>
          </div>

          <div className="anim-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-arena-ivory/40 [animation-delay:280ms]">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-arena-accent-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Cancelación 24 h
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-arena-accent-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Pago QR / tarjeta
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-arena-accent-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Confirmación al instante
            </span>
          </div>
        </div>

        {/* =====================================================
            COLUMNA DERECHA: marcador
            ===================================================== */}
        <div className="anim-rise relative [animation-delay:180ms]">
          {/* Halo detrás del panel */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-arena-accent/15 via-transparent to-arena-accent/10 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] backdrop-blur-md">
            {/* Barra superior del marcador */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-arena-ivory/55">
                <span className="h-1.5 w-1.5 rounded-full bg-arena-accent motion-safe:animate-pulse-dot" />
                Hoy en el complejo
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-arena-accent-soft">
                06:00 — 23:30
              </span>
            </div>

            {/* Cifras */}
            <div className="grid grid-cols-2">
              {MARCADOR.map((item, i) => (
                <div
                  key={item.etiqueta}
                  className={`px-5 py-6 ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${i > 1 ? 'border-t border-white/10' : ''}`}
                >
                  <p className="text-3xl font-black leading-none tracking-tight text-arena-ivory tabular-nums sm:text-4xl">
                    {item.valor}
                    <span className="ml-0.5 text-arena-accent-soft">.</span>
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-arena-ivory/45">
                    {item.etiqueta}
                  </p>
                </div>
              ))}
            </div>

            {/* Pie del panel */}
            <div className="flex items-center justify-between border-t border-white/10 bg-arena-deep/60 px-5 py-3 dark:bg-arena-panel/60">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-arena-ivory/40">
                Sede La Paz
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-arena-sand">
                4.9
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
                <span className="text-arena-ivory/35">/ 5</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CINTA DE DISCIPLINAS
          ===================================================== */}
      <div className="relative z-10 border-y border-white/10 bg-arena-deep/70 py-3.5 dark:bg-arena-panel/70">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((copia) => (
              <div key={copia} aria-hidden={copia === 1} className="flex items-center gap-8 pr-8">
                {DISCIPLINAS.map((disciplina) => (
                  <span
                    key={`${copia}-${disciplina}`}
                    className="flex items-center gap-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.3em] text-arena-ivory/40"
                  >
                    {disciplina}
                    <span className="h-1 w-1 rounded-full bg-arena-accent/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
