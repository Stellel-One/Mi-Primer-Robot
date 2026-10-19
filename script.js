/* ========================================================
   Robot Seguidor de Línea sin Arduino - Script Interactivo
   Proyecto Educativo Grado 11 - Tecnología e Informática
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMaterialsFilter();
    initSimulator();
    initCircuitInspector();
    initVideoControls();
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
            
            sensorLeftVal.textContent = 'BLANCO (Luz Reflejada)';
            sensorLeftVal.className = 'telemetry-val val-active';
            sensorRightVal.textContent = 'BLANCO (Luz Reflejada)';
            sensorRightVal.className = 'telemetry-val val-active';

            compLeftVal.textContent = 'ALTO (+5V / Sat)';
            compLeftVal.className = 'telemetry-val val-active';
            compRightVal.textContent = 'ALTO (+5V / Sat)';
            compRightVal.className = 'telemetry-val val-active';

            motorLeftVal.textContent = 'GIRANDO (100% Marcha)';
            motorLeftVal.className = 'telemetry-val val-active';
            motorRightVal.textContent = 'GIRANDO (100% Marcha)';
            motorRightVal.className = 'telemetry-val val-active';

            actionText.innerHTML = '<strong>Trayectoria Recta:</strong> Ambos sensores sobre pista blanca. Los dos transistores conducen en saturación, impulsando ambos motores con tracción simétrica adelante.';
        } 
        else if (state === 'left') {
            btnLeft.classList.add('active');
            robotVisual.style.transform = 'translateX(-28px) rotate(-18deg)';

            sensorLeftVal.textContent = 'NEGRO (Absorción / Sin Reflejo)';
            sensorLeftVal.className = 'telemetry-val val-off';
            sensorRightVal.textContent = 'BLANCO (Luz Reflejada)';
            sensorRightVal.className = 'telemetry-val val-active';

            compLeftVal.textContent = 'BAJO (0V / Corte)';
            compLeftVal.className = 'telemetry-val val-off';
            compRightVal.textContent = 'ALTO (+5V / Sat)';
            compRightVal.className = 'telemetry-val val-active';

            motorLeftVal.textContent = 'DETENIDO (0% Paro)';
            motorLeftVal.className = 'telemetry-val val-off';
            motorRightVal.textContent = 'GIRANDO (100% Marcha)';
            motorRightVal.className = 'telemetry-val val-active';

            actionText.innerHTML = '<strong>Corrección hacia Izquierda:</strong> Sensor izquierdo detecta línea negra. Su comparador corta la base del transistor Q1; el motor izquierdo frena mientras el derecho sigue empujando, pivotando el robot hacia la línea.';
        } 
        else if (state === 'right') {
            btnRight.classList.add('active');
            robotVisual.style.transform = 'translateX(28px) rotate(18deg)';

            sensorLeftVal.textContent = 'BLANCO (Luz Reflejada)';
            sensorLeftVal.className = 'telemetry-val val-active';
            sensorRightVal.textContent = 'NEGRO (Absorción / Sin Reflejo)';
            sensorRightVal.className = 'telemetry-val val-off';

            compLeftVal.textContent = 'ALTO (+5V / Sat)';
            compLeftVal.className = 'telemetry-val val-active';
            compRightVal.textContent = 'BAJO (0V / Corte)';
            compRightVal.className = 'telemetry-val val-off';

            motorLeftVal.textContent = 'GIRANDO (100% Marcha)';
            motorLeftVal.className = 'telemetry-val val-active';
            motorRightVal.textContent = 'DETENIDO (0% Paro)';
            motorRightVal.className = 'telemetry-val val-off';

            actionText.innerHTML = '<strong>Corrección hacia Derecha:</strong> Sensor derecho detecta línea negra. Su comparador corta el transistor Q2; el motor derecho para mientras el izquierdo empuja, virando el chasis hacia el centro de la pista.';
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
function initVideoControls() {
    const jumpButtons = document.querySelectorAll('.btn-jump-time');
    const videoElement = document.getElementById('main-project-video');

    jumpButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const timeSeconds = parseFloat(btn.getAttribute('data-time'));

            if (videoElement && !isNaN(timeSeconds)) {
                videoElement.currentTime = timeSeconds;
                videoElement.play();
                videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                console.log(`Salto solicitado a: ${timeSeconds}s`);
            }
        });
    });
}

