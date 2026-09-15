<?php
/**
 * Andamio Web — funciones del tema.
 */

if (!defined('ABSPATH')) exit;

// WhatsApp de Andamio Web: solo digitos, con codigo de pais.
const ANDAMIO_WHATSAPP = '59894319604';

/**
 * Este WordPress es SOLO el area de clientes: vive en un subdominio y la
 * landing publica esta en otro lado (GitHub Pages). Por eso:
 *  - los links del menu apuntan afuera, a ANDAMIO_SITIO;
 *  - le pedimos a Google que no lo indexe.
 * Si algun dia el sitio entero pasa a WordPress, poner esto en false.
 */
const ANDAMIO_SOLO_SOPORTE = true;

// Landing publica. Cambiar por el dominio propio cuando se compre.
const ANDAMIO_SITIO = 'https://70m1dev.github.io/AndamioWeb/';

// Link a WhatsApp con el mensaje ya escrito.
function andamio_wa($message = '') {
    $url = 'https://wa.me/' . ANDAMIO_WHATSAPP;
    return $message ? $url . '?text=' . rawurlencode($message) : $url;
}

// Link a una seccion de la landing publica (ej: andamio_sitio('#planes')).
function andamio_sitio($hash = '') {
    if (!ANDAMIO_SOLO_SOPORTE) {
        return $hash ? home_url('/') . $hash : home_url('/');
    }
    return rtrim(ANDAMIO_SITIO, '/') . '/' . $hash;
}

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('responsive-embeds');
});

add_action('wp_enqueue_scripts', function () {
    $css = get_template_directory() . '/assets/css/andamio.css';
    wp_enqueue_style('andamio-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap', [], null);
    wp_enqueue_style('andamio', get_template_directory_uri() . '/assets/css/andamio.css', ['andamio-fonts'], file_exists($css) ? filemtime($css) : '1.0.0');
});

add_action('wp_head', function () {
    echo '<link rel="icon" href="' . esc_url(get_template_directory_uri() . '/assets/favicon.svg') . '" type="image/svg+xml">' . "\n";
    if (ANDAMIO_SOLO_SOPORTE) {
        // El area de clientes no va a Google: es privada y no aporta al SEO.
        echo '<meta name="robots" content="noindex, nofollow">' . "\n";
    } elseif (is_front_page()) {
        echo '<meta name="description" content="Páginas web, webs institucionales y tiendas online para negocios de Uruguay. Diseño a medida, adaptadas al celular y con WhatsApp integrado.">' . "\n";
    }
}, 1);

/**
 * Pantalla de login (wp-login.php) con la identidad de Andamio Web, para que
 * el cliente no sienta que lo mandamos a un WordPress cualquiera.
 */
add_action('login_enqueue_scripts', function () {
    wp_enqueue_style('andamio-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap', [], null);
    wp_add_inline_style('login', '
        body.login { background: #101826; font-family: Outfit, system-ui, sans-serif; }
        body.login #login { padding-top: 6%; }
        body.login h1 a {
            background-image: url(' . esc_url(get_template_directory_uri() . '/assets/logo-claro.svg') . ');
            background-size: contain; background-position: center; width: 220px; height: 56px;
        }
        body.login form {
            background: #fff; border: 0; border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,.35); padding: 32px;
        }
        body.login label { color: #1B2536; font-weight: 600; }
        body.login input[type=text], body.login input[type=password] {
            border-radius: 12px; border-color: #d4d4d4; padding: 10px 12px;
        }
        body.login input[type=text]:focus, body.login input[type=password]:focus {
            border-color: #F5B400; box-shadow: 0 0 0 2px rgba(245,180,0,.3);
        }
        body.login .button-primary {
            background: #F5B400 !important; border-color: #D99A00 !important;
            color: #101826 !important; border-radius: 999px !important;
            font-weight: 700; text-shadow: none !important; box-shadow: none !important;
            height: auto; padding: 10px 24px;
        }
        body.login .button-primary:hover { background: #FFC53D !important; }
        body.login #nav a, body.login #backtoblog a { color: rgba(255,255,255,.65) !important; }
        body.login #nav a:hover, body.login #backtoblog a:hover { color: #FFC53D !important; }
        .login #login_error, .login .message { border-radius: 12px; border-left-color: #F5B400; }
    ');
});

// El logo del login lleva a la landing publica, no a wordpress.org.
add_filter('login_headerurl', fn() => andamio_sitio());
add_filter('login_headertext', fn() => 'Andamio Web');

// Despues de entrar, el cliente va a su area de soporte y no al escritorio.
add_filter('login_redirect', function ($redirect_to, $requested, $user) {
    if ($user instanceof WP_User && !user_can($user, 'manage_options')) {
        return home_url('/soporte/');
    }
    return $redirect_to;
}, 10, 3);

// Los clientes no necesitan ver la barra de administracion de WordPress.
// Va por filtro y no por show_admin_bar() en after_setup_theme, porque ahi el
// usuario actual todavia puede no estar resuelto.
add_filter('show_admin_bar', function ($mostrar) {
    return current_user_can('manage_options') ? $mostrar : false;
});
