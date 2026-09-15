# Andamio Web

Sitio de **Andamio Web** — diseño y desarrollo de páginas web en Uruguay.

## Arquitectura

```
   Visitante ──► LANDING ESTÁTICA (este repo)
                 GitHub Pages · index.html + assets/
                 HTML + Tailwind compilado, sin JavaScript de framework
                      │
                      │  link "Área de clientes"
                      ▼
                 WORDPRESS (subdominio, Hostinger)
                 solo Fluent Support: tickets de soporte
```

La landing no necesita WordPress: es contenido fijo. WordPress se usa únicamente
para el área de clientes, que sí necesita login y base de datos. Así la landing
—que es lo que trae clientes— no depende de que el WordPress esté en pie.

## Estructura

| Ruta | Qué es |
|------|--------|
| `index.html` | La landing: planes, caso Lupa Ecoart, proceso, FAQ |
| `soporte.html` | Área de clientes (provisoria, hasta que esté el WordPress) |
| `logos.html` | Variantes del logo, herramienta interna |
| `assets/css/andamio.css` | Tailwind compilado — **no editar a mano** |
| `src/input.css` | Fuente de los estilos propios |
| `tailwind.config.js` | Paleta y qué archivos escanea Tailwind |
| `wp-theme/andamio/` | Tema de WordPress para el área de clientes |
| `wp-theme/andamio.zip` | El tema empaquetado, listo para subir a WordPress |

## Estilos

Después de tocar clases en cualquier `.html` o `.php`, hay que recompilar el CSS:

```bash
npx tailwindcss@3 -i src/input.css -o assets/css/andamio.css --minify
cp assets/css/andamio.css wp-theme/andamio/assets/css/andamio.css
```

El mismo CSS sirve a la landing estática y al tema de WordPress: la config
escanea los dos. **No se usa el CDN de Tailwind**, que compila en el navegador
del visitante y agrega ~120 KB de JavaScript.

## Ver el sitio localmente

```bash
npx http-server -p 8099 -c-1
```

## Paleta

| Token | Color | Uso |
|-------|-------|-----|
| `ink-900` | `#101826` | Fondos oscuros, texto principal |
| `ink-800` | `#1B2536` | |
| `ink-700` | `#2A3548` | Hover de botones oscuros |
| `beam-500` | `#F5B400` | Amarillo de marca, llamadas a la acción |
| `beam-400` | `#FFC53D` | Hover del amarillo |
| `paper` | `#FAF8F3` | Fondo claro del cuerpo |

Tipografía: **Outfit** (Google Fonts).
