<div align="center">

# 🎓 MS Student Platform
### Simulador Adaptativo de Certificaciones Microsoft Cloud, Data, AI & Security
**Estilo inspirado en exámenes Pearson VUE • Repetición Espaciada Inteligente • Conectado a Microsoft Learn**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-0078D4)](./index.html)
[![Questions](https://img.shields.io/badge/Banco%20de%20Preguntas-1.020%20Preguntas-107C41)](./data/questions.json)
[![AZ-900](https://img.shields.io/badge/AZ--900-100%20Preguntas-2563EB)](./data/az900.json)
[![DP-900](https://img.shields.io/badge/DP--900-100%20Preguntas-00A4EF)](./data/dp900.json)
[![DP-600](https://img.shields.io/badge/DP--600-100%20Preguntas-107C41)](./data/dp600.json)
[![DP-700](https://img.shields.io/badge/DP--700-120%20Preguntas-D97706)](./data/dp700.json)
[![PL-300](https://img.shields.io/badge/PL--300-100%20Preguntas-CA8A04)](./data/pl300.json)
[![AB-650](https://img.shields.io/badge/AB--650-100%20Preguntas-7C3AED)](./data/ab650.json)
[![AI-901](https://img.shields.io/badge/AI--901-100%20Preguntas-0D9488)](./data/ai901.json)
[![AB-900](https://img.shields.io/badge/AB--900-100%20Preguntas-4F46E5)](./data/ab900.json)
[![DP-800](https://img.shields.io/badge/DP--800-100%20Preguntas-059669)](./data/dp800.json)
[![SC-200](https://img.shields.io/badge/SC--200-100%20Preguntas-DC2626)](./data/sc200.json)

<br/>

[![Entrar a la Plataforma Web](https://img.shields.io/badge/🚀%20ABRIR%20SIMULADOR%20EN%20VIVO-PULSA%20AQUÍ-success?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://joangranell.github.io/MS-Student-Platform/)

**🌐 Enlace directo a la app:** [https://joangranell.github.io/MS-Student-Platform/](https://joangranell.github.io/MS-Student-Platform/)

</div>

---

## 🌟 ¿Qué es MS Student Platform?

> 🚀 **¿Quieres empezar a estudiar ya sin instalar nada?**  
> Puedes acceder directamente a la versión web desplegada en **GitHub Pages**:  
> 👉 **[https://joangranell.github.io/MS-Student-Platform/](https://joangranell.github.io/MS-Student-Platform/)**  
> *(Funciona en móvil, tablet y PC con guardado local de tu progreso).*

**MS Student Platform** es una **Single Page Application (SPA)** estática sin dependencias externas pesadas, diseñada para preparar con rigor técnico las certificaciones de **Microsoft Azure, Data, IA, Copilot y Ciberseguridad**.

Combina **dos mundos en una sola herramienta**:
1. **🏛️ Modo Examen (Simulacro inspirado en Pearson VUE):** Reproduce la estética, presión de tiempo, reglas de navegación y tipologías de preguntas (opción única `○`, selección múltiple `☐` con bloqueo de límite, tachado de opciones descartadas con clic derecho o pulsación larga en móvil, casos de estudio con pestañas laterales y estimación orientativa de **100 a 1000 puntos**, corte **700 = 70%**).
2. **🧠 Modo Estudio Adaptativo + Cajón "📚 Saber Más":** Un tutor inteligente basado en **Cajas de Repetición Espaciada (Leitner 0–4)** y **Detección de Debilidad por Tecnología**, que prioriza automáticamente los temas que más fallas e incluye fichas teóricas estructuradas y conexión al servidor **MCP de Microsoft Learn (`https://learn.microsoft.com/api/mcp`)** en ejecución local.

---

## 🏆 Certificaciones Incluidas (1.020 Preguntas Técnicas)

| Código | Certificación | Nivel | Preguntas | Archivo Modular | Temáticas Clave |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **AZ-900** | **Microsoft Azure Fundamentals** | *Fundamentals* ★ | **100** | [`data/az900.json`](./data/az900.json) | Cloud Concepts, IaaS/PaaS/SaaS, VMs, Containers, VNets, VPN/ExpressRoute, Storage, Entra ID, RBAC, Cost Management, Policy, ARM/Bicep, Monitor. |
| **DP-900** | **Microsoft Azure Data Fundamentals** | *Fundamentals* ★ | **100** | [`data/dp900.json`](./data/dp900.json) | ACID/OLTP vs OLAP, Parquet/Avro/ORC, Azure SQL (DTU/vCore/Serverless/Hyperscale/Elastic Pools), Cosmos DB (APIs, consistencia y particionado), Blob Storage, Data Factory, Synapse, Fabric, Power BI. |
| **DP-600** | **Fabric Analytics Engineer Associate** | *Associate* ★★ | **100** | [`data/dp600.json`](./data/dp600.json) | Lakehouses, Warehouses, Direct Lake & Fallback, Modelos Semánticos Star Schema, DAX avanzado (TREATAS, transición de contexto), Calculation Groups, XMLA, RLS/OLS/CLS, CI/CD, Git & TMDL. |
| **DP-700** | **Fabric Data Engineer Associate** | *Associate* ★★ | **120** | [`data/dp700.json`](./data/dp700.json) | Real-Time Intelligence, Eventstreams (enrutamiento y ventanas), Eventhouse (KQL `arg_max`, `mv-expand`, Update Policy, Materialized Views), PySpark, Delta Lake (`MERGE`, `OPTIMIZE`, `VACUUM`, Liquid Clustering, CDF, Generated Columns, Identity Columns), `notebookutils`, Spark Skew & Tuning, Shortcuts S3 y Capacity Metrics. |
| **PL-300** | **Microsoft Power BI Data Analyst** | *Associate* ★★ | **100** | [`data/pl300.json`](./data/pl300.json) | Power Query (M, Query Folding, Fuzzy Match), Esquema en estrella, DAX avanzado (`CALCULATE`, `TOTALYTD`, `TREATAS`, `SUMMARIZECOLUMNS`, `COALESCE`), visualizaciones y KPIs, RLS estática y dinámica (`USERPRINCIPALNAME`), Workspaces, Gateways, Apps y Power BI Service. |
| **AB-650** | **Administering Microsoft 365 and AI Services** | *Associate* ★★ | **100** | [`data/ab650.json`](./data/ab650.json) | Administración de tenants, Multi-Geo, Entra ID, Microsoft Graph PowerShell SDK desatendido, Exchange Mail Flow (SPF/DKIM/DMARC), Purview Information Protection, DLP, retención, Copilot licensing, semantic index, Copilot Studio agents y Graph Connectors. |
| **AI-901** | **Microsoft Azure AI Fundamentals** | *Fundamentals* ★ | **100** | [`data/ai901.json`](./data/ai901.json) | Conceptos de IA y Machine Learning, LLMs y SLMs (Phi-3/4), tokens, embeddings, Responsible AI (6 principios), Microsoft Foundry, prompt engineering, SDK Python, multimodal GPT-4o, DALL-E 3, Azure Content Understanding y evaluadores de Groundedness. |
| **AB-900** | **M365 Copilot & Agent Administration Fundamentals** | *Fundamentals* ★ | **100** | [`data/ab900.json`](./data/ab900.json) | Cargas de trabajo core M365 (Exchange, SharePoint, Teams), Zero Trust, contraseñas sin clave (FIDO2/Authenticator), SSPR, gobernanza de datos para Copilot, Restricted SharePoint Search, herencia de etiquetas Purview, DAG reports y ciclo de vida de agentes. |
| **DP-800** | **Developing AI-Enabled Database Solutions** | *Associate* ★★ | **100** | [`data/dp800.json`](./data/dp800.json) | T-SQL avanzado, CTEs recursivas, JSON, Graph tables (MATCH), Query Store y forzado de planes, RCSI, Always Encrypted, VECTOR data type, VECTOR_DISTANCE (cosine, euclidean, dot), DiskANN, búsqueda híbrida (RRF) y patrones RAG seguros con RLS. |
| **SC-200** | **Microsoft Security Operations Analyst** | *Associate* ★★ | **100** | [`data/sc200.json`](./data/sc200.json) | Microsoft Sentinel (SIEM/SOAR), conectores de datos, reglas analíticas, reglas de automatización, Defender XDR, Defender for Endpoint (aislamiento, Live Response), Defender for Identity (Golden Ticket, DCSync), KQL threat hunting y MSTICPy notebooks. |

---

## 📢 Registro de Novedades y Actualizaciones (Changelog)

| Versión / Fecha | Módulos / Certificaciones | Tipo | Detalle de la Actualización | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **v3.4.0**<br><small>Noviembre 2026</small> | **Todas las Certificaciones (10)**<br>`data/en/` • UI i18n | 🌐 Soporte Bilingüe Completo<br>🎨 Rediseño Selector | **Capa de internacionalización completa y rediseño interactivo de usabilidad:**<br>• Catálogo completo de **1.020 preguntas en inglés** (`data/en/`) con equivalencia 1:1 en IDs y opciones.<br>• Selector de idioma en cabecera `[ 🇪🇸 ES | 🇬🇧 EN ]` con traducción instantánea de interfaz, explicaciones y píldoras teóricas.<br>• Rediseño del plan de estudio en 3 tracks (*Datos & BI*, *IA & Copilot*, *Cloud & Seguridad*), buscador en tiempo real, cuadrícula de 2 columnas e insignias de nivel.<br>• Service Worker `ms-platform-v17` con caché offline para español e inglés. | `✓ Activo` |
| **v3.3.0**<br><small>Noviembre 2026</small> | **AB-650** • **AI-901**<br>**AB-900** • **DP-800**<br>**SC-200** | 🚀 5 Nuevas Certificaciones<br>📚 1.020 Preguntas | **Ampliación masiva con 5 nuevos bancos completos (500 preguntas técnicas):**<br>• Publicación de **AB-650** (100 preguntas): *AI Services Administrator Associate*.<br>• Publicación de **AI-901** (100 preguntas): *Azure AI Fundamentals con Microsoft Foundry*.<br>• Publicación de **AB-900** (100 preguntas): *Copilot & Agent Administration Fundamentals*.<br>• Publicación de **DP-800** (100 preguntas): *SQL AI Developer Associate (Vectores, RAG & T-SQL)*.<br>• Publicación de **SC-200** (100 preguntas): *Security Operations Analyst (Sentinel & Defender XDR)*.<br>• El catálogo global alcanza **1.020 preguntas técnicas oficiales** con 10 certificaciones cubiertas. | `✓ Activo` |
| **v3.2.0**<br><small>Noviembre 2026</small> | **PL-300** • `Power BI Data Analyst`<br>**Todos los Bancos** • `AZ / DP / PL` | 🚀 Nueva Certificación<br>🎯 Calidad Técnica | **Incorporación de PL-300 (100 preguntas) y revisión integral de distractores:**<br>• Publicación del banco completo de 100 preguntas para *Microsoft Power BI Data Analyst*.<br>• Sustitución de más de 60 opciones incorrectas en todos los bancos por alternativas técnicas verosímiles de Microsoft Learn.<br>• Incorporación de la tabla de novedades en la pantalla principal (Login). | `✓ Activo` |
| **v3.1.5**<br><small>Noviembre 2026</small> | **DP-700** • `Fabric Data Engineer` | 📚 Ampliación de Banco | **Expansión a 120 preguntas de nivel associate:** cobertura en profundidad de streaming en tiempo real, arquitectura Medallion, Delta Lake, Eventhouse (KQL) y optimización en PySpark. | `✓ Activo` |
| **v3.1.0**<br><small>Noviembre 2026</small> | **Motor de Estudio** • `Algoritmo Adaptativo` | ⚙️ Funcionalidad | **Unificación del plan de fases de estudio:** avance porcentual sincronizado con preguntas consolidadas (Caja Leitner ≥ 1), algoritmo de repetición espaciada normalizado a calendario UTC y filtrado dinámico del historial por certificado. | `✓ Activo` |
| **v3.0.0**<br><small>Octubre 2026</small> | **Simulador Oficial** • `Pearson VUE UI` | 🎨 Interfaz y Examen | **Simulador de examen fiel a Pearson VUE:** barra de tiempo superior con avisos, selector de preguntas, botón *Marcar para revisión*, pantalla de resumen final y Hoja de Trucos / Repaso 24h interactiva con filtros rápidos. | `✓ Activo` |

---

## ✨ Características Principales

### 👤 1. Pantalla de Login Multi-Perfil y Plan de Estudio Aislado (Sin Mezclas)
- **Múltiples perfiles sin contraseña (`localStorage`):** Cada usuario mantiene aislado su historial, estadísticas por dominio y caja de repetición.
- **Enfoque 100% Focalizado por Certificación:** Al elegir tu **Certificado Objetivo** (ej. *AZ-900, DP-900, DP-600, DP-700, PL-300, AB-650, AI-901, AB-900, DP-800 o SC-200*), la plataforma calibra toda la experiencia exclusivamente en esa certificación:
  - Las 4 fases del plan de estudio solo evalúan preguntas de tu certificado objetivo.
  - La **Clínica de Fallos** solo rescata errores pertenecientes a ese certificado.
  - El **Mapa de Conocimientos** y los KPIs reflejan únicamente el avance en la meta elegida.
- **Plan de Estudio en 4 Fases Progresivas:**
  1. *Fase 1 • Cimientos (`🟢 Fundamentos y Conceptos`)*
  2. *Fase 2 • Consolidación (`🔄 Estudio Adaptativo por Dominios`)*
  3. *Fase 3 • Nivel Experto (`🔴 Casos de Estudio y Código`)*
  4. *Fase 4 • Validación Final (`🏛️ Simulacro Modo Examen`)*

### ⚡ 2. Hoja de Trucos / Repaso Rápido 24h Express (Cheat Sheet)
- **Buscador en Vivo y Filtros Inteligentes:** Localiza al instante conceptos, sintaxis o trampas de examen (*Direct Lake, KQL, Sentinel, VECTOR_DISTANCE, Copilot Studio, Entra ID, Purview, DiskANN...*).
- **Filtro de Trampas de Examen:** Casilla `⚠️ Solo trampas de examen (Exam Traps)` para repasar las confusiones frecuentes el día previo al test.
- **Acceso Directo a Fichas Teóricas:** Resúmenes condensados, conceptos clave y enlaces directos a Microsoft Learn.

### 📱 3. Instalación PWA en 1 Clic y Experiencia Móvil Optimizada
- **Instalación como App Nativa (`📲 Instalar App`):** Compatible con Android (Chrome/Edge) y escritorio con soporte para el evento `beforeinstallprompt`, además de instrucciones paso a paso para iOS Safari.
- **Diseño Ergonómico Móvil (Touch First):** Botones con objetivos táctiles amplios (48px), selector de opciones optimizado para pantallas pequeñas (360px+), navegación horizontal por pestañas en casos de estudio y Service Worker para estudio 100% offline sin conexión a internet.

### 🧠 4. Motor de Repetición Adaptativa y Mapa de Calor Visual
- **Sistema Leitner Cajas 0 a 4:** Cuando fallas una pregunta, entra en la **Caja 0 (Prioridad Inmediata)** y vuelve a aparecer en tus sesiones según intervalos espaciados (0d, 1d, 3d, 7d, 21d).
- **Refuerzo por Tema Débil:** Si fallas una pregunta, el motor adaptativo incrementa la probabilidad de extraer **otras preguntas del mismo tema** para asegurar que dominas el concepto y no solo memorizas una letra.
- **Mapa de Calor con Iconos Vectoriales:** Visualiza de un vistazo tu porcentaje de dominio en cada tecnología y lanza un entrenamiento focalizado en 1 clic.

---

## 📂 Estructura del Proyecto

```
MS-Student-Platform/
├── css/
│   ├── main.css                # Estilos globales, Fluent UI, layout responsivo y dark mode
│   ├── exam-vue.css            # Hoja de estilos inspirada en la interfaz Pearson VUE
│   └── variables.css           # Paleta de colores oficiales Microsoft y tokens de diseño
├── data/
│   ├── az900.json              # 100 preguntas de AZ-900: Azure Fundamentals
│   ├── dp900.json              # 100 preguntas de DP-900: Azure Data Fundamentals
│   ├── dp600.json              # 100 preguntas de DP-600: Fabric Analytics Engineer Associate
│   ├── dp700.json              # 120 preguntas de DP-700: Fabric Data Engineer Associate
│   ├── pl300.json              # 100 preguntas de PL-300: Power BI Data Analyst
│   ├── ab650.json              # 100 preguntas de AB-650: AI Services Administrator Associate
│   ├── ai901.json              # 100 preguntas de AI-901: Azure AI Fundamentals
│   ├── ab900.json              # 100 preguntas de AB-900: Copilot & Agent Administration
│   ├── dp800.json              # 100 preguntas de DP-800: SQL AI Developer Associate
│   ├── sc200.json              # 100 preguntas de SC-200: Security Operations Analyst
│   └── questions.json          # Catálogo unificado generado automáticamente (1.020 preguntas)
├── js/
│   ├── app.js                  # Orquestador SPA, enrutamiento, controladores de eventos
│   ├── examEngine.js           # Motor de simulación de examen, cronómetro, puntuación Pearson VUE
│   ├── storage.js              # Repositorio localStorage, sistema Leitner Cajas 0-4 y perfiles
│   ├── icons.js                # Logos vectoriales oficiales SVG de certificaciones y temáticas
│   ├── state.js                # Estado reactivo en memoria de la sesión activa
│   └── ui.js                   # Renderizado del DOM, tema claro/oscuro, modales y roadmap
├── tests/
│   └── examEngine.test.js      # Pruebas unitarias nativas (node:test)
├── scripts/
│   └── build-catalog.js        # Compilador y validador de integridad del catálogo
├── index.html                  # Punto de entrada de la aplicación SPA
├── manifest.json               # Manifiesto PWA para instalación como app nativa
├── sw.js                       # Service Worker para ejecución y estudio 100% offline
└── README.md                   # Documentación técnica completa
```

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE).
