/**
 * ============================================
 * TecnoSafe - Lógica de Interactividad
 * ============================================
 * Este archivo contiene toda la funcionalidad
 * interactiva de la plataforma educativa.
 *
 * Estructura:
 * 1. Datos (contenido educativo)
 * 2. Utilidades del DOM
 * 3. Navegación y Header
 * 4. Tarjetas de Aprendizaje
 * 5. Cuestionario Interactivo
 * 6. Reto Digital
 * 7. Consejos Prácticos
 * 8. Animaciones de Scroll
 * 9. Inicialización
 * ============================================
 */

'use strict';

/* ============================================
 * 1. DATOS - Contenido Educativo
 * ============================================ */

const learnCards = [
    {
        id: 'passwords',
        icon: 'lock',
        title: 'Contraseñas Seguras',
        description: 'Aprende a crear contraseñas fuertes que protejan tus cuentas y datos personales de accesos no autorizados.',
        tips: [
            'Usa al menos 12 caracteres con letras, números y símbolos',
            'Nunca uses la misma contraseña en diferentes cuentas',
            'Evita información personal como fechas de nacimiento',
            'Considera usar un gestor de contraseñas confiable'
        ]
    },
    {
        id: 'phishing',
        icon: 'fish',
        title: 'Phishing y Estafas',
        description: 'Identifica correos, mensajes y sitios web fraudulentos que intentan engañarte para robar tu información.',
        tips: [
            'Verifica siempre la dirección del remitente',
            'Desconfía de mensajes con urgencia o premios inesperados',
            'Nunca hagas clic en enlaces sospechosos',
            'Si dudas, contacta directamente a la empresa o persona'
        ]
    },
    {
        id: 'privacy',
        icon: 'shield',
        title: 'Privacidad en Redes',
        description: 'Configura correctamente tus perfiles sociales para controlar quién ve tu información y proteger tu identidad.',
        tips: [
            'Revisa la configuración de privacidad de cada red social',
            'No compartas ubicación en tiempo real',
            'Limita la información personal visible públicamente',
            'Acepta solo solicitudes de amistad de personas conocidas'
        ]
    },
    {
        id: 'cyberbullying',
        icon: 'users',
        title: 'Ciberacoso',
        description: 'Reconoce el acoso en línea, aprende a protegerte y sé parte de la solución creando un ambiente digital respetuoso.',
        tips: [
            'No respondas a mensajes de acoso, guarda evidencia',
            'Bloquea y reporta a los agresores en las plataformas',
            'Habla con un adulto de confianza si eres víctima',
            'Nunca participes en el acoso a otros'
        ]
    },
    {
        id: 'fakenews',
        icon: 'news',
        title: 'Noticias Falsas',
        description: 'Desarrolla tu pensamiento crítico para identificar desinformación y verificar la veracidad de lo que lees en línea.',
        tips: [
            'Verifica la fuente y la fecha de publicación',
            'Busca la misma noticia en otros medios confiables',
            'Desconfía de titulares sensacionalistas',
            'Usa sitios de verificación de hechos'
        ]
    },
    {
        id: 'data',
        icon: 'database',
        title: 'Protección de Datos',
        description: 'Comprende qué son tus datos personales, por qué son valiosos y cómo evitar que sean mal utilizados.',
        tips: [
            'Lee las políticas de privacidad antes de aceptar',
            'No compartas datos sensibles por mensajería',
            'Cierra sesión en dispositivos compartidos',
            'Revisa periódicamente los permisos de tus apps'
        ]
    }
];

