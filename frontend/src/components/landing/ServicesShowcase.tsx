/**
 * ============================================================================
 * ARCHIVO: ServicesShowcase.tsx
 * COMPONENTE: Sección de Servicios e Instalaciones del Complejo
 * Banda clara de "concreto" con tarjetas de papel, iconografía lineal y
 * acentos lima. En modo oscuro pasa a una banda nocturna.
 * ============================================================================
 */

import React from 'react';

const SERVICES = [
  {
    title: 'Iluminación LED profesional',
    description: 'Torres de luz de alta potencia para que el partido nocturno se vea como de día, hasta las 23:30.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.4-6.4l-1.4 1.4M7 17l-1.4 1.4m12.8 0L17 17M7 7L5.6 5.6" />
        <circle cx="12" cy="12" r="3.2" strokeWidth={1.7} />
      </>
    ),
  },
  {
    title: 'Vestuarios con agua caliente',
    description: 'Casilleros individuales, baños higienizados y duchas presurizadas listas antes y después de jugar.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 20V7a3 3 0 013-3h3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M10 4h2m4 4v5a3 3 0 01-3 3H9a3 3 0 01-3-3" />
        <path strokeLinecap="round" strokeWidth={1.7} d="M16 16.5v.01M13.5 19v.01M18.5 19v.01" />
      </>
    ),
  },
  {
    title: 'Parqueo privado y seguro',
    description: 'Playa de estacionamiento con vigilancia por cámaras 24/7 y acceso directo a los vestuarios.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 16v-3.2L6 8h12l2 4.8V16" />
        <path strokeLinecap="round" strokeWidth={1.7} d="M3 16h18M6 16v2m12-2v2" />
        <circle cx="8" cy="13" r="1.2" strokeWidth={1.7} />
        <circle cx="16" cy="13" r="1.2" strokeWidth={1.7} />
      </>
    ),
  },
  {
    title: 'Cafetería e hidratación',
    description: 'Isotónicas, snacks y un área lounge con pantallas para ver el partido antes o después del turno.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M5 8h11v6a4 4 0 01-4 4H9a4 4 0 01-4-4V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M16 9h2a2 2 0 010 4h-2M7 4v2m4-2v2m4-2v2" />
      </>
    ),
  },
  {
    title: 'Organización de torneos',
    description: 'Logística completa para ligas empresariales, campeonatos intercolegiales y eventos corporativos.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M8 4h8v5a4 4 0 01-8 0V4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M8 5H5v2a3 3 0 003 3m8-5h3v2a3 3 0 01-3 3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 13v4m-3 3h6" />
      </>
    ),
  },
  {
    title: 'Seguridad y primeros auxilios',
    description: 'Personal de atención primaria y botiquín de emergencia disponible durante toda la jornada.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 9v6m-3-3h6" />
      </>
    ),
  },
];

export const ServicesShowcase: React.FC = () => {
  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden bg-arena-deep px-6 py-20 dark:bg-arena-night sm:py-24"
    >
      <div aria-hidden="true" className="pitch-lines-ink pointer-events-none absolute inset-0 opacity-40 dark:hidden" />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2 rounded-md bg-arena-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-arena-accent-soft dark:bg-arena-accent dark:text-arena-ink">
              Comodidades
            </span>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-arena-ivory text-balance dark:text-arena-ivory sm:text-4xl lg:text-[2.9rem]">
              Instalaciones de primer nivel
            </h2>
            <p className="mt-3 max-w-[520px] text-base leading-relaxed text-arena-ivory/60 dark:text-arena-ivory/55">
              Todo lo que necesitás para que la experiencia sea completa, segura y memorable.
            </p>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-arena-ivory/40 dark:text-arena-ivory/35">
              6 servicios incluidos
            </span>
            <span className="h-px w-16 bg-arena-ivory/15 dark:bg-white/15" />
          </div>
        </div>

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-arena-ink/10 bg-arena-ivory p-7 transition-[transform,border-color,box-shadow] duration-300 ease-out-soft hover:border-arena-accent/60 hover:shadow-lift motion-safe:hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-arena-accent/40"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] w-0 bg-arena-base transition-[width] duration-300 ease-out-soft group-hover:w-full dark:bg-arena-accent"
              />

              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-arena-ink/10 bg-arena-ink/[0.04] text-arena-ink transition-colors duration-300 group-hover:border-arena-ink/20 group-hover:bg-arena-ink group-hover:text-arena-accent dark:border-white/10 dark:bg-white/[0.04] dark:text-arena-accent dark:group-hover:border-arena-accent/30 dark:group-hover:bg-arena-accent/10">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {service.icon}
                </svg>
              </span>

              <h3 className="mt-5 text-base font-extrabold uppercase tracking-[0.05em] text-arena-ink dark:text-arena-ivory">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-arena-ink2 dark:text-arena-ivory/55">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
