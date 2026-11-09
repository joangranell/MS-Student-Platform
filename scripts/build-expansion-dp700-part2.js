/**
 * scripts/build-expansion-dp700-part2.js
 * Final 20 High-Fidelity Questions for DP-700 (DP700-081 to DP700-100)
 * Certification: Implementing Data Engineering Solutions Using Microsoft Fabric (DP-700)
 */

export const dp700QuestionsPart2 = [
  {
    id: "DP700-081",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Evolución de Esquemas en Delta Lake (mergeSchema vs overwriteSchema)",
    topicIcon: "spark",
    tags: ["Delta Lake", "Schema Evolution", "mergeSchema", "PySpark", "Data Integrity"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "(df_new_records.write\n    .format(\"delta\")\n    .mode(\"append\")\n    .option(\"mergeSchema\", \"true\")\n    .saveAsTable(\"SilverCustomers\"))",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark en Fabric, ingestas un nuevo lote de datos hacia una tabla Delta 'SilverCustomers'. El nuevo lote contiene tres columnas adicionales ('LoyaltyTier', 'DiscountRate', 'MobileAppRegistered') que no existían en el esquema original de la tabla. Por defecto, Spark rechaza la escritura con una excepción de discrepancia de esquema (Schema Enforcement). Deseas que Delta Lake incorpore automáticamente estas tres nuevas columnas a la tabla sin sobrescribir ni borrar los datos existentes. ¿Qué opción debes añadir en la operación de escritura?",
    options: [
      {
        id: "opt_1",
        "text": ".option(\"mergeSchema\", \"true\")",
        "isCorrect": true,
        "rationale": "La opción `.option(\"mergeSchema\", \"true\")` activa la evolución de esquemas (Schema Evolution) en Delta Lake. Añade automáticamente cualquier columna nueva presente en el DataFrame que no existiera en la tabla de destino, asignando valores nulos en las filas históricas sin sobrescribir los datos previos."
      },
      {
        id: "opt_2",
        "text": ".option(\"overwriteSchema\", \"true\") combinado con .mode(\"overwrite\")",
        "isCorrect": false,
        "rationale": "overwriteSchema con modo overwrite sustituye el esquema pero ELIMINA y sobrescribe todos los datos existentes de la tabla, perdiendo el histórico de clientes."
      },
      {
        id: "opt_3",
        "text": ".option(\"ignoreAllColumns\", \"true\")",
        "isCorrect": false,
        "rationale": "Parámetro ficticio inexistente en la API de Delta Lake."
      },
      {
        id: "opt_4",
        "text": ".option(\"formatDisk\", \"true\")",
        "isCorrect": false,
        "rationale": "No existe tal opción en Apache Spark."
      }
    ],
    "explanation": "La opción `mergeSchema = true` en Delta Lake permite la evolución de esquemas durante operaciones append, agregando de forma segura nuevas columnas a la tabla existente.",
    "theoryPill": {
      "title": "Control y Evolución de Esquemas en Delta Lake",
      "summary": "Protección contra corrupción y adaptación dinámica a cambios de esquemas.",
      "keyPoints": [
        "Schema Enforcement (Aplicación de esquema): Comportamiento predeterminado. Rechaza escrituras si las columnas o tipos no coinciden para prevenir corrupción.",
        "mergeSchema (Evolución de esquema): `.option('mergeSchema', 'true')` adapta la tabla añadiendo las nuevas columnas detectadas.",
        "overwriteSchema: `.option('overwriteSchema', 'true')` redefine por completo el esquema de la tabla (normalmente usado junto a `mode('overwrite')`).",
        "Tipos de datos compatibles: La evolución añade columnas, pero no convierte automáticamente tipos incompatibles (ej. String a Integer)."
      ],
      "examTrap": "Para AÑADIR columnas nuevas sin perder datos en modo append, usa `mergeSchema=true`. Usar `overwriteSchema` borra y reemplaza la tabla entera.",
      "searchQuery": "Delta Lake schema enforcement and schema evolution PySpark DP-700"
    },
    "references": [
      {
        "title": "Delta Lake schema enforcement and evolution | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#schema-evolution"
      }
    ]
  },
  {
    id: "DP700-082",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Escritura desde PySpark hacia Fabric Warehouse",
    topicIcon: "warehouse",
    tags: ["PySpark", "Warehouse", "Fabric Synapse Link", "Interoperability", "Delta"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Conexión y escritura directa desde Spark a Fabric Warehouse\ndf_transformed.write \\\n    .format(\"fabric\") \\\n    .option(\"warehouse\", \"SalesEnterpriseWarehouse\") \\\n    .option(\"schema\", \"dbo\") \\\n    .option(\"table\", \"FactConsolidatedSales\") \\\n    .mode(\"append\") \\\n    .save()",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una arquitectura de Fabric donde conviven ingenieros de Spark y analistas de T-SQL, un Notebook de Spark transforma un gran volumen de datos en el Lakehouse. Necesitas escribir el DataFrame resultante directamente en una tabla gestionada de un Fabric Warehouse ('SalesEnterpriseWarehouse') respetando sus transacciones ACID y tipos relacionales de SQL, para que los usuarios del almacén puedan consultarlo inmediatamente con T-SQL. ¿Qué conector nativo de Fabric se debe utilizar en PySpark?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar el conector nativo de Microsoft Fabric para Apache Spark (formato 'fabric' o conector de Warehouse) que escribe directamente en las tablas del almacén.",
        "isCorrect": true,
        "rationale": "Microsoft Fabric proporciona un conector nativo optimizado para Apache Spark que permite leer y escribir tablas de Fabric Warehouses directamente desde PySpark utilizando la autenticación integrada de Entra ID y respetando las transacciones del motor de Warehouse."
      },
      {
        id: "opt_2",
        "text": "Abrir una conexión JDBC estándar con usuario 'sa' y contraseña en texto plano.",
        "isCorrect": false,
        "rationale": "Fabric Warehouse no utiliza autenticación SQL clásica con usuario 'sa'; utiliza autenticación centralizada de Microsoft Entra ID."
      },
      {
        id: "opt_3",
        "text": "Copiar los datos a mano celda por celda en la interfaz web.",
        "isCorrect": false,
        "rationale": "Inviable para millones de registros analíticos."
      },
      {
        id: "opt_4",
        "text": "Exportar a disquete y enviarlo por valija diplomática.",
        "isCorrect": false,
        "rationale": "No es una solución técnica moderna para computación en la nube."
      }
    ],
    "explanation": "El conector nativo de Fabric para Apache Spark permite la interoperabilidad directa y transaccional entre Notebooks de Spark y Fabric Warehouses sin requerir configuración manual de drivers JDBC.",
    "theoryPill": {
      "title": "Interoperabilidad entre Spark y Fabric Warehouse",
      "summary": "Escritura y lectura bidireccional entre PySpark y almacenes T-SQL.",
      "keyPoints": [
        "Formato unificado: Tanto Lakehouse como Warehouse se basan en Delta Parquet sobre OneLake.",
        "Conector nativo: Permite a los notebooks de Spark interactuar directamente con esquemas de Warehouse.",
        "Seguridad: Utiliza el contexto del usuario autenticado en Fabric sin cadenas de conexión codificadas.",
        "Gobernanza: Mantiene el linaje y las restricciones transaccionales de ACID en el Warehouse."
      ],
      "examTrap": "Para escribir desde Spark a un Warehouse en Fabric, no configures servidores JDBC externos; usa el conector nativo integrado de Fabric.",
      "searchQuery": "Connect Apache Spark to Microsoft Fabric Warehouse DP-700"
    },
    "references": [
      {
        "title": "Connect to a warehouse in Microsoft Fabric with Apache Spark | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/spark-connect-warehouse"
      }
    ]
  },
  {
    id: "DP700-083",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Automatización de Despliegues CI/CD con APIs REST de Fabric",
    topicIcon: "fabric",
    tags: ["CI/CD", "REST API", "DevOps", "Automation", "Workspaces"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/git/commitToGit\nAuthorization: Bearer <Entra_ID_Token>\nContent-Type: application/json\n\n{\n  \"mode\": \"All\",\n  \"comment\": \"Automated CI/CD Commit from Azure DevOps Pipeline\"\n}",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Tu organización utiliza canalizaciones de Azure DevOps (Azure Pipelines) o GitHub Actions para automatizar el ciclo de vida del software. Necesitas que, tras aprobarse una Pull Request en la rama principal, el flujo de CI/CD invoque automáticamente a Microsoft Fabric para actualizar el área de trabajo de producción sincronizando los últimos artefactos confirmados desde el repositorio de Git, sin intervención humana manual en el explorador. ¿Qué mecanismo proporciona esta capacidad de automatización desatendida?",
    options: [
      {
        id: "opt_1",
        "text": "Invocar los puntos de conexión de la API REST de Microsoft Fabric para Git Integration (específicamente la API `updateFromGit` y `commitToGit`) utilizando una Entidad de Servicio (Service Principal).",
        "isCorrect": true,
        "rationale": "Las APIs REST públicas de Microsoft Fabric para Git Integration (`/git/updateFromGit`, `/git/commitToGit`, `/git/status`) permiten que las canalizaciones de DevOps (GitHub Actions o Azure Pipelines) autenticadas con una Entidad de Servicio orquesten de forma totalmente automatizada la sincronización e implementación de áreas de trabajo."
      },
      {
        id: "opt_2",
        "text": "Pedir a un desarrollador que inicie sesión manualmente cada medianoche para hacer clic en 'Actualizar desde Git'.",
        "isCorrect": false,
        "rationale": "No es una solución automatizada de CI/CD desatendida."
      },
      {
        id: "opt_3",
        "text": "Instalar un emulador de ratón que mueva el cursor en una pantalla encendida.",
        "isCorrect": false,
        "rationale": "Es una aproximación frágil, no profesional e insegura."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar la integración de Git en toda la empresa.",
        "isCorrect": false,
        "rationale": "Destruiría el control de versiones y las prácticas de DevOps del equipo."
      }
    ],
    "explanation": "Las APIs REST de Fabric para Git (`updateFromGit`) permiten a las canalizaciones de CI/CD externas de GitHub o Azure DevOps desplegar y sincronizar artefactos analíticos de forma automática y desatendida.",
    "theoryPill": {
      "title": "Automatización de CI/CD en Fabric mediante APIs REST de Git",
      "summary": "Despliegues continuos programáticos con Azure Pipelines y GitHub Actions.",
      "keyPoints": [
        "Endpoints clave: `POST /v1/workspaces/{id}/git/updateFromGit` (actualiza el área de trabajo con el repositorio remoto), `POST .../commitToGit` (confirma cambios de Fabric en Git).",
        "Autenticación: Entidad de servicio (Service Principal) de Microsoft Entra ID con permisos en el área de trabajo.",
        "Operaciones de larga duración (LRO): Las APIs de Git devuelven código HTTP 202 Accepted con una cabecera `Location` para sondear el estado de la operación hasta completarse.",
        "Pruebas automáticas: Permite ejecutar pruebas unitarias automáticas antes de promover cambios a producción."
      ],
      "examTrap": "Para automatizar despliegues de Git en Fabric desde Azure DevOps o GitHub Actions sin intervención humana, se usa la API REST `updateFromGit`.",
      "searchQuery": "Automate Fabric Git integration REST API DP-700"
    },
    "references": [
      {
        "title": "Automate Git integration by using APIs - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/cicd/git-integration/git-automation"
      }
    ]
  },
  {
    id: "DP700-084",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Monitorización de Spark: Interfaz de Usuario de Spark (Spark UI) y Log Analytics",
    topicIcon: "spark",
    tags: ["Spark UI", "History Server", "Log Analytics", "Diagnostics", "Stages"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un trabajo de Spark complejo de 4 horas falla esporádicamente durante la noche en una fase (Stage) específica. Al inspeccionar el fallo al día siguiente, necesitas revisar el grafo acíclico dirigido (DAG) de ejecución, el volumen de datos intercambiados por Shuffle en cada tarea (Task), el tiempo de recolección de elementos no utilizados (GC time) y la distribución del sesgo de datos entre los ejecutores. ¿Dónde puedes consultar esta telemetría detallada tanto para trabajos en vivo como para trabajos ya finalizados?",
    options: [
      {
        id: "opt_1",
        "text": "En el centro de monitorización de Fabric (Monitoring Hub) accediendo a la Interfaz de Usuario de Spark (Spark UI / Spark History Server), complementada con la exportación de diagnósticos a Azure Log Analytics.",
        "isCorrect": true,
        "rationale": "El Monitoring Hub de Fabric ofrece acceso directo a la Spark UI (para ejecuciones en vivo) y al Spark History Server (para ejecuciones históricas). Permite analizar el DAG de ejecución, etapas, tareas individuales, métricas de Shuffle y tiempos de GC. Además, se pueden emitir registros de diagnóstico continuos hacia Azure Log Analytics para alertas y análisis a largo plazo."
      },
      {
        id: "opt_2",
        "text": "En la Papelera de reciclaje de Windows.",
        "isCorrect": false,
        "rationale": "La papelera de reciclaje local no almacena telemetría de clústeres Spark de Azure."
      },
      {
        id: "opt_3",
        "text": "Preguntando a un modelo semántico de Power BI mediante DAX.",
        "isCorrect": false,
        "rationale": "DAX es un lenguaje analítico de modelos semánticos, no una herramienta de diagnóstico de tareas de bajo nivel de Apache Spark."
      },
      {
        id: "opt_4",
        "text": "Reiniciando el monitor del ordenador.",
        "isCorrect": false,
        "rationale": "El hardware de visualización local no tiene relación con el diagnóstico de clústeres."
      }
    ],
    "explanation": "La Spark UI y el Spark History Server accesibles desde el Monitoring Hub de Fabric proporcionan la telemetría detallada de tareas, etapas (stages), gráficos DAG y métricas de shuffle para diagnosticar el rendimiento y fallos de Spark.",
    "theoryPill": {
      "title": "Diagnóstico Avanzado de Spark: Spark UI y Log Analytics",
      "summary": "Herramientas de inspección profunda de tareas, etapas y memoria de ejecutores.",
      "keyPoints": [
        "Spark UI (Live): Disponible mientras el clúster y la sesión están en ejecución activa.",
        "Spark History Server: Permite consultar el rendimiento detallado de trabajos que ya han finalizado o fallado días atrás.",
        "Métricas clave a inspeccionar: Shuffle Read/Write (identifica transferencias excesivas de red), Task duration skew (identifica sesgo de datos donde una tarea tarda 10x más que las demás), GC Time (problemas de memoria en ejecutores).",
        "Integración con Azure Log Analytics: Emisión de eventos y métricas de Spark para crear paneles consolidados en Azure Monitor."
      ],
      "examTrap": "Para inspeccionar el grafo DAG, tareas lentas por sesgo de datos y métricas de shuffle de un job de Spark finalizado en Fabric, se usa la 'Spark UI / Spark History Server'.",
      "searchQuery": "Monitor Apache Spark applications with Fabric Spark UI DP-700"
    },
    "references": [
      {
        "title": "Browse Apache Spark applications in the Fabric Monitoring hub | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/spark-monitoring-hub"
      }
    ]
  },
  {
    id: "DP700-085",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Estadísticas en Fabric Warehouse (Automatic & Manual Statistics)",
    topicIcon: "warehouse",
    tags: ["Warehouse", "Statistics", "Query Optimizer", "Cardinality", "T-SQL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Creación manual de estadísticas sobre columnas de filtro frecuente\nCREATE STATISTICS stat_Customer_City \nON dbo.DimCustomer (City);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse, el optimizador de consultas basado en costes genera planes de ejecución para determinar cómo procesar consultas complejas (elección de algoritmos de Join, estimación de cardinalidad y reserva de memoria). ¿Cómo gestiona Microsoft Fabric las estadísticas de las columnas para que el optimizador tome decisiones informadas?",
    options: [
      {
        id: "opt_1",
        "text": "Fabric Warehouse crea y actualiza estadísticas automáticamente en segundo plano bajo demanda cuando se ejecutan consultas, pero los ingenieros de datos también pueden crear estadísticas explícitas mediante CREATE STATISTICS para optimizar columnas críticas de combinación y filtrado.",
        "isCorrect": true,
        "rationale": "Fabric Warehouse incluye un motor inteligente de estadísticas automáticas que genera histogramas y densidades de columnas bajo demanda cuando las consultas lo requieren. Para cargas de trabajo críticas o tablas que cambian drásticamente, los ingenieros pueden crear y actualizar estadísticas manualmente mediante `CREATE STATISTICS` o `UPDATE STATISTICS`."
      },
      {
        id: "opt_2",
        "text": "Fabric Warehouse no utiliza estadísticas y procesa todas las consultas adivinando el orden aleatoriamente.",
        "isCorrect": false,
        "rationale": "Fabric incorpora un optimizador de consultas altamente sofisticado basado en el motor de SQL Server."
      },
      {
        id: "opt_3",
        "text": "Las estadísticas en Fabric solo se pueden calcular imprimiendo las tablas en una hoja de papel.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      },
      {
        id: "opt_4",
        "text": "Las estadísticas ocupan el 99% del espacio en disco de OneLake.",
        "isCorrect": false,
        "rationale": "Los metadatos estadísticos son sumamente ligeros (pocos kilobytes por columna)."
      }
    ],
    "explanation": "Fabric Warehouse gestiona estadísticas de cardinalidad automáticamente en segundo plano para optimizar los planes de ejecución de T-SQL, permitiendo también la creación y actualización manual para cargas críticas.",
    "theoryPill": {
      "title": "Gestión de Estadísticas en Fabric Warehouse",
      "summary": "Optimización de consultas relacionales y estimación de cardinalidad.",
      "keyPoints": [
        "Estadísticas automáticas: El motor crea estadísticas de columnas automáticamente cuando una consulta filtra o une por ellas.",
        "CREATE STATISTICS: Instrucción manual para crear histogramas de distribución en columnas utilizadas en predicados complejos.",
        "UPDATE STATISTICS: Recomendado tras cargas de datos masivas (CTAS o COPY INTO) que hayan cambiado significativamente el volumen de filas.",
        "Impacto en rendimiento: Estadísticas desactualizadas provocan estimaciones de cardinalidad erróneas, provocando planes de ejecución lentos (ej. seleccionar Nested Loops en lugar de Hash Match)."
      ],
      "examTrap": "Aunque Fabric crea estadísticas automáticamente, tras cargas masivas masivas de datos se recomienda ejecutar `UPDATE STATISTICS` en las tablas clave.",
      "searchQuery": "Statistics in Microsoft Fabric data warehouse DP-700"
    },
    "references": [
      {
        "title": "Statistics in Microsoft Fabric Warehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/statistics"
      }
    ]
  },
  {
    id: "DP700-086",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Vectores de Eliminación en Delta Lake (Deletion Vectors)",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "Deletion Vectors", "Soft Delete", "Performance", "Parquet"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "ALTER TABLE SilverOrders \nSET TBLPROPERTIES ('delta.enableDeletionVectors' = true);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una tabla Delta de 50 terabytes, las operaciones frecuentes de eliminación (`DELETE WHERE CustomerID = 123`) o modificación (`UPDATE`) tardan varios minutos debido a que, tradicionalmente, Delta Lake debe reescribir por completo cada archivo Parquet de 1 GB donde se encuentre una sola fila afectada. ¿Qué funcionalidad avanzada de Delta Lake en Microsoft Fabric soluciona este cuello de botella permitiendo marcar filas eliminadas en un archivo de mapa de bits complementario sin reescribir los archivos Parquet completos?",
    options: [
      {
        id: "opt_1",
        "text": "Vectores de eliminación de Delta Lake (Deletion Vectors).",
        "isCorrect": true,
        "rationale": "Deletion Vectors almacena las filas eliminadas o actualizadas como marcas en pequeños archivos binarios complementarios (bitmaps / Roaring Bitmaps). Al ejecutar un DELETE o UPDATE, el archivo Parquet original de 1 GB no se reescribe, reduciendo la sobrecarga de E/S y acelerando las modificaciones hasta por un factor de 10."
      },
      {
        id: "opt_2",
        "text": "El formateo del sistema operativo en modo FAT32.",
        "isCorrect": false,
        "rationale": "FAT32 es un sistema de archivos antiguo de discos locales incompatible con Delta Lake en OneLake."
      },
      {
        id: "opt_3",
        "text": "Eliminar la tabla y volver a cargar todos los datos de los últimos 10 años.",
        "isCorrect": false,
        "rationale": "Es una aproximación catastrófica para el rendimiento y la disponibilidad de los datos."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar la red de Azure durante las eliminaciones.",
        "isCorrect": false,
        "rationale": "Desconectaría el acceso a OneLake provocando errores de red."
      }
    ],
    "explanation": "Los Deletion Vectors en Delta Lake optimizan radicalmente los DELETEs y UPDATEs registrando las filas modificadas en pequeños archivos de vectores de eliminación sin reescribir los archivos Parquet enteros.",
    "theoryPill": {
      "title": "Vectores de Eliminación (Deletion Vectors) en Delta Lake",
      "summary": "Eliminaciones y actualizaciones ultrarrápidas sin reescritura completa de archivos Parquet.",
      "keyPoints": [
        "Problema tradicional: Modificar 1 fila en un archivo Parquet de 1 GB requería leer y reescribir el archivo de 1 GB completo ('write amplification').",
        "Con Deletion Vectors: Se escribe un pequeño archivo de vector de eliminación (< pocos KB) que indica qué filas están descartadas en ese archivo Parquet.",
        "Lecturas: Los motores compatibles (Spark, Fabric SQL Endpoint, Direct Lake) aplican el vector en memoria descartando las filas eliminadas al leer.",
        "Reconciliación: Cuando se ejecuta `OPTIMIZE`, los archivos se reescriben limpiamente consolidando los vectores."
      ],
      "examTrap": "Para acelerar operaciones frecuentes de DELETE y UPDATE en tablas Delta masivas en Fabric, activa 'Deletion Vectors' (`delta.enableDeletionVectors = true`).",
      "searchQuery": "Delta Lake deletion vectors Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Delta Lake deletion vectors in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#deletion-vectors"
      }
    ]
  },
  {
    id: "DP700-087",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Seguridad de Accesos Directos de OneLake (Entidad de Servicio vs Usuario Delegado)",
    topicIcon: "onelake",
    tags: ["OneLake", "Shortcuts", "Security", "Service Principal", "Delegated User"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un ingeniero de datos configura un acceso directo de OneLake (OneLake Shortcut) en un Fabric Lakehouse que apunta a una cuenta de almacenamiento externa Azure Data Lake Storage Gen2 corporativa. Múltiples analistas de negocio con rol de visor en el área de trabajo de Fabric deben poder consultar los datos a través del acceso directo, pero la mayoría de esos analistas NO tienen asignados permisos directos de control de acceso RBAC en la cuenta de almacenamiento de Azure externa. ¿Qué tipo de credencial debe configurarse en la conexión del acceso directo?",
    options: [
      {
        id: "opt_1",
        "text": "Una conexión en la nube que utilice una Entidad de Servicio (Service Principal) o clave de cuenta autorizada, lo que permite que el acceso directo acceda al almacenamiento externo utilizando la identidad de la entidad sin requerir que cada usuario final tenga permisos directos en la cuenta de Azure externa.",
        "isCorrect": true,
        "rationale": "Al configurar un OneLake Shortcut con una Entidad de Servicio (Service Principal), la conexión asume los permisos concedidos al Service Principal en la cuenta externa de Azure. Los usuarios autorizados en Fabric pueden consultar el acceso directo mediante la gobernanza interna de Fabric sin necesidad de concederles permisos directos en el almacenamiento subyacente."
      },
      {
        id: "opt_2",
        "text": "Credenciales de identidad delegada de usuario (User delegated), obligando a que cada analista tenga permisos de administrador en la suscripción de Azure.",
        "isCorrect": false,
        "rationale": "Las credenciales delegadas de usuario harían que la consulta falle para todos los analistas que carecen de permisos en la cuenta de Azure externa."
      },
      {
        id: "opt_3",
        "text": "Acceso anónimo público a través de internet sin ningún tipo de seguridad.",
        "isCorrect": false,
        "rationale": "Vulnera todas las directivas de seguridad corporativas y expone los datos confidenciales a la red pública."
      },
      {
        id: "opt_4",
        "text": "Escribir el PIN de la tarjeta de crédito del ingeniero en el nombre de la carpeta.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica e insegura."
      }
    ],
    "explanation": "Configurar una Entidad de Servicio (Service Principal) en la conexión de un OneLake Shortcut desacopla los permisos del almacenamiento externo de las identidades individuales de los analistas de Fabric.",
    "theoryPill": {
      "title": "Modelos de Autenticación para OneLake Shortcuts",
      "summary": "Gestión de credenciales para orígenes de almacenamiento externos.",
      "keyPoints": [
        "Service Principal (Recomendado para producción): Desacopla la identidad del usuario; Fabric accede usando los permisos del Service Principal en Azure Storage o AWS IAM.",
        "User Identity (Delegada): La consulta evalúa los permisos del usuario que ejecuta la consulta directamente contra el almacenamiento externo (falla si el usuario carece de rol RBAC allí).",
        "Gobernanza centralizada: Permite a los administradores de Fabric gobernar el acceso al shortcut mediante roles de Fabric (Viewer, ReadData) sin gestionar miles de asignaciones RBAC en Azure.",
        "Rotación: Los secretos del Service Principal se administran centralmente en Azure Entra ID / Key Vault."
      ],
      "examTrap": "Para que usuarios de Fabric consulten un acceso directo a ADLS Gen2 sin tener permisos RBAC directos en la cuenta externa, usa autenticación con 'Service Principal'.",
      "searchQuery": "OneLake shortcuts security service principal credentials Fabric DP-700"
    },
    "references": [
      {
        "title": "OneLake shortcuts security and authentication | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts#security"
      }
    ]
  },
  {
    id: "DP700-088",
    certification: "DP-700",
    domain: "Prepare data",
    topic: "Intercalación (Collation) en Fabric Warehouse: Latin1_General_100_BIN2_UTF8",
    topicIcon: "warehouse",
    tags: ["Warehouse", "Collation", "BIN2", "UTF8", "Performance", "T-SQL"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- En Fabric Warehouse, las comparaciones son sensibles a mayúsculas por defecto:\nSELECT * FROM Customers WHERE Country = 'spain'; -- No devolverá 'Spain'",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Al ejecutar consultas T-SQL en un Fabric Warehouse, observas que la consulta `SELECT * FROM Customers WHERE LastName = 'GARCIA'` no devuelve registros cuya columna contenga 'Garcia' o 'garcia'. ¿Cuál es la intercalación (Collation) predeterminada impuesta en Microsoft Fabric Warehouse y qué implicaciones tiene en las comparaciones de texto?",
    options: [
      {
        id: "opt_1",
        "text": "La intercalación predeterminada es Latin1_General_100_BIN2_UTF8, la cual es binaria y, por tanto, distingue entre mayúsculas y minúsculas (case-sensitive) y entre acentos; para comparaciones no sensibles se debe usar UPPER()/LOWER() o forzar una intercalación CI mediante la cláusula COLLATE.",
        "isCorrect": true,
        "rationale": "Fabric Warehouse utiliza exclusivamente la intercalación binaria UTF-8 `Latin1_General_100_BIN2_UTF8`. Las comparaciones binarias son extremadamente rápidas a nivel de hardware columnar, pero tienen la consecuencia de ser sensibles a mayúsculas/minúsculas (Case-Sensitive) y acentos (Accent-Sensitive)."
      },
      {
        id: "opt_2",
        "text": "Fabric Warehouse solo admite el idioma latín antiguo de la época del Imperio Romano.",
        "isCorrect": false,
        "rationale": "Latin1 es el nombre del juego de caracteres occidental estándar, no el idioma latín hablado."
      },
      {
        id: "opt_3",
        "text": "El motor de SQL convierte todos los textos en emojis antes de comparar.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      },
      {
        id: "opt_4",
        "text": "La tabla de clientes está corrompida y debe eliminarse.",
        "isCorrect": false,
        "rationale": "Es el comportamiento normal de la intercalación binaria predeterminada de Fabric."
      }
    ],
    "explanation": "La intercalación en Fabric Warehouse es `Latin1_General_100_BIN2_UTF8`, lo que significa que todas las comparaciones de texto en T-SQL son binarias y sensibles a mayúsculas y minúsculas por defecto.",
    "theoryPill": {
      "title": "Intercalación (Collation) en Fabric Warehouse",
      "summary": "Comportamiento de comparaciones de cadenas UTF-8 y sensibilidad a mayúsculas.",
      "keyPoints": [
        "Intercalación fija: `Latin1_General_100_BIN2_UTF8` (no se puede cambiar a nivel de base de datos completa).",
        "Ventajas: Soporte nativo para caracteres UTF-8 internacionales y rendimiento extremo en comparaciones binarias vectorizadas.",
        "Implicación clave: Las búsquedas en cláusulas WHERE y los JOINs son Case-Sensitive ('Madrid' <> 'madrid').",
        "Solución práctica: Utilizar `WHERE UPPER(Columna) = 'MADRID'` o aplicar explícitamente `COLLATE Latin1_General_100_CI_AS_SC_UTF8` en la expresión de consulta."
      ],
      "examTrap": "En Fabric Warehouse, las comparaciones T-SQL son Case-Sensitive (distinguen mayúsculas) debido a la intercalación binaria `Latin1_General_100_BIN2_UTF8`.",
      "searchQuery": "Collation in Microsoft Fabric Warehouse Latin1_General_100_BIN2_UTF8 DP-700"
    },
    "references": [
      {
        "title": "Collation in Microsoft Fabric Warehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/collation"
      }
    ]
  },
  {
    id: "DP700-089",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Estrategias de Almacenamiento en Caché de DataFrames en PySpark (cache vs persist)",
    topicIcon: "spark",
    tags: ["PySpark", "Caching", "Persist", "StorageLevel", "Memory Optimization"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "from pyspark import StorageLevel\n\n# 1. Almacenamiento en memoria con copia de seguridad en disco:\ndf_cleaned.persist(StorageLevel.MEMORY_AND_DISK)\n\n# ... múltiples transformaciones y acciones sobre df_cleaned ...\n\n# 2. Liberación obligatoria de memoria al terminar:\ndf_cleaned.unpersist()",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Notebook de PySpark, tienes un DataFrame resultante de transformaciones costosas (múltiples JOINs y agregaciones) que se utiliza posteriormente en 6 acciones diferentes (entrenamiento de modelo, exportación a tres tablas Delta y generación de dos métricas resumidas). Cada acción vuelve a ejecutar todo el linaje de transformaciones desde el origen. Deseas memorizar el DataFrame en memoria tras la primera acción, permitiendo que se desborde al disco si la memoria RAM se satura, y liberarlo explícitamente al final del notebook. ¿Qué patrón de código debes aplicar?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar df_cleaned.persist(StorageLevel.MEMORY_AND_DISK) antes de la primera acción y llamar a df_cleaned.unpersist() una vez completadas todas las acciones.",
        "isCorrect": true,
        "rationale": "`persist(StorageLevel.MEMORY_AND_DISK)` almacena el DataFrame particionado en la memoria de los ejecutores y, si no cabe, desborda al disco local sin recalcular. Llamar a `unpersist()` al final libera la memoria del clúster evitando saturación en tareas posteriores."
      },
      {
        id: "opt_2",
        "text": "Llamar a df_cleaned.unpersist() antes de definir el DataFrame.",
        "isCorrect": false,
        "rationale": "No se puede liberar un DataFrame antes de crearlo y evaluarlo."
      },
      {
        id: "opt_3",
        "text": "Escribir el DataFrame en 100 archivos de texto en el bloc de notas.",
        "isCorrect": false,
        "rationale": "No es una técnica de optimización distribuida de Spark."
      },
      {
        id: "opt_4",
        "text": "Nunca almacenar en caché ningún DataFrame bajo ninguna circunstancia.",
        "isCorrect": false,
        "rationale": "Reevaluar transformaciones pesadas 6 veces desperdicia recursos y ralentiza la canalización."
      }
    ],
    "explanation": "El uso de `persist(StorageLevel.MEMORY_AND_DISK)` almacena DataFrames reutilizados en memoria elástica con desbordamiento en disco, y `unpersist()` libera la memoria proactivamente para optimizar recursos.",
    "theoryPill": {
      "title": "Almacenamiento en Caché (cache vs persist) en Apache Spark",
      "summary": "Optimización del linaje de DataFrames reutilizados en múltiples acciones.",
      "keyPoints": [
        "df.cache(): Atajo equivalente a `persist(StorageLevel.MEMORY_AND_DISK_DESER)` (o MEMORY_ONLY en Spark clásico).",
        "df.persist(level): Permite elegir niveles de almacenamiento: MEMORY_ONLY, MEMORY_AND_DISK, MEMORY_ONLY_SER, DISK_ONLY.",
        "Evaluación perezosa: El almacenamiento en caché solo ocurre cuando se ejecuta la PRIMERA ACCIÓN (count, save, write, collect).",
        "unpersist(): Crucial para devolver memoria a la capacidad de Fabric y evitar cuellos de botella de recolección de basura (GC)."
      ],
      "examTrap": "Un DataFrame en caché no ocupa memoria hasta que se ejecuta la primera ACCIÓN sobre él; y siempre debe liberarse con `unpersist()` al terminar.",
      "searchQuery": "PySpark cache and persist StorageLevel Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Apache Spark caching and persistence | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/azure/databricks/spark/latest/spark-sql/caching"
      }
    ]
  },
  {
    id: "DP700-090",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Biblioteca de Utilidades de Fabric en Notebooks (notebookutils / mssparkutils)",
    topicIcon: "spark",
    tags: ["notebookutils", "mssparkutils", "File System", "Notebook Execution", "Parameters"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "# Ejecutar otro notebook con parámetros:\nresult = notebookutils.notebook.run(\"TransformSilver\", 600, {\"target_date\": \"2026-11-01\"})\n\n# Operaciones de sistema de archivos:\nnotebookutils.fs.mv(\"Files/staging/data.csv\", \"Files/archive/data.csv\")",
    "codeLanguage": "python",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En los Notebooks de Microsoft Fabric, necesitas interactuar programáticamente con el sistema de archivos de OneLake (mover archivos, listar directorios, verificar si existe una ruta) y encadenar la ejecución de otro notebook hijo pasando parámetros de fecha y un tiempo de espera límite de 600 segundos. ¿Qué biblioteca de utilidades nativa de Microsoft está disponible de forma predeterminada en el runtime de Spark de Fabric?",
    options: [
      {
        id: "opt_1",
        "text": "notebookutils (o su alias de compatibilidad mssparkutils).",
        "isCorrect": true,
        "rationale": "`notebookutils` (anteriormente `mssparkutils`) es el paquete de utilidades integrado en los notebooks de Fabric. Ofrece módulos para el sistema de archivos (`notebookutils.fs`), ejecución y salida de notebooks (`notebookutils.notebook.run`, `notebookutils.notebook.exit`), gestión de credenciales (`notebookutils.credentials`) y variables de entorno."
      },
      {
        id: "opt_2",
        "text": "El módulo `os.system('format c:')` de Python.",
        "isCorrect": false,
        "rationale": "Comando destructivo local no relacionado con OneLake ni con la ejecución de notebooks de Fabric."
      },
      {
        id: "opt_3",
        "text": "La biblioteca jQuery para navegadores web.",
        "isCorrect": false,
        "rationale": "jQuery es una biblioteca de manipulación del DOM de JavaScript para clientes web, no para Spark."
      },
      {
        id: "opt_4",
        "text": "No existen herramientas integradas; se debe programar todo mediante llamadas de bajo nivel en ensamblador.",
        "isCorrect": false,
        "rationale": "Fabric proporciona la completa suite de herramientas `notebookutils`."
      }
    ],
    "explanation": "La biblioteca `notebookutils` (con compatibilidad hacia atrás para `mssparkutils`) proporciona APIs nativas para manipulación de archivos en OneLake y orquestación de notebooks dentro de Microsoft Fabric.",
    "theoryPill": {
      "title": "Utilidades de Notebooks en Fabric: notebookutils",
      "summary": "Herramientas de sistema de archivos, ejecución y credenciales en PySpark.",
      "keyPoints": [
        "notebookutils.fs: Métodos `cp`, `mv`, `rm`, `ls`, `mkdirs`, `exists`, `head` sobre rutas de OneLake y Data Lake.",
        "notebookutils.notebook: `run(path, timeout, args_dict)` para invocar notebooks modulares y `exit(value)` para devolver resultados a la canalización padre.",
        "notebookutils.credentials: Acceso seguro a secretos de Azure Key Vault sin almacenar claves.",
        "Disponibilidad: Preinstalado y configurado automáticamente en todos los runtimes de Spark de Fabric."
      ],
      "examTrap": "Para mover archivos en OneLake o encadenar notebooks en PySpark, la biblioteca oficial es `notebookutils` (o `mssparkutils`).",
      "searchQuery": "Microsoft Fabric notebook utilities notebookutils mssparkutils DP-700"
    },
    "references": [
      {
        "title": "Microsoft Fabric Notebook utilities (notebookutils) | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/notebook-utilities"
      }
    ]
  },
  {
    id: "DP700-091",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Variables de Sistema y Parametrización en Fabric Data Pipelines",
    topicIcon: "pipeline",
    tags: ["Data Pipelines", "System Variables", "Parameters", "Dynamic Content", "RunId"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "@concat('BronzeIngest_', pipeline().parameters.Environment, '_', pipeline().RunId)",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de Fabric Data Factory, necesitas registrar en una tabla de auditoría el identificador único de ejecución de la canalización (`RunId`), el nombre de la canalización y la marca de tiempo de inicio de la ejecución. ¿Cómo se accede a estas propiedades del sistema dentro del generador de expresiones de contenido dinámico?",
    options: [
      {
        id: "opt_1",
        "text": "Mediante las variables del sistema de canalización: @pipeline().RunId, @pipeline().Pipeline, @pipeline().TriggerTime.",
        "isCorrect": true,
        "rationale": "Fabric Data Factory dispone de variables del sistema reservadas accesibles mediante el objeto `@pipeline()`, incluyendo `.RunId` (GUID único de la ejecución), `.Pipeline` (nombre de la canalización), `.WorkspaceId` y `.TriggerTime`."
      },
      {
        id: "opt_2",
        "text": "Leyendo la hora del reloj analógico de la pared de la oficina.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      },
      {
        id: "opt_3",
        "text": "Inventando un número aleatorio con la función RAND() en cada paso.",
        "isCorrect": false,
        "rationale": "No permite correlacionar la ejecución con los registros de auditoría de Fabric."
      },
      {
        id: "opt_4",
        "text": "Las canalizaciones de Fabric no tienen identificadores de ejecución.",
        "isCorrect": false,
        "rationale": "Cada ejecución de canalización tiene un RunId unívoco para trazabilidad y monitorización."
      }
    ],
    "explanation": "El objeto `@pipeline()` en el lenguaje de expresiones de Data Factory expone variables de sistema críticas como `.RunId`, `.Pipeline` y `.TriggerTime` para parametrización y auditoría.",
    "theoryPill": {
      "title": "Variables del Sistema y Expresiones Dinámicas en Data Factory",
      "summary": "Metadatos de ejecución y control de canalizaciones.",
      "keyPoints": [
        "@pipeline().RunId: Identificador GUID de la ejecución activa (crucial para telemetría y particionado).",
        "@pipeline().Pipeline: Nombre asignado a la canalización.",
        "@pipeline().parameters.NombreParametro: Acceso a parámetros personalizados definidos por el desarrollador.",
        "Funciones de cadena y fecha: `@concat()`, `@formatDateTime()`, `@utcNow()`, `@coalesce()`."
      ],
      "examTrap": "Para asociar un lote cargado a su ejecución de canalización exacta en tablas de auditoría, utiliza `@pipeline().RunId`.",
      "searchQuery": "System variables in Fabric and Azure Data Factory pipelines DP-700"
    },
    "references": [
      {
        "title": "System variables in Azure and Fabric Data Factory | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/pipeline-parameters"
      }
    ]
  },
  {
    id: "DP700-092",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Linaje de Datos Automatizado con Microsoft Purview en Fabric",
    topicIcon: "security",
    tags: ["Microsoft Purview", "Lineage", "Governance", "End-to-End", "OneLake"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un oficial de cumplimiento de datos necesita auditar el recorrido completo de los datos financieros: desde el archivo fuente original en Azure Data Lake Storage Gen2, pasando por la canalización de Fabric Data Factory, la tabla Delta en el Lakehouse, la transformación en el Fabric Warehouse, hasta el modelo semántico de Power BI y el informe ejecutivo final. ¿Cómo captura y visualiza Microsoft Fabric este recorrido de extremo a extremo sin necesidad de escribir código de instrumentación manual?",
    options: [
      {
        id: "opt_1",
        "text": "Mediante la integración nativa y automática de linaje de datos de Microsoft Purview en Microsoft Fabric (vista de linaje / Lineage view).",
        "isCorrect": true,
        "rationale": "Microsoft Fabric cuenta con integración profunda e integrada con Microsoft Purview. El linaje de datos de extremo a extremo se captura automáticamente a medida que los artefactos se ejecutan y se puede visualizar de forma gráfica en la 'Vista de linaje' (Lineage view) del área de trabajo o en el portal de gobernanza de Microsoft Purview."
      },
      {
        id: "opt_2",
        "text": "Dibujando el diagrama a mano en una libreta de papel.",
        "isCorrect": false,
        "rationale": "No es una solución de auditoría automatizada corporativa en tiempo real."
      },
      {
        id: "opt_3",
        "text": "Enviando correos electrónicos a todos los empleados preguntándoles de dónde sacaron sus datos.",
        "isCorrect": false,
        "rationale": "Proceso manual propenso a errores y omisiones."
      },
      {
        id: "opt_4",
        "text": "El linaje de datos solo está disponible si se instala Oracle Database.",
        "isCorrect": false,
        "rationale": "Purview y Fabric son soluciones nativas de Microsoft que no dependen de productos de terceros."
      }
    ],
    "explanation": "La vista de linaje (Lineage View) en Fabric, potenciada por Microsoft Purview, mapea automáticamente las relaciones de datos entre orígenes, canalizaciones, Lakehouses, Warehouses, modelos e informes.",
    "theoryPill": {
      "title": "Linaje de Datos Automatizado con Microsoft Purview en Fabric",
      "summary": "Trazabilidad completa de activos analíticos desde la ingesta hasta el consumo.",
      "keyPoints": [
        "Lineage View en el área de trabajo: Permite alternar entre la vista de lista y la vista de grafo de linaje de dependencias.",
        "Análisis de impacto (Impact analysis): Permite ver qué informes downstream se verían afectados antes de modificar o eliminar una tabla o modelo semántico.",
        "Purview Data Map: Sincroniza metadatos de Fabric con el catálogo empresarial unificado de la organización.",
        "Sin código: No requiere configurar agentes ni scripts; se genera automáticamente con la telemetría de la capacidad."
      ],
      "examTrap": "Para comprobar el impacto en informes de negocio antes de modificar una tabla Delta en un Lakehouse, utiliza la 'Vista de linaje' (Lineage view).",
      "searchQuery": "Data lineage in Microsoft Fabric Microsoft Purview DP-700"
    },
    "references": [
      {
        "title": "Data lineage in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/governance/lineage"
      }
    ]
  },
  {
    id: "DP700-093",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Validaciones y Calidad de Datos en Arquitectura Medallion",
    topicIcon: "spark",
    tags: ["Data Quality", "Medallion", "Bronze", "Silver", "Constraints", "PySpark"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Restricción de comprobación en Delta Lake:\nALTER TABLE SilverOrders \nADD CONSTRAINT chk_PositiveAmount CHECK (Amount > 0);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una arquitectura Medallion de Fabric, necesitas asegurar que las filas no válidas (como registros con importes negativos o correos electrónicos sin arroba) no pasen de la capa Bronze a la capa Silver, y deseas que cualquier transacción que intente escribir una fila que viole una regla de integridad empresarial falle inmediatamente a nivel de motor de almacenamiento. ¿Qué característica nativa de Delta Lake debes aplicar?",
    options: [
      {
        id: "opt_1",
        "text": "Restricciones de comprobación de Delta Lake (Delta Lake CHECK Constraints) mediante instrucciones ALTER TABLE ... ADD CONSTRAINT.",
        "isCorrect": true,
        "rationale": "Delta Lake admite restricciones de integridad empresarial estándar mediante sentencias `ALTER TABLE ... ADD CONSTRAINT nombre CHECK (condicion)`. El motor transaccional verifica estas condiciones antes de confirmar cualquier escritura (INSERT/UPDATE/MERGE) y rechaza la transacción completa si alguna fila viola la regla."
      },
      {
        id: "opt_2",
        "text": "Eliminar la capa Silver y usar únicamente la capa Bronze sin limpiar.",
        "isCorrect": false,
        "rationale": "La capa Bronze contiene datos crudos sin depurar; eliminar Silver arruinaría la calidad de los datos corporativos."
      },
      {
        id: "opt_3",
        "text": "Escribir un aviso en la pared de la oficina pidiendo que no envíen importes negativos.",
        "isCorrect": false,
        "rationale": "No garantiza el control programático de calidad de datos en el lago."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar las comprobaciones de esquema de Delta Lake.",
        "isCorrect": false,
        "rationale": "Deshabilitar comprobaciones empeoraría la entrada de datos corruptos."
      }
    ],
    "explanation": "Las restricciones CHECK en Delta Lake imponen reglas de calidad de datos a nivel de tabla, rechazando automáticamente cualquier transacción que intente insertar datos que violen las condiciones de negocio.",
    "theoryPill": {
      "title": "Calidad de Datos con Restricciones (Constraints) en Delta Lake",
      "summary": "Imposición de reglas de integridad empresarial en la capa Silver.",
      "keyPoints": [
        "NOT NULL: Impone que una columna no contenga valores nulos.",
        "CHECK Constraints: Permite evaluar expresiones booleanas (`Amount > 0`, `length(Phone) >= 9`).",
        "Validación atómica: Si una sola fila del lote viola el CHECK, toda la transacción falla y no se escribe ninguna fila (rollback).",
        "Patrón Medallion: Las filas fallidas en Bronze se desvían habitualmente a una tabla de cuarentena ('Quarantine') para su posterior revisión por el equipo de negocio."
      ],
      "examTrap": "Para bloquear a nivel de almacenamiento Delta la entrada de datos que violen reglas lógicas de negocio, usa 'CHECK Constraints' de Delta Lake.",
      "searchQuery": "Delta Lake constraints check not null Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Delta Lake constraints in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#constraints"
      }
    ]
  },
  {
    id: "DP700-094",
    certification: "DP-700",
    domain: "Ingest and transform data",
    topic: "Activador de Fabric (Fabric Data Activator / Real-Time Alerts)",
    topicIcon: "kql",
    tags: ["Data Activator", "Real-Time Intelligence", "Alerts", "Power Automate", "Teams"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una solución de Real-Time Intelligence de Fabric, los sensores de una cadena de frío emiten la temperatura de las vacunas a un Eventhouse. Necesitas que, si la temperatura de cualquier congelador supera los -20°C durante más de 3 lecturas consecutivas, se envíe de inmediato un mensaje de alerta urgente al canal de operaciones en Microsoft Teams y se dispare un flujo de trabajo de Power Automate para notificar al técnico de guardia. ¿Qué artefacto sin código de Fabric debes utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Activador de Fabric (Fabric Activator / Data Activator).",
        "isCorrect": true,
        "rationale": "Fabric Activator (anteriormente Data Activator) es el motor sin código de detección de patrones y desencadenamiento de acciones en tiempo real de Microsoft Fabric. Monitoriza flujos continuos en Eventstreams, KQL Databases o informes de Power BI, evalúa condiciones de umbral y dispara acciones automáticas (Teams, correo, Power Automate)."
      },
      {
        id: "opt_2",
        "text": "Un clúster de máquinas virtuales en Azure con Windows 95.",
        "isCorrect": false,
        "rationale": "Sistema operativo obsoleto no compatible con Fabric."
      },
      {
        id: "opt_3",
        "text": "Un informe paginado de Power BI impreso una vez al mes.",
        "isCorrect": false,
        "rationale": "Las vacunas se estropearían en minutos; se requiere acción automatizada en tiempo real."
      },
      {
        id: "opt_4",
        "text": "Apagar todos los sensores para que no detecten la subida de temperatura.",
        "isCorrect": false,
        "rationale": "Vulneraría todas las normativas sanitarias y de seguridad."
      }
    ],
    "explanation": "Fabric Activator supervisa datos en tiempo real para detectar condiciones críticas de negocio y desencadenar automáticamente acciones (alertas de Teams, correos o flujos de Power Automate).",
    "theoryPill": {
      "title": "Fabric Activator: Acciones y Alertas Guiadas por Datos",
      "summary": "Motor de eventos y automatización operativa en tiempo real.",
      "keyPoints": [
        "Orígenes de datos: Eventstreams de Fabric, bases de datos KQL en Eventhouses, métricas e informes de Power BI.",
        "Conceptos: Objetos (ej. Congelador), Desencadenadores / Triggers (condición: Temperatura > -20), Acciones.",
        "Acciones integradas: Envío de mensajes adaptativos a Microsoft Teams, envío de correos electrónicos corporativos, llamada a flujos de nube de Power Automate.",
        "Sin código: Experiencia interactiva para usuarios de negocio e ingenieros sin requerir programación de sockets o APIs complejas."
      ],
      "examTrap": "Para disparar alertas automáticas en Microsoft Teams cuando un valor de telemetría supera un umbral crítico en tiempo real, usa Fabric Activator.",
      "searchQuery": "What is Fabric Data Activator Real-Time Intelligence DP-700"
    },
    "references": [
      {
        "title": "What is Data Activator? - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-activator/data-activator-introduction"
      }
    ]
  },
  {
    id: "DP700-095",
    certification: "DP-700",
    domain: "Prepare data",
    topic: "Consultas entre Áreas de Trabajo en Fabric Warehouse (Cross-Workspace Queries)",
    topicIcon: "warehouse",
    tags: ["Cross-Workspace", "Warehouse", "Security", "ReadData", "T-SQL"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "SELECT \n    c.CustomerName,\n    o.OrderTotal\nFROM [FinanceWorkspace].[FinanceWarehouse].[dbo].[Orders] o\nINNER JOIN [SalesWorkspace].[SalesWarehouse].[dbo].[Customers] c\n    ON o.CustomerID = c.CustomerID;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una gran corporación, el equipo de finanzas tiene su propio Warehouse en el área de trabajo 'FinanceWorkspace' y el equipo de ventas tiene el suyo en 'SalesWorkspace'. Un analista de finanzas necesita ejecutar una consulta T-SQL que combine datos de ambos Warehouses situados en áreas de trabajo distintas. ¿Qué permiso pormenorizado a nivel de elemento debe conceder el equipo de ventas al analista de finanzas sobre el Warehouse de ventas para habilitar la consulta sin darle acceso a toda el área de trabajo?",
    options: [
      {
        id: "opt_1",
        "text": "Conceder al analista el permiso de elemento 'ReadData' (junto con 'Read') sobre el Warehouse de ventas específico.",
        "isCorrect": true,
        "rationale": "Para realizar consultas entre diferentes áreas de trabajo (Cross-Workspace Queries) en Fabric Warehouse, el usuario que ejecuta la consulta debe tener permisos de elemento `Read` y `ReadData` sobre el Warehouse de destino en la otra área de trabajo, permitiendo consultar los datos relacionales subyacentes sin necesidad de pertenecer a esa área de trabajo externa."
      },
      {
        id: "opt_2",
        "text": "Conceder al analista el rol de Administrador global en Microsoft 365.",
        "isCorrect": false,
        "rationale": "Viola el principio de mínimo privilegio y otorga permisos destructivos sobre toda la organización."
      },
      {
        id: "opt_3",
        "text": "Descargar el Warehouse a un CD-ROM regrabable y compartirlo físicamente.",
        "isCorrect": false,
        "rationale": "Los CD-ROMs no forman parte de la arquitectura distribuida de OneLake."
      },
      {
        id: "opt_4",
        "text": "Fusionar ambas áreas de trabajo eliminando la separación organizativa de la empresa.",
        "isCorrect": false,
        "rationale": "Destruiría el modelo de gobierno departamental de la corporación."
      }
    ],
    "explanation": "El permiso de elemento `ReadData` permite a los usuarios consultar datos tabulares de un Fabric Warehouse o Lakehouse en consultas que cruzan áreas de trabajo respetando el principio de mínimo privilegio.",
    "theoryPill": {
      "title": "Consultas Entre Áreas de Trabajo (Cross-Workspace) en Fabric",
      "summary": "Acceso seguro a datos relacionales distribuidos en múltiples áreas de trabajo.",
      "keyPoints": [
        "Sintaxis: Se puede referenciar mediante la nomenclatura de tres o cuatro partes si las áreas de trabajo están conectadas.",
        "Permiso ReadData: Permite leer los datos subyacentes en OneLake mediante el motor T-SQL.",
        "Sin pertenencia de área de trabajo: El usuario no necesita ver los notebooks ni artefactos internos de la otra área de trabajo.",
        "Optimización distribuida: El motor SQL de Fabric optimiza la consulta de forma transparente leyendo las tablas Delta de OneLake."
      ],
      "examTrap": "Para consultar tablas de un Warehouse situado en OTRA área de trabajo sin ser miembro de ella, necesitas permiso de elemento 'ReadData'.",
      "searchQuery": "Cross-workspace queries and permissions Microsoft Fabric warehouse DP-700"
    },
    "references": [
      {
        "title": "Query multiple workspaces in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/query-multiple-warehouses"
      }
    ]
  },
  {
    id: "DP700-096",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Motor de Ejecución Nativo de Spark en Fabric (Velox Acceleration)",
    topicIcon: "spark",
    tags: ["Velox", "Native Execution", "C++", "Runtime", "Performance", "Spark"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En las versiones recientes del entorno de ejecución de Apache Spark en Microsoft Fabric (Fabric Runtime 1.3+), se ha introducido el Motor de Ejecución Nativo (Native Execution Engine para Spark). ¿En qué consiste esta aceleración arquitectónica y cómo mejora el rendimiento de los notebooks y trabajos de Spark?",
    options: [
      {
        id: "opt_1",
        "text": "Sustituye el procesamiento tradicional de la máquina virtual Java (JVM) en los operadores del plan físico por un motor vectorizado de alto rendimiento implementado en C++ (basado en Apache Arrow y Velox), reduciendo drásticamente la sobrecarga de CPU y acelerando las transformaciones hasta por 2x o 4x.",
        "isCorrect": true,
        "rationale": "El Native Execution Engine para Apache Spark en Fabric compila y ejecuta los operadores físicos directamente en código máquina nativo en C++ utilizando bibliotecas como Velox y Arrow en lugar de código Java/Scala sobre la JVM. Esto elimina el overhead de recolección de basura (GC) y optimiza las instrucciones vectoriales SIMD de la CPU moderna."
      },
      {
        id: "opt_2",
        "text": "Convierte todas las consultas de PySpark en transacciones de blockchain públicas.",
        "isCorrect": false,
        "rationale": "Fabric Spark no tiene relación con criptomonedas ni blockchains."
      },
      {
        id: "opt_3",
        "text": "Limita los clústeres de Spark a funcionar a una velocidad fija de 10 instrucciones por hora.",
        "isCorrect": false,
        "rationale": "El motor nativo acelera el procesamiento de datos, no lo ralentiza."
      },
      {
        id: "opt_4",
        "text": "Obliga a que todos los notebooks se escriban en lenguaje HTML.",
        "isCorrect": false,
        "rationale": "HTML no es un lenguaje de ingeniería de datos distribuida."
      }
    ],
    "explanation": "El Native Execution Engine de Fabric traslada el cálculo de Spark de la JVM a código C++ nativo vectorizado (Velox/Arrow), optimizando el uso de la CPU y reduciendo los tiempos de ejecución de las consultas de ingeniería de datos.",
    "theoryPill": {
      "title": "Motor de Ejecución Nativo (Native Execution Engine) en Fabric Spark",
      "summary": "Computación vectorizada en C++ para clústeres de Apache Spark.",
      "keyPoints": [
        "Tecnología: Basado en Velox (motor de ejecución de datos en C++) y Apache Arrow en memoria columnar.",
        "Compatibilidad: 100% compatible con las APIs existentes de PySpark y Spark SQL; no requiere reescribir el código de los notebooks.",
        "Ventajas: Reducción drástica del tiempo de CPU, menor consumo de memoria y eliminación de pausas por Garbage Collection (GC).",
        "Configuración: Se puede activar a nivel de entorno o mediante propiedades de configuración de Spark (`spark.native.enabled`)."
      ],
      "examTrap": "El Native Execution Engine acelera Spark ejecutando los operadores físicos en C++ nativo vectorizado en lugar de en la JVM.",
      "searchQuery": "Native execution engine for Apache Spark Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Native execution engine for Apache Spark in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/native-execution-engine-overview"
      }
    ]
  },
  {
    id: "DP700-097",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Recuperación ante Desastres y Replicación Geográfica de OneLake (Disaster Recovery)",
    topicIcon: "onelake",
    tags: ["Disaster Recovery", "Geo-replication", "OneLake", "Business Continuity", "Failover"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una corporación multinacional sujeta a estrictas regulaciones gubernamentales requiere un plan de recuperación ante desastres (Disaster Recovery - DR) para su plataforma de datos en Fabric. En caso de una catástrofe regional prolongada en la región primaria de Azure (ej. Europa del Norte), necesitan poder conmutar la capacidad y el almacenamiento de OneLake a una región secundaria emparejada (ej. Europa Occidental) para restaurar las operaciones analíticas con un objetivo de tiempo de recuperación (RTO) acotado. ¿Qué capacidad de continuidad empresarial debe habilitar el administrador del inquilino?",
    options: [
      {
        id: "opt_1",
        "text": "Habilitar la recuperación ante desastres de la capacidad de Fabric (Fabric Capacity Disaster Recovery) y la replicación geográfica de datos en OneLake (OneLake Geo-Replication).",
        "isCorrect": true,
        "rationale": "Fabric ofrece capacidades de recuperación ante desastres (DR) a nivel de capacidad y replicación geográfica continua de los datos de OneLake hacia una región secundaria emparejada de Azure. En caso de fallo total de la región primaria, permite realizar una conmutación por error (failover) transparente hacia la región secundaria."
      },
      {
        id: "opt_2",
        "text": "Copiar los datos en un disco duro externo y viajar en coche a la otra región.",
        "isCorrect": false,
        "rationale": "No es una solución automatizada de alta disponibilidad empresarial en la nube."
      },
      {
        id: "opt_3",
        "text": "Desactivar todas las copias de seguridad para ahorrar costes.",
        "isCorrect": false,
        "rationale": "Viola todas las directivas de continuidad del negocio y auditoría regulatoria."
      },
      {
        id: "opt_4",
        "text": "Cambiar el nombre del área de trabajo a 'Backup'.",
        "isCorrect": false,
        "rationale": "Cambiar el nombre no crea redundancia geográfica en el almacenamiento de OneLake."
      }
    ],
    "explanation": "Fabric Capacity Disaster Recovery y OneLake Geo-Replication proporcionan continuidad empresarial replicando automáticamente los datos de OneLake y las configuraciones de capacidad hacia una región geográfica secundaria emparejada.",
    "theoryPill": {
      "title": "Recuperación ante Desastres (Disaster Recovery) en Microsoft Fabric",
      "summary": "Resiliencia regional y continuidad de negocio en OneLake y capacidades.",
      "keyPoints": [
        "Replicación geográfica de OneLake: Los datos de las tablas Delta y archivos se replican asíncronamente en una región emparejada de Azure.",
        "Conmutación por error (Failover): Si la región primaria sufre una interrupción catastrófica prolongada, se activa el failover de la capacidad a la región secundaria.",
        "RTO y RPO: Define los objetivos de tiempo de recuperación y punto de recuperación admitidos por la organización.",
        "Configuración del inquilino: Se administra en el portal de administración de Fabric a nivel de capacidad."
      ],
      "examTrap": "Para proteger el patrimonio de datos de OneLake contra catástrofes regionales completas, se configura 'OneLake Geo-Replication' y 'Capacity Disaster Recovery'.",
      "searchQuery": "Business continuity and disaster recovery in Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Business continuity and disaster recovery in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/enterprise/disaster-recovery"
      }
    ]
  },
  {
    id: "DP700-098",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Enmascaramiento Dinámico de Datos (DDM) y Seguridad de Nivel de Columna (CLS) en Fabric Warehouse",
    topicIcon: "warehouse",
    tags: ["DDM", "CLS", "Dynamic Data Masking", "Security", "Warehouse", "Compliance"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Enmascaramiento de datos personales en Fabric Warehouse:\nALTER TABLE dbo.Customers \nALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');\n\nALTER TABLE dbo.Customers \nALTER COLUMN CreditCardNumber ADD MASKED WITH (FUNCTION = 'partial(0, \"XXXX-XXXX-XXXX-\", 4)');",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse que almacena datos de clientes, necesitas que los analistas de soporte técnico puedan consultar la tabla 'Customers' para verificar incidencias, pero sin que puedan ver los números de tarjeta de crédito completos ni las direcciones de correo electrónico personales reales. Los datos deben almacenarse cifrados y completos en OneLake, pero mostrarse enmascarados (ej. 'XXXX-XXXX-XXXX-1234' o 'aXXX@XXXX.com') en los resultados de consulta de los usuarios no privilegiados. ¿Qué característica de seguridad relacional de T-SQL debes aplicar?",
    options: [
      {
        id: "opt_1",
        "text": "Enmascaramiento dinámico de datos (Dynamic Data Masking - DDM).",
        "isCorrect": true,
        "rationale": "Dynamic Data Masking (DDM) en Fabric Warehouse permite limitar la exposición de datos confidenciales enmascarándolos sobre la marcha en los resultados de las consultas T-SQL para usuarios no autorizados, sin modificar los datos subyacentes almacenados en OneLake ni romper el código de las aplicaciones."
      },
      {
        id: "opt_2",
        "text": "Borrar permanentemente las tarjetas de crédito de la base de datos.",
        "isCorrect": false,
        "rationale": "Borrar los datos impediría procesar pagos y cobrar a los clientes."
      },
      {
        id: "opt_3",
        "text": "Pintar la pantalla del analista con un rotulador permanente negro.",
        "isCorrect": false,
        "rationale": "Respuesta no técnica."
      },
      {
        id: "opt_4",
        "text": "Cambiar el tipo de datos de la columna a tipo Imagen.",
        "isCorrect": false,
        "rationale": "No enmascara dinámicamente los datos en T-SQL y corrompe los tipos de datos."
      }
    ],
    "explanation": "Dynamic Data Masking (DDM) en Fabric Warehouse enmascara dinámicamente campos sensibles (tarjetas, emails, saldos) en los resultados de consultas T-SQL para usuarios sin el permiso UNMASK.",
    "theoryPill": {
      "title": "Enmascaramiento Dinámico de Datos (DDM) en Fabric Warehouse",
      "summary": "Protección de datos confidenciales en tiempo de consulta sin alterar el almacenamiento.",
      "keyPoints": [
        "Funciones de máscara integradas: `default()`, `email()`, `partial(prefijo, 'relleno', sufijo)`, `random(min, max)`.",
        "Permisos: Los usuarios con permiso `UNMASK` ven los datos reales sin enmascarar; los usuarios estándar ven la máscara.",
        "Almacenamiento intacto: Los datos se conservan 100% completos en los archivos Delta de OneLake.",
        "Seguridad de nivel de columna (CLS): Complementariamente, CLS (`GRANT/DENY SELECT ON ... (columna)`) restringe totalmente el acceso a columnas específicas."
      ],
      "examTrap": "Para ocultar parcialmente tarjetas de crédito o correos en resultados de consultas T-SQL sin modificar los datos guardados en OneLake, usa 'Dynamic Data Masking' (DDM).",
      "searchQuery": "Dynamic Data Masking in Microsoft Fabric Warehouse DDM DP-700"
    },
    "references": [
      {
        "title": "Dynamic data masking in Microsoft Fabric Warehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/dynamic-data-masking"
      }
    ]
  },
  {
    id: "DP700-099",
    certification: "DP-700",
    domain: "Implement and manage an analytics solution",
    topic: "Puntos de Conexión Privados Administrados de OneLake (Managed Private Endpoints)",
    topicIcon: "security",
    tags: ["Managed Private Endpoints", "VNet", "Security", "Private Link", "OneLake"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una entidad gubernamental que utiliza Microsoft Fabric tiene una cuenta de Azure Data Lake Storage Gen2 y una base de datos Azure SQL que contienen información de seguridad nacional. La política de ciberseguridad prohíbe terminantemente que el tráfico de red salga a la internet pública o pase por direcciones IP públicas, requiriendo que todas las conexiones entre Fabric y estos orígenes viajen exclusivamente a través de la red troncal privada de Microsoft mediante enlaces privados. ¿Qué funcionalidad de red administrada de Fabric se debe implementar?",
    options: [
      {
        id: "opt_1",
        "text": "Puntos de conexión privados administrados de Fabric (Managed Private Endpoints) dentro de la red virtual administrada del área de trabajo.",
        "isCorrect": true,
        "rationale": "Los Managed Private Endpoints de Microsoft Fabric permiten que cargas de trabajo como Spark Notebooks y Data Pipelines se conecten de forma segura y privada a orígenes de datos de Azure (ADLS Gen2, Azure SQL, Key Vault) a través de Azure Private Link sin exponer el tráfico a internet y sin requerir administrar puertas de enlace locales complejas."
      },
      {
        id: "opt_2",
        "text": "Abrir el cortafuegos de Azure SQL a todas las direcciones IP de internet (0.0.0.0/0).",
        "isCorrect": false,
        "rationale": "Vulnera radicalmente la política de ciberseguridad corporativa."
      },
      {
        id: "opt_3",
        "text": "Enviar los datos mediante mensajes SMS.",
        "isCorrect": false,
        "rationale": "No es una solución de red analítica empresarial."
      },
      {
        id: "opt_4",
        "text": "Desinstalar el cifrado TLS en todos los servidores.",
        "isCorrect": false,
        "rationale": "Comprometería la seguridad de todas las comunicaciones."
      }
    ],
    "explanation": "Los Managed Private Endpoints de Microsoft Fabric garantizan una comunicación 100% privada a través de la red troncal de Azure con orígenes de datos protegidos por cortafuegos mediante Azure Private Link.",
    "theoryPill": {
      "title": "Puntos de Conexión Privados Administrados en Microsoft Fabric",
      "summary": "Conectividad privada de extremo a extremo sin exposición a internet.",
      "keyPoints": [
        "Managed VNet: Fabric aprovisiona una red virtual aislada para el área de trabajo.",
        "Managed Private Endpoint: Interfaz de red privada virtual en Fabric que se conecta a un recurso de destino en Azure.",
        "Aprobación: Requiere que el propietario del recurso de destino en Azure apruebe la solicitud de conexión en Azure Portal.",
        "Orígenes admitidos: Azure Storage (Blob/ADLS Gen2), Azure SQL Database, Azure Synapse, Azure Key Vault, Azure Cosmos DB."
      ],
      "examTrap": "Para conectar Fabric a orígenes de Azure cerrados al tráfico público sin usar internet, crea un 'Managed Private Endpoint' en el área de trabajo de Fabric.",
      "searchQuery": "Overview of managed private endpoints in Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Overview of managed private endpoints in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/security/security-managed-private-endpoints-overview"
      }
    ]
  },
  {
    id: "DP700-100",
    certification: "DP-700",
    domain: "Monitor and optimize an analytics solution",
    topic: "Compactación y Tamaño Óptimo de Archivos en Delta Lake (OPTIMIZE & Compaction)",
    topicIcon: "lakehouse",
    tags: ["Delta Lake", "OPTIMIZE", "File Compaction", "Small Files", "Performance"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "-- Compactación periódica de archivos Delta:\nOPTIMIZE lakehouse.FactTelemetry;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Lakehouse que recibe ingestas continuas mediante streaming cada 5 minutos, la tabla 'FactTelemetry' ha acumulado más de 250.000 archivos Parquet individuales de menos de 2 megabytes cada uno. Las consultas analíticas en Spark y el SQL Analytics Endpoint se han vuelto extremadamente lentas debido a la sobrecarga de listar y abrir cientos de miles de archivos pequeños (el problema de los 'archivos pequeños'). ¿Cuál es el tamaño de archivo Parquet objetivo recomendado por las directrices de Delta Lake y qué comando se debe ejecutar para compactar estos archivos pequeños?",
    options: [
      {
        id: "opt_1",
        "text": "El tamaño de archivo objetivo recomendado es de entre 128 MB y 1 GB por archivo Parquet, y se compactan ejecutando el comando OPTIMIZE de Delta Lake.",
        "isCorrect": true,
        "rationale": "El comando `OPTIMIZE` en Delta Lake agrupa y reescribe los archivos pequeños en archivos consolidados más grandes cuyo tamaño objetivo ideal oscila entre 128 MB y 1 GB (o el objetivo configurable en Fabric). Esto optimiza la lectura en bloques paralelos, reduce drásticamente las llamadas a metadatos en OneLake y acelera las consultas analíticas."
      },
      {
        id: "opt_2",
        "text": "El tamaño recomendado es de exactamente 1 kilobyte y se compactan con un comando ZIP.",
        "isCorrect": false,
        "rationale": "Archivos de 1 KB multiplican el problema de archivos pequeños y degradan gravemente el almacenamiento."
      },
      {
        id: "opt_3",
        "text": "El tamaño recomendado es de 100 terabytes en un único archivo.",
        "isCorrect": false,
        "rationale": "Un archivo gigantesco de 100 TB elimina todo paralelismo entre núcleos de Spark."
      },
      {
        id: "opt_4",
        "text": "No se debe realizar ninguna compactación porque los archivos pequeños son más rápidos de leer.",
        "isCorrect": false,
        "rationale": "El problema de 'small files' es uno de los problemas de rendimiento más conocidos en sistemas de almacenamiento distribuido."
      }
    ],
    "explanation": "El comando `OPTIMIZE` de Delta Lake consolida miles de archivos pequeños de micro-lotes en archivos Parquet óptimos de 128 MB a 1 GB, acelerando significativamente las consultas analíticas en Fabric.",
    "theoryPill": {
      "title": "Compactación de Archivos con OPTIMIZE en Delta Lake",
      "summary": "Resolución del problema de archivos pequeños (Small File Problem).",
      "keyPoints": [
        "Problema de archivos pequeños: Ingestas frecuentes generan miles de archivos Parquet de pocos KBs/MBs. Cada archivo requiere llamadas de metadatos independientes en OneLake.",
        "Comando OPTIMIZE: Lee los archivos pequeños y los fusiona en archivos compactados más grandes.",
        "Tamaño objetivo: 128 MB a 1 GB (balance perfecto entre paralelismo en clúster y lectura secuencial masiva).",
        "Automatización en Fabric: Las tablas de Fabric admiten optimización automática en segundo plano (Auto-compaction y V-Order automático)."
      ],
      "examTrap": "Para compactar miles de archivos pequeños de streaming en archivos óptimos de 128MB-1GB, el comando de Delta Lake es `OPTIMIZE`.",
      "searchQuery": "Delta Lake OPTIMIZE file compaction Microsoft Fabric DP-700"
    },
    "references": [
      {
        "title": "Delta Lake table optimization in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-delta-lake#table-optimization"
      }
    ]
  }
];

console.log(`Prepared second batch of ${dp700QuestionsPart2.length} questions for DP-700.`);