const quizQuestions = [
    {
        id: 1,
        category: 'Contraseñas',
        question: '¿Cuál de estas es una contraseña segura?',
        options: [
            '123456',
            'MiNombre2024',
            'Tr7#kP9$mQ2!',
            'contraseña'
        ],
        correct: 2,
        explanation: 'Una contraseña segura combina mayúsculas, minúsculas, números y símbolos, y no contiene información personal fácil de adivinar. "Tr7#kP9$mQ2!" cumple todos estos requisitos.'
    },
    {
        id: 2,
        category: 'Phishing',
        question: 'Recibes un correo de "tu banco" pidiendo que verifiques tu cuenta haciendo clic en un enlace. ¿Qué deberías hacer?',
        options: [
            'Hacer clic inmediatamente para no perder la cuenta',
            'Responder el correo preguntando si es legítimo',
            'Ignorar el correo y contactar al banco por canales oficiales',
            'Reenviar el correo a amigos para que opinen'
        ],
        correct: 2,
        explanation: 'Los bancos nunca piden verificación por correo con enlaces. Esto es una técnica clásica de phishing. Siempre contacta a tu banco por sus canales oficiales (app, sitio web oficial o teléfono).'
    },
    {
        id: 3,
        category: 'Privacidad',
        question: '¿Qué información es segura compartir en tu perfil público de redes sociales?',
        options: [
            'Tu dirección de casa',
            'Tu número de teléfono',
            'Tu escuela y grado',
            'Tu ubicación en tiempo real'
        ],
        correct: 2,
        explanation: 'Información como tu escuela o grado es relativamente segura. Nunca compartas dirección, teléfono ni ubicación en tiempo real, ya que pueden ser usados para localizarte físicamente.'
    },
    {
        id: 4,
        category: 'Ciberacoso',
        question: 'Un compañero te envía mensajes ofensivos repetidamente por redes sociales. Esto es un ejemplo de:',
        options: [
            'Bromas entre amigos',
            'Ciberacoso',
            'Libertad de expresión',
            'Comunicación normal'
        ],
        correct: 1,
        explanation: 'El ciberacoso (cyberbullying) es el uso de medios digitales para acosar, intimidar o humillar a alguien repetidamente. No es una broma y debe ser reportado.'
    },
    {
        id: 5,
        category: 'Desinformación',
        question: '¿Cómo puedes verificar si una noticia es falsa?',
        options: [
            'Si tiene muchas compartidas, debe ser verdad',
            'Buscar la misma noticia en fuentes confiables independientes',
            'Si un amigo la envió, es confiable',
            'Si aparece primero en Google, es verdadera'
        ],
        correct: 1,
        explanation: 'La mejor forma de verificar es buscar la noticia en múltiples fuentes confiables e independientes. Las compartidas, el remitente o el posicionamiento en buscadores no garantizan veracidad.'
    },
    {
        id: 6,
        category: 'Phishing',
        question: '¿Qué es el phishing?',
        options: [
            'Un deporte acuático',
            'Una técnica de engaño para robar información personal',
            'Un tipo de virus informático',
            'Una red social'
        ],
        correct: 1,
        explanation: 'El phishing es una técnica de ingeniería social donde los atacantes se hacen pasar por entidades confiables para engañarte y robar contraseñas, datos bancarios u otra información sensible.'
    },
    {
        id: 7,
        category: 'Contraseñas',
        question: '¿Cuál es la mejor práctica para proteger tus cuentas en línea?',
        options: [
            'Usar la misma contraseña fuerte en todas las cuentas',
            'Activar la autenticación de dos factores (2FA)',
            'Escribir las contraseñas en un papel visible',
            'Compartir contraseñas con amigos de confianza'
        ],
        correct: 1,
        explanation: 'La autenticación de dos factores (2FA) añade una capa extra de seguridad: incluso si alguien descubre tu contraseña, necesitará un segundo factor (como un código en tu teléfono) para acceder.'
    },
    {
        id: 8,
        category: 'Privacidad',
        question: '¿Qué debes hacer si alguien que no conoces en persona te pide una foto privada?',
        options: [
            'Enviarla si parece amable',
            'Enviarla si promete no mostrarla a nadie',
            'Nunca enviarla y reportar la situación a un adulto de confianza',
            'Enviarla si te ofrece algo a cambio'
        ],
        correct: 2,
        explanation: 'Nunca envíes fotos privadas a desconocidos. Esta situación puede ser una forma de grooming o sextorsión. Siempre rechaza, bloquea y reporta a un adulto de confianza o a las autoridades.'
    },
    {
        id: 9,
        category: 'Datos',
        question: '¿Qué significa "huella digital" en el contexto de internet?',
        options: [
            'Una huella dactilar escaneada',
            'El rastro de datos que dejas al navegar y usar servicios en línea',
            'Un tipo de contraseña biométrica',
            'Un dispositivo de seguridad'
        ],
        correct: 1,
        explanation: 'Tu huella digital es todo el rastro que dejas en internet: publicaciones, comentarios, búsquedas, compras, ubicaciones. Es permanente y puede afectar tu reputación futura.'
    },
    {
        id: 10,
        category: 'Desinformación',
        question: '¿Cuál es una señal de que un sitio web puede ser inseguro?',
        options: [
            'Tiene muchos colores',
            'La URL no comienza con https:// y no tiene candado',
            'Tiene imágenes',
            'Es gratuito'
        ],
        correct: 1,
        explanation: 'El candado y https:// indican que la conexión está cifrada. Sin embargo, https por sí solo no garantiza que el sitio sea legítimo; también debes verificar el dominio y la reputación del sitio.'
    },
    {
        id: 11,
        category: 'Ciberacoso',
        question: '¿Qué debes hacer si ves que alguien está siendo acosado en línea?',
        options: [
            'Ignorarlo, no es tu problema',
            'Unirte al acoso para no ser el siguiente',
            'Apoyar a la víctima y reportar el acoso',
            'Grabarlo y compartirlo en redes'
        ],
        correct: 2,
        explanation: 'El silencio permite que el acoso continúe. Apoyar a la víctima, guardar evidencia y reportar son acciones que ayudan a detener el ciberacoso. Nunca participes en el acoso.'
    },
    {
        id: 12,
        category: 'Datos',
        question: '¿Por qué es importante revisar los permisos de las aplicaciones?',
        options: [
            'Porque las aplicaciones siempre son maliciosas',
            'Para evitar que accedan a datos que no necesitan',
            'Porque consume menos batería',
            'No es importante'
        ],
        correct: 1,
        explanation: 'Muchas aplicaciones piden permisos innecesarios a contactos, cámara o ubicación. Revisar y limitar estos permisos protege tu privacidad y evita el uso indebido de tus datos.'
    },
    {
        id: 13,
        category: 'Contraseñas',
        question: '¿Qué característica hace más resistente una frase de contraseña?',
        options: [
            'Que sea corta y fácil de escribir',
            'Que combine varias palabras largas que no estén relacionadas',
            'Que incluya tu nombre y año de nacimiento',
            'Que la uses en todas tus cuentas'
        ],
        correct: 1,
        explanation: 'Una frase larga con palabras no relacionadas resulta difícil de adivinar y fácil de recordar. Usa una distinta para cada cuenta y guárdala en un gestor confiable.'
    },
    {
        id: 14,
        category: 'Contraseñas',
        question: 'Un compañero te pide tu contraseña para terminar una tarea en la plataforma escolar. ¿Qué haces?',
        options: [
            'Se la doy y la cambio después',
            'Se la envío por un mensaje que se borra',
            'No la comparto y busco otra forma de ayudarle',
            'La comparto porque es alguien de confianza'
        ],
        correct: 2,
        explanation: 'Las contraseñas son personales. Compartirlas puede exponer tus mensajes, archivos y datos, aunque la otra persona sea de confianza.'
    },
    {
        id: 15,
        category: 'Phishing',
        question: 'Un mensaje urgente incluye un enlace acortado para "evitar el cierre" de tu cuenta. ¿Cuál es el paso más seguro?',
        options: [
            'Abrir el enlace para confirmar si es real',
            'Responder con tu correo para recibir ayuda',
            'Entrar a la aplicación o escribir la dirección oficial por tu cuenta',
            'Reenviarlo a un grupo para que alguien lo pruebe'
        ],
        correct: 2,
        explanation: 'Los avisos con urgencia y enlaces inesperados son una señal de alerta. Entra por la aplicación o dirección que ya conoces, nunca desde el enlace del mensaje.'
    },
    {
        id: 16,
        category: 'Phishing',
        question: 'Recibes un archivo de "factura" que no esperabas y el remitente parece desconocido. ¿Qué haces?',
        options: [
            'Lo descargo para averiguar de qué se trata',
            'Verifico al remitente por otro canal y no abro el archivo mientras tanto',
            'Lo reenvío para preguntar si alguien lo reconoce',
            'Respondo con mis datos para que confirmen el envío'
        ],
        correct: 1,
        explanation: 'Los archivos inesperados pueden instalar software malicioso. Confirma el envío con la persona o entidad por un canal independiente antes de abrirlos.'
    },
    {
        id: 17,
        category: 'Privacidad',
        question: 'Una aplicación de linterna solicita acceso permanente a tu ubicación. ¿Qué conviene hacer?',
        options: [
            'Aceptar todos los permisos para que funcione mejor',
            'Permitir la ubicación solo cuando la aplicación esté abierta',
            'Denegar ese permiso porque no es necesario para su función',
            'Compartir también tus contactos'
        ],
        correct: 2,
        explanation: 'Una linterna no necesita conocer tu ubicación. Concede solo los permisos indispensables y revísalos de nuevo si la aplicación cambia de función.'
    },
    {
        id: 18,
        category: 'Privacidad',
        question: '¿Qué detalle deberías evitar publicar junto con una foto de tu casa?',
        options: [
            'Una descripción general del día',
            'Tu dirección exacta y cuándo no hay nadie en casa',
            'El nombre de una película que te gusta',
            'Una opinión sobre un libro'
        ],
        correct: 1,
        explanation: 'Combinar una ubicación precisa con horarios puede revelar cuándo una vivienda está vacía. Revisa el fondo de tus fotos y evita compartir rutinas en tiempo real.'
    },
    {
        id: 19,
        category: 'Ciberacoso',
        question: 'Un grupo publica burlas repetidas sobre un compañero. ¿Qué acción ayuda más?',
        options: [
            'Sumarte con un comentario para no quedar fuera',
            'Guardar evidencia, apoyar a la persona y reportar la publicación',
            'Compartir la publicación para que todos la vean',
            'Responder con insultos más fuertes'
        ],
        correct: 1,
        explanation: 'No difundas el contenido. Guarda evidencia, acompaña a la persona afectada y repórtalo a la plataforma o a un adulto de confianza.'
    },
    {
        id: 20,
        category: 'Ciberacoso',
        question: 'Después de bloquear una cuenta que te acosa, crea otra cuenta para seguir escribiéndote. ¿Qué haces?',
        options: [
            'Respondo para pedirle que pare',
            'Publico su información para que otros lo enfrenten',
            'No respondo, guardo los mensajes y pido apoyo para reportar el caso',
            'Acepto la solicitud para averiguar quién es'
        ],
        correct: 2,
        explanation: 'Evita entrar en una confrontación y no publiques datos de nadie. Conserva evidencia, bloquea y reporta las cuentas, y busca apoyo de una persona adulta de confianza.'
    },
    {
        id: 21,
        category: 'Desinformación',
        question: 'Una publicación afirma que "cierran todas las escuelas mañana", pero no cita fuentes. ¿Cómo lo verificas?',
        options: [
            'La comparto rápido para prevenir a mis amigos',
            'Reviso los canales oficiales y medios confiables antes de compartirla',
            'Confío si la publicó una cuenta con muchos seguidores',
            'Me fijo solo en la cantidad de reacciones'
        ],
        correct: 1,
        explanation: 'Busca el aviso en canales oficiales y confirma la fecha. La popularidad de una publicación no comprueba que sea cierta.'
    },
    {
        id: 22,
        category: 'Desinformación',
        question: 'Un video impactante se presenta como si hubiera ocurrido hoy. ¿Qué dato conviene comprobar primero?',
        options: [
            'El número de reproducciones',
            'La fecha y el origen original del video',
            'Si tiene subtítulos llamativos',
            'Cuántas veces lo compartió tu grupo'
        ],
        correct: 1,
        explanation: 'Un video real puede estar fuera de contexto. Busca su primera publicación y comprueba cuándo y dónde ocurrió antes de sacar conclusiones.'
    },
    {
        id: 23,
        category: 'Datos',
        question: 'Estás conectado al Wi-Fi público de un café. ¿Qué hábito protege mejor tus datos?',
        options: [
            'Usar cualquier red que tenga el nombre del café',
            'Realizar operaciones sensibles sin verificar la red',
            'Evitar operaciones sensibles y confirmar el nombre de la red con el personal',
            'Desactivar la pantalla de bloqueo para hacerlo más rápido'
        ],
        correct: 2,
        explanation: 'Las redes públicas pueden ser imitadas o poco seguras. Confirma su nombre y evita consultar información sensible si no puedes verificar la conexión.'
    },
    {
        id: 24,
        category: 'Datos',
        question: 'Un concurso desconocido pide una foto de tu documento para entregar un premio pequeño. ¿Qué haces?',
        options: [
            'La envío porque solo aparece mi nombre',
            'Comparto una foto con parte del número visible',
            'No envío el documento y compruebo quién organiza el concurso',
            'La envío si prometen borrarla después'
        ],
        correct: 2,
        explanation: 'Un documento puede facilitar la suplantación de identidad. No compartas datos sensibles con organizadores que no puedas verificar.'
    }
];

