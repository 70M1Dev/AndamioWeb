<?php
/**
 * Fluent Support en español rioplatense.
 *
 * El plugin no publica ningún paquete de traducción (ni en español ni en
 * ningún otro idioma), así que poner el sitio en "Español de Uruguay" no
 * alcanza: el portal del cliente se ve igual en inglés.
 *
 * El portal es una app Vue que traduce con `i18n[texto] || texto`, donde ese
 * array lo arma PHP y lo expone el filtro `fluent_support/customer_portal_vars`.
 * Completando ese array traducimos el portal sin tocar el plugin, sin archivos
 * .mo y sin plugins de traducción, y queda versionado junto al tema.
 */

if (!defined('ABSPATH')) exit;

/**
 * Textos del portal que ve el cliente.
 * Las claves son las cadenas en inglés que pide el JS del plugin: si una clave
 * no está, el portal muestra el inglés (o el nombre crudo de la clave, como
 * pasa de fábrica con reopen_ticket_instruction).
 */
function andamio_fs_textos_portal() {
    return [
        // Navegación y listado
        'View Your Tickets'                 => 'Tus tickets',
        'View All'                          => 'Ver todos',
        'All'                               => 'Todos',
        'Open'                              => 'Abierto',
        'Closed'                            => 'Cerrado',
        'Date'                              => 'Fecha',
        'Status'                            => 'Estado',
        'Next'                              => 'Siguiente',
        'Prev'                              => 'Anterior',

        // Crear un ticket
        'Create a New Ticket'               => 'Crear un ticket nuevo',
        'Create Ticket'                     => 'Crear ticket',
        'Submit a Support Ticket'           => 'Enviar un pedido de soporte',
        'Subject'                           => 'Asunto',
        "What's about this support ticket"  => '¿Sobre qué es tu consulta?',
        'Please provide details about your problem' => 'Contanos en detalle qué está pasando',
        'Additional info'                   => 'Información adicional',
        'Priority'                          => 'Prioridad',
        'Select Priority'                   => 'Elegí la prioridad',
        'Related Product/Service'           => 'Servicio relacionado',
        'Select related Product/Service'    => 'Elegí el servicio relacionado',
        'Click to upload'                   => 'Hacé clic para adjuntar',
        'File failed to upload'             => 'No se pudo subir el archivo',

        // Conversación
        'Conversation'                      => 'Conversación',
        'Ticket Details'                    => 'Detalle del ticket',
        'Reply'                             => 'Responder',
        'Write a reply'                     => 'Escribí tu respuesta',
        'Click Here to Write a reply'       => 'Hacé clic acá para responder',
        'You'                               => 'Vos',
        'by'                                => 'por',
        'replied'                           => 'respondió',
        'started the conversation'          => 'inició la conversación',

        // Cerrar y reabrir
        'Close Ticket'                      => 'Cerrar ticket',
        'Reopen This ticket'                => 'Reabrir este ticket',
        // El plugin muestra: "{ticket_closed} {fecha}"
        'ticket_closed'                     => 'Este ticket se cerró el',
        // De fábrica esta clave no existe y el portal muestra el texto crudo
        // "reopen_ticket_instruction" al cliente.
        'reopen_ticket_instruction'         => 'Si el problema sigue, podés reabrir el ticket.',

        // Avisos de privacidad. El plugin los arma como:
        // "This ticket is {Private|Public}. {mensaje}", por eso van en minúscula.
        'Private'                           => 'privado',
        'Public'                            => 'público',
        'agent_and_officials_can_see'       => 'Solo vos y el equipo de Andamio Web pueden ver esta conversación',
        'not_to_share_private_info'         => 'No compartas contraseñas ni datos sensibles por acá',

        // Errores
        'Unknown error. Please reload this page' => 'Hubo un error. Recargá la página, por favor.',
    ];
}

// Traduce el portal del cliente (la app Vue).
add_filter('fluent_support/customer_portal_vars', function ($data) {
    $data['i18n'] = array_merge(
        isset($data['i18n']) && is_array($data['i18n']) ? $data['i18n'] : [],
        andamio_fs_textos_portal()
    );
    return $data;
});

/**
 * Textos que el plugin imprime desde PHP, antes de que arranque la app.
 */
add_filter('gettext', function ($traducido, $texto, $dominio) {
    if ($dominio !== 'fluent-support') {
        return $traducido;
    }

    static $textos = null;
    if ($textos === null) {
        $textos = [
            'Loading Customer Portal. Please wait...' => 'Cargando tu portal de soporte...',
            'You don’t have permission to view the tickets' => 'Tu usuario todavía no tiene acceso a los tickets. Escribinos por WhatsApp y lo activamos.',
            'Customer Portal is only accessible by Customers. Looks like you are a support staff' => 'El portal es solo para clientes. Estás entrando con una cuenta del equipo de soporte.',
            'Go to Support Admin Page' => 'Ir al panel de soporte',

            // Aviso de adjuntos: el plugin lo arma con sprintf, así que los
            // marcadores %s (formatos) y %d (megas) van en el mismo orden.
            'Supported Types: %s and max file size: %dMB' => 'Formatos aceptados: %s. Peso máximo: %d MB',
            'Photos'   => 'Fotos',
            'PDF/Docs' => 'PDF y documentos',
        ];
    }

    return $textos[$texto] ?? $traducido;
}, 10, 3);

/**
 * "This ticket is" es el único texto que el plugin deja fijo en su JavaScript,
 * sin pasar por el traductor, así que se arregla en el navegador. El observer
 * es necesario porque Vue dibuja la conversación después de cargar la página.
 */
add_action('wp_footer', function () {
    if (!is_page('soporte')) {
        return;
    }
    ?>
    <script>
    (function () {
        var traducir = function () {
            var app = document.getElementById('fluent_support_client_app');
            if (!app) return;
            var nodos = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
            var nodo;
            while ((nodo = nodos.nextNode())) {
                if (nodo.nodeValue.indexOf('This ticket is') !== -1) {
                    nodo.nodeValue = nodo.nodeValue.replace('This ticket is', 'Este ticket es');
                }
            }
        };
        document.addEventListener('DOMContentLoaded', function () {
            var app = document.getElementById('fluent_support_client_app');
            if (!app) return;
            traducir();
            new MutationObserver(traducir).observe(app, { childList: true, subtree: true });
        });
    })();
    </script>
    <?php
}, 99);
