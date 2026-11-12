/**
 * ============================================================================
 * ARCHIVO: CanchaList.tsx
 * COMPONENTE: Catálogo interactivo de Canchas Deportivas
 *
 * MODOS:
 * - "app"     → Comportamiento completo (CRUD admin, reservas, modales).
 * - "preview" → Vitrina pública: muestra 3 canchas, oculta CRUD,
 *               y ofrece CTA para ir a la app o iniciar sesión.
 *
 * CONTROL DE PERMISOS:
 * - Cualquier usuario/visitante: ver catálogo, consultar disponibilidad.
 * - Administradores: crear (+ Nueva Cancha), editar y eliminar.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CanchaCard } from './CanchaCard';
import { CanchaModal } from './CanchaModal';
import { canchaApi } from './cancha.api';
import type { Cancha, CanchaFormData, DisciplinaOption } from './cancha.types';

// =====================================================
// TIPOS Y CONSTANTES
// =====================================================
export type CanchaListModo = 'app' | 'preview';
export type CanchaListTono = 'claro' | 'oscuro';

const DISCIPLINAS: DisciplinaOption[] = [
  { id: 'todas', label: 'Todas', icon: '⚡' },
  { id: 'futbol', label: 'Fútbol', icon: '⚽' },
  { id: 'futsal', label: 'Futsal', icon: '🥅' },
  { id: 'padel', label: 'Pádel', icon: '🏸' },
  { id: 'tenis', label: 'Tenis', icon: '🎾' },
  { id: 'basquet', label: 'Básquet', icon: '🏀' },
  { id: 'voley', label: 'Voleibol', icon: '🏐' },
];

const PREVIEW_LIMIT = 3;

interface CanchaListProps {
  modo?: CanchaListModo;
  title?: string;
  subtitle?: string;
  /** Superficie sobre la que se dibuja el catálogo (la landing usa 'oscuro'). */
  tono?: CanchaListTono;
}

