/* ========================================================
   Robot Seguidor de Línea Negra (CNY70 + 2N2222A) - Script Interactivo
   Proyecto Educativo Grado 11 - INACEGO
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initMaterialsFilter();
    initCircuitInspector();
    initVideoControls();
    initNaviaChat();
    initBackToTop();
});

/* 1. Navegación y Menú Responsive */
function initNavigation() {
    const navToggle = document.querySelector('.nav__toggle') || document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav__menu') || document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav__link--tab, .nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            const iconSpan = navToggle.querySelector('.nav__toggle-icon');
            if (iconSpan) {
                iconSpan.textContent = isOpen ? '✕' : '☰';
            } else {
                navToggle.innerHTML = isOpen ? '✕' : '☰';
            }
        });
    }

    // Cerrar menú móvil al hacer click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    const iconSpan = navToggle.querySelector('.nav__toggle-icon');
                    if (iconSpan) iconSpan.textContent = '☰';
                    else navToggle.innerHTML = '☰';
                }
            }
        });
    });
}

/* 2. Filtro de Materiales */
function initMaterialsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.material-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* 3. Inspector Interactivo de Bloques Electrónicos */
function initCircuitInspector() {
    const blocks = document.querySelectorAll('.block-node');
    const infoBox = document.getElementById('block-inspector-info');

    const descriptions = {
        'sensors': '<strong>Etapa 1 — Sensor Óptico CNY70 (560 Ω + 20 kΩ):</strong> El emisor IR recibe +9V limitado por 560 Ω hacia tierra. Sobre blanco la luz rebota y el fototransistor conduce; sobre línea negra la luz se absorbe y la resistencia de 20 kΩ lleva la salida a 0V.',
        'control': '<strong>Etapa 2 — Inversor Q1 (1 kΩ + 2N2222A):</strong> La señal del CNY70 entra por 1 kΩ a la Base (centro) de Q1. Al detectar línea negra, Q1 se corta y deja subir la tensión en su Colector alimentado con otra resistencia de 1 kΩ desde +9V.',
        'led': '<strong>Etapa 3 — LED Rojo y Ajuste de Velocidad:</strong> El LED rojo enciende cuando el sensor pisa la línea negra. A continuación va una resistencia de 1 kΩ (o potenciómetro variable de 50 kΩ) para dosificar la velocidad en curvas.',
        'power': '<strong>Etapa 4 — Driver de Potencia Q2 (2N2222A):</strong> El segundo transistor 2N2222A recibe la corriente en su Base, entra en saturación y conecta el retorno del motorreductor a tierra (Emisor a GND) cerrando el circuito de 9V.',
        'movement': '<strong>Etapa 5 — Motorreductor Cruzado (≥ 1 kg · 100 RPM):</strong> El motor va montado al lado contrario de su sensor. Mientras ambos pisan negro, avanzan; si uno sale al blanco se detiene su motor opuesto para girar y volver a la línea.'
    };

    blocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            const key = block.getAttribute('data-block');
            if (infoBox && descriptions[key]) {
                infoBox.innerHTML = descriptions[key];
            }
        });
    });
}

