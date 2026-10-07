// Textos del sitio. Para cambiar un plan o una pregunta, se toca acá.

const WHATSAPP = '59894331117';
export const wa = (texto?: string) =>
  `https://wa.me/${WHATSAPP}` + (texto ? `?text=${encodeURIComponent(texto)}` : '');

export const WA_CONSULTA = wa('¡Hola! Quiero consultar por una página web.');
export const WA_BOCETO = wa('¡Hola! Quiero pedir el boceto gratis de mi página web.');

export const INSTAGRAM = 'https://www.instagram.com/andamio.web/';

// Panel de clientes (repo AndamioPanel, en Cloudflare). Si se vacía, el botón
// "Iniciar sesión" de /soporte queda desactivado.
export const PANEL_URL = 'https://panel.andamioweb.com';

// En el mismo orden en que aparecen las secciones en la home.
export const NAV = [
  { href: '/#caso', label: 'Casos' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#proceso', label: 'Cómo trabajamos' },
  { href: '/#faq', label: 'Preguntas' },
  { href: '/soporte', label: 'Área de clientes' },
];

// `dibujo` elige la ilustración animada de cada tarjeta (ver Beneficios.tsx).
export type Beneficio = { dibujo: 'diseno' | 'celular' | 'whatsapp' | 'soporte'; titulo: string; texto: string };

export const BENEFICIOS: Beneficio[] = [
  { dibujo: 'diseno', titulo: 'Diseño a medida', texto: 'Con tu identidad, tus colores y tus fotos. Nada de plantillas genéricas.' },
  { dibujo: 'celular', titulo: 'Primero el celular', texto: 'La mayoría de tus clientes te va a ver desde el teléfono.' },
  { dibujo: 'whatsapp', titulo: 'WhatsApp integrado', texto: 'Consultas y pedidos que llegan directo a tu WhatsApp.' },
  { dibujo: 'soporte', titulo: 'Soporte con tickets', texto: 'Tenés tu área de clientes para pedir cambios y seguir cada pedido.' },
];

export type Plan = {
  nombre: string;
  icono: 'landing' | 'tienda' | 'reservas';
  bajada: string;
  items: string[];
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    nombre: 'Landing empresarial',
    icono: 'landing',
    bajada: 'Para presentar tu empresa, servicio o emprendimiento en una sola página.',
    items: [
      'Una página con todas tus secciones',
      'Diseño adaptado a celular',
      'Botón de WhatsApp y formulario de contacto',
      'Mapa de ubicación',
      'Boceto gratis en 24 hs',
    ],
  },
  {
    nombre: 'Tienda online',
    icono: 'tienda',
    bajada: 'Para vender tus productos las 24 horas.',
    destacado: true,
    items: [
      'Catálogo con buscador y filtros',
      'Carrito, checkout y control de stock',
      'Métodos de pago, con tarjeta por Mercado Pago',
      'Cupones de descuento y costos de envío',
      'Panel para gestionar productos, stock y pedidos',
      'Boceto gratis en 48 hs',
    ],
  },
  {
    nombre: 'Web + Sistema de reservas',
    icono: 'reservas',
    bajada: 'Para que tus clientes reserven turnos solos, a cualquier hora.',
    items: [
      'Web con tus servicios, equipo y contacto',
      'Agenda online con tus días y horarios',
      'Confirmación de reservas por WhatsApp o correo',
      'Panel para ver, mover y cancelar turnos',
      'Bloqueo de feriados, vacaciones y horarios',
      'Boceto gratis en 48 hs',
    ],
  },
];

// Lo que mueve el presupuesto de cada plan. Se muestra debajo de las tarjetas.
export const FACTORES = [
  { titulo: 'Diseño', texto: 'Cuánto trabajo de diseño lleva: desde adaptar una estructura probada hasta una identidad visual pensada de cero.' },
  { titulo: 'Tecnología', texto: 'HTML estático, liviano y rápido, o React para sitios con más interacción y contenido que cambia.' },
  { titulo: 'Visuales', texto: 'Animaciones, efectos al hacer scroll, escenas 3D o ilustraciones: cuánto querés que se mueva y sorprenda.' },
  { titulo: 'Contenido', texto: 'Cantidad de secciones y productos, y si los textos y las fotos los traés vos o los armamos nosotros.' },
];

export const AGREGADOS = [
  'Secciones o páginas adicionales',
  'Avisos de pedidos por WhatsApp',
  'Carga de productos',
  'Redacción de textos y fotos',
  'Diseño de logo',
  'Dominio y hosting',
  'Correos con tu dominio',
  'Mantenimiento mensual',
];

// Trabajos de la sección Casos. Para sacar uno, se borra su bloque entero.
// Las capturas están en public/casos. Cada vista tiene dos: `src` para la
// ventana de escritorio (todas las de un caso con la misma proporción,
// `proporcion`) y `movil` para el celular (390x797: lo que queda de una
// pantalla de 390x844 debajo de la barra de estado). `barraMovil` es el color
// de arriba de esa captura, que continúa en la barra de estado dibujada.
export type Caso = {
  nombre: string;
  tipo: string;
  rubro: string; // a qué se dedica el negocio; todos los casos se presentan igual
  texto: string;
  puntos: string[];
  enlace?: { href: string; texto: string };
  barra: string; // lo que dice la barra del navegador dibujado
  fondo: string;
  proporcion: string;
  capturas: { nombre: string; src: string; alt: string; movil: string; barraMovil: string }[];
  nota: string;
};

