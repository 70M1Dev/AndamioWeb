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
                 WORDPRESS (dominio temporal de Hostinger)
                 solo Fluent Support: tickets de soporte
```

El sitio es la cara visible de la empresa y no vende nada, así que prioriza
efectos visuales sobre peso: escena 3D (three.js), animaciones con Motion y
scroll suave con Lenis. Aun así se exporta a HTML estático: no hay servidor de
Node y GitHub Pages lo sirve igual que antes.

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
| `public/` | Se copia tal cual: favicon, logos, `CNAME`, `robots.txt`, `sitemap.xml`, `logos.html` |
| `wp-theme/andamio/` | Tema de WordPress para el área de clientes |
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

- **Intro**: el logo se dibuja y sube la cortina. Sale una vez por sesión.
- **Hero**: andamio 3D que se arma pieza por pieza alrededor de una web, sigue
  al mouse y se inclina con el scroll (`components/efectos/EscenaAndamio.tsx`).
- **Proceso**: en escritorio la sección se clava y los pasos pasan de costado.
- Tarjetas que se inclinan, halos que siguen al cursor, botones magnéticos,
  precios que cuentan, cursor propio y grano de película.

Quien tenga activado "reducir movimiento" en el sistema no ve la intro, el
scroll suave ni el cursor propio.

## Tema de WordPress

Usa su propio Tailwind 3, separado del sitio:

```bash
npm run css:wp
```

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
