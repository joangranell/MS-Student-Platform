# Informe de Auditoría y Transformación: MS Student Platform

Fecha: Noviembre 2026  
Versión de la plataforma: 2.1.0  
Tipo de proyecto: SPA Estática (Vanilla JS + CSS3 + Service Worker PWA)  
Despliegue: GitHub Pages & Servidor Local Node.js (`server.js`)

---

## 1. Resumen Ejecutivo

Se ha completado con éxito la refactorización integral de la plataforma **MS Student Platform** conforme a la especificación de tres bloques de trabajo (*Credibilidad*, *Pedagogía* y *Calidad Técnica*), manteniendo una arquitectura limpia sin dependencias externas en tiempo de ejecución (Zero Dependencies en runtime) y un banco de 300 preguntas técnicas distribuidas en cuatro certificaciones clave: **AZ-900** (100 preguntas), **DP-900** (80 preguntas), **DP-600** (60 preguntas) y **DP-700** (60 preguntas).

Todos los datos previos guardados en perfiles de usuario (`localStorage`) se migran automáticamente y de forma segura al nuevo esquema v2 sin pérdida de historial ni estadísticas.

---

## 2. Bloque 1 · Credibilidad y Cumplimiento de Marca

### 2.1 Eliminación de Terminología Oficial y Simulación No Avalada
* Se eliminó el uso indebido de adjetivos como *"Oficial"*, *"Pearson VUE Simulator"*, *"Informe Oficial de Resultados Microsoft"*, *"nota escalada oficial"* y *"preguntas verificadas"* en toda la plataforma:
  - `index.html`: modales, encabezados, títulos y textos de bienvenida.
  - `js/ui.js`: plantillas de renderizado de examen, resultados e informes.
  - `README.md` y `documento-funcional.html`: descripciones del producto y documentación técnica.
  - `manifest.json`: descripción del aplicativo PWA.
* Se sustituyó por términos pedagógicos y descriptivos adecuados: *"Modo Examen"*, *"Simulacro de Certificación"*, *"Informe de Resultados"* y *"estilo inspirado en la experiencia de exámenes de certificación"*.

### 2.2 Avisos Visibles de No Afiliación (Disclaimer Legal)
* Se incorporaron avisos claros y visibles indicando que **MS Student Platform es un proyecto formativo independiente y no está avalado, patrocinado ni afiliado a Microsoft Corporation ni a Pearson VUE**:
  - En la pantalla de selección de perfil / inicio de sesión.
  - En la pantalla final de resultados del examen.
  - En el pie de página persistente de la aplicación.

### 2.3 Puntuación Estimada y Transparencia Metodológica
* La escala 100–1000 se denomina ahora explícitamente **"Estimación orientativa (100–1000 pts)"**.
* Se muestra siempre el porcentaje de acierto global y el desglose de rendimiento por dominio técnico.
* Se incluye una nota metodológica visible aclarando que la puntuación real emitida por Microsoft utiliza un modelo de calibración psicométrica escalada no lineal (*Item Response Theory*) y que 700 puntos representa el umbral orientativo del 70%.

### 2.4 Bloque de Metadatos por Certificación
* Se añadió a cada archivo modular en `data/` (`az900.json`, `dp900.json`, `dp600.json`, `dp700.json`) un encabezado formal de metadatos:
  - `skillsOutlineVersion`: fecha de la guía oficial de habilidades evaluadas.
  - `lastReviewed`: fecha de última revisión técnica del banco.
  - `idioma`: código ISO (`es`).
* Estos metadatos se muestran al estudiante en el selector de certificación y en la cabecera de resultados.

### 2.5 Botón "Reportar Error" sin Backend
* Tanto en cada pregunta activa (en modo estudio y modo examen) como en el acordeón de revisión de resultados y en las fichas teóricas (*"Saber Más"*), se incluyó un botón de reporte directo.
* Al hacer clic, genera y abre un enlace a GitHub Issues prellenado con la etiqueta, ID de la pregunta, certificación y versión del aplicativo para facilitar la retroalimentación de la comunidad sin necesidad de base de datos externa.

### 2.6 Detección Inteligente del Servidor Local para "Saber Más" en Vivo
* El panel lateral *"Saber Más"* detecta si el usuario está navegando desde un servidor local con proxy activo (`localhost` o `127.0.0.1`) o en GitHub Pages (`github.io`).
* En GitHub Pages, se oculta el botón de búsqueda en tiempo real que depende del proxy backend y se ofrece una alternativa transparente: enlaces directos de búsqueda documental en Microsoft Learn por palabra clave, evitando errores de red o promesas no funcionales.

### 2.7 Pie de Página y Enlaces Comunitarios
* Se integraron enlaces visibles al repositorio en GitHub y a la licencia de código abierto (MIT License) en el pie de página.
* Las cifras de preguntas en el `README.md` se actualizaron para reflejar el recuento real del catálogo (300 preguntas).

---

## 3. Bloque 2 · Pedagogía y Calidad del Aprendizaje

### 3.1 Aislamiento Estricto por Certificación Objetivo
* Se eliminó el selector `"GLOBAL MIX"` (`data-cert="ALL"`).
* Toda la experiencia de estudio (simulacros, clínica de fallos, repaso adaptativo y hoja de trucos) se aísla de forma estricta según la certificación seleccionada por el estudiante (**AZ-900**, **DP-900**, **DP-600** o **DP-700**), garantizando que nunca se mezclen preguntas ni conceptos entre exámenes diferentes.

### 3.2 Repetición Espaciada Real (Algoritmo Leitner v2)
* Se diseñó e implementó un modelo Leitner de 5 cajas con intervalos parametrizables:
  - **Caja 0**: Misma sesión / Repaso inmediato (0 días).
  - **Caja 1**: 1 día de intervalo.
  - **Caja 2**: 3 días de intervalo.
  - **Caja 3**: 7 días de intervalo.
  - **Caja 4 (Dominada)**: 21 días de intervalo.
* Los perfiles almacenan para cada pregunta: `box` (0 a 4), `lastSeen` (ISO timestamp), `nextReview` (ISO timestamp), `streak` (racha de aciertos consecutivos), `attempts`, `hits` y `fails`.
* Un fallo en cualquier momento reinicia la pregunta a la **Caja 0** y la programa para repaso inmediato.
* Los perfiles antiguos guardados en el navegador se migran automáticamente al nuevo esquema calculando su `nextReview` y garantizando que no se pierda el progreso previo.

### 3.3 Dashboard Orientado a la Acción Diaria
* Se diseñó una tarjeta destacada de acción prioritaria: **"Repaso de hoy (N pendientes)"**, que permite con un solo clic comenzar la sesión con las preguntas que han alcanzado su fecha de revisión espaciada.
* Se agregó la tarjeta de **Racha de días de estudio consecutivos** y el contador de **Preguntas dominadas esta semana**.
* Botón de continuación rápida para avanzar en la fase correspondiente del Plan de Estudio (Fase 1: Cimientos, Fase 2: Consolidación, Fase 3: Nivel Experto, Fase 4: Simulacro).

### 3.4 Simplificación del Selector de Sesiones
* Se reorganizó la interfaz del configurador de estudio en 3 rutas principales:
  1. **Repaso Inteligente Adaptativo** (prioriza preguntas vencidas y temas débiles).
  2. **Simulacro Modo Examen** (temporizado, sin feedback inmediato).
  3. **Hoja de Trucos Express 24h** (repaso rápido de conceptos y trampas típicas).
* Los modos especializados (entrenamiento por dominios, preguntas de código, clínica de preguntas falladas) se agruparon en un desplegable ordenado de opciones avanzadas sin perder ninguna funcionalidad.

