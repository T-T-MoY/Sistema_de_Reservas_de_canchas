/**
 * ============================================================================
 * ARCHIVO: CanchaCard.tsx
 * COMPONENTE: Tarjeta visual de Cancha Deportiva
 * Tarjeta "ficha de estadio": papel claro / vidrio oscuro, filo de acento
 * lima al pasar el mouse y precio con jerarquía de marcador.
 * Los colores de disciplina/estado son semánticos y no dependen de la marca.
 * ============================================================================
 */

import React from 'react';
import type { Cancha } from './cancha.types';

interface CanchaCardProps {
  cancha: Cancha;
  isAdmin?: boolean;
  onEdit: (cancha: Cancha) => void;
  onDelete: (id: number) => void;
  onSelectReserva?: (cancha: Cancha) => void;
}

// Iconos visuales y estilos por disciplina deportiva
const getDisciplinaBadge = (disciplina: string | null) => {
  const d = disciplina?.toLowerCase() || '';
  if (d.includes('futbol')) return { label: 'Fútbol', color: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400', icon: '⚽' };
  if (d.includes('basquet')) return { label: 'Básquetbol', color: 'bg-amber-500/12 text-amber-700 dark:text-amber-400', icon: '🏀' };
  if (d.includes('voley')) return { label: 'Voleibol', color: 'bg-sky-500/12 text-sky-700 dark:text-sky-400', icon: '🏐' };
  if (d.includes('tenis')) return { label: 'Tenis', color: 'bg-yellow-500/12 text-yellow-700 dark:text-yellow-400', icon: '🎾' };
  if (d.includes('padel')) return { label: 'Pádel', color: 'bg-indigo-500/12 text-indigo-700 dark:text-indigo-400', icon: '🏸' };
  if (d.includes('futsal')) return { label: 'Futsal', color: 'bg-orange-500/12 text-orange-700 dark:text-orange-400', icon: '🥅' };
  if (d.includes('atletismo')) return { label: 'Atletismo', color: 'bg-rose-500/12 text-rose-700 dark:text-rose-400', icon: '🏃' };
  return { label: disciplina || 'General', color: 'bg-slate-500/12 text-slate-700 dark:text-slate-400', icon: '🏟️' };
};

export const CanchaCard: React.FC<CanchaCardProps> = ({
  cancha,
  isAdmin = false,
  onEdit,
  onDelete,
  onSelectReserva,
}) => {
  const discInfo = getDisciplinaBadge(cancha.disciplina);
  const isDisponible = cancha.estado?.toLowerCase() === 'disponible';

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-arena-ink/10 bg-arena-ivory p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:border-arena-ink/25 hover:shadow-lift motion-safe:hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-arena-accent/40">

      {/* Filo superior que se dibuja al hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] w-0 bg-arena-ink transition-[width] duration-300 ease-out-soft group-hover:w-full dark:bg-arena-accent"
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-lg leading-none">{discInfo.icon}</span>
          <span className={`truncate rounded-md px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${discInfo.color}`}>
            {discInfo.label}
          </span>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
            isDisponible
              ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400'
              : 'bg-amber-500/12 text-amber-700 dark:text-amber-400'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isDisponible ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          {isDisponible ? 'Disponible' : 'Mantenimiento'}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="mb-1.5 text-xl font-extrabold leading-tight tracking-tight text-arena-ink dark:text-arena-ivory">
          {cancha.nombre}
        </h3>

        <p className="mb-5 flex items-center gap-1.5 text-[13px] text-arena-ink2 dark:text-arena-ivory/45">
          <svg className="h-4 w-4 shrink-0 text-arena-ink/40 dark:text-arena-ivory/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {cancha.ubicacion || 'Sector Principal'}
        </p>

        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-3 rounded-xl border border-arena-ink/10 bg-arena-ink/[0.035] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
          {cancha.capacidad && (
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-arena-ink2/70 dark:text-arena-ivory/35">Capacidad</span>
              <span className="mt-0.5 text-sm font-bold text-arena-ink dark:text-arena-ivory">{cancha.capacidad} pers.</span>
            </div>
          )}

          {cancha.largo && cancha.ancho && (
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-arena-ink2/70 dark:text-arena-ivory/35">Dimensiones</span>
              <span className="mt-0.5 text-sm font-bold text-arena-ink dark:text-arena-ivory">{cancha.largo}m × {cancha.ancho}m</span>
            </div>
          )}

          {cancha.hora_apertura && cancha.hora_cierre && (
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-arena-ink2/70 dark:text-arena-ivory/35">Horario</span>
              <span className="mt-0.5 text-sm font-bold text-arena-ink dark:text-arena-ivory">
                {cancha.hora_apertura.slice(0, 5)} – {cancha.hora_cierre.slice(0, 5)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-arena-ink/10 pt-4 dark:border-white/10">
        <div className="flex items-baseline gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-arena-ink2 dark:text-arena-ivory/40">Bs.</span>
          <span className="text-[1.75rem] font-black leading-none tracking-tight text-arena-ink tabular-nums dark:text-arena-ivory">
            {Number(cancha.precio_hora).toFixed(0)}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-arena-ink2/70 dark:text-arena-ivory/30">/ hora</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Botones de Gestión Administrativa: SOLO si isAdmin es true */}
          {isAdmin && (
            <>
              <button
                type="button"
                title="Editar Cancha (Solo Administrador)"
                onClick={() => onEdit(cancha)}
                className="press flex h-9 w-9 items-center justify-center rounded-lg border border-arena-ink/10 text-arena-ink2 hover:border-arena-ink/30 hover:text-arena-ink dark:border-white/10 dark:text-arena-ivory/45 dark:hover:border-white/30 dark:hover:text-arena-ivory"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                type="button"
                title="Eliminar Cancha (Solo Administrador)"
                onClick={() => onDelete(cancha.id_cancha)}
                className="press flex h-9 w-9 items-center justify-center rounded-lg border border-arena-ink/10 text-arena-ink2 hover:border-red-400 hover:text-red-600 dark:border-white/10 dark:text-arena-ivory/45 dark:hover:border-red-400/60 dark:hover:text-red-400"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}

          {/* Botón de Reserva para Clientes y Usuarios */}
          <button
            type="button"
            disabled={!isDisponible}
            onClick={() => onSelectReserva && onSelectReserva(cancha)}
            className="press rounded-lg bg-arena-accent px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-arena-ink hover:bg-arena-accent-hover disabled:cursor-not-allowed disabled:bg-arena-ink/10 disabled:text-arena-ink2/50 dark:disabled:bg-white/10 dark:disabled:text-arena-ivory/30"
          >
            {isDisponible ? 'Reservar' : 'No disp.'}
          </button>
        </div>
      </div>
    </article>
  );
};
export default CanchaCard;
