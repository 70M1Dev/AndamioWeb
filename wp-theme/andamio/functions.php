<?php
/**
 * Andamio Web — funciones del tema.
 */

if (!defined('ABSPATH')) exit;

// WhatsApp de Andamio Web: solo digitos, con codigo de pais.
const ANDAMIO_WHATSAPP = '59894319604';

// Link a WhatsApp con el mensaje ya escrito.
function andamio_wa($message = '') {
    $url = 'https://wa.me/' . ANDAMIO_WHATSAPP;
    return $message ? $url . '?text=' . rawurlencode($message) : $url;
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
    if (is_front_page()) {
        echo '<meta name="description" content="Páginas web, webs institucionales y tiendas online para negocios de Uruguay. Diseño a medida, adaptadas al celular y con WhatsApp integrado.">' . "\n";
    }
}, 1);