### 3.5 Calificación de Confianza Post-Respuesta
* En el modo estudio, tras comprobar una respuesta, se ofrece al estudiante una botonera opcional de autoevaluación de certeza:
  - **Seguro** (afianza el concepto y promueve la pregunta a la siguiente caja).
  - **Dudoso** (mantiene el intervalo).
  - **Adivinado** (la pregunta se mantiene en su caja actual sin avanzar, evitando falsos positivos de dominio).

### 3.6 Métricas Analíticas y Detección de Respuestas Precipitadas
* El informe de resultados incluye:
  - Porcentaje de acierto por dominio técnico.
  - Tiempo medio dedicado por pregunta en cada dominio.
  - Botón de **Entrenamiento focalizado en el dominio más débil**.
  - Detección de **Respuestas precipitadas** (*Rush Answers*): identifica y lista aquellas preguntas respondidas en menos de 15 segundos y que resultaron falladas, alertando al estudiante sobre posibles descuidos o lectura apresurada.

### 3.7 Renombrado a "Preguntas de Código"
* Se sustituyó la denominación "Laboratorio de Código" por **"Preguntas de código"** en toda la interfaz, reconociendo con precisión que se trata de ejercicios de opción múltiple con fragmentos de sintaxis SQL/Python/DAX/KQL y no de entornos sandbox interactivos.

---

## 4. Bloque 3 · Calidad Técnica, Seguridad, PWA y CI/CD

### 4.1 Ciclo de Carga y Manejo de Errores de Red
* Se erradicó el parpadeo de "0 preguntas" mientras se cargan los archivos JSON.
* Se implementó un estado de carga visual y un banner de error con botón de **Reintentar carga** en caso de fallo de red o ejecución bajo protocolos sin soporte `fetch` directo (`file://`).

### 4.2 Compilación y Verificación Automatizada del Catálogo
* Se creó el script `scripts/build-catalog.js` con las siguientes funciones:
  - Lee los 4 archivos modulares (`az900.json`, `dp900.json`, `dp600.json`, `dp700.json`).
  - Valida que todos los IDs sean únicos y sigan la convención.
  - Valida que las opciones correctas existan dentro del array `options`.
  - Valida que campos obligatorios (`stem`, `options`, `explanation`, `domain`) estén presentes.
  - Genera `data/questions.json` sincronizado.
  - Dispone del flag `--check` para verificar en CI que `questions.json` coincide exactamente con los archivos individuales.

### 4.3 Auditoría de Enlaces a Microsoft Learn
* Se desarrolló `scripts/validate-links.js`:
  - Extrae y valida todas las URLs de referencia y módulos de Microsoft Learn presentes en las preguntas y fichas teóricas.
  - Utiliza solicitudes `HEAD`/`GET` concurrentes con timeout configurable y agente de usuario respetuoso.
  - Admite el parámetro `--sample <N>` para pruebas rápidas y genera un reporte detallado de enlaces con código de respuesta HTTP.
  - Configurado en CI de modo informativo (código de salida 0 por defecto) para auditar semanalmente la vigencia de la documentación externa sin bloquear el despliegue.

### 4.4 PWA de Alto Rendimiento y Funcionamiento Offline
* `manifest.json`:
  - `id`: `ms-student-platform-pwa`.
  - Rutas relativas (`start_url: ./index.html`, `scope: ./`) para garantizar funcionamiento idéntico en subcarpetas de GitHub Pages (`/MS-Student-Platform/`) y en la raíz local.
  - Configuración de iconos 192x192 y 512x512 con propósitos `any` y `maskable`.
  - Atajos rápidos de inicio (*shortcuts*) para "Hoja de Trucos Express" y "Simulacro Modo Examen".
* `sw.js`:
  - Nombre de caché versionado (`ms-platform-v4`).
  - Pre-caché completa de la shell de la aplicación (HTML, CSS, JS, iconos) y de los archivos de preguntas JSON.
  - Limpieza automática de cachés obsoletas al activarse un nuevo Service Worker.
  - Escucha de eventos `SKIP_WAITING` y banner en la interfaz: *"Nueva versión disponible. [Actualizar]"*.
  - Soporte offline garantizado para estudiar y realizar exámenes sin acceso a internet.

### 4.5 Respaldo y Portabilidad de Progreso
* Envoltura de todas las lecturas y escrituras de `localStorage` en bloques `try/catch` con alerta amigable ante restricciones de cuota o navegación privada estricta.
* Herramientas de **Exportar progreso** e **Importar progreso** mediante archivos `.json` versionados, con confirmación modal antes de sobrescribir el almacenamiento local.

### 4.6 Seguridad y Endurecimiento del Servidor Proxy (`server.js`)
* Se limitó el enlace de escucha exclusivamente a `127.0.0.1` (evitando exposición en redes locales o públicas).
* El proxy MCP valida y restringe el host de destino únicamente a `https://learn.microsoft.com/`.
* Se implementó un limitador de frecuencia de peticiones (*rate limiter*) de máximo 60 peticiones/minuto por IP.
* Se limitó la longitud de las consultas a 256 caracteres y el tamaño del cuerpo a 1 MB para prevenir ataques de denegación de servicio.
* Se añadió prevención estricta de cruce de directorios (*path traversal protection*) en el servidor de archivos estáticos.
* Todo contenido inyectado dinámicamente en el DOM pasa por sanitización y escape de entidades HTML o asignación directa mediante `textContent`.

### 4.7 Accesibilidad (WCAG 2.1 AA) y Experiencia Móvil
* Los botones con iconos disponen de atributos `aria-label` descriptivos.
* Trampas de foco y gestión de navegación por teclado en modales y cajón de contenido teórico.
* Navegación completa por teclado en el modo examen:
  - `Alt + N` / `Flecha derecha`: Siguiente pregunta.
  - `Alt + P` / `Flecha izquierda`: Pregunta anterior.
  - `Alt + M`: Marcar / desmarcar para revisión.
  - Teclas `1` a `5` o `A` a `E`: Selección de opciones.
  - `Escape`: Cerrar modales o cajón lateral.
* Descarte de opciones en dispositivos móviles: botón visible de tachado (`❌`) y pulsación prolongada de 500 ms con respuesta háptica opcional en pantalla táctil (además del clic derecho en escritorio).
* Respeto a las preferencias del usuario para reducción de movimiento (`@media (prefers-reduced-motion: reduce)`).
* Contraste de colores revisado y compatible con nivel AA tanto en tema claro como en tema oscuro.

### 4.8 Metadatos Web y SEO
* Etiqueta `<html lang="es">`.
* Metadescripción detallada.
* Tarjetas completas Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) y Twitter Card para previsualización enriquecida en redes sociales y mensajería.

### 4.9 Pruebas Unitarias Nativas (`node:test`)
* Suite de pruebas unitarias automatizada en `tests/examEngine.test.js` utilizando exclusivamente la librería nativa `node:test` y `node:assert/strict` de Node.js:
  1. Cálculo de puntuación escalada (100–1000) y umbral de aprobado (700 pts).
  2. Algoritmo de barajado Fisher-Yates (conservación de elementos y longitudes).
  3. Aislamiento estricto de preguntas por certificación.
  4. Formateo y etiquetado de opciones (`A`, `B`, `C`...).
  5. Priorización adaptativa (cajas Leitner y preguntas vencidas).
  6. Intervalos de tiempo de repetición espaciada `calculateNextReview`.
  7. Migración de esquemas v1 a v2 sin pérdida de datos.
  8. Detección de respuestas precipitadas en la evaluación de la sesión.
* **Resultado: 8 de 8 pruebas pasadas (100% éxito)**.

