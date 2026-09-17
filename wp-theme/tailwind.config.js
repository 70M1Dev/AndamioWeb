// Compilar (desde la raiz del repo):
//   npx tailwindcss@3 -c wp-theme/tailwind.config.js -i wp-theme/input.css -o wp-theme/andamio/assets/css/andamio.css --minify
// Solo para el tema de WordPress del area de clientes. La landing en Next.js
// tiene su propio Tailwind (app/globals.css) y no comparte este CSS.
module.exports = {
    content: ['./wp-theme/andamio/**/*.php'],
    theme: {
        extend: {
            fontFamily: { sans: ['Outfit', 'system-ui', 'sans-serif'] },
            colors: {
                ink: { 900: '#101826', 800: '#1B2536', 700: '#2A3548' },
                beam: { 400: '#FFC53D', 500: '#F5B400', 600: '#D99A00' },
                paper: '#FAF8F3'
            }
        }
    }
};
