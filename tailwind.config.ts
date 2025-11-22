import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          light: '#87CEEB',
          DEFAULT: '#5DADE2',
          dark: '#2874A6',
          night: '#1B2631'
        },
        grass: {
          light: '#90EE90',
          DEFAULT: '#7CFC00',
          dark: '#32CD32'
        },
        sunshine: '#FFD700',
        moonlight: '#F0F8FF',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'grow': 'grow 0.5s ease-out',
        'sparkle': 'sparkle 0.6s ease-in-out',
        'rain-fall': 'rain-fall 1s linear infinite',
        'cloud-drift': 'cloud-drift 20s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'rain-fall': {
          '0%': { transform: 'translateY(-100%)', opacity: '0.7' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'cloud-drift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
