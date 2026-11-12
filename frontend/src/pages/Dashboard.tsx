import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// =====================================================
// TIPOS
// =====================================================
interface Kpi {
    etiqueta: string;
    valor: string;
    detalle: string;
    icono: string;
    acento: string;
}

interface Modulo {
    to: string;
    titulo: string;
    descripcion: string;
    cta: string;
    icono: string;
    iconoBg: string;
    badge?: string;
    badgeClass?: string;
}

// =====================================================
// DATOS
// =====================================================
const KPIS: Kpi[] = [
    {
        etiqueta: 'Canchas',
        valor: '6+',
        detalle: 'Horario 06:00 – 23:30',
        icono: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
        acento: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
    },
    {
        etiqueta: 'Reservas',
        valor: '24/7',
        detalle: 'Confirmación al instante',
        icono: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        acento: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    },
    {
        etiqueta: 'Eventos',
        valor: 'Torneos',
        detalle: 'Inscripciones abiertas',
        icono: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
        acento: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    },
    {
        etiqueta: 'Pagos QR',
        valor: 'Seguro',
        detalle: 'Verificación manual',
        icono: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
        acento: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    },
];

const MODULOS_ADMIN: Modulo[] = [
    {
        to: '/usuarios',
        titulo: 'Gestión de Usuarios',
        descripcion: 'Administrá roles, clientes, empleados y permisos del complejo deportivo.',
        cta: 'Ir al Panel de Usuarios',
        icono: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        iconoBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
        badge: 'Admin',
        badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    },
    {
        to: '/canchas',
        titulo: 'Gestión de Canchas',
        descripcion: 'Creá, editá tarifas y supervisá el estado operativo y la agenda de todas las canchas.',
        cta: 'Administrar Canchas',
        icono: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
        iconoBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
        badge: 'Catálogo',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    {
        to: '/verificar-pagos',
        titulo: 'Verificar Pagos',
        descripcion: 'Revisá los comprobantes QR virtuales y aprobá o rechazá pagos pendientes.',
        cta: 'Ir a Verificación de Pagos',
        icono: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        iconoBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
        badge: 'Finanzas',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    },
    {
        to: '/gestion-reservas',
        titulo: 'Gestión de Reservas',
        descripcion: 'Visualizá, modificá y cancelá las reservas de los usuarios en tiempo real.',
        cta: 'Gestionar Reservas',
        icono: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        iconoBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
        badge: 'Agenda',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
        to: '/gestion-eventos',
        titulo: 'Gestión de Eventos',
        descripcion: 'Programá torneos, asigná canchas y coordiná servicios para eventos deportivos.',
        cta: 'Ir a Gestión de Eventos',
        icono: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
        iconoBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
        badge: 'Torneos',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    },
    {
        to: '/reportes',
        titulo: 'Reportes y Métricas',
        descripcion: 'Analizá ocupación, ingresos por disciplina y comportamiento de reservas.',
        cta: 'Ver Estadísticas',
        icono: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        iconoBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
        badge: 'Análisis',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    },
];

const MODULOS_EMPLEADO: Modulo[] = [
    {
        to: '/verificar-pagos',
        titulo: 'Verificar Pagos',
        descripcion: 'Aprobá o rechazá pagos virtuales pendientes de los clientes de manera rápida.',
        cta: 'Ir a Verificación de Pagos',
        icono: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        iconoBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    },
    {
        to: '/gestion-reservas',
        titulo: 'Gestión de Reservas',
        descripcion: 'Supervisá la agenda diaria, atendé a los clientes y gestioná cambios.',
        cta: 'Ir a Gestión de Reservas',
        icono: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        iconoBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    },
    {
        to: '/gestion-eventos',
        titulo: 'Gestión de Eventos',
        descripcion: 'Consultá los eventos programados en el complejo y asistí a los participantes.',
        cta: 'Ir a Gestión de Eventos',
        icono: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
        iconoBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    },
];

const MODULOS_CLIENTE: Modulo[] = [
    {
        to: '/canchas',
        titulo: 'Reservar Cancha',
        descripcion: 'Explorá disponibilidad en tiempo real, elegí tu horario y agendá tu próximo partido.',
        cta: 'Explorar Canchas',
        icono: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        iconoBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
        badge: 'En vivo',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    {
        to: '/reservas',
        titulo: 'Mis Reservas',
        descripcion: 'Revisá tus turnos agendados, cancelá o modificá reservas y consultá tus pagos.',
        cta: 'Ver Mis Reservas',
        icono: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        iconoBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
        badge: 'Historial',
        badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    },
    {
        to: '/eventos',
        titulo: 'Torneos & Eventos',
        descripcion: 'Descubrí los torneos oficiales, competencias de fin de semana e inscribite.',
        cta: 'Explorar Eventos',
        icono: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
        iconoBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
        badge: 'Activo',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
        to: '/mis-inscripciones',
        titulo: 'Mis Inscripciones',
        descripcion: 'Consultá los eventos a los que te inscribiste y los detalles de cada partido.',
        cta: 'Ver Inscripciones',
        icono: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        iconoBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
        badge: 'Mis Torneos',
        badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    },
];

// =====================================================
// SUBCOMPONENTES
// =====================================================
const KpiCard = ({ kpi, index }: { kpi: Kpi; index: number }) => (
    <div
        className="anim-rise group relative overflow-hidden bg-claro-tarjeta dark:bg-oscuro-tarjeta p-5 rounded-2xl border border-claro-borde dark:border-oscuro-borde shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out-soft motion-safe:hover:-translate-y-0.5 hover:shadow-soft hover:border-claro-primario/25 dark:hover:border-oscuro-primario/35"
        style={{ animationDelay: `${60 + index * 60}ms` }}
    >
        <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase font-bold tracking-wider text-claro-texto2 dark:text-oscuro-texto2">
                {kpi.etiqueta}
            </span>
            <span className={`flex items-center justify-center w-9 h-9 rounded-xl ${kpi.acento}`}>
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={kpi.icono} />
                </svg>
            </span>
        </div>
        <div className="text-2xl md:text-[1.75rem] font-bold leading-tight tabular-nums text-claro-texto dark:text-oscuro-texto">
            {kpi.valor}
        </div>
        <p className="text-xs text-claro-texto2 dark:text-oscuro-texto2 mt-1">{kpi.detalle}</p>
    </div>
);

const ModuloCard = ({ modulo, index }: { modulo: Modulo; index: number }) => (
    <div
        className="anim-rise group bg-claro-tarjeta dark:bg-oscuro-tarjeta p-6 rounded-3xl border border-claro-borde dark:border-oscuro-borde shadow-sm flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-300 ease-out-soft motion-safe:hover:-translate-y-1 hover:shadow-lift hover:border-claro-primario/35 dark:hover:border-oscuro-primario/45"
        style={{ animationDelay: `${Math.min(60 + index * 45, 320)}ms` }}
    >
        <div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${modulo.iconoBg} transition-transform duration-300 ease-out-soft motion-safe:group-hover:scale-105`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={modulo.icono} />
                </svg>
            </div>

            <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-xl font-bold leading-snug text-claro-texto dark:text-oscuro-texto">
                    {modulo.titulo}
                </h3>
                {modulo.badge && (
                    <span className={`shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${modulo.badgeClass}`}>
                        {modulo.badge}
                    </span>
                )}
            </div>

            <p className="text-claro-texto2 dark:text-oscuro-texto2 text-sm leading-relaxed mb-6">
                {modulo.descripcion}
            </p>
        </div>

        <Link
            to={modulo.to}
            className="press w-full py-3 px-4 rounded-xl font-semibold text-sm text-center bg-claro-tinte hover:bg-claro-primario hover:text-white dark:bg-oscuro-tinte dark:hover:bg-oscuro-primario dark:hover:text-oscuro-fondo text-claro-primario dark:text-oscuro-primario transition-colors duration-200 flex items-center justify-center gap-2"
        >
            <span>{modulo.cta}</span>
            <svg
                className="w-4 h-4 transition-transform duration-200 ease-out-soft motion-safe:group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </Link>
    </div>
);

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================
const Dashboard = () => {
    const { usuario } = useAuth();

    const getSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días';
        if (hora < 19) return 'Buenas tardes';
        return 'Buenas noches';
    };

    const fechaFormateada = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const esAdmin = usuario?.rol === 'Administrador' || usuario?.rol === 'Admin';
    const esEmpleado = usuario?.rol === 'Empleado';

    const modulos = esAdmin
        ? MODULOS_ADMIN
        : esEmpleado
            ? MODULOS_EMPLEADO
            : MODULOS_CLIENTE;

    return (
        <div className="space-y-8 pb-10">

            {/* =========================================================
                1. CABECERA PERSONAL
               ========================================================= */}
            <div className="anim-rise relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C3034] via-[#172a2e] to-[#261211] p-8 md:p-10 text-white shadow-lift border border-white/10">
                <div aria-hidden="true" className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#5DA797]/20 blur-3xl pointer-events-none" />
                <div aria-hidden="true" className="absolute right-32 -bottom-20 w-72 h-72 rounded-full bg-[#261211]/40 blur-3xl pointer-events-none" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-[0.07] [background-size:28px_28px] bg-[radial-gradient(#F1EADA_1px,transparent_1px)]"
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-[#F1EADA]">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                                Sesión activa
                            </span>
                            <span className="text-xs uppercase tracking-wider text-slate-300/90 capitalize">
                                {fechaFormateada}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-[2.9rem] font-extrabold tracking-tight leading-[1.08] text-[#F1EADA] text-balance">
                            {getSaludo()}, {usuario?.nombre || 'Usuario'} 👋
                        </h1>

                        <p className="text-slate-300 text-base md:text-lg max-w-xl">
                            Panel de <span className="font-semibold text-[#8fd0c1]">{usuario?.rol || 'Usuario'}</span>. Supervisá reservas, canchas y actividad del complejo en tiempo real.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <Link
                            to="/"
                            className="press motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-[#F1EADA] font-semibold text-sm backdrop-blur-md shadow-sm"
                            title="Volver a la página principal"
                        >
                            <svg className="w-5 h-5 text-[#8fd0c1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Volver al Home</span>
                        </Link>

                        <Link
                            to="/canchas"
                            className="press motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-950/40"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Explorar Canchas</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* =========================================================
                2. MÉTRICAS KPI
               ========================================================= */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {KPIS.map((kpi, i) => (
                    <KpiCard key={kpi.etiqueta} kpi={kpi} index={i} />
                ))}
            </div>

            {/* =========================================================
                3. MÓDULOS DE GESTIÓN
               ========================================================= */}
            <div>
                <div className="anim-rise flex flex-wrap items-end justify-between gap-3 mb-6 [animation-delay:120ms]">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-claro-texto dark:text-oscuro-texto">
                            Módulos de gestión
                        </h2>
                        <p className="text-sm text-claro-texto2 dark:text-oscuro-texto2">
                            Seleccioná un módulo para empezar a operar.
                        </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full border border-claro-borde dark:border-oscuro-borde bg-claro-tarjeta dark:bg-oscuro-tarjeta text-claro-texto2 dark:text-oscuro-texto2">
                        {modulos.length} {modulos.length === 1 ? 'módulo disponible' : 'módulos disponibles'}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {modulos.map((modulo, i) => (
                        <ModuloCard key={modulo.to + modulo.titulo} modulo={modulo} index={i} />
                    ))}
                </div>
            </div>

            {/* =========================================================
                4. BARRA INFORMATIVA
               ========================================================= */}
            <div className="anim-rise rounded-3xl bg-claro-tarjeta dark:bg-oscuro-tarjeta border border-claro-borde dark:border-oscuro-borde p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 [animation-delay:200ms]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-claro-primario/10 dark:bg-oscuro-primario/10 text-claro-primario dark:text-oscuro-primario flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-claro-texto dark:text-oscuro-texto">
                            Complejo Deportivo SportPlex
                        </h4>
                        <p className="text-xs leading-relaxed text-claro-texto2 dark:text-oscuro-texto2">
                            Abierto de lunes a domingo de 06:00 a 23:30 · Césped de última generación e iluminación LED.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                    <Link
                        to="/perfil"
                        className="press flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-center bg-claro-tinte hover:bg-claro-primario hover:text-white dark:bg-oscuro-tinte dark:hover:bg-oscuro-primario dark:hover:text-oscuro-fondo text-claro-primario dark:text-oscuro-primario transition-colors duration-200"
                    >
                        Mi Perfil
                    </Link>
                    <Link
                        to="/"
                        className="press flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors duration-200"
                    >
                        Ver Landing Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