const quizCategories = [
    { name: 'Contraseñas', icon: 'lock', description: 'Claves únicas y acceso seguro.' },
    { name: 'Phishing', icon: 'fish', description: 'Detecta mensajes y enlaces falsos.' },
    { name: 'Privacidad', icon: 'eye', description: 'Decide qué información compartir.' },
    { name: 'Ciberacoso', icon: 'users', description: 'Actúa con empatía y seguridad.' },
    { name: 'Desinformación', icon: 'news', description: 'Verifica fuentes antes de compartir.' },
    { name: 'Datos', icon: 'database', description: 'Cuida permisos e identidad digital.' }
];

const challengeScenarios = [
    {
        id: 1,
        title: 'El enlace sospechoso',
        scenario: 'Recibes un mensaje de un número desconocido: "¡Felicidades! Ganaste un iPhone gratis. Haz clic aquí para reclamarlo: bit.ly/xyz123". El mensaje tiene errores de ortografía y urgencia.',
        options: [
            { text: 'Hacer clic en el enlace para ver qué es', quality: 'risky' },
            { text: 'Ignorar el mensaje y eliminarlo', quality: 'good' },
            { text: 'Reenviar el mensaje a mis amigos para que también "ganen"', quality: 'risky' },
            { text: 'Responder preguntando más detalles', quality: 'risky' }
        ],
        feedback: {
            good: '¡Excelente decisión! Los premios inesperados con enlaces acortados y urgencia son la estafa más común. Ignorar y eliminar es la mejor acción.',
            risky: '¡Cuidado! Los enlaces de remitentes desconocidos con premios inesperados son casi siempre estafas. El enlace podría llevarte a un sitio falso para robar tus datos o instalar malware.'
        }
    },
    {
        id: 2,
        title: 'El mensaje del desconocido',
        scenario: 'Una persona que no conoces te agrega en una red social. Dice que tiene tu misma edad, que va a tu misma escuela y quiere ser tu amigo. Te pide que le envíes una foto para "confirmar que eres real".',
        options: [
            { text: 'Enviar la foto porque parece amable', quality: 'risky' },
            { text: 'No enviar nada, bloquear y reportar la cuenta', quality: 'good' },
            { text: 'Enviar una foto grupal con mis amigos', quality: 'risky' },
            { text: 'Preguntarle por qué quiere mi foto', quality: 'risky' }
        ],
        feedback: {
            good: '¡Muy bien! Las personas que se hacen pasar por conocidos para obtener fotos pueden usarlas para acosar, extorsionar o suplantar identidad. Bloquear y reportar es lo correcto.',
            risky: '¡Peligro! Las fotos que envías a desconocidos pueden ser usadas para suplantación, acoso o extorsión. Nunca envíes fotos a personas que no conoces en persona, sin importar cuánto parezcan confiables.'
        }
    },
    {
        id: 3,
        title: 'La oferta demasiado buena',
        scenario: 'Ves una publicación en redes sociales: "Gana $500 dólares por día desde tu celular. Solo necesitas invertir $50 al principio. Método 100% seguro". Incluye testimonios de personas supuestamente exitosas.',
        options: [
            { text: 'Invertir los $50 porque suena fácil', quality: 'risky' },
            { text: 'Investigar sobre la empresa y buscar reseñas independientes', quality: 'good' },
            { text: 'Compartir la publicación con amigos para que inviertan contigo', quality: 'risky' },
            { text: 'Enviar mis datos bancarios para registrarme', quality: 'risky' }
        ],
        feedback: {
            good: '¡Correcto! Investigar antes de invertir es fundamental. Las promesas de ganancias fáciles y altas son la señal número uno de estafas financieras (esquemas Ponzi o piramidales).',
            risky: '¡Alto ahí! Las promesas de dinero fácil con poco esfuerzo son el patrón clásico de estafas. Si suena demasiado bueno para ser verdad, probablemente no es verdad. Nunca inviertas sin investigar a fondo.'
        }
    },
    {
        id: 4,
        title: 'El juego gratis con trampa',
        scenario: 'Descargas un juego "gratis" que normalmente cuesta dinero. Al instalarlo, el juego pide acceso a tus contactos, cámara, micrófono y ubicación. También muestra muchos anuncios.',
        options: [
            { text: 'Aceptar todos los permisos para jugar', quality: 'risky' },
            { text: 'No instalarlo y buscar el juego en tiendas oficiales', quality: 'good' },
            { text: 'Instalarlo pero no usar la cámara', quality: 'risky' },
            { text: 'Compartir el juego con amigos para que también lo descarguen', quality: 'risky' }
        ],
        feedback: {
            good: '¡Bien hecho! Los juegos pirata o de fuentes no oficiales suelen contener malware que roba datos. Las tiendas oficiales (Google Play, App Store) verifican las aplicaciones.',
            risky: '¡Cuidado! Los juegos "gratis" de pago suelen ser malware disfrazado. Los permisos excesivos (contactos, cámara, ubicación) permiten robar tu información personal. Descarga solo de tiendas oficiales.'
        }
    },
    {
        id: 5,
        title: 'El examen en línea',
        scenario: 'Tienes un examen importante en línea. Un compañero te ofrece las respuestas a cambio de tu contraseña de la plataforma escolar. Dice que "todos lo hacen" y que no hay riesgo.',
        options: [
            { text: 'Darle la contraseña porque todos lo hacen', quality: 'risky' },
            { text: 'No compartir la contraseña y estudiar por mi cuenta', quality: 'good' },
            { text: 'Pedir las respuestas sin dar la contraseña', quality: 'risky' },
            { text: 'Darle la contraseña pero cambiarla después', quality: 'risky' }
        ],
        feedback: {
            good: '¡Excelente! Compartir contraseñas viola las políticas escolares y pone en riesgo tu cuenta. Además, recibir respuestas es una forma de trampa académica que tiene consecuencias.',
            risky: '¡Nunca compartas tus contraseñas! Con tu contraseña, otra persona puede acceder a tus calificaciones, mensajes y datos personales. Además, la trampa académica puede resultar en sanciones graves.'
        }
    }
];

