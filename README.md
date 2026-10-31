<div align="center">

# ðŸŽ“ MS Student Platform
### Simulador Adaptativo de Certificaciones Microsoft Cloud, Data & Fabric
**Entorno fiel a Pearson VUE â€¢ RepeticiÃ³n Espaciada Inteligente â€¢ Conectado en Vivo a Microsoft Learn MCP**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-0078D4)](./index.html)
[![Questions](https://img.shields.io/badge/Banco%20de%20Preguntas-240%20Verificadas-107C41)](./data/questions.json)
[![AZ-900](https://img.shields.io/badge/AZ--900-100%20Preguntas-2563EB)](./data/az900.json)
[![DP-900](https://img.shields.io/badge/DP--900-70%20Preguntas-00A4EF)](./data/dp900.json)
[![DP-600](https://img.shields.io/badge/DP--600-35%20Preguntas-107C41)](./data/dp600.json)
[![DP-700](https://img.shields.io/badge/DP--700-35%20Preguntas-D97706)](./data/dp700.json)
[![MS Learn MCP](https://img.shields.io/badge/MCP-Microsoft%20Learn%20Live-8B5CF6)](https://learn.microsoft.com/api/mcp)

**🌐 Demo en vivo:** https://joangranell.github.io/MS-Student-Platform/

</div>

---

## ðŸŒŸ Â¿QuÃ© es MS Student Platform?

**MS Student Platform** es una **Single Page Application (SPA)** estÃ¡tica sin dependencias externas pesadas, diseÃ±ada para preparar con rigor tÃ©cnico las certificaciones oficiales de **Microsoft Azure y Microsoft Fabric**.

Combina **dos mundos en una sola herramienta**:
1. **ðŸ›ï¸ Modo Examen Oficial (SimulaciÃ³n Pearson VUE):** Reproduce la estÃ©tica, presiÃ³n de tiempo, reglas de navegaciÃ³n y tipologÃ­as de preguntas reales (opciÃ³n Ãºnica `â—‹`, selecciÃ³n mÃºltiple `â˜` con bloqueo de lÃ­mite, tachado de opciones descartadas con clic derecho, casos de estudio con pestaÃ±as laterales y nota escalada oficial de **100 a 1000 puntos**, corte **700 = 70%**).
2. **ðŸ§  Modo Estudio Adaptativo + CajÃ³n "ðŸ“š Saber MÃ¡s":** Un tutor inteligente basado en **Cajas de RepeticiÃ³n Espaciada (Leitner 0â€“3)** y **DetecciÃ³n de Debilidad por TecnologÃ­a**, que prioriza automÃ¡ticamente los temas que mÃ¡s fallas e incluye fichas teÃ³ricas estructuradas y conexiÃ³n en tiempo real al servidor **MCP de Microsoft Learn (`https://learn.microsoft.com/api/mcp`)**.

---

## ðŸ† Certificaciones Incluidas (240 Preguntas Originales)

| CÃ³digo | CertificaciÃ³n Oficial | Nivel | Preguntas | Archivo Modular | TemÃ¡ticas Clave |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **AZ-900** | **Microsoft Azure Fundamentals** | *Fundamentals* â˜… | **100** | [`data/az900.json`](./data/az900.json) | Cloud Concepts, IaaS/PaaS/SaaS, VMs, Containers, VNets, VPN/ExpressRoute, Storage, Entra ID, RBAC, Cost Management, Policy, ARM/Bicep, Monitor. |
| **DP-900** | **Microsoft Azure Data Fundamentals** | *Fundamentals* â˜… | **70** | [`data/dp900.json`](./data/dp900.json) | ACID/OLTP vs OLAP, Parquet/Avro/ORC, Azure SQL (DTU/vCore/Hyperscale), Cosmos DB, Blob Storage, Data Factory, Synapse, Fabric, Power BI. |
| **DP-600** | **Fabric Analytics Engineer Associate** | *Associate* â˜…â˜… | **35** | [`data/dp600.json`](./data/dp600.json) | Lakehouses, Warehouses, Direct Lake & Fallback, Modelos SemÃ¡nticos Star Schema, DAX avanzado, Calculation Groups, XMLA, RLS/OLS/CLS, CI/CD & Git. |
| **DP-700** | **Fabric Data Engineer Associate** | *Associate* â˜…â˜… | **35** | [`data/dp700.json`](./data/dp700.json) | Real-Time Intelligence, Eventstreams, Eventhouse (KQL `arg_max`, `mv-expand`), PySpark, Delta Lake (`MERGE`, `OPTIMIZE`, `VACUUM`), `notebookutils`, Spark Tuning. |

---

## âœ¨ CaracterÃ­sticas Principales

### ðŸ‘¤ 1. Pantalla de Login Multi-Perfil y Plan de Estudio a Medida
- **MÃºltiples perfiles sin contraseÃ±a (`localStorage`):** Cada usuario mantiene aislado su historial, estadÃ­sticas por dominio y caja de repeticiÃ³n.
- **GestiÃ³n en lÃ­nea (`ðŸ› ï¸ Ver perfiles`):** Permite renombrar perfiles, cambiar su certificaciÃ³n objetivo o eliminarlos, ademÃ¡s de exportar/importar copias de seguridad en `.json`.
- **Plan de Estudio en 4 Fases Progresivas:** Al iniciar un perfil y elegir tu **Certificado Objetivo**, la plataforma construye tu hoja de ruta dividida en:
  1. *Fase 1 â€¢ Cimientos (`ðŸŸ¢ Fundamentos y Conceptos`)*
  2. *Fase 2 â€¢ ConsolidaciÃ³n (`ðŸ”„ Estudio Adaptativo por Dominios`)*
  3. *Fase 3 â€¢ Nivel Experto (`ðŸ”´ Casos de Estudio y CÃ³digo`)*
  4. *Fase 4 â€¢ ValidaciÃ³n Final (`ðŸ›ï¸ Simulacro Oficial Pearson VUE`)*

### ðŸ§  2. Motor de RepeticiÃ³n Adaptativa y Mapa de Calor Visual
- **Sistema de Cajas 0 a 3:** Cuando fallas una pregunta, entra en la **Caja 0 (Prioridad CrÃ­tica)** y vuelve a aparecer en tus sesiones hasta que la aciertes de forma consistente.
- **Refuerzo por Tema DÃ©bil:** Si fallas una pregunta sobre *Direct Lake*, *KQL* o *Azure Networking*, el motor adaptativo incrementa la probabilidad de extraer **otras preguntas del mismo tema** para asegurar que dominas el concepto y no solo memorizas una letra.
- **Mapa de Calor con Iconos Vectoriales:** Visualiza de un vistazo tu porcentaje de dominio en cada tecnologÃ­a y lanza un entrenamiento focalizado en 1 clic.

### ðŸ“š 3. BotÃ³n "Saber MÃ¡s" + Consulta en Vivo a Microsoft Learn MCP
- Cada pregunta cuenta con una **Ficha TeÃ³rica (`theoryPill`)** que resume la arquitectura del servicio, los puntos clave para el examen y la alerta **"âš ï¸ Trampa frecuente en Pearson VUE"**.
- Desde el mismo cajÃ³n lateral puedes interrogar en vivo a `https://learn.microsoft.com/api/mcp` para buscar artÃ­culos oficiales (`microsoft_docs_search`) y fragmentos de cÃ³digo (`microsoft_code_sample_search`) sin abandonar el test.

### ðŸŒ— 4. Modo Oscuro y Modo Claro (Fluent UI)
- Alterna en cualquier momento entre **Fluent Dark Mode** (por defecto) y **Fluent Light Mode** desde la barra superior.

---

## ðŸ—ï¸ Arquitectura del Sistema

```mermaid
flowchart LR
  subgraph UI["Frontend SPA (Vanilla JS + CSS3)"]
    Login["ðŸ‘¤ Login & Gestor de Perfiles"]
    Plan["ðŸ—ºï¸ Plan de Estudio (4 Fases)"]
    Dash["ðŸ“Š Dashboard & Heatmap"]
    Vue["ðŸ›ï¸ Simulador Pearson VUE"]
    Drawer["ðŸ“š CajÃ³n 'Saber MÃ¡s'"]
    Results["ðŸ“ˆ Resultados & RevisiÃ³n"]
  end

  subgraph Engine["Motor Adaptativo & Datos"]
    Storage[("ðŸ’¾ localStorage\n(Perfiles & Cajas 0-3)")]
    JSON[("ðŸ“¦ Bancos Modulares\naz900 | dp900 | dp600 | dp700")]
  end

  subgraph Backend["Servidor Local (server.js)"]
    Proxy["ðŸ”Œ Proxy /api/mslearn"]
    MCP["ðŸŒ Microsoft Learn MCP\nlearn.microsoft.com/api/mcp"]
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

## ðŸš€ InstalaciÃ³n y Puesta en Marcha

No necesitas instalar paquetes pesados ni compiladores. Solo necesitas tener **Node.js** instalado (o cualquier servidor estÃ¡tico local):

### OpciÃ³n A: Con soporte en vivo para el MCP de Microsoft Learn (Recomendado)

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
   ðŸ‘‰ **`http://localhost:8080`**

*(TambiÃ©n puedes consultar la especificaciÃ³n tÃ©cnica interactiva en `http://localhost:8080/documento-funcional.html`).*

### OpciÃ³n B: Despliegue EstÃ¡tico (GitHub Pages / Netlify / Vercel)
La aplicaciÃ³n funciona 100% como SPA estÃ¡tica sirviendo la raÃ­z del repositorio. En entornos puramente estÃ¡ticos sin `server.js`, todas las preguntas, explicaciones, fichas teÃ³ricas *"Saber mÃ¡s"* y enlaces directos a Microsoft Learn funcionan de manera autÃ³noma.

---

## ðŸ“‚ Estructura del Proyecto

```text
MS-Student-Platform/
â”œâ”€â”€ index.html                  # AplicaciÃ³n SPA principal
â”œâ”€â”€ documento-funcional.html    # Documento funcional y tÃ©cnico interactivo
â”œâ”€â”€ server.js                   # Servidor estÃ¡tico Node.js + Proxy para MS Learn MCP
â”œâ”€â”€ iniciar-plataforma.bat      # Lanzador rÃ¡pido en 1 clic (Windows)
â”œâ”€â”€ LICENSE                     # Licencia MIT + Aviso de Marcas Registradas
â”œâ”€â”€ css/
â”‚   â”œâ”€â”€ variables.css           # Paletas Fluent Dark y Fluent Light
â”‚   â”œâ”€â”€ main.css                # Estilos de Login, Plan de Estudio, Dashboard y Heatmap
â”‚   â””â”€â”€ exam-vue.css            # Estilos Pearson VUE, Casos de Estudio y CajÃ³n "Saber MÃ¡s"
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ app.js                  # Controlador principal y orquestador de eventos
â”‚   â”œâ”€â”€ state.js                # Estado reactivo de la sesiÃ³n
â”‚   â”œâ”€â”€ storage.js              # Persistencia Multi-Perfil y Cajas de RepeticiÃ³n (localStorage)
â”‚   â”œâ”€â”€ examEngine.js           # Motor adaptativo, barajado Fisher-Yates y evaluaciÃ³n 100-1000
â”‚   â”œâ”€â”€ ui.js                   # Renderizado DOM de vistas y modales
â”‚   â””â”€â”€ icons.js                # Escudos de certificaciÃ³n e iconos de servicios en SVG
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ az900.json              # 100 preguntas de AZ-900: Azure Fundamentals
â”‚   â”œâ”€â”€ dp900.json              # 70 preguntas de DP-900: Azure Data Fundamentals
â”‚   â”œâ”€â”€ dp600.json              # 35 preguntas de DP-600: Fabric Analytics Engineer
â”‚   â”œâ”€â”€ dp700.json              # 35 preguntas de DP-700: Fabric Data Engineer
â”‚   â””â”€â”€ questions.json          # CatÃ¡logo unificado (240 preguntas)
â””â”€â”€ scripts/
    â””â”€â”€ mcp-mslearn.js          # Conector JSON-RPC/SSE hacia https://learn.microsoft.com/api/mcp
```

---

## âš–ï¸ Aviso Legal, Propiedad Intelectual y No AfiliaciÃ³n

> **Proyecto Educativo Independiente (Cero "Braindumps"):**
> * **MS Student Platform** es una herramienta de software libre (Licencia MIT) creada exclusivamente con fines educativos y de autoestudio.
> * **Contenido 100% Original:** Todas las preguntas, casos prÃ¡cticos, explicaciones y fichas teÃ³ricas de este repositorio son ejercicios originales redactados a partir de la documentaciÃ³n pÃºblica de [Microsoft Learn](https://learn.microsoft.com/) y de las guÃ­as de estudio pÃºblicas (*Study Guides*). Este repositorio **no contiene ni permite** preguntas filtradas o protegidas por el Acuerdo de Confidencialidad de ExÃ¡menes de Microsoft (*Microsoft Certification Exam NDA*).
> * **No AfiliaciÃ³n y Marcas Registradas:** Este proyecto **no estÃ¡ afiliado, patrocinado, autorizado ni respaldado oficialmente por Microsoft Corporation ni por Pearson Education, Inc. (Pearson VUE)**. *Microsoft, Azure, Microsoft Fabric, OneLake, Power BI y Microsoft Entra* son marcas comerciales o marcas registradas de Microsoft Corporation. *Pearson VUE* es una marca registrada de Pearson Education, Inc. Su menciÃ³n en este proyecto responde exclusivamente a un uso descriptivo y nominativo legÃ­timo para identificar el temario de estudio.
> * **Privacidad (RGPD / GDPR):** La aplicaciÃ³n almacena el progreso y los perfiles Ãºnicamente en el `localStorage` del navegador local del usuario y no recopila datos personales en servidores externos.

