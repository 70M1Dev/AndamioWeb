<?php
/**
 * Portada: landing de servicios de Andamio Web.
 */
if (!defined('ABSPATH')) exit;
get_header();

$planes = [
    [
        'nombre' => 'Landing',
        'texto' => 'Para presentar un producto, servicio o emprendimiento.',
        'precio' => '$ 4.690',
        'destacado' => false,
        'items' => [
            'Una página con todas tus secciones',
            'Diseño adaptado a celular',
            'Botón de WhatsApp y formulario de contacto',
            'Mapa de ubicación',
            'Boceto en 24 hs',
        ],
    ],
    [
        'nombre' => 'Tienda online',
        'texto' => 'Para vender tus productos las 24 horas.',
        'precio' => '$ 9.490',
        'destacado' => true,
        'items' => [
            'Catálogo con buscador y filtros',
            'Carrito, checkout y control de stock',
            'Métodos de pago, con tarjeta por Mercado Pago',
            'Cupones de descuento y costos de envío',
            'Panel para gestionar productos, stock y pedidos',
            'Boceto en 48 hs',
        ],
    ],
    [
        'nombre' => 'Web institucional',
        'texto' => 'Para empresas y profesionales que necesitan presencia completa.',
        'precio' => '$ 6.990',
        'destacado' => false,
        'items' => [
            'Hasta 5 secciones (inicio, nosotros, servicios, contacto…)',
            'Novedades o blog que podés actualizar vos',
            'Formularios, mapa y WhatsApp',
            'Planes de servicios personalizables',
            'Boceto en 48 hs',
        ],
    ],
];

$agregados = [
    'Secciones o páginas adicionales', 'Avisos de pedidos por WhatsApp',
    'Carga de productos', 'Redacción de textos y fotos', 'Diseño de logo',
    'Dominio y hosting', 'Correos con tu dominio', 'Mantenimiento mensual',
];

$pasos = [
    ['Charlamos', 'Por WhatsApp o videollamada: qué hacés, qué necesitás y a quién le vendés.'],
    ['Presupuesto', 'Plan, agregados, precio cerrado y fecha de entrega.'],
    ['Diseño', 'Te mostramos la propuesta y la ajustamos con tus comentarios.'],
    ['Construcción', 'Armamos la web, cargamos el contenido y probamos todo.'],
    ['Lanzamiento', 'La publicamos y seguís con soporte desde tu área de clientes.'],
];

$faq = [
    ['¿El precio incluye dominio y hosting?', 'No, se cotizan aparte. Si ya tenés, usamos los tuyos; si no, te ayudamos a contratarlos a tu nombre para que siempre sean tuyos.'],
    ['¿Cuánto tarda en estar lista?', 'Una landing, entre 7 y 10 días hábiles. Una web institucional, 2 a 3 semanas. Una tienda online, 3 a 5 semanas. Los plazos corren desde que tenemos tus textos, fotos y logo.'],
    ['¿Cómo se paga?', '50 % para empezar y 50 % antes de publicar. Aceptamos transferencia bancaria y Mercado Pago.'],
    ['¿Voy a poder editar mi web?', 'Sí. Te dejamos acceso y una capacitación para cambiar textos, fotos, productos y precios sin depender de nadie.'],
    ['¿Qué pasa si necesito cambios después?', 'Abrís un ticket desde tu área de clientes y lo seguís hasta que esté resuelto. Los cambios chicos del primer mes están incluidos; después podés sumar el mantenimiento mensual.'],
    ['¿Trabajan con negocios de todo Uruguay?', 'Sí. Todo el proceso se puede hacer a distancia, por WhatsApp y videollamada.'],
];
?>

