import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import IconCanchas from '../assets/icon_canchas.svg?react';
import FieldError from '../components/FieldError';
import ThemeToggle from '../components/ThemeToggle';
import { esCorreoValido } from '../utils/validaciones';

// =====================================================
// TIPOS
// =====================================================
interface FormData {
    correo: string;
    contraseña: string;
}

interface Errores {
    [key: string]: string | undefined;
}

interface Touched {
    [key: string]: boolean;
}

type CampoLogin = 'correo' | 'contraseña';

// =====================================================
// ESTILOS DE CAMPO (sobre vidrio oscuro)
// =====================================================
const campoBase =
    'w-full rounded-xl border bg-white/[0.06] py-3 pl-11 pr-4 text-[15px] text-arena-ivory placeholder:text-arena-ivory/30 outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:bg-white/[0.09] focus:ring-2';

const claseCampo = (conError: boolean, conPasswordToggle = false) =>
    `${campoBase} ${conPasswordToggle ? 'pr-12' : ''} ${conError
        ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
        : 'border-white/12 hover:border-white/25 focus:border-arena-accent/60 focus:ring-arena-accent/15'
    }`;

const etiquetaCampo =
    'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-arena-ivory/45';

// =====================================================
// COMPONENTE
// =====================================================
const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        correo: '',
        contraseña: ''
    });
    const [mostrarContraseña, setMostrarContraseña] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [errores, setErrores] = useState<Errores>({});
    const [touched, setTouched] = useState<Touched>({});
    const [cargando, setCargando] = useState<boolean>(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const validarCampoLogin = (name: string, value: string): string => {
        switch (name) {
            case 'correo':
                if (!value || !value.trim()) return 'El correo es obligatorio.';
                if (!esCorreoValido(value)) return 'Ingresá un correo válido.';
                if (value.length > 150) return 'Correo demasiado largo.';
                return '';
            case 'contraseña':
                if (!value) return 'La contraseña es obligatoria.';
                if (value.length < 6) return 'Mínimo 6 caracteres.';
                if (value.length > 100) return 'Máximo 100 caracteres.';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const nuevosDatos = { ...formData, [name]: value };
        setFormData(nuevosDatos);
        setTouched((prev) => ({ ...prev, [name]: true }));

        const errorCampo = validarCampoLogin(name, value);
        setErrores((prev) => ({ ...prev, [name]: errorCampo }));

        if (error) setError('');
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const errorCampo = validarCampoLogin(name, value);
        setErrores((prev) => ({ ...prev, [name]: errorCampo }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');

        const erroresEncontrados: Errores = {};
        (Object.keys(formData) as CampoLogin[]).forEach((campo) => {
            const err = validarCampoLogin(campo, formData[campo]);
            if (err) erroresEncontrados[campo] = err;
        });

        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            setTouched({ correo: true, contraseña: true });
            return;
        }

        setCargando(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
            const respuesta = await axios.post(`${apiUrl}/auth/login`, {
                correo: formData.correo.toLowerCase().trim(),
                contraseña: formData.contraseña
            });

            login(respuesta.data.token);
            navigate('/dashboard');

        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Error al conectar con el servidor.');
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-arena-base text-arena-ivory dark:bg-arena-night">

            {/* =====================================================
                FONDO CONTINUO — una sola imagen a pantalla completa,
                sin panel partido a la mitad.
                ===================================================== */}
            <img
                src="/images/auth-complex.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(100deg,rgba(21,45,39,0.94)_0%,rgba(21,45,39,0.82)_32%,rgba(28,59,52,0.5)_64%,rgba(28,59,52,0.22)_100%)] dark:bg-[linear-gradient(100deg,rgba(16,16,16,0.92)_0%,rgba(16,16,16,0.78)_32%,rgba(16,16,16,0.46)_64%,rgba(16,16,16,0.2)_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-arena-deep/85 via-arena-deep/10 to-arena-deep/45 dark:from-arena-night/85 dark:via-arena-night/10 dark:to-arena-night/45"
            />
            <div aria-hidden="true" className="pitch-lines pointer-events-none absolute inset-0 opacity-25" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 right-[18%] h-[520px] w-[520px] rounded-full bg-arena-accent/[0.10] blur-[140px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-arena-accent/[0.08] blur-[130px]"
            />

            {/* =====================================================
                CONTENIDO
                ===================================================== */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-5 py-6 sm:px-8 lg:px-10">

                {/* Barra superior */}
                <header className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 rounded-xl"
                        title="Ir al inicio"
                    >
                        <IconCanchas className="h-9 w-9 transition-transform duration-300 ease-out-soft motion-safe:group-hover:rotate-[-4deg]" />
                        <span className="flex flex-col leading-none">
                            <span className="text-[14px] font-extrabold uppercase tracking-[0.18em]">
                                Sport<span className="text-arena-accent-soft">Plex</span>
                            </span>
                            <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.34em] text-arena-ivory/40">
                                Complejo Deportivo
                            </span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2.5">
                        <ThemeToggle variant="dark" />
                        <Link
                            to="/"
                            className="press inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-arena-ivory/70 hover:border-white/30 hover:bg-white/5 hover:text-arena-ivory"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver
                        </Link>
                    </div>
                </header>

                <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-12">

                    {/* =====================================================
                        COLUMNA IZQUIERDA: marca + propuesta de valor
                        ===================================================== */}
                    <div className="hidden lg:block">
                        <span className="anim-rise inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-arena-ivory/55">
                            <span className="h-px w-10 bg-arena-accent-soft" />
                            Acceso al club
                        </span>

                        <h1 className="anim-rise mt-6 text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-balance xl:text-[3.7rem] [animation-delay:60ms]">
                            Entrá a la
                            <br />
                            cancha.
                            <br />
                            <span className="text-arena-accent-soft">Es tu turno.</span>
                        </h1>

                        <p className="anim-rise mt-6 max-w-[420px] text-base leading-relaxed text-arena-ivory/60 [animation-delay:120ms]">
                            Tus reservas, tus pagos y tus torneos en un solo lugar.
                            Horarios reales y confirmación inmediata.
                        </p>

                        <ul className="anim-rise mt-8 space-y-3.5 [animation-delay:180ms]">
                            {[
                                'Disponibilidad actualizada al instante',
                                'Pago con QR, débito o crédito',
                                'Cancelá con hasta 24 h de anticipación',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-arena-ivory/65">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-arena-accent text-arena-ink">
                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="anim-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-arena-ivory/30 [animation-delay:240ms]">
                            <span>06:00 – 23:30</span>
                            <span className="h-1 w-1 rounded-full bg-white/25" />
                            <span>7 disciplinas</span>
                            <span className="h-1 w-1 rounded-full bg-white/25" />
                            <span>Sede La Paz</span>
                        </div>
                    </div>

                    {/* =====================================================
                        COLUMNA DERECHA: formulario de vidrio
                        ===================================================== */}
                    <div className="mx-auto w-full max-w-[460px]">
                        <div className="anim-rise rounded-3xl border border-white/12 bg-arena-deep/90 dark:bg-arena-panel/90 p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">

                            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-arena-ivory/45">
                                <span className="h-1.5 w-1.5 rounded-full bg-arena-accent" />
                                Cuenta de jugador
                            </span>

                            <h2 className="mt-5 text-[1.7rem] font-extrabold uppercase leading-none tracking-tight text-arena-ivory">
                                Iniciar sesión
                            </h2>
                            <p className="mt-2 text-sm text-arena-ivory/50">
                                Ingresá con tu cuenta para reservar tu cancha.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-1" noValidate>

                                {/* CORREO */}
                                <div>
                                    <label htmlFor="login-correo" className={etiquetaCampo}>
                                        Correo electrónico
                                    </label>
                                    <div className="group relative">
                                        <svg
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-arena-ivory/30 transition-colors duration-200 group-focus-within:text-arena-accent-soft"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.9 5.26a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <input
                                            id="login-correo"
                                            type="email"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="nombre@correo.com"
                                            autoComplete="email"
                                            inputMode="email"
                                            autoFocus
                                            maxLength={150}
                                            aria-invalid={Boolean(errores.correo && touched.correo)}
                                            className={claseCampo(Boolean(errores.correo))}
                                        />
                                    </div>
                                    <FieldError error={errores.correo} touched={touched.correo} />
                                </div>

                                {/* CONTRASEÑA */}
                                <div>
                                    <label htmlFor="login-contraseña" className={etiquetaCampo}>
                                        Contraseña
                                    </label>
                                    <div className="group relative">
                                        <svg
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-arena-ivory/30 transition-colors duration-200 group-focus-within:text-arena-accent-soft"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <input
                                            id="login-contraseña"
                                            type={mostrarContraseña ? 'text' : 'password'}
                                            name="contraseña"
                                            value={formData.contraseña}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            maxLength={100}
                                            aria-invalid={Boolean(errores.contraseña && touched.contraseña)}
                                            className={claseCampo(Boolean(errores.contraseña), true)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setMostrarContraseña(!mostrarContraseña)}
                                            aria-label={mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            aria-pressed={mostrarContraseña}
                                            className="press absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-arena-ivory/35 hover:bg-white/10 hover:text-arena-ivory"
                                        >
                                            {mostrarContraseña ? (
                                                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <FieldError error={errores.contraseña} touched={touched.contraseña} />
                                </div>

                                {error && (
                                    <div
                                        role="alert"
                                        className="anim-fade flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm font-medium text-red-200"
                                    >
                                        <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="flex justify-end pt-1.5">
                                    <Link
                                        to="/solicitar-recuperacion"
                                        className="rounded text-[12px] font-semibold text-arena-accent-soft underline-offset-4 hover:text-arena-ivory hover:underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={cargando}
                                    className={`press mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-[13px] font-extrabold uppercase tracking-[0.14em]
                                        ${cargando
                                            ? 'cursor-wait bg-white/15 text-arena-ivory/60'
                                            : 'bg-arena-accent text-arena-ink hover:bg-arena-accent-hover'
                                        }`}
                                >
                                    {cargando && (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-arena-ink/30 border-t-arena-ink" />
                                    )}
                                    {cargando ? 'Ingresando…' : 'Entrar a la cancha'}
                                </button>

                            </form>

                            <p className="mt-6 border-t border-white/10 pt-5 text-center text-[13px] text-arena-ivory/45">
                                ¿Todavía no tenés cuenta?{' '}
                                <Link
                                    to="/registro"
                                    className="rounded font-bold text-arena-ivory underline-offset-4 hover:text-arena-accent-soft hover:underline"
                                >
                                    Creá una gratis
                                </Link>
                            </p>
                        </div>

                        <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-arena-ivory/25">
                            Conexión segura · SportPlex
                        </p>
                    </div>
                </main>

                <footer className="flex flex-wrap items-center justify-between gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-arena-ivory/25">
                    <span>© {new Date().getFullYear()} SportPlex</span>
                    <span>Lun a Dom · 06:00 – 23:30</span>
                </footer>
            </div>
        </div>
    );
};

export default Login;