/* 4. Reproductor Sincronizado con Marcas de Tiempo (Tutorial El Profe García) */
function initVideoControls() {
    const videoId = 'W9Uy-wgD5Vc';
    const videoData = [
        {
            part: 1,
            start: 0,
            timeLabel: '00:00',
            title: '00:00 — Introducción y Funcionamiento del Seguidor de Línea Negra',
            desc: 'Presentación general del robot seguidor de línea negra, la ubicación frontal de sus sensores y sus aplicaciones tanto industriales como en torneos universitarios de velocidad y destreza.',
            topic: 'El Profe García · 4:01 min',
            progress: '00:00 — Introducción y Alcance'
        },
        {
            part: 2,
            start: 31,
            timeLabel: '00:31',
            title: '00:31 — Etapa del Sensor CNY70 y Prueba Inicial',
            desc: 'Cómo cablear el CNY70 mirando al piso: el LED testigo se apaga sobre la línea negra y se enciende sobre el blanco, enviando la señal por el cable naranja hacia los transistores.',
            topic: 'Etapa 1: Sensor CNY70',
            progress: '00:31 — Prueba del Sensor CNY70'
        },
        {
            part: 3,
            start: 67,
            timeLabel: '01:07',
            title: '01:07 — Primer Transistor Q1 (2N2222A) y Resistencias de 1 kΩ',
            desc: 'Identificación de pines del 2N2222A (Izquierda Emisor, Centro Base, Derecha Colector), código café-negro-rojo-dorado de 1 kΩ hacia la Base y 1 kΩ del Colector al bus positivo.',
            topic: 'Etapa 2: Inversor Q1',
            progress: '01:07 — Transistor Q1 2N2222A'
        },
        {
            part: 4,
            start: 110,
            timeLabel: '01:50',
            title: '01:50 — LED Rojo Indicador y Calibración de Velocidad (1 kΩ vs 50 kΩ)',
            desc: 'Conexión del LED rojo al colector de Q1 (pata larga positiva) y explicación del ajuste fino con resistencia variable de 50 kΩ o resistencia fija de 1 kΩ según las curvas de la pista.',
            topic: 'Etapa 3: LED y Calibración',
            progress: '01:50 — LED Rojo y Velocidad'
        },
        {
            part: 5,
            start: 152,
            timeLabel: '02:32',
            title: '02:32 — Segundo Transistor Q2 (2N2222A) y Motorreductor de 1 kg',
            desc: 'Conexión del segundo 2N2222A (Emisor a tierra, Colector al motorreductor y otro borne a +9V), remarcando usar motores de al menos 1 kg de fuerza para mover el chasis.',
            topic: 'Etapa 4: Potencia Q2',
            progress: '02:32 — Driver Q2 y Motorreductor'
        },
        {
            part: 6,
            start: 176,
            timeLabel: '02:56',
            title: '02:56 — Prueba en Vivo y Regla del Control Cruzado',
            desc: 'Validación real sobre cinta negra: el motor gira sobre la línea y se apaga al salir. Regla obligatoria de instalar cada motor en el lado contrario al de su sensor.',
            topic: 'Etapa 5: Validación en Pista',
            progress: '02:56 — Prueba y Cruce de Motores'
        }
    ];

    const iframe = document.getElementById('main-video-iframe');
    const titleEl = document.getElementById('video-title');
    const descEl = document.getElementById('video-desc');
    const partBadgeEl = document.getElementById('video-seq-part-badge');
    const progressEl = document.getElementById('video-seq-progress');
    const topicTagEl = document.getElementById('video-topic-tag');
    const ytLinkEl = document.getElementById('video-yt-link');
    const btnPrev = document.getElementById('video-seq-prev');
    const btnNext = document.getElementById('video-seq-next');
    const tabs = document.querySelectorAll('.playlist-tab');
    const playChapterBtns = document.querySelectorAll('.btn-play-chapter');
    const playerContainer = document.getElementById('video-player-container');

    if (!iframe && !tabs.length) return;

    let currentPartIndex = 0;

    function setVideoPart(index, shouldScroll = false) {
        if (index < 0 || index >= videoData.length) return;
        currentPartIndex = index;
        const current = videoData[index];

        if (iframe) {
            iframe.src = `https://www.youtube.com/embed/${videoId}?start=${current.start}&autoplay=1&rel=0`;
        }
        if (titleEl) titleEl.textContent = current.title;
        if (descEl) descEl.textContent = current.desc;
        if (partBadgeEl) partBadgeEl.textContent = `ETAPA ${current.part} DE ${videoData.length}`;
        if (progressEl) progressEl.textContent = current.progress;
        if (topicTagEl) topicTagEl.textContent = current.topic;
        if (ytLinkEl) {
            ytLinkEl.href = current.start > 0
                ? `https://youtu.be/${videoId}?t=${current.start}`
                : `https://youtu.be/${videoId}`;
            ytLinkEl.textContent = `Ver en YouTube (${current.timeLabel}) ↗`;
        }

        if (btnPrev) btnPrev.disabled = (index === 0);
        if (btnNext) btnNext.disabled = (index === videoData.length - 1);

        tabs.forEach((tab, i) => {
            const isMatch = (i === index);
            tab.classList.toggle('active', isMatch);
            tab.setAttribute('aria-selected', isMatch);
        });

        if (shouldScroll && playerContainer) {
            playerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => setVideoPart(currentPartIndex - 1));
    }
    if (btnNext) {
        btnNext.addEventListener('click', () => setVideoPart(currentPartIndex + 1));
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => setVideoPart(index));
    });

    playChapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const partNum = parseInt(btn.getAttribute('data-part'), 10);
            if (!isNaN(partNum)) {
                setVideoPart(partNum - 1, true);
            }
        });
    });
}

