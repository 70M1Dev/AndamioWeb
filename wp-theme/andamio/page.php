<?php
/**
 * Páginas comunes (ej: /soporte con el portal de Fluent Support).
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="max-w-4xl mx-auto px-4 sm:px-6 py-14 min-h-[60vh]">
    <?php while (have_posts()) : the_post(); ?>
        <h1 class="text-3xl md:text-4xl font-bold mb-8"><?php the_title(); ?></h1>
        <div class="andamio-content">
            <?php the_content(); ?>
        </div>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