const practicalTips = [
    { icon: 'key', text: 'Activa la autenticación de dos factores (2FA) en todas tus cuentas importantes.' },
    { icon: 'eye', text: 'Revisa periódicamente la configuración de privacidad de tus redes sociales.' },
    { icon: 'update', text: 'Mantén tus aplicaciones y sistema operativo siempre actualizados.' },
    { icon: 'wifi', text: 'Evita conectarte a redes Wi-Fi públicas sin usar una VPN.' },
    { icon: 'share', text: 'Piensa antes de publicar: tu huella digital es permanente.' },
    { icon: 'report', text: 'Reporta contenido inapropiado o acoso en las plataformas.' },
    { icon: 'backup', text: 'Haz copias de seguridad de tus archivos importantes regularmente.' },
    { icon: 'think', text: 'Si algo suena demasiado bueno para ser verdad, probablemente no lo es.' }
];

/* ============================================
 * 2. UTILIDADES DEL DOM
 * ============================================ */

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const icons = {
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    fish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    update: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    backup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    think: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
};

let feedbackAudioContext = null;
const soundPreferenceKey = 'tecnosafe-sounds-enabled';

function initSoundControl(inputSelector, labelSelector) {
    const input = $(inputSelector);
    const label = $(labelSelector);
    if (!input) return;

    try {
        input.checked = localStorage.getItem(soundPreferenceKey) === 'true';
    } catch {
        input.checked = false;
    }

    const updateLabel = () => {
        if (label) label.textContent = input.checked ? 'Activados' : 'Desactivados';
    };

    updateLabel();
    input.addEventListener('change', () => {
        try {
            localStorage.setItem(soundPreferenceKey, input.checked);
        } catch {
            updateLabel();
            return;
        }
        updateLabel();
    });
}

function playFeedbackSound(signal) {
    const soundToggle = $('#quiz-sound-toggle') || $('#challenge-sound-toggle');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!soundToggle?.checked || !AudioContextClass) return;

    const sequences = {
        start: [{ frequency: 392, delay: 0, duration: 0.16 }, { frequency: 523.25, delay: 0.09, duration: 0.2 }],
        correct: [{ frequency: 523.25, delay: 0, duration: 0.2 }, { frequency: 659.25, delay: 0.07, duration: 0.21 }, { frequency: 783.99, delay: 0.14, duration: 0.28 }],
        gentle: [{ frequency: 440, delay: 0, duration: 0.18 }, { frequency: 392, delay: 0.1, duration: 0.22 }],
        complete: [{ frequency: 523.25, delay: 0, duration: 0.22 }, { frequency: 659.25, delay: 0.08, duration: 0.22 }, { frequency: 783.99, delay: 0.16, duration: 0.25 }, { frequency: 1046.5, delay: 0.24, duration: 0.42 }]
    };

    try {
        if (!feedbackAudioContext) feedbackAudioContext = new AudioContextClass();
        if (feedbackAudioContext.state === 'suspended') feedbackAudioContext.resume();

        const notes = sequences[signal] || sequences.gentle;
        const startAt = feedbackAudioContext.currentTime;

        notes.forEach(note => {
            const oscillator = feedbackAudioContext.createOscillator();
            const filter = feedbackAudioContext.createBiquadFilter();
            const volume = feedbackAudioContext.createGain();
            const noteStart = startAt + note.delay;

            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(note.frequency, noteStart);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2600, noteStart);
            volume.gain.setValueAtTime(0.0001, noteStart);
            volume.gain.exponentialRampToValueAtTime(0.075, noteStart + 0.025);
            volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.duration);
            oscillator.connect(filter);
            filter.connect(volume);
            volume.connect(feedbackAudioContext.destination);
            oscillator.start(noteStart);
            oscillator.stop(noteStart + note.duration + 0.02);
        });
    } catch {
        return;
    }
}

function initMascot() {
    const mascot = document.createElement('aside');
    mascot.className = 'mascot-guide';
    mascot.setAttribute('aria-label', 'Navia, guía de TecnoSafe');
    mascot.innerHTML = `
        <div class="mascot-guide__figure">
            <svg class="mascot-guide__art" viewBox="0 0 120 120" role="img" aria-label="Navia, un pequeño guardián digital verde">
                <g class="mascot__antenna">
                    <path d="M60 27V15" fill="none" stroke="#d5ed69" stroke-width="4" stroke-linecap="round"/>
                    <path d="m60 4 8 9-8 8-8-8z" fill="#ef9b65" stroke="#17352f" stroke-width="2"/>
                </g>
                <g class="mascot__body">
                    <path d="M30 47V41a7 7 0 0 1 7-7h46a7 7 0 0 1 7 7v6" fill="#398a6c" stroke="#17352f" stroke-width="3"/>
                    <path d="M31 49c0-12 10-22 22-22h14c12 0 22 10 22 22v28c0 13-10 23-23 23H54c-13 0-23-10-23-23z" fill="#26745c" stroke="#17352f" stroke-width="3"/>
                    <path d="M29 55h-5a7 7 0 0 0 0 14h5m62-14h5a7 7 0 0 1 0 14h-5" fill="#d5ed69" stroke="#17352f" stroke-width="3" stroke-linecap="round"/>
                    <rect x="38" y="43" width="44" height="34" rx="15" fill="#f5f8f4" stroke="#17352f" stroke-width="2.5"/>
                    <g class="mascot__eyes" fill="#17352f">
                        <ellipse cx="51" cy="58" rx="3.5" ry="4.5"/>
                        <ellipse cx="69" cy="58" rx="3.5" ry="4.5"/>
                    </g>
                    <path d="M53 68q7 7 14 0" fill="none" stroke="#26745c" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M43 91h14l3 8H45zm20 0h14l2 8H65z" fill="#ef9b65" stroke="#17352f" stroke-width="2.5" stroke-linejoin="round"/>
                    <path d="m60 79 10 4v7c0 6-6 10-10 12-4-2-10-6-10-12v-7z" fill="#d5ed69" stroke="#17352f" stroke-width="2" stroke-linejoin="round"/>
                    <path d="m56 89 3 3 5-6" fill="none" stroke="#17352f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path class="mascot__arm mascot__arm--left" d="M33 73q-12 5-10 16" fill="none" stroke="#26745c" stroke-width="7" stroke-linecap="round"/>
                    <path class="mascot__arm mascot__arm--right" d="M87 73q12 5 10 16" fill="none" stroke="#26745c" stroke-width="7" stroke-linecap="round"/>
                </g>
            </svg>
        </div>
        <div class="mascot-guide__copy">
            <span class="mascot-guide__name">Navia <span aria-hidden="true">/</span> TecnoSafe</span>
            <p class="mascot-guide__message" aria-live="polite">Hola, soy Navia. Te acompaño a navegar con criterio.</p>
        </div>
    `;

    // El hero tiene su propia Navia grande: la guía chica se reserva para las actividades.
    if ($('.hero__content')) return;

    const introSlot = $('.activity-mascot-slot--intro');
    const placement = introSlot || $('.activity-toolbar') || $('.main .section__header');

    if (!placement) return;
    placement.append(mascot);
    loadMascotAnimation(mascot);
}

