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
    }
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

/* ============================================
 * 3. NAVEGACIÓN Y HEADER
 * ============================================ */

function initNavigation() {
    const header = $('#header');
    const navToggle = $('.nav__toggle');
    const navMenu = $('#nav-menu');
    const navLinks = $$('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    highlightActiveLink(navLinks);
}

function highlightActiveLink(navLinks) {
    // Detect current page from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = currentPage.replace('.html', '');

    navLinks.forEach(link => {
        const linkPage = link.dataset.page;
        link.classList.toggle('active', linkPage === pageName);
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
            <div class="card__icon" aria-hidden="true">${icons[card.icon]}</div>
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
    score: 0,
    answers: [],
    isAnswered: false,
    streak: 0,
    bestStreak: 0,
    startTime: null,
    endTime: null,
    categoryScores: {}
};

function initQuiz() {
    const startBtn = $('#quiz-start-btn');
    const restartBtn = $('#quiz-restart-btn');
    const nextBtn = $('#quiz-next-btn');
    const prevBtn = $('#quiz-prev-btn');

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (nextBtn) nextBtn.addEventListener('click', handleNextQuestion);
    if (prevBtn) prevBtn.addEventListener('click', handlePrevQuestion);
}

let quizTimerInterval = null;

function startQuiz() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answers = [];
    quizState.isAnswered = false;
    quizState.streak = 0;
    quizState.bestStreak = 0;
    quizState.startTime = Date.now();
    quizState.categoryScores = {};

    $('#quiz-start').hidden = true;
    $('#quiz-results').hidden = true;
    $('#quiz-questions').hidden = false;

    startTimer();
    renderQuestion();
}

function startTimer() {
    if (quizTimerInterval) clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - quizState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        const timerText = $('#quiz-timer-text');
        if (timerText) timerText.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    if (quizTimerInterval) {
        clearInterval(quizTimerInterval);
        quizTimerInterval = null;
    }
}

function renderQuestion() {
    const question = quizQuestions[quizState.currentQuestion];
    const totalQuestions = quizQuestions.length;
    const progress = ((quizState.currentQuestion) / totalQuestions) * 100;

    $('#quiz-progress-fill').style.width = `${progress}%`;
    $('#quiz-progress-text').textContent = `Pregunta ${quizState.currentQuestion + 1} de ${totalQuestions}`;

    const questionCard = $('#quiz-question-card');
    questionCard.innerHTML = `
        <div class="quiz__category-badge">${question.category}</div>
        <h3 class="quiz__question-text">${question.question}</h3>
        <div class="quiz__options" role="radiogroup" aria-label="Opciones de respuesta">
            ${question.options.map((option, index) => `
                <button class="quiz__option"
                        role="radio"
                        aria-checked="false"
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
    $('#quiz-next-btn').textContent = quizState.currentQuestion === totalQuestions - 1 ? 'Ver resultados' : 'Siguiente';

    const options = $$('.quiz__option', questionCard);
    options.forEach(option => {
        option.addEventListener('click', () => handleAnswer(parseInt(option.dataset.index), options));
    });

    quizState.isAnswered = false;
}

function handleAnswer(selectedIndex, options) {
    if (quizState.isAnswered) return;

    quizState.isAnswered = true;
    const question = quizQuestions[quizState.currentQuestion];
    const isCorrect = selectedIndex === question.correct;

    quizState.answers[quizState.currentQuestion] = {
        selected: selectedIndex,
        correct: isCorrect
    };

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
        option.setAttribute('aria-checked', index === selectedIndex ? 'true' : 'false');

        if (index === question.correct) {
            option.classList.add('quiz__option--correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('quiz__option--incorrect');
        } else {
            option.style.opacity = '0.5';
        }
    });

    const feedback = $('#quiz-feedback');
    feedback.className = `quiz__feedback ${isCorrect ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect'}`;
    feedback.innerHTML = `
        <p class="quiz__feedback-title">${isCorrect ? '¡Correcto!' : 'Incorrecto'}</p>
        <p class="quiz__feedback-text">${question.explanation}</p>
    `;
    feedback.hidden = false;

    $('#quiz-next-btn').disabled = false;
}

function handleNextQuestion() {
    const totalQuestions = quizQuestions.length;

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

        const prevAnswer = quizState.answers[quizState.currentQuestion];
        if (prevAnswer) {
            const options = $$('.quiz__option');
            options.forEach((option, index) => {
                if (index === prevAnswer.selected) {
                    option.classList.add('quiz__option--selected');
                    option.setAttribute('aria-checked', 'true');
                }
                if (index === quizQuestions[quizState.currentQuestion].correct) {
                    option.classList.add('quiz__option--correct');
                }
            });

            const feedback = $('#quiz-feedback');
            feedback.className = `quiz__feedback ${prevAnswer.correct ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect'}`;
            feedback.innerHTML = `
                <p class="quiz__feedback-title">${prevAnswer.correct ? '¡Correcto!' : 'Incorrecto'}</p>
                <p class="quiz__feedback-text">${quizQuestions[quizState.currentQuestion].explanation}</p>
            `;
            feedback.hidden = false;
            $('#quiz-next-btn').disabled = false;
            quizState.isAnswered = true;
        }
    }
}

function showQuizResults() {
    stopTimer();
    quizState.endTime = Date.now();

    $('#quiz-questions').hidden = true;
    $('#quiz-results').hidden = false;

    const totalQuestions = quizQuestions.length;
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
        </div>
    `;

    // Insert stats after the score circle
    const scoreCircleEl = $('#quiz-score-circle');
    if (scoreCircleEl && !resultsCard.querySelector('.quiz__result-stats')) {
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
            ${quizQuestions.map((q, index) => {
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
    startQuiz();
}

function createConfetti() {
    const colors = ['#2563eb', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
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
    isAnswered: false
};

function initChallenge() {
    const startBtn = $('#challenge-start-btn');
    const restartBtn = $('#challenge-restart-btn');
    const nextBtn = $('#challenge-next-btn');

    if (startBtn) startBtn.addEventListener('click', startChallenge);
    if (restartBtn) restartBtn.addEventListener('click', restartChallenge);
    if (nextBtn) nextBtn.addEventListener('click', handleNextScenario);
}

function startChallenge() {
    challengeState.currentScenario = 0;
    challengeState.decisions = [];
    challengeState.isAnswered = false;

    $('#challenge-start').hidden = true;
    $('#challenge-complete').hidden = true;
    $('#challenge-questions').hidden = false;

    renderScenario();
}

function renderScenario() {
    const scenario = challengeScenarios[challengeState.currentScenario];
    const totalScenarios = challengeScenarios.length;
    const progress = ((challengeState.currentScenario) / totalScenarios) * 100;

    $('#challenge-progress-fill').style.width = `${progress}%`;
    $('#challenge-progress-text').textContent = `Situación ${challengeState.currentScenario + 1} de ${totalScenarios}`;

    const scenarioCard = $('#challenge-scenario-card');
    scenarioCard.innerHTML = `
        <h3 class="challenge__scenario-title">${scenario.title}</h3>
        <p class="challenge__scenario-text">${scenario.scenario}</p>
        <div class="challenge__options" role="radiogroup" aria-label="Opciones de decisión">
            ${scenario.options.map((option, index) => `
                <button class="challenge__option"
                        role="radio"
                        aria-checked="false"
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
    $('#challenge-next-btn').textContent = challengeState.currentScenario === totalScenarios - 1 ? 'Ver resumen' : 'Siguiente situación';

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

    challengeState.decisions[challengeState.currentScenario] = {
        selected: selectedIndex,
        quality: quality
    };

    options.forEach((option, index) => {
        option.setAttribute('aria-checked', index === selectedIndex ? 'true' : 'false');

        if (index === selectedIndex) {
            option.classList.add('challenge__option--selected');
        }

        if (scenario.options[index].quality === 'good') {
            option.classList.add('challenge__option--best');
        } else if (index !== selectedIndex) {
            option.style.opacity = '0.5';
        }
    });

    const feedback = $('#challenge-feedback');
    const feedbackType = quality === 'good' ? 'good' : 'warning';
    feedback.className = `challenge__feedback challenge__feedback--${feedbackType}`;
    feedback.innerHTML = `
        <p class="challenge__feedback-title">${quality === 'good' ? '¡Decisión segura!' : 'Decisión riesgosa'}</p>
        <p class="challenge__feedback-text">${scenario.feedback[quality]}</p>
    `;
    feedback.hidden = false;

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

    const summaryContainer = $('#challenge-summary');
    const goodDecisions = challengeState.decisions.filter(d => d.quality === 'good').length;
    const totalScenarios = challengeScenarios.length;

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
                            <span>${scenario.title}: ${isGood ? 'Decisión segura' : 'Decisión riesgosa'}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <p style="margin-top: 1rem; font-size: 0.9375rem; color: var(--color-gray-700);">
                Tomaste <strong>${goodDecisions} de ${totalScenarios}</strong> decisiones seguras.
                ${goodDecisions >= 4 ? '¡Excelente criterio!' : 'Sigue practicando para mejorar tu intuición digital.'}
            </p>
        </div>
    `;
}

function restartChallenge() {
    startChallenge();
}

/* ============================================
 * 7. CONSEJOS PRÁCTICOS
 * ============================================ */

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
            <p class="tip__text">${tip.text}</p>
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
 * 10. INICIALIZACIÓN
 * ============================================ */

function init() {
    renderLearnCards();
    renderTips();
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