# Andamio Web

Sitio de **Andamio Web** — diseño y desarrollo de páginas web en Uruguay.

## Arquitectura

```
   Visitante ──► SITIO (este repo)
                 Next.js + React, exportado a estático (out/)
                 GitHub Pages, publicado por GitHub Actions
                      │
                      │  link "Área de clientes" → Iniciar sesión
                      ▼
                 PANEL DE CLIENTES (panel.andamioweb.com)
                 repo AndamioPanel, en Cloudflare: tickets de soporte
```

El sitio es el principal vendedor de la empresa: todo termina en un WhatsApp
para pedir el boceto gratis. Tiene efectos visuales (escena 3D con three.js,
animaciones con Motion, scroll suave con Lenis), pero solo en escritorio: en
celular, que es de donde entra la mayoría, manda la velocidad de carga. Se
exporta a HTML estático: no hay servidor de Node y GitHub Pages lo sirve tal cual.

## Estructura

| Ruta | Qué es |
|------|--------|
| `app/page.tsx` | La landing: arma las secciones en orden |
| `app/soporte/` | Área de clientes (`/soporte`) |
| `app/layout.tsx` | `<head>`, metadatos para compartir, tipografía Outfit |
| `app/globals.css` | Tailwind 4: paleta (`@theme`) y estilos propios |
| `lib/datos.ts` | **Textos, precios, planes, FAQ y links de WhatsApp** |
| `components/secciones/` | Una sección de la landing por archivo |
| `components/efectos/` | Piezas de animación reutilizables y la escena 3D |
| `lib/dispositivo.ts` | Qué cuenta como celular (sin intro, 3D ni scroll suave) |
| `public/` | Se copia tal cual: favicon, logos, `og.png` (vista previa al compartir), `CNAME`, `robots.txt`, `sitemap.xml`, `logos.html` |
| `.github/workflows/deploy.yml` | Compila y publica en cada push a `main` |
| `cotizador.html` | Herramienta interna, en `.gitignore`: nunca se publica |

Para cambiar un precio o un texto, casi siempre alcanza con `lib/datos.ts`.

## Comandos

```bash
npm install        # la primera vez
npm run dev        # desarrollo con recarga en http://localhost:3000
npm run build      # genera el sitio estático en out/
npm run preview    # sirve out/ en http://localhost:8099
```

`npm run preview` usa http-server, que no resuelve `/soporte` sin extensión:
localmente hay que abrir `/soporte.html`. GitHub Pages sí resuelve las dos.

## Publicar

Hacer push a `main`. El workflow compila y publica solo; no se commitea `out/`.
En GitHub, *Settings → Pages → Source* tiene que estar en **GitHub Actions**.

## Efectos

- **Intro**: el logo se dibuja y sube la cortina. Sale una vez por sesión y
  nunca en celular.
- **Hero**: andamio 3D que se arma pieza por pieza alrededor de una web, sigue
  al mouse y se inclina con el scroll (`components/efectos/EscenaAndamio.tsx`).
  Se carga cuando el navegador queda libre, para no trabar la primera carga;
  en celular hay un andamio dibujado en SVG en su lugar. Las entradas del texto
  son CSS (`.hero-entra`, `.hero-palabra`) para que no esperen al JavaScript.
- **Proceso**: en escritorio la sección se clava y los pasos pasan de costado.
- Tarjetas que se inclinan, halos que siguen al cursor, botones magnéticos,
  precios que cuentan y grano de película.

Quien tenga activado "reducir movimiento" en el sistema, o entre desde un
celular o tablet, no ve la intro ni el scroll suave.

Medición con Lighthouse en celular (23/9/2026): rendimiento 95, bloqueo del
hilo principal 50 ms (antes 37 y 4.090 ms). Si se agrega un efecto, volver a
medir en celular antes de publicar.

## Paleta

| Token | Color | Uso |
|-------|-------|-----|
| `ink-950` | `#0A0F18` | Fondo base oscuro |
| `ink-900` | `#101826` | Fondos oscuros, texto principal |
| `ink-800` | `#1B2536` | |
| `ink-700` | `#2A3548` | Hover de botones oscuros |
| `beam-500` | `#F5B400` | Amarillo de marca, llamadas a la acción |
| `beam-400` | `#FFC53D` | Hover del amarillo |
| `paper` | `#FAF8F3` | Fondo claro |

Tipografía: **Outfit** (servida por `next/font`, sin pedir a Google en cada visita).
