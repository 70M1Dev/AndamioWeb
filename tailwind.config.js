// Compilar:  npx tailwindcss@3 -i src/input.css -o assets/css/andamio.css --minify
// Un solo CSS para los dos frentes: la landing estatica (index.html) y el tema
// de WordPress del area de clientes (wp-theme/andamio).
module.exports = {
    content: ['./index.html', './soporte.html', './wp-theme/andamio/**/*.php'],
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