/* 5. Animación de Elementos al Scroll */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.12
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('active'));
    }
}

/* 6. Navia - Asistente & Mascota Interactiva de Robótica */
const NAVIA_FAQ = [
    {
        q: '¿Por qué no usamos Arduino ni Micro:bit?',
        a: 'Este robot es 100% analógico y se arma directo sobre una protoboard. Utiliza dos sensores CNY70 y cuatro transistores NPN 2N2222A (dos por canal) para responder en microsegundos con una sola batería de 9V, sin código ni placas programables.'
    },
    {
        q: '¿Cuál es el pinout del transistor 2N2222A?',
        a: 'Mirando el 2N2222A con la cara plana de frente y las patas hacia abajo: la pata izquierda es el Emisor (va a GND), la central es la Base (recibe la señal con resistencia de 1 kΩ) y la derecha es el Colector (conectado al LED o al motor).'
    },
    {
        q: '¿Para qué sirve cada resistencia (560 Ω, 20 kΩ y 1 kΩ)?',
        a: 'Las 2 de 560 Ω protegen el LED infrarrojo interno del CNY70 a 9V; las 2 de 20 kΩ fijan el nivel en el fototransistor receptor; y las 6 de 1 kΩ (café-negro-rojo-dorado) polarizan las bases de Q1 y Q2 y alimentan el colector de Q1.'
    },
    {
        q: '¿Por qué hay que cruzar los motores respecto a los sensores?',
        a: 'Ambos sensores van sobre la línea negra. Cuando uno se sale al blanco, apaga el motor del lado contrario: así la rueda del mismo lado sigue empujando y devuelve el carrito justo encima de la línea negra.'
    },
    {
        q: '¿Qué hago si el robot se sale en las curvas?',
        a: 'Podés cambiar la resistencia de 1 kΩ que llega a la base del segundo transistor (Q2) por una resistencia variable (potenciómetro) de 50 kΩ para bajar la velocidad, o reajustar la altura y separación de los sensores CNY70.'
    },
    {
        q: '¿Qué fuerza deben tener los motorreductores?',
        a: 'Como recomienda el tutorial, usá motorreductores de mínimo 1 kg de fuerza (~100 RPM). Los motores simples sin caja reductora no tienen el torque necesario para mover la protoboard y la batería de 9V sobre el piso.'
    }
];

