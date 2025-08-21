/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 25s linear infinite' },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,.08)' },
    },
  },
  plugins: [],
};
