/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sagittarius Brand Colors - Extracted from Reference Images
        'sage': {
          'bg': '#050A12',           // Primary background - dark navy
          'deep': '#000010',        // Very dark areas/shadows
          'accent': '#53D5FF',      // Bright cyan accent
          'text': '#B8BBC4',        // Muted light gray text
          'text-light': '#E2E5EA',  // Lighter text variant
          'card': '#0A1220',        // Card backgrounds
          'border': '#1A2332',      // Borders and dividers
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif'
        ],
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #53D5FF, 0 0 10px #53D5FF' },
          '100%': { boxShadow: '0 0 10px #53D5FF, 0 0 20px #53D5FF, 0 0 30px #53D5FF' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

