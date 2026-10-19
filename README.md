# Robot Seguidor de Línea (Sin Arduino)

Proyecto educativo de robótica móvil y electrónica básica para **Grado 11 - Tecnología e Informática**.

## 📖 Descripción del Proyecto
Plataforma web educativa e interactiva diseñada para investigar, explicar y presentar el funcionamiento integral de un robot seguidor de línea de lazo cerrado con control analógico discreto (100% sin Arduino ni microcontroladores programables).

## 🗂️ Estructura del Sitio Web
El proyecto sigue rigurosamente el orden curricular obligatorio:
1. **Materiales (`materiales.html`):** Despiece técnico completo, notas de taller y tabla normalizada BOM (Bill of Materials).
2. **Concepto (`concepto.html`):** Principios de autonomía, reflectancia espectral infrarroja (\(\lambda = 950\text{ nm}\)) y comparativa técnica: Control Analógico Directo vs. Microcontrolador (Arduino).
3. **Funciones (`funciones.html`):** Cinemática diferencial, matriz lógica de viraje, simulador interactivo en tiempo real y aplicaciones en la industria real (AGVs).
4. **Parte Electrónica (`electronica.html`):** Análisis profundo de divisores de tensión, comparador dual LM393, transistores de conmutación 2N2222, diodos flyback 1N4007 y plano esquemático normalizado en SVG.
5. **Video y Evidencias (`video.html`):** Reproductor integrado con tutorial técnico verificado y 10 capturas analizadas con salto directo por marcas de tiempo a YouTube.

## 🚀 Despliegue en Render
El proyecto está configurado para desplegarse automáticamente como **Static Site** en [Render](https://render.com) mediante `render.yaml`:
* **Runtime:** Static
* **Publish Directory:** `./`
* **Build Command:** *(vacío)*

## 🛠️ Tecnologías Empleadas
* **HTML5:** Semántico y accesible.
* **CSS3:** Variables, Flexbox, CSS Grid, Glassmorphism y diseño responsivo.
* **JavaScript:** Interactividad, simulador de dirección diferencial y telemetría en tiempo real.
