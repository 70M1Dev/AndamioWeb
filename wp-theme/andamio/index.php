<?php
/**
 * Plantilla de respaldo (blog, archivos, búsqueda, 404).
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="max-w-4xl mx-auto px-4 sm:px-6 py-14 min-h-[60vh]">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article class="mb-12">
                <h2 class="text-2xl font-bold mb-3"><a href="<?php the_permalink(); ?>" class="hover:text-beam-600"><?php the_title(); ?></a></h2>
                <div class="andamio-content"><?php is_singular() ? the_content() : the_excerpt(); ?></div>
            </article>
        <?php endwhile; ?>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <h1 class="text-3xl font-bold mb-4">No encontramos lo que buscabas</h1>
        <p class="text-neutral-600"><a href="<?php echo esc_url(home_url('/')); ?>" class="underline">Volver al inicio</a></p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