function moveMascotTo(slotSelector) {
    const mascot = $('.mascot-guide');
    const slot = $(slotSelector);
    if (mascot && slot) slot.append(mascot);
}

function loadMascotAnimation(mascot) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.gsap) {
        animateMascot(mascot);
        return;
    }

    const animationScript = document.createElement('script');
    animationScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
    animationScript.async = true;
    animationScript.addEventListener('load', () => animateMascot(mascot), { once: true });
    animationScript.addEventListener('error', () => mascot.classList.add('mascot-guide--static'), { once: true });
    document.head.append(animationScript);
}

function animateMascot(mascot) {
    if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gsap = window.gsap;
    gsap.to($('.mascot__body', mascot), {
        y: -3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    gsap.to($('.mascot__antenna', mascot), {
        rotation: 5,
        transformOrigin: '50% 100%',
        duration: 0.85,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    const blink = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
    blink.to($('.mascot__eyes', mascot), { scaleY: 0.12, duration: 0.08, transformOrigin: 'center' });
    blink.to($('.mascot__eyes', mascot), { scaleY: 1, duration: 0.12, transformOrigin: 'center' });

    const brandMarks = $$('.brand-mark');
    gsap.to(brandMarks, { y: -1.5, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    brandMarks.forEach(brandMark => {
        brandMark.addEventListener('pointerenter', () => {
            gsap.to(brandMark, { scale: 1.12, rotation: -5, duration: 0.2, ease: 'back.out(2)' });
        });
        brandMark.addEventListener('pointerleave', () => {
            gsap.to(brandMark, { scale: 1, rotation: 0, duration: 0.35, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

function setMascotMood(mood, message) {
    const mascot = $('.mascot-guide');
    if (!mascot) return;

    mascot.dataset.mood = mood;
    $('.mascot-guide__message', mascot).textContent = message;

    if (!window.gsap) return;
    const body = $('.mascot__body', mascot);
    const antenna = $('.mascot__antenna', mascot);
    const leftArm = $('.mascot__arm--left', mascot);
    const rightArm = $('.mascot__arm--right', mascot);
    window.gsap.killTweensOf([body, antenna, leftArm, rightArm]);

    if (mood === 'celebrate') {
        window.gsap.to(leftArm, { rotation: -26, transformOrigin: '100% 20%', duration: 0.16, repeat: 3, yoyo: true, ease: 'sine.inOut' });
        window.gsap.to(rightArm, { rotation: 26, transformOrigin: '0% 20%', duration: 0.16, repeat: 3, yoyo: true, ease: 'sine.inOut' });
        window.gsap.to(antenna, { rotation: 10, transformOrigin: '50% 100%', duration: 0.2, repeat: 3, yoyo: true });
        window.gsap.to(body, {
            y: -9,
            scale: 1.08,
            duration: 0.18,
            repeat: 3,
            yoyo: true,
            ease: 'back.out(2)',
            onComplete: () => window.gsap.to(body, { y: -4, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        });
    } else if (mood === 'think') {
        window.gsap.to(antenna, { rotation: -9, transformOrigin: '50% 100%', duration: 0.25, yoyo: true, repeat: 1 });
        window.gsap.to(body, { rotation: -3, duration: 0.2, repeat: 1, yoyo: true, ease: 'sine.inOut', onComplete: () => window.gsap.to(body, { y: -4, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' }) });
    } else {
        window.gsap.to(antenna, { rotation: 0, transformOrigin: '50% 100%', duration: 0.2 });
        window.gsap.to(leftArm, { rotation: 0, transformOrigin: '100% 20%', duration: 0.2 });
        window.gsap.to(rightArm, { rotation: 0, transformOrigin: '0% 20%', duration: 0.2 });
        window.gsap.to(body, { rotation: 0, y: -4, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
}

/* ============================================
 * 3. NAVEGACIÓN Y HEADER
 * ============================================ */

function initNavigation() {
    const header = $('#header');
    const navToggle = $('.nav__toggle');
    const navMenu = $('#nav-menu');
    const navLinks = $$('.nav__link');

    if (navToggle && navMenu) {
        const closeMenu = () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menú');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navLinks.forEach(link => link.addEventListener('click', closeMenu));

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    highlightActiveLink(navLinks);
}

function highlightActiveLink(navLinks) {
    // Detect current page from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = currentPage === 'index.html' || !currentPage.endsWith('.html')
        ? 'inicio'
        : currentPage.slice(0, -5);

    navLinks.forEach(link => {
        const isCurrentPage = link.dataset.page === pageName;
        link.classList.toggle('active', isCurrentPage);
        if (isCurrentPage) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

/* ============================================
 * 4. TARJETAS DE APRENDIZAJE
 * ============================================ */

function renderLearnCards() {
    const container = $('#learn-cards');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    learnCards.forEach((card, index) => {
        const cardElement = document.createElement('article');
        cardElement.className = 'card animate-on-scroll';
        cardElement.setAttribute('role', 'listitem');
        cardElement.style.animationDelay = `${index * 0.1}s`;

        cardElement.innerHTML = `
            <div class="card__heading">
                <span class="card__index">TEMA ${String(index + 1).padStart(2, '0')}</span>
                <div class="card__icon" aria-hidden="true">${icons[card.icon]}</div>
            </div>
            <h3 class="card__title">${card.title}</h3>
            <p class="card__description">${card.description}</p>
            <ul class="card__tips" role="list">
                ${card.tips.map(tip => `<li class="card__tip">${tip}</li>`).join('')}
            </ul>
        `;

        fragment.appendChild(cardElement);
    });

    container.appendChild(fragment);
}

/* ============================================
 * 5. CUESTIONARIO INTERACTIVO
 * ============================================ */

const quizState = {
    currentQuestion: 0,
    questions: [],
    mode: 'full',
    category: null,
    score: 0,
    xp: 0,
    answers: [],
    isAnswered: false,
    streak: 0,
    bestStreak: 0,
    startTime: null,
    endTime: null,
    categoryScores: {}
};

function renderQuizCategories() {
    const container = $('#quiz-mode-grid');
    if (!container) return;

    container.innerHTML = quizCategories.map((category, index) => {
        const questionCount = quizQuestions.filter(question => question.category === category.name).length;
        return `
            <article class="quiz__mode-card" role="listitem">
                <button class="quiz__mode-button" type="button" data-quiz-category="${category.name}" aria-label="Entrenar ${category.name}, ${questionCount} preguntas">
                    <span class="quiz__mode-icon" aria-hidden="true">${icons[category.icon]}</span>
                    <span class="quiz__mode-copy">
                        <strong>${category.name}</strong>
                        <span>${category.description}</span>
                    </span>
                    <span class="quiz__mode-meta">${String(index + 1).padStart(2, '0')} <span>${questionCount} preguntas</span></span>
                </button>
            </article>
        `;
    }).join('');
}

function shuffleQuizQuestions(questions) {
    const shuffled = [...questions];
    for (let position = shuffled.length - 1; position > 0; position--) {
        const swapIndex = Math.floor(Math.random() * (position + 1));
        [shuffled[position], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[position]];
    }
    return shuffled;
}

function initQuiz() {
    const startBtn = $('#quiz-start-btn');
    const quickStartBtn = $('#quiz-quick-start-btn');
    const categoryGrid = $('#quiz-mode-grid');
    const restartBtn = $('#quiz-restart-btn');
    const changeModeBtn = $('#quiz-change-mode-btn');
    const nextBtn = $('#quiz-next-btn');
    const prevBtn = $('#quiz-prev-btn');

    initSoundControl('#quiz-sound-toggle', '#quiz-sound-label');
    renderQuizCategories();
    if (startBtn) startBtn.addEventListener('click', () => startQuiz('full'));
    if (quickStartBtn) quickStartBtn.addEventListener('click', () => startQuiz('quick'));
    if (categoryGrid) {
        categoryGrid.addEventListener('click', event => {
            const categoryButton = event.target.closest('[data-quiz-category]');
            if (categoryButton) startQuiz('category', categoryButton.dataset.quizCategory);
        });
    }
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (changeModeBtn) changeModeBtn.addEventListener('click', showQuizModePicker);
    if (nextBtn) nextBtn.addEventListener('click', handleNextQuestion);
    if (prevBtn) prevBtn.addEventListener('click', handlePrevQuestion);
}

function startQuiz(mode = 'full', category = null) {
    quizState.mode = mode;
    quizState.category = category;
    const categoryQuestions = category
        ? quizQuestions.filter(question => question.category === category)
        : quizQuestions;
    quizState.questions = mode === 'quick'
        ? shuffleQuizQuestions(quizQuestions).slice(0, 5)
        : [...categoryQuestions];
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.xp = 0;
    quizState.answers = [];
    quizState.isAnswered = false;
    quizState.streak = 0;
    quizState.bestStreak = 0;
    quizState.startTime = Date.now();
    quizState.categoryScores = {};

    $('#quiz-start').hidden = true;
    $('#quiz-results').hidden = true;
    $('#quiz-questions').hidden = false;

    moveMascotTo('#quiz-mascot-slot');
    const modeMessage = mode === 'quick'
        ? 'Cinco preguntas sorpresa. ¡A por tu mejor racha!'
        : category
            ? `Entrenamiento de ${category}. Cada paso te acerca a dominar el tema.`
            : 'Ruta completa: seis temas para fortalecer tu seguridad digital.';
    setMascotMood('ready', modeMessage);
    playFeedbackSound('start');
    renderQuestion();
}

function renderQuestion() {
    const question = quizState.questions[quizState.currentQuestion];
    const totalQuestions = quizState.questions.length;
    const previousAnswer = quizState.answers[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + (previousAnswer ? 1 : 0)) / totalQuestions) * 100;

    $('#quiz-progress-fill').style.width = `${progress}%`;
    $('#quiz-progress-text').textContent = `Pregunta ${quizState.currentQuestion + 1} de ${totalQuestions}`;
    $('#quiz-xp').textContent = quizState.xp;
    $('#quiz-steps').innerHTML = quizState.questions.map((_, index) => {
        const isComplete = Boolean(quizState.answers[index]);
        const isCurrent = index === quizState.currentQuestion;
        const stateClass = isComplete ? ' activity-step--complete' : isCurrent ? ' activity-step--current' : '';
        const currentAttribute = isCurrent ? ' aria-current="step"' : '';
        return `<li class="activity-step${stateClass}"${currentAttribute}><span>${index + 1}</span></li>`;
    }).join('');

    const questionCard = $('#quiz-question-card');
    questionCard.innerHTML = `
        <div class="quiz__category-badge">${question.category}</div>
        <h3 class="quiz__question-text">${question.question}</h3>
        <div class="quiz__options" role="group" aria-label="Opciones de respuesta">
            ${question.options.map((option, index) => `
                <button class="quiz__option"
                        aria-pressed="false"
                        data-index="${index}"
                        type="button">
                    <span class="quiz__option-letter">${String.fromCharCode(65 + index)}</span>
                    <span>${option}</span>
                </button>
            `).join('')}
        </div>
    `;

    $('#quiz-feedback').hidden = true;

    $('#quiz-prev-btn').disabled = quizState.currentQuestion === 0;
    $('#quiz-next-btn').disabled = true;
    $('#quiz-next-btn').textContent = quizState.currentQuestion === totalQuestions - 1 ? 'Ver resultados' : 'Continuar';

    const options = $$('.quiz__option', questionCard);
    options.forEach(option => {
        option.addEventListener('click', () => handleAnswer(parseInt(option.dataset.index), options));
    });

    quizState.isAnswered = false;
    if (previousAnswer) {
        options.forEach((option, index) => {
            option.disabled = true;
            option.setAttribute('aria-pressed', index === previousAnswer.selected ? 'true' : 'false');
            if (index === previousAnswer.selected) option.classList.add('quiz__option--selected');
            if (index === question.correct) option.classList.add('quiz__option--correct');
            else if (index === previousAnswer.selected) option.classList.add('quiz__option--incorrect');
        });
        showQuizFeedback(previousAnswer.correct, previousAnswer.earnedXP, question.explanation);
        $('#quiz-next-btn').disabled = false;
        quizState.isAnswered = true;
    }
}

function showQuizFeedback(isCorrect, earnedXP, explanation) {
    const feedback = $('#quiz-feedback');
    feedback.className = `quiz__feedback ${isCorrect ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect'}`;
    feedback.innerHTML = `
        <div class="quiz__feedback-heading">
            <p class="quiz__feedback-title">${isCorrect ? '¡Buen trabajo!' : 'Una oportunidad para aprender'}</p>
            <span class="quiz__feedback-xp">+${earnedXP} XP</span>
        </div>
        <p class="quiz__feedback-text">${explanation}</p>
    `;
    feedback.hidden = false;
}

function handleAnswer(selectedIndex, options) {
    if (quizState.isAnswered) return;

    quizState.isAnswered = true;
    const question = quizState.questions[quizState.currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    const earnedXP = isCorrect ? 10 : 5;

    quizState.answers[quizState.currentQuestion] = {
        selected: selectedIndex,
        correct: isCorrect,
        earnedXP
    };
    quizState.xp += earnedXP;

    if (isCorrect) {
        quizState.score++;
        quizState.streak++;
        if (quizState.streak > quizState.bestStreak) {
            quizState.bestStreak = quizState.streak;
        }
    } else {
        quizState.streak = 0;
    }

    // Track category scores
    if (!quizState.categoryScores[question.category]) {
        quizState.categoryScores[question.category] = { correct: 0, total: 0 };
    }
    quizState.categoryScores[question.category].total++;
    if (isCorrect) {
        quizState.categoryScores[question.category].correct++;
    }

    // Update streak display
    const streakEl = $('#quiz-streak');
    const streakText = $('#quiz-streak-text');
    if (streakEl && streakText) {
        if (quizState.streak >= 2) {
            streakEl.hidden = false;
            streakText.textContent = `Racha: ${quizState.streak}`;
        } else {
            streakEl.hidden = true;
        }
    }

    options.forEach((option, index) => {
        option.disabled = true;
        option.setAttribute('aria-pressed', index === selectedIndex ? 'true' : 'false');

        if (index === question.correct) {
            option.classList.add('quiz__option--correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('quiz__option--incorrect');
        }
    });

    $('#quiz-xp').textContent = quizState.xp;
    $('#quiz-progress-fill').style.width = `${((quizState.currentQuestion + 1) / quizState.questions.length) * 100}%`;
    $('#quiz-steps').children[quizState.currentQuestion].classList.add('activity-step--complete');
    playFeedbackSound(isCorrect ? 'correct' : 'gentle');
    showQuizFeedback(isCorrect, earnedXP, question.explanation);
    setMascotMood(isCorrect ? 'celebrate' : 'think', isCorrect
        ? '¡Buen ojo! Elegiste una opción segura.'
        : 'Una oportunidad para aprender otra señal de alerta.');

    $('#quiz-next-btn').disabled = false;
}

function handleNextQuestion() {
    const totalQuestions = quizState.questions.length;

    if (quizState.currentQuestion < totalQuestions - 1) {
        quizState.currentQuestion++;
        renderQuestion();
    } else {
        showQuizResults();
    }
}

function handlePrevQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        renderQuestion();
    }
}

function showQuizResults() {
    quizState.endTime = Date.now();

    $('#quiz-questions').hidden = true;
    $('#quiz-results').hidden = false;
    moveMascotTo('#quiz-results-mascot-slot');

    const totalQuestions = quizState.questions.length;
    const percentage = Math.round((quizState.score / totalQuestions) * 100);

    // Calculate time taken
    const timeTaken = Math.floor((quizState.endTime - quizState.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const timeString = minutes > 0
        ? `${minutes}m ${seconds}s`
        : `${seconds}s`;

    // Animate score circle
    const scoreCircle = $('.quiz__score-ring');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;

    scoreCircle.style.strokeDashoffset = circumference;
    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
    }, 100);

    // Determine title and message
    let title, message;
    if (percentage >= 90) {
        title = '¡Perfecto!';
        message = 'Eres un experto en seguridad digital. ¡Impresionante!';
    } else if (percentage >= 80) {
        title = '¡Excelente!';
        message = 'Tienes un conocimiento sólido de seguridad digital. ¡Sigue aprendiendo!';
    } else if (percentage >= 60) {
        title = '¡Bien hecho!';
        message = 'Tienes buenos conocimientos, pero hay áreas que puedes mejorar.';
    } else if (percentage >= 40) {
        title = 'Buen intento';
        message = 'Revisa los temas de aprendizaje y vuelve a intentarlo.';
    } else {
        title = 'Sigue aprendiendo';
        message = 'No te preocupes, la seguridad digital se aprende paso a paso. Revisa las tarjetas de aprendizaje.';
    }

    $('#quiz-result-title').textContent = title;
    $('#quiz-result-message').textContent = message;
    $('#quiz-score-value').textContent = `${quizState.score}/${totalQuestions}`;
    setMascotMood('celebrate', `Misión completa: ganaste ${quizState.xp} XP.`);
    playFeedbackSound('complete');

    // Add stats to results
    const resultsCard = $('.quiz__results-card');
    const statsHtml = `
        <div class="quiz__result-stats">
            <div class="quiz__stat">
                <span class="quiz__stat-value">${timeString}</span>
                <span class="quiz__stat-label">Tiempo</span>
            </div>
            <div class="quiz__stat">
                <span class="quiz__stat-value">${quizState.bestStreak}</span>
                <span class="quiz__stat-label">Mejor racha</span>
            </div>
            <div class="quiz__stat">
                <span class="quiz__stat-value">${percentage}%</span>
                <span class="quiz__stat-label">Aciertos</span>
            </div>
            <div class="quiz__stat">
                <span class="quiz__stat-value">${quizState.xp}</span>
                <span class="quiz__stat-label">XP</span>
            </div>
        </div>
    `;

    // Insert stats after the score circle
    const existingStats = resultsCard.querySelector('.quiz__result-stats');
    if (existingStats) existingStats.remove();
    const scoreCircleEl = $('#quiz-score-circle');
    if (scoreCircleEl) {
        scoreCircleEl.insertAdjacentHTML('afterend', statsHtml);
    }

    // Detailed results by category
    const detailsContainer = $('#quiz-result-details');
    const categoryResults = Object.entries(quizState.categoryScores).map(([category, scores]) => {
        const catPercentage = Math.round((scores.correct / scores.total) * 100);
        return { category, ...scores, percentage: catPercentage };
    });

    detailsContainer.innerHTML = `
        <h4 class="quiz__details-title">Resultados por categoría</h4>
        <div class="quiz__category-results">
            ${categoryResults.map(cat => `
                <div class="quiz__category-result">
                    <span class="quiz__category-name">${cat.category}</span>
                    <div class="quiz__category-bar">
                        <div class="quiz__category-fill" style="width: ${cat.percentage}%"></div>
                    </div>
                    <span class="quiz__category-score">${cat.correct}/${cat.total}</span>
                </div>
            `).join('')}
        </div>
        <h4 class="quiz__details-title" style="margin-top: 1.5rem;">Detalle de respuestas</h4>
        <div class="quiz__answer-list">
            ${quizState.questions.map((q, index) => {
                const answer = quizState.answers[index];
                const isCorrect = answer && answer.correct;
                return `
                    <div class="quiz__result-item ${isCorrect ? 'quiz__result-item--correct' : 'quiz__result-item--incorrect'}">
                        <span class="quiz__result-icon">${isCorrect ? '✓' : '✗'}</span>
                        <span class="quiz__result-text">${q.question}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    // Show confetti for high scores
    if (percentage >= 80) {
        createConfetti();
    }
}

function restartQuiz() {
    startQuiz(quizState.mode, quizState.category);
}

function showQuizModePicker() {
    $('#quiz-questions').hidden = true;
    $('#quiz-results').hidden = true;
    $('#quiz-start').hidden = false;
    moveMascotTo('#quiz-intro-mascot-slot');
    setMascotMood('ready', 'Elige otro tema o prueba una ruta distinta.');
}

function createConfetti() {
    const colors = ['#26745c', '#d5ed69', '#398a6c', '#f59e0b', '#ef4444'];
    const container = document.createElement('div');
    container.className = 'quiz__confetti';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'quiz__confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        piece.style.animationDuration = `${2 + Math.random() * 2}s`;
        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 4000);
}

/* ============================================
 * 6. RETO DIGITAL
 * ============================================ */

const challengeState = {
    currentScenario: 0,
    decisions: [],
    xp: 0,
    streak: 0,
    bestStreak: 0,
    isAnswered: false
};

function initChallenge() {
    const startBtn = $('#challenge-start-btn');
    const restartBtn = $('#challenge-restart-btn');
    const nextBtn = $('#challenge-next-btn');

    initSoundControl('#challenge-sound-toggle', '#challenge-sound-label');
    if (startBtn) startBtn.addEventListener('click', startChallenge);
    if (restartBtn) restartBtn.addEventListener('click', restartChallenge);
    if (nextBtn) nextBtn.addEventListener('click', handleNextScenario);
}

function startChallenge() {
    challengeState.currentScenario = 0;
    challengeState.decisions = [];
    challengeState.xp = 0;
    challengeState.streak = 0;
    challengeState.bestStreak = 0;
    challengeState.isAnswered = false;

    $('#challenge-start').hidden = true;
    $('#challenge-complete').hidden = true;
    $('#challenge-questions').hidden = false;

    moveMascotTo('#challenge-mascot-slot');
    setMascotMood('ready', 'Mira las señales y decide con calma.');
    playFeedbackSound('start');
    renderScenario();
}

function renderScenario() {
    const scenario = challengeScenarios[challengeState.currentScenario];
    const totalScenarios = challengeScenarios.length;
    const progress = ((challengeState.currentScenario) / totalScenarios) * 100;

    $('#challenge-progress-fill').style.width = `${progress}%`;
    $('#challenge-progress-text').textContent = `Escenario ${challengeState.currentScenario + 1} de ${totalScenarios}`;
    $('#challenge-xp').textContent = challengeState.xp;
    $('#challenge-steps').innerHTML = challengeScenarios.map((_, index) => {
        const isComplete = index < challengeState.currentScenario;
        const isCurrent = index === challengeState.currentScenario;
        const stateClass = isComplete ? ' activity-step--complete' : isCurrent ? ' activity-step--current' : '';
        const currentAttribute = isCurrent ? ' aria-current="step"' : '';
        return `<li class="activity-step${stateClass}"${currentAttribute}><span>${index + 1}</span></li>`;
    }).join('');

    const scenarioCard = $('#challenge-scenario-card');
    scenarioCard.innerHTML = `
        <h3 class="challenge__scenario-title">${scenario.title}</h3>
        <p class="challenge__scenario-text">${scenario.scenario}</p>
        <div class="challenge__options" role="group" aria-label="Elige una respuesta">
            ${scenario.options.map((option, index) => `
                <button class="challenge__option"
                        aria-pressed="false"
                        data-index="${index}"
                        data-quality="${option.quality}"
                        type="button">
                    ${option.text}
                </button>
            `).join('')}
        </div>
    `;

    $('#challenge-feedback').hidden = true;

    $('#challenge-next-btn').disabled = true;
    $('#challenge-next-btn').textContent = challengeState.currentScenario === totalScenarios - 1 ? 'Ver resumen' : 'Continuar';

    const options = $$('.challenge__option', scenarioCard);
    options.forEach(option => {
        option.addEventListener('click', () => handleScenarioAnswer(parseInt(option.dataset.index), option.dataset.quality, options));
    });

    challengeState.isAnswered = false;
}

function handleScenarioAnswer(selectedIndex, quality, options) {
    if (challengeState.isAnswered) return;

    challengeState.isAnswered = true;
    const scenario = challengeScenarios[challengeState.currentScenario];
    const isSafeDecision = quality === 'good';
    const earnedXP = isSafeDecision ? 10 : 5;

    challengeState.decisions[challengeState.currentScenario] = {
        selected: selectedIndex,
        quality,
        earnedXP
    };
    challengeState.xp += earnedXP;
    challengeState.streak = isSafeDecision ? challengeState.streak + 1 : 0;
    challengeState.bestStreak = Math.max(challengeState.bestStreak, challengeState.streak);

    options.forEach((option, index) => {
        option.disabled = true;
        option.setAttribute('aria-pressed', index === selectedIndex ? 'true' : 'false');

        if (index === selectedIndex) {
            option.classList.add('challenge__option--selected');
        }

        if (scenario.options[index].quality === 'good') {
            option.classList.add('challenge__option--best');
        }
    });

    const feedback = $('#challenge-feedback');
    const feedbackType = quality === 'good' ? 'good' : 'warning';
    feedback.className = `challenge__feedback challenge__feedback--${feedbackType}`;
    feedback.innerHTML = `
        <div class="challenge__feedback-heading">
            <p class="challenge__feedback-title">${isSafeDecision ? '¡Decisión segura!' : 'Una señal para recordar'}</p>
            <span class="challenge__feedback-xp">+${earnedXP} XP</span>
        </div>
        <p class="challenge__feedback-text">${scenario.feedback[quality]}</p>
    `;
    feedback.hidden = false;

    $('#challenge-xp').textContent = challengeState.xp;
    $('#challenge-progress-fill').style.width = `${((challengeState.currentScenario + 1) / challengeScenarios.length) * 100}%`;
    $('#challenge-steps').children[challengeState.currentScenario].classList.add('activity-step--complete');
    playFeedbackSound(isSafeDecision ? 'correct' : 'gentle');
    setMascotMood(isSafeDecision ? 'celebrate' : 'think', isSafeDecision
        ? '¡Buena decisión! Protegiste tus datos.'
        : 'No pasa nada: ahora sabes qué señal observar.');
    $('#challenge-next-btn').disabled = false;
}

function handleNextScenario() {
    const totalScenarios = challengeScenarios.length;

    if (challengeState.currentScenario < totalScenarios - 1) {
        challengeState.currentScenario++;
        renderScenario();
    } else {
        showChallengeComplete();
    }
}

function showChallengeComplete() {
    $('#challenge-questions').hidden = true;
    $('#challenge-complete').hidden = false;
    moveMascotTo('#challenge-results-mascot-slot');

    const summaryContainer = $('#challenge-summary');
    const goodDecisions = challengeState.decisions.filter(d => d.quality === 'good').length;
    const totalScenarios = challengeScenarios.length;
    setMascotMood('celebrate', `Reto completo: ${challengeState.xp} XP y ${goodDecisions} decisiones seguras.`);
    playFeedbackSound('complete');

    summaryContainer.innerHTML = `
        <div class="challenge__summary">
            <h4 class="challenge__summary-title">Resumen de tus decisiones</h4>
            <div class="challenge__summary-list">
                ${challengeScenarios.map((scenario, index) => {
                    const decision = challengeState.decisions[index];
                    const isGood = decision && decision.quality === 'good';
                    return `
                        <div class="challenge__summary-item">
                            <span class="challenge__summary-dot ${isGood ? 'challenge__summary-dot--good' : 'challenge__summary-dot--warning'}"></span>
                            <span>
                                <strong>${scenario.title}</strong>: ${isGood ? 'Decisión segura' : 'Una oportunidad para aprender'}
                                <small class="challenge__summary-choice">Elegiste: ${scenario.options[decision.selected].text}</small>
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
            <p style="margin-top: 1rem; font-size: 0.9375rem; color: var(--color-gray-700);">
                Tomaste <strong>${goodDecisions} de ${totalScenarios}</strong> decisiones seguras y ganaste <strong>${challengeState.xp} XP</strong>.
                ${goodDecisions >= 4 ? '¡Excelente criterio!' : 'Cada escenario te deja una señal útil para la próxima.'}
                Tu mejor racha segura fue de <strong>${challengeState.bestStreak}</strong>.
            </p>
        </div>
    `;
}

function restartChallenge() {
    startChallenge();
}

function renderTips() {
    const container = $('#tips-grid');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    practicalTips.forEach((tip, index) => {
        const tipElement = document.createElement('div');
        tipElement.className = 'tip animate-on-scroll';
        tipElement.setAttribute('role', 'listitem');
        tipElement.style.animationDelay = `${index * 0.05}s`;
        tipElement.innerHTML = `
            <div class="tip__icon" aria-hidden="true">${icons[tip.icon]}</div>
            <div class="tip__content">
                <span class="tip__index">HÁBITO ${String(index + 1).padStart(2, '0')}</span>
                <p class="tip__text">${tip.text}</p>
            </div>
        `;
        fragment.appendChild(tipElement);
    });

    container.appendChild(fragment);
}

/* ============================================
 * 8. ANIMACIONES DE SCROLL
 * ============================================ */

function initScrollAnimations() {
    const animatedElements = $$('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('animated'));
    }
}

/* ============================================
 * 9. BOTÓN VOLVER ARRIBA
 * ============================================ */

function initBackToTop() {
    const backToTopBtn = $('#back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn.hidden = false;
        } else {
            backToTopBtn.hidden = true;
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
 * 10. NAVIA SIGUE EL MOUSE
 * ============================================ */

function initHeroNavia() {
    const svg = $('.hero__svg');
    if (!svg) return;

    const follow = $('.hero-navia__follow', svg);
    const gaze = $('.hero-navia__gaze', svg);
    if (!follow && !gaze) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const maxLean = 12;
    const maxGaze = 1.3;

    window.addEventListener('mousemove', (event) => {
        const rect = svg.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
        const y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
        if (follow) {
            follow.style.transform = `translate(${(x * maxLean).toFixed(2)}px, ${(y * maxLean).toFixed(2)}px)`;
        }
        if (gaze) {
            gaze.style.transform = `translate(${(x * maxGaze).toFixed(2)}px, ${(y * maxGaze).toFixed(2)}px)`;
        }
    }, { passive: true });
}

/* ============================================
 * 11. INICIALIZACIÓN
 * ============================================ */

function init() {
    renderLearnCards();
    renderTips();
    initMascot();
    initHeroNavia();
    initNavigation();
    initQuiz();
    initChallenge();
    initScrollAnimations();
    initBackToTop();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}