<div align="center">

# 🎓 MS Student Platform
### Simulador Adaptativo de Certificaciones Microsoft Cloud, Data & Fabric
**Estilo inspirado en exámenes Pearson VUE • Repetición Espaciada Inteligente • Conectado a Microsoft Learn**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-0078D4)](./index.html)
[![Questions](https://img.shields.io/badge/Banco%20de%20Preguntas-300%20Preguntas-107C41)](./data/questions.json)
[![AZ-900](https://img.shields.io/badge/AZ--900-100%20Preguntas-2563EB)](./data/az900.json)
[![DP-900](https://img.shields.io/badge/DP--900-80%20Preguntas-00A4EF)](./data/dp900.json)
[![DP-600](https://img.shields.io/badge/DP--600-60%20Preguntas-107C41)](./data/dp600.json)
[![DP-700](https://img.shields.io/badge/DP--700-60%20Preguntas-D97706)](./data/dp700.json)

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

**MS Student Platform** es una **Single Page Application (SPA)** estática sin dependencias externas pesadas, diseñada para preparar con rigor técnico las certificaciones de **Microsoft Azure y Microsoft Fabric**.

Combina **dos mundos en una sola herramienta**:
1. **🏛️ Modo Examen (Simulacro inspirado en Pearson VUE):** Reproduce la estética, presión de tiempo, reglas de navegación y tipologías de preguntas (opción única `○`, selección múltiple `☐` con bloqueo de límite, tachado de opciones descartadas con clic derecho, casos de estudio con pestañas laterales y estimación orientativa de **100 a 1000 puntos**, corte **700 = 70%**).
2. **🧠 Modo Estudio Adaptativo + Cajón "📚 Saber Más":** Un tutor inteligente basado en **Cajas de Repetición Espaciada (Leitner 0–4)** y **Detección de Debilidad por Tecnología**, que prioriza automáticamente los temas que más fallas e incluye fichas teóricas estructuradas y conexión al servidor **MCP de Microsoft Learn (`https://learn.microsoft.com/api/mcp`)** en ejecución local.

---

## 🏆 Certificaciones Incluidas (300 Preguntas Originales)

| Código | Certificación | Nivel | Preguntas | Archivo Modular | Temáticas Clave |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **AZ-900** | **Microsoft Azure Fundamentals** | *Fundamentals* ★ | **100** | [`data/az900.json`](./data/az900.json) | Cloud Concepts, IaaS/PaaS/SaaS, VMs, Containers, VNets, VPN/ExpressRoute, Storage, Entra ID, RBAC, Cost Management, Policy, ARM/Bicep, Monitor. |
| **DP-900** | **Microsoft Azure Data Fundamentals** | *Fundamentals* ★ | **80** | [`data/dp900.json`](./data/dp900.json) | ACID/OLTP vs OLAP, Parquet/Avro/ORC, Azure SQL (DTU/vCore/Serverless/Hyperscale), Cosmos DB (APIs, consistencia y particionado), Blob Storage, Data Factory, Synapse, Fabric, Power BI. |
| **DP-600** | **Fabric Analytics Engineer Associate** | *Associate* ★★ | **60** | [`data/dp600.json`](./data/dp600.json) | Lakehouses, Warehouses, Direct Lake & Fallback, Modelos Semánticos Star Schema, DAX avanzado (TREATAS, transición de contexto), Calculation Groups, XMLA, RLS/OLS/CLS, CI/CD, Git & TMDL. |
| **DP-700** | **Fabric Data Engineer Associate** | *Associate* ★★ | **60** | [`data/dp700.json`](./data/dp700.json) | Real-Time Intelligence, Eventstreams (enrutamiento y ventanas), Eventhouse (KQL `arg_max`, `mv-expand`, Update Policy, Materialized Views), PySpark, Delta Lake (`MERGE`, `OPTIMIZE`, `VACUUM`, Liquid Clustering, CDF), `notebookutils`, Spark Tuning & Capacity Metrics. |

---

## ✨ Características Principales

### 👤 1. Pantalla de Login Multi-Perfil y Plan de Estudio Aislado (Sin Mezclas)
- **Múltiples perfiles sin contraseña (`localStorage`):** Cada usuario mantiene aislado su historial, estadísticas por dominio y caja de repetición.
- **Enfoque 100% Focalizado por Certificación:** Al elegir tu **Certificado Objetivo** (ej. *AZ-900*, *DP-600*, *DP-700* o *DP-900*), la plataforma calibra toda la experiencia exclusivamente en esa certificación:
  - Las 4 fases del plan de estudio solo evalúan preguntas de tu certificado objetivo.
  - La **Clínica de Fallos** solo rescata errores pertenecientes a ese certificado.
  - El **Mapa de Conocimientos** y los KPIs reflejan únicamente el avance en la meta elegida.
- **Plan de Estudio en 4 Fases Progresivas:**
  1. *Fase 1 • Cimientos (`🟢 Fundamentos y Conceptos`)*
  2. *Fase 2 • Consolidación (`🔄 Estudio Adaptativo por Dominios`)*
  3. *Fase 3 • Nivel Experto (`🔴 Casos de Estudio y Código`)*
  4. *Fase 4 • Validación Final (`🏛️ Simulacro Modo Examen`)*

### ⚡ 2. Hoja de Trucos / Repaso Rápido 24h Express (Cheat Sheet)
- **Buscador en Vivo y Filtros Inteligentes:** Localiza al instante conceptos, sintaxis o trampas de examen (ej. *SLA, Direct Lake, Entra ID, Cosmos DB, Liquid Clustering, Eventstreams...*).
- **Filtro de Trampas de Examen:** Casilla `⚠️ Solo trampas de examen (Exam Traps)` para repasar las confusiones frecuentes el día previo al test.
- **Acceso Directo a Fichas Teóricas:** Resúmenes condensados, conceptos clave y enlaces directos a Microsoft Learn.

### 📱 3. Instalación PWA en 1 Clic y Experiencia Móvil Optimizada
- **Instalación como App Nativa (`📲 Instalar App`):** Compatible con Android (Chrome/Edge) y escritorio con soporte para el evento `beforeinstallprompt`, además de instrucciones paso a paso para iOS Safari.
- **Diseño Ergonómico Móvil (Touch First):** Botones con objetivos táctiles amplios (48px), selector de opciones optimizado para pantallas pequeñas (360px+), navegación horizontal por pestañas en casos de estudio y Service Worker v4 para estudio 100% offline sin conexión a internet.

### 🧠 4. Motor de Repetición Adaptativa y Mapa de Calor Visual
- **Sistema Leitner Cajas 0 a 4:** Cuando fallas una pregunta, entra en la **Caja 0 (Prioridad Inmediata)** y vuelve a aparecer en tus sesiones según intervalos espaciados (0d, 1d, 3d, 7d, 21d).
- **Refuerzo por Tema Débil:** Si fallas una pregunta sobre *Direct Lake*, *KQL* o *Azure Networking*, el motor adaptativo incrementa la probabilidad de extraer **otras preguntas del mismo tema** para asegurar que dominas el concepto y no solo memorizas una letra.
- **Mapa de Calor con Iconos Vectoriales:** Visualiza de un vistazo tu porcentaje de dominio en cada tecnología y lanza un entrenamiento focalizado en 1 clic.

### 📚 5. Botón "Saber Más" + Consulta a Microsoft Learn
- Cada pregunta cuenta con una **Ficha Teórica (`theoryPill`)** que resume la arquitectura del servicio, los puntos clave para el examen y la alerta **"⚠️ Trampa frecuente en examen"**.
- En local, desde el mismo cajón lateral puedes interrogar en vivo a `https://learn.microsoft.com/api/mcp` (al ejecutar con `node server.js`) para buscar artículos (`microsoft_docs_search`) y fragmentos de código (`microsoft_code_sample_search`). En web (GitHub Pages), se proporcionan enlaces directos a la documentación pública de Microsoft Learn.

### 🌗 6. Modo Claro por Defecto y Modo Oscuro (Fluent UI)
- Diseñado con la paleta **Microsoft Fluent Light** por defecto y conmutador rápido a **Fluent Dark** en la cabecera.

---

## 🏗️ Arquitectura del Sistema

```mermaid
flowchart LR
  subgraph UI["Frontend SPA (Vanilla JS + CSS3)"]
    Login["👤 Login & Gestor de Perfiles"]
    Plan["🗺️ Plan de Estudio (4 Fases)"]
    Dash["📊 Dashboard & Heatmap"]
    Vue["🏛️ Simulador Pearson VUE"]
    Drawer["📚 Cajón 'Saber Más'"]
    Results["📈 Resultados & Revisión"]
  end

  subgraph Engine["Motor Adaptativo & Datos"]
    Storage[("💾 localStorage\n(Perfiles & Cajas 0-3)")]
    JSON[("📦 Bancos Modulares\naz900 | dp900 | dp600 | dp700")]
  end

  subgraph Backend["Servidor Local (server.js)"]
    Proxy["🔌 Proxy /api/mslearn"]
    MCP["🌐 Microsoft Learn MCP\nlearn.microsoft.com/api/mcp"]
  end

  Login --> Plan --> Dash
  Dash --> Vue --> Results
  Vue --> Drawer
  Results --> Drawer
  Vue <--> Storage
  Dash <--> JSON
  Drawer <--> Proxy <--> MCP
```

---

## 🚀 Cómo Empezar a Usarlo

### 🌐 Opción 1: En Vivo desde el Navegador (Sin instalación)
La plataforma está publicada y lista para usar directamente en GitHub Pages:  
👉 **[https://joangranell.github.io/MS-Student-Platform/](https://joangranell.github.io/MS-Student-Platform/)**

*(Funciona 100% en local en tu navegador: guarda tus notas, progreso, modo claro/oscuro y todas las 300 preguntas con sus explicaciones teóricas).*

---

### 💻 Opción 2: Ejecución en Local (Con consulta en vivo al MCP de Microsoft Learn)
Si quieres utilizar el buscador dinámico hacia el servidor MCP de Microsoft Learn dentro del cajón lateral:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/joangranell/MS-Student-Platform.git
   cd MS-Student-Platform
   ```
2. Inicia el servidor local (en Windows puedes hacer doble clic en `iniciar-plataforma.bat`):
   ```bash
   node server.js
   ```
3. Abre tu navegador en:
   👉 **`http://localhost:8080`**

*(También puedes consultar la especificación funcional interactiva en `http://localhost:8080/documento-funcional.html`).*

---

## 📂 Estructura del Proyecto

```text
MS-Student-Platform/
├── index.html                  # Aplicación SPA principal
├── documento-funcional.html    # Documento funcional y técnico interactivo
├── server.js                   # Servidor estático Node.js + Proxy para MS Learn MCP
├── iniciar-plataforma.bat      # Lanzador rápido en 1 clic (Windows)
├── LICENSE                     # Licencia MIT + Aviso de Marcas Registradas
├── css/
│   ├── variables.css           # Paletas Fluent Dark y Fluent Light
│   ├── main.css                # Estilos de Login, Plan de Estudio, Dashboard y Heatmap
│   └── exam-vue.css            # Estilos Pearson VUE, Casos de Estudio y Cajón "Saber Más"
├── js/
│   ├── app.js                  # Controlador principal y orquestador de eventos
│   ├── state.js                # Estado reactivo de la sesión
│   ├── storage.js              # Persistencia Multi-Perfil y Cajas de Repetición (localStorage)
│   ├── examEngine.js           # Motor adaptativo, barajado Fisher-Yates y evaluación 100-1000
│   ├── ui.js                   # Renderizado DOM de vistas y modales
│   └── icons.js                # Escudos de certificación e iconos de servicios en SVG
├── data/
│   ├── az900.json              # 100 preguntas de AZ-900: Azure Fundamentals
│   ├── dp900.json              # 80 preguntas de DP-900: Azure Data Fundamentals
│   ├── dp600.json              # 60 preguntas de DP-600: Fabric Analytics Engineer
│   ├── dp700.json              # 60 preguntas de DP-700: Fabric Data Engineer
│   └── questions.json          # Catálogo unificado (300 preguntas)
└── scripts/
    └── mcp-mslearn.js          # Conector JSON-RPC/SSE hacia https://learn.microsoft.com/api/mcp
```

---

## ⚖️ Aviso Legal, Propiedad Intelectual y No Afiliación

> **Proyecto Educativo Independiente (Cero "Braindumps"):**
> * **MS Student Platform** es una herramienta de software libre (Licencia MIT) creada exclusivamente con fines educativos y de autoestudio.
> * **Contenido 100% Original:** Todas las preguntas, casos prácticos, explicaciones y fichas teóricas de este repositorio son ejercicios originales redactados a partir de la documentación pública de [Microsoft Learn](https://learn.microsoft.com/) y de las guías de estudio públicas (*Study Guides*). Este repositorio **no contiene ni permite** preguntas filtradas o protegidas por el Acuerdo de Confidencialidad de Exámenes de Microsoft (*Microsoft Certification Exam NDA*).
> * **No Afiliación y Marcas Registradas:** Este proyecto **no está afiliado, patrocinado, autorizado ni respaldado oficialmente por Microsoft Corporation ni por Pearson Education, Inc. (Pearson VUE)**. *Microsoft, Azure, Microsoft Fabric, OneLake, Power BI y Microsoft Entra* son marcas comerciales o marcas registradas de Microsoft Corporation. *Pearson VUE* es una marca registrada de Pearson Education, Inc. Su mención en este proyecto responde exclusivamente a un uso descriptivo y nominativo legítimo para identificar el temario de estudio.
> * **Privacidad (RGPD / GDPR):** La aplicación almacena el progreso y los perfiles únicamente en el `localStorage` del navegador local del usuario y no recopila datos personales en servidores externos.
