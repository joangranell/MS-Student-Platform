/**
 * scripts/generate-expansion.js
 * Generates technical questions to bring each certification (DP-900, DP-600, DP-700) to exactly 100 questions.
 * Standards: Pearson VUE inspired style, Microsoft Learn verified, detailed rationales, theory pills, exam traps.
 */

import fs from 'fs';
import path from 'path';

// Helper to load and save
function loadJson(relPath) {
  const p = path.resolve(relPath);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJson(relPath, data) {
  const p = path.resolve(relPath);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// -------------------------------------------------------------
// DP-900: 20 Questions (DP900-081 to DP900-100)
// -------------------------------------------------------------
export const dp900Questions = [
  {
    id: "DP900-081",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Azure Synapse SQL Pools vs Spark Pools",
    topicIcon: "warehouse",
    tags: ["Synapse Analytics", "Serverless SQL", "Dedicated SQL", "Spark Pool"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    "caseStudy": null,
    "caseStudyTabs": null,
    "stem": "Tu empresa tiene miles de archivos Parquet y CSV almacenados en Azure Data Lake Storage Gen2. Los analistas necesitan explorar y consultar estos archivos usando sintaxis T-SQL estándar inmediatamente, sin aprovisionar clústeres dedicados de antemano y pagando únicamente por los terabytes de datos procesados por cada consulta. ¿Qué tecnología de Azure Synapse Analytics debes recomendar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Grupo de SQL sin servidor (Serverless SQL pool).",
        "isCorrect": true,
        "rationale": "El grupo de SQL sin servidor de Synapse permite consultar datos directamente en el Data Lake (mediante la función OPENROWSET o vistas externas) con T-SQL, sin infraestructura dedicada y con un modelo de facturación basado en TB procesados."
      },
      {
        id: "opt_2",
        "text": "Grupo de SQL dedicado (Dedicated SQL pool).",
        "isCorrect": false,
        "rationale": "El grupo dedicado requiere aprovisionar DWUs fijas que facturan por hora independientemente de cuántas consultas se ejecuten."
      },
      {
        id: "opt_3",
        "text": "Grupo de Apache Spark (Spark pool).",
        "isCorrect": false,
        "rationale": "Los grupos de Spark ejecutan Scala/Python/PySpark y cobran por nodo y tiempo de ejecución de clúster, no por TB procesados en T-SQL directo."
      },
      {
        id: "opt_4",
        "text": "Azure Event Hubs.",
        "isCorrect": false,
        "rationale": "Event Hubs es un motor de ingesta de streaming en tiempo real, no un motor de consulta analítica T-SQL sobre Data Lake."
      }
    ],
    "explanation": "El Serverless SQL Pool de Azure Synapse Analytics es la herramienta de pago por consulta diseñada para explorar archivos Parquet, Delta y CSV en Data Lake mediante T-SQL sin necesidad de cargar datos en tablas fijas.",
    "theoryPill": {
      "title": "Azure Synapse Serverless SQL vs Dedicated SQL Pools",
      "summary": "Modelos de computación T-SQL sobre almacenamiento en Azure Synapse.",
      "keyPoints": [
        "Serverless SQL: Siempre disponible, sin servidores que administrar, escala automáticamente, cobra por TB procesado.",
        "Dedicated SQL (antiguo SQL DW): Computación aprovisionada (DWU), almacenamiento relacional administrado en tablas distribuidas (Hash, Round-Robin, Replicate).",
        "OPENROWSET: Función T-SQL nativa en Serverless SQL para leer Parquet, CSV y Delta directamente del lago."
      ],
      "examTrap": "Si la pregunta menciona 'consultar archivos ad-hoc en el lago sin pagar por recursos inactivos', la respuesta es Serverless SQL pool.",
      "searchQuery": "Azure Synapse serverless SQL pool overview DP-900"
    },
    "references": [
      {
        "title": "Serverless SQL pool - Azure Synapse Analytics | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/synapse-analytics/sql/on-demand-workspace-overview"
      }
    ]
  },
  {
    id: "DP900-082",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Azure Synapse Data Explorer / Fabric Real-Time Intelligence",
    topicIcon: "kql",
    tags: ["Data Explorer", "KQL", "Telemetry", "Logs", "Real-Time"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una cadena hotelera recopila telemetría de miles de sensores de climatización y registros de eventos web (logs) a una velocidad de 100.000 eventos por segundo. Necesitan analizar patrones temporales, picos de errores y consultas de texto libre con latencia de milisegundos utilizando el lenguaje Kusto Query Language (KQL). ¿Qué servicio analítico de Azure está optimizado específicamente para este escenario?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Azure Synapse Data Explorer (o Azure Data Explorer / Fabric Eventhouse).",
        "isCorrect": true,
        "rationale": "Azure Data Explorer (y Synapse Data Explorer) es el motor analítico de series temporales, registros y telemetría diseñado para ingesta masiva y consultas KQL ultra-rápidas."
      },
      {
        id: "opt_2",
        "text": "Azure SQL Database con tablas OLTP.",
        "isCorrect": false,
        "rationale": "Azure SQL Database está optimizado para transacciones ACID, no para indexación y análisis masivo de telemetría semiestructurada a alta velocidad."
      },
      {
        id: "opt_3",
        "text": "SQL Server Management Studio (SSMS).",
        "isCorrect": false,
        "rationale": "SSMS es una herramienta cliente de administración de bases de datos, no un servicio de computación o almacenamiento en la nube."
      },
      {
        id: "opt_4",
        "text": "Azure Data Factory.",
        "isCorrect": false,
        "rationale": "Data Factory es un orquestador e integrador de datos (ETL/ELT), no un motor de almacenamiento y consulta KQL."
      }
    ],
    "explanation": "Azure Synapse Data Explorer (y Azure Data Explorer / Eventhouse en Fabric) es la plataforma nativa para analizar telemetría, registros y series temporales utilizando KQL (Kusto Query Language).",
    "theoryPill": {
      "title": "Análisis de Registros y Telemetría con KQL y Data Explorer",
      "summary": "Motor de series temporales para análisis en tiempo real en Azure.",
      "keyPoints": [
        "Optimizado para datos de solo adición (append-only) con marcas de tiempo (series temporales, logs, IoT).",
        "Utiliza Kusto Query Language (KQL): sintaxis fluida, rápida y potente para filtrar y agregar millones de filas.",
        "Indexa automáticamente todas las columnas y texto libre.",
        "Soporta ingesta continua con latencias inferiores a un segundo."
      ],
      "examTrap": "Cualquier pregunta en DP-900 que mencione 'KQL', 'telemetría de sensores en tiempo real' o 'análisis de logs de servidor' apunta a Data Explorer.",
      "searchQuery": "Azure Synapse Data Explorer overview DP-900"
    },
    "references": [
      {
        "title": "What is Azure Synapse Data Explorer? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/synapse-analytics/data-explorer/data-explorer-overview"
      }
    ]
  },
  {
    id: "DP900-083",
    certification: "DP-900",
    domain: "Describe considerations for working with non-relational data on Azure",
    topic: "Azure Cosmos DB Gremlin API (Graph Data)",
    topicIcon: "cosmos",
    tags: ["Cosmos DB", "Gremlin", "Graph", "Vertices", "Edges"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una red social profesional necesita almacenar usuarios, empresas y recomendaciones laborales. La aplicación necesita modelar las complejas interconexiones entre usuarios mediante vértices (nodos) y relaciones/conexiones mediante aristas (edges), realizando consultas sobre caminos y grados de separación. ¿Qué API de Azure Cosmos DB debes seleccionar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "API de Gremlin (Graph).",
        "isCorrect": true,
        "rationale": "La API de Gremlin en Cosmos DB implementa el estándar Apache TinkerPop para bases de datos de grafos, modelando entidades como vértices y relaciones como aristas con propiedades enriquecidas."
      },
      {
        id: "opt_2",
        "text": "API de Table.",
        "isCorrect": false,
        "rationale": "La API de Table es un almacén clave-valor simple de pares fila-partición sin capacidad de relacionar grafos ni recorrer caminos de aristas."
      },
      {
        id: "opt_3",
        "text": "API de Cassandra.",
        "isCorrect": false,
        "rationale": "La API de Cassandra está diseñada para modelos de familias de columnas (wide-column), no para traversal de grafos."
      },
      {
        id: "opt_4",
        "text": "API de MongoDB.",
        "isCorrect": false,
        "rationale": "La API de MongoDB almacena documentos BSON/JSON jerárquicos, no grafos nativos de vértices y aristas."
      }
    ],
    "explanation": "La API de Gremlin de Azure Cosmos DB está especializada en datos de grafos (redes sociales, motores de recomendación, detección de fraudes y topologías de red).",
    "theoryPill": {
      "title": "APIs de Azure Cosmos DB y sus Casos de Uso",
      "summary": "Correspondencia de modelos no relacionales y APIs en Cosmos DB.",
      "keyPoints": [
        "API NoSQL (antigua Core): Documentos JSON nativos, consultas con sintaxis SQL.",
        "API Gremlin: Base de datos de grafos (Vértices = entidades, Aristas = relaciones).",
        "API MongoDB: Documentos compatibles con clientes y controladores de MongoDB.",
        "API Cassandra: Familias de columnas (wide-column store).",
        "API Table: Almacén de clave-valor tabular, compatible con Azure Table Storage."
      ],
      "examTrap": "Palabras clave: 'vértices', 'aristas' (edges), 'redes de contactos' o 'grafos' = API de Gremlin.",
      "searchQuery": "Azure Cosmos DB Gremlin API graph DP-900"
    },
    "references": [
      {
        "title": "Introduction to Azure Cosmos DB: Gremlin API | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/cosmos-db/graph/graph-introduction"
      }
    ]
  },
  {
    id: "DP900-084",
    certification: "DP-900",
    domain: "Describe considerations for working with non-relational data on Azure",
    topic: "Azure Cosmos DB Cassandra API",
    topicIcon: "cosmos",
    tags: ["Cosmos DB", "Cassandra", "Wide-Column", "CQL", "Migration"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una empresa tiene una aplicación existente desarrollada para Apache Cassandra que utiliza CQL (Cassandra Query Language) y controladores estándar de Cassandra. Quieren migrar a Azure para beneficiarse de una base de datos distribuida globalmente, con escalabilidad elástica y SLA del 99,999%, pero sin reescribir el código de su aplicación ni cambiar los controladores. ¿Qué opción de Azure Cosmos DB deben utilizar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Azure Cosmos DB con API de Cassandra.",
        "isCorrect": true,
        "rationale": "La API de Cassandra ofrece compatibilidad a nivel de protocolo con CQL v4, permitiendo que las aplicaciones existentes se conecten simplemente cambiando la cadena de conexión."
      },
      {
        id: "opt_2",
        "text": "Azure SQL Database con compatibilidad T-SQL.",
        "isCorrect": false,
        "rationale": "Azure SQL Database requiere T-SQL y modelo relacional, lo que exigiría reescribir toda la aplicación."
      },
      {
        id: "opt_3",
        "text": "Azure Cosmos DB con API NoSQL.",
        "isCorrect": false,
        "rationale": "Aunque es nativa de Cosmos DB, la API NoSQL utiliza sintaxis SQL y SDKs propios, requiriendo modificar el código de la aplicación de Cassandra."
      },
      {
        id: "opt_4",
        "text": "Azure Synapse Spark Pool.",
        "isCorrect": false,
        "rationale": "Spark es un motor de procesamiento por lotes/streaming para analítica, no una base de datos operativa OLTP de reemplazo directo para Cassandra."
      }
    ],
    "explanation": "La API de Cassandra en Azure Cosmos DB proporciona compatibilidad directa con aplicaciones escritas para Apache Cassandra, permitiendo migración 'lift-and-shift' sin cambiar controladores ni código CQL.",
    "theoryPill": {
      "title": "Azure Cosmos DB: API para Apache Cassandra",
      "summary": "Compatibilidad y migración de almacenes de columnas anchas.",
      "keyPoints": [
        "Soporta CQL (Cassandra Query Language) y clientes existentes.",
        "Totalmente administrado: sin aprovisionamiento de nodos, parches de sistema operativo ni compactación manual.",
        "Distribución global multirregión con replicación activa.",
        "Modelo de consistencia de cinco niveles de Cosmos DB."
      ],
      "examTrap": "Si el escenario requiere reutilizar aplicaciones CQL existentes sin modificar el código cliente, la respuesta es la API de Cassandra.",
      "searchQuery": "Azure Cosmos DB for Apache Cassandra DP-900"
    },
    "references": [
      {
        "title": "Introduction to Azure Cosmos DB for Apache Cassandra | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/cosmos-db/cassandra/introduction"
      }
    ]
  },
  {
    id: "DP900-085",
    certification: "DP-900",
    domain: "Describe considerations for working with non-relational data on Azure",
    topic: "Azure Blob Storage Access Tiers",
    topicIcon: "cosmos",
    tags: ["Blob Storage", "Access Tiers", "Hot", "Cool", "Cold", "Archive"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un departamento legal debe conservar copias de contratos firmados durante 10 años por motivos regulatorios. Los documentos prácticamente nunca se consultan (menos de una vez al año), pero si se solicitan en una auditoría es aceptable esperar varias horas para rehidratarlos y descargarlos. Se requiere el coste de almacenamiento por gigabyte más bajo posible. ¿Qué nivel de acceso de Azure Blob Storage debes seleccionar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Nivel de archivo (Archive tier).",
        "isCorrect": true,
        "rationale": "El nivel Archive ofrece el coste de almacenamiento de datos en reposo más bajo con diferencia. Permanece sin conexión y requiere un proceso de rehidratación que puede tardar hasta 15 horas en prioridad estándar."
      },
      {
        id: "opt_2",
        "text": "Nivel frecuente (Hot tier).",
        "isCorrect": false,
        "rationale": "El nivel frecuente tiene el mayor coste de almacenamiento por GB y el menor coste de acceso; está pensado para datos de consulta diaria continua."
      },
      {
        id: "opt_3",
        "text": "Nivel esporádico (Cool tier).",
        "isCorrect": false,
        "rationale": "El nivel Cool está optimizado para datos a los que se accede al menos una vez al mes (mínimo 30 días de retención)."
      },
      {
        id: "opt_4",
        "text": "Nivel frío (Cold tier).",
        "isCorrect": false,
        "rationale": "El nivel Cold es intermedio entre Cool y Archive (mínimo 90 días de retención), pero sigue siendo en línea y más caro por GB que Archive."
      }
    ],
    "explanation": "El nivel Archive (Archivo) en Azure Blob Storage está diseñado para datos históricos a largo plazo raramente consultados, ofreciendo el coste de almacenamiento más bajo a cambio de un tiempo de rehidratación de varias horas.",
    "theoryPill": {
      "title": "Niveles de Acceso de Azure Blob Storage (Hot, Cool, Cold, Archive)",
      "summary": "Optimización de costes de almacenamiento según la frecuencia de acceso.",
      "keyPoints": [
        "Hot (Frecuente): Mayor coste de almacenamiento, menor coste de lectura/transacción. Acceso continuo.",
        "Cool (Esporádico): Menor coste de almacenamiento, mayor coste de lectura. Acceso al menos una vez cada 30 días.",
        "Cold (Frío): Coste de almacenamiento intermedio entre Cool y Archive. Acceso mínimo cada 90 días.",
        "Archive (Archivo): Coste de almacenamiento ultra bajo, el más alto por lectura. Datos sin conexión (offline); requiere rehidratación (horas)."
      ],
      "examTrap": "Si la pregunta indica que es aceptable una latencia de recuperación de varias horas para obtener el menor coste de almacenamiento a largo plazo, la respuesta es siempre Archive.",
      "searchQuery": "Azure Blob storage access tiers Hot Cool Cold Archive DP-900"
    },
    "references": [
      {
        "title": "Access tiers for blob data - Azure Storage | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview"
      }
    ]
  },
  {
    id: "DP900-086",
    certification: "DP-900",
    domain: "Identify considerations for relational data on Azure",
    topic: "Azure SQL Database Elastic Pools",
    topicIcon: "sql",
    tags: ["Azure SQL", "Elastic Pools", "eDTU", "vCore", "Multi-Tenant", "Cost Optimization"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una empresa de software como servicio (SaaS) gestiona 150 bases de datos Azure SQL individuales, una para cada cliente corporativo. La mayoría de los clientes tienen patrones de uso impredecibles con picos de actividad breves en diferentes momentos del día, mientras que en otros momentos están prácticamente inactivas. Asignar recursos dedicados independientes a cada base de datos resulta financieramente ineficiente. ¿Qué solución de Azure SQL Database permite agrupar y compartir recursos de CPU y memoria a un coste consolidado?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Grupos elásticos de Azure SQL (Elastic Pools).",
        "isCorrect": true,
        "rationale": "Los grupos elásticos permiten que múltiples bases de datos individuales compartan un conjunto común de recursos de cómputo (eDTUs o vCores) a un precio fijo, adaptándose a demandas variables e impredecibles sin sobredimensionar cada base de datos."
      },
      {
        id: "opt_2",
        "text": "Instancia administrada de Azure SQL en modo Always On.",
        "isCorrect": false,
        "rationale": "Managed Instance proporciona compatibilidad con SQL Server a nivel de instancia completa, pero no es la característica específica de optimización de costes para múltiples bases de datos individuales con picos alternos."
      },
      {
        id: "opt_3",
        "text": "Tablas temporales en Azure SQL Database.",
        "isCorrect": false,
        "rationale": "Las tablas temporales sirven para mantener el historial de cambios en datos relacionales a lo largo del tiempo, no para compartir recursos de infraestructura."
      },
      {
        id: "opt_4",
        "text": "Clústeres de Azure Cosmos DB en modo Serverless.",
        "isCorrect": false,
        "rationale": "Cosmos DB es una base de datos NoSQL y no aloja bases de datos relacionales Azure SQL existentes."
      }
    ],
    "explanation": "Los grupos elásticos de Azure SQL Database están diseñados para patrones SaaS multi-tenant donde muchas bases de datos comparten un presupuesto común de recursos elásticos que absorbe los picos de uso alternados.",
    "theoryPill": {
      "title": "Grupos Elásticos de Azure SQL Database (Elastic Pools)",
      "summary": "Gestión rentable de múltiples bases de datos relacionales con cargas variables.",
      "keyPoints": [
        "Un grupo elástico adquiere un paquete de recursos (eDTU o vCore elásticos) compartido por todas las bases de datos del grupo.",
        "Las bases de datos individuales escalan dentro de límites mínimos y máximos configurables.",
        "Ideal para aplicaciones SaaS con cientos de bases de datos de clientes donde los picos de demanda no coinciden en el tiempo.",
        "Simplifica la administración presupuestaria al pagar por el grupo en lugar de facturar 100+ bases de datos por separado."
      ],
      "examTrap": "Múltiples bases de datos Azure SQL con 'patrones de uso variables' y necesidad de 'compartir recursos' = Grupos elásticos (Elastic Pools).",
      "searchQuery": "Azure SQL Database elastic pools SaaS DP-900"
    },
    "references": [
      {
        "title": "Elastic pools in Azure SQL Database | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview"
      }
    ]
  },
  {
    id: "DP900-087",
    certification: "DP-900",
    domain: "Describe considerations for working with non-relational data on Azure",
    topic: "Azure Cosmos DB Consistency Levels",
    topicIcon: "cosmos",
    tags: ["Cosmos DB", "Consistency", "Strong", "Session", "Eventual", "SLA"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En Azure Cosmos DB, necesitas comprender los diferentes niveles de coherencia de datos configurables. ¿Cuál es el nivel de coherencia predeterminado (default) que proporciona lectura de las propias escrituras (read-your-own-writes) para una sesión de usuario única, garantizando una excelente relación entre rendimiento, disponibilidad y precisión de lectura?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Coherencia de sesión (Session consistency).",
        "isCorrect": true,
        "rationale": "La coherencia de sesión es la opción predeterminada en Cosmos DB. Ofrece garantías monótonas de lectura y lectura de escrituras propias para la sesión activa, siendo ideal para aplicaciones web y móviles."
      },
      {
        id: "opt_2",
        "text": "Coherencia fuerte (Strong consistency).",
        "isCorrect": false,
        "rationale": "Strong ofrece linearizabilidad estricta (las lecturas siempre ven la última escritura confirmada), pero tiene el mayor coste en latencia y no está disponible en réplicas multirregión con escritura en múltiples regiones."
      },
      {
        id: "opt_3",
        "text": "Coherencia eventual (Eventual consistency).",
        "isCorrect": false,
        "rationale": "Eventual es el nivel más relajado: ofrece la menor latencia y mayor rendimiento, pero no garantiza el orden de lectura ni que un usuario vea sus propias actualizaciones inmediatamente."
      },
      {
        id: "opt_4",
        "text": "Coherencia ACID absoluta.",
        "isCorrect": false,
        "rationale": "'Coherencia ACID absoluta' no es uno de los 5 niveles de coherencia bien definidos de Azure Cosmos DB."
      }
    ],
    "explanation": "Session (Sesión) es el nivel de coherencia predeterminado de Azure Cosmos DB y el más utilizado, ya que proporciona lectura de las propias escrituras para la sesión de cliente sin el sobrecoste de latencia de Strong.",
    "theoryPill": {
      "title": "Los 5 Niveles de Coherencia de Azure Cosmos DB",
      "summary": "Espectro de consistencia frente a disponibilidad y latencia (Teorema CAP).",
      "keyPoints": [
        "1. Strong (Fuerte): Cero desfase, lecturas siempre devuelven la última versión escrita. Mayor latencia.",
        "2. Bounded Staleness (Obsolescencia delimitada): Desfase máximo acotado por K versiones o T tiempo.",
        "3. Session (Sesión - Predeterminado): Garantiza 'read-your-own-writes' en la misma sesión; ideal para carritos de compra y perfiles.",
        "4. Consistent Prefix (Prefijo coherente): Las lecturas nunca ven escrituras desordenadas.",
        "5. Eventual (Eventual): Máximo rendimiento y disponibilidad, pero sin garantías de orden inmediato."
      ],
      "examTrap": "¿Nivel de coherencia predeterminado de Cosmos DB? Siempre es 'Session'.",
      "searchQuery": "Azure Cosmos DB five consistency levels session DP-900"
    },
    "references": [
      {
        "title": "Consistency levels in Azure Cosmos DB | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels"
      }
    ]
  },
  {
    id: "DP900-088",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Power BI Data Alerts vs Scheduled Refresh",
    topicIcon: "powerbi",
    tags: ["Power BI", "Data Alerts", "Dashboards", "KPI", "Notifications"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un director financiero tiene un panel (dashboard) en el servicio Power BI con un icono (tile) que muestra el gasto mensual acumulado. Desea recibir una notificación automática en su teléfono móvil y por correo electrónico si el gasto supera los 50.000 EUR tras cualquier actualización de datos. ¿Qué funcionalidad de Power BI se debe configurar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Una alerta de datos (Data Alert) en el icono del panel de Power BI.",
        "isCorrect": true,
        "rationale": "Las alertas de datos de Power BI se pueden configurar en tarjetas (cards), indicadores (gauges) o KPIs anclados en paneles para enviar notificaciones cuando un valor supera o desciende de un umbral específico."
      },
      {
        id: "opt_2",
        "text": "Un marcador (Bookmark) en Power BI Desktop.",
        "isCorrect": false,
        "rationale": "Los marcadores sirven para guardar el estado visual y los filtros de una página de informe, no para enviar alertas automáticas basadas en umbrales de datos."
      },
      {
        id: "opt_3",
        "text": "Un parámetro de tipo 'What-if' en DAX.",
        "isCorrect": false,
        "rationale": "Los parámetros What-if permiten a los usuarios simular escenarios interactivos en el informe, no generar notificaciones push."
      },
      {
        id: "opt_4",
        "text": "Exportar el informe a formato PDF cada medianoche.",
        "isCorrect": false,
        "rationale": "Exportar a PDF genera un documento estático pero no envía alertas condicionales automáticas basadas en límites numéricos."
      }
    ],
    "explanation": "En Power BI, las alertas de datos (Data Alerts) solo se pueden configurar en iconos de paneles (dashboards) que contengan métricas numéricas individuales (tarjetas, medidores o KPIs).",
    "theoryPill": {
      "title": "Alertas de Datos en Paneles de Power BI",
      "summary": "Supervisión proactiva y notificaciones en tiempo real en Power BI.",
      "keyPoints": [
        "Solo disponibles en elementos anclados a paneles (Dashboards), no directamente en páginas de informes (Reports).",
        "Requieren tipos visuales numéricos específicos: Tarjetas (Card), Medidores (Gauge) o KPIs.",
        "Se evalúan cada vez que el modelo semántico subyacente se actualiza.",
        "Pueden desencadenar flujos automatizados en Microsoft Power Automate además del correo y notificación móvil."
      ],
      "examTrap": "Las alertas de datos se configuran en PANALES (Dashboards), NO en Informes (Reports).",
      "searchQuery": "Power BI set data alerts on dashboard tiles DP-900"
    },
    "references": [
      {
        "title": "Set data alerts in the Power BI service | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/service-set-data-alerts"
      }
    ]
  },
  {
    id: "DP900-089",
    certification: "DP-900",
    domain: "Identify considerations for relational data on Azure",
    topic: "Azure Data Studio vs SSMS",
    topicIcon: "sql",
    tags: ["Azure Data Studio", "SSMS", "Cross-Platform", "macOS", "Linux", "Notebooks"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un equipo de desarrolladores que utiliza estaciones de trabajo con macOS y Linux necesita una herramienta ligera para conectarse a Azure SQL Database, escribir consultas T-SQL y ejecutar cuadernos de notas ejecutables (SQL Notebooks). ¿Qué herramienta moderna y multiplataforma de Microsoft deben utilizar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Azure Data Studio.",
        "isCorrect": true,
        "rationale": "Azure Data Studio es la herramienta de código abierto y multiplataforma (Windows, macOS, Linux) de Microsoft, diseñada para desarrolladores de datos y analistas, con soporte integrado para SQL Notebooks."
      },
      {
        id: "opt_2",
        "text": "SQL Server Management Studio (SSMS).",
        "isCorrect": false,
        "rationale": "SSMS es una herramienta muy completa de administración profunda de SQL Server, pero es exclusiva de Windows y no funciona de forma nativa en macOS ni Linux."
      },
      {
        id: "opt_3",
        "text": "Microsoft Word.",
        "isCorrect": false,
        "rationale": "Word es un procesador de textos de oficina y no puede conectarse ni ejecutar consultas en bases de datos relacionales."
      },
      {
        id: "opt_4",
        "text": "Bloc de notas de Windows (Notepad).",
        "isCorrect": false,
        "rationale": "El Bloc de notas es un editor de texto plano sin capacidades de conexión a bases de datos ni ejecución de notebooks."
      }
    ],
    "explanation": "Azure Data Studio es la solución moderna multiplataforma (Windows, macOS y Linux) para desarrollo de consultas, edición de T-SQL y SQL Notebooks.",
    "theoryPill": {
      "title": "Azure Data Studio vs SQL Server Management Studio (SSMS)",
      "summary": "Herramientas de cliente para administración y desarrollo relacional.",
      "keyPoints": [
        "Azure Data Studio: Multiplataforma (Windows, macOS, Linux), basada en Electron/VS Code, ligera, orientada al desarrollo y soporte de SQL Notebooks.",
        "SSMS (SQL Server Management Studio): Solo Windows, orientada a la administración completa de infraestructura (configuración de servidor, planes de mantenimiento, replicación, Profiler).",
        "Ambas herramientas se conectan a SQL Server local, Azure SQL Database y Azure SQL Managed Instance."
      ],
      "examTrap": "Si la pregunta menciona 'desarrolladores en macOS o Linux' o 'SQL Notebooks', la herramienta correcta es Azure Data Studio.",
      "searchQuery": "Azure Data Studio vs SSMS DP-900"
    },
    "references": [
      {
        "title": "What is Azure Data Studio? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure-data-studio/what-is-azure-data-studio"
      }
    ]
  },
  {
    id: "DP900-090",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Azure Synapse Link for Cosmos DB (HTAP)",
    topicIcon: "warehouse",
    tags: ["Synapse Link", "Cosmos DB", "HTAP", "Analytical Store", "ETL-Free"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una tienda de comercio electrónico procesa pedidos en tiempo real con Azure Cosmos DB. Los analistas de negocio necesitan ejecutar consultas de inteligencia empresarial complejas y agregaciones masivas sobre estos pedidos sin consumir las unidades de solicitud (RU) del sistema transaccional ni diseñar complejas canalizaciones de extracción (ETL). ¿Qué funcionalidad nativa sin servidor permite sincronizar los datos en un almacén columnar analítico para su análisis directo?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Azure Synapse Link para Azure Cosmos DB.",
        "isCorrect": true,
        "rationale": "Synapse Link habilita un almacén analítico columnar completamente aislado dentro de Cosmos DB que se sincroniza automáticamente sin afectar a las RU transaccionales ni requerir procesos ETL."
      },
      {
        id: "opt_2",
        "text": "Una canalización por lotes de Azure Data Factory ejecutándose cada 5 minutos.",
        "isCorrect": false,
        "rationale": "Crear canalizaciones ETL consume unidades de solicitud (RU) de lectura en Cosmos DB y añade coste y latencia de mantenimiento."
      },
      {
        id: "opt_3",
        "text": "Exportar manualmente los datos a archivos CSV diarios mediante PowerShell.",
        "isCorrect": false,
        "rationale": "Es un proceso manual, propenso a fallos y no proporciona capacidades analíticas HTAP en tiempo real."
      },
      {
        id: "opt_4",
        "text": "Aumentar al máximo las RU aprovisionadas de la base de datos transaccional.",
        "isCorrect": false,
        "rationale": "Aumentar RUs para absorber consultas analíticas en el almacén de filas transaccional resulta desorbitadamente costoso y no resuelve el aislamiento de cargas."
      }
    ],
    "explanation": "Azure Synapse Link para Azure Cosmos DB implementa una arquitectura HTAP (procesamiento analítico y transaccional híbrido) nativa en la nube, sincronizando automáticamente los datos con un almacén columnar sin consumir RUs transaccionales.",
    "theoryPill": {
      "title": "Azure Synapse Link y Arquitectura HTAP",
      "summary": "Analítica en tiempo real sobre almacenes operacionales sin canalizaciones ETL.",
      "keyPoints": [
        "HTAP: Hybrid Transactional and Analytical Processing.",
        "Almacén transaccional (Transactional Store): Basado en filas, indexado, optimizado para lecturas/escrituras rápidas con RUs.",
        "Almacén analítico (Analytical Store): Columnar, optimizado para agregaciones a gran escala, sin coste de RUs.",
        "Sincronización automática de baja latencia sin impacto en el rendimiento de la aplicación transaccional."
      ],
      "examTrap": "'Consultas analíticas sobre Cosmos DB sin consumir RUs y sin procesos ETL' = Azure Synapse Link.",
      "searchQuery": "Azure Synapse Link for Cosmos DB HTAP DP-900"
    },
    "references": [
      {
        "title": "What is Azure Synapse Link for Azure Cosmos DB? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/cosmos-db/synapse-link"
      }
    ]
  },
  {
    id: "DP900-091",
    certification: "DP-900",
    domain: "Identify considerations for relational data on Azure",
    topic: "Azure SQL Database Hyperscale",
    topicIcon: "sql",
    tags: ["Azure SQL", "Hyperscale", "Storage", "Rapid Scaling", "100TB"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una entidad financiera internacional prevé que su base de datos transaccional superará los 16 TB de almacenamiento en los próximos 12 meses, pudiendo llegar hasta los 100 TB. Además, requieren copias de seguridad de instantánea rápidas independientemente del tamaño del volumen y escalado vertical casi instantáneo de cómputo. ¿Qué nivel de servicio de Azure SQL Database deben seleccionar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Nivel de servicio Hyperscale (Hiperescala).",
        "isCorrect": true,
        "rationale": "El nivel Hyperscale desacopla el almacenamiento del cómputo, admite bases de datos de hasta 100 TB de tamaño con escalado rápido y copias de seguridad instantáneas basadas en almacenamiento."
      },
      {
        id: "opt_2",
        "text": "Nivel de servicio De uso general (General Purpose).",
        "isCorrect": false,
        "rationale": "General Purpose tiene límites de almacenamiento significativamente más bajos (hasta 4 TB en base de datos única estándar) y tiempos de restauración proporcionales al volumen de datos."
      },
      {
        id: "opt_3",
        "text": "Nivel de servicio Crítico para la empresa (Business Critical).",
        "isCorrect": false,
        "rationale": "Business Critical ofrece la latencia de E/S más baja usando almacenamiento SSD local, pero su límite máximo de tamaño estándar es de 4 TB, no los 100 TB de Hyperscale."
      },
      {
        id: "opt_4",
        "text": "Azure Table Storage.",
        "isCorrect": false,
        "rationale": "Table Storage es un almacén NoSQL no relacional que no soporta consultas ni transacciones SQL ACID completas."
      }
    ],
    "explanation": "Azure SQL Database Hyperscale utiliza una arquitectura distribuida por niveles que escala automáticamente el almacenamiento hasta 100 TB, ofreciendo escalado de computación independiente y backups basados en snapshots instantáneos.",
    "theoryPill": {
      "title": "Niveles de Servicio en Azure SQL Database: General Purpose, Business Critical y Hyperscale",
      "summary": "Selección de arquitectura según volumen de datos y requerimientos de latencia.",
      "keyPoints": [
        "General Purpose: Cargas de trabajo de uso general, almacenamiento remoto Azure Storage estándar, el más económico.",
        "Business Critical: Almacenamiento SSD local conectado directamente, menor latencia de lectura/escritura, réplicas Always On integradas.",
        "Hyperscale: Arquitectura desacoplada de almacenamiento por capas (Page Servers), soporte de hasta 100 TB+, copias de seguridad y restauraciones instantáneas."
      ],
      "examTrap": "Bases de datos relacionales de más de 4 TB (hasta 100 TB) con backups instantáneos = Hyperscale.",
      "searchQuery": "Azure SQL Database Hyperscale service tier DP-900"
    },
    "references": [
      {
        "title": "Hyperscale service tier - Azure SQL Database | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tier-hyperscale"
      }
    ]
  },
  {
    id: "DP900-092",
    certification: "DP-900",
    domain: "Describe core data concepts",
    topic: "Procesamiento por Lotes (Batch) vs Procesamiento en Tiempo Real (Streaming)",
    topicIcon: "pipeline",
    tags: ["Batch", "Streaming", "Data Processing", "Latency", "Event Hubs"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Cuál de las siguientes afirmaciones describe con precisión una diferencia clave entre el procesamiento de datos por lotes (batch processing) y el procesamiento de datos en streaming (tiempo real)?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "El procesamiento por lotes recopila y procesa conjuntos masivos de datos a intervalos regulares programados, mientras que el procesamiento en streaming analiza los registros individualmente o en pequeñas ventanas de tiempo a medida que se generan.",
        "isCorrect": true,
        "rationale": "Correcto. El procesamiento por lotes opera sobre datos en reposo a intervalos periódicos (ej. cada noche), mientras que el procesamiento en streaming procesa flujos continuos de datos en movimiento con latencias de segundos o milisegundos."
      },
      {
        id: "opt_2",
        "text": "El procesamiento en streaming solo admite datos relacionales, mientras que el procesamiento por lotes solo admite archivos de texto.",
        "isCorrect": false,
        "rationale": "Ambos paradigmas admiten datos estructurados, semiestructurados y no estructurados."
      },
      {
        id: "opt_3",
        "text": "El procesamiento por lotes siempre tarda más de una semana en ejecutarse.",
        "isCorrect": false,
        "rationale": "Los trabajos por lotes pueden ejecutarse en minutos u horas según el volumen y la capacidad de cómputo."
      },
      {
        id: "opt_4",
        "text": "El procesamiento en streaming nunca permite calcular promedios ni sumas agregadas.",
        "isCorrect": false,
        "rationale": "El procesamiento en streaming realiza agregaciones continuas usando ventanas temporales (Tumbling, Hopping, Sliding)."
      }
    ],
    "explanation": "El procesamiento por lotes (Batch) maneja grandes bloques de datos históricos a intervalos periódicos, mientras que el procesamiento en streaming evalúa eventos de manera continua en tiempo real.",
    "theoryPill": {
      "title": "Procesamiento por Lotes (Batch) vs Procesamiento en Streaming",
      "summary": "Conceptos fundamentales de procesamiento de datos en Azure.",
      "keyPoints": [
        "Batch (Lotes): Datos históricos en reposo, volumen elevado, latencia tolerable (minutos a horas), programado periódicamente.",
        "Streaming (Flujo continuo): Datos en movimiento, baja latencia (milisegundos a segundos), procesamiento de eventos individuales o ventanas continuas.",
        "Servicios Azure para Batch: Azure Data Factory, Azure Synapse Spark, Fabric Data Pipelines.",
        "Servicios Azure para Streaming: Azure Event Hubs, Azure Stream Analytics, Fabric Real-Time Intelligence."
      ],
      "examTrap": "Si la pregunta requiere 'análisis inmediato de eventos continuos a medida que llegan', la solución es streaming, no procesamiento por lotes.",
      "searchQuery": "Batch processing vs streaming processing Azure DP-900"
    },
    "references": [
      {
        "title": "Choose a batch processing technology in Azure | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/batch-processing"
      }
    ]
  },
  {
    id: "DP900-093",
    certification: "DP-900",
    domain: "Describe core data concepts",
    topic: "Normalización de Bases de Datos Relacionales",
    topicIcon: "sql",
    tags: ["Relational", "Normalization", "Redundancy", "Data Integrity", "Foreign Keys"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Cuál es el objetivo principal del proceso de normalización en el diseño de una base de datos relacional (RDBMS)?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Reducir la redundancia de datos, evitar anomalías en las operaciones de inserción, actualización y borrado, y mejorar la integridad de los datos.",
        "isCorrect": true,
        "rationale": "La normalización descompone tablas complejas en tablas más pequeñas y bien estructuradas conectadas por claves foráneas para eliminar duplicidades innecesarias y anomalías de modificación."
      },
      {
        id: "opt_2",
        "text": "Combinar todas las tablas en una única tabla desnormalizada de 500 columnas para evitar los JOINs.",
        "isCorrect": false,
        "rationale": "Eso describe la desnormalización, común en almacenes de datos analíticos, pero lo opuesto a la normalización relacional."
      },
      {
        id: "opt_3",
        "text": "Convertir todas las bases de datos relacionales en colecciones NoSQL de documentos JSON.",
        "isCorrect": false,
        "rationale": "La normalización es una técnica puramente relacional del modelo Codd."
      },
      {
        id: "opt_4",
        "text": "Eliminar todas las claves primarias de las tablas para acelerar las inserciones.",
        "isCorrect": false,
        "rationale": "Las claves primarias son esenciales para la integridad de una base de datos normalizada."
      }
    ],
    "explanation": "La normalización relacional busca estructurar los datos minimizando la redundancia y asegurando que las dependencias lógicas tengan sentido, evitando anomalías transaccionales.",
    "theoryPill": {
      "title": "Normalización vs Desnormalización de Datos",
      "summary": "Diseño relacional transaccional (OLTP) frente a diseño analítico (OLAP).",
      "keyPoints": [
        "Normalización (OLTP): Muchas tablas relacionadas, evita redundancias, optimiza escrituras y transacciones (INSERT/UPDATE/DELETE).",
        "Formas normales: 1FN (atomicidad), 2FN (dependencia funcional completa), 3FN (sin dependencias transitivas).",
        "Desnormalización (OLAP / Data Warehouse): Menos tablas, duplicidad controlada, optimiza lecturas masivas y agregaciones evitando JOINs costosos."
      ],
      "examTrap": "OLTP favorece la normalización (integridad y escritura rápida); los Almacenes de Datos / OLAP favorecen la desnormalización (esquema en estrella).",
      "searchQuery": "Database normalization concepts relational DP-900"
    },
    "references": [
      {
        "title": "Relational data concepts - Microsoft Learn | DP-900",
        "url": "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/"
      }
    ]
  },
  {
    id: "DP900-094",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Esquema en Estrella: Tablas de Hechos vs Tablas de Dimensiones",
    topicIcon: "warehouse",
    tags: ["Star Schema", "Fact Tables", "Dimension Tables", "OLAP", "Data Warehouse"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo dimensional en esquema de estrella para un almacén de datos (Data Warehouse), ¿cuál es la función de una tabla de dimensiones (Dimension table)?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Proporcionar el contexto descriptivo (como cliente, producto, tienda o tiempo) para filtrar, agrupar y etiquetar los datos numéricos de negocio.",
        "isCorrect": true,
        "rationale": "Las tablas de dimensiones contienen atributos descriptivos cualitativos (quién, qué, dónde, cuándo) que se usan para filtrar y desglosar las métricas numéricas de las tablas de hechos."
      },
      {
        id: "opt_2",
        "text": "Almacenar exclusivamente métricas cuantitativas y valores medibles de transacciones (como importe de venta y cantidad).",
        "isCorrect": false,
        "rationale": "Eso describe una tabla de hechos (Fact table), no una tabla de dimensiones."
      },
      {
        id: "opt_3",
        "text": "Alojar los registros de auditoría del sistema operativo de los servidores de Azure.",
        "isCorrect": false,
        "rationale": "Las dimensiones son entidades de negocio del modelo dimensional de datos, no registros de infraestructura."
      },
      {
        id: "opt_4",
        "text": "Reemplazar los cortafuegos de red en Azure Virtual Networks.",
        "isCorrect": false,
        "rationale": "No tiene ninguna relación con la seguridad de redes de Azure."
      }
    ],
    "explanation": "En un esquema en estrella, las tablas de dimensiones proporcionan los atributos descriptivos para rebanar y filtrar (slice and dice), mientras que las tablas de hechos registran los eventos numéricos o métricas de negocio.",
    "theoryPill": {
      "title": "Esquema en Estrella: Hechos (Facts) y Dimensiones (Dimensions)",
      "summary": "Estructura estándar de modelado para almacenes de datos y Power BI.",
      "keyPoints": [
        "Tabla de hechos (Fact Table): Contiene medidas numéricas aditivas (importe vendido, unidades, costes) y claves foráneas hacia las dimensiones.",
        "Tabla de dimensiones (Dimension Table): Contiene atributos descriptivos (nombre del cliente, categoría de producto, ciudad, fecha).",
        "Esquema en estrella (Star Schema): Una tabla de hechos central rodeada de múltiples dimensiones independientes conectadas mediante relaciones de uno a varios."
      ],
      "examTrap": "Las métricas numéricas van en Hechos (Facts); los textos, filtros y categorías van en Dimensiones (Dimensions).",
      "searchQuery": "Star schema dimension and fact tables DP-900"
    },
    "references": [
      {
        "title": "Understand star schema and the importance for Power BI | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"
      }
    ]
  },
  {
    id: "DP900-095",
    certification: "DP-900",
    domain: "Identify considerations for relational data on Azure",
    topic: "Azure Database for PostgreSQL Flexible Server",
    topicIcon: "sql",
    tags: ["PostgreSQL", "Flexible Server", "Open Source", "Linux", "Stop/Start"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una startup utiliza una base de datos relacional de código abierto PostgreSQL para su entorno de desarrollo. Necesitan una base de datos totalmente administrada en Azure que les permita pausar y reanudar el servidor durante los fines de semana para ahorrar costes de computación, además de elegir zonas de disponibilidad específicas. ¿Qué opción de base de datos relacional administrada de Azure deben desplegar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Azure Database for PostgreSQL: Servidor flexible (Flexible Server).",
        "isCorrect": true,
        "rationale": "Flexible Server es la opción de implementación moderna recomendada para PostgreSQL en Azure. Admite controles pormenorizados de costes (incluyendo detener e iniciar el servidor para no facturar cómputo), alta disponibilidad en zonas de disponibilidad redundantes y ajustes de configuración del motor."
      },
      {
        id: "opt_2",
        "text": "Azure SQL Database.",
        "isCorrect": false,
        "rationale": "Azure SQL Database utiliza el motor relacional de Microsoft SQL Server / T-SQL, no PostgreSQL."
      },
      {
        id: "opt_3",
        "text": "Azure Cosmos DB con API para MongoDB.",
        "isCorrect": false,
        "rationale": "Esta opción proporciona una base de datos de documentos NoSQL, no una base de datos relacional PostgreSQL."
      },
      {
        id: "opt_4",
        "text": "Azure Data Lake Storage Gen2.",
        "isCorrect": false,
        "rationale": "ADLS Gen2 es un sistema de archivos para almacenamiento de objetos, no un motor de base de datos relacional PostgreSQL."
      }
    ],
    "explanation": "Azure Database for PostgreSQL Flexible Server es la oferta PaaS insignia para PostgreSQL en Azure, permitiendo detener/iniciar el servicio para optimizar costes y configurar alta disponibilidad entre zonas.",
    "theoryPill": {
      "title": "Bases de Datos de Código Abierto Administradas en Azure: PostgreSQL y MySQL",
      "summary": "Servicios relacionales PaaS para comunidades de código abierto.",
      "keyPoints": [
        "Azure Database for PostgreSQL Flexible Server: Alta disponibilidad con redundancia de zona, parada/inicio de servidor, escalado independiente de cómputo y almacenamiento.",
        "Azure Database for MySQL Flexible Server: Equivalente para cargas de trabajo MySQL LAMP/WordPress.",
        "Mantenimiento automatizado, parches de seguridad, copias de seguridad continuas y cifrado en reposo integrado."
      ],
      "examTrap": "Para PostgreSQL en Azure con capacidad de 'detener el servidor para ahorrar costes' y control de zonas, la respuesta es Servidor Flexible (Flexible Server).",
      "searchQuery": "Azure Database for PostgreSQL Flexible Server DP-900"
    },
    "references": [
      {
        "title": "Overview - Azure Database for PostgreSQL Flexible Server | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview"
      }
    ]
  },
  {
    id: "DP900-096",
    certification: "DP-900",
    domain: "Describe considerations for working with non-relational data on Azure",
    topic: "Azure Cosmos DB Partition Key Selection",
    topicIcon: "cosmos",
    tags: ["Cosmos DB", "Partition Key", "High Cardinality", "Hot Partitions", "Scale"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Estás diseñando un contenedor de Azure Cosmos DB para una aplicación de seguimiento de envíos de paquetes que procesará millones de lecturas y escrituras al día. Para garantizar una distribución uniforme del almacenamiento y de las unidades de solicitud (RU) evitando la aparición de particiones activas saturadas ('hot partitions'), ¿qué característica debe tener una buena clave de partición (Partition Key)?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Tener una cardinalidad alta (muchos valores distintos posibles) y distribuir el volumen de solicitudes de forma uniforme a lo largo del tiempo.",
        "isCorrect": true,
        "rationale": "Una buena clave de partición en Cosmos DB debe poseer una cardinalidad elevada (ej. deviceId, trackingId o customerId) para distribuir tanto los datos almacenados como el consumo de RU entre todas las particiones físicas sin cuellos de botella."
      },
      {
        id: "opt_2",
        "text": "Tener únicamente dos valores posibles (como 'Activo' o 'Inactivo') para agrupar todos los datos.",
        "isCorrect": false,
        "rationale": "Tener pocos valores posibles crea particiones saturadas (hot partitions) que agotan rápidamente los límites de 20 GB de almacenamiento por partición lógica y degradan el rendimiento."
      },
      {
        id: "opt_3",
        "text": "Ser obligatoriamente un campo numérico con valor cero en todos los documentos.",
        "isCorrect": false,
        "rationale": "Si todos los documentos tienen el mismo valor de partición, todos se almacenarán en la misma partición física, eliminando las ventajas de escalado distribuido."
      },
      {
        id: "opt_4",
        "text": "Cambiar de valor en cada lectura que realice la aplicación.",
        "isCorrect": false,
        "rationale": "La clave de partición identifica la partición lógica del documento en el almacenamiento y no cambia en las lecturas."
      }
    ],
    "explanation": "Una clave de partición óptima en Azure Cosmos DB debe tener una alta cardinalidad y una tasa de acceso equilibrada para evitar concentrar las solicitudes en una sola partición física.",
    "theoryPill": {
      "title": "Diseño de Claves de Partición en Azure Cosmos DB",
      "summary": "Estrategia esencial para el escalado horizontal ilimitado.",
      "keyPoints": [
        "Partición lógica: Conjunto de elementos que comparten la misma clave de partición (límite de 20 GB por partición lógica).",
        "Partición física: Servidores de infraestructura administrados internamente por Azure para alojar particiones lógicas.",
        "Criterios de una buena clave: Alta cardinalidad, distribución uniforme de escrituras y lecturas, uso frecuente en cláusulas WHERE.",
        "Evitar: Claves con pocos valores (género, estado civil) o fechas donde todos los usuarios escriben en la partición 'hoy'."
      ],
      "examTrap": "'Hot partition' se previene eligiendo claves con ALTA CARDINALIDAD y distribución uniforme.",
      "searchQuery": "Partitioning and horizontal scaling in Azure Cosmos DB DP-900"
    },
    "references": [
      {
        "title": "Partitioning and horizontal scaling in Azure Cosmos DB | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview"
      }
    ]
  },
  {
    id: "DP900-097",
    certification: "DP-900",
    domain: "Describe considerations for working with non-relational data on Azure",
    topic: "Azure Data Lake Storage Gen2: Hierarchical Namespace (HNS)",
    topicIcon: "onelake",
    tags: ["ADLS Gen2", "Hierarchical Namespace", "HNS", "POSIX", "Big Data", "Blob"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Qué característica fundamental diferencia a Azure Data Lake Storage Gen2 de un contenedor estándar de Azure Blob Storage, permitiendo operaciones atómicas sobre directorios (como renombrar o mover carpetas enteras de petabytes al instante sin copiar archivos uno a uno)?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "El espacio de nombres jerárquico (Hierarchical Namespace - HNS).",
        "isCorrect": true,
        "rationale": "El espacio de nombres jerárquico organiza los objetos en una jerarquía real de directorios y archivos de estilo POSIX, permitiendo operaciones de cambio de nombre de directorio atómicas que mejoran el rendimiento de motores de macrodatos como Spark."
      },
      {
        id: "opt_2",
        "text": "El protocolo de acceso FTP obligatorio.",
        "isCorrect": false,
        "rationale": "ADLS Gen2 utiliza el controlador ABFS (Azure Blob File System) sobre HTTPS optimizado para cargas de trabajo analíticas, no FTP tradicional."
      },
      {
        id: "opt_3",
        "text": "La imposibilidad de almacenar archivos que no sean imágenes JPEG.",
        "isCorrect": false,
        "rationale": "ADLS Gen2 admite cualquier tipo de archivo (Parquet, Delta, CSV, JSON, ORC, etc.)."
      },
      {
        id: "opt_4",
        "text": "El límite máximo de 10 megabytes por cuenta de almacenamiento.",
        "isCorrect": false,
        "rationale": "Las cuentas de almacenamiento de Azure pueden almacenar petabytes de información."
      }
    ],
    "explanation": "El espacio de nombres jerárquico (HNS) es la característica definitoria de Azure Data Lake Storage Gen2: convierte el almacenamiento de objetos plano en un sistema de archivos jerárquico con listas de control de acceso (ACL) de estilo POSIX.",
    "theoryPill": {
      "title": "Azure Data Lake Storage Gen2 y Espacio de Nombres Jerárquico (HNS)",
      "summary": "Almacenamiento de objetos optimizado para motores de macrodatos.",
      "keyPoints": [
        "Blob estándar: Espacio de nombres plano donde las 'carpetas' son solo prefijos en el nombre del archivo. Mover una carpeta requiere copiar todos sus blobs individualmente.",
        "ADLS Gen2 con HNS: Carpetas y directorios reales. Renombrar un directorio de 10 TB es una operación de metadatos instantánea (atómica).",
        "Seguridad: Admite listas de control de acceso (ACLs) granulares a nivel de archivo y carpeta además de Azure RBAC.",
        "Controlador ABFS: Driver optimizado para Apache Spark, Hadoop y Azure Databricks."
      ],
      "examTrap": "La diferencia fundamental entre Blob Storage y ADLS Gen2 es el 'Espacio de nombres jerárquico' (Hierarchical Namespace).",
      "searchQuery": "Hierarchical namespace in Azure Data Lake Storage Gen2 DP-900"
    },
    "references": [
      {
        "title": "Introduction to Azure Data Lake Storage Gen2 | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction"
      }
    ]
  },
  {
    id: "DP900-098",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Microsoft Fabric OneLake Architecture",
    topicIcon: "onelake",
    tags: ["Microsoft Fabric", "OneLake", "SaaS", "Shortcuts", "Delta Parquet"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En el ecosistema analítico moderno de Microsoft, ¿qué servicio actúa como el 'OneDrive para datos' unificado de toda la organización, proporcionando un único lago de datos SaaS (Software as a Service) centralizado que elimina la necesidad de crear silos de datos separados para cada equipo?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Microsoft Fabric OneLake.",
        "isCorrect": true,
        "rationale": "OneLake es el lago de datos único y unificado para todo el inquilino de Microsoft Fabric, construido sobre ADLS Gen2 en formato abierto Delta-Parquet y accesible automáticamente para todos los motores analíticos."
      },
      {
        id: "opt_2",
        "text": "Azure Virtual Machines con discos mecánicos HDD adjuntos.",
        "isCorrect": false,
        "rationale": "Las máquinas virtuales son infraestructura IaaS y no constituyen un lago de datos unificado SaaS para analítica corporativa."
      },
      {
        id: "opt_3",
        "text": "Una cuenta compartida de OneDrive Personal para consumidores.",
        "isCorrect": false,
        "rationale": "OneDrive personal está pensado para documentos de oficina y fotos personales, no para macrodatos analíticos corporativos en formato Delta."
      },
      {
        id: "opt_4",
        "text": "Azure Key Vault.",
        "isCorrect": false,
        "rationale": "Key Vault es un almacén de claves criptográficas y secretos, no un lago de datos."
      }
    ],
    "explanation": "Microsoft Fabric OneLake es el repositorio de datos lógico unificado para toda la organización, donde todos los espacios de trabajo comparten una única copia de los datos sin duplicación.",
    "theoryPill": {
      "title": "Microsoft Fabric OneLake: El Lago de Datos Unificado",
      "summary": "Arquitectura de lago único por inquilino en Microsoft Fabric.",
      "keyPoints": [
        "Un solo OneLake por inquilino (Tenant): Todos los datos convergen en un único lago lógico.",
        "Formato abierto: Todos los datos tabulares se almacenan en Delta Lake (Parquet + registros de transacciones).",
        "Accesos directos (Shortcuts): Permiten vincular datos existentes en ADLS Gen2, Amazon S3 o Google Cloud Storage sin mover ni copiar datos.",
        "SaaS: Viene aprovisionado y administrado automáticamente con la capacidad de Fabric."
      ],
      "examTrap": "'Un solo lago de datos para toda la organización tipo OneDrive para datos' = OneLake en Microsoft Fabric.",
      "searchQuery": "What is OneLake in Microsoft Fabric DP-900"
    },
    "references": [
      {
        "title": "What is OneLake? - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview"
      }
    ]
  },
  {
    id: "DP900-099",
    certification: "DP-900",
    domain: "Describe an analytics workload on Azure",
    topic: "Power BI: Informes (Reports) vs Paneles (Dashboards)",
    topicIcon: "powerbi",
    tags: ["Power BI", "Reports", "Dashboards", "Tiles", "Canvas"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En el servicio Power BI, ¿cuál de las siguientes características describe exclusivamente a un panel (Dashboard) en comparación con un informe (Report)?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Se compone de una sola página (lienzo de 360 grados) y puede combinar iconos (tiles) anclados procedentes de múltiples modelos semánticos e informes diferentes.",
        "isCorrect": true,
        "rationale": "Un panel de Power BI siempre tiene una sola página fija donde se anclan métricas clave de diferentes informes y conjuntos de datos, proporcionando una visión ejecutiva holística."
      },
      {
        id: "opt_2",
        "text": "Puede tener múltiples páginas interactivas y siempre se basa en un único modelo semántico.",
        "isCorrect": false,
        "rationale": "Eso describe un informe (Report), no un panel (Dashboard)."
      },
      {
        id: "opt_3",
        "text": "Solo se puede editar utilizando la aplicación de escritorio Power BI Desktop sin conexión.",
        "isCorrect": false,
        "rationale": "Los paneles se crean y administran exclusivamente en el servicio Power BI en la nube (app.powerbi.com), no en Power BI Desktop."
      },
      {
        id: "opt_4",
        "text": "No permite hacer clic en ningún gráfico ni navegar a la fuente original.",
        "isCorrect": false,
        "rationale": "Hacer clic en un icono de un panel redirige habitualmente al informe subyacente de donde procede."
      }
    ],
    "explanation": "En Power BI, un Panel (Dashboard) es un lienzo de una sola página que puede consolidar visualizaciones e indicadores clave procedentes de múltiples informes y modelos semánticos diferentes.",
    "theoryPill": {
      "title": "Power BI: Diferencias entre Informes (Reports) y Paneles (Dashboards)",
      "summary": "Conceptos visuales fundamentales de Business Intelligence en Microsoft.",
      "keyPoints": [
        "Informe (Report): Múltiples páginas, basado en un solo modelo semántico, filtros y segmentaciones interactivos, editable en Desktop y en el Servicio.",
        "Panel (Dashboard): Lienzo de una sola página, puede consolidar elementos de múltiples modelos semánticos, exclusivo del Servicio Power BI en la nube.",
        "Interacciones: En un informe los gráficos interactúan entre sí (cross-filtering); en un panel hacer clic en un tile suele abrir el informe de origen."
      ],
      "examTrap": "¿Puede un panel de Power BI tener múltiples páginas? NO, los paneles siempre son de una sola página.",
      "searchQuery": "Reports vs Dashboards in Power BI differences DP-900"
    },
    "references": [
      {
        "title": "Dashboards versus reports in the Power BI service | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards-designers"
      }
    ]
  },
  {
    id: "DP900-100",
    certification: "DP-900",
    domain: "Identify considerations for relational data on Azure",
    topic: "Gobernanza y Auditoría de Datos con Microsoft Purview",
    topicIcon: "security",
    tags: ["Microsoft Purview", "Governance", "Data Catalog", "Lineage", "Auditing"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una corporación financiera global necesita catalogar automáticamente los recursos de datos distribuidos en Azure SQL Database, Azure Cosmos DB, cuentas de Azure Storage y sistemas locales, identificando datos confidenciales (como números de tarjetas de crédito o pasaportes) y trazando el linaje de los datos desde el origen hasta los informes. ¿Qué solución integral de gobernanza de datos de Microsoft deben adoptar?",
    "codeSnippet": null,
    "codeLanguage": null,
    options: [
      {
        id: "opt_1",
        "text": "Microsoft Purview.",
        "isCorrect": true,
        "rationale": "Microsoft Purview es la plataforma unificada de gobernanza de datos que ofrece detección automatizada, clasificación de datos confidenciales, catálogo de datos empresarial y visualización del linaje de datos de extremo a extremo."
      },
      {
        id: "opt_2",
        "text": "Azure Bastion.",
        "isCorrect": false,
        "rationale": "Azure Bastion proporciona conectividad RDP/SSH segura a máquinas virtuales a través del explorador, sin relación con el catálogo o linaje de datos."
      },
      {
        id: "opt_3",
        "text": "Azure Logic Apps.",
        "isCorrect": false,
        "rationale": "Logic Apps es un motor de flujos de trabajo e integración sin servidor de aplicaciones, no una plataforma de gobernanza ni clasificación de datos."
      },
      {
        id: "opt_4",
        "text": "Azure ExpressRoute.",
        "isCorrect": false,
        "rationale": "ExpressRoute es un servicio de conectividad de red privada física entre centros de datos locales y Azure."
      }
    ],
    "explanation": "Microsoft Purview proporciona un servicio unificado de gobernanza de datos para administrar, mapear, catalogar y gobernar patrimonios de datos híbridos y multicloud.",
    "theoryPill": {
      "title": "Gobernanza de Datos Unificada con Microsoft Purview",
      "summary": "Catálogo de datos, clasificación de confidencialidad y linaje de datos.",
      "keyPoints": [
        "Data Map: Rastrea y cataloga automáticamente metadatos de fuentes híbridas (Azure, AWS, local).",
        "Data Catalog: Permite a los usuarios buscar y descubrir activos de datos mediante términos de negocio y glosarios.",
        "Linaje de datos (Data Lineage): Visualiza gráficamente cómo viajan los datos desde los orígenes (ingesta) hasta los modelos e informes finales.",
        "Clasificación automática de datos personales (PII) y etiquetas de confidencialidad."
      ],
      "examTrap": "Cualquier pregunta que mencione 'catálogo de datos corporativo', 'linaje de datos' o 'clasificación automática de datos confidenciales' se refiere a Microsoft Purview.",
      "searchQuery": "What is Microsoft Purview data governance DP-900"
    },
    "references": [
      {
        "title": "What is Microsoft Purview? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/purview/purview"
      }
    ]
  }
];

console.log(`Prepared ${dp900Questions.length} questions for DP-900.`);
