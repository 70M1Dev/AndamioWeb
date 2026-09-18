// Textos del sitio. Para cambiar un plan o una pregunta, se toca acá.

const WHATSAPP = '59894331117';
export const wa = (texto?: string) =>
  `https://wa.me/${WHATSAPP}` + (texto ? `?text=${encodeURIComponent(texto)}` : '');

export const WA_CONSULTA = wa('¡Hola! Quiero consultar por una página web.');

// Panel de clientes (repo AndamioPanel, en Cloudflare). Si se vacía, el botón
// "Iniciar sesión" de /soporte queda desactivado.
export const PANEL_URL = 'https://panel.andamioweb.com';

export const NAV = [
  { href: '/#planes', label: 'Planes' },
  { href: '/#caso', label: 'Casos' },
  { href: '/#proceso', label: 'Cómo trabajamos' },
  { href: '/#faq', label: 'Preguntas' },
  { href: '/soporte', label: 'Área de clientes' },
];

export const BENEFICIOS = [
  { icono: '🎨', titulo: 'Diseño a medida', texto: 'Con tu identidad, tus colores y tus fotos. Nada de plantillas genéricas.' },
  { icono: '📱', titulo: 'Primero el celular', texto: 'La mayoría de tus clientes te va a ver desde el teléfono.' },
  { icono: '💬', titulo: 'WhatsApp integrado', texto: 'Consultas y pedidos que llegan directo a tu WhatsApp.' },
  { icono: '🛠️', titulo: 'Soporte con tickets', texto: 'Tenés tu área de clientes para pedir cambios y seguir cada pedido.' },
];

export const CINTA = [
  'Diseño a medida', 'Tiendas online', 'Mercado Pago', 'WhatsApp integrado',
  'Primero el celular', 'Webs institucionales', 'Soporte con tickets', 'Hecho en Uruguay',
];

export type Plan = {
  nombre: string;
  bajada: string;
  items: string[];
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    nombre: 'Landing',
    bajada: 'Para presentar un producto, servicio o emprendimiento.',
    items: [
      'Una página con todas tus secciones',
      'Diseño adaptado a celular',
      'Botón de WhatsApp y formulario de contacto',
      'Mapa de ubicación',
      'Boceto en 24 hs',
    ],
  },
  {
    nombre: 'Tienda online',
    bajada: 'Para vender tus productos las 24 horas.',
    destacado: true,
    items: [
      'Catálogo con buscador y filtros',
      'Carrito, checkout y control de stock',
      'Métodos de pago, con tarjeta por Mercado Pago',
      'Cupones de descuento y costos de envío',
      'Panel para gestionar productos, stock y pedidos',
      'Boceto en 48 hs',
    ],
  },
  {
    nombre: 'Web institucional',
    bajada: 'Para empresas y profesionales que necesitan presencia completa.',
    items: [
      'Hasta 5 secciones (inicio, nosotros, servicios, contacto…)',
      'Novedades o blog que podés actualizar vos',
      'Formularios, mapa y WhatsApp',
      'Planes de servicios personalizables',
      'Boceto en 48 hs',
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

export const CASO_PASOS = [
  'Catálogo con buscador, categorías y filtro de precio.',
  'Stock sincronizado: nadie compra algo que no hay.',
  'Checkout con transferencia, WhatsApp, cupones y envío.',
  'Panel para cargar productos, fotos, stock y pedidos.',
];

export const PROCESO = [
  { titulo: 'Charlamos', texto: 'Planificamos una charla presencial o virtual. Nos contás qué hacés, qué necesitás y qué mostrás o vendés.' },
  { titulo: 'Presupuesto', texto: 'Seleccionamos un plan, armamos un presupuesto por todo el conjunto y cerramos fecha de entrega.' },
  { titulo: 'Diseño', texto: 'Primer boceto: te mostramos la primera vista de la página y la ajustamos con tus comentarios.' },
  { titulo: 'Construcción', texto: 'Armamos la web, cargamos el contenido y probamos todo.' },
  { titulo: 'Lanzamiento', texto: 'Publicamos la página y seguimos comunicados mediante el soporte desde tu panel.' },
];

export const FAQ = [
  {
    p: '¿El presupuesto incluye dominio y hosting?',
    r: 'No, se cotizan aparte. Si ya tenés, usamos los tuyos; si no, te ayudamos a contratarlos a tu nombre para que siempre sean tuyos.',
  },
  {
    p: '¿Cuánto tarda en estar lista?',
    r: 'El primer boceto visual de tu página está listo en 24 a 48 horas. Después definimos juntos el plazo para publicarla.',
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