// =====================================================
// COMPONENTE
// =====================================================
export const CanchaList: React.FC<CanchaListProps> = ({
  modo = 'app',
  title = 'Nuestras Canchas y Escenarios Deportivos',
  subtitle = 'Instalaciones de alto rendimiento con iluminación LED, césped sintético y piso flotante reglamentario.',
  tono = 'claro',
}) => {
  const navigate = useNavigate();
  const { usuario, isAuthenticated } = useAuth();

  const isPreview = modo === 'preview';
  const esOscuro = tono === 'oscuro';

  // Estilos según la superficie que contiene el catálogo
  const chipTono = esOscuro
    ? 'border-white/10 bg-white/[0.06] text-arena-ivory/60'
    : 'border-arena-ink/10 bg-arena-ink/[0.04] text-arena-ink2 dark:border-white/10 dark:bg-white/[0.04] dark:text-arena-ivory/45';
  const tituloTono = esOscuro ? 'text-arena-ivory' : 'text-arena-ink dark:text-arena-ivory';
  const subtituloTono = esOscuro ? 'text-arena-ivory/60' : 'text-arena-ink2 dark:text-arena-ivory/55';
  const filtroInactivo = esOscuro
    ? 'border-white/10 bg-white/[0.05] text-arena-ivory/60 hover:border-white/25 hover:text-arena-ivory'
    : 'border-arena-ink/10 bg-arena-ivory text-arena-ink2 hover:border-arena-ink/25 hover:text-arena-ink dark:border-white/10 dark:bg-white/[0.04] dark:text-arena-ivory/50 dark:hover:border-white/25 dark:hover:text-arena-ivory';
  const filtroActivo = 'bg-arena-night text-arena-accent-soft dark:bg-arena-accent dark:text-arena-ink';
  const cajaBusqueda = esOscuro
    ? 'border-white/10 bg-white/[0.06] focus-within:border-arena-accent/60 focus-within:ring-arena-accent/15'
    : 'border-arena-ink/10 bg-arena-ivory focus-within:border-arena-ink/40 focus-within:ring-arena-ink/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-within:border-arena-accent/50 dark:focus-within:ring-arena-accent/15';
  const iconoBusqueda = esOscuro ? 'text-arena-ivory/35' : 'text-arena-ink2/60 dark:text-arena-ivory/35';
  const inputBusqueda = esOscuro
    ? 'text-arena-ivory placeholder:text-arena-ivory/30'
    : 'text-arena-ink placeholder:text-arena-ink2/50 dark:text-arena-ivory dark:placeholder:text-arena-ivory/25';
  const botonLimpiar = esOscuro
    ? 'text-arena-ivory/40 hover:bg-white/10 hover:text-arena-ivory'
    : 'text-arena-ink2/60 hover:bg-arena-ink/5 hover:text-arena-ink dark:text-arena-ivory/40 dark:hover:bg-white/10 dark:hover:text-arena-ivory';
  const cajaVacia = esOscuro
    ? 'border-white/15 bg-white/[0.04]'
    : 'border-arena-ink/15 bg-arena-ivory dark:border-white/10 dark:bg-white/[0.03]';

  // En preview NUNCA se comporta como admin (no se ven botones de CRUD)
  const isAdmin = !isPreview && Boolean(
    usuario && (usuario.rol === 'Admin' || usuario.rol === 'Administrador')
  );

  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [activeDisciplina, setActiveDisciplina] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canchaToEdit, setCanchaToEdit] = useState<Cancha | null>(null);
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  // =====================================================
  // FETCH
  // =====================================================
  const cargarCanchas = async (disciplina = activeDisciplina) => {
    setIsLoading(true);
    try {
      const res = await canchaApi.getAll(disciplina);
      setCanchas(res.data);
      setIsBackendOnline(res.isLive);
    } catch (err: any) {
      console.error('Error al cargar canchas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarCanchas(activeDisciplina);
  }, [activeDisciplina]);

  const showNotification = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4500);
  };

  // =====================================================
  // ACCIONES CRUD (solo modo app + admin)
  // =====================================================
  const handleSaveCancha = async (formData: CanchaFormData, editingId?: number) => {
    if (!isAdmin) {
      showNotification('Acción restringida: Solo administradores pueden gestionar canchas', 'error');
      return;
    }

    if (editingId) {
      if (isBackendOnline) {
        await canchaApi.update(editingId, formData);
        showNotification('Cancha actualizada exitosamente');
        await cargarCanchas();
      } else {
        setCanchas(prev => prev.map(c => c.id_cancha === editingId ? {
          ...c,
          ...formData,
          precio_hora: Number(formData.precio_hora),
          capacidad: formData.capacidad ? Number(formData.capacidad) : null,
          largo: formData.largo ? Number(formData.largo) : null,
          ancho: formData.ancho ? Number(formData.ancho) : null,
        } : c));
        showNotification('Cancha actualizada (Modo Demo)');
      }
    } else {
      if (isBackendOnline) {
        await canchaApi.create(formData);
        showNotification('Cancha creada exitosamente');
        await cargarCanchas();
      } else {
        const newId = Math.max(0, ...canchas.map(c => c.id_cancha)) + 1;
        const newCancha: Cancha = {
          id_cancha: newId,
          nombre: formData.nombre,
          disciplina: formData.disciplina,
          precio_hora: Number(formData.precio_hora),
          capacidad: formData.capacidad ? Number(formData.capacidad) : null,
          estado: formData.estado,
          ubicacion: formData.ubicacion,
          largo: formData.largo ? Number(formData.largo) : null,
          ancho: formData.ancho ? Number(formData.ancho) : null,
          hora_apertura: formData.hora_apertura,
          hora_cierre: formData.hora_cierre,
        };
        setCanchas(prev => [newCancha, ...prev]);
        showNotification('Nueva cancha registrada (Modo Demo)');
      }
    }
  };

  const handleDeleteCancha = async (id: number) => {
    if (!isAdmin) {
      showNotification('Acción restringida: Solo administradores pueden eliminar canchas', 'error');
      return;
    }

    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la cancha #${id}?`);
    if (!confirmDelete) return;

    try {
      if (isBackendOnline) {
        await canchaApi.delete(id);
        showNotification(`Cancha #${id} eliminada exitosamente`);
        await cargarCanchas();
      } else {
        setCanchas(prev => prev.filter(c => c.id_cancha !== id));
        showNotification(`Cancha #${id} eliminada (Modo Demo)`);
      }
    } catch (err: any) {
      showNotification(err.message || 'Error al eliminar la cancha', 'error');
    }
  };

  const handleOpenCreateModal = () => {
    if (!isAdmin) {
      showNotification('Debes ser Administrador para agregar canchas', 'error');
      return;
    }
    setCanchaToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cancha: Cancha) => {
    if (!isAdmin) {
      showNotification('Debes ser Administrador para editar canchas', 'error');
      return;
    }
    setCanchaToEdit(cancha);
    setIsModalOpen(true);
  };

  // =====================================================
  // RESERVAR (con lógica distinta según sesión y modo)
  // =====================================================
  const handleSelectReserva = (cancha: Cancha) => {
    if (!isAuthenticated) {
      showNotification(
        `Para reservar "${cancha.nombre}" debes iniciar sesión con tu cuenta.`,
        'info'
      );
      setTimeout(() => {
        navigate('/login', { state: { from: '/canchas' } });
      }, 1800);
      return;
    }

    // Logueado: navega a disponibilidad de la cancha
    navigate(`/canchas/${cancha.id_cancha}/reservar`);
  };

  // =====================================================
  // FILTRADO + LÍMITE DE PREVIEW
  // =====================================================
  const filteredCanchas = canchas.filter(c => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(term) ||
      (c.ubicacion && c.ubicacion.toLowerCase().includes(term)) ||
      (c.disciplina && c.disciplina.toLowerCase().includes(term))
    );
  });

  const canchasAMostrar = isPreview
    ? filteredCanchas.slice(0, PREVIEW_LIMIT)
    : filteredCanchas;

  const hayMas = isPreview && filteredCanchas.length > PREVIEW_LIMIT;

  const notificationClass = notification?.type === 'success'
    ? 'border-emerald-500 bg-emerald-500/90 text-arena-ivory'
    : notification?.type === 'error'
      ? 'border-red-500 bg-red-500/90 text-arena-ivory'
      : 'border-sky-500 bg-sky-500/90 text-arena-ivory';

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <section id="canchas" className="relative max-w-[1240px] mx-auto px-6 py-20">

      {/* Notificación Toast */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-[110] px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg border animate-slide-up ${notificationClass}`}>
          {notification.type === 'success' ? '✓ ' : notification.type === 'error' ? '⚠️ ' : 'ℹ️ '}
          {notification.msg}
        </div>
      )}

      {/* Encabezado */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div>
          <div className={`mb-3 inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${chipTono}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isBackendOnline ? 'bg-emerald-500' : 'bg-arena-sand'}`} />
            {isBackendOnline ? 'PostgreSQL · en vivo' : 'Modo demostración'}
          </div>
          <h2 className={`mb-2 text-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-balance sm:text-4xl ${tituloTono}`}>
            {title}
          </h2>
          <p className={`max-w-[620px] text-base ${subtituloTono}`}>{subtitle}</p>
        </div>

        <div>
          {/* En modo preview, no hay botón "Nueva Cancha" */}
          {!isPreview && isAdmin ? (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="press inline-flex items-center gap-2 rounded-xl bg-arena-accent px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-arena-ink hover:bg-arena-accent-hover"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Cancha
            </button>
          ) : !isPreview ? (
            <span className={`rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${chipTono}`}>
              {isAuthenticated ? `Sesión: ${usuario?.nombre} (${usuario?.rol})` : 'Modo explorador'}
            </span>
          ) : null}
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda (solo modo app) */}
      {!isPreview && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* En móvil la fila de disciplinas se desplaza: el degradado
              lateral avisa que hay más chips a la derecha. */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [mask-image:linear-gradient(to_right,#000_calc(100%-28px),transparent)] [scrollbar-width:none] sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
            {DISCIPLINAS.map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDisciplina(d.id)}
                className={`press inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-3.5 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
                  activeDisciplina === d.id ? filtroActivo : filtroInactivo
                }`}
              >
                <span>{d.icon}</span>
                {d.label}
              </button>
            ))}
          </div>

          <div className={`flex min-w-[260px] items-center gap-2 rounded-xl border px-3.5 py-2 transition-[border-color,box-shadow] duration-200 ease-out-soft focus-within:ring-2 ${cajaBusqueda}`}>
            <svg className={`h-[18px] w-[18px] ${iconoBusqueda}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o sector..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`w-full border-none bg-transparent text-sm outline-none focus:outline-none ${inputBusqueda}`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Limpiar búsqueda"
                className={`press flex h-6 w-6 items-center justify-center rounded-md text-lg leading-none ${botonLimpiar}`}
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid de Canchas */}
      {isLoading ? (
        <div className={`rounded-2xl border border-dashed py-16 text-center ${cajaVacia}`}>
          <div className={`mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-[3px] ${esOscuro ? 'border-white/15 border-t-arena-accent-soft' : 'border-arena-ink/15 border-t-arena-ink dark:border-white/15 dark:border-t-arena-accent'}`} />
          <p className={`text-sm font-medium uppercase tracking-[0.14em] ${subtituloTono}`}>Cargando canchas…</p>
        </div>
      ) : canchasAMostrar.length === 0 ? (
        <div className={`rounded-2xl border border-dashed py-16 text-center ${cajaVacia}`}>
          <div className="mb-3 text-4xl">🏟️</div>
          <h3 className={`mb-1 text-lg font-extrabold uppercase tracking-[0.04em] ${tituloTono}`}>No se encontraron canchas</h3>
          <p className={subtituloTono}>No hay canchas registradas para esta disciplina o término de búsqueda.</p>
          {!isPreview && isAdmin && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className={`mt-5 rounded-xl border px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${esOscuro ? 'border-white/20 text-arena-ivory hover:bg-white/10' : 'border-arena-ink/15 text-arena-ink hover:bg-arena-ink/5 dark:border-white/15 dark:text-arena-ivory dark:hover:bg-white/10'}`}
            >
              Crear primera cancha
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]">
            {canchasAMostrar.map(cancha => (
              <CanchaCard
                key={cancha.id_cancha}
                cancha={cancha}
                isAdmin={isAdmin}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteCancha}
                onSelectReserva={handleSelectReserva}
              />
            ))}
          </div>

          {/* CTA "Ver todas" (solo preview) */}
          {isPreview && (
            <div className="text-center mt-12">
              {isAuthenticated ? (
                <Link
                  to="/canchas"
                  className="press inline-flex items-center gap-2.5 rounded-xl bg-arena-accent px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-arena-ink hover:bg-arena-accent-hover motion-safe:hover:-translate-y-0.5"
                >
                  {hayMas ? `Ver todas las canchas (${filteredCanchas.length})` : 'Ver todas y reservar'}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </Link>
              ) : (
                <Link
                  to="/login"
                  state={{ from: '/canchas' }}
                  className="press inline-flex items-center gap-2.5 rounded-xl bg-arena-accent px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-arena-ink hover:bg-arena-accent-hover motion-safe:hover:-translate-y-0.5"
                >
                  Iniciar sesión para reservar
                </Link>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal Crear / Editar Cancha (solo modo app + admin) */}
      {!isPreview && isAdmin && (
        <CanchaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveCancha}
          canchaToEdit={canchaToEdit}
        />
      )}
    </section>
  );
};

export default CanchaList;