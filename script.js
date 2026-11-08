/* ========================================================
   Robot Seguidor de Línea sin Arduino - Script Interactivo
   Proyecto Educativo Grado 11 - Tecnología e Informática
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initMaterialsFilter();
    initSimulator();
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

    // Scrollspy activo
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // Cerrar menú móvil al hacer click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (navToggle) navToggle.innerHTML = '☰';
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

/* 3. Simulador de Navegación y Lógica de Giro */
function initSimulator() {
    const btnCenter = document.getElementById('sim-btn-center');
    const btnLeft = document.getElementById('sim-btn-left');
    const btnRight = document.getElementById('sim-btn-right');

    const robotVisual = document.getElementById('sim-robot');
    const sensorLeftVal = document.getElementById('val-sensor-left');
    const sensorRightVal = document.getElementById('val-sensor-right');
    const compLeftVal = document.getElementById('val-comp-left');
    const compRightVal = document.getElementById('val-comp-right');
    const motorLeftVal = document.getElementById('val-motor-left');
    const motorRightVal = document.getElementById('val-motor-right');
    const actionText = document.getElementById('val-action-desc');

    if (!btnCenter || !robotVisual) return;

    function setSimulationState(state) {
        // Reset botones
        [btnCenter, btnLeft, btnRight].forEach(b => b && b.classList.remove('active'));

        if (state === 'center') {
            btnCenter.classList.add('active');
            robotVisual.style.transform = 'translateY(0px) rotate(0deg)';
            
            sensorLeftVal.textContent = '0 (0V · BLANCO)';
            sensorLeftVal.className = 'telemetry-val val-active';
            sensorRightVal.textContent = '0 (0V · BLANCO)';
            sensorRightVal.className = 'telemetry-val val-active';

            compLeftVal.textContent = 'PWM 700 (Nominal)';
            compLeftVal.className = 'telemetry-val val-active';
            compRightVal.textContent = 'PWM 700 (Nominal)';
            compRightVal.className = 'telemetry-val val-active';

            motorLeftVal.textContent = 'AVANCE (Velocidad Nominal)';
            motorLeftVal.className = 'telemetry-val val-active';
            motorRightVal.textContent = 'AVANCE (Velocidad Nominal)';
            motorRightVal.className = 'telemetry-val val-active';

            actionText.innerHTML = '<strong>Trayectoria Recta:</strong> Ambos sensores HW-511 detectan superficie blanca (0V). La Micro:bit genera pulsos PWM balanceados en Pines 0 y 1 hacia el L298N, manteniendo avance rectilíneo estable.';
        } 
        else if (state === 'left') {
            btnLeft.classList.add('active');
            robotVisual.style.transform = 'translateX(-28px) rotate(-18deg)';

            sensorLeftVal.textContent = '1 (5V · NEGRO)';
            sensorLeftVal.className = 'telemetry-val val-off';
            sensorRightVal.textContent = '0 (0V · BLANCO)';
            sensorRightVal.className = 'telemetry-val val-active';

            compLeftVal.textContent = 'PWM 0 (Frenado)';
            compLeftVal.className = 'telemetry-val val-off';
            compRightVal.textContent = 'PWM 900 (Aceleración)';
            compRightVal.className = 'telemetry-val val-active';

            motorLeftVal.textContent = 'DETENIDO (0% Paro)';
            motorLeftVal.className = 'telemetry-val val-off';
            motorRightVal.textContent = 'IMPULSO (Viraje Rápido)';
            motorRightVal.className = 'telemetry-val val-active';

            actionText.innerHTML = '<strong>Corrección hacia la Izquierda:</strong> El sensor izquierdo pisó la cinta negra (5V). La Micro:bit apaga el motor izquierdo (PWM 0) y acelera el motor derecho (PWM 900) a través del L298N para recentrar la línea.';
        } 
        else if (state === 'right') {
            btnRight.classList.add('active');
            robotVisual.style.transform = 'translateX(28px) rotate(18deg)';

            sensorLeftVal.textContent = '0 (0V · BLANCO)';
            sensorLeftVal.className = 'telemetry-val val-active';
            sensorRightVal.textContent = '1 (5V · NEGRO)';
            sensorRightVal.className = 'telemetry-val val-off';

            compLeftVal.textContent = 'PWM 900 (Aceleración)';
            compLeftVal.className = 'telemetry-val val-active';
            compRightVal.textContent = 'PWM 0 (Frenado)';
            compRightVal.className = 'telemetry-val val-off';

            motorLeftVal.textContent = 'IMPULSO (Viraje Rápido)';
            motorLeftVal.className = 'telemetry-val val-active';
            motorRightVal.textContent = 'DETENIDO (0% Paro)';
            motorRightVal.className = 'telemetry-val val-off';

            actionText.innerHTML = '<strong>Corrección hacia la Derecha:</strong> El sensor derecho detecta la línea negra (5V). La Micro:bit corta el motor derecho y da par al motor izquierdo, pivotando el chasis Rover hacia la derecha.';
        }
    }

    btnCenter.addEventListener('click', () => setSimulationState('center'));
    btnLeft.addEventListener('click', () => setSimulationState('left'));
    btnRight.addEventListener('click', () => setSimulationState('right'));
}

/* 4. Inspector Interactivo de Bloques Electrónicos */
function initCircuitInspector() {
    const blocks = document.querySelectorAll('.block-node');
    const infoBox = document.getElementById('block-inspector-info');

    const descriptions = {
        'sensors': '<strong>Etapa 1 - Sensores Infrarrojos:</strong> Los LEDs emisores irradian luz en 950nm. Cuando hay superficie blanca, la luz rebota hacia el fototransistor receptor, disminuyendo su resistencia y variando la tensión analógica de salida.',
        'control': '<strong>Etapa 2 - Comparador de Voltaje (LM393):</strong> Compara el voltaje analógico del sensor contra un umbral ajustable fijado por un potenciómetro. Convierte cambios suaves de luz en una señal lógica digital limpia y binaria.',
        'power': '<strong>Etapa 3 - Transistores de Conmutación (2N2222/TIP120):</strong> El comparador no entrega suficiente corriente para un motor. El transistor actúa como un interruptor de potencia conmutando entre corte (paro) y saturación (marcha).',
        'motors': '<strong>Etapa 4 - Motorreductores DC:</strong> Convierten la corriente eléctrica en par mecánico con caja reductora (1:48) para garantizar torque constante a baja velocidad.',
        'movement': '<strong>Etapa 5 - Dirección Diferencial:</strong> La combinación de velocidades relativas entre la rueda izquierda y derecha produce avance rectilíneo o pivote sobre el eje del robot.'
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

/* 5. Control de Video y Salto a Marcas de Tiempo */
/* 5. Reproductor de Video Secuencial (Serie 6 Partes Alex7 Tutoriales) */
function initVideoControls() {
    const videoData = [
        {
            part: 1,
            id: '34xOcgIWpsU',
            title: 'PARTE 1 — Introducción General y Componentes del Robot',
            desc: 'Presentación del kit de robótica educativa British Council, la tarjeta BBC Micro:bit y el inventario de materiales para construir el robot móvil autónomo.',
            topic: 'Kit British Council',
            progress: 'Paso 1/6: Fundamentos e Inventario'
        },
        {
            part: 2,
            id: 'hj2Lx7jDiCc',
            title: 'PARTE 2 — Sensores Infrarrojos HW-511 y Calibración',
            desc: 'Caracterización de los estados lógicos del sensor (0V blanco con LED encendido / 5V negro con LED apagado) y ajuste del potenciómetro para 2-20mm de altura.',
            topic: 'Detección Óptica y Umbrales',
            progress: 'Paso 2/6: Caracterización de Sensores'
        },
        {
            part: 3,
            id: '9-Pfo9fqfNA',
            title: 'PARTE 3 — Controlador de Potencia Puente H L298N',
            desc: 'Conexión de la etapa de potencia a 9V, compatibilidad con niveles lógicos de 3.3V de la Micro:bit y masa compartida (GND común obligatorio).',
            topic: 'Etapa de Potencia y Motores',
            progress: 'Paso 3/6: Drivers de Potencia'
        },
        {
            part: 4,
            id: 'atuZydTlraM',
            title: 'PARTE 4 — Ensamble Mecánico del Chasis Rover Mini',
            desc: 'Montaje del chasis de acrílico, fijación de motores TT con pletinas metálicas, instalación de ruedas motrices de goma y rueda loca con extensores.',
            topic: 'Estructura y Cinemática',
            progress: 'Paso 4/6: Montaje Mecánico'
        },
        {
            part: 5,
            id: 'Foi85VfqKJk',
            title: 'PARTE 5 — Conexión de Elementos y Distribución Eléctrica',
            desc: 'Instalación del shield sobre el chasis, aislamiento de baterías de 9V con foami, interruptores de corte independientes y cableado pin a pin.',
            topic: 'Cableado y Fuentes Tri-Partitas',
            progress: 'Paso 5/6: Interconexión Eléctrica'
        },
        {
            part: 6,
            id: '-jA-Nnl1UqI',
            title: 'PARTE 6 — Programación, Calibración y Funcionamiento en Pista',
            desc: 'Carga del algoritmo seguidor en MakeCode/Python, validación en pista con línea negra de 3.5 cm y calibración final de velocidad PWM y virajes.',
            topic: 'Pruebas en Pista y Autonomía',
            progress: 'Paso 6/6: Lógica y Pruebas en Pista'
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

    let currentPartIndex = 0; // 0-based (0 = Parte 1)

    function setVideoPart(index, shouldScroll = false) {
        if (index < 0 || index >= videoData.length) return;
        currentPartIndex = index;
        const current = videoData[index];

        if (iframe) {
            iframe.src = `https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0`;
        }
        if (titleEl) titleEl.textContent = current.title;
        if (descEl) descEl.textContent = current.desc;
        if (partBadgeEl) partBadgeEl.textContent = `PARTE ${current.part} DE 6`;
        if (progressEl) progressEl.textContent = current.progress;
        if (topicTagEl) topicTagEl.textContent = current.topic;
        if (ytLinkEl) {
            ytLinkEl.href = `https://youtu.be/${current.id}`;
            ytLinkEl.textContent = `Ver en YouTube ↗`;
        }

        // Actualizar botones de navegación
        if (btnPrev) btnPrev.disabled = (index === 0);
        if (btnNext) btnNext.disabled = (index === videoData.length - 1);

        // Actualizar pestañas activas
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

/* 6. Animación de Elementos al Scroll (Scroll Reveal Estilo TecnoSafe) */
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
        // Fallback para navegadores antiguos
        reveals.forEach(el => el.classList.add('active'));
    }
}

/* 7. Navia - Asistente & Mascota Interactiva de Robótica */
const NAVIA_FAQ = [
    {
        q: '¿Por qué no usamos Arduino ni código?',
        a: '¡Excelente pregunta! Este proyecto demuestra que la robótica básica se resuelve con física y hardware puro (comparadores analógicos LM393 y transistores 2N2222). Esto reduce costos, elimina la latencia de procesamiento del software y enseña a calcular divisores de tensión y polarización sin depender de una "caja negra".'
    },
    {
        q: '¿Cómo calibro el potenciómetro del LM393?',
        a: 'Colocá el robot sobre la pista: poné un sensor sobre la superficie blanca y ajustá el potenciómetro (trimpot) hasta que el LED indicador del módulo se encienda. Luego movelo sobre la línea negra y verificá que se apague. La tensión de referencia óptima suele quedar en torno a 2.5V.'
    },
    {
        q: '¿Para qué sirve el diodo 1N4007 (Flyback)?',
        a: 'Todo motor eléctrico tiene bobinas que almacenan energía magnética. Al cortar la corriente bruscamente, la bobina produce un pico de sobretensión inversa destructiva de más de 50V. El diodo 1N4007 en antiparalelo drena esa energía recirculándola en la bobina sin dañar el transistor.'
    },
    {
        q: '¿Qué pasa si invierto la polaridad de los motores?',
        a: 'Un motor DC gira en sentido contrario si invertís sus cables. Si tu robot retrocede en lugar de avanzar, o gira en dirección contraria al desvío, simplemente intercambiá los dos cables positivo y negativo de ese motor.'
    },
    {
        q: '¿A qué altura colocar los sensores TCRT5000?',
        a: 'La distancia óptima entre los sensores infrarrojos y el suelo es de entre 3 mm y 8 mm. Si están muy altos, la luz infrarroja se dispersa y no detecta el contraste; si están muy bajos, pueden raspar contra irregularidades de la pista.'
    },
    {
        q: '¿Por qué una rueda se detiene en las curvas?',
        a: 'El robot utiliza dirección diferencial: no tiene cremallera ni volante mecánico. Al desviarse hacia un lado, el circuito corta la alimentación del motor de ese lado, provocando que el chasis pivote sobre la rueda detenida y retorne al centro de la línea.'
    },
    {
        q: '¿Qué baterías son las recomendadas?',
        a: 'Recomendamos 4 pilas AA de 1.5V en serie (6.0V en total) o 2 celdas de litio 18650 (7.4V). Es fundamental incluir un capacitor electrolítico de desacoplo de 100µF a 470µF en paralelo con la batería para amortiguar las caídas de tensión al arrancar los motores.'
    },
    {
        q: '¿Cómo funciona el transistor 2N2222?',
        a: 'Funciona como un interruptor electrónico. La salida del comparador entrega apenas unos miliamperios a la base del transistor; al recibir esa pequeña señal, el transistor entra en saturación y permite el paso de los 200 a 800 mA que necesita el motor para girar con fuerza.'
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
            log.appendChild(makeMessage('bot', '¡Hola! Soy Navia, tu asistente técnica en robótica de grado 11. ¿En qué duda sobre el robot seguidor de línea te puedo ayudar?'));
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

            if (queryLower.includes('arduino') || queryLower.includes('código') || queryLower.includes('programar')) {
                matchedAnswer = 'Este robot es 100% analógico: no lleva Arduino ni microcontrolador. Todo el lazo de control se realiza con el comparador LM393 y transistores NPN. Podés ver el análisis en la Sección 2 (Concepto).';
            } else if (queryLower.includes('motor') || queryLower.includes('rueda') || queryLower.includes('giro')) {
                matchedAnswer = 'Utiliza dos motorreductores TT con reducción 1:48 acoplados a ruedas de goma. La dirección es diferencial: cuando un sensor entra a la línea, detiene el motor de ese lado para pivotar.';
            } else if (queryLower.includes('sensor') || queryLower.includes('ir') || queryLower.includes('tcrt') || queryLower.includes('infrarrojo')) {
                matchedAnswer = 'Los sensores infrarrojos (TCRT5000 o CNY70) emiten luz en 950 nm. La superficie blanca la refleja hacia el fototransistor y la línea negra la absorbe. La altura ideal es entre 3 y 8 mm.';
            } else if (queryLower.includes('lm393') || queryLower.includes('comparador') || queryLower.includes('voltaje')) {
                matchedAnswer = 'El circuito integrado LM393 compara el voltaje analógico del sensor contra un umbral de referencia (fijado por potenciómetro) y entrega una salida digital limpia a los transistores.';
            } else if (queryLower.includes('transistor') || queryLower.includes('2n2222') || queryLower.includes('potencia')) {
                matchedAnswer = 'Los transistores NPN 2N2222A actúan como interruptores electrónicos de potencia (saturación y corte) suministrando la corriente que el comparador no puede entregar a los motores.';
            } else if (queryLower.includes('diodo') || queryLower.includes('flyback') || queryLower.includes('1n4007')) {
                matchedAnswer = 'El diodo 1N4007 en antiparalelo con cada motor absorbe la fuerza contraelectromotriz inductiva cuando el transistor se apaga, protegiéndolo de picos destructivos de alta tensión.';
            } else if (queryLower.includes('bateria') || queryLower.includes('pila') || queryLower.includes('alimentacion')) {
                matchedAnswer = 'Se alimenta típicamente con 4 pilas AA (6.0V) o 2 baterías de litio 18650 (7.4V). Recordá poner un capacitor de desacoplo de 100µF a 470µF en paralelo con la batería.';
            } else if (queryLower.includes('material') || queryLower.includes('componente') || queryLower.includes('lista')) {
                matchedAnswer = 'En la Sección 1 tenés la lista formal completa (BOM) con chasis, motores, ruedas, sensores IR, resistencias, transistores, LM393, diodos, potenciómetros y portapilas.';
            } else {
                matchedAnswer = 'Como asistente de robótica te sugiero explorar las secciones curriculares: 1. Materiales, 2. Concepto, 3. Funciones o 4. Electrónica. También podés tocar una de las preguntas frecuentes aquí arriba.';
            }

            reply(matchedAnswer);
        });
    }
}

/* 8. Botón Volver Arriba (Back to Top) */
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



