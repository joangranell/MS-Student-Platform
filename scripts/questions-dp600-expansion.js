/**
 * scripts/questions-dp600-expansion.js
 * 40 High-Fidelity Questions for DP-600 (DP600-061 to DP600-100)
 * Certification: Implementing Analytics Solutions Using Microsoft Fabric (DP-600)
 */

export const dp600Questions = [
  {
    id: "DP600-061",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Grupos de Cálculo en DAX (Calculation Groups)",
    topicIcon: "powerbi",
    tags: ["DAX", "Calculation Groups", "Time Intelligence", "Tabular Editor", "Format String"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "CALCULATE(\n    SELECTEDMEASURE(),\n    DATESYTD('Date'[Date])\n)",
    "codeLanguage": "DAX",
    "caseStudy": null,
    caseStudyTabs: null,
    stem: "En un modelo semántico de Power BI con 35 medidas explícitas de negocio (Ventas, Costes, Margen, Unidades, etc.), los usuarios solicitan poder analizar cada medida en tres variantes temporales: Valor Real, Acumulado Anual (YTD) y Crecimiento Interanual (YoY %). Deseas evitar crear 105 medidas individuales manuales y permitir que los analistas apliquen estas transformaciones temporales dinámicamente arrastrando una sola columna a las matrices o filtros. ¿Qué funcionalidad debes implementar?",
    options: [
      {
        id: "opt_1",
        "text": "Crear un Grupo de Cálculo (Calculation Group) con elementos de cálculo (Calculation Items) para Actual, YTD y YoY% utilizando la función SELECTEDMEASURE().",
        "isCorrect": true,
        "rationale": "Los grupos de cálculo permiten aplicar lógica DAX genérica sobre cualquier medida seleccionada dinámicamente usando SELECTEDMEASURE(), reduciendo drásticamente la proliferación de medidas redundantes."
      },
      {
        id: "opt_2",
        "text": "Crear una columna calculada en la tabla de hechos con la función SWITCH(TRUE()).",
        "isCorrect": false,
        "rationale": "Las columnas calculadas se evalúan en tiempo de procesamiento fila a fila en el motor VertiPaq y no pueden modificar el contexto de filtro de medidas dinámicas en el informe."
      },
      {
        id: "opt_3",
        "text": "Deshabilitar la tabla de fechas y activar la inteligencia de tiempo automática en Power BI Desktop.",
        "isCorrect": false,
        "rationale": "La inteligencia de tiempo automática crea jerarquías de fecha ocultas ineficientes que degradan el rendimiento y aumentan el tamaño del modelo, además de no solucionar el problema de múltiples variaciones por medida."
      },
      {
        id: "opt_4",
        "text": "Crear una tabla de parámetros 'What-If' para cada una de las 35 medidas.",
        "isCorrect": false,
        "rationale": "Los parámetros What-if generan series numéricas para simulación de escenarios, no patrones de inteligencia de tiempo reutilizables para medidas."
      }
    ],
    "explanation": "Los grupos de cálculo en DAX resuelven el problema de la proliferación de medidas al permitir definir 'Calculation Items' que operan dinámicamente sobre SELECTEDMEASURE() en tiempo de consulta.",
    "theoryPill": {
      "title": "Grupos de Cálculo (Calculation Groups) en Modelos Tabulares",
      "summary": "Reutilización de lógica de cálculo analítico transversal sobre cualquier medida.",
      "keyPoints": [
        "SELECTEDMEASURE(): Marcador de posición que representa la medida evaluada en el contexto visual actual.",
        "Calculation Items: Cada variante lógica (ej. CY, YTD, MTD, PY, YoY, YoY%).",
        "Propiedad Format String Expression: Permite aplicar formatos dinámicos (ej. porcentaje a YoY% y moneda a YTD).",
        "Precedence (Precedencia): Controla el orden de evaluación cuando interactúan múltiples grupos de cálculo (ej. Inteligencia de tiempo + Conversión de divisas)."
      ],
      "examTrap": "Una vez que un modelo contiene un Grupo de Cálculo, la propiedad 'Discourage Implicit Measures' se activa automáticamente en el modelo tabular.",
      "searchQuery": "Calculation groups in Power BI semantic models DP-600"
    },
    "references": [
      {
        "title": "Create calculation groups in Power BI | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/transform-model/calculation-groups"
      }
    ]
  },
  {
    id: "DP600-062",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Direct Lake Fallback a DirectQuery",
    topicIcon: "onelake",
    tags: ["Direct Lake", "Fallback", "DirectQuery", "Performance", "VertiPaq"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un modelo semántico en Microsoft Fabric configurado en modo Direct Lake comienza a mostrar un rendimiento significativamente más lento tras publicar una actualización. Al analizar los eventos con DAX Studio Server Timings, observas que las consultas están generando instrucciones SQL directas contra el SQL Analytics Endpoint en lugar de responder directamente en memoria VertiPaq. ¿Cuál de las siguientes causas provoca que un modelo Direct Lake caiga en modo de reserva (Fallback) a DirectQuery?",
    options: [
      {
        id: "opt_1",
        "text": "El modelo semántico incluye tablas calculadas en DAX con funciones no admitidas, vistas del SQL Analytics Endpoint o el volumen de datos de una tabla excede el límite de memoria asignado a la SKU de capacidad de Fabric.",
        "isCorrect": true,
        "rationale": "Direct Lake cae en DirectQuery fallback si: se superan los límites de memoria de la SKU de capacidad, las tablas Delta subyacentes contienen tipos de datos no admitidos, se usan vistas de SQL en lugar de tablas Delta físicas, o se definen reglas RLS en el SQL Endpoint."
      },
      {
        id: "opt_2",
        "text": "Las tablas Delta del Lakehouse tienen activada la compresión V-Order.",
        "isCorrect": false,
        "rationale": "V-Order está diseñado específicamente para acelerar las lecturas en Direct Lake y nunca provoca una caída a DirectQuery."
      },
      {
        id: "opt_3",
        "text": "Los usuarios finales abren los informes utilizando un navegador web en lugar de Power BI Desktop.",
        "isCorrect": false,
        "rationale": "El cliente del navegador web es el método estándar de consumo y no afecta al modo de almacenamiento del motor del modelo."
      },
      {
        id: "opt_4",
        "text": "El área de trabajo está asignada a una capacidad Fabric F64.",
        "isCorrect": false,
        "rationale": "F64 es una capacidad robusta compatible con Direct Lake y con límites de memoria holgados."
      }
    ],
    "explanation": "Direct Lake cae en modo DirectQuery cuando encuentra elementos incompatibles (vistas SQL, tipos de datos no soportados) o cuando la demanda de memoria supera los límites de paginación del SKU de capacidad.",
    "theoryPill": {
      "title": "Condiciones de Fallback en Modelos Direct Lake",
      "summary": "Factores que provocan la degradación de Direct Lake a DirectQuery.",
      "keyPoints": [
        "Límites de memoria de capacidad: Cada SKU (F2 a F2048) tiene un límite máximo de tamaño de modelo en memoria para Direct Lake.",
        "Objetos no compatibles: Vistas T-SQL del SQL Endpoint (Direct Lake requiere tablas Delta físicas nativas en OneLake).",
        "Seguridad: RLS definida en el SQL Endpoint fuerza DirectQuery. RLS debe definirse en el modelo semántico para mantenerse en Direct Lake.",
        "Propiedad DirectLakeBehavior: Permite forzar 'DirectLakeOnly' para evitar consultas lentas de fallback no detectadas."
      ],
      "examTrap": "Para evitar que un informe caiga silenciosamente a DirectQuery lento, configura 'DirectLakeBehavior = DirectLakeOnly' (fallará con error en vez de degradar el rendimiento).",
      "searchQuery": "Direct Lake overview fallback behavior Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Direct Lake overview - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview"
      }
    ]
  },
  {
    id: "DP600-063",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "ALM Toolkit & Tabular Editor en CI/CD",
    topicIcon: "fabric",
    tags: ["ALM Toolkit", "Tabular Editor", "XMLA", "CI/CD", "Metadata"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Tu equipo necesita desplegar cambios en medidas DAX, grupos de cálculo y descripciones de metadatos desde un modelo semántico en desarrollo hacia el modelo de producción en Microsoft Fabric, sin sobrescribir ni obligar a reprocesar los 50 millones de filas ya cargadas en producción. ¿Qué herramienta especializada de la comunidad basada en el punto de conexión XMLA debes utilizar para realizar una implementación diferencial de esquemas?",
    options: [
      {
        id: "opt_1",
        "text": "ALM Toolkit (o Tabular Editor mediante scripting de despliegue de metadatos).",
        "isCorrect": true,
        "rationale": "ALM Toolkit es la herramienta de comparación y administración del ciclo de vida (ALM) para modelos de Power BI. Permite comparar esquemas entre dos modelos vía XMLA e implementar únicamente cambios estructurales sin perder ni reprocesar las particiones de datos existentes."
      },
      {
        id: "opt_2",
        "text": "Publicar el archivo .pbix completo desde Power BI Desktop sobrescribiendo el informe.",
        "isCorrect": false,
        "rationale": "Publicar un .pbix reemplaza todo el modelo y destruye los datos en caché, requiriendo un refresco completo de los 50 millones de filas."
      },
      {
        id: "opt_3",
        "text": "Exportar el modelo como archivo CSV e importarlo con Bloc de Notas.",
        "isCorrect": false,
        "rationale": "Los modelos semánticos no se pueden exportar ni compilar mediante un archivo CSV en el Bloc de Notas."
      },
      {
        id: "opt_4",
        "text": "Reiniciar la capacidad de Fabric desde Azure Portal.",
        "isCorrect": false,
        "rationale": "Reiniciar la capacidad detiene y reinicia los servicios de computación, pero no sincroniza cambios de esquemas entre modelos."
      }
    ],
    "explanation": "ALM Toolkit permite la comparación y despliegue diferencial de metadatos entre modelos semánticos a través del punto de conexión XMLA, preservando las particiones de datos existentes en producción.",
    "theoryPill": {
      "title": "Administración del Ciclo de Vida de Modelos Semánticos con ALM Toolkit",
      "summary": "Despliegues diferenciales de esquemas a través del endpoint XMLA.",
      "keyPoints": [
        "Comparación de esquemas: Detecta adiciones, modificaciones y eliminaciones entre dos modelos tabulares.",
        "Conservación de datos: Permite actualizar medidas, formatos, relaciones y grupos de cálculo sin invalidar las particiones de datos cargadas.",
        "Soporte de Direct Lake e Import: Funciona contra modelos alojados en capacidades Premium y Fabric vía XMLA.",
        "Generación de scripts TMSL: Puede exportar el script de alteración para auditoría o automatización CI/CD."
      ],
      "examTrap": "Para actualizar la definición de un modelo de producción sin reprocesar datos masivos existentes, se usa ALM Toolkit vía XMLA.",
      "searchQuery": "ALM Toolkit schema compare Power BI semantic models DP-600"
    },
    "references": [
      {
        "title": "Model lifecycle management with ALM Toolkit | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-connect-tools"
      }
    ]
  },
  {
    id: "DP600-064",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "TMDL (Tabular Model Definition Language)",
    topicIcon: "fabric",
    tags: ["TMDL", "TMSL", "PBIP", "Git", "DevOps"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "table Sales\n\tcolumn OrderDate\n\t\tdataType: dateTime\n\t\tsourceColumn: OrderDate\n\n\tmeasure 'Total Sales' = SUM(Sales[Amount])\n\t\tformatString: \"$#,##0.00\"",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Al inspeccionar la carpeta de un proyecto de Power BI (.pbip) integrado con Git en Microsoft Fabric, observas archivos con sintaxis limpia estructurada mediante indentaciones (similar a YAML/Markdown) donde cada tabla, columna y medida DAX se almacena en su propio archivo de texto individual legible por humanos. ¿Qué lenguaje de definición de metadatos representa este formato?",
    options: [
      {
        id: "opt_1",
        "text": "TMDL (Tabular Model Definition Language).",
        "isCorrect": true,
        "rationale": "TMDL es el lenguaje declarativo y legible por humanos de Microsoft para modelos tabulares. Sustituye al gigantesco JSON monolítico de TMSL (`model.bim`) dividiendo el modelo en carpetas y archivos con sangría para facilitar el control de versiones en Git y la resolución de conflictos."
      },
      {
        id: "opt_2",
        "text": "XMLA clásico basado en SOAP.",
        "isCorrect": false,
        "rationale": "XMLA es un protocolo de comunicación cliente-servidor basado en XML/SOAP, no un lenguaje de texto con indentación para archivos de repositorio local."
      },
      {
        id: "opt_3",
        "text": "JSON monolítico TMSL (model.bim).",
        "isCorrect": false,
        "rationale": "model.bim es un único archivo JSON extenso propenso a conflictos de fusión en Git; TMDL es el nuevo formato descompuesto."
      },
      {
        id: "opt_4",
        "text": "Kusto Query Language (KQL).",
        "isCorrect": false,
        "rationale": "KQL es un lenguaje de consulta para series temporales y logs, no un formato de definición de esquemas de modelos tabulares."
      }
    ],
    "explanation": "TMDL (Tabular Model Definition Language) descompone los metadatos de modelos semánticos en archivos de texto sencillos con sintaxis basada en indentación, optimizados para Git y Pull Requests.",
    "theoryPill": {
      "title": "TMDL (Tabular Model Definition Language) vs TMSL",
      "summary": "Formato de definición de modelos tabulares para control de versiones moderno.",
      "keyPoints": [
        "Sintaxis limpia: Basada en sangrías y palabras clave simples, sin llaves JSON complejas ni escapes de comillas en DAX.",
        "Estructura multifuncional: Separa tablas, relaciones, roles y expresiones en archivos individuales dentro de una jerarquía de carpetas.",
        "Optimizado para Git: Minimiza los conflictos de fusión (merge conflicts) cuando varios desarrolladores editan diferentes medidas o tablas.",
        "Compatible con Tabular Editor, ALM Toolkit y Power BI Desktop (.pbip)."
      ],
      "examTrap": "TMDL está diseñado para control de versiones en Git gracias a su formato multiarchivo y sintaxis legible por humanos.",
      "searchQuery": "Tabular Model Definition Language TMDL Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Tabular Model Definition Language (TMDL) | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/analysis-services/tmdl/tmdl-overview"
      }
    ]
  },
  {
    id: "DP600-065",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Punto de Conexión XMLA (Lectura y Escritura)",
    topicIcon: "fabric",
    tags: ["XMLA", "Read/Write", "Tenant Settings", "Security", "External Tools"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Deseas conectar herramientas externas de gestión de datos empresariales (como SQL Server Management Studio, DAX Studio y scripts automatizados de PowerShell) a los modelos semánticos publicados en un área de trabajo de Microsoft Fabric para refrescar particiones individuales y aplicar scripts TMSL. ¿Qué configuración debe habilitar el administrador del inquilino a nivel de capacidad?",
    options: [
      {
        id: "opt_1",
        "text": "Punto de conexión XMLA configurado en modo 'Lectura y escritura' (Read-Write).",
        "isCorrect": true,
        "rationale": "El punto de conexión XMLA debe configurarse explícitamente en 'Lectura y escritura' en la configuración de la capacidad de Fabric/Premium para permitir operaciones de administración, procesamiento de particiones y modificación de metadatos desde herramientas externas."
      },
      {
        id: "opt_2",
        "text": "Conexión anónima mediante protocolo Telnet.",
        "isCorrect": false,
        "rationale": "Telnet es un protocolo no seguro e incompatible con la autenticación moderna de Microsoft Entra ID."
      },
      {
        id: "opt_3",
        "text": "Habilitar la opción de publicación en web abierta (Publish to web).",
        "isCorrect": false,
        "rationale": "Publish to web expone informes de manera pública sin autenticación y no habilita interfaces XMLA para herramientas externas."
      },
      {
        id: "opt_4",
        "text": "Descargar el software de Office 365 en el servidor local.",
        "isCorrect": false,
        "rationale": "La suite de Office no habilita la conectividad de administración XMLA en áreas de trabajo de Fabric."
      }
    ],
    "explanation": "Para realizar operaciones de administración, scripts TMSL y actualización de particiones desde herramientas externas, la capacidad de Fabric debe tener el punto de conexión XMLA en modo 'Read-Write'.",
    "theoryPill": {
      "title": "Configuración del Punto de Conexión XMLA en Microsoft Fabric",
      "summary": "Acceso e interoperabilidad con herramientas del ecosistema Analysis Services.",
      "keyPoints": [
        "Off: Conectividad XMLA totalmente desactivada.",
        "Read-Only: Solo permite consultas DAX/MDX (ej. DAX Studio, Excel, informes paginados).",
        "Read-Write: Permite operaciones DDL, despliegues de metadatos, actualización de particiones individuales y TMSL (SSMS, Tabular Editor, ALM Toolkit).",
        "Seguridad: Toda conexión XMLA respeta Microsoft Entra ID, MFA y los permisos del área de trabajo (requiere rol Contributor o superior para escritura)."
      ],
      "examTrap": "Si una herramienta externa da error al intentar actualizar o modificar un modelo vía XMLA, comprueba si el XMLA Endpoint está en 'Read-Only' en lugar de 'Read-Write'.",
      "searchQuery": "XMLA endpoint connectivity read write Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Dataset connectivity and management with the XMLA endpoint | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-connect-tools"
      }
    ]
  },
  {
    id: "DP600-066",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Lakehouse SQL Analytics Endpoint (Consultas de solo lectura)",
    topicIcon: "lakehouse",
    tags: ["Lakehouse", "SQL Endpoint", "Read-Only", "T-SQL", "Cross-Database"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un analista de datos ejecuta consultas T-SQL contra el SQL Analytics Endpoint generado automáticamente para un Fabric Lakehouse. El analista intenta ejecutar la instrucción: `UPDATE dbo.Customers SET Status = 'Active' WHERE City = 'Madrid';`, pero la consulta falla con un error de operación no admitida. ¿Por qué se produce este error?",
    options: [
      {
        id: "opt_1",
        "text": "El punto de conexión de análisis SQL (SQL Analytics Endpoint) de un Lakehouse es estrictamente de solo lectura (read-only); para modificar datos se deben usar Notebooks Spark/Delta o utilizar un Fabric Warehouse.",
        "isCorrect": true,
        "rationale": "El SQL Analytics Endpoint de un Lakehouse proporciona una capa de consulta T-SQL de solo lectura sobre las tablas Delta de OneLake. No admite instrucciones DML de modificación directa (INSERT, UPDATE, DELETE). Si se requieren modificaciones T-SQL completas, se debe utilizar un Fabric Warehouse."
      },
      {
        id: "opt_2",
        "text": "La sintaxis de UPDATE no existe en el lenguaje T-SQL de Microsoft.",
        "isCorrect": false,
        "rationale": "UPDATE es una instrucción estándar fundamental de T-SQL."
      },
      {
        id: "opt_3",
        "text": "El analista debe reiniciar su ordenador personal antes de ejecutar sentencias UPDATE.",
        "isCorrect": false,
        "rationale": "El error es una restricción arquitectónica del endpoint en la nube, no un problema del equipo del cliente."
      },
      {
        id: "opt_4",
        "text": "Las tablas Delta solo pueden contener 10 filas para admitir modificaciones.",
        "isCorrect": false,
        "rationale": "Las tablas Delta admiten miles de millones de filas sin ninguna limitación artificial de 10 filas."
      }
    ],
    "explanation": "El SQL Analytics Endpoint de un Fabric Lakehouse es una vista de solo lectura de alto rendimiento sobre las tablas Delta de OneLake. Las modificaciones de datos mediante T-SQL (INSERT, UPDATE, DELETE) solo están soportadas en Fabric Warehouse.",
    "theoryPill": {
      "title": "SQL Analytics Endpoint (Lakehouse) vs Fabric Warehouse",
      "summary": "Diferencias clave de capacidad T-SQL en Microsoft Fabric.",
      "keyPoints": [
        "SQL Analytics Endpoint (Lakehouse): Se genera automáticamente, es de solo lectura (SELECT, CREATE VIEW, funciones TVF). No admite INSERT, UPDATE, DELETE ni DDL de tablas.",
        "Fabric Warehouse: Soporte T-SQL completo de lectura y escritura (SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, transacciones ACID).",
        "Consultas entre elementos (Cross-Database Querying): El motor SQL permite hacer JOINs en tres partes entre tablas de Warehouses y Lakehouses en la misma área de trabajo."
      ],
      "examTrap": "¿Se pueden hacer INSERT o UPDATE en el SQL Analytics Endpoint del Lakehouse? NO, es 100% de solo lectura.",
      "searchQuery": "SQL analytics endpoint read-only lakehouse Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "What is the SQL analytics endpoint for a lakehouse? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sql-analytics-endpoint"
      }
    ]
  },
  {
    id: "DP600-067",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Variables DAX (VAR) y Contexto de Evaluación",
    topicIcon: "powerbi",
    tags: ["DAX", "VAR", "RETURN", "Evaluation Context", "Performance"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "Margen Ratio = \nVAR VentasTotales = [Total Ventas]\nRETURN\nIF(\n    VentasTotales > 1000000,\n    [Total Beneficio] / VentasTotales,\n    BLANK()\n)",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Cuál de las siguientes afirmaciones describe con precisión una ventaja crítica de rendimiento y comportamiento de las variables (VAR ... RETURN) en DAX?",
    options: [
      {
        id: "opt_1",
        "text": "Una variable se evalúa una sola vez en el contexto en el que se define y almacena el resultado como un valor constante reutilizable, evitando cálculos repetidos de la misma expresión dentro de la medida.",
        "isCorrect": true,
        "rationale": "En DAX, las variables son perezosas (se evalúan solo si se utilizan) pero se evalúan exactamente una vez en su contexto de definición, almacenando el resultado estático para todas las referencias posteriores en el bloque RETURN."
      },
      {
        id: "opt_2",
        "text": "Una variable se recalcula dinámicamente cada vez que se menciona su nombre dentro del bloque RETURN.",
        "isCorrect": false,
        "rationale": "Las variables en DAX no son macros de sustitución; son constantes evaluadas una sola vez en el contexto de su definición."
      },
      {
        id: "opt_3",
        "text": "Las variables DAX solo admiten cadenas de texto y no pueden almacenar números ni tablas.",
        "isCorrect": false,
        "rationale": "Las variables DAX pueden almacenar cualquier tipo de datos escalar o incluso tablas completas."
      },
      {
        id: "opt_4",
        "text": "El uso de variables siempre desactiva el motor VertiPaq.",
        "isCorrect": false,
        "rationale": "Las variables son nativas del motor DAX y mejoran significativamente la optimización del plan de ejecución VertiPaq."
      }
    ],
    "explanation": "Las variables en DAX mejoran el rendimiento porque evalúan la expresión una única vez en el contexto de su declaración, evitando evaluar repetidamente cálculos complejos en sentencias condicionales (como IF).",
    "theoryPill": {
      "title": "Optimización y Comportamiento de Variables en DAX",
      "summary": "Mejora de rendimiento, legibilidad y control del contexto con VAR.",
      "keyPoints": [
        "Evaluación única: Si una medida aparece 3 veces en un IF o SWITCH, asignarla a una VAR la calcula solo 1 vez.",
        "Ámbito de contexto: La variable captura el contexto de filtro existente en el punto exacto donde se define, no donde se consume en el RETURN.",
        "Almacenamiento de tablas: Una variable puede almacenar una tabla virtual (ej. VAR TopClientes = TOPN(...)) para iterar sobre ella después.",
        "Depuración: Facilita probar partes aisladas de fórmulas complejas devolviendo directamente la variable en el RETURN."
      ],
      "examTrap": "Una variable DAX se evalúa en el contexto de su DEFINICIÓN, no en el contexto del bloque donde se utiliza.",
      "searchQuery": "Use variables to improve DAX formulas Power BI DP-600"
    },
    "references": [
      {
        "title": "Use variables to improve your DAX formulas | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dax/best-practices/dax-variables"
      }
    ]
  },
  {
    id: "DP600-068",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Dimensiones de Rol Activo e Inactivo (Role-Playing Dimensions & USERELATIONSHIP)",
    topicIcon: "powerbi",
    tags: ["DAX", "USERELATIONSHIP", "Role-Playing", "Relationships", "Star Schema"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "Ventas por Fecha Envio = \nCALCULATE(\n    [Total Ventas],\n    USERELATIONSHIP('Sales'[ShipDateKey], 'Date'[DateKey])\n)",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una tabla de hechos 'Sales' existen tres columnas de fecha: OrderDateKey, ShipDateKey y DeliveryDateKey, todas vinculadas a una única tabla dimensional 'Date'. Entre dos tablas solo puede existir una relación activa a la vez (que actualmente es OrderDateKey). Necesitas crear una medida que calcule las ventas según la fecha de envío (ShipDateKey) sin duplicar físicamente la tabla 'Date' en el modelo. ¿Qué función DAX debes utilizar dentro de CALCULATE?",
    options: [
      {
        id: "opt_1",
        "text": "USERELATIONSHIP('Sales'[ShipDateKey], 'Date'[DateKey]).",
        "isCorrect": true,
        "rationale": "USERELATIONSHIP activa temporalmente una relación inactiva existente para la duración de la evaluación de la expresión dentro de CALCULATE, permitiendo modelar dimensiones con rol cambiante (Role-Playing Dimensions) sin duplicar datos."
      },
      {
        id: "opt_2",
        "text": "CROSSJOIN('Sales', 'Date').",
        "isCorrect": false,
        "rationale": "CROSSJOIN produce el producto cartesiano de dos tablas, multiplicando filas de forma desastrosa para el rendimiento y la memoria."
      },
      {
        id: "opt_3",
        "text": "RELATEDTABLE('Date').",
        "isCorrect": false,
        "rationale": "RELATEDTABLE devuelve una tabla de filas relacionadas en el extremo 'muchos', no activa relaciones inactivas en CALCULATE."
      },
      {
        id: "opt_4",
        "text": "EARLIER('Sales'[ShipDateKey]).",
        "isCorrect": false,
        "rationale": "EARLIER se utiliza en columnas calculadas para acceder a contextos de fila exteriores, no para activar relaciones."
      }
    ],
    "explanation": "USERELATIONSHIP activa de forma segura una relación inactiva predefinida durante el cálculo de una medida en CALCULATE, evitando la necesidad de duplicar tablas de fechas en el modelo.",
    "theoryPill": {
      "title": "Dimensiones con Rol Activo (Role-Playing Dimensions) y USERELATIONSHIP",
      "summary": "Gestión de múltiples fechas o claves foráneas hacia una misma dimensión.",
      "keyPoints": [
        "Relación activa: Se utiliza de forma predeterminada en todas las visualizaciones y medidas estándar.",
        "Relación inactiva: Se representa como una línea punteada en la vista de diagrama del modelo.",
        "USERELATIONSHIP: Solo puede utilizarse como argumento de filtro en CALCULATE o CALCULATETABLE.",
        "Alternativa física: Crear vistas o tablas separadas ('Fecha Pedido', 'Fecha Envío') en el lago/modelo si los usuarios necesitan filtrar por ambas simultáneamente en la misma matriz."
      ],
      "examTrap": "USERELATIONSHIP solo funciona si la relación inactiva YA HA SIDO DEFINIDA previamente en el modelo semántico.",
      "searchQuery": "Active vs inactive relationships USERELATIONSHIP Power BI DP-600"
    },
    "references": [
      {
        "title": "Active vs inactive relationship guidance | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive"
      }
    ]
  },
  {
    id: "DP600-069",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Riesgos del Filtrado Cruzado Bidireccional",
    topicIcon: "powerbi",
    tags: ["Cross-Filtering", "Bi-directional", "Ambiguity", "Performance", "Best Practices"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Por qué las directrices oficiales de arquitectura de modelos semánticos de Microsoft aconsejan evitar el uso generalizado de relaciones con filtrado cruzado bidireccional ('Both') entre tablas de hechos y dimensiones?",
    options: [
      {
        id: "opt_1",
        "text": "Introduce ambigüedad en las rutas de propagación de filtros, puede provocar resultados imprevistos en cálculos DAX y degrada gravemente el rendimiento de las consultas al forzar combinaciones complejas.",
        "isCorrect": true,
        "rationale": "El filtrado bidireccional puede generar bucles de relaciones ambiguas, comportamientos inesperados en filtros y un impacto negativo en el motor VertiPaq al forzar cálculos más lentos. Se debe limitar a escenarios estrictamente necesarios o implementarse puntualmente en medidas con CROSSFILTER()."
      },
      {
        id: "opt_2",
        "text": "Porque Power BI Desktop se cierra automáticamente si detecta una relación bidireccional.",
        "isCorrect": false,
        "rationale": "Power BI Desktop admite relaciones bidireccionales, pero emite advertencias sobre su uso."
      },
      {
        id: "opt_3",
        "text": "Porque solo funciona cuando los datos proceden de hojas de cálculo de Microsoft Excel.",
        "isCorrect": false,
        "rationale": "El filtrado bidireccional funciona con cualquier origen admitido, independientemente de la tecnología de datos."
      },
      {
        id: "opt_4",
        "text": "Porque impide crear medidas que utilicen la función SUM().",
        "isCorrect": false,
        "rationale": "No tiene ninguna restricción sintáctica con la función SUM()."
      }
    ],
    "explanation": "El filtrado bidireccional generalizado puede provocar ambigüedad de rutas en esquemas complejos y reducir drásticamente el rendimiento del motor analítico VertiPaq.",
    "theoryPill": {
      "title": "Buenas Prácticas: Filtrado Unidireccional vs Bidireccional",
      "summary": "Control de la propagación de filtros en esquemas en estrella.",
      "keyPoints": [
        "Unidireccional (Single - Recomendado): Los filtros fluyen de la dimensión (extremo 1) hacia la tabla de hechos (extremo varios).",
        "Bidireccional (Both): Los filtros fluyen en ambas direcciones. Las tablas de hechos filtran a las dimensiones.",
        "Alternativa eficiente: Utilizar CROSSFILTER(..., Both) dentro de CALCULATE únicamente en la medida que requiere ese comportamiento específico.",
        "Seguridad: En RLS dinámica, se puede requerir bidireccional entre la tabla de usuarios y la dimensión autorizada."
      ],
      "examTrap": "En lugar de fijar una relación como bidireccional permanente en el modelo, la mejor práctica recomendada es activar el filtrado bidireccional bajo demanda con CROSSFILTER().",
      "searchQuery": "Bi-directional relationship guidance Power BI DP-600"
    },
    "references": [
      {
        "title": "Bi-directional relationship guidance | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-bidirectional-filtering"
      }
    ]
  },
  {
    id: "DP600-070",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Agregaciones Automáticas y Definidas por el Usuario",
    topicIcon: "powerbi",
    tags: ["Aggregations", "DirectQuery", "Dual Mode", "Big Data", "VertiPaq"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un modelo semántico corporativo consulta una tabla de hechos de transacciones de 2.000 millones de filas que permanece en DirectQuery para responder a peticiones a nivel de ticket detallado. La gran mayoría de los informes ejecutivos solo consultan ventas agregadas por Año, Mes y Categoría de Producto. Deseas que estas consultas agregadas habituales respondan en milisegundos en memoria caché VertiPaq sin duplicar los 2.000 millones de filas. ¿Qué técnica debes implementar?",
    options: [
      {
        id: "opt_1",
        "text": "Crear una tabla de agregación en modo Import/Dual y configurar las asignaciones de agregación (User-Defined Aggregations) vinculadas a la tabla DirectQuery detallada.",
        "isCorrect": true,
        "rationale": "Las tablas de agregación definidas por el usuario permiten almacenar en memoria VertiPaq una versión compacta y precalculada de los hechos. Power BI reescribe automáticamente las consultas para usar la tabla de agregación en memoria, recurriendo a DirectQuery solo cuando se solicitan detalles no agregados."
      },
      {
        id: "opt_2",
        "text": "Cambiar todas las tablas a modo DirectQuery puro sin tablas en caché.",
        "isCorrect": false,
        "rationale": "El modo DirectQuery puro envía todas las consultas a la base de datos de origen, lo que resulta lento e intensivo para agregaciones ejecutivas habituales."
      },
      {
        id: "opt_3",
        "text": "Eliminar todas las columnas de fecha del modelo semántico.",
        "isCorrect": false,
        "rationale": "Eliminar las fechas impediría responder a los requerimientos de análisis mensual y anual."
      },
      {
        id: "opt_4",
        "text": "Crear una regla de seguridad de nivel de fila (RLS) que oculte todas las filas a los ejecutivos.",
        "isCorrect": false,
        "rationale": "Ocultar filas impediría que los ejecutivos vean los datos de ventas."
      }
    ],
    "explanation": "Las tablas de agregación permiten una arquitectura de almacenamiento híbrida: las consultas resumidas se resuelven en memoria ultrarrápida (VertiPaq), mientras que el detalle fino llega a la fuente mediante DirectQuery sin intervención del usuario.",
    "theoryPill": {
      "title": "Tablas de Agregación Definidas por el Usuario (User-Defined Aggregations)",
      "summary": "Optimización extrema para petabytes de datos en modelos compuestos.",
      "keyPoints": [
        "Modo Dual: Las dimensiones compartidas entre tablas de hechos DirectQuery y tablas de agregación Import deben configurarse en modo 'Dual'.",
        "Asignación de agregaciones: Se definen en Power BI Desktop (GroupBy, Sum, Count, Min, Max).",
        "Hit de agregación: Si la consulta del visual se puede resolver con la tabla agregada, se responde desde VertiPaq (milisegundos).",
        "Miss de agregación: Si se solicita una columna ausente en la agregación, la consulta pasa transparente a la fuente DirectQuery."
      ],
      "examTrap": "Las dimensiones que se conectan tanto a una tabla de agregación Import como a una tabla de hechos DirectQuery DEBEN estar en modo de almacenamiento 'Dual'.",
      "searchQuery": "User-defined aggregations Power BI large datasets DP-600"
    },
    "references": [
      {
        "title": "User-defined aggregations in Power BI | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/transform-model/aggregations-advanced"
      }
    ]
  }
];

console.log(`Prepared first batch of ${dp600Questions.length} questions for DP-600.`);