export const CASOS: Caso[] = [
  {
    nombre: 'Lupa Ecoart',
    tipo: 'Tienda online',
    rubro: 'Papelería',
    texto: 'Tienda online de papelería, corte láser y productos reciclables. Construimos el catálogo, el carrito y un panel propio para que la dueña maneje todo desde el celular.',
    puntos: [
      'Catálogo con buscador, categorías y filtro de precio.',
      'Stock sincronizado: nadie compra algo que no hay.',
      'Checkout con transferencia, WhatsApp, cupones y envío.',
      'Panel para cargar productos, fotos, stock y pedidos.',
    ],
    enlace: { href: 'https://lupaecoart.site', texto: 'Visitar lupaecoart.site' },
    barra: 'lupaecoart.site',
    fondo: '#E6EBB1',
    proporcion: '1280 / 672',
    capturas: [
      { nombre: 'La tienda', src: '/casos/lupa-tienda.webp', alt: 'Portada de la tienda de Lupa Ecoart con sus productos destacados', movil: '/casos/lupa-tienda-cel.webp', barraMovil: '#FFFFFF' },
      { nombre: 'Un producto', src: '/casos/lupa-producto.webp', alt: 'Ficha de un producto en la tienda de Lupa Ecoart, con medidas y botón de compra', movil: '/casos/lupa-producto-cel.webp', barraMovil: '#FFFFFF' },
      { nombre: 'El panel', src: '/casos/lupa-panel.webp', alt: 'Panel de Lupa Ecoart para manejar productos y stock', movil: '/casos/lupa-panel-cel.webp', barraMovil: '#8F9B2F' },
    ],
    nota: 'Capturas de la demo, con productos de ejemplo.',
  },
  {
    nombre: 'Pc Fix',
    tipo: 'Web + sistema a medida',
    rubro: 'Servicio técnico',
    texto: 'Servicio técnico de PC y notebooks en Montevideo. Construimos la web y un sistema para llevar las reparaciones: el taller carga cada orden y cada cliente sigue su equipo desde el celular.',
    puntos: [
      'Web con servicios, agenda y pedido de cotización.',
      'Panel interno con las órdenes de reparación y su estado.',
      'Seguimiento online: el cliente consulta su equipo con un código.',
      'Constancias con firma en pantalla, listas en PDF.',
    ],
    barra: 'Pc Fix',
    fondo: '#DCE7FF',
    proporcion: '1280 / 800',
    capturas: [
      { nombre: 'La web', src: '/casos/pcfix-inicio.webp', alt: 'Portada del sitio de Pc Fix, servicio técnico de computadoras', movil: '/casos/pcfix-web-cel.webp', barraMovil: '#FFFFFF' },
      { nombre: 'El panel', src: '/casos/pcfix-panel.webp', alt: 'Panel de Pc Fix con las órdenes de reparación y su estado', movil: '/casos/pcfix-panel-cel.webp', barraMovil: '#FFFFFF' },
      { nombre: 'El seguimiento', src: '/casos/pcfix-seguimiento.webp', alt: 'Seguimiento de una reparación en Pc Fix, con el historial paso a paso', movil: '/casos/pcfix-seguimiento-cel.webp', barraMovil: '#FFFFFF' },
    ],
    nota: 'Capturas con datos de ejemplo.',
  },
];

// Capítulos del video de la sección Demo (segundo en que empieza cada parte).
export const DEMO_CAPITULOS = [
  { titulo: 'Tu tienda', segundo: 12.7 },
  { titulo: 'Compras', segundo: 56 },
  { titulo: 'Pedidos', segundo: 90.5 },
  { titulo: 'Soporte', segundo: 110.4 },
  { titulo: 'En el celular', segundo: 181 },
];

export const PROCESO = [
  { titulo: 'Charlamos', texto: 'Por WhatsApp, videollamada o en persona. Nos contás qué hacés, qué necesitás y qué mostrás o vendés.' },
  { titulo: 'Boceto gratis', texto: 'En 24 a 48 horas te mostramos la primera vista de tu página. Sin costo y sin compromiso.' },
  { titulo: 'Presupuesto', texto: 'Con el boceto a la vista, elegimos el plan, armamos un presupuesto por todo el conjunto y cerramos fecha de entrega.' },
  { titulo: 'Construcción', texto: 'Armamos la web, cargamos el contenido, la ajustamos con tus comentarios y probamos todo.' },
  { titulo: 'Lanzamiento', texto: 'Publicamos la página a tu nombre y seguimos comunicados mediante el soporte desde tu panel.' },
];

export const FAQ = [
  {
    p: '¿El boceto tiene costo?',
    r: 'No. Te mostramos cómo se vería la primera vista de tu página antes de pedirte nada. Si te gusta, armamos el presupuesto; si no, no pasa nada.',
  },
  {
    p: '¿El presupuesto incluye dominio y hosting?',
    r: 'No, se cotizan aparte. Si ya tenés, usamos los tuyos; si no, te ayudamos a contratarlos a tu nombre para que siempre sean tuyos.',
  },
  {
    p: '¿Cuánto tarda en estar lista?',
    r: 'El boceto de tu página está listo en 24 a 48 horas, y es gratis. Después definimos juntos el plazo para publicarla.',
  },
  {
    p: '¿Cómo se paga?',
    r: '50 % para empezar y 50 % antes de publicar. Aceptamos efectivo, transferencia bancaria, Mercado Pago y PayPal.',
  },
  {
    p: '¿Qué pasa si necesito cambios después?',
    r: 'Abrís un ticket desde tu área de clientes y evaluamos el pedido según la escala del cambio. Si es un cambio grande, te lo cotizamos.',
  },
  {
    p: '¿Trabajan con negocios de todo Uruguay?',
    r: 'Sí. Todo el proceso se puede hacer a distancia, por WhatsApp y videollamada.',
  },
];
