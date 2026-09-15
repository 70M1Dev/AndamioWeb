<?php if (!defined('ABSPATH')) exit; ?>

<footer class="bg-ink-900 text-white/60 text-sm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row gap-4 justify-between">
        <p>© <?php echo esc_html(date('Y')); ?> Andamio Web · Montevideo, Uruguay</p>
        <div class="flex gap-6">
            <a href="<?php echo esc_url(home_url('/soporte/')); ?>" class="hover:text-white">Área de clientes</a>
            <a href="<?php echo esc_url(andamio_wa()); ?>" target="_blank" rel="noopener" class="hover:text-white">WhatsApp</a>
        </div>
    </div>
</footer>

<!-- Botón flotante de WhatsApp (queda a la izquierda para no taparse con el chat de Tawk.to) -->
<a href="<?php echo esc_url(andamio_wa('¡Hola! Quiero consultar por una página web.')); ?>" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp"
   class="fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-[#1FAF38] hover:bg-[#178a2c] shadow-xl flex items-center justify-center transition">
    <svg class="w-7 h-7" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>
</a>

<?php wp_footer(); ?>
</body>
</html>
