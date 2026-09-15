<?php
/**
 * Fluent Support en español rioplatense.
 *
 * El plugin no publica ningún paquete de traducción (ni en español ni en
 * ningún otro idioma), así que poner el sitio en "Español de Uruguay" no
 * alcanza: el portal del cliente se ve igual en inglés.
 *
 * En Fluent Support 2.x todos los textos del portal salen de
 * Services/TranslationStrings::getPortalStrings(), y cada uno pasa por __()
 * con el dominio 'fluent-support'. Alcanza entonces con engancharse al filtro
 * `gettext`: traducimos sin tocar el plugin, sin archivos .mo, sin plugins de
 * traducción, y queda versionado junto al tema.
 *
 * Si algún texto sigue en inglés, hay que buscar su cadena exacta en
 * app/Services/TranslationStrings.php del plugin y sumarla acá tal cual: la
 * clave tiene que coincidir carácter por carácter con el original en inglés.
 */

if (!defined('ABSPATH')) exit;

/**
 * Traducciones del portal del cliente.
 * Las claves son las cadenas en inglés de Fluent Support 2.4.0.
 */
function andamio_fs_traducciones() {
    return [
        // Listado de tickets
        'View Your Tickets'    => 'Tus tickets',
        'All Tickets'          => 'Todos los tickets',
        'Back to All Tickets'  => 'Volver a todos los tickets',
        'No tickets found'     => 'Todavía no tenés tickets',
        'Ticket'               => 'Ticket',
        'Ticket ID'            => 'N.º de ticket',
        'Title'                => 'Título',
        'Date'                 => 'Fecha',
        'Created at'           => 'Creado el',
        'Status'               => 'Estado',
        'Search'               => 'Buscar',
        'Sort'                 => 'Ordenar',
        'Sort By'              => 'Ordenar por',
        'Ascending'            => 'Ascendente',
        'Descending'           => 'Descendente',
        'Default'              => 'Por defecto',
        'Apply'                => 'Aplicar',
        'Refresh'              => 'Actualizar',
        'All'                  => 'Todos',
        'All Products'         => 'Todos los servicios',
        'Page'                 => 'Página',
        'page'                 => 'página',
        'of'                   => 'de',

        // Estados y prioridades
        'Open'                 => 'Abierto',
        'Closed'               => 'Cerrado',
        'Completed'            => 'Completado',
        'Processing'           => 'Procesando',
        'Failed'               => 'Falló',
        'Normal'               => 'Normal',
        'priority'             => 'prioridad',

        // Crear un ticket
        'Submit a Support Ticket'                   => 'Enviar un pedido de soporte',
        'Create Ticket'                             => 'Crear ticket',
        'subject'                                   => 'asunto',
        "What's this support ticket about?"         => '¿Sobre qué es tu consulta?',
        'Please provide details about your problem' => 'Contanos en detalle qué está pasando',
        'Additional info'                           => 'Información adicional',
        'Related Product/Service'                   => 'Servicio relacionado',
        'Select related Product/Service'            => 'Elegí el servicio relacionado',
        'Add Attachment'                            => 'Adjuntar archivo',
        'Browse Files'                              => 'Elegir archivos',
        'Files with a size less than 2MB. Supported Types: images, text, pdf, zip' => 'Archivos de hasta 2 MB. Formatos: imágenes, texto, PDF y ZIP.',
        'Please verify that you are not a robot.'   => 'Confirmá que no sos un robot.',
        'reCAPTCHA failed to load.'                 => 'No se pudo cargar el reCAPTCHA.',

        // Conversación
        'Conversation'                => 'Conversación',
        'Ticket Details'              => 'Detalle del ticket',
        'Reply'                       => 'Responder',
        'Reply and Close'             => 'Responder y cerrar',
        'Write a reply'               => 'Escribí tu respuesta',
        'Click Here to Write a reply' => 'Hacé clic acá para responder',
        'You'                         => 'Vos',
        'by'                          => 'por',
        'started the conversation'    => 'inició la conversación',
        'created this ticket on your behalf' => 'creó este ticket por vos',
        'Thread Starter'              => 'Inició la conversación',
        'Thread Follower'             => 'Sigue la conversación',
        'Support Staff'               => 'Equipo de soporte',
        'Suggested Articles'          => 'Artículos sugeridos',

        // Cerrar y reabrir
        'Close Ticket'          => 'Cerrar ticket',
        'Reopen This ticket'    => 'Reabrir este ticket',
        'This ticket is'        => 'Este ticket es',
        'This ticket was closed on' => 'Este ticket se cerró el',
        'If you still have related issues. Please reopen this ticket and reply' => 'Si el problema sigue, reabrí el ticket y contanos.',

        // Privacidad. El plugin arma "This ticket is {Private|Public}. {aviso}",
        // por eso Private y Public van en minúscula.
        'Private' => 'privado',
        'Public'  => 'público',
        'Only you and official support agents can view this conversation' => 'Solo vos y el equipo de Andamio Web pueden ver esta conversación',
        'Please do not share any private information.' => 'No compartas contraseñas ni datos sensibles.',

        // Sesión y errores
        'Log Out' => 'Cerrar sesión',
        'Retry'   => 'Reintentar',
        'Unknown error. Please reload this page' => 'Hubo un error. Recargá la página, por favor.',
        'Your account is currently inactive. You cannot create new tickets or reply to existing ones. Please contact the site administrator for assistance' => 'Tu cuenta está inactiva: no podés crear tickets ni responder. Escribinos por WhatsApp y la reactivamos.',

        // Textos que el plugin imprime desde PHP, antes de que arranque el portal
        'Loading Customer Portal. Please wait...' => 'Cargando tu portal de soporte...',
        'You don’t have permission to view the tickets' => 'Tu usuario todavía no tiene acceso a los tickets. Escribinos por WhatsApp y lo activamos.',
        'Customer Portal is only accessible by Customers. Looks like you are a support staff' => 'El portal es solo para clientes. Estás entrando con una cuenta del equipo de soporte.',
        'Go to Support Admin Page' => 'Ir al panel de soporte',
        'Supported Types: %s and max file size: %dMB' => 'Formatos aceptados: %s. Peso máximo: %d MB',
        'Photos'   => 'Fotos',
        'PDF/Docs' => 'PDF y documentos',
    ];
}

/**
 * Traduce cualquier texto del plugin que pase por __() o _e().
 */
add_filter('gettext', function ($traducido, $texto, $dominio) {
    if ($dominio !== 'fluent-support') {
        return $traducido;
    }

    static $textos = null;
    if ($textos === null) {
        $textos = andamio_fs_traducciones();
    }

    return isset($textos[$texto]) ? $textos[$texto] : $traducido;
}, 10, 3);
