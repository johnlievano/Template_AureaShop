/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // INDISPENSABLE para el cambio de tema claro/oscuro
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Asegúrate de importar una fuente serif elegante en tu globals.css o layout
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      colors: {
        // Paleta ÁUREA (Retail High-End)
        black: '#000000',
        white: '#ffffff',
        // El rojo de acción que usamos en botones y ofertas
        red: {
          500: '#EF4444',
          600: '#DC2626', // Rojo Áurea Principal
          700: '#B91C1C',
        },
        // Tonos neutros sofisticados
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Fondos específicos
        'dark-bg': '#0a0a0a',   // Fondo modo oscuro
        'light-bg': '#FDFBF7',  // Fondo modo claro (Crema editorial)
      },
      // Animaciones necesarias para los efectos que agregamos
      animation: {
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'zoom-in': 'zoomIn 0.5s ease-out forwards',
        'marquee': 'marquee 25s linear infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      }
    },
  },
  plugins: [],
}