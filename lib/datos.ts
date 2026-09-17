// Textos y precios del sitio. Para cambiar un precio o una pregunta, se toca acá.

const WHATSAPP = '59894319604';
export const wa = (texto?: string) =>
  `https://wa.me/${WHATSAPP}` + (texto ? `?text=${encodeURIComponent(texto)}` : '');

export const WA_CONSULTA = wa('¡Hola! Quiero consultar por una página web.');

// Portal de clientes: el WordPress con Fluent Support, en el dominio temporal de
// Hostinger. Apunta a /soporte/ porque esa página ya trae el login con el diseño
// de Andamio. Si se vacía, el botón "Iniciar sesión" queda desactivado.
export const PANEL_URL = 'https://blueviolet-stinkbug-914444.hostingersite.com/soporte/';

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
  precio: number;
  items: string[];
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    nombre: 'Landing',
    bajada: 'Para presentar un producto, servicio o emprendimiento.',
    precio: 4690,
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
    precio: 9490,
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
    precio: 6990,
    items: [
      'Hasta 5 secciones (inicio, nosotros, servicios, contacto…)',
      'Novedades o blog que podés actualizar vos',
      'Formularios, mapa y WhatsApp',
      'Planes de servicios personalizables',
      'Boceto en 48 hs',
    ],
  },
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
    p: '¿El precio incluye dominio y hosting?',
    r: 'No, se cotizan aparte. Si ya tenés, usamos los tuyos; si no, te ayudamos a contratarlos a tu nombre para que siempre sean tuyos.',
  },
  {
    p: '¿Cuánto tarda en estar lista?',
    r: 'Una landing, entre 7 y 10 días hábiles. Una web institucional, 2 a 3 semanas. Una tienda online, 3 a 5 semanas. Los plazos corren desde que tenemos tus textos, fotos y logo.',
  },
  {
    p: '¿Cómo se paga?',
    r: '50 % para empezar y 50 % antes de publicar. Aceptamos transferencia bancaria y Mercado Pago.',
  },
  {
    p: '¿Voy a poder editar mi web?',
    r: 'Sí. Te dejamos acceso y una capacitación para cambiar textos, fotos, productos y precios sin depender de nadie.',
  },
  {
    p: '¿Qué pasa si necesito cambios después?',
    r: 'Abrís un ticket desde tu área de clientes y lo seguís hasta que esté resuelto. Los cambios chicos del primer mes están incluidos; después podés sumar el mantenimiento mensual.',
  },
  {
    p: '¿Trabajan con negocios de todo Uruguay?',
    r: 'Sí. Todo el proceso se puede hacer a distancia, por WhatsApp y videollamada.',
  },
];
