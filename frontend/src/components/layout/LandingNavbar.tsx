/**
 * ============================================================================
 * ARCHIVO: LandingNavbar.tsx
 * COMPONENTE: Barra de navegación pública principal
 * - Lenguaje visual "estadio nocturno": vidrio oscuro, acento lima y
 *   etiquetas en mayúsculas con tracking amplio.
 * - Visitante anónimo: Ingresar / Registro / Reservar
 * - Usuario logueado:  Panel + ThemeToggle + avatar con dropdown
 * - Menú móvil propio (antes no existía: en pantallas chicas no había nav).
 * ============================================================================
 */

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFotoPerfil } from '../../hooks/useFotoPerfil';
import ThemeToggle from '../ThemeToggle';
import IconCanchas from '../../assets/icon_canchas.svg?react';

const ENLACES = [
  { href: '#canchas', label: 'Canchas' },
  { href: '#como-funciona', label: 'Cómo reservar' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
];

export const LandingNavbar = () => {
  const { usuario, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const fotoUrl = useFotoPerfil();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAdmin = usuario?.rol === 'Admin' || usuario?.rol === 'Administrador';
  const iniciales = usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Cerrar dropdown al click fuera
  useEffect(() => {
    const handleClickFuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  // El menú móvil no debe quedar abierto al pasar a desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const cerrar = () => mq.matches && setMenuMovil(false);
    mq.addEventListener('change', cerrar);
    return () => mq.removeEventListener('change', cerrar);
  }, []);

  // =====================================================
  // ESTILOS COMPARTIDOS
  // =====================================================
  const enlaceNav =
    'group relative text-[11px] font-bold uppercase tracking-[0.18em] text-arena-ivory/55 transition-colors duration-200 hover:text-arena-ivory';

  const ctaLima =
    'press inline-flex items-center justify-center gap-2 rounded-xl bg-arena-accent px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-arena-ink hover:bg-arena-accent-hover';

  const ctaGhost =
    'press inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-arena-ivory/85 hover:border-white/30 hover:bg-white/5 hover:text-arena-ivory';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-arena-deep/95 backdrop-blur-xl dark:bg-arena-night/90">
      {/* Filo de acento: da el marco de "transmisión" */}
      <div aria-hidden="true" className="h-[2px] w-full bg-gradient-to-r from-arena-accent via-arena-accent/70 to-transparent" />

      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-4 px-5 md:px-6">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-xl"
          title="Ir a la página principal / Home"
          onClick={() => setMenuMovil(false)}
        >
          <IconCanchas className="h-9 w-9 shrink-0 transition-transform duration-300 ease-out-soft motion-safe:group-hover:rotate-[-4deg]" />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold uppercase tracking-[0.18em] text-arena-ivory">
              Sport<span className="text-arena-accent-soft">Plex</span>
            </span>
            <span className="mt-1.5 text-[8.5px] font-semibold uppercase tracking-[0.36em] text-arena-ivory/40">
              Complejo Deportivo
            </span>
          </div>
        </Link>

        {/* NAV PÚBLICA */}
        <nav className="hidden items-center gap-7 md:flex">
          {ENLACES.map((enlace) => (
            <a key={enlace.href} href={enlace.href} className={enlaceNav}>
              {enlace.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-arena-accent transition-[width] duration-300 ease-out-soft group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* ZONA DERECHA */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle variant="dark" />

          {isAuthenticated ? (
            <>
              <Link
                to={isAdmin ? '/usuarios' : '/dashboard'}
                className={`${ctaGhost} hidden sm:inline-flex`}
              >
                {isAdmin ? 'Panel Admin' : 'Mi Panel'}
              </Link>

              {/* Dropdown de usuario */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  aria-expanded={menuAbierto}
                  aria-haspopup="menu"
                  className="press flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-2 hover:border-white/20 hover:bg-white/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-arena-accent text-sm font-extrabold text-arena-ink">
                    {fotoUrl ? (
                      <img src={fotoUrl} alt="Perfil" className="h-full w-full object-cover" />
                    ) : (
                      iniciales
                    )}
                  </span>
                  <span className="hidden max-w-[110px] truncate text-xs font-semibold text-arena-ivory/85 md:block">
                    {usuario?.nombre || 'Perfil'}
                  </span>
                  <svg
                    className={`h-4 w-4 text-arena-ivory/50 transition-transform duration-200 ${menuAbierto ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuAbierto && (
                  <div
                    role="menu"
                    className="anim-fade absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-arena-deep/95 p-1.5 dark:bg-arena-panel/95 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                  >
                    <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-arena-ivory/35">
                      {usuario?.rol || 'Sesión'}
                    </p>

                    <Link
                      to={isAdmin ? '/usuarios' : '/dashboard'}
                      onClick={() => setMenuAbierto(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-arena-ivory/80 transition-colors hover:bg-white/5 hover:text-arena-ivory"
                    >
                      <svg className="h-4 w-4 text-arena-accent-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {isAdmin ? 'Panel Admin' : 'Mi Panel'}
                    </Link>

                    <Link
                      to="/eventos"
                      onClick={() => setMenuAbierto(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-arena-ivory/80 transition-colors hover:bg-white/5 hover:text-arena-ivory"
                    >
                      <svg className="h-4 w-4 text-arena-ivory/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Eventos
                    </Link>

                    <Link
                      to="/perfil"
                      onClick={() => setMenuAbierto(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-arena-ivory/80 transition-colors hover:bg-white/5 hover:text-arena-ivory"
                    >
                      <svg className="h-4 w-4 text-arena-ivory/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi perfil
                    </Link>

                    <div className="my-1 h-px bg-white/10" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={`${ctaGhost} hidden sm:inline-flex`}>
                Ingresar
              </Link>
              <a href="#canchas" className={`${ctaLima} hidden sm:inline-flex`}>
                Reservar
              </a>
            </>
          )}

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setMenuMovil(!menuMovil)}
            aria-expanded={menuMovil}
            aria-controls="menu-movil"
            aria-label={menuMovil ? 'Cerrar menú' : 'Abrir menú'}
            className="press flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-arena-ivory md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuMovil ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* =====================================================
          MENÚ MÓVIL
          ===================================================== */}
      {menuMovil && (
        <div id="menu-movil" className="anim-fade border-t border-white/10 bg-arena-deep/95 px-5 pb-6 dark:bg-arena-panel/95 pt-4 md:hidden">
          <nav className="flex flex-col">
            {ENLACES.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={() => setMenuMovil(false)}
                className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-arena-ivory/70 transition-colors hover:text-arena-ivory"
              >
                {enlace.label}
                <svg className="h-4 w-4 text-arena-ivory/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? '/usuarios' : '/dashboard'}
                  onClick={() => setMenuMovil(false)}
                  className={`${ctaLima} w-full`}
                >
                  {isAdmin ? 'Ir al Panel Admin' : 'Ir a Mi Panel'}
                </Link>
                <a href="#canchas" onClick={() => setMenuMovil(false)} className={`${ctaGhost} w-full`}>
                  Reservar cancha
                </a>
              </>
            ) : (
              <>
                <a href="#canchas" onClick={() => setMenuMovil(false)} className={`${ctaLima} w-full`}>
                  Reservar cancha
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link to="/login" onClick={() => setMenuMovil(false)} className={`${ctaGhost} w-full`}>
                    Ingresar
                  </Link>
                  <Link to="/registro" onClick={() => setMenuMovil(false)} className={`${ctaGhost} w-full`}>
                    Registro
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
