/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta base del Complejo Deportivo
        palette: {
          wine: '#261211',
          petroleum: '#1C3034',
          ivory: '#F1EADA',
          dark: '#101010',
        },

        // ========================================
        // MARCA "ARENA" — derivada 1:1 de la paleta oficial.
        // La landing y el login usan estos alias para no repetir
        // hex en los componentes. En modo claro la superficie es
        // PETRÓLEO (#1C3B34), no beige; en oscuro, CARBÓN (#101010).
        // ========================================
        arena: {
          base: '#1C3B34',        // = claro.primario (petróleo)
          deep: '#152D27',        // = claro.hover
          night: '#101010',       // = oscuro.fondo
          panel: '#1A1A1A',       // = oscuro.tarjeta
          line: '#2A2A2A',        // = oscuro.borde
          accent: '#5FA695',      // = oscuro.primario (esmeralda)
          'accent-hover': '#4A8C7C', // = oscuro.hover
          'accent-soft': '#9FD8C8',  // tinte de #5FA695 para texto sobre verde
          ivory: '#F1EADA',       // = palette.ivory — texto sobre verde y tarjetas
          sand: '#E4D9C4',        // = claro.tinte
          wine: '#8A5A57',        // = oscuro.acento
          ink: '#101010',         // = claro.texto
          ink2: '#5A5350',        // = claro.texto2
        },

        // ========================================
        // MODO CLARO — base IVORY + EMERALD
        // ========================================
        claro: {
          primario: '#1C3B34',   
          hover: '#152D27',     
          tinte: '#E4D9C4',    
          acento: '#261211',     
          fondo: '#F6EADA',     
          tarjeta: '#FBF3E8',   
          borde: '#E0D2BC',     
          texto: '#101010',      
          texto2: '#5A5350',  
        },

        // ========================================
        // MODO OSCURO — base CHARCOAL + EMERALD claro
        // ========================================
        oscuro: {
          primario: '#5FA695',   
          hover: '#4A8C7C',      
          tinte: '#1C3B34',      
          acento: '#8A5A57',    
          fondo: '#101010',      
          tarjeta: '#1A1A1A',   
          borde: '#2A2A2A',      
          texto: '#F6EADA',      
          texto2: '#A09A8E',     
        }
      },

      // Curvas de aceleración con más carácter que ease-in / ease-out.
      // Se usan en toda transición de UI que no sea movimiento continuo.
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-soft': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },

      // Elevación con sombras semitransparentes en lugar de bordes duros.
      boxShadow: {
        soft: '0 1px 2px rgba(16,16,16,0.04), 0 10px 28px -16px rgba(16,16,16,0.22)',
        lift: '0 2px 4px rgba(16,16,16,0.05), 0 22px 44px -20px rgba(16,16,16,0.32)',
      },

      // Animaciones que antes vivían en styles/canchas-landing.css
      // (landing + tarjetas de canchas), migradas aquí para no perderlas.
      keyframes: {
        pulseDot: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(93,167,151,0.6)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 8px rgba(93,167,151,0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(93,167,151,0)' },
        },
        floatOrb1: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(45px,35px) scale(1.12)' },
          '100%': { transform: 'translate(-35px,55px) scale(0.95)' },
        },
        floatOrb2: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-55px,-25px) scale(1.18)' },
          '100%': { transform: 'translate(35px,-45px) scale(0.92)' },
        },
        modalFadeIn: {
          from: { opacity: 0, transform: 'scale(0.96)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite',
        'float-orb-1': 'floatOrb1 16s ease-in-out infinite alternate',
        'float-orb-2': 'floatOrb2 20s ease-in-out infinite alternate',
        'modal-in': 'modalFadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
}
