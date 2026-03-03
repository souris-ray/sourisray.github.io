/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#1a2328',
                'bg-secondary': '#212d2a',
                'bg-card': '#1e2b27',
                'gold-antique': '#3a5e52',
                'gold-honey': '#4d7a6a',
                burgundy: '#9f3632',
                amber: '#966926',
                'text-primary': '#f0ebe1',
                'text-secondary': '#c4b49a',
                'text-muted': '#927c5d',
            },
            fontFamily: {
                title: ['Cormorant Garamond', 'serif'],
                heading: ['Playfair Display', 'serif'],
                script: ['Libre Baskerville', 'serif'],
                body: ['Crimson Text', 'serif'],
                label: ['Geist', 'sans-serif'],
                mono: ['Geist Mono', 'monospace'],
            },
            spacing: {
                xs: '0.5rem',
                sm: '1rem',
                md: '2rem',
                lg: '3rem',
                xl: '4rem',
                '2xl': '6rem',
            },
            borderRadius: {
                sm: '4px',
                md: '8px',
            },
            transitionDuration: {
                fast: '150ms',
                normal: '300ms',
            },
            boxShadow: {
                md: '0 4px 16px rgba(0, 0, 0, 0.5)',
                'glow-green': '0 0 20px rgba(58, 94, 82, 0.45)',
            },
        },
    },
    plugins: [],
};
