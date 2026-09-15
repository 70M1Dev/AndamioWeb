<?php if (!defined('ABSPATH')) exit; ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class('font-sans bg-paper text-ink-900 antialiased'); ?>>
<?php wp_body_open(); ?>

<?php $home = is_front_page() ? '' : home_url('/'); ?>
<header class="sticky top-0 z-40 bg-ink-900/95 backdrop-blur text-white">
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5" aria-label="Andamio Web, inicio">
            <svg class="w-9 h-9" viewBox="0 0 40 40" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#F5B400"/>
                <path d="M11 30V10M29 30V10M11 16h18M11 24h18M11 16l18 8" stroke="#101826" stroke-width="3" stroke-linecap="round" fill="none"/>
            </svg>
            <span class="leading-none">
                <span class="block font-extrabold text-lg tracking-tight">ANDAMIO</span>
                <span class="block text-[10px] tracking-[0.35em] text-white/60">WEB · UY</span>
            </span>
        </a>
        <div class="hidden md:flex items-center gap-7 text-sm text-white/80">
            <a href="<?php echo esc_url($home); ?>#planes" class="hover:text-white">Planes</a>
            <a href="<?php echo esc_url($home); ?>#caso" class="hover:text-white">Casos</a>
            <a href="<?php echo esc_url($home); ?>#proceso" class="hover:text-white">Cómo trabajamos</a>
            <a href="<?php echo esc_url($home); ?>#faq" class="hover:text-white">Preguntas</a>
            <a href="<?php echo esc_url(home_url('/soporte/')); ?>" class="hover:text-white">Área de clientes</a>
        </div>
        <a href="<?php echo esc_url(andamio_wa('¡Hola! Quiero consultar por una página web.')); ?>" target="_blank" rel="noopener"
           class="px-4 py-2 rounded-full bg-beam-500 hover:bg-beam-400 text-ink-900 text-sm font-semibold transition">
            Hablemos
        </a>
    </nav>
</header>
