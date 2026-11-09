/**
 * scripts/build-expansion-dp700-part1.js
 * 20 High-Fidelity Questions for DP-700 (DP700-061 to DP700-080)
 * Certification: Implementing Data Engineering Solutions Using Microsoft Fabric (DP-700)
 */

export const dp700QuestionsPart1 = [
  {
    id: "DP700-061",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "PySpark Structured Streaming y Checkpointing en Delta Lake",
    topicIcon: "spark",
    tags: ["Structured Streaming", "PySpark", "Delta Lake", "Checkpoint", "Trigger"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "query = (df_stream.writeStream\n    .format(\"delta\")\n    .outputMode(\"append\")\n    .option(\"checkpointLocation\", \"Files/checkpoints/telemetry/\")\n    .trigger(availableNow=True)\n    .toTable(\"raw_telemetry\"))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de Microsoft Fabric, configuras una canalización de PySpark Structured Streaming para procesar archivos JSON continuos que llegan a OneLake y escribirlos en una tabla Delta 'raw_telemetry'. Deseas que el flujo procese todos los micro-lotes disponibles en ese momento a la máxima velocidad posible y luego finalice de forma limpia para liberar los recursos del clúster de Spark (en lugar de permanecer activo indefinidamente consumiendo unidades de capacidad). ¿Qué opción de desencadenador (Trigger) debes configurar?",
    options: [
      {
        id: "opt_1",
        "text": ".trigger(availableNow=True)",
        "isCorrect": true,
        "rationale": "El desencadenador `trigger(availableNow=True)` procesa todos los datos que hayan llegado desde la última ejecución en micro-lotes eficientes y finaliza la consulta automáticamente una vez consumida toda la cola, siendo el patrón óptimo para ejecuciones por lotes rentables en Fabric."
      },
      {
        id: "opt_2",
        "text": ".trigger(continuous=\"1 second\")",
        "isCorrect": false,
        "rationale": "El modo continuo requiere clústeres siempre activos y no está diseñado para detenerse tras procesar los datos disponibles."
      },
      {
        id: "opt_3",
        "text": ".trigger(once=False)",
        "isCorrect": false,
        "rationale": "Sintaxis no válida en la API de Structured Streaming."
      },
      {
        id: "opt_4",
        "text": ".trigger(neverStop=True)",
        "isCorrect": false,
        "rationale": "Parámetro ficticio inexistente en Apache Spark."
      }
    ],
    "explanation": "El trigger `availableNow=True` en Apache Spark Structured Streaming procesa todos los datos disponibles en el origen dividiéndolos en micro-lotes y finaliza la sesión al terminar, optimizando el consumo de capacidad en Microsoft Fabric.",
    "theoryPill": {
      "title": "Structured Streaming con Delta Lake en Microsoft Fabric",
      "summary": "Ingesta continua y por micro-lotes con tolerancia a fallos.",
      "keyPoints": [
        "Checkpointing (checkpointLocation): Directorio obligatorio en OneLake donde Spark almacena el progreso de lectura y estado para garantizar semántica 'exactly-once'.",
        "trigger(availableNow=True): Sustituto moderno y superior de `trigger(once=True)`. Procesa todos los datos pendientes en micro-lotes y apaga el job para ahorrar CUs.",
        "OutputMode: 'append' (agrega nuevas filas a la tabla Delta), 'complete' (reescribe toda la tabla con agregaciones), 'update' (actualiza filas modificadas).",
        "toTable(): Escribe directamente en el catálogo del Lakehouse de Fabric."
      ],
      "examTrap": "Para procesar streaming incremental como un trabajo por lotes periódico que finalice al terminar de procesar los datos pendientes, usa `trigger(availableNow=True)`.",
      "searchQuery": "PySpark Structured Streaming trigger availableNow Fabric DP-700"
    },
    "references": [
      {
        "title": "Use Delta Lake in Microsoft Fabric notebooks | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake"
      }
    ]
  },
  {
    id: "DP700-062",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Agrupación en Clústeres Líquidos de Delta Lake (Liquid Clustering)",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "Liquid Clustering", "CLUSTER BY", "Partitioning", "Performance"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Creación de tabla con Liquid Clustering:\nCREATE TABLE lakehouse.FactTelemetry (\n    DeviceID STRING,\n    ReadingDate DATE,\n    SensorType STRING,\n    Value DOUBLE\n)\nUSING DELTA\nCLUSTER BY (ReadingDate, DeviceID);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una tabla Delta masiva de telemetría de 500 terabytes en un Fabric Lakehouse, las consultas filtran habitualmente por combinaciones arbitrarias de 'ReadingDate' y 'DeviceID'. El particionamiento tradicional (`PARTITIONED BY (ReadingDate)`) genera millones de archivos diminutos (problema de 'small files') y sesgo de datos (skew). Necesitas una técnica moderna de Delta Lake compatible con Fabric que evite el particionamiento rígido y optimice el diseño de archivos sin requerir reescrituras completas de datos al modificar las columnas de agrupación. ¿Qué técnica debes implementar?",
    options: [
      {
        id: "opt_1",
        "text": "Agrupación en clústeres líquidos (Liquid Clustering) mediante la cláusula CLUSTER BY (ReadingDate, DeviceID).",
        "isCorrect": true,
        "rationale": "Delta Lake Liquid Clustering sustituye tanto al particionamiento tradicional por directorios como al Z-Order rígido. Organiza los datos de forma flexible e incremental sin crear jerarquías fijas de directorios, evita el problema de archivos pequeños y permite redefinir las columnas de clusterizado sin necesidad de reescribir toda la tabla."
      },
      {
        id: "opt_2",
        "text": "Particionar la tabla por las 50 columnas del esquema simultáneamente.",
        "isCorrect": false,
        "rationale": "Crearía una explosión de millones de particiones vacías con archivos de pocos bytes, destruyendo el rendimiento del almacenamiento."
      },
      {
        id: "opt_3",
        "text": "Desactivar la compresión Parquet y guardar los datos como texto CSV sin indexar.",
        "isCorrect": false,
        "rationale": "CSV carece de capacidades de clusterizado, metadatos transaccionales y poda de archivos."
      },
      {
        id: "opt_4",
        "text": "Crear 10.000 Lakehouses separados, uno para cada DeviceID.",
        "isCorrect": false,
        "rationale": "Una arquitectura aberrante y completamente inmanejable."
      }
    ],
    "explanation": "Liquid Clustering es la evolución de Delta Lake en Microsoft Fabric que sustituye al particionamiento fijo tradicional, optimizando la distribución de archivos para lecturas concurrentes con CLUSTER BY.",
    "theoryPill": {
      "title": "Liquid Clustering en Delta Lake (CLUSTER BY)",
      "summary": "Agrupación multidimensional flexible que reemplaza al particionamiento clásico.",
      "keyPoints": [
        "Sintaxis: `CREATE TABLE ... CLUSTER BY (columna1, columna2)` o en tablas existentes `ALTER TABLE ... CLUSTER BY (...)`.",
        "Ventajas sobre PARTITIONED BY: Evita el sesgo de datos (data skew) y el problema de sobreparticionamiento de archivos pequeños.",
        "Ventajas sobre Z-Order: Es incremental (solo optimiza los nuevos datos añadidos), no requiere reescribir toda la tabla.",
        "Mantenimiento: Se mantiene ejecutando periódicamente `OPTIMIZE tabla;` en PySpark o SQL."
      ],
      "examTrap": "Para tablas grandes con patrones de consulta cambiantes y prevención de archivos pequeños en Fabric, la recomendación de Delta Lake es 'Liquid Clustering' (CLUSTER BY).",
      "searchQuery": "Delta Lake liquid clustering Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Use Delta Lake liquid clustering in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#delta-lake-liquid-clustering"
      }
    ]
  },
  {
    id: "DP700-063",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Fuente de Cambios de Datos en Delta Lake (Change Data Feed - CDF)",
    topicIcon: "spark",
    tags: ["Change Data Feed", "CDF", "Delta Lake", "PySpark", "CDC", "Medallion"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- 1. Habilitación de CDF:\nALTER TABLE bronze_orders SET TBLPROPERTIES (delta.enableChangeDataFeed = true);\n\n-- 2. Lectura incremental en PySpark:\ndf_changes = (spark.readStream.format(\"delta\")\n    .option(\"readChangeFeed\", \"true\")\n    .option(\"startingVersion\", 10)\n    .table(\"bronze_orders\"))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una arquitectura Medallion en Microsoft Fabric, la tabla 'bronze_orders' recibe inserciones, actualizaciones y eliminaciones continuas. La capa Silver posterior necesita procesar de forma incremental únicamente los cambios exactos (conociendo el tipo de operación: 'insert', 'update_preimage', 'update_postimage' o 'delete') sin comparar tablas completas mediante operaciones costosas de DIFF. ¿Qué característica de Delta Lake debes habilitar?",
    options: [
      {
        id: "opt_1",
        "text": "Habilitar la fuente de cambios de datos de Delta Lake (Change Data Feed - CDF) mediante la propiedad delta.enableChangeDataFeed = true y leer con la opción readChangeFeed.",
        "isCorrect": true,
        "rationale": "Delta Lake Change Data Feed (CDF) registra y expone automáticamente los cambios fila a fila producidos por transacciones INSERT, UPDATE y DELETE junto con metadatos contextuales (`_change_type`, `_commit_version`, `_commit_timestamp`), permitiendo alimentar canalizaciones CDC incrementales hacia Silver y Gold."
      },
      {
        id: "opt_2",
        "text": "Ejecutar un SELECT * diario y calcular el hash MD5 de todas las columnas.",
        "isCorrect": false,
        "rationale": "Calcular hashes de toda la tabla requiere escanear miles de millones de filas en cada ejecución, multiplicando los costes y el tiempo."
      },
      {
        id: "opt_3",
        "text": "Configurar una clave externa en Microsoft Access.",
        "isCorrect": false,
        "rationale": "Microsoft Access no gestiona transmisiones de cambios en lagos de datos Delta de OneLake."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar las transacciones ACID en el Lakehouse.",
        "isCorrect": false,
        "rationale": "Las tablas Delta son transaccionales por definición; deshabilitar transacciones corrompería la consistencia del lago."
      }
    ],
    "explanation": "Delta Lake Change Data Feed (CDF) permite a los ingenieros de datos propagar de forma incremental y eficiente las inserciones, actualizaciones y borrados a lo largo de las capas de una arquitectura Medallion.",
    "theoryPill": {
      "title": "Delta Lake Change Data Feed (CDF)",
      "summary": "Captura y propagación incremental de cambios entre capas Bronze, Silver y Gold.",
      "keyPoints": [
        "Propiedad: `ALTER TABLE nombre SET TBLPROPERTIES (delta.enableChangeDataFeed = true)`.",
        "Columnas de metadatos añadidas: `_change_type` ('insert', 'update_preimage', 'update_postimage', 'delete'), `_commit_version`, `_commit_timestamp`.",
        "Lectura: Admite lectura por lotes (`spark.read.format('delta').option('readChangeFeed', 'true')...`) y en streaming (`spark.readStream...`).",
        "Eficiencia: Solo lee los registros de cambios sin escanear la tabla base completa."
      ],
      "examTrap": "Para rastrear y propagar UPDATEs y DELETEs de forma incremental en Spark, se utiliza 'Change Data Feed' (CDF) con `readChangeFeed=true`.",
      "searchQuery": "Delta Lake Change Data Feed Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Use Delta Lake change data feed in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#change-data-feed"
      }
    ]
  },
  {
    id: "DP700-064",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Viaje en el Tiempo (Time Travel) y Restauración en Delta Lake",
    topicIcon: "lakehouse",
    tags: ["Time Travel", "Delta Lake", "RESTORE", "VERSION AS OF", "Disaster Recovery"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Opción 1: Consulta temporal\nSELECT * FROM SilverOrders VERSION AS OF 14;\n\n-- Opción 2: Restauración completa de la tabla\nRESTORE TABLE SilverOrders TO VERSION AS OF 14;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un proceso de transformación de datos fallido ejecutó accidentalmente una instrucción `DELETE FROM SilverOrders WHERE Region = 'EMEA'`, eliminando 1 millón de registros válidos hace 2 horas. Necesitas restaurar la tabla 'SilverOrders' exactamente al estado previo a ese error humano sin tener que restaurar copias de seguridad de almacenamiento ni rehacer la ingesta desde el origen. ¿Qué comando nativo de Delta Lake debes ejecutar?",
    options: [
      {
        id: "opt_1",
        "text": "RESTORE TABLE SilverOrders TO TIMESTAMP AS OF '...' (o TO VERSION AS OF número_version).",
        "isCorrect": true,
        "rationale": "Delta Lake mantiene un registro inmutable de transacciones (_delta_log) que admite 'Time Travel'. El comando T-SQL/Spark SQL `RESTORE TABLE` restablece instantáneamente la tabla a una versión o marca temporal específica del pasado creando una nueva confirmación en el log sin mover archivos de datos."
      },
      {
        id: "opt_2",
        "text": "DROP TABLE SilverOrders;",
        "isCorrect": false,
        "rationale": "Eliminaría la tabla por completo y empeoraría la pérdida de datos."
      },
      {
        id: "opt_3",
        "text": "Crear un ticket de soporte técnico a Microsoft pidiendo que apaguen el centro de datos.",
        "isCorrect": false,
        "rationale": "No es una solución de ingeniería de datos y Time Travel está disponible de forma autónoma en Delta Lake."
      },
      {
        id: "opt_4",
        "text": "Ejecutar VACUUM RETAIN 0 HOURS inmediatamente.",
        "isCorrect": false,
        "rationale": "Ejecutar VACUUM borraría físicamente los archivos históricos, impidiendo para siempre recuperar los datos eliminados."
      }
    ],
    "explanation": "El comando `RESTORE TABLE` de Delta Lake aprovecha el registro de transacciones para revertir una tabla al estado exacto que tenía en una versión o marca temporal anterior.",
    "theoryPill": {
      "title": "Viaje en el Tiempo (Time Travel) y RESTORE en Delta Lake",
      "summary": "Auditoría temporal, reversión de errores y reproducibilidad de experimentos.",
      "keyPoints": [
        "Consulta histórica: `SELECT * FROM tabla VERSION AS OF 12` o `TIMESTAMP AS OF '2026-11-01 10:00:00'`.",
        "Restauración transaccional: `RESTORE TABLE tabla TO VERSION AS OF 12;` (crea un nuevo commit que devuelve la tabla a esa instantánea).",
        "Retención: Funciona mientras los archivos Parquet del pasado no hayan sido purgados mediante el comando `VACUUM`.",
        "PySpark Time Travel: `spark.read.format('delta').option('versionAsOf', 12).table('tabla')`."
      ],
      "examTrap": "Para volver atrás tras un borrado o corrupción accidental en una tabla Delta, se usa `RESTORE TABLE ... TO VERSION AS OF`.",
      "searchQuery": "Delta Lake time travel restore table Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Work with Delta Lake tables in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#time-travel"
      }
    ]
  },
  {
    id: "DP700-065",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Operación VACUUM y Retención en Delta Lake",
    topicIcon: "lakehouse",
    tags: ["VACUUM", "Delta Lake", "Storage Cleanup", "Tombstones", "Retention Period"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "VACUUM SilverOrders RETAIN 168 HOURS;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Lakehouse con alta tasa de ingesta y actualizaciones frecuentes, el tamaño de almacenamiento en OneLake está creciendo debido a que Delta Lake mantiene versiones antiguas de archivos Parquet que ya no son referenciadas por la última confirmación de transacciones. Necesitas eliminar físicamente los archivos de datos obsoletos no referenciados que tengan más de 7 días (168 horas) de antigüedad para liberar espacio y costes, sin romper el Time Travel de los últimos 7 días. ¿Qué instrucción de mantenimiento debes ejecutar?",
    options: [
      {
        id: "opt_1",
        "text": "VACUUM SilverOrders RETAIN 168 HOURS (o el periodo de retención predeterminado de 7 días).",
        "isCorrect": true,
        "rationale": "El comando `VACUUM` de Delta Lake purga físicamente del almacenamiento los archivos Parquet que ya no están referenciados por el registro de transacciones más reciente y que superan el umbral de retención especificado (7 días / 168 horas por defecto), protegiendo las consultas concurrentes activas y el Time Travel reciente."
      },
      {
        id: "opt_2",
        "text": "DELETE FROM SilverOrders WHERE 1=1;",
        "isCorrect": false,
        "rationale": "DELETE marca lógicamente las filas como eliminadas pero crea nuevas versiones y no borra los archivos Parquet físicos del lago."
      },
      {
        id: "opt_3",
        "text": "OPTIMIZE SilverOrders ZORDER BY (OrderDate);",
        "isCorrect": false,
        "rationale": "OPTIMIZE compacta y ordena archivos, pero de hecho crea nuevos archivos Parquet y no purga los antiguos sin ejecutar VACUUM."
      },
      {
        id: "opt_4",
        "text": "Formatear el disco de OneLake en formato NTFS.",
        "isCorrect": false,
        "rationale": "OneLake es un lago de datos distribuido en la nube, no un disco local administrable con NTFS."
      }
    ],
    "explanation": "El comando `VACUUM` de Delta Lake elimina físicamente los archivos de datos desvinculados que han quedado obsoletos tras operaciones de UPDATE, DELETE u OPTIMIZE y que exceden el período de retención.",
    "theoryPill": {
      "title": "Mantenimiento de Tablas con VACUUM en Delta Lake",
      "summary": "Limpieza física de archivos obsoletos y control de costes de almacenamiento.",
      "keyPoints": [
        "Comportamiento: Elimina archivos de datos que ya no son referenciados en el _delta_log y cuya antigüedad supera el umbral RETAIN.",
        "Retención predeterminada: 7 días (168 horas). Previene la corrupción de consultas de larga duración en curso que aún leen versiones anteriores.",
        "Impacto en Time Travel: Una vez ejecutado VACUUM sobre archivos de más de 7 días, ya no es posible consultar ni hacer RESTORE a versiones anteriores a ese umbral.",
        "Comprobación previa (Dry run): En Spark se puede probar con `VACUUM tabla DRY RUN` para ver qué archivos se eliminarían sin borrarlos."
      ],
      "examTrap": "VACUUM borra archivos físicos; OPTIMIZE compacta archivos pequeños en archivos más grandes. Son operaciones complementarias pero diferentes.",
      "searchQuery": "Delta Lake VACUUM command Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Clean up uncommitted or historical files with VACUUM | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#vacuum"
      }
    ]
  },
  {
    id: "DP700-066",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Actividad ForEach en Fabric Data Factory Pipelines",
    topicIcon: "pipeline",
    tags: ["Data Pipelines", "ForEach", "Concurrency", "Sequential", "Set Variable"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de Fabric Data Factory, estás utilizando una actividad 'ForEach' para iterar sobre una lista de 40 tablas que se deben ingestar en paralelo. Sin embargo, dentro del bucle ForEach intentas utilizar una actividad 'Set Variable' para modificar una variable de canalización booleana 'IsSuccess', pero la canalización produce un error de validación durante el diseño. ¿Cuál es la limitación arquitectónica de la actividad ForEach en Azure/Fabric Data Factory respecto a la asignación de variables?",
    options: [
      {
        id: "opt_1",
        "text": "La actividad Set Variable no se puede utilizar dentro de una actividad ForEach cuando la ejecución es paralela, porque las variables tienen ámbito de canalización global y la asignación concurrente provocaría condiciones de carrera (race conditions).",
        "isCorrect": true,
        "rationale": "Las variables de canalización son globales en tiempo de ejecución. Permitir que múltiples iteraciones paralelas de un ForEach modifiquen la misma variable provocaría condiciones de carrera no deterministas. Por ello, Data Factory bloquea el uso de 'Set Variable' dentro de ForEach (salvo que se marque la opción 'Sequential' explícitamente en la configuración de la actividad)."
      },
      {
        id: "opt_2",
        "text": "La actividad ForEach solo admite un máximo de 2 iteraciones en Microsoft Fabric.",
        "isCorrect": false,
        "rationale": "ForEach admite hasta 5.000 elementos en su matriz de entrada y hasta 50 ejecuciones concurrentes simultáneas."
      },
      {
        id: "opt_3",
        "text": "Las variables de canalización solo se pueden editar en días festivos.",
        "isCorrect": false,
        "rationale": "No existe ninguna restricción de calendario en las variables de Data Factory."
      },
      {
        id: "opt_4",
        "text": "ForEach no admite ninguna actividad en su interior.",
        "isCorrect": false,
        "rationale": "ForEach está diseñada precisamente para ejecutar actividades anidadas (Copy, Notebook, Web, etc.)."
      }
    ],
    "explanation": "En Fabric Data Pipelines, la actividad 'Set Variable' no está permitida dentro de un bucle 'ForEach' en modo concurrente para prevenir condiciones de carrera sobre variables de ámbito global.",
    "theoryPill": {
      "title": "Reglas de Concurrencia en la Actividad ForEach de Data Factory",
      "summary": "Diseño robusto de bucles de iteración y gestión de variables.",
      "keyPoints": [
        "Ejecución concurrente: Por defecto ejecuta en paralelo (hasta 50 hilos concurrentes).",
        "Ejecución secuencial: La casilla 'Sequential' fuerza a procesar una iteración después de otra (único caso donde se permite Set Variable).",
        "Paso de contexto: La expresión `@item()` hace referencia al elemento actual de la iteración dentro de las actividades hijas.",
        "Alternativa a Set Variable: Si se necesita devolver resultados de actividades internas, usar la salida de la actividad (`@activity('Nombre').output`) en lugar de variables globales."
      ],
      "examTrap": "¿Por qué falla 'Set Variable' dentro de ForEach? Porque ForEach se ejecuta en paralelo y las variables tienen ámbito global de canalización (race condition).",
      "searchQuery": "ForEach activity Set Variable limitation Fabric Data Factory DP-700"
    },
    "references": [
      {
        "title": "ForEach activity in Azure and Fabric Data Factory | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/foreach-activity"
      }
    ]
  },
  {
    id: "DP700-067",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Actividad Script vs Stored Procedure en Fabric Data Pipelines",
    topicIcon: "pipeline",
    tags: ["Data Pipelines", "Script Activity", "Stored Procedure", "Warehouse", "T-SQL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de datos de Fabric, necesitas ejecutar una sentencia DDL arbitraria (como `TRUNCATE TABLE dbo.StagingTable;` y luego un `ALTER TABLE ...`) contra un Fabric Warehouse, y necesitas capturar el conjunto de resultados (ResultSet) de una consulta posterior dentro de la misma actividad para usarlo en actividades downstream. ¿Qué actividad nativa de la canalización proporciona esta flexibilidad de ejecución directa de scripts T-SQL?",
    options: [
      {
        id: "opt_1",
        "text": "La actividad Script (Script activity).",
        "isCorrect": true,
        "rationale": "La actividad Script permite ejecutar cualquier comando o bloque de código SQL (DML, DDL, consultas con múltiples instrucciones) contra un Warehouse o SQL Endpoint de Fabric y devuelve los conjuntos de resultados directamente a la canalización en formato JSON para que actividades posteriores puedan consumirlos."
      },
      {
        id: "opt_2",
        "text": "La actividad Web enviando un formulario HTML.",
        "isCorrect": false,
        "rationale": "La actividad Web invoca endpoints HTTP REST externos, no ejecuta bloques T-SQL directos en el motor interno del Warehouse."
      },
      {
        id: "opt_3",
        "text": "La actividad Wait esperando 15 minutos.",
        "isCorrect": false,
        "rationale": "La actividad Wait solo suspende la ejecución temporalmente sin interactuar con la base de datos."
      },
      {
        id: "opt_4",
        "text": "La actividad Fail forzando un error intencionado.",
        "isCorrect": false,
        "rationale": "La actividad Fail aborta la canalización con un mensaje personalizado, no ejecuta T-SQL."
      }
    ],
    "explanation": "La actividad Script en Fabric Data Pipelines es la forma recomendada para ejecutar scripts T-SQL dinámicos, DDL y DML sobre Fabric Warehouses, admitiendo múltiples consultas y captura de resultados.",
    "theoryPill": {
      "title": "Actividad Script vs Procedimiento Almacenado en Data Factory",
      "summary": "Ejecución de código relacional dentro de canalizaciones de orquestación.",
      "keyPoints": [
        "Actividad Script: Admite bloques de código T-SQL arbitrarios (DML/DDL), no requiere crear objetos persistentes en la BD, devuelve ResultSets estructurados.",
        "Actividad Stored Procedure: Invoca un procedimiento almacenado preexistente en la base de datos con parámetros de entrada.",
        "Uso habitual de Script: Limpiezas de tablas de preparación (TRUNCATE), actualización de metadatos, optimizaciones de mantenimiento (OPTIMIZE, VACUUM).",
        "Consumo de salida: `@activity('Script1').output.resultSets[0].rows` para acceder a los datos devueltos."
      ],
      "examTrap": "Para ejecutar DDL arbitrario (como CREATE o TRUNCATE) sin crear un procedimiento almacenado previo, utiliza la actividad 'Script'.",
      "searchQuery": "Script activity in Fabric Data Factory DP-700"
    },
    "references": [
      {
        "title": "Script activity in Microsoft Fabric Data Factory | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/script-activity"
      }
    ]
  },
  {
    id: "DP700-068",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Actividad Web con Identidad Administrada (Managed Identity)",
    topicIcon: "pipeline",
    tags: ["Data Pipelines", "Web Activity", "Managed Identity", "Security", "REST API"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de Fabric Data Factory, necesitas invocar una API REST protegida de Azure (como la API de Microsoft Purview o una Azure Function con autenticación Entra ID) utilizando una actividad Web. La política de seguridad de la corporación prohíbe terminantemente almacenar nombres de usuario, contraseñas o secretos de cliente en las configuraciones de la canalización. ¿Qué método de autenticación seguro y nativo debes configurar en la actividad Web?",
    options: [
      {
        id: "opt_1",
        "text": "Autenticación mediante Identidad Administrada asignada por el sistema del área de trabajo (Workspace System-Assigned Managed Identity).",
        "isCorrect": true,
        "rationale": "Microsoft Fabric asigna automáticamente una identidad administrada a nivel de área de trabajo. La actividad Web puede autenticarse contra recursos de Azure protegidos con Entra ID usando esta identidad administrada sin necesidad de almacenar secretos, claves ni credenciales en el código."
      },
      {
        id: "opt_2",
        "text": "Escribir la contraseña del administrador en texto plano en la URL de la petición.",
        "isCorrect": false,
        "rationale": "Vulnera gravemente todas las normas de ciberseguridad corporativas."
      },
      {
        id: "opt_3",
        "text": "Utilizar autenticación básica anónima sin cifrar.",
        "isCorrect": false,
        "rationale": "No permite acceder a recursos protegidos de Azure que exigen tokens de Microsoft Entra ID."
      },
      {
        id: "opt_4",
        "text": "Enviar una carta postal al equipo de seguridad de Azure.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica e inviable para integraciones de API en tiempo real."
      }
    ],
    "explanation": "La actividad Web en Fabric Data Factory admite autenticación mediante Identidad Administrada de área de trabajo (Workspace Managed Identity), permitiendo obtener tokens OAuth de Entra ID sin exponer secretos.",
    "theoryPill": {
      "title": "Autenticación Segura con Identidad Administrada en Actividades Web",
      "summary": "Integración sin credenciales codificadas con APIs de Azure.",
      "keyPoints": [
        "Workspace Identity: Cada área de trabajo de Fabric puede tener una identidad administrada en Entra ID.",
        "Asignación de roles: Se le asignan permisos RBAC en el recurso de destino (ej. Storage Blob Data Contributor o rol en Azure Function).",
        "Actividad Web: Seleccionar tipo de autenticación 'Managed Identity' y especificar la URL de recurso (Resource URI: `https://storage.azure.com/` o `https://management.azure.com/`).",
        "Rotación automática: Azure gestiona y rota los certificados y tokens sin intervención del desarrollador."
      ],
      "examTrap": "Para llamar a APIs REST de Azure desde Data Factory sin almacenar credenciales ni secretos, utiliza 'Workspace Managed Identity'.",
      "searchQuery": "Workspace managed identity in Microsoft Fabric data pipelines DP-700"
    },
    "references": [
      {
        "title": "Workspace identity in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/security/workspace-identity"
      }
    ]
  },
  {
    id: "DP700-069",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Reflejo de Datos en Microsoft Fabric (Fabric Mirroring)",
    topicIcon: "onelake",
    tags: ["Mirroring", "CDC", "Near Real-Time", "Delta Lake", "Zero-ETL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una empresa utiliza Azure SQL Database, Snowflake y Azure Cosmos DB para sus operaciones transaccionales. El equipo de ingeniería de datos necesita replicar de forma continua y en tiempo casi real los cambios de estas bases de datos hacia OneLake en formato Delta Parquet, sin desarrollar canalizaciones de extracción complejas (Zero-ETL) y sin saturar los recursos de computación transaccionales. ¿Qué funcionalidad de Microsoft Fabric deben desplegar?",
    options: [
      {
        id: "opt_1",
        "text": "Reflejo de bases de datos de Fabric (Fabric Mirroring).",
        "isCorrect": true,
        "rationale": "Fabric Mirroring proporciona una experiencia Zero-ETL sin código que replica continuamente bases de datos externas (Azure SQL Database, Snowflake, Azure Cosmos DB) directamente en tablas Delta de OneLake con latencias de segundos, sin interrumpir el rendimiento de la base de datos de origen."
      },
      {
        id: "opt_2",
        "text": "Configurar una replicación física de cintas magnéticas de copia de seguridad.",
        "isCorrect": false,
        "rationale": "Las cintas magnéticas son una tecnología de almacenamiento fuera de línea lenta e incompatible con la analítica en tiempo real."
      },
      {
        id: "opt_3",
        "text": "Crear un clúster de máquinas virtuales Linux con scripts de FTP programados.",
        "isCorrect": false,
        "rationale": "Requiere mantenimiento de infraestructura IaaS manual y no ofrece replicación continua Zero-ETL."
      },
      {
        id: "opt_4",
        "text": "Exportar manualmente cada noche los datos a archivos de texto plano.",
        "isCorrect": false,
        "rationale": "No cumple el requerimiento de tiempo casi real ni el enfoque Zero-ETL."
      }
    ],
    "explanation": "Fabric Mirroring ofrece una arquitectura Zero-ETL que replica de forma continua bases de datos operacionales como Azure SQL, Snowflake y Cosmos DB en OneLake como tablas Delta optimizadas.",
    "theoryPill": {
      "title": "Reflejo de Datos en Microsoft Fabric (Fabric Mirroring)",
      "summary": "Replicación continua Zero-ETL de bases de datos operativas hacia OneLake.",
      "keyPoints": [
        "Orígenes admitidos: Azure SQL Database, Azure Cosmos DB, Snowflake, bases de datos PostgreSQL y MySQL.",
        "Tecnología subyacente: Lee los registros de transacciones (CDC) del origen y escribe en Delta Parquet en OneLake.",
        "Sin impacto en el origen: Utiliza la infraestructura de CDC nativa minimizando el consumo de CPU en la base de datos de producción.",
        "Consumo inmediato: Las tablas reflejadas son accesibles al instante por el SQL Analytics Endpoint y Power BI Direct Lake."
      ],
      "examTrap": "Replicar bases de datos operacionales en tiempo casi real hacia OneLake sin canalizaciones ETL manuales = Fabric Mirroring (Zero-ETL).",
      "searchQuery": "Microsoft Fabric Mirroring overview zero-etl DP-700"
    },
    "references": [
      {
        "title": "Microsoft Fabric Mirroring | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/database/mirrored-database/overview"
      }
    ]
  },
  {
    id: "DP700-070",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Entornos de Spark Personalizados (Fabric Environments)",
    topicIcon: "spark",
    tags: ["Spark", "Environments", "Libraries", "pip", "conda", "wheel"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un área de trabajo de Fabric, 15 ingenieros de datos ejecutan notebooks de PySpark que requieren paquetes de Python específicos (como `scikit-learn`, `geopandas` y un archivo de biblioteca corporativo interno `.whl`). Actualmente cada ingeniero ejecuta comandos `%pip install` al inicio de su notebook, lo que añade 4 minutos de retraso en cada arranque. ¿Cómo se deben estandarizar y preinstalar estas bibliotecas para todo el equipo sin tiempo de arranque adicional?",
    options: [
      {
        id: "opt_1",
        "text": "Crear un artefacto de Entorno (Environment) en el área de trabajo de Fabric, configurar los paquetes de PyPI/Conda y subir el archivo .whl personalizado, publicarlo y asignarlo como el entorno predeterminado del área de trabajo o de los notebooks.",
        "isCorrect": true,
        "rationale": "Los artefactos de Entorno (Environment) de Fabric permiten definir configuraciones de Spark, bibliotecas de PyPI/Conda y archivos wheel (.whl) o JARs personalizados. Al publicarse, el runtime de Spark los preinstala en la imagen del clúster, reduciendo el inicio del notebook a menos de 10 segundos con Starter Pools."
      },
      {
        id: "opt_2",
        "text": "Instalar los paquetes en el ordenador portátil local de cada ingeniero.",
        "isCorrect": false,
        "rationale": "Los notebooks de Fabric se ejecutan en clústeres de Spark en la nube, no en el portátil del usuario."
      },
      {
        id: "opt_3",
        "text": "Pedir a los ingenieros que no utilicen bibliotecas de Python.",
        "isCorrect": false,
        "rationale": "Impide realizar las transformaciones de ingeniería de datos y ML requeridas por el proyecto."
      },
      {
        id: "opt_4",
        "text": "Pegar el código fuente de 50.000 líneas de cada biblioteca en la primera celda del notebook.",
        "isCorrect": false,
        "rationale": "Es una práctica insostenible que satura el editor y propensa a errores sintácticos."
      }
    ],
    "explanation": "Los artefactos 'Environment' de Fabric permiten empaquetar bibliotecas públicas (PyPI/Conda), bibliotecas personalizadas (.whl/.jar) y propiedades de Spark para compartirlas entre múltiples notebooks con arranque instantáneo.",
    "theoryPill": {
      "title": "Gestión de Bibliotecas con Artefactos de Entorno (Environments) en Fabric",
      "summary": "Estandarización y aceleración del entorno de ejecución de Apache Spark.",
      "keyPoints": [
        "Artefacto Environment: Elemento de primer nivel en el área de trabajo que define bibliotecas públicas (PyPI, Conda), bibliotecas personalizadas (.whl, .jar) y propiedades de Spark (`spark.conf`).",
        "Ciclo de vida: 'Guardar' (borrador) y 'Publicar' (compila el entorno en la capacidad).",
        "Ventajas: Elimina la necesidad de comandos `%pip install` lentos en cada celda de inicio.",
        "Asignación: Se puede asignar como predeterminado a nivel de área de trabajo o asociar a notebooks individuales."
      ],
      "examTrap": "Para evitar `%pip install` lentos en cada notebook y compartir paquetes `.whl` corporativos, crea un artefacto 'Environment' en Fabric.",
      "searchQuery": "Create and manage environments in Microsoft Fabric Spark DP-700"
    },
    "references": [
      {
        "title": "Create, configure, and use an environment in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/create-and-use-environment"
      }
    ]
  },
  {
    id: "DP700-071",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Optimización de Joins en Spark: Broadcast Hash Join y Sesgo de Datos",
    topicIcon: "spark",
    tags: ["Spark Optimization", "Broadcast Join", "Data Skew", "AQE", "PySpark"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "from pyspark.sql.functions import broadcast\n\n# Combinación optimizada:\ndf_result = df_large_sales.join(\n    broadcast(df_small_stores),\n    df_large_sales.StoreID == df_small_stores.StoreID,\n    \"inner\"\n)",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark en Microsoft Fabric, ejecutas una combinación interna (JOIN) entre una tabla masiva de transacciones 'df_large_sales' (500 millones de filas, 100 GB) y una tabla dimensional de tiendas 'df_small_stores' (500 filas, 20 KB). Observas que Spark ejecuta por defecto una combinación costosa basada en ordenación y mezcla (Sort-Merge Join) que realiza intercambio de datos por red (Shuffle) entre todos los nodos del clúster. ¿Cómo puedes obligar a Spark a enviar la tabla de tiendas a la memoria de todos los nodos ejecutores para eliminar por completo la fase de Shuffle de red?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar una combinación por difusión envolviendo la tabla pequeña con la función broadcast(): join(broadcast(df_small_stores), ...).",
        "isCorrect": true,
        "rationale": "El Broadcast Hash Join difunde la tabla pequeña a la memoria de todos los nodos ejecutores, permitiendo que cada ejecutor una sus particiones locales de la tabla grande sin mover datos por red (Shuffle-free join), acelerando drásticamente la consulta."
      },
      {
        id: "opt_2",
        "text": "Aplicar un bucle FOR en Python que filtre fila por fila.",
        "isCorrect": false,
        "rationale": "Un bucle FOR local de Python en el driver sería extremadamente lento y destruiría la computación paralela de Spark."
      },
      {
        id: "opt_3",
        "text": "Convertir ambas tablas a archivos de texto plano TXT antes de unirlas.",
        "isCorrect": false,
        "rationale": "El formato de archivo no altera el algoritmo de Join del plan de ejecución de Spark."
      },
      {
        id: "opt_4",
        "text": "Reducir el número de nodos del clúster a cero.",
        "isCorrect": false,
        "rationale": "Sin nodos ejecutores no se pueden procesar consultas de datos."
      }
    ],
    "explanation": "Un Broadcast Hash Join difunde la tabla pequeña a cada nodo ejecutor de Spark, eliminando la sobrecarga de intercambio de datos por red (Shuffle) típica de los Sort-Merge Joins.",
    "theoryPill": {
      "title": "Optimización de Joins en Spark: Broadcast Hash Join",
      "summary": "Eliminación de fases de Shuffle en uniones entre tablas asimétricas.",
      "keyPoints": [
        "Broadcast Join: La tabla pequeña (< 10 MB por defecto, o forzada con `broadcast()`) se envía a cada ejecutor.",
        "Ventajas: Elimina el Shuffle y Sort de red, que son las operaciones más caras en clústeres distribuidos.",
        "Adaptive Query Execution (AQE): Spark 3.x en Fabric convierte automáticamente Sort-Merge Joins en Broadcast Joins en tiempo de ejecución si detecta que una rama es pequeña.",
        "Límite de memoria: No difundir tablas grandes (> varios GB), ya que puede provocar errores OutOfMemory en los ejecutores."
      ],
      "examTrap": "Para unir una tabla enorme con una dimensión pequeña sin sobrecarga de Shuffle de red, utiliza `broadcast(df_small)`.",
      "searchQuery": "PySpark broadcast hash join optimization Fabric DP-700"
    },
    "references": [
      {
        "title": "Optimize Apache Spark jobs in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/spark-job-optimization"
      }
    ]
  },
  {
    id: "DP700-072",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "UDFs de Python vs Pandas UDFs (Vectorizadas) en PySpark",
    topicIcon: "spark",
    tags: ["PySpark", "Pandas UDF", "Vectorized", "PyArrow", "Performance"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "from pyspark.sql.functions import pandas_udf\nimport pandas as pd\n\n@pandas_udf(\"double\")\ndef predict_cost(features: pd.Series) -> pd.Series:\n    return features * 1.25 + 10.0",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark en Fabric, necesitas aplicar un cálculo matemático personalizado y complejo a una columna de 100 millones de filas. Una función estándar de Python `@udf` tarda más de 25 minutos porque serializa y deserializa los datos fila por fila entre el proceso de la máquina virtual Java (JVM) y el intérprete de Python. ¿Qué tipo de UDF debes implementar para procesar los datos en bloques vectorizados utilizando Apache Arrow?",
    options: [
      {
        id: "opt_1",
        "text": "Una función UDF vectorizada de Pandas (Pandas UDF / Vectorized UDF) utilizando el decorador @pandas_udf.",
        "isCorrect": true,
        "rationale": "Las Pandas UDFs utilizan Apache Arrow para transferir datos en memoria de forma vectorizada (en bloques columnares) directamente entre la JVM y los procesos de Python, multiplicando la velocidad de ejecución hasta por 100 respecto a las UDFs estándar de Python fila por fila."
      },
      {
        id: "opt_2",
        "text": "Una función anónima lambda en JavaScript.",
        "isCorrect": false,
        "rationale": "PySpark no admite funciones lambda de JavaScript en su motor de computación distribuido."
      },
      {
        id: "opt_3",
        "text": "Descargar todo el DataFrame a memoria local con `.toPandas()` en el nodo controlador (driver).",
        "isCorrect": false,
        "rationale": "toPandas() vuelca 100 millones de filas al nodo driver monohilo, saturando su memoria y provocando un error OutOfMemory."
      },
      {
        id: "opt_4",
        "text": "Eliminar la columna y no realizar el cálculo.",
        "isCorrect": false,
        "rationale": "No responde a los requerimientos de la transformación analítica."
      }
    ],
    "explanation": "Las Pandas UDFs (Vectorized UDFs) en PySpark emplean Apache Arrow para procesar lotes de columnas en lugar de elementos individuales, reduciendo drásticamente la sobrecarga de serialización.",
    "theoryPill": {
      "title": "UDFs Vectorizadas (Pandas UDFs) con Apache Arrow en PySpark",
      "summary": "Aceleración de código personalizado de Python en Apache Spark.",
      "keyPoints": [
        "UDF clásica de Python: Serializa fila a fila (pickle) entre JVM y Python. Muy lenta en grandes volúmenes.",
        "Pandas UDF (@pandas_udf): Transfiere lotes de datos en formato columnar de memoria compartida con Apache Arrow.",
        "Tipos de Pandas UDF: Serie a Serie (Series to Series), Serie a Escalar (agregaciones).",
        "Regla de oro: Antes de crear cualquier UDF, verificar si la operación se puede resolver mediante funciones nativas de `pyspark.sql.functions` (las cuales se ejecutan 100% en código de la JVM/Catalyst)."
      ],
      "examTrap": "Si se requiere código Python personalizado de alto rendimiento en PySpark, la mejor opción es `@pandas_udf` (Vectorized UDFs).",
      "searchQuery": "PySpark Pandas UDF vectorized Arrow Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Pandas user-defined functions - Apache Spark | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/spark/latest/spark-sql/udf-python-pandas"
      }
    ]
  },
  {
    id: "DP700-073",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Operaciones MERGE INTO en Delta Lake con PySpark (Upserts)",
    topicIcon: "spark",
    tags: ["Delta Lake", "MERGE INTO", "Upsert", "PySpark", "SCD Type 1"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "from delta.tables import DeltaTable\n\ntargetTable = DeltaTable.forPath(spark, \"Tables/DimCustomers\")\n\n(targetTable.alias(\"t\")\n  .merge(\n    sourceDF.alias(\"s\"),\n    \"t.CustomerID = s.CustomerID\"\n  )\n  .whenMatchedUpdateAll()\n  .whenNotMatchedInsertAll()\n  .execute())",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark en Fabric, necesitas sincronizar una tabla Delta de clientes ('DimCustomers') con un lote diario de novedades ('sourceDF'). Si el cliente ya existe en la tabla de destino, se deben actualizar sus datos con los valores más recientes; si el cliente no existe, se debe insertar como un nuevo registro. ¿Qué patrón transaccional de Delta Lake permite realizar esta operación de 'Upsert' de forma atómica?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar la API de DeltaTable merge() en PySpark (equivalente a la instrucción T-SQL MERGE INTO).",
        "isCorrect": true,
        "rationale": "La operación `merge()` de DeltaTable permite ejecutar Upserts (actualizaciones e inserciones condicionales combinadas) de forma totalmente atómica y transaccional en un único paso, admitiendo cláusulas `whenMatchedUpdateAll()` y `whenNotMatchedInsertAll()`."
      },
      {
        id: "opt_2",
        "text": "Ejecutar un TRUNCATE TABLE seguido de un append completo de todo el histórico.",
        "isCorrect": false,
        "rationale": "Un TRUNCATE destruye la tabla y requiere reescribir todo el historial, lo que resulta prohibitivo para tablas de gran tamaño."
      },
      {
        id: "opt_3",
        "text": "Guardar el DataFrame sourceDF en formato CSV en el escritorio del usuario.",
        "isCorrect": false,
        "rationale": "No actualiza la tabla Delta administrada en OneLake."
      },
      {
        id: "opt_4",
        "text": "Utilizar la instrucción DROP COLUMN sobre la clave primaria.",
        "isCorrect": false,
        "rationale": "Eliminar la clave primaria impediría relacionar clientes en el futuro."
      }
    ],
    "explanation": "La operación `MERGE` en Delta Lake permite realizar operaciones de inserción y actualización condicional (Upsert) de manera transaccional y optimizada en una sola pasada.",
    "theoryPill": {
      "title": "Operaciones MERGE INTO (Upserts) en Delta Lake",
      "summary": "Sincronización atómica de tablas dimensionales y hechos.",
      "keyPoints": [
        "API: `DeltaTable.forPath()` o `DeltaTable.forName()`, seguido de `.merge(source, condition)`.",
        "Acciones condicionales: `whenMatchedUpdate()`, `whenMatchedDelete()`, `whenNotMatchedInsert()`.",
        "Condición determinante: La condición de unión debe estar libre de duplicados en el origen para evitar violaciones de determinismo.",
        "Optimizaciones en Fabric: Admite Deletion Vectors para acelerar las operaciones de UPDATE/MERGE sin reescribir archivos Parquet enteros."
      ],
      "examTrap": "Para actualizar filas coincidentes e insertar las no coincidentes en una tabla Delta en un solo paso atómico, utiliza MERGE.",
      "searchQuery": "Delta Lake merge upsert PySpark Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Upsert into a Delta Lake table using merge | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#merge-upsert"
      }
    ]
  },
  {
    id: "DP700-074",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Bases de Datos KQL en Eventhouses de Real-Time Intelligence",
    topicIcon: "kql",
    tags: ["Real-Time Intelligence", "Eventhouse", "KQL Database", "Streaming Ingestion", "KQL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En la solución de Real-Time Intelligence de Microsoft Fabric, una flota de 10.000 camiones de reparto envía datos de localización GPS, temperatura de carga y velocidad cada 2 segundos. Necesitas una base de datos analítica capaz de ingerir este flujo masivo de eventos con latencias de ingestión inferiores a un segundo, indexar automáticamente todas las columnas y permitir consultas analíticas instantáneas con KQL. ¿Qué artefacto de Fabric debes aprovisionar?",
    options: [
      {
        id: "opt_1",
        "text": "Un Eventhouse que contenga una base de datos KQL (KQL Database).",
        "isCorrect": true,
        "rationale": "Los Eventhouses y las KQL Databases son el núcleo de Fabric Real-Time Intelligence. Están optimizados específicamente para ingesta de alta velocidad de datos en streaming (telemetría, logs, eventos IoT) con indexación automática y consultas KQL de latencia ultra baja."
      },
      {
        id: "opt_2",
        "text": "Una base de datos de Microsoft Access alojada en OneDrive.",
        "isCorrect": false,
        "rationale": "Microsoft Access no soporta ingesta continua en tiempo real de miles de dispositivos IoT ni consultas KQL."
      },
      {
        id: "opt_3",
        "text": "Un modelo semántico de Power BI en modo Importación exclusiva.",
        "isCorrect": false,
        "rationale": "Los modelos en modo Import requieren refrescos programados por lotes y no ingieren flujos de telemetría a intervalos de 2 segundos."
      },
      {
        id: "opt_4",
        "text": "Un documento de texto Word en SharePoint.",
        "isCorrect": false,
        "rationale": "No es una base de datos para análisis de series temporales."
      }
    ],
    "explanation": "Los Eventhouses y las KQL Databases en Fabric Real-Time Intelligence están diseñados específicamente para almacenar e indexar telemetría y eventos en tiempo real a escala de gigabytes por segundo.",
    "theoryPill": {
      "title": "Bases de Datos KQL y Eventhouses en Real-Time Intelligence",
      "summary": "Motor de analítica en tiempo real basado en la tecnología de Azure Data Explorer.",
      "keyPoints": [
        "Eventhouse: Espacio de trabajo de computación que agrupa una o más bases de datos KQL.",
        "Ingesta en streaming: Admite directivas de ingesta continua con latencias de milisegundos.",
        "Indexación automática: Todas las columnas de texto, numéricas y marcas temporales se indexan automáticamente.",
        "Consultas KQL: Lenguaje de consulta fluido optimizado para filtrado, búsqueda de patrones de texto libre y agregaciones por ventanas de tiempo (`bin()`)."
      ],
      "examTrap": "Para ingesta de telemetría continua de alta velocidad (IoT/logs) con consultas analíticas KQL en Fabric, utiliza un Eventhouse con KQL Database.",
      "searchQuery": "Eventhouse KQL database Real-Time Intelligence Fabric DP-700"
    },
    "references": [
      {
        "title": "What is an Eventhouse in Microsoft Fabric? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/real-time-intelligence/eventhouse-overview"
      }
    ]
  },
  {
    id: "DP700-075",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Transmisiones de Eventos de Fabric (Fabric Eventstreams)",
    topicIcon: "kql",
    tags: ["Eventstreams", "Streaming", "Kafka", "Event Hubs", "No-Code"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En Microsoft Fabric, necesitas capturar un flujo continuo de eventos emitidos por un clúster de Apache Kafka externo, filtrar en tiempo real los eventos que tengan un código de error de severidad 'CRITICAL' y enviar el resultado simultáneamente hacia dos destinos: una base de datos KQL para alertas inmediatas y un Lakehouse en OneLake para archivo histórico. Deseas realizar esto mediante una experiencia visual sin código. ¿Qué elemento de Fabric debes utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Fabric Eventstreams (Transmisiones de eventos).",
        "isCorrect": true,
        "rationale": "Fabric Eventstreams es el servicio sin código de captura, transformación y enrutamiento de flujos de datos en tiempo real de Microsoft Fabric. Permite conectar orígenes (Kafka, Event Hubs, CDC), aplicar transformaciones visuales en vuelo (filtrar, agregar, proyectar) y enrutar a múltiples destinos simultáneos (KQL Database, Lakehouse, Custom App)."
      },
      {
        id: "opt_2",
        "text": "Una macro de Microsoft Excel en formato .XLSM.",
        "isCorrect": false,
        "rationale": "Las macros de Excel no pueden capturar ni procesar flujos distribuidos de clústeres de Apache Kafka en tiempo real."
      },
      {
        id: "opt_3",
        "text": "Una canalización de datos por lotes programada para ejecutarse una vez a la semana.",
        "isCorrect": false,
        "rationale": "Una canalización semanal no proporciona captura ni enrutamiento en tiempo real de eventos críticos."
      },
      {
        id: "opt_4",
        "text": "Copiar y pegar manualmente los eventos desde la consola de Kafka a un archivo de texto.",
        "isCorrect": false,
        "rationale": "Inviable para millones de eventos por segundo."
      }
    ],
    "explanation": "Fabric Eventstreams proporciona una experiencia visual en tiempo real para ingerir, transformar y bifurcar flujos de eventos desde orígenes como Kafka o Event Hubs hacia KQL Databases y Lakehouses.",
    "theoryPill": {
      "title": "Fabric Eventstreams: Ingesta y Transformación en Streaming",
      "summary": "Enrutamiento visual y procesamiento de datos en movimiento sin código.",
      "keyPoints": [
        "Orígenes: Azure Event Hubs, Azure IoT Hub, Apache Kafka, CDC de bases de datos, Custom App (API).",
        "Operadores de transformación en vuelo: Filter, Manage Fields, Aggregate (ventanas Tumbling/Sliding), GroupBy, Union.",
        "Destinos admitidos: KQL Database, Fabric Lakehouse (en formato Delta Parquet), Activator (para disparar alertas), Custom Endpoint.",
        "Escalabilidad: Administrado automáticamente por la capacidad de Fabric sin infraestructura de clúster que gestionar."
      ],
      "examTrap": "Para capturar eventos de Kafka/Event Hubs y enviarlos a la vez a un Lakehouse y a una KQL Database sin código, usa Fabric Eventstreams.",
      "searchQuery": "What is Microsoft Fabric Eventstreams DP-700"
    },
    "references": [
      {
        "title": "Overview of Fabric Eventstreams | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/overview"
      }
    ]
  },
  {
    id: "DP700-076",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Consultas KQL de Series Temporales (Agregaciones por Ventanas con bin)",
    topicIcon: "kql",
    tags: ["KQL", "TimeSeries", "bin", "summarize", "Real-Time"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "DeviceTelemetry\n| where Timestamp >= ago(24h) and Status == \"Error\"\n| summarize ErrorCount = count() by bin(Timestamp, 1h), DeviceType\n| render timechart",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una KQL Database de Fabric, necesitas escribir una consulta que analice los registros de telemetría de las últimas 24 horas y devuelva el recuento de errores agrupados en cubos (buckets) de tiempo de una hora por cada tipo de dispositivo ('DeviceType'), visualizando el resultado como un gráfico temporal. ¿Qué función nativa de KQL se utiliza para redondear las marcas de tiempo a ventanas fijas de 1 hora en la cláusula summarize?",
    options: [
      {
        id: "opt_1",
        "text": "La función bin(Timestamp, 1h).",
        "isCorrect": true,
        "rationale": "En KQL, la función `bin(valor, tamaño_cubo)` redondea un valor continuo (en este caso marcas de tiempo) al múltiplo inferior del tamaño de ventana especificado (ej. 1h, 15m, 1d), siendo el operador estándar para agregaciones de series temporales en cláusulas summarize."
      },
      {
        id: "opt_2",
        "text": "La función ROUND_DATE_TO_NEAREST_HOUR(Timestamp).",
        "isCorrect": false,
        "rationale": "Nombre de función inexistente en Kusto Query Language."
      },
      {
        id: "opt_3",
        "text": "El comando GROUP BY HOUR(Timestamp) de Microsoft Access.",
        "isCorrect": false,
        "rationale": "KQL no utiliza sintaxis SQL de Access; utiliza tuberías (`|`) y funciones propias como `bin()`."
      },
      {
        id: "opt_4",
        "text": "La función CONVERT_TO_ROMAN_NUMERALS(Timestamp).",
        "isCorrect": false,
        "rationale": "Convertir a números romanos no agrupa marcas temporales en intervalos de una hora."
      }
    ],
    "explanation": "En KQL, la función `bin()` es el estándar para discretizar marcas temporales continuas en ventanas de agregación regulares (ej. `bin(Timestamp, 1h)`).",
    "theoryPill": {
      "title": "Análisis de Series Temporales con KQL (Kusto Query Language)",
      "summary": "Agregaciones temporales fluidas mediante operadores de tubería.",
      "keyPoints": [
        "Operador de tubería (|): Envía la salida de una instrucción como entrada a la siguiente.",
        "where: Filtra filas (`where Timestamp > ago(7d)`).",
        "summarize ... by bin(Timestamp, 1h): Agrupa métricas numéricas en intervalos temporales uniformes.",
        "render timechart: Genera directamente visualizaciones gráficas interactivas en la interfaz web de Fabric."
      ],
      "examTrap": "Para agrupar marcas de tiempo en intervalos fijos (ej. cada 5 minutos o cada hora) en consultas KQL, la función obligatoria es `bin()`.",
      "searchQuery": "KQL bin function time series summarize DP-700"
    },
    "references": [
      {
        "title": "bin() function in Kusto Query Language | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/bin-function"
      }
    ]
  },
  {
    id: "DP700-077",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Recurso CDC en Fabric Data Factory (Change Data Capture)",
    topicIcon: "pipeline",
    tags: ["CDC", "Data Factory", "Streaming", "Continuous", "Change Data Capture"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Qué ventaja proporciona el recurso de Captura de Datos Modificados (Change Data Capture - CDC) de Fabric Data Factory frente a una canalización por lotes tradicional que ejecuta una actividad de copia (Copy Activity) cada hora?",
    options: [
      {
        id: "opt_1",
        "text": "Captura y transmite de forma continua o en micro-lotes frecuentes únicamente los cambios a nivel de fila (inserciones, modificaciones y eliminaciones) desde los registros de transacciones del origen hacia OneLake, reduciendo la latencia de datos a minutos y evitando extracciones masivas completas repetitivas.",
        "isCorrect": true,
        "rationale": "El artefacto CDC de Fabric Data Factory es una solución basada en flujos continuos que detecta cambios a nivel de fila leyendo los logs de transacciones del origen (como Azure SQL, SQL Server o PostgreSQL) y los replica en OneLake sin la sobrecarga ni la latencia de canalizaciones por lotes periódicas."
      },
      {
        id: "opt_2",
        "text": "Elimina la necesidad de tener una cuenta de Microsoft Fabric.",
        "isCorrect": false,
        "rationale": "CDC es una capacidad nativa integrada dentro del servicio de Microsoft Fabric."
      },
      {
        id: "opt_3",
        "text": "Obliga a que todos los datos de origen se conviertan en formato de audio MP3.",
        "isCorrect": false,
        "rationale": "CDC procesa datos tabulares relacionales, no archivos de audio."
      },
      {
        id: "opt_4",
        "text": "Garantiza que la base de datos de origen no permita ninguna nueva venta.",
        "isCorrect": false,
        "rationale": "CDC lee pasivamente los logs sin bloquear las operaciones de negocio de la base de datos."
      }
    ],
    "explanation": "El recurso Change Data Capture (CDC) en Fabric Data Factory proporciona replicación continua basada en registros de cambios sin requerir diseñar complejas canalizaciones por lotes con marcas de agua (watermarks).",
    "theoryPill": {
      "title": "Recurso Change Data Capture (CDC) en Fabric Data Factory",
      "summary": "Ingesta incremental continua sin diseño de marcas de agua complejas.",
      "keyPoints": [
        "Diferencia con Copy Activity: Copy es por lotes bajo demanda; CDC es un proceso continuo que monitoriza los registros de transacciones.",
        "Detección de eliminaciones: Captura no solo INSERT y UPDATE, sino también sentencias DELETE del origen.",
        "Modos de latencia: En tiempo real continuo o a intervalos programados breves.",
        "Destino: Escribe directamente en tablas Delta del Lakehouse listas para consultas analíticas."
      ],
      "examTrap": "Para replicar cambios continuos incluyendo DELETEs sin implementar columnas de auditoría ni marcas de agua manuales, utiliza el recurso CDC de Data Factory.",
      "searchQuery": "Change Data Capture CDC resource in Fabric Data Factory DP-700"
    },
    "references": [
      {
        "title": "Change data capture in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/change-data-capture-overview"
      }
    ]
  },
  {
    id: "DP700-078",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Definición de Trabajo de Spark (Spark Job Definition - SJD)",
    topicIcon: "spark",
    tags: ["Spark Job Definition", "SJD", "PySpark", "Batch", "Deployment"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un proyecto de ingeniería de datos en Fabric, un equipo de desarrolladores ha compilado un script de PySpark (`etl_daily.py`) y una aplicación Java/Scala empaquetada en un archivo `.jar`. Desean ejecutar esta aplicación en modo por lotes desatendido (batch) como un artefacto independiente y reproducible en el área de trabajo, pasando argumentos de línea de comandos y configuraciones específicas de Spark, sin utilizar la interfaz interactiva de celdas de un Notebook. ¿Qué artefacto de Fabric deben utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Una definición de trabajo de Spark (Spark Job Definition - SJD).",
        "isCorrect": true,
        "rationale": "Spark Job Definition (SJD) es el artefacto de Fabric diseñado para implementar y ejecutar código de Spark compiled o scripts de Python/Scala/Java en modo desatendido por lotes. Permite subir el archivo principal, archivos de referencia, argumentos de línea de comandos y parametrizaciones de Spark."
      },
      {
        id: "opt_2",
        "text": "Un panel de control de Power BI Desktop.",
        "isCorrect": false,
        "rationale": "Power BI Desktop es una herramienta cliente de visualización y modelado de BI, no un lanzador de trabajos Spark por lotes."
      },
      {
        id: "opt_3",
        "text": "Un archivo de texto en Bloc de notas.",
        "isCorrect": false,
        "rationale": "El Bloc de notas no ejecuta clústeres de Spark en la nube."
      },
      {
        id: "opt_4",
        "text": "Un correo electrónico enviado a soporte de Azure.",
        "isCorrect": false,
        "rationale": "No es un mecanismo de ejecución de software."
      }
    ],
    "explanation": "Spark Job Definition (SJD) permite desplegar y ejecutar aplicaciones de Spark (.py, .jar) de forma desatendida y parametrizada como artefactos de primer nivel en Microsoft Fabric.",
    "theoryPill": {
      "title": "Spark Job Definition (SJD) en Microsoft Fabric",
      "summary": "Ejecución por lotes desatendida de scripts y aplicaciones de Spark.",
      "keyPoints": [
        "Lenguajes admitidos: Python (.py), Scala/Java (.jar) y R (.r).",
        "Propósito: Orientado a código de producción probado que no requiere la exploración interactiva de celdas de un Notebook.",
        "Parámetros: Admite pasar argumentos de línea de comandos y configuraciones de Spark personalizadas en tiempo de ejecución.",
        "Orquestación: Se puede programar directamente o invocar como actividad dentro de Fabric Data Pipelines."
      ],
      "examTrap": "Para ejecutar aplicaciones Spark `.jar` o scripts `.py` desatendidos con argumentos sin usar notebooks interactivos, se usa 'Spark Job Definition'.",
      "searchQuery": "Spark job definition in Microsoft Fabric SJD DP-700"
    },
    "references": [
      {
        "title": "What is an Apache Spark job definition in Microsoft Fabric? | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/spark-job-definition"
      }
    ]
  },
  {
    id: "DP700-079",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Métricas de Capacidad para Ingenieros de Datos: Suavizado y Bursting",
    topicIcon: "fabric",
    tags: ["Capacity Metrics", "Background Jobs", "Smoothing", "Bursting", "Throttling"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un trabajo de Spark programado en Fabric consume 128 unidades de capacidad (CU) de forma continua durante 30 minutos en una capacidad F64 (que ofrece un límite nominal de 64 CUs por segundo). La capacidad no entra en rechazo de trabajos ni se estrangula inmediatamente durante la ejecución. ¿Por qué el mecanismo de 'Bursting' y 'Smoothing' de Microsoft Fabric permite que este trabajo se ejecute con éxito?",
    options: [
      {
        id: "opt_1",
        "text": "Fabric permite a las cargas de trabajo acelerar (Bursting) más allá del límite nominal de CUs de la capacidad, y el algoritmo de suavizado (Smoothing) distribuye el consumo de los trabajos en segundo plano (Background) a lo largo de una ventana de 24 horas, consumiendo créditos de CUs acumulados de periodos valle.",
        "isCorrect": true,
        "rationale": "El motor de capacidad de Fabric incorpora 'Bursting' (permite que un trabajo use temporalmente más CUs que el tamaño base contratado) y 'Smoothing' (amortiza el consumo de tareas pesadas en segundo plano a lo largo de 24 horas). Esto permite absorber picos intensos de procesamiento de datos nocturnos sin forzar la adquisición de capacidades más grandes."
      },
      {
        id: "opt_2",
        "text": "Porque Microsoft Fabric regala cómputo ilimitado a todas las empresas los viernes.",
        "isCorrect": false,
        "rationale": "El modelo de facturación está estrictamente gobernado por los mecanismos de capacidad contratada."
      },
      {
        id: "opt_3",
        "text": "Porque Spark no consume unidades de capacidad de Fabric.",
        "isCorrect": false,
        "rationale": "Todas las cargas de Spark en Fabric consumen CUs de la capacidad."
      },
      {
        id: "opt_4",
        "text": "Porque el trabajo se ejecutó en secreto sin registrarse en los sistemas de auditoría.",
        "isCorrect": false,
        "rationale": "Todas las operaciones quedan perfectamente registradas en la Capacity Metrics App."
      }
    ],
    "explanation": "El concepto de Bursting permite a las cargas de trabajo de Fabric superar temporalmente los límites de la capacidad F-SKU, mientras que el Smoothing promedia el coste en un período de 24 horas para operaciones de fondo.",
    "theoryPill": {
      "title": "Mecanismos de Cómputo: Bursting y Smoothing en Microsoft Fabric",
      "summary": "Aprovechamiento elástico de unidades de capacidad para ingeniería de datos.",
      "keyPoints": [
        "Bursting: Capacidad de multiplicar el rendimiento de cómputo durante picos temporales para terminar los jobs rápidamente.",
        "Smoothing para Background: Amortiza el coste computacional a lo largo de 24 horas.",
        "Carryforward (Arrastre de sobreconsumo): Si la capacidad permanece sostenidamente sobreconsumida durante horas consecutivas, puede entrar en fases de retraso (Delay) o rechazo (Reject).",
        "Herramienta de supervisión: Fabric Capacity Metrics App permite visualizar el consumo exacto desglose por artefacto y tipo de operación."
      ],
      "examTrap": "El 'Bursting' permite procesar picos de carga superando la capacidad nominal; el 'Smoothing' reparte el coste de los jobs de fondo en 24 horas.",
      "searchQuery": "Microsoft Fabric capacity bursting and smoothing DP-700"
    },
    "references": [
      {
        "title": "Understand throttling in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/enterprise/throttling"
      }
    ]
  },
  {
    id: "DP700-080",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Supervisión de Consultas y Sesiones en Fabric Warehouse con DMVs",
    topicIcon: "warehouse",
    tags: ["DMV", "sys.dm_exec_requests", "sys.dm_exec_sessions", "Monitoring", "Warehouse"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "SELECT \n    r.request_id,\n    r.session_id,\n    r.status,\n    r.total_elapsed_time,\n    r.command\nFROM sys.dm_exec_requests r\nWHERE r.status IN ('Running', 'Suspended');",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse, varios usuarios informan que una consulta T-SQL de transformación está bloqueando la ejecución de otros informes. Como ingeniero de datos, necesitas conectarte mediante T-SQL y consultar las vistas de administración dinámica (DMVs) admitidas en Fabric para identificar el identificador de solicitud (`request_id`), el estado de ejecución y el tiempo transcurrido de las consultas activas en ese momento. ¿Qué vista de administración dinámica debes consultar?",
    options: [
      {
        id: "opt_1",
        "text": "sys.dm_exec_requests (combinada con sys.dm_exec_sessions).",
        "isCorrect": true,
        "rationale": "En Fabric Warehouse, las DMVs del sistema como `sys.dm_exec_requests` y `sys.dm_exec_sessions` permiten inspeccionar las sesiones activas, las instrucciones en ejecución, los tiempos transcurridos y el estado de los recursos para diagnosticar problemas de rendimiento y bloqueos."
      },
      {
        id: "opt_2",
        "text": "sys.dm_os_windows_sound_card.",
        "isCorrect": false,
        "rationale": "Nombre ficticio; las tarjetas de sonido no forman parte de las DMVs de SQL."
      },
      {
        id: "opt_3",
        "text": "sys.all_deleted_passwords.",
        "isCorrect": false,
        "rationale": "Vista inexistente en los motores relacionales de SQL."
      },
      {
        id: "opt_4",
        "text": "Consultar la tabla de contactos en Microsoft Outlook.",
        "isCorrect": false,
        "rationale": "Outlook gestiona correo personal, no monitorización de sesiones de bases de datos."
      }
    ],
    "explanation": "En Fabric Warehouse, `sys.dm_exec_requests` y `sys.dm_exec_sessions` son las vistas de administración dinámica estándar para diagnosticar consultas activas, tiempos de ejecución y bloqueos.",
    "theoryPill": {
      "title": "Supervisión de Fabric Warehouse con Vistas de Administración Dinámica (DMVs)",
      "summary": "Diagnóstico de rendimiento y resolución de problemas T-SQL.",
      "keyPoints": [
        "sys.dm_exec_requests: Muestra cada solicitud que se está ejecutando activamente en el Warehouse, su estado (Running, Suspended), tiempo transcurrido y comando.",
        "sys.dm_exec_sessions: Muestra metadatos sobre las sesiones de usuario conectadas, UPN del usuario y herramientas cliente.",
        "sys.dm_exec_connections: Proporciona información sobre los protocolos y conexiones físicas establecidas.",
        "Acción correctora: Si una consulta bloquea el sistema, los administradores pueden terminar la sesión mediante `KILL session_id`."
      ],
      "examTrap": "Para monitorizar consultas activas y tiempos de ejecución en Fabric Warehouse mediante T-SQL, consulta `sys.dm_exec_requests`.",
      "searchQuery": "Monitor Fabric warehouse with DMVs sys.dm_exec_requests DP-700"
    },
    "references": [
      {
        "title": "Monitor connections, sessions, and requests using DMVs in Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/monitor-using-dmv"
      }
    ]
  }
];

console.log(`Prepared first batch of ${dp700QuestionsPart1.length} questions for DP-700.`);