<main>
    <!-- ================= HERO ================= -->
    <section class="bg-ink-900 text-white scaffold-bg">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <p class="inline-block mb-5 px-3 py-1 rounded-full border border-beam-500/40 text-beam-400 text-xs font-semibold tracking-wide uppercase">Diseño web en Uruguay</p>
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05]">
                    Construimos la web de tu <span class="text-beam-500">negocio</span>.
                </h1>
                <p class="mt-6 text-lg text-white/75 max-w-lg">
                    Landings, webs institucionales y tiendas online hechas a medida. Rápidas, pensadas para el celular y conectadas a tu WhatsApp.
                </p>
                <div class="mt-8 flex flex-col sm:flex-row gap-3">
                    <a href="#planes" class="px-6 py-3 rounded-full bg-beam-500 hover:bg-beam-400 text-ink-900 font-semibold text-center transition">Ver planes</a>
                    <a href="#caso" class="px-6 py-3 rounded-full border border-white/25 hover:border-white/60 font-semibold text-center transition">Ver un caso real</a>
                </div>
            </div>

            <div class="relative" aria-hidden="true">
                <div class="rounded-2xl bg-white text-ink-900 shadow-2xl overflow-hidden rotate-1">
                    <div class="flex gap-1.5 px-4 py-3 bg-neutral-100">
                        <span class="w-3 h-3 rounded-full bg-red-400"></span>
                        <span class="w-3 h-3 rounded-full bg-beam-500"></span>
                        <span class="w-3 h-3 rounded-full bg-green-400"></span>
                        <span class="ml-3 flex-1 h-3 rounded-full bg-neutral-200"></span>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="h-5 w-2/3 rounded bg-ink-800"></div>
                        <div class="h-3 w-full rounded bg-neutral-200"></div>
                        <div class="h-3 w-5/6 rounded bg-neutral-200"></div>
                        <div class="grid grid-cols-3 gap-3 pt-2">
                            <div class="h-20 rounded-xl bg-beam-400/60"></div>
                            <div class="h-20 rounded-xl bg-neutral-200"></div>
                            <div class="h-20 rounded-xl bg-neutral-200"></div>
                        </div>
                        <div class="h-9 w-32 rounded-full bg-ink-900"></div>
                    </div>
                </div>
                <div class="absolute -bottom-5 -left-4 bg-beam-500 text-ink-900 rounded-2xl px-4 py-3 shadow-xl text-sm font-semibold">
                    📱 Lista para celular
                </div>
            </div>
        </div>
    </section>

    <!-- ================= BENEFICIOS ================= -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <?php foreach ([
            ['🎨', 'Diseño a medida', 'Con tu identidad, tus colores y tus fotos. Nada de plantillas genéricas.'],
            ['📱', 'Primero el celular', 'La mayoría de tus clientes te va a ver desde el teléfono.'],
            ['💬', 'WhatsApp integrado', 'Consultas y pedidos que llegan directo a tu WhatsApp.'],
            ['🛠️', 'Soporte con tickets', 'Tenés tu área de clientes para pedir cambios y seguir cada pedido.'],
        ] as [$icono, $titulo, $texto]) : ?>
            <div class="p-6 rounded-2xl bg-white border border-neutral-200">
                <p class="text-2xl mb-3"><?php echo $icono; ?></p>
                <h3 class="font-semibold mb-1"><?php echo esc_html($titulo); ?></h3>
                <p class="text-sm text-neutral-600"><?php echo esc_html($texto); ?></p>
            </div>
        <?php endforeach; ?>
    </section>

    <!-- ================= PLANES ================= -->
    <section id="planes" class="bg-white border-y border-neutral-200 scroll-mt-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div class="text-center max-w-2xl mx-auto mb-12">
                <h2 class="text-3xl md:text-4xl font-bold">Planes</h2>
                <p class="mt-3 text-neutral-600">Elegí la base y la ajustamos a lo que necesitás. Los agregados se cotizan aparte.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 items-stretch">
                <?php foreach ($planes as $plan) :
                    $d = $plan['destacado'];
                    $link = andamio_wa('¡Hola! Me interesa el plan ' . $plan['nombre'] . ' de Andamio Web.');
                ?>
                    <article class="relative flex flex-col p-7 rounded-3xl <?php echo $d ? 'bg-ink-900 text-white shadow-xl md:-translate-y-3' : 'border border-neutral-200 bg-paper'; ?>">
                        <?php if ($d) : ?>
                            <span class="absolute -top-3 left-7 px-3 py-1 rounded-full bg-beam-500 text-ink-900 text-xs font-bold">Más elegido</span>
                        <?php endif; ?>
                        <h3 class="text-xl font-bold"><?php echo esc_html($plan['nombre']); ?></h3>
                        <p class="text-sm mt-1 <?php echo $d ? 'text-white/70' : 'text-neutral-600'; ?>"><?php echo esc_html($plan['texto']); ?></p>
                        <p class="mt-6">
                            <span class="text-sm <?php echo $d ? 'text-white/60' : 'text-neutral-500'; ?>">Desde</span><br>
                            <span class="text-4xl font-extrabold"><?php echo esc_html($plan['precio']); ?></span>
                        </p>
                        <ul class="mt-6 space-y-2 text-sm flex-1">
                            <?php foreach ($plan['items'] as $item) : ?>
                                <li class="flex gap-2"><span class="font-bold <?php echo $d ? 'text-beam-500' : 'text-beam-600'; ?>">✓</span><?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <a href="<?php echo esc_url($link); ?>" target="_blank" rel="noopener"
                           class="mt-8 block text-center px-6 py-3 rounded-full font-semibold transition <?php echo $d ? 'bg-beam-500 hover:bg-beam-400 text-ink-900' : 'bg-ink-900 hover:bg-ink-700 text-white'; ?>">Quiero este plan</a>
                    </article>
                <?php endforeach; ?>
            </div>

            <p class="mt-8 text-center text-sm text-neutral-500">Precios en pesos uruguayos (UYU).</p>

            <div class="mt-8 p-7 rounded-3xl bg-paper border border-dashed border-beam-600/50">
                <h3 class="font-bold text-lg">Agregados <span class="text-sm font-medium text-neutral-500">· costo extra, se cotizan según el proyecto</span></h3>
                <ul class="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-neutral-700">
                    <?php foreach ($agregados as $agregado) : ?>
                        <li>➕ <?php echo esc_html($agregado); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </section>

    <!-- ================= CASO REAL ================= -->
    <section id="caso" class="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center scroll-mt-16">
        <div>
            <p class="text-sm font-semibold text-beam-600 uppercase tracking-wide">Caso real</p>
            <h2 class="text-3xl md:text-4xl font-bold mt-2">Lupa Ecoart</h2>
            <p class="mt-4 text-neutral-600">
                Tienda online de papelería, corte láser y productos reciclables. Construimos el catálogo, el carrito y un panel propio para que la dueña maneje todo desde el celular.
            </p>
            <ul class="mt-6 space-y-3 text-sm">
                <?php foreach ([
                    'Catálogo con buscador, categorías y filtro de precio.',
                    'Stock sincronizado: nadie compra algo que no hay.',
                    'Checkout con transferencia, WhatsApp, cupones y envío.',
                    'Panel para cargar productos, fotos, stock y pedidos.',
                ] as $i => $punto) : ?>
                    <li class="flex gap-3"><span class="shrink-0 w-6 h-6 rounded-full bg-beam-500 text-ink-900 text-xs font-bold flex items-center justify-center"><?php echo $i + 1; ?></span><?php echo esc_html($punto); ?></li>
                <?php endforeach; ?>
            </ul>
            <a href="https://lupaecoart.site" target="_blank" rel="noopener" class="inline-block mt-8 px-6 py-3 rounded-full bg-ink-900 hover:bg-ink-700 text-white font-semibold transition">Visitar lupaecoart.site ↗</a>
        </div>
        <div class="rounded-3xl bg-[#E6EBB1] p-8 md:p-10" aria-hidden="true">
            <div class="rounded-2xl bg-white shadow-xl overflow-hidden">
                <div class="h-10 bg-[#8F9B2F] flex items-center px-4 text-white text-sm font-semibold">Lupa Ecoart</div>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <div class="space-y-2"><div class="h-24 rounded-xl bg-[#7ABFB1]/50"></div><div class="h-3 w-3/4 rounded bg-neutral-200"></div><div class="h-3 w-1/3 rounded bg-[#FCA321]"></div></div>
                    <div class="space-y-2"><div class="h-24 rounded-xl bg-[#FCA321]/40"></div><div class="h-3 w-2/3 rounded bg-neutral-200"></div><div class="h-3 w-1/3 rounded bg-[#FCA321]"></div></div>
                    <div class="space-y-2"><div class="h-24 rounded-xl bg-[#A68A26]/30"></div><div class="h-3 w-3/4 rounded bg-neutral-200"></div><div class="h-3 w-1/3 rounded bg-[#FCA321]"></div></div>
                    <div class="space-y-2"><div class="h-24 rounded-xl bg-[#8F9B2F]/30"></div><div class="h-3 w-1/2 rounded bg-neutral-200"></div><div class="h-3 w-1/3 rounded bg-[#FCA321]"></div></div>
                </div>
            </div>
        </div>
    </section>

    <!-- ================= PROCESO ================= -->
    <section id="proceso" class="bg-ink-900 text-white scroll-mt-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <h2 class="text-3xl md:text-4xl font-bold text-center">Cómo trabajamos</h2>
            <ol class="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <?php foreach ($pasos as $i => [$titulo, $texto]) : ?>
                    <li class="p-6 rounded-2xl bg-ink-800">
                        <p class="text-beam-500 font-extrabold text-3xl"><?php echo sprintf('%02d', $i + 1); ?></p>
                        <h3 class="font-semibold mt-2"><?php echo esc_html($titulo); ?></h3>
                        <p class="text-sm text-white/70 mt-1"><?php echo esc_html($texto); ?></p>
                    </li>
                <?php endforeach; ?>
            </ol>
        </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section id="faq" class="max-w-3xl mx-auto px-4 sm:px-6 py-20 scroll-mt-16">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-10">Preguntas frecuentes</h2>
        <div class="space-y-3">
            <?php foreach ($faq as [$pregunta, $respuesta]) : ?>
                <details class="p-5 rounded-2xl bg-white border border-neutral-200">
                    <summary class="flex justify-between items-center gap-4 cursor-pointer font-semibold"><?php echo esc_html($pregunta); ?><span class="faq-icon text-beam-600 text-2xl transition">+</span></summary>
                    <p class="mt-3 text-sm text-neutral-600"><?php echo esc_html($respuesta); ?></p>
                </details>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- ================= CTA FINAL ================= -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div class="rounded-3xl bg-beam-500 text-ink-900 p-10 md:p-14 text-center">
            <h2 class="text-3xl md:text-4xl font-extrabold">¿Empezamos a construir tu web?</h2>
            <p class="mt-3 text-ink-800/80">Contanos tu idea y te pasamos un presupuesto sin compromiso.</p>
            <a href="<?php echo esc_url(andamio_wa('¡Hola! Quiero un presupuesto para mi página web.')); ?>" target="_blank" rel="noopener"
               class="inline-block mt-8 px-8 py-4 rounded-full bg-ink-900 hover:bg-ink-700 text-white font-semibold transition">Pedir presupuesto por WhatsApp</a>
        </div>
    </section>
</main>

<?php get_footer(); ?>
