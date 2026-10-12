# Contexto de TecnoSafe

Lee esta guía antes de modificar el proyecto. Resume su propósito, estructura y decisiones que conviene conservar.

## Proyecto

TecnoSafe es una plataforma educativa en español sobre ciudadanía digital y seguridad en internet, dirigida principalmente a estudiantes. El sitio enseña con guías, preguntas, escenarios y recomendaciones prácticas. No tiene backend, analítica ni formularios que recojan datos personales.

## Inicio rápido

- Abre `index.html` para la portada. Las páginas son HTML estático y pueden abrirse directamente o servirse con cualquier servidor estático.
- No existe `package.json`, sistema de build ni suite de tests automatizados.
- Cambios recientes se alojan en GitHub Pages desde `master`, raíz del repositorio.
- Repositorio: https://github.com/Stellel-One/TecnoSafe
- Sitio publicado: https://stellel-one.github.io/TecnoSafe/

## Mapa de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Portada y rutas a las actividades. |
| `aprende.html` | Temas de seguridad; sus tarjetas se generan desde `script.js`. |
| `quiz.html` | Centro de entrenamiento: rutas por tema, reto rápido y recorrido completo. |
| `reto.html` | Cinco escenarios interactivos de toma de decisiones. |
| `consejos.html` | Hábitos de seguridad generados desde `script.js`. |
| `acerca.html` | Propósito, público y tecnologías del proyecto. |
| `script.js` | Datos educativos, navegación, renderizado, quiz, reto, sonidos y animaciones. |
| `styles.css` | Sistema visual, componentes compartidos y breakpoints responsive. |
| `navia.svg` | Marca animada de Navia; se usa como logo de navegación y pie, y como favicon. |
| `context/README.md` | Este handoff para otros asistentes de IA. |

Las páginas comparten navegación y pie, pero su HTML está duplicado; actualiza las seis páginas si un cambio afecta esos elementos.

## Arquitectura

- Es HTML, CSS y JavaScript vanilla. Mantén las rutas y scripts relativos para que GitHub Pages funcione bajo `/TecnoSafe/`.
- `script.js` centraliza los datos en arreglos (`learnCards`, `quizQuestions`, `quizCategories`, `challengeScenarios` y `practicalTips`) y arranca desde `init()`.
- Las tarjetas de Aprende y Consejos se renderizan a partir de esos arreglos. No dupliques los datos en HTML.
- Las fuentes DM Sans y Space Grotesk se sirven desde Google Fonts.
- GSAP 3.12.5 se carga bajo demanda desde jsDelivr para animaciones de Navia. Si falla, la mascota debe seguir visible sin animación. Respeta `prefers-reduced-motion`.
- Los sonidos se sintetizan con Web Audio; están apagados por defecto y la preferencia se guarda en `localStorage` con la clave `tecnosafe-sounds-enabled`.
- El contenido de las actividades permanece en el navegador; no hay persistencia de puntajes entre sesiones.

## Quiz

El banco contiene 24 preguntas: cuatro en cada categoría. Los nombres de `category` deben coincidir exactamente con `quizCategories`.

| Modo | Selección | Preguntas |
| --- | --- | ---: |
| Ruta completa | Banco completo | 24 |
| Reto relámpago | Cinco preguntas barajadas sin reemplazo | 5 |
| Categoría | Todas las preguntas de una categoría | 4 |

Cada pregunta contiene un `id` único, `category`, `question`, cuatro `options`, `correct` como índice desde cero y una `explanation`. El acierto suma 10 XP; una respuesta incorrecta suma 5 XP y también ofrece una explicación formativa. Al volver a una pregunta respondida, las opciones quedan bloqueadas para evitar duplicar puntos. Los resultados deben usar el conjunto activo `quizState.questions`, nunca asumir un total fijo.

## Reto digital

El reto presenta cinco situaciones. Cada elección recibe feedback educativo; una decisión segura suma 10 XP y una de riesgo suma 5 XP, sin penalización. El resumen incluye las elecciones, el total de decisiones seguras, XP y mejor racha.

## Identidad y estilos

- La interfaz, las preguntas y los mensajes están en español.
- Los colores y tipografías viven como variables CSS en `:root`, al inicio de `styles.css`.
- La marca usa verde profundo, lima y un acento coral. Conserva el mismo `navia.svg` en navegación, pie y favicon.
- El diseño es mobile-first y contempla breakpoints cercanos a 1024, 768, 540 y 480 px. Comprueba tanto 390 px como escritorio.
- Usa HTML semántico, estados accesibles (`aria-current`, `aria-pressed`, `aria-live`) y foco visible. No dependas solo de color para dar feedback.
- Evita que paneles, la mascota fija o controles tapen las preguntas. La mascota debe ocupar sus espacios reservados y responder a los estados sin bloquear opciones.

## Validación

No hay un test runner configurado. Para cambios en JavaScript y Markdown:

```powershell
node --check script.js
git diff --check
```

Además, abre la página afectada en el navegador y prueba su flujo real. Para quiz o reto, cubre una respuesta segura, una de riesgo, el avance, los resultados y un viewport móvil. Para estilos compartidos, recorre las seis páginas y comprueba que no haya desbordamiento horizontal. Confirma el despliegue antes de afirmar que el cambio ya está público.

## Reglas para otra IA

1. Inspecciona el código actual antes de editar; esta guía puede quedar desactualizada.
2. Mantén el stack vanilla y no agregues una dependencia o un proceso de build sin una necesidad concreta.
3. Conserva los textos en español, los datos en su fuente central y la identidad de Navia.
4. Haz cambios pequeños, accesibles y responsive; ejecuta una comprobación específica después de cada cambio importante.
5. No publiques secretos, credenciales, `.atl/` ni rutas locales. No cambies la propiedad o visibilidad del repositorio salvo instrucción explícita.
