import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)'],
      },
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#dce9ff',
          200: '#b9d3ff',
          300: '#8bb5ff',
          400: '#5a92ff',
          500: '#336bff',
          600: '#234ef2',
          700: '#1d3dd5',
          800: '#1f36a8',
          900: '#1f337f',
          950: '#111a44',
        },
      },
      boxShadow: {
        glow: '0 0 45px rgba(51, 107, 255, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
