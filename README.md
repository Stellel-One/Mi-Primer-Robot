# 🤖 Robot Seguidor de Línea Negra (CNY70 + 2N2222A en Protoboard)

> **Institución Educativa Acevedo y Gómez (INACEGO) — Puerto Rico, Caquetá**  
> *Lema Institucional:* *"Servimos a la Comunidad y Formamos para la Vida"*  
> **Área:** Tecnología e Informática · Grado 11° de Educación Media Técnica  
> **🌐 Sitio Web en Producción:** [https://mi-primer-robot.onrender.com](https://mi-primer-robot.onrender.com)  
> **📦 Repositorio GitHub:** [https://github.com/Stellel-One/Mi-Primer-Robot](https://github.com/Stellel-One/Mi-Primer-Robot)  
> **🎥 Tutorial Base de Referencia:** [El Profe García — Robot Seguidor de Línea Negra](https://youtu.be/W9Uy-wgD5Vc)

![Prototipo Robot Seguidor de Línea Negra sobre Protoboard](imagenes/robot-hero.jpg)

*(Nota: La versión previa basada en BBC Micro:bit + Puente H L298N + Rover Mini se conserva intacta en la rama `version-microbit-l298n`.)*

---

## 🏫 Presentación del Proyecto

Este proyecto documenta el diseño, montaje sobre protoboard, calibración y funcionamiento de un **Robot Seguidor de Línea Negra 100% Analógico**, sin microcontroladores ni programación.

El sistema emplea **dos sensores ópticos reflectivos CNY70**, **cuatro transistores bipolares NPN 2N2222A** (dos etapas en cascada por canal), una red discreta de resistencias (`560 Ω`, `20 kΩ`, `1 kΩ`), **dos LEDs rojos** indicadores, **dos motorreductores de mínimo 1 kg de fuerza (~100 RPM)** con sus llantas y una única **batería de 9V**.

---

## 🔬 Arquitectura Circuital Analógica

```mermaid
flowchart LR
    subgraph Canal ["Cada Canal Simétrico (×2)"]
        CNY["Sensor CNY70<br/>IR: 560 Ω | PT: 20 kΩ"] -->|"1 kΩ"| Q1["Transistor Q1 2N2222A<br/>Inversor (E a GND, C con 1 kΩ)"]
        Q1 -->|"LED Rojo + 1 kΩ / Pot 50 kΩ"| Q2["Transistor Q2 2N2222A<br/>Driver de Potencia"]
        Q2 -->|"Colector a -Motor | +9V"| MOT["Motorreductor Cruzado<br/>≥ 1 kg · 100 RPM"]
    end
    BAT["Batería 9V DC"] --> CNY & Q1 & MOT
```

### Regla Mecánica Clave (Control Cruzado)
1. Ambos sensores **CNY70** se montan al frente orientados hacia el suelo **sobre la línea negra**.
2. Al detectar línea negra, el haz IR no rebota → `Q1` entra en corte → enciende el **LED rojo** y satura `Q2` → gira el **motor del lado contrario**.
3. Si un sensor sale hacia la superficie blanca, `Q1` conduce a tierra → apaga el LED rojo y corta `Q2` → frena ese motor para que la rueda activa opuesta devuelva el robot al centro de la pista.

---

## 📋 Lista Oficial de Materiales (11 Componentes)

| # | Componente | Especificación Exacta | Cant. | Código / Función |
|:---:|:---|:---|:---:|:---|
| **01** | **Sensores Ópticos** | CNY70 (Emisor IR + Fototransistor) | 2 | Detectan la línea negra frente a la superficie blanca. |
| **02** | **Resistencias IR** | 560 Ω (1/4 W) | 2 | Limitan la corriente del LED emisor infrarrojo a `+9V`. |
| **03** | **Resistencias Sensor** | 20 kΩ (1/4 W) | 2 | Pull-down a tierra en el emisor del fototransistor CNY70. |
| **04** | **Resistencias de Etapa** | 1 kΩ (1/4 W) · *Café-Negro-Rojo* | 6 | 3 por canal: base `Q1`, colector `Q1` y base `Q2` *(o pot. `50 kΩ` en `Q2`)*. |
| **05** | **Transistores NPN** | 2N2222A (TO-92: Izq `E`, Centro `B`, Der `C`) | 4 | 2 por canal: `Q1` inversor lógico + `Q2` driver de potencia. |
| **06** | **Indicadores Visuales** | Diodos LED rojos (5 mm) | 2 | Encienden al detectar línea negra (ánodo al colector de `Q1`). |
| **07** | **Motorreductores** | DC mínimo 1 kg de fuerza (~100 RPM) | 2 | Tracción diferencial cruzada capaz de mover el peso total. |
| **08** | **Llantas** | Ruedas para motorreductor | 2 | Acoplamiento mecánico y adherencia sobre la pista. |
| **09** | **Fuente de Energía** | Batería rectangular de 9V (`6F22`) | 1 | Alimentación general única conectada a los buses de la protoboard. |
| **10** | **Placa / Chasis** | Protoboard (`400` u `830` puntos) | 1 | Soporte mecánico estructural y matriz de conexiones sin soldadura. |
| **11** | **Cableado** | Cables para conectar | Varios | Puentes en buses, bajada de sensores CNY70 y cruce de motores. |

---

## 💻 Plataforma Web Educativa

### Páginas e Interactividad
- `index.html` — Portal institucional **INACEGO**, ficha técnica del prototipo analógico y acceso a módulos curriculares.
- `materiales.html` — Catálogo de los 11 materiales con tarjetas encuadradas en relación `4:3` (`object-fit: contain`), filtros por categoría y tabla BOM técnica.
- `concepto.html` — Autonomía en lazo cerrado, física de reflectancia IR en el CNY70 y comparativa frente a sistemas con microcontroladores (Arduino / Micro:bit + Puente H).
- `funciones.html` — Ciclo analógico de 5 etapas, calibración (`1 kΩ` vs potenciómetro de `50 kΩ`), simulador interactivo de estados (recta, giro izquierdo/derecho) y aplicaciones industriales.
- `electronica.html` — Desglose técnico de `Q1`/`Q2` (`2N2222A`), esquema SVG normado completo de ambos canales en `+9V`/`GND`, guía paso a paso en protoboard e inspector interactivo.
- `video.html` — Reproductor secuencial del tutorial oficial (`W9Uy-wgD5Vc`) con salto directo a 6 hitos de montaje (`00:00`, `00:31`, `01:07`, `01:50`, `02:32`, `02:56`) y galería visual sin recortes.

### Estructura del Repositorio

```text
Minargi/
├── index.html          # Portada institucional y ficha general
├── materiales.html     # Inventario visual (11 componentes) y tabla BOM
├── concepto.html       # Fundamentos físicos y comparativa analógica
├── funciones.html      # Control cruzado y simulador de estados
├── electronica.html    # Esquema eléctrico SVG, pinout y montaje
├── video.html          # Video tutorial con capítulos sincronizados
├── styles.css          # Sistema visual y diseño responsive (desktop / tablet / móvil)
├── script.js           # Filtros, simulador, reproductor y asistente Navia
├── server.js           # Servidor HTTP estático local en puerto 10000
├── navia.svg           # Icono del asistente educativo Navia
├── package.json        # Metadatos del proyecto y script npm start
├── render.yaml         # Configuración de despliegue estático en Render
└── imagenes/           # Fotografías de estudio del prototipo, componentes y escudo
```

---

## 🚀 Ejecución Local y Despliegue

```bash
git clone https://github.com/Stellel-One/Mi-Primer-Robot.git
cd Mi-Primer-Robot
npm start   # Inicia server.js en http://localhost:10000
```

El proyecto está configurado con `render.yaml` para desplegarse automáticamente desde la rama `master` como sitio estático en Render: [https://mi-primer-robot.onrender.com](https://mi-primer-robot.onrender.com).
