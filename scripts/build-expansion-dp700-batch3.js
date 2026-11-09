/**
 * scripts/build-expansion-dp700-batch3.js
 * 20 High-Fidelity Technical Questions for DP-700 (DP700-101 to DP700-120)
 * Certification: Implementing Data Engineering Solutions Using Microsoft Fabric (DP-700)
 */

export const dp700Batch3 = [
  {
    id: "DP700-101",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Columnas Generadas en Delta Lake (Generated Columns)",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "Generated Columns", "Spark SQL", "Partitioning", "Schema"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "CREATE TABLE lakehouse.Events (\n    EventId STRING,\n    EventTimestamp TIMESTAMP,\n    EventDate DATE GENERATED ALWAYS AS (CAST(EventTimestamp AS DATE))\n)\nUSING DELTA\nPARTITIONED BY (EventDate);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Lakehouse, recibes eventos de streaming con una marca de tiempo precisa en microsegundos ('EventTimestamp'). Necesitas particionar la tabla Delta por fecha (día) para optimizar la poda de particiones (partition pruning). Quieres garantizar que los procesos que insertan datos solo tengan que enviar 'EventTimestamp' y que Delta Lake calcule y valide automáticamente la columna de fecha sin intervención de código en la aplicación ni riesgo de desincronización. ¿Qué funcionalidad nativa de Delta Lake debes implementar?",
    options: [
      {
        id: "opt_1",
        "text": "Columnas generadas de Delta Lake (Generated Columns) mediante la cláusula GENERATED ALWAYS AS (CAST(EventTimestamp AS DATE)).",
        "isCorrect": true,
        "rationale": "Las columnas generadas (Generated Columns) en Delta Lake calculan automáticamente su valor a partir de otras columnas de la misma fila cuando se inserta o actualiza un registro. Al utilizarlas en la partición, Delta Lake realiza además 'partition pruning' automático incluso si las consultas solo filtran por la columna de origen (EventTimestamp)."
      },
      {
        id: "opt_2",
        "text": "Una columna calculada en DAX en Power BI Desktop.",
        "isCorrect": false,
        "rationale": "DAX opera en el modelo semántico de Power BI, no a nivel de almacenamiento físico ni particionado en Delta Lake en OneLake."
      },
      {
        id: "opt_3",
        "text": "Un trigger DML de SQL Server con cursores AFTER INSERT.",
        "isCorrect": false,
        "rationale": "Delta Lake no utiliza triggers tradicionales de SQL Server; las columnas generadas son la característica nativa integrada."
      },
      {
        id: "opt_4",
        "text": "Escribir un script de Python que duplique manualmente los archivos en carpetas con nombres de fechas.",
        "isCorrect": false,
        "rationale": "Duplicar archivos a mano vulnera la consistencia transaccional del registro _delta_log."
      }
    ],
    "explanation": "Las columnas generadas de Delta Lake calculan automáticamente valores derivados en el momento de la escritura, permitiendo particionar de forma limpia y transparente sin sobrecargar al cliente de ingesta.",
    "theoryPill": {
      "title": "Columnas Generadas (Generated Columns) en Delta Lake",
      "summary": "Cálculo automático de columnas derivadas para particionamiento eficiente.",
      "keyPoints": [
        "Sintaxis: `columna TIPO GENERATED ALWAYS AS (expresion)`.",
        "Uso principal: Generar claves de partición temporales (año, mes, fecha) a partir de timestamps continuos.",
        "Generación automática de filtros: Si consultas `WHERE EventTimestamp >= '2026-11-01'`, Delta Lake deduce automáticamente `EventDate >= '2026-11-01'` y poda particiones.",
        "Inmutabilidad: Los clientes no pueden insertar valores arbitrarios en una columna GENERATED ALWAYS que contradigan la expresión."
      ],
      "examTrap": "Las Generated Columns de Delta Lake permiten que Spark pode particiones automáticamente incluso si la consulta filtra por la columna timestamp original en vez de por la fecha particionada.",
      "searchQuery": "Delta Lake generated columns Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Delta Lake generated columns | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/delta/generated-columns"
      }
    ]
  },
  {
    id: "DP700-102",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Desduplicación de Datos con Funciones de Ventana en PySpark",
    topicIcon: "spark",
    tags: ["PySpark", "Window Functions", "Deduplication", "row_number", "Silver Layer"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "from pyspark.sql.window import Window\nfrom pyspark.sql.functions import col, row_number\n\nwindowSpec = Window.partitionBy(\"OrderId\").orderBy(col(\"IngestionTimestamp\").desc())\n\ndf_deduplicated = (df_bronze\n    .withColumn(\"row_num\", row_number().over(windowSpec))\n    .filter(col(\"row_num\") == 1)\n    .drop(\"row_num\"))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una arquitectura Medallion en Fabric, la capa Bronze contiene eventos duplicados de pedidos debido a reintentos de red en el origen. Múltiples filas comparten el mismo 'OrderId', pero con diferentes marcas de tiempo de ingesta ('IngestionTimestamp'). En la canalización de PySpark que carga la capa Silver, necesitas conservar exactamente la última versión registrada de cada pedido y descartar los duplicados anteriores. ¿Qué patrón de código en PySpark es el estándar más eficiente para resolver este problema?",
    options: [
      {
        id: "opt_1",
        "text": "Definir una ventana Window.partitionBy('OrderId').orderBy(col('IngestionTimestamp').desc()), asignar row_number().over(windowSpec) y filtrar por row_num == 1.",
        "isCorrect": true,
        "rationale": "El patrón de función de ventana con `row_number()` ordenado descendentemente por la marca temporal de actualización/ingesta y particionado por la clave de negocio (`OrderId`) permite aislar la versión más reciente (`row_num == 1`), siendo el estándar para desduplicación determinista en Apache Spark."
      },
      {
        id: "opt_2",
        "text": "Utilizar df_bronze.distinct() sin especificar ninguna columna.",
        "isCorrect": false,
        "rationale": "distinct() solo elimina filas 100% idénticas en todas sus columnas; como las marcas de tiempo difieren, distinct() conservaría todos los duplicados."
      },
      {
        id: "opt_3",
        "text": "df_bronze.dropDuplicates(['IngestionTimestamp']).",
        "isCorrect": false,
        "rationale": "Descartar duplicados por IngestionTimestamp eliminaría pedidos distintos que casualmente llegaron en el mismo segundo."
      },
      {
        id: "opt_4",
        "text": "Convertir el DataFrame a una lista de Python y usar un bucle FOR.",
        "isCorrect": false,
        "rationale": "Convertir a lista vuelca los datos en el driver, provocando un error OutOfMemory y perdiendo el procesamiento distribuido."
      }
    ],
    "explanation": "El uso de funciones de ventana (`row_number().over(Window.partitionBy(...).orderBy(...))`) es la técnica estándar en PySpark para desduplicar registros garantizando la selección de la versión más reciente.",
    "theoryPill": {
      "title": "Desduplicación Determinista con Funciones de Ventana en PySpark",
      "summary": "Filtrado de la última versión en canalizaciones de Bronze a Silver.",
      "keyPoints": [
        "Window.partitionBy('ClaveNegocio'): Agrupa lógicamente los registros por entidad (ej. OrderId, CustomerId).",
        "orderBy(col('Timestamp').desc()): Sitúa la versión más reciente en la posición 1.",
        "row_number() vs rank(): row_number() siempre asigna valores únicos consecutivos (1, 2, 3...) sin empates, garantizando exactamente 1 fila en el filtro `row_num == 1`.",
        "dropDuplicates(['Clave']): Alternativa más sencilla cuando no importa qué versión se conserve, pero no determinista respecto a la marca temporal más reciente."
      ],
      "examTrap": "`distinct()` solo funciona si todas las columnas son idénticas; si hay columnas de timestamp o auditoría distintas, se DEBE usar `Window` con `row_number()`.",
      "searchQuery": "PySpark deduplication window row_number latest record DP-700"
    },
    "references": [
      {
        "title": "Window functions in Apache Spark | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/spark/latest/spark-sql/language-manual/functions/window"
      }
    ]
  },
  {
    id: "DP700-103",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Retorno de Valores y Salida de Notebooks con notebookutils",
    topicIcon: "spark",
    tags: ["notebookutils", "notebook.exit", "Data Pipelines", "Orchestration", "Return Values"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Al final de un Notebook secundario de Fabric:\nsummary_data = {\"records_processed\": 150000, \"status\": \"SUCCESS\", \"max_date\": \"2026-11-03\"}\nnotebookutils.notebook.exit(json.dumps(summary_data))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de Fabric Data Factory, tienes una actividad Notebook que ejecuta un procesamiento de limpieza de datos en PySpark. Necesitas que, al finalizar el notebook, este devuelva un valor estructurado (un objeto JSON con el número de filas procesadas y el estado) a la canalización padre para que actividades posteriores (como una condición 'If Condition' o 'Web Activity') puedan evaluar ese resultado. ¿Qué función de la biblioteca de utilidades de Fabric se debe invocar al final del notebook?",
    options: [
      {
        id: "opt_1",
        "text": "notebookutils.notebook.exit(valor_retorno)",
        "isCorrect": true,
        "rationale": "`notebookutils.notebook.exit()` finaliza inmediatamente la ejecución del notebook y pasa la cadena de texto (o JSON serializado) especificada como valor de salida a la canalización orquestadora de Data Factory, accesible mediante `@activity('Notebook1').output.result.exitValue`."
      },
      {
        id: "opt_2",
        "text": "sys.exit(0)",
        "isCorrect": false,
        "rationale": "`sys.exit()` termina el proceso de Python pero no comunica un valor de retorno estructurado a la canalización de Fabric Data Factory."
      },
      {
        id: "opt_3",
        "text": "print(valor_retorno)",
        "isCorrect": false,
        "rationale": "`print()` escribe en la consola de salida estándar (stdout), pero no asigna el resultado de salida estructurado de la actividad en Data Factory."
      },
      {
        id: "opt_4",
        "text": "return valor_retorno fuera de cualquier función.",
        "isCorrect": false,
        "rationale": "`return` fuera de una función produce un error sintáctico ('SyntaxError: 'return' outside function') en Python."
      }
    ],
    "explanation": "La función `notebookutils.notebook.exit(valor)` es el método oficial para finalizar la ejecución de un notebook en Fabric y devolver un valor de salida consumible por la canalización padre.",
    "theoryPill": {
      "title": "Salida y Comunicación de Notebooks en Fabric Data Factory",
      "summary": "Paso de parámetros y retorno de resultados entre notebooks y canalizaciones.",
      "keyPoints": [
        "notebookutils.notebook.exit(str): Devuelve una cadena de texto (habitualmente un JSON serializado con `json.dumps()`).",
        "Consumo en Data Pipeline: Se accede mediante `@activity('NombreNotebook').output.result.exitValue`.",
        "Parámetros de entrada: Se configuran en una celda con la etiqueta 'parameters' al inicio del notebook.",
        "Límite de tamaño: La salida devuelta por `exit()` está pensada para metadatos, contadores y estados, no para volcar gigabytes de datos."
      ],
      "examTrap": "Para devolver resultados de un notebook a una canalización de Data Factory, usa `notebookutils.notebook.exit()`, NO `sys.exit()` ni `print()`.",
      "searchQuery": "notebookutils notebook exit return value Fabric data factory DP-700"
    },
    "references": [
      {
        "title": "Reference notebook utilities - notebook.exit | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/notebook-utilities#notebook-exit"
      }
    ]
  },
  {
    id: "DP700-104",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Directiva de Actualización de Eventhouse (KQL Update Policy)",
    topicIcon: "kql",
    tags: ["Real-Time Intelligence", "Eventhouse", "Update Policy", "KQL", "ETL on Ingestion"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": ".alter table CuratedTelemetry policy update \n@'[{\n    \"Source\": \"RawTelemetry\",\n    \"Query\": \"TransformTelemetryFunction()\",\n    \"IsEnabled\": true,\n    \"IsTransactional\": true\n}]'",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una solución de Real-Time Intelligence de Microsoft Fabric, una tabla 'RawTelemetry' en una KQL Database recibe miles de registros JSON por segundo. Necesitas que, a medida que los datos crudos se ingieren, estos se transformen inmediatamente (extrayendo campos JSON anidados, convirtiendo unidades térmicas y calculando métricas derivadas) y se inserten de forma transaccional y automática en una tabla de destino depurada 'CuratedTelemetry', sin orquestar canalizaciones periódicas externas. ¿Qué característica nativa del motor de KQL Database debes configurar?",
    options: [
      {
        id: "opt_1",
        "text": "Una directiva de actualización (Update Policy) asociada a la tabla de destino.",
        "isCorrect": true,
        "rationale": "La directiva de actualización (Update Policy) en KQL Databases actúa como un disparador automático de transformación en tiempo de ingestión. Cuando llegan datos a la tabla de origen ('RawTelemetry'), el motor ejecuta inmediatamente la función KQL configurada y almacena los datos transformados en la tabla de destino ('CuratedTelemetry') de forma atómica y continua."
      },
      {
        id: "opt_2",
        "text": "Un trabajo de Apache Spark que se ejecute una vez cada hora.",
        "isCorrect": false,
        "rationale": "Un trabajo de Spark por lotes cada hora no proporciona transformación continua en tiempo real y añade latencia de 60 minutos."
      },
      {
        id: "opt_3",
        "text": "Una consulta manual ejecutada por un analista en DAX Studio.",
        "isCorrect": false,
        "rationale": "DAX Studio es una herramienta de análisis de modelos semánticos, no un motor de ingestión de series temporales en KQL."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar la ingesta de telemetría.",
        "isCorrect": false,
        "rationale": "No resuelve el requerimiento del negocio."
      }
    ],
    "explanation": "La directiva de actualización (Update Policy) en bases de datos KQL permite realizar transformaciones de datos en streaming en el momento exacto en que los datos se ingieren, escribiendo en tablas derivadas sin procesos batch externos.",
    "theoryPill": {
      "title": "Directivas de Actualización (Update Policies) en KQL Databases",
      "summary": "Transformación y enriquecimiento de datos en tiempo de ingestión.",
      "keyPoints": [
        "Funcionamiento: Cuando los datos se ingieren en la tabla de origen, se ejecuta una función KQL que produce datos para la tabla de destino.",
        "IsTransactional: Si se configura en `true`, la ingesta en el origen y la transformación en el destino tienen éxito o fallan juntas como una sola transacción.",
        "Aislamiento de retención: Permite asignar una política de retención muy corta (ej. 1 día) a la tabla cruda y una retención larga (ej. 2 años) a la tabla transformada depurada.",
        "Sin sobrecarga externa: Ocurre completamente en el motor interno de computación de Eventhouse."
      ],
      "examTrap": "Para transformar datos continuos en KQL Database en el momento de la ingesta sin pipelines externos, se utiliza una 'Update Policy'.",
      "searchQuery": "Kusto update policy KQL database Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Kusto table update policy - Azure Data Explorer & Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/data-explorer/kusto/management/update-policy"
      }
    ]
  },
  {
    id: "DP700-105",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Manejo de Estructuras JSON Complejas y Matrices en PySpark (from_json, explode)",
    topicIcon: "spark",
    tags: ["PySpark", "JSON", "explode", "from_json", "Schema"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "from pyspark.sql.functions import from_json, col, explode\nfrom pyspark.sql.types import StructType, StructField, StringType, ArrayType\n\n# Desanidar matriz de líneas de pedido:\ndf_exploded = (df_raw\n    .withColumn(\"parsed_payload\", from_json(col(\"RawJson\"), json_schema))\n    .select(\"parsed_payload.*\")\n    .withColumn(\"item\", explode(col(\"items\")))\n    .select(\"OrderId\", \"CustomerKey\", \"item.ProductId\", \"item.Quantity\", \"item.Price\"))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark, recibes un DataFrame con una columna de texto 'RawJson'. Cada cadena JSON contiene un pedido con campos escalares ('OrderId', 'CustomerKey') y una matriz anidada de elementos ('items': [{'ProductId': 1, 'Quantity': 2}, {'ProductId': 5, 'Quantity': 1}]). Necesitas aplanar el DataFrame para que cada elemento de la matriz 'items' se convierta en una fila independiente en la tabla relacional de destino, manteniendo el OrderId asociado. ¿Qué combinación de funciones de PySpark debes aplicar?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar from_json() con un esquema StructType para analizar el JSON y la función explode() sobre la columna de matriz 'items'.",
        "isCorrect": true,
        "rationale": "`from_json()` convierte una cadena de texto JSON en un tipo estructurado nativo (StructType) según un esquema definido, y `explode()` crea una nueva fila por cada elemento contenido en una columna de tipo matriz (ArrayType), aplanando la jerarquía."
      },
      {
        id: "opt_2",
        "text": "Utilizar la función to_csv() en cada fila.",
        "isCorrect": false,
        "rationale": "to_csv() serializa a texto pero no desanida matrices en múltiples filas relacionales."
      },
      {
        id: "opt_3",
        "text": "Aplicar la función dropna() en toda la tabla.",
        "isCorrect": false,
        "rationale": "dropna() solo elimina filas con valores nulos, no parsea JSON ni aplana arrays."
      },
      {
        id: "opt_4",
        "text": "Guardar el DataFrame como un archivo de imagen PNG.",
        "isCorrect": false,
        "rationale": "Las imágenes no procesan datos tabulares estructurados."
      }
    ],
    "explanation": "En PySpark, `from_json()` parsea cadenas JSON en tipos estructurados y `explode()` separa cada elemento de una matriz en una fila independiente para su modelado relacional.",
    "theoryPill": {
      "title": "Aplanamiento y Procesamiento de JSON Anidado en PySpark",
      "summary": "Técnicas de desestructuración de matrices y documentos jerárquicos.",
      "keyPoints": [
        "from_json(columna, esquema): Parsea la cadena JSON utilizando un esquema tipado estricto.",
        "explode(columna_array): Genera una fila por cada elemento del array (ignora filas con arrays nulos o vacíos).",
        "explode_outer(columna_array): Similar a explode, pero preserva filas con arrays vacíos o nulos asignando NULL a la columna aplanada.",
        "schema_of_json(ejemplo): Función auxiliar que infiere automáticamente el esquema a partir de un JSON de muestra."
      ],
      "examTrap": "Para desanidar una lista/array de elementos en múltiples filas individuales en PySpark, la función clave es `explode()`.",
      "searchQuery": "PySpark parse JSON from_json explode array Fabric DP-700"
    },
    "references": [
      {
        "title": "Working with complex data types in Spark SQL | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/spark/latest/spark-sql/complex-types"
      }
    ]
  },
  {
    id: "DP700-106",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Columnas de Identidad en Delta Lake (Identity Columns)",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "Identity Columns", "Surrogate Keys", "Auto Increment", "Spark SQL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "CREATE TABLE lakehouse.DimProduct (\n    ProductSurrogateKey BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),\n    ProductSKU STRING,\n    ProductName STRING,\n    Category STRING\n)\nUSING DELTA;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En el diseño de una dimensión de almacén de datos sobre un Fabric Lakehouse, necesitas generar claves subrogadas numéricas enteras incrementales automáticas (Surrogate Keys) para la tabla Delta 'DimProduct' a medida que se insertan nuevos productos, garantizando que el motor asigne un valor único correlativo sin necesidad de consultar el `MAX(ID)` de la tabla previamente. ¿Qué sintaxis estándar de Delta Lake en Microsoft Fabric debes utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Definir la columna con la cláusula GENERATED ALWAYS AS IDENTITY (o GENERATED BY DEFAULT AS IDENTITY).",
        "isCorrect": true,
        "rationale": "Delta Lake admite columnas de identidad nativas mediante la cláusula `GENERATED ALWAYS AS IDENTITY (START WITH x INCREMENT BY y)`. El motor transaccional asigna identificadores numéricos únicos de forma automática durante inserciones sin necesidad de costosas consultas de agregación previas."
      },
      {
        id: "opt_2",
        "text": "Generar identificadores aleatorios con la función RAND() * 1000.",
        "isCorrect": false,
        "rationale": "RAND() no garantiza unicidad y produciría colisiones de claves primarias."
      },
      {
        id: "opt_3",
        "text": "Pedir a los usuarios que escriban un número en una libreta de papel antes de insertar.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      },
      {
        id: "opt_4",
        "text": "No usar claves subrogadas y dejar la columna vacía.",
        "isCorrect": false,
        "rationale": "Las dimensiones en modelos de estrella requieren claves subrogadas no nulas para relacionarse con las tablas de hechos."
      }
    ],
    "explanation": "Las Identity Columns en Delta Lake proporcionan numeración automática incremental para claves subrogadas en dimensiones y hechos sin la sobrecarga de calcular identificadores manualmente.",
    "theoryPill": {
      "title": "Columnas de Identidad (Identity Columns) en Delta Lake",
      "summary": "Generación automática de claves subrogadas en tablas del Lakehouse.",
      "keyPoints": [
        "Sintaxis: `BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1)`.",
        "GENERATED ALWAYS: Delta Lake siempre genera el valor; rechaza cualquier intento del usuario de proporcionar su propio valor en el INSERT.",
        "GENERATED BY DEFAULT: Delta Lake genera el valor si el usuario no proporciona uno explícitamente.",
        "Concurrencia: Garantiza valores únicos incluso en inserciones paralelas desde múltiples ejecutores de Spark."
      ],
      "examTrap": "Para generar claves subrogadas automáticas en Delta Lake sin calcular `MAX()`, utiliza 'Identity Columns' (`GENERATED ... AS IDENTITY`).",
      "searchQuery": "Delta Lake identity columns surrogate keys Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Use Delta Lake identity columns in Azure Databricks and Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/delta/identity-columns"
      }
    ]
  },
  {
    id: "DP700-107",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Vistas Materializadas en KQL Database (Materialized Views)",
    topicIcon: "kql",
    tags: ["Real-Time Intelligence", "Materialized Views", "Eventhouse", "KQL", "Aggregations"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": ".create materialized-view HourlyDeviceStats on table DeviceTelemetry\n{\n    DeviceTelemetry\n    | summarize \n        AvgTemp = avg(Temperature), \n        MaxTemp = max(Temperature), \n        ReadingCount = count()\n      by DeviceId, bin(Timestamp, 1h)\n}",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Eventhouse de Microsoft Fabric, una tabla de telemetría de 2.000 millones de filas se consulta continuamente mediante paneles de Power BI que solicitan el promedio y máximo de temperatura por hora de cada dispositivo. Las consultas directas tardan 8 segundos debido al enorme volumen de escaneo. Necesitas que las agregaciones por hora estén precalculadas en segundo plano de forma incremental y continua, garantizando que las consultas respondan en milisegundos y siempre incluyan los datos más recientes que acaban de llegar sin desincronización. ¿Qué objeto debes crear en la base de datos KQL?",
    options: [
      {
        id: "opt_1",
        "text": "Una vista materializada de KQL (Materialized View) creada mediante el comando .create materialized-view.",
        "isCorrect": true,
        "rationale": "Las Vistas Materializadas en KQL Database precalculan y almacenan físicamente los resultados de agregaciones complejas (como sumas, medias y recuentos por ventana temporal). En tiempo de consulta, combinan automáticamente los datos agregados ya materializados con los registros crudos que acaban de llegar (delta), devolviendo resultados 100% actualizados en milisegundos."
      },
      {
        id: "opt_2",
        "text": "Una función escalar definida por el usuario.",
        "isCorrect": false,
        "rationale": "Una función escalar no almacena datos precalculados en disco y se ejecutaría fila por fila en cada consulta."
      },
      {
        id: "opt_3",
        "text": "Crear una tabla de Excel compartida en OneDrive.",
        "isCorrect": false,
        "rationale": "OneDrive y Excel no son motores de series temporales de tiempo real para miles de millones de filas."
      },
      {
        id: "opt_4",
        "text": "Desactivar la compresión en la base de datos KQL.",
        "isCorrect": false,
        "rationale": "Desactivar la compresión aumentaría el tamaño en disco y ralentizaría las consultas."
      }
    ],
    "explanation": "Las Materialized Views en KQL Database mantienen agregaciones precalculadas de forma incremental y combinan de forma transparente los datos históricos materializados con los datos recién ingeridos para consultas ultrarrápidas.",
    "theoryPill": {
      "title": "Vistas Materializadas (Materialized Views) en bases de datos KQL",
      "summary": "Preagregaciones automáticas sobre miles de millones de eventos en tiempo real.",
      "keyPoints": [
        "Sintaxis: `.create materialized-view Nombre on table Origen { Origen | summarize ... by ... }`.",
        "Mecanismo dual: En tiempo de consulta escanea la parte ya materializada en disco + la pequeña porción no materializada recién ingerida.",
        "Consistencia garantizada: Los usuarios siempre ven resultados completos en tiempo real sin desfase.",
        "Funciones de agregación optimizadas: `sum()`, `count()`, `avg()`, `min()`, `max()`, `take_any()`, `hll()`."
      ],
      "examTrap": "Para acelerar consultas de agregación sobre telemetría masiva en KQL garantizando datos en tiempo real al segundo, usa 'Materialized Views'.",
      "searchQuery": "Kusto materialized views KQL database Fabric DP-700"
    },
    "references": [
      {
        "title": "Materialized views in Azure Data Explorer & Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview"
      }
    ]
  },
  {
    id: "DP700-108",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Diagnóstico de Sesgo de Datos (Data Skew) y Resolución en Spark",
    topicIcon: "spark",
    tags: ["Data Skew", "Spark Optimization", "Salting", "AQE", "PySpark"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Técnica de Salting para combatir Data Skew extremo:\nimport random\nfrom pyspark.sql.functions import col, concat, lit, rand\n\n# Añadir un número aleatorio (salt) a la clave desbalanceada:\ndf_skewed = df_orders.withColumn(\"SaltKey\", concat(col(\"CustomerId\"), lit(\"_\"), (rand() * 10).cast(\"int\")))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Al monitorizar un trabajo de PySpark en el Spark UI de Fabric, observas que en una fase de combinación (Join Stage) de 200 tareas, 199 tareas finalizan en menos de 5 segundos, pero una única tarea ('Task 47') se queda ejecutando durante 45 minutos acaparando un ejecutor hasta que el job falla por timeout. ¿Qué problema clásico de procesamiento distribuido está ocurriendo y qué técnica avanzada de particionamiento se utiliza para resolverlo cuando la optimización adaptativa (AQE) no es suficiente?",
    options: [
      {
        id: "opt_1",
        "text": "Sesgo de datos (Data Skew), donde una clave de unión contiene un volumen desproporcionadamente masivo de filas; se soluciona aplicando la técnica de salazón (Salting) o habilitando la unión con mitigación de sesgo de AQE (spark.sql.adaptive.skewJoin.enabled).",
        "isCorrect": true,
        "rationale": "El sesgo de datos (Data Skew) ocurre cuando una partición recibe órdenes de magnitud más datos que las demás (ej. un cliente genérico 'ID: 0' o compras corporativas masivas). La técnica de 'Salting' añade un prefijo aleatorio a la clave para dispersar las filas entre múltiples ejecutores, eliminando la tarea cuello de botella."
      },
      {
        id: "opt_2",
        "text": "El cable de red del centro de datos de Azure se ha desconectado físicamente.",
        "isCorrect": false,
        "rationale": "Si hubiera una caída de red física, fallarían todas las tareas del clúster, no una tarea específica de join."
      },
      {
        id: "opt_3",
        "text": "La memoria RAM de la máquina virtual se ha transformado en almacenamiento flash.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      },
      {
        id: "opt_4",
        "text": "El lenguaje Python no admite trabajar con más de 100 filas a la vez.",
        "isCorrect": false,
        "rationale": "Apache Spark con PySpark procesa rutinariamente billones de filas distribuidas."
      }
    ],
    "explanation": "El síntoma de que casi todas las tareas de Spark terminan rápido pero una se queda bloqueada durante minutos/horas es el diagnóstico inequívoco de Sesgo de Datos (Data Skew).",
    "theoryPill": {
      "title": "Diagnóstico y Mitigación del Sesgo de Datos (Data Skew) en Spark",
      "summary": "Eliminación de cuellos de botella en tareas de combinación distribuidas.",
      "keyPoints": [
        "Síntoma en Spark UI: Mediana de tiempo de tarea = 4s; Máximo de tiempo de tarea = 40m. Una o pocas tareas procesan gigabytes mientras el resto procesa megabytes.",
        "Causas habituales: Valores nulos masivos en la clave de join, clientes por defecto (ej. 'Consumidor Final'), fechas clave.",
        "Solución 1 (Automática): Adaptive Query Execution (AQE) Skew Join (`spark.sql.adaptive.skewJoin.enabled = true`), que divide automáticamente las particiones sesgadas.",
        "Solución 2 (Manual): Salting (añadir una clave aleatoria `salt` en la tabla sesgada y replicar la otra tabla) o filtrar valores nulos antes del join."
      ],
      "examTrap": "Si en la Spark UI 199 tareas terminan en segundos y 1 sola tarea tarda horas, el diagnóstico es 'Data Skew' y la solución técnica es 'AQE skew join' o 'Salting'.",
      "searchQuery": "Spark data skew resolution salting AQE Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Adaptive query execution in Apache Spark - Skew join optimization | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/optimizations/aqe#skew-join-optimization"
      }
    ]
  },
  {
    id: "DP700-109",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Tablas Administradas (Managed) vs Tablas Externas (External) en Fabric Lakehouse",
    topicIcon: "lakehouse",
    tags: ["Lakehouse", "Managed Tables", "External Tables", "OneLake", "Storage"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Tabla administrada (Managed):\nCREATE TABLE lakehouse.ManagedSales USING DELTA AS SELECT * FROM raw_sales;\n\n-- Tabla externa (External):\nCREATE TABLE lakehouse.ExternalSales USING DELTA LOCATION 'abfss://container@account.dfs.core.windows.net/sales/';",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Lakehouse, un ingeniero de datos ejecuta la instrucción `DROP TABLE NombreTabla;`. En una de las tablas, tanto los metadatos del catálogo como los archivos Parquet físicos subyacentes en OneLake se eliminan por completo. En otra tabla, los metadatos se eliminan pero los archivos Parquet en el Data Lake externo permanecen intactos. ¿Cuál es la diferencia fundamental entre una tabla administrada (Managed Table) y una tabla externa (External Table) en Microsoft Fabric?",
    options: [
      {
        id: "opt_1",
        "text": "Una tabla administrada (Managed Table, ubicada en 'Tables/') gestiona tanto los metadatos como los archivos de datos en OneLake (al hacer DROP se borra todo), mientras que una tabla externa (External Table, definida con una cláusula LOCATION específica) solo gestiona los metadatos en el catálogo (al hacer DROP los archivos físicos subyacentes se conservan).",
        "isCorrect": true,
        "rationale": "Es la regla fundamental de los catálogos basados en metastore de Spark/Hive y Fabric. Las tablas administradas residen en el directorio administrado de OneLake y su ciclo de vida está 100% controlado por Fabric. Las tablas externas apuntan a una ruta personalizada (`LOCATION`) y el comando `DROP TABLE` únicamente desvincula los metadatos, protegiendo los datos físicos contra eliminaciones accidentales."
      },
      {
        id: "opt_2",
        "text": "Las tablas administradas solo admiten 5 columnas y las externas admiten 100.",
        "isCorrect": false,
        "rationale": "No existe ninguna limitación de número de columnas vinculada al tipo de tabla."
      },
      {
        id: "opt_3",
        "text": "Las tablas externas no permiten ejecutar consultas SELECT.",
        "isCorrect": false,
        "rationale": "Las tablas externas se pueden consultar exactamente igual que las administradas mediante Spark y T-SQL."
      },
      {
        id: "opt_4",
        "text": "Las tablas administradas se borran automáticamente cada noche a las 00:00.",
        "isCorrect": false,
        "rationale": "Las tablas administradas son persistentes hasta que un usuario ejecuta explícitamente un DROP."
      }
    ],
    "explanation": "En Fabric Lakehouse, un `DROP TABLE` sobre una tabla administrada elimina tanto los metadatos como los archivos Parquet físicos en OneLake, mientras que sobre una tabla externa solo borra los metadatos del metastore.",
    "theoryPill": {
      "title": "Tablas Administradas (Managed) vs Externas (External) en Lakehouse",
      "summary": "Gestión del ciclo de vida de datos y metadatos en OneLake.",
      "keyPoints": [
        "Managed Tables (Ubicación predeterminada 'Tables/'): OneLake gestiona los datos. DROP TABLE borra metadatos Y archivos Parquet físicos.",
        "External Tables (Cláusula LOCATION explícita): Los datos pueden residir en 'Files/' o en un ADLS Gen2 externo. DROP TABLE borra solo el registro en el catálogo.",
        "Direct Lake: Solo las tablas administradas (o tablas externas compatibles con Delta en OneLake) tienen soporte completo para Direct Lake en Power BI.",
        "V-Order: Las tablas administradas creadas en Fabric aplican optimizaciones de V-Order de forma predeterminada."
      ],
      "examTrap": "Al ejecutar `DROP TABLE` en una tabla EXTERNA, los archivos Parquet físicos NO se eliminan; en una tabla ADMINISTRADA (Managed), se eliminan archivos y metadatos.",
      "searchQuery": "Managed vs external tables Microsoft Fabric Lakehouse DP-700"
    },
    "references": [
      {
        "title": "Tables in Microsoft Fabric lakehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-tables"
      }
    ]
  },
  {
    id: "DP700-110",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Optimización de Particionamiento en PySpark: coalesce() vs repartition()",
    topicIcon: "spark",
    tags: ["PySpark", "coalesce", "repartition", "Shuffle", "Performance"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Reducción de 200 particiones a 10 particiones antes de guardar:\ndf_output = df_processed.coalesce(10)\ndf_output.write.format(\"delta\").saveAsTable(\"ConsolidatedData\")",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark en Fabric, estás procesando una tabla y, tras múltiples filtros que descartan el 95% de los datos, el DataFrame tiene 200 particiones en memoria que contienen muy pocos registros cada una. Deseas consolidar los datos en 10 particiones antes de escribir en OneLake para evitar generar 200 archivos pequeños. Necesitas realizar esta reducción de particiones con el menor coste de CPU y sin desencadenar un intercambio de datos completo por red (Full Shuffle). ¿Qué método debes utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "df_processed.coalesce(10)",
        "isCorrect": true,
        "rationale": "`coalesce(n)` reduce el número de particiones combinando particiones adyacentes existentes en el mismo nodo ejecutor sin realizar un Shuffle completo de red, siendo mucho más rápido y económico en recursos que `repartition(n)` para reducciones de particionado."
      },
      {
        id: "opt_2",
        "text": "df_processed.repartition(10)",
        "isCorrect": false,
        "rationale": "`repartition(10)` fuerza un Shuffle de red completo reorganizando todas las filas a través del clúster, lo que resulta innecesariamente costoso cuando solo se desea reducir particiones."
      },
      {
        id: "opt_3",
        "text": "df_processed.collect()",
        "isCorrect": false,
        "rationale": "`collect()` descarga todas las filas en el nodo driver monohilo, sin resolver el particionamiento distribuido y con riesgo de OutOfMemory."
      },
      {
        id: "opt_4",
        "text": "df_processed.sample(0.1)",
        "isCorrect": false,
        "rationale": "`sample()` descarta el 90% de los datos de negocio en lugar de reorganizar particiones."
      }
    ],
    "explanation": "Para reducir el número de particiones sin incurrir en la costosa sobrecarga de red de un Shuffle completo, se debe utilizar `coalesce()` en lugar de `repartition()`.",
    "theoryPill": {
      "title": "Ajuste de Particiones en PySpark: coalesce() vs repartition()",
      "summary": "Optimización del número de archivos de salida y balance de carga en Spark.",
      "keyPoints": [
        "coalesce(n): Solo sirve para REDUCIR particiones. Evita el Shuffle de red fusionando particiones locales en los ejecutores.",
        "repartition(n): Sirve para AUMENTAR o REDUCIR particiones. Fuerza un Shuffle completo de datos en red, balanceando el tamaño de forma perfectamente uniforme.",
        "repartition(columna): Reorganiza los datos en base al hash de una columna específica para optimizar operaciones de join posteriores.",
        "Regla de uso: Usar `coalesce` justo antes de guardar en disco para evitar el problema de archivos pequeños tras filtros masivos."
      ],
      "examTrap": "Para REDUCIR el número de particiones SIN hacer Shuffle de red, utiliza `coalesce()`; `repartition()` siempre realiza Shuffle.",
      "searchQuery": "PySpark coalesce vs repartition performance Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Optimizing Apache Spark partitions | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/optimizations/partition-coalescing"
      }
    ]
  }
];

console.log(`Prepared ${dp700Batch3.length} additional questions for DP-700.`);


