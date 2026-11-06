/**
 * scripts/build-expansion-dp700-batch4.js
 * Additional 10 Technical Questions for DP-700 (DP700-111 to DP700-120)
 * Certification: Implementing Data Engineering Solutions Using Microsoft Fabric (DP-700)
 */

export const dp700Batch4 = [
  {
    id: "DP700-111",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Accesos Directos de OneLake hacia Amazon S3 y Autenticación IAM",
    topicIcon: "onelake",
    tags: ["OneLake", "Shortcuts", "Amazon S3", "AWS IAM", "Security"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una corporación multicloud, necesitas crear un acceso directo de OneLake (OneLake Shortcut) en un Fabric Lakehouse que apunte a un bucket de Amazon S3 que contiene datos sensibles de telemetría. La política corporativa de ciberseguridad prohíbe terminantemente generar y almacenar claves de acceso estáticas (Access Key ID y Secret Access Key) de larga duración de AWS. ¿Qué método de autenticación sin claves debes configurar para el acceso directo a S3?",
    options: [
      {
        id: "opt_1",
        "text": "Configurar un rol de IAM en AWS con una relación de confianza basada en el IdP de Microsoft Fabric o utilizar credenciales temporales asumiendo el rol con políticas de mínimo privilegio.",
        "isCorrect": true,
        "rationale": "Para acceder a Amazon S3 desde OneLake Shortcuts sin almacenar claves de acceso estáticas permanentes, se utiliza un rol de AWS IAM configurado con una relación de confianza que permite la delegación o asunción del rol mediante identidades seguras temporales, cumpliendo el principio de cero claves estáticas."
      },
      {
        id: "opt_2",
        "text": "Hacer el bucket de Amazon S3 completamente público y accesible de forma anónima en internet.",
        "isCorrect": false,
        "rationale": "Exponer un bucket con datos sensibles a internet público viola radicalmente las políticas de ciberseguridad corporativas."
      },
      {
        id: "opt_3",
        "text": "Pedir a cada usuario que introduzca su contraseña personal de Windows en la consola de AWS.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica e incompatible con los modelos de autenticación de AWS IAM."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar OneLake y migrar todo a un servidor FTP local.",
        "isCorrect": false,
        "rationale": "Invalida la arquitectura de datos en la nube de Microsoft Fabric."
      }
    ],
    "explanation": "OneLake Shortcuts admite la configuración de roles de AWS IAM para conectarse a buckets de Amazon S3 sin necesidad de almacenar claves de acceso estáticas permanentes en la nube.",
    "theoryPill": {
      "title": "Conectividad Segura entre OneLake y Amazon S3",
      "summary": "Accesos directos multicloud mediante federación y roles de AWS IAM.",
      "keyPoints": [
        "OneLake S3 Shortcut: Expone carpetas o tablas Delta de S3 dentro de un Lakehouse de Fabric como si fueran locales.",
        "Seguridad con IAM Role: Permite autorizar a Fabric a asumir temporalmente un rol en AWS sin almacenar contraseñas permanentes.",
        "Alternativa con claves: Admite Access Key ID y Secret Key (aunque no recomendadas para entornos de máxima seguridad corporativa).",
        "Costes de transferencia (Egress): Los accesos directos leen datos in-situ en AWS; las consultas analíticas pesadas desde Azure generan costes de salida en la cuenta de AWS."
      ],
      "examTrap": "Para conectar OneLake a AWS S3 sin claves estáticas de larga duración, se utiliza un Rol de AWS IAM con políticas de confianza delegada.",
      "searchQuery": "OneLake shortcuts to Amazon S3 AWS IAM role authentication DP-700"
    },
    "references": [
      {
        "title": "Create an Amazon S3 shortcut in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/onelake/create-s3-shortcut"
      }
    ]
  },
  {
    id: "DP700-112",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Carga Masiva con Staging y COPY INTO en Fabric Warehouse",
    topicIcon: "warehouse",
    tags: ["Warehouse", "COPY INTO", "Staging", "Bulk Load", "T-SQL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "COPY INTO dbo.RawOrders\nFROM 'https://myaccount.dfs.core.windows.net/data/orders/*.parquet'\nWITH (\n    FILE_TYPE = 'PARQUET',\n    CREDENTIAL = (IDENTITY = 'Managed Identity')\n);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse, necesitas ingerir periódicamente 50 millones de filas que llegan en cientos de archivos Parquet comprimidos alojados en una cuenta externa de Azure Data Lake Storage Gen2. Necesitas ejecutar la carga directamente desde el motor T-SQL del Warehouse a la máxima velocidad posible, utilizando computación distribuida sin procesar fila por fila en canalizaciones. ¿Qué comando T-SQL es el estándar de alto rendimiento recomendado?",
    options: [
      {
        id: "opt_1",
        "text": "La instrucción T-SQL COPY INTO.",
        "isCorrect": true,
        "rationale": "La instrucción `COPY INTO` es el comando T-SQL nativo de alto rendimiento para la ingesta masiva en Fabric Warehouse. Lee directamente archivos Parquet y CSV distribuidos en OneLake o ADLS Gen2 en paralelo utilizando la potencia del motor SQL subyacente y autenticación por Managed Identity o SAS."
      },
      {
        id: "opt_2",
        "text": "La instrucción BULK INSERT de SQL Server 2005 sobre una unidad compartida local de red (SMB).",
        "isCorrect": false,
        "rationale": "BULK INSERT tradicional requiere rutas de archivo de red locales (ej. C:\\ o \\\\servidor\\carpeta) y no está optimizado para el almacenamiento en la nube de OneLake."
      },
      {
        id: "opt_3",
        "text": "Escribir un procedimiento almacenado con un cursor que lea cada archivo línea a línea.",
        "isCorrect": false,
        "rationale": "Los cursores T-SQL son monohilo y extremadamente lentos para millones de filas."
      },
      {
        id: "opt_4",
        "text": "Exportar los archivos a formato de audio WAV.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      }
    ],
    "explanation": "La instrucción `COPY INTO` en T-SQL es la herramienta de ingesta masiva de datos más rápida y escalable para cargar archivos Parquet y CSV externos directamente en tablas de Fabric Warehouse.",
    "theoryPill": {
      "title": "Ingesta Masiva de Datos con COPY INTO en Fabric Warehouse",
      "summary": "Carga paralela directa de archivos en OneLake y Data Lake.",
      "keyPoints": [
        "Formatos compatibles: PARQUET (recomendado por compresión y tipos preservados) y CSV.",
        "Paralelismo distribuido: El motor lee múltiples archivos concurrentemente en paralelo.",
        "Autenticación: Admite Managed Identity del área de trabajo, entidad de servicio (Service Principal) o firmas de acceso compartido (SAS).",
        "Opciones avanzadas: Control de encabezados, terminadores de fila, manejo de errores de conversión y codificación UTF-8."
      ],
      "examTrap": "Para ingesta masiva directa con T-SQL en Fabric Warehouse desde archivos Parquet en Data Lake, el comando oficial es `COPY INTO`.",
      "searchQuery": "COPY INTO Transact-SQL Microsoft Fabric warehouse DP-700"
    },
    "references": [
      {
        "title": "COPY INTO (Transact-SQL) in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/ingest-data"
      }
    ]
  },
  {
    id: "DP700-113",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Gestión de Memoria en Apache Spark: Driver OutOfMemory vs Executor OutOfMemory",
    topicIcon: "spark",
    tags: ["Spark Memory", "OutOfMemory", "Driver", "Executor", "PySpark"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Código problemático que colapsa el nodo driver:\ndf_giant_table = spark.table(\"FactSales\") # 100 millones de filas\nlocal_list = df_giant_table.collect()     # Provoca java.lang.OutOfMemoryError en Driver",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un ingeniero de datos ejecuta un Notebook de PySpark en Fabric. La sesión se cuelga y se aborta repentinamente con el error `java.lang.OutOfMemoryError: Java heap space` en el proceso principal (Driver), mientras que los nodos ejecutores permanecían con baja carga de CPU. Al revisar el código del notebook, identificas una llamada a `df.collect()` que intentaba volcar un DataFrame de 80 millones de filas en memoria. ¿Cuál es la causa arquitectónica de este fallo y cómo se debe corregir?",
    options: [
      {
        id: "opt_1",
        "text": "La función collect() envía todas las particiones distribuidas del clúster al único nodo controlador (Driver), desbordando su memoria heap; la solución es evitar collect() en conjuntos de datos grandes, utilizando en su lugar acciones que escriban directamente en OneLake (como df.write.saveAsTable) o limitando la consulta con .take(100) para previsualizaciones.",
        "isCorrect": true,
        "rationale": "`collect()` y `toPandas()` rompen el modelo de procesamiento distribuido reuniendo todas las filas en el nodo driver monohilo. En conjuntos masivos, el driver colapsa con OutOfMemory. Para persistir datos se deben usar operaciones de escritura distribuida en los ejecutores (`df.write`), y para explorar datos usar `.limit()` o `.take()`."
      },
      {
        id: "opt_2",
        "text": "El error ocurre porque la capacidad de Fabric se ha quedado sin espacio de almacenamiento en disco en OneLake.",
        "isCorrect": false,
        "rationale": "El error es un desbordamiento de memoria RAM heap en el proceso JVM del driver, no una falta de espacio en OneLake."
      },
      {
        id: "opt_3",
        "text": "Se soluciona ejecutando `collect()` dos veces consecutivas.",
        "isCorrect": false,
        "rationale": "Ejecutarlo dos veces provocaría el mismo desbordamiento de memoria."
      },
      {
        id: "opt_4",
        "text": "Se debe eliminar la tabla 'FactSales' de OneLake.",
        "isCorrect": false,
        "rationale": "Eliminaría los datos de negocio; el problema es puramente el uso incorrecto de la función en el código de Python."
      }
    ],
    "explanation": "Llamar a `collect()` sobre un DataFrame grande descarga todos los datos al proceso Driver de un solo nodo, provocando un colapso por falta de memoria (Driver OutOfMemoryError).",
    "theoryPill": {
      "title": "Arquitectura de Memoria de Spark: Driver vs Ejecutores",
      "summary": "Prevención de errores de memoria OutOfMemory (OOM) en PySpark.",
      "keyPoints": [
        "Nodo Driver: Coordina el trabajo, mantiene el SparkContext, crea el DAG y asigna tareas a ejecutores. No está dimensionado para almacenar gigabytes de datos en memoria.",
        "Nodos Ejecutores: Procesan particiones de datos en paralelo. Ejecutan las transformaciones y escrituras.",
        "Acciones peligrosas para el Driver: `.collect()`, `.toPandas()`, bucles que concatenan DataFrames locales.",
        "Acciones seguras: `.write.format('delta').saveAsTable()`, `.take(n)`, `.show(n)`, `.limit(n)`."
      ],
      "examTrap": "NUNCA uses `df.collect()` sobre conjuntos grandes de datos; escribe directamente con `df.write` en OneLake o usa `.take(n)` para previsualizar.",
      "searchQuery": "Apache Spark Driver OutOfMemory error collect Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Troubleshoot Apache Spark in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/spark-troubleshoot"
      }
    ]
  },
  {
    id: "DP700-114",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Políticas de Seguridad a Nivel de Fila (Row-Level Security - RLS) en Fabric Warehouse",
    topicIcon: "security",
    tags: ["Warehouse", "RLS", "Security Policy", "Predicate", "T-SQL"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- 1. Función de predicado de seguridad:\nCREATE FUNCTION Security.fn_securitypredicate(@Region AS sysname)\n    RETURNS TABLE\nWITH SCHEMABINDING\nAS\n    RETURN SELECT 1 AS fn_securitypredicate_result\n    WHERE @Region = USER_NAME() OR USER_NAME() = 'AuditorGeneral';\n\n-- 2. Creación de la política de seguridad:\nCREATE SECURITY POLICY Security.SalesFilter\nADD FILTER PREDICATE Security.fn_securitypredicate(Region)\nON dbo.FactSales\nWITH (STATE = ON);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse, necesitas restringir el acceso a la tabla 'FactSales' para que cada gerente de región solo pueda ver las filas donde la columna 'Region' coincida con su identidad autenticada, aplicando la regla de forma transparente para cualquier herramienta cliente (Power BI, SSMS, Python o Excel) que consulte el Warehouse mediante T-SQL. ¿Cómo se implementa esta seguridad relacional nativa?",
    options: [
      {
        id: "opt_1",
        "text": "Creando una función con valores de tabla en línea vinculada a un esquema (inline TVF with SCHEMABINDING) y aplicándola como predicado de filtro (FILTER PREDICATE) mediante una directiva de seguridad CREATE SECURITY POLICY.",
        "isCorrect": true,
        "rationale": "Fabric Warehouse implementa la Seguridad a Nivel de Fila (Row-Level Security - RLS) estándar de SQL Server mediante directivas de seguridad (`CREATE SECURITY POLICY`) y funciones de predicado en línea (`SCHEMABINDING`). El motor SQL inyecta el predicado de forma transparente en todas las consultas sin que el usuario pueda evadirlo."
      },
      {
        id: "opt_2",
        "text": "Creando una vista manual con WHERE Region = 'Norte' y pidiendo a los usuarios que no consulten la tabla base.",
        "isCorrect": false,
        "rationale": "Los usuarios con permisos de lectura podrían consultar la tabla base directamente omitiendo la vista, lo que no constituye una solución de seguridad robusta."
      },
      {
        id: "opt_3",
        "text": "Exportando los datos a archivos CSV separados por cada región en discos locales.",
        "isCorrect": false,
        "rationale": "Destruye la centralización de datos y el gobierno en el almacén de Fabric."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar la autenticación de usuarios en el almacén de datos.",
        "isCorrect": false,
        "rationale": "Dejaría el almacén vulnerable a accesos no autorizados."
      }
    ],
    "explanation": "La Seguridad a Nivel de Fila (RLS) en Fabric Warehouse se implementa mediante `CREATE SECURITY POLICY` y funciones de predicado con enlace a esquema (SCHEMABINDING), filtrando de forma transparente las filas según la identidad del usuario.",
    "theoryPill": {
      "title": "Seguridad a Nivel de Fila (RLS) en Fabric Warehouse",
      "summary": "Control de acceso granular a nivel de fila mediante T-SQL.",
      "keyPoints": [
        "Predicado de filtro (FILTER PREDICATE): Filtra silenciosamente las filas que no cumplen la condición en operaciones SELECT.",
        "Función de predicado: Función con valores de tabla en línea (`RETURNS TABLE WITH SCHEMABINDING`).",
        "Transparencia: El usuario final ejecuta `SELECT * FROM FactSales` y el motor SQL aplica el filtro sin modificar la consulta de la aplicación.",
        "Seguridad centralizada: Aplica a todas las conexiones que acceden al Warehouse mediante el endpoint TDS/SQL."
      ],
      "examTrap": "Para implementar RLS a nivel de base de datos en Fabric Warehouse, se define una función inline TVF con `SCHEMABINDING` y un `CREATE SECURITY POLICY`.",
      "searchQuery": "Row-level security in Microsoft Fabric warehouse T-SQL DP-700"
    },
    "references": [
      {
        "title": "Row-level security in Microsoft Fabric Warehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/row-level-security"
      }
    ]
  },
  {
    id: "DP700-115",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Parametrización de Conexiones en Canalizaciones de Implementación de Fabric (CI/CD)",
    topicIcon: "fabric",
    tags: ["Deployment Pipelines", "CI/CD", "Environment Rules", "Lakehouse", "Parameters"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de implementación (Deployment Pipeline) de Microsoft Fabric que promueve artefactos desde el área de trabajo de 'Desarrollo' hacia 'Producción', tienes un Notebook de Spark y un Dataflow Gen2 que leen de un Lakehouse llamado 'BronzeLakehouse'. Al promover a la fase de Producción, necesitas que los artefactos apunten automáticamente al 'BronzeLakehouse' ubicado en el área de trabajo de producción en lugar del de desarrollo. ¿Qué configuración debes aplicar en la canalización de implementación?",
    options: [
      {
        id: "opt_1",
        "text": "Configurar reglas de implementación (Deployment Rules) en la fase de Producción de la canalización para reasignar el origen de datos o Lakehouse de destino.",
        "isCorrect": true,
        "rationale": "Las reglas de implementación (Deployment Rules) en Fabric Deployment Pipelines permiten mapear artefactos o conexiones de orígenes entre etapas (Dev -> Test -> Prod). Al promover, Fabric reasigna automáticamente las referencias del Lakehouse de desarrollo al Lakehouse de producción sin editar el código del notebook ni del dataflow."
      },
      {
        id: "opt_2",
        "text": "Modificar el código del notebook a mano directamente en el área de trabajo de producción tras cada despliegue.",
        "isCorrect": false,
        "rationale": "La edición manual en producción rompe el flujo automatizado de CI/CD y provoca discrepancias de versiones."
      },
      {
        id: "opt_3",
        "text": "Crear un solo Lakehouse y usarlo simultáneamente para desarrollo, pruebas y producción sin aislamiento.",
        "isCorrect": false,
        "rationale": "Mezclar entornos de desarrollo y producción en el mismo almacén de datos viola todas las directivas de gobernanza y control de cambios."
      },
      {
        id: "opt_4",
        "text": "Eliminar la fase de producción de la canalización de implementación.",
        "isCorrect": false,
        "rationale": "Sin fase de producción no se pueden publicar los cambios a los usuarios finales."
      }
    ],
    "explanation": "Las reglas de implementación en Fabric Deployment Pipelines permiten redirigir automáticamente referencias a Lakehouses, Warehouses o parámetros de conexión al promover artefactos entre diferentes fases.",
    "theoryPill": {
      "title": "Reglas de Implementación (Deployment Rules) en CI/CD de Fabric",
      "summary": "Aislamiento y reasignación automática de entornos en canalizaciones de despliegue.",
      "keyPoints": [
        "Propósito: Evitar que artefactos en Producción lean por error datos del entorno de Desarrollo.",
        "Reglas de origen de datos: Reasigna cadenas de conexión, servidores SQL o instancias de almacenamiento.",
        "Reglas de parámetros: Sustituye valores de parámetros de Power Query o de Notebooks según la fase activa.",
        "Despliegues selectivos: Permite desplegar elementos individuales o todos los cambios pendientes con comparación diferencial visual."
      ],
      "examTrap": "Para que un Notebook o Dataflow cambie automáticamente de Lakehouse al pasar de Dev a Prod, configura 'Deployment Rules' en el Deployment Pipeline.",
      "searchQuery": "Fabric deployment pipelines rules data source mapping DP-700"
    },
    "references": [
      {
        "title": "Deployment rules in Fabric deployment pipelines | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/create-rules"
      }
    ]
  },
  {
    id: "DP700-116",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Z-Order vs Liquid Clustering en Delta Lake: Criterios de Selección",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "Liquid Clustering", "Z-Order", "OPTIMIZE", "Compaction"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Opción Clásica (Z-Order):\nOPTIMIZE Sales ZORDER BY (CustomerId, OrderDate);\n\n-- Opción Moderna (Liquid Clustering):\nALTER TABLE Sales CLUSTER BY (CustomerId, OrderDate);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un proyecto de modernización en Microsoft Fabric, un equipo de ingenieros de datos evalúa si continuar utilizando la técnica tradicional de `OPTIMIZE ... ZORDER BY` o migrar sus tablas Delta masivas a la nueva característica de Liquid Clustering (`CLUSTER BY`). ¿Cuál de las siguientes afirmaciones describe con precisión una ventaja arquitectónica determinante de Liquid Clustering sobre Z-Order?",
    options: [
      {
        id: "opt_1",
        "text": "Liquid Clustering es incremental y optimiza únicamente los nuevos datos insertados sin reescribir toda la tabla, y permite cambiar las columnas de clusterizado en cualquier momento sin reescribir los datos históricos, mientras que Z-Order exige reescribir todas las particiones completas en cada ejecución de OPTIMIZE.",
        "isCorrect": true,
        "rationale": "Liquid Clustering supera las limitaciones fundamentales de Z-Order: opera de forma incremental (el comando OPTIMIZE solo procesa los archivos que lo necesitan en vez de reescribir la tabla completa), no sufre de degradación por inserciones continuas y permite alterar las columnas de ordenación mediante ALTER TABLE sin reescribir los datos pasados."
      },
      {
        id: "opt_2",
        "text": "Z-Order solo funciona en hojas de cálculo de Excel y Liquid Clustering funciona en toda la nube.",
        "isCorrect": false,
        "rationale": "Z-Order es una técnica de Delta Lake de código abierto y no tiene relación con Microsoft Excel."
      },
      {
        id: "opt_3",
        "text": "Liquid Clustering solo admite almacenar datos numéricos del 1 al 10.",
        "isCorrect": false,
        "rationale": "Liquid Clustering admite todos los tipos de datos estándar de Delta Lake."
      },
      {
        id: "opt_4",
        "text": "Z-Order es 1.000 veces más rápido de calcular que cualquier otra técnica.",
        "isCorrect": false,
        "rationale": "Z-Order es extremadamente costoso computacionalmente porque recalcula las curvas de Hilbert sobre todos los archivos en cada ejecución."
      }
    ],
    "explanation": "Liquid Clustering es incremental, flexible y no destructivo: solo optimiza los datos recién incorporados y permite modificar las columnas de agrupación sin reescribir toda la tabla Delta.",
    "theoryPill": {
      "title": "Comparativa de Optimización: Z-Order vs Liquid Clustering en Delta Lake",
      "summary": "Evolución del diseño físico de archivos en lagos de datos modernos.",
      "keyPoints": [
        "Z-Order clásico: Organiza datos multidimensionales con curvas de orden Z (Hilbert). Muy costoso: reescribe todos los archivos participantes en cada ejecución de OPTIMIZE.",
        "Liquid Clustering (Recomendado): Incremental. `OPTIMIZE tabla` solo compacta y agrupa los nuevos archivos escritos desde la última ejecución.",
        "Flexibilidad: Con Liquid Clustering puedes cambiar las columnas de ordenación (`ALTER TABLE ... CLUSTER BY (...)`) instantáneamente en los metadatos.",
        "Sustitución de particiones: Elimina la necesidad de definir jerarquías fijas de directorios con `PARTITIONED BY`."
      ],
      "examTrap": "¿Por qué elegir Liquid Clustering frente a Z-Order? Porque Liquid Clustering es INCREMENTAL y permite cambiar columnas de agrupación sin reescribir la tabla.",
      "searchQuery": "Delta Lake Liquid Clustering vs Z-Order Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Delta Lake Liquid Clustering guidance | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#delta-lake-liquid-clustering"
      }
    ]
  },
  {
    id: "DP700-117",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Aislamiento de Transacciones y Concurrencia en Fabric Warehouse (Snapshot Isolation)",
    topicIcon: "warehouse",
    tags: ["Warehouse", "Snapshot Isolation", "Concurrency", "ACID", "T-SQL"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse, se está ejecutando un proceso de ingesta por lotes de larga duración que actualiza e inserta 20 millones de filas en la tabla 'FactOrders'. Al mismo tiempo, cientos de usuarios de negocio están ejecutando consultas analíticas de Power BI contra esa misma tabla. ¿Cómo gestiona el motor relacional de Fabric Warehouse el aislamiento de transacciones para garantizar que los lectores no bloqueen a los escritores y que los informes nunca vean datos parciales o no confirmados (dirty reads)?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizando el nivel de aislamiento de instantánea (Snapshot Isolation / Read Committed Snapshot), donde los lectores consultan una instantánea coherente con los datos confirmados al inicio de la consulta sin adquirir bloqueos compartidos de lectura, y los escritores generan nuevas versiones de datos de forma aislada.",
        "isCorrect": true,
        "rationale": "Fabric Warehouse implementa Snapshot Isolation como modelo de concurrencia predeterminado. Los lectores leen una instantánea transaccionalmente consistente de los datos confirmados sin bloquear a las operaciones de escritura concurrentes, y los escritores escriben nuevas versiones Delta sin bloquear a los lectores, eliminando los bloqueos por contención de concurrencia."
      },
      {
        id: "opt_2",
        "text": "Bloqueando toda la base de datos de forma exclusiva en modo monousuario durante la carga por lotes.",
        "isCorrect": false,
        "rationale": "Bloquear la base de datos impediría a todos los usuarios de negocio consultar informes de Power BI durante la carga."
      },
      {
        id: "opt_3",
        "text": "Permitiendo lecturas sucias (dirty reads) sin ninguna garantía transaccional.",
        "isCorrect": false,
        "rationale": "Fabric Warehouse ofrece soporte transaccional ACID completo; nunca expone lecturas sucias no confirmadas."
      },
      {
        id: "opt_4",
        "text": "Cancelando automáticamente las consultas de los usuarios si superan 3 segundos.",
        "isCorrect": false,
        "rationale": "No es el mecanismo de aislamiento de transacciones de Fabric."
      }
    ],
    "explanation": "Fabric Warehouse utiliza aislamiento de instantánea (Snapshot Isolation) basado en el control de versiones de filas en Delta Lake para que las consultas de lectura y los procesos de escritura se ejecuten concurrentemente sin bloquearse entre sí.",
    "theoryPill": {
      "title": "Aislamiento de Transacciones y Concurrencia en Fabric Warehouse",
      "summary": "Concurrencia masiva sin contención entre lectores y escritores.",
      "keyPoints": [
        "Snapshot Isolation: Garantiza que cada consulta SELECT lea una instantánea fija y consistente de los datos en el momento en que se inició.",
        "Sin bloqueos compartidos de lectura: Los lectores nunca impiden que un proceso `INSERT`, `UPDATE` o `DELETE` modifique la tabla.",
        "Escrituras concurrentes: Si dos escritores intentan modificar las mismas filas simultáneamente, el motor resuelve el conflicto mediante control de concurrencia optimista (OCC).",
        "Beneficio para BI: Los informes de Power BI se actualizan de forma continua sin verse afectados por cargas de fondo de Data Factory."
      ],
      "examTrap": "En Fabric Warehouse, los lectores NO bloquean a los escritores gracias al nivel de aislamiento de instantánea (Snapshot Isolation).",
      "searchQuery": "Transaction isolation levels Fabric Warehouse snapshot isolation DP-700"
    },
    "references": [
      {
        "title": "Transactions and concurrency in Microsoft Fabric Warehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/transactions"
      }
    ]
  },
  {
    id: "DP700-118",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Desencadenadores y Detección de Anomalías con Fabric Activator",
    topicIcon: "kql",
    tags: ["Data Activator", "Real-Time", "Triggers", "Conditions", "Alerts"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una solución de Real-Time Intelligence, configuras Fabric Activator para monitorizar los eventos de vibración de una turbina eólica que llegan a un Eventstream. Quieres que se dispare una alerta únicamente si el valor de la propiedad 'VibrationLevel' se mantiene por encima de 85 Hz durante más de 3 eventos consecutivos dentro de una ventana de 10 minutos, evitando disparos accidentales por picos aislados de milisegundos. ¿Cómo se configura esta lógica en Fabric Activator?",
    options: [
      {
        id: "opt_1",
        "text": "Creando un desencadenador (Trigger) en Activator que defina una condición de umbral numérico con una cláusula de duración o persistencia temporal (ej. 'Permanece por encima de 85 durante 10 minutos').",
        "isCorrect": true,
        "rationale": "Fabric Activator admite condiciones avanzadas de umbral con persistencia temporal (time-based duration filters), permitiendo filtrar anomalías transitorias y disparar acciones solo cuando una métrica se mantiene en estado crítico durante un intervalo de tiempo específico o número de lecturas continuas."
      },
      {
        id: "opt_2",
        "text": "Programar una alarma en el teléfono despertador del ingeniero de guardia.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica que no utiliza los sistemas de alerta de Fabric."
      },
      {
        id: "opt_3",
        "text": "Desconectar los cables del sensor de la turbina.",
        "isCorrect": false,
        "rationale": "Impediría monitorizar la turbina provocando riesgos de rotura física catastrófica."
      },
      {
        id: "opt_4",
        "text": "Escribir un documento de texto en Notepad con el número 85.",
        "isCorrect": false,
        "rationale": "No es una solución de ingeniería de datos en tiempo real."
      }
    ],
    "explanation": "Fabric Activator permite definir desencadenadores con condiciones de persistencia temporal (ej. permanecer por encima de un umbral durante X minutos) para prevenir falsos positivos en alertas de IoT.",
    "theoryPill": {
      "title": "Configuración de Reglas y Condiciones en Fabric Activator",
      "summary": "Filtrado de ruido y detección de anomalías continuas en streaming.",
      "keyPoints": [
        "Tipos de eventos: Datos procedentes de Eventstreams, consultas KQL o modelos de Power BI.",
        "Condiciones de umbral: Mayor que, menor que, entra en un rango, sale de un rango.",
        "Duración temporal: Evalúa si la condición persiste durante un período (ej. 'por más de 5 minutos') antes de activar la acción.",
        "Acciones: Mensaje enriquecido en canal o chat de Teams, correo electrónico con tarjeta adaptativa, o ejecución de un webhook/Power Automate."
      ],
      "examTrap": "Para evitar alertas innecesarias por picos transitorios breves en Activator, utiliza condiciones de duración temporal ('Stays above threshold for X minutes').",
      "searchQuery": "Create triggers and alerts in Microsoft Fabric Data Activator DP-700"
    },
    "references": [
      {
        "title": "Create triggers in Data Activator | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-activator/data-activator-create-triggers"
      }
    ]
  },
  {
    id: "DP700-119",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Inspección de Metadatos y Auditoría de Transacciones con DESCRIBE HISTORY en Delta Lake",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "DESCRIBE HISTORY", "Audit", "Operations", "Metadata"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Consulta del historial de transacciones de una tabla Delta:\nDESCRIBE HISTORY lakehouse.FactSales LIMIT 10;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Lakehouse, un proceso nocturno modificó miles de registros en la tabla 'FactSales'. Como ingeniero de datos, necesitas auditar qué operación exacta se ejecutó (MERGE, WRITE, UPDATE, OPTIMIZE), qué usuario o aplicación confirmó la transacción, cuántas filas fueron insertadas o modificadas (`operationMetrics`) y en qué marca temporal exacta ocurrió. ¿Qué instrucción SQL nativa de Delta Lake debes ejecutar?",
    options: [
      {
        id: "opt_1",
        "text": "DESCRIBE HISTORY lakehouse.FactSales;",
        "isCorrect": true,
        "rationale": "`DESCRIBE HISTORY` lee directamente el registro inmutable de transacciones (_delta_log) de la tabla Delta y devuelve una tabla cronológica con cada versión, la operación ejecutada (WRITE, MERGE, DELETE), los parámetros del motor, el usuario, y un diccionario completo con las métricas de la operación (número de filas insertadas, actualizadas o escaneadas)."
      },
      {
        id: "opt_2",
        "text": "SELECT * FROM sys.all_historical_windows_logs;",
        "isCorrect": false,
        "rationale": "Vista inexistente en Apache Spark y Delta Lake."
      },
      {
        id: "opt_3",
        "text": "Revisar los correos electrónicos antiguos de los empleados de la empresa.",
        "isCorrect": false,
        "rationale": "No proporciona telemetría técnica verificable de las transacciones de OneLake."
      },
      {
        id: "opt_4",
        "text": "TRUNCATE TABLE lakehouse.FactSales;",
        "isCorrect": false,
        "rationale": "Borraría la tabla completa destruyendo los datos de negocio."
      }
    ],
    "explanation": "La instrucción `DESCRIBE HISTORY` en Delta Lake proporciona una auditoría completa de todas las transacciones históricas, operaciones DDL/DML, métricas de filas modificadas y marcas de tiempo registradas en el _delta_log.",
    "theoryPill": {
      "title": "Auditoría de Tablas Delta con DESCRIBE HISTORY",
      "summary": "Inspección del registro transaccional y métricas de operaciones.",
      "keyPoints": [
        "Información devuelta: `version`, `timestamp`, `userId`, `userName`, `operation` (MERGE, UPDATE, WRITE, VACUUM, OPTIMIZE).",
        "operationParameters: Parámetros utilizados en la llamada (ej. predicado de join, modo de particionado).",
        "operationMetrics: Diccionario detallado (`numTargetRowsInserted`, `numTargetRowsUpdated`, `numFilesAdded`, `numFilesRemoved`).",
        "Time Travel: Permite identificar la versión exacta a la que se desea volver con `RESTORE TABLE`."
      ],
      "examTrap": "Para auditar qué operación modificó una tabla Delta y cuántas filas se vieron afectadas en cada versión, ejecuta `DESCRIBE HISTORY [tabla]`.",
      "searchQuery": "DESCRIBE HISTORY Delta Lake audit operations Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Review Delta Lake table history | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#table-history"
      }
    ]
  },
  {
    id: "DP700-120",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Tratamiento de Calidad, Imputación de Nulos y Deriva de Esquemas en PySpark",
    topicIcon: "spark",
    tags: ["PySpark", "Data Quality", "fillna", "dropna", "Imputation"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Imputación selectiva de valores nulos por tipo de columna:\ndf_clean = df_raw.fillna({\n    'Revenue': 0.0,\n    'Quantity': 0,\n    'CustomerSegment': 'Unknown',\n    'IsActive': False\n})",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de ingeniería de datos en Fabric, procesas un DataFrame crudo donde diversas columnas contienen valores nulos (NULL) que provocan errores en los modelos de Machine Learning y en los informes analíticos downstream. Necesitas reemplazar los valores nulos con un diccionario de reglas de negocio específicas: las columnas numéricas de importe deben sustituirse por 0.0, las cantidades enteras por 0, el segmento de cliente por 'Unknown' y el estado booleano por False, todo en una sola operación sin encadenar múltiples sentencias CASE WHEN manuales. ¿Qué método nativo de PySpark proporciona esta funcionalidad?",
    options: [
      {
        id: "opt_1",
        "text": "El método df_raw.fillna(diccionario_de_valores) (o df_raw.na.fill(diccionario)).",
        "isCorrect": true,
        "rationale": "El método `fillna()` (o su equivalente `na.fill()`) en PySpark acepta un diccionario que asigna nombres de columna a sus respectivos valores de sustitución según el tipo de datos. Reemplaza eficientemente todos los valores nulos en una sola pasada distribuida sin la sobrecarga de múltiples expresiones condicionales."
      },
      {
        id: "opt_2",
        "text": "df_raw.dropna() eliminando todas las filas con cualquier valor nulo.",
        "isCorrect": false,
        "rationale": "dropna() descartaría filas enteras de transacciones legítimas en lugar de imputar valores por defecto para permitir su análisis."
      },
      {
        id: "opt_3",
        "text": "df_raw.filter(\"Revenue != 0.0\")",
        "isCorrect": false,
        "rationale": "Filtrar por Revenue != 0.0 no imputa valores nulos en CustomerSegment o IsActive y descarta ventas reales de 0."
      },
      {
        id: "opt_4",
        "text": "Exportar a Microsoft Word y usar la opción 'Buscar y reemplazar'.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica que no escala a millones de filas en clústeres de Spark."
      }
    ],
    "explanation": "El método `fillna()` de PySpark con un diccionario de mapeo permite imputar valores nulos de forma selectiva por columna y tipo de datos en una única transformación distribuida eficiente.",
    "theoryPill": {
      "title": "Imputación y Tratamiento de Valores Nulos en PySpark",
      "summary": "Limpieza y estandarización de datos para la capa Silver.",
      "keyPoints": [
        "df.fillna(valor): Reemplaza todos los nulos de un tipo de datos coincidente en todo el DataFrame.",
        "df.fillna(dict): Reemplaza valores nulos según un mapa pormenorizado `{ 'columna': valor_por_defecto }`.",
        "df.dropna(how='any'/'all', subset=['col1']): Elimina filas si contienen nulos en columnas críticas donde no sea válida la imputación (ej. claves primarias o fechas).",
        "coalesce(col1, col2, lit(defecto)): Función escalar para seleccionar el primer valor no nulo entre múltiples columnas candidatas."
      ],
      "examTrap": "Para imputar valores por defecto diferentes a múltiples columnas en una sola pasada en PySpark, pasa un diccionario a `df.fillna({'Col': Val})`.",
      "searchQuery": "PySpark fillna na.fill dictionary replace nulls Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "DataFrame.fillna in Apache Spark PySpark | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/spark/latest/spark-sql/language-manual/functions/coalesce"
      }
    ]
  }
];

console.log(`Prepared ${dp700Batch4.length} additional questions for DP-700.`);