function initNaviaChat() {
    const launcher = document.getElementById('navia-launcher');
    const panel = document.getElementById('navia-chat');
    if (!launcher || !panel) return;

    const log = document.getElementById('navia-chat-log');
    const quick = document.getElementById('navia-chat-quick');
    const closeBtn = panel.querySelector('.navia-chat__close');
    const form = document.getElementById('navia-chat-form');
    const input = document.getElementById('navia-chat-input');
    let greeted = false;
    let lastFocused = null;

    const makeMessage = (role, text) => {
        const node = document.createElement('div');
        node.className = 'navia-msg navia-msg--' + role;
        node.textContent = text;
        return node;
    };

    const scrollToEnd = () => {
        if (log) log.scrollTop = log.scrollHeight;
    };

    const reply = (text) => {
        const typing = makeMessage('typing', 'Navia está respondiendo...');
        log.appendChild(typing);
        scrollToEnd();
        setTimeout(() => {
            typing.remove();
            log.appendChild(makeMessage('bot', text));
            scrollToEnd();
        }, 450);
    };

    const renderQuickReplies = () => {
        if (!quick) return;
        quick.innerHTML = '';
        NAVIA_FAQ.forEach(item => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'navia-chip';
            chip.textContent = item.q;
            chip.addEventListener('click', () => {
                log.appendChild(makeMessage('user', item.q));
                scrollToEnd();
                chip.disabled = true;
                reply(item.a);
            });
            quick.appendChild(chip);
        });
    };

    const openChat = (opener) => {
        lastFocused = opener || launcher;
        panel.hidden = false;
        launcher.hidden = true;
        launcher.setAttribute('aria-expanded', 'true');
        if (!greeted) {
            greeted = true;
            log.appendChild(makeMessage('bot', '¡Hola! Soy Navia, tu asistente técnica en robótica de grado 11. ¿Qué duda tenés sobre el robot con CNY70 y 2N2222A?'));
            renderQuickReplies();
            scrollToEnd();
        }
        if (input) input.focus();
    };

    const closeChat = () => {
        panel.hidden = true;
        launcher.hidden = false;
        launcher.setAttribute('aria-expanded', 'false');
        if (lastFocused) lastFocused.focus();
    };

    launcher.addEventListener('click', () => openChat(launcher));
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !panel.hidden) closeChat();
    });

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = input.value.trim();
            if (!query) return;

            log.appendChild(makeMessage('user', query));
            input.value = '';
            scrollToEnd();

            const queryLower = query.toLowerCase();
            let matchedAnswer = null;

            if (queryLower.includes('arduino') || queryLower.includes('microbit') || queryLower.includes('código') || queryLower.includes('programar')) {
                matchedAnswer = 'Este prototipo no usa microcontrolador ni programación: funciona 100% con electrónica analógica discreta en protoboard usando sensores CNY70 y 4 transistores 2N2222A.';
            } else if (queryLower.includes('motor') || queryLower.includes('llanta') || queryLower.includes('rueda') || queryLower.includes('cruz') || queryLower.includes('curva')) {
                matchedAnswer = 'Usa 2 motorreductores de mínimo 1 kg de fuerza (~100 RPM) conectados de forma cruzada al sensor opuesto. Si va muy rápido en curvas, reemplazá la resistencia de 1 kΩ en base de Q2 por un potenciómetro de 50 kΩ.';
            } else if (queryLower.includes('cny70') || queryLower.includes('sensor') || queryLower.includes('infrarrojo') || queryLower.includes('ir')) {
                matchedAnswer = 'Los 2 sensores CNY70 emiten luz IR (con resistencia de 560 Ω) y reciben el reflejo en un fototransistor (con resistencia de 20 kΩ). Al detectar la línea negra se enciende el LED rojo y gira el motor opuesto.';
            } else if (queryLower.includes('2n2222') || queryLower.includes('transistor') || queryLower.includes('pata') || queryLower.includes('pin')) {
                matchedAnswer = 'Mirando la cara plana del 2N2222A: izquierda = Emisor (GND), centro = Base (señal con 1 kΩ) y derecha = Colector (carga). Se usan 4 en total: Q1 invierte la señal del CNY70 y Q2 alimenta el motorreductor.';
            } else if (queryLower.includes('resistencia') || queryLower.includes('560') || queryLower.includes('20k') || queryLower.includes('1k') || queryLower.includes('color') || queryLower.includes('50k')) {
                matchedAnswer = 'Llevás 2 resistencias de 560 Ω (emisor IR), 2 de 20 kΩ (fototransistor) y 6 de 1 kΩ (café-negro-rojo-dorado, 3 por canal). Opcionalmente podés cambiar 1 kΩ de base Q2 por una variable de 50 kΩ.';
            } else if (queryLower.includes('led') || queryLower.includes('rojo')) {
                matchedAnswer = 'Los 2 LED rojos se conectan con su pata larga (+) al colector de Q1 y van en serie hacia la etapa de Q2. Sirven para comprobar visualmente que cada sensor detecta la línea negra.';
            } else if (queryLower.includes('bateria') || queryLower.includes('pila') || queryLower.includes('9v') || queryLower.includes('protoboard')) {
                matchedAnswer = 'Todo el circuito se monta directo sobre una protoboard y se alimenta con una única batería de 9V conectada a los buses positivo y negativo.';
            } else if (queryLower.includes('material') || queryLower.includes('lista')) {
                matchedAnswer = 'En la Sección 1 tenés los 11 materiales exactos: 2 CNY70, 4× 2N2222A, 2× 560 Ω, 2× 20 kΩ, 6× 1 kΩ, 2 LED rojos, 2 motorreductores (1 kg/100 RPM), 2 llantas, 1 batería 9V, cables y 1 protoboard.';
            } else {
                matchedAnswer = 'Podés explorar las 4 secciones (Materiales, Concepto, Funciones, Electrónica) o la guía con marcas de tiempo en Video Tutorial. También podés tocar cualquiera de las preguntas rápidas arriba.';
            }

            reply(matchedAnswer);
        });
    }
}

/* 7. Botón Volver Arriba (Back to Top) */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 320) {
            btn.hidden = false;
        } else {
            btn.hidden = true;
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