### 4.10 Integración Continua (GitHub Actions)
* Se configuró el flujo de trabajo `.github/workflows/ci.yml`:
  - Se ejecuta en cada `push` o `pull_request` a la rama `main` y de forma programada cada domingo.
  - Ejecuta la suite de pruebas unitarias `node --test`.
  - Verifica la sincronización del catálogo con `node scripts/build-catalog.js --check`.
  - Audita el estado de los enlaces a la documentación con `node scripts/validate-links.js`.

### 4.11 Actualización de la Skill de Autoría (`ms-exam-generator`)
* Se actualizó `.agents/skills/ms-exam-generator/SKILL.md`:
  - Se eliminaron menciones de "oficial" o simulación idéntica.
  - Se incluyó la prohibición explícita de recurrir a *braindumps* o preguntas filtradas reales.
  - Se documentó el estándar obligatorio de metadatos (`skillsOutlineVersion`, `lastReviewed`, `idioma`).

---

## 5. Aspectos No Modificados y Justificación

1. **Enunciados, Opciones y Explicaciones de las Preguntas:**
   - **Motivo:** Conforme a la regla de trabajo estricta del proyecto (*"El CONTENIDO de las preguntas queda fuera de alcance: no edites enunciados, opciones ni explicaciones"*), no se alteraron los textos de las preguntas existentes. Sí se incorporaron metadatos estructurales de certificación, fechas de revisión e idioma.
2. **Reemplazo Manual de Enlaces Externos 404:**
   - **Motivo:** La auditoría automática de enlaces detectó que Microsoft Learn ha reestructurado las URLs de varios módulos formativos introductorios de AZ-900. Dado que corregir dichos enlaces requeriría modificar el contenido interno de las preguntas (fuera de alcance en esta fase), se listan detalladamente en este informe y el script de validación en CI se configuró con tolerancia no bloqueante.

---

## 6. Registro de Anomalías y Enlaces Externos Detectados

Durante la ejecución del auditor `scripts/validate-links.js`, se detectó que las siguientes URLs de módulos de formación de Microsoft Learn para **AZ-900** devuelven código `404 Not Found` debido a migraciones de contenido recientes en la plataforma oficial de Microsoft:

| Código HTTP | URL Detectada en el Banco | Preguntas Afectadas |
|---|---|---|
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-concepts/3-describe-shared-responsibility-model` | AZ900-001, AZ900-052, AZ900-053 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-concepts/5-describe-consumption-based-model` | AZ900-002, AZ900-009, AZ900-051 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/2-describe-availability-scalability-cloud` | AZ900-004, AZ900-005, AZ900-014 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-concepts/4-define-cloud-models` | AZ900-003, AZ900-013, AZ900-060 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/5-describe-manageability-cloud` | AZ900-011 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/3-describe-reliability-predictability-cloud` | AZ900-006, AZ900-010, AZ900-054 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/7-describe-platform-service` | AZ900-007 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-concepts/2-define-cloud-computing` | AZ900-008 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/6-describe-infrastructure-service` | AZ900-012, AZ900-059 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/4-describe-azure-management-infrastructure` | AZ900-017, AZ900-018, AZ900-085 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/3-describe-azure-physical-infrastructure` | AZ900-015, AZ900-016, AZ900-066 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/6-containers` | AZ900-022, AZ900-070 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/3-virtual-machines` | AZ900-019, AZ900-020, AZ900-021 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/8-app-service` | AZ900-023 |
| 404 | `https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/9-virtual-networking` | AZ900-024, AZ900-074 |

*Recomendación para futuras actualizaciones de contenido:* En una futura iteración enfocada en redacción de preguntas, actualizar las rutas de `/training/modules/...` a las páginas canónicas de documentación conceptual `/azure/...` de Microsoft Learn, las cuales mantienen redirecciones estables y menor volatilidad que los módulos interactivos de Microsoft Learn.
