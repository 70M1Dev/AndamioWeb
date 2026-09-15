<?php
/**
 * Área de clientes: portal de tickets de Fluent Support.
 *
 * WordPress usa esta plantilla automáticamente en la página cuyo slug sea
 * "soporte". El shortcode del portal se pega en el editor de esa página:
 * lo que se escriba ahí se muestra dentro de este diseño.
 *
 * Si el visitante no inició sesión, en vez del portal ve el formulario de
 * login y la salida por WhatsApp.
 */
if (!defined('ABSPATH')) exit;
get_header();

$usuario = wp_get_current_user();
$nombre = $usuario->first_name ?: $usuario->display_name;
?>

<main class="min-h-[70vh] bg-paper">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-14">

        <?php if (is_user_logged_in()) : ?>

            <div class="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                    <p class="text-sm text-neutral-500">Área de clientes</p>
                    <h1 class="text-3xl md:text-4xl font-bold mt-1">
                        Hola<?php echo $nombre ? ', ' . esc_html($nombre) : ''; ?>
                    </h1>
                    <p class="mt-2 text-neutral-600">
                        Acá abrís tickets y seguís el estado de cada pedido de cambio.
                    </p>
                </div>
                <a href="<?php echo esc_url(wp_logout_url(home_url('/soporte/'))); ?>"
                   class="px-5 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-500 text-sm font-semibold transition">
                    Cerrar sesión
                </a>
            </div>

            <div class="andamio-content p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200">
                <?php
                while (have_posts()) : the_post();
                    the_content();
                endwhile;
                ?>
            </div>

            <p class="mt-8 text-sm text-neutral-500">
                ¿Es urgente?
                <a href="<?php echo esc_url(andamio_wa('¡Hola! Soy cliente y tengo algo urgente.')); ?>"
                   target="_blank" rel="noopener" class="text-beam-600 font-semibold underline">Escribinos por WhatsApp</a>.
            </p>

        <?php else : ?>

            <div class="max-w-md mx-auto text-center">
                <p class="inline-block mb-5 px-3 py-1 rounded-full border border-beam-600/40 text-beam-600 text-xs font-semibold tracking-wide uppercase">
                    Área de clientes
                </p>
                <h1 class="text-3xl md:text-4xl font-bold">Iniciá sesión</h1>
                <p class="mt-4 text-neutral-600">
                    Entrá con los datos que te dimos cuando publicamos tu web. Si todavía no
                    tenés tu panel, escribinos por WhatsApp y lo activamos.
                </p>

                <div class="andamio-login mt-8 p-7 rounded-3xl bg-white border border-neutral-200 text-left">
                    <?php
                    wp_login_form([
                        'redirect' => home_url('/soporte/'),
                        'label_username' => 'Usuario o correo',
                        'label_password' => 'Contraseña',
                        'label_remember' => 'Mantener la sesión abierta',
                        'label_log_in' => 'Entrar',
                        'remember' => true,
                    ]);
                    ?>
                    <?php // Sin correos salientes, "restablecer contraseña" no llegaría a ningún lado. ?>
                    <p class="mt-4 text-sm text-neutral-500">
                        ¿Olvidaste tu contraseña?
                        <a href="<?php echo esc_url(andamio_wa('¡Hola! Olvidé la contraseña de mi panel de soporte.')); ?>"
                           target="_blank" rel="noopener" class="text-beam-600 font-semibold underline">Escribinos y te la reseteamos</a>.
                    </p>
                </div>

                <a href="<?php echo esc_url(andamio_wa('¡Hola! Soy cliente y necesito acceso a mi panel de soporte.')); ?>"
                   target="_blank" rel="noopener"
                   class="inline-block mt-6 px-6 py-3 rounded-full border border-neutral-300 hover:border-neutral-500 font-semibold transition">
                    Contactanos por WhatsApp
                </a>
            </div>

        <?php endif; ?>

    </div>
</main>

<?php get_footer(); ?>
