/**
 * scripts/build-expansion-dp600-part3.js
 * Final 20 Questions for DP-600 (DP600-081 to DP600-100)
 */

export const dp600QuestionsPart3 = [
  {
    id: "DP600-081",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Integración de Git en Áreas de Trabajo de Fabric",
    topicIcon: "fabric",
    tags: ["Git", "DevOps", "Workspace", "Version Control", "Branches"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un equipo de análisis conecta un área de trabajo de Microsoft Fabric a una rama de desarrollo de Azure DevOps Git. Un ingeniero modifica un modelo semántico directamente en la interfaz web de Fabric y desea enviar los cambios al repositorio de Git. En el panel de control de código fuente del área de trabajo, ¿qué estado indica que existen modificaciones en Fabric que aún no se han confirmado (committed) en el repositorio remoto?",
    options: [
      {
        id: "opt_1",
        "text": "El elemento aparece con el estado 'No confirmado' (Uncommitted) en el panel de control de código fuente.",
        "isCorrect": true,
        "rationale": "En la integración de Git en Fabric, los elementos modificados en el área de trabajo que difieren del repositorio remoto se marcan como 'Uncommitted' (No confirmados). El usuario debe seleccionarlos e introducir un mensaje de confirmación para hacer commit/push hacia Git."
      },
      {
        id: "opt_2",
        "text": "El área de trabajo se bloquea y se elimina automáticamente.",
        "isCorrect": false,
        "rationale": "Fabric nunca elimina un área de trabajo por detectar cambios locales pendientes."
      },
      {
        id: "opt_3",
        "text": "Todos los informes de Power BI se imprimen automáticamente en papel.",
        "isCorrect": false,
        "rationale": "No existe ninguna acción de impresión automática en la integración de Git."
      },
      {
        id: "opt_4",
        "text": "El estado cambia a 'Archivado en disquete'.",
        "isCorrect": false,
        "rationale": "Los disquetes son un medio obsoleto que no forma parte de la arquitectura moderna de Fabric."
      }
    ],
    "explanation": "En Fabric Git Integration, los cambios realizados en el área de trabajo aparecen como 'Uncommitted' hasta que el desarrollador confirma los cambios mediante un commit que actualiza la rama de Azure DevOps o GitHub.",
    "theoryPill": {
      "title": "Integración de Git en Microsoft Fabric",
      "summary": "Control de versiones nativo para áreas de trabajo y artefactos analíticos.",
      "keyPoints": [
        "Proveedores admitidos: Azure DevOps Repos y GitHub.",
        "Estados en el panel Git: Sincronizado (Synced), No confirmado (Uncommitted - cambios en el área de trabajo), Actualizaciones disponibles (Updates available - cambios en la rama remota), Conflicto (Conflict).",
        "Elementos compatibles: Modelos semánticos, Informes de Power BI, Notebooks, Lakehouses, Warehouses y Data Pipelines.",
        "Flujo de trabajo: Desarrollo en rama de características -> Pull Request -> Fusión a rama principal -> Despliegue en área de trabajo de producción."
      ],
      "examTrap": "Un cambio en el área de trabajo de Fabric no se sincroniza con Git automáticamente; requiere una acción explícita de confirmación ('Commit') en el panel Source Control.",
      "searchQuery": "Git integration in Microsoft Fabric source control DP-600"
    },
    "references": [
      {
        "title": "Overview of Fabric Git integration | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/cicd/git-integration/overview"
      }
    ]
  },
  {
    id: "DP600-082",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Canalizaciones de Implementación de Fabric (Deployment Pipelines)",
    topicIcon: "fabric",
    tags: ["Deployment Pipelines", "CI/CD", "Dev/Test/Prod", "Deployment Rules"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una canalización de implementación (Deployment Pipeline) de Microsoft Fabric con tres fases (Desarrollo, Pruebas y Producción), necesitas que un modelo semántico en la fase de 'Pruebas' se conecte automáticamente al servidor de base de datos de pruebas (sql-test.database.windows.net), en lugar de continuar conectado al servidor de desarrollo (sql-dev.database.windows.net). ¿Qué característica de la canalización de implementación debes configurar?",
    options: [
      {
        id: "opt_1",
        "text": "Reglas de implementación (Deployment Rules) para orígenes de datos o parámetros en la fase de destino.",
        "isCorrect": true,
        "rationale": "Las reglas de implementación permiten sustituir automáticamente los nombres de servidor, base de datos o parámetros de Power Query al promover artefactos entre fases (Dev -> Test -> Prod) sin editar manualmente el modelo en cada fase."
      },
      {
        id: "opt_2",
        "text": "Editar manualmente el código M del modelo semántico en producción cada vez que se despliegue.",
        "isCorrect": false,
        "rationale": "Editar manualmente el modelo en producción viola las mejores prácticas de CI/CD y provoca inconsistencias de versiones."
      },
      {
        id: "opt_3",
        "text": "Crear una regla de formato condicional en Power BI Desktop.",
        "isCorrect": false,
        "rationale": "El formato condicional cambia colores en gráficos, no conexiones de base de datos."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar el cortafuegos de Windows del administrador.",
        "isCorrect": false,
        "rationale": "No tiene relación con las reglas de parametrización de canalizaciones de Fabric."
      }
    ],
    "explanation": "Las reglas de implementación (Deployment Rules) en Fabric Deployment Pipelines sustituyen dinámicamente orígenes de datos o valores de parámetros al mover artefactos entre etapas de desarrollo, prueba y producción.",
    "theoryPill": {
      "title": "Reglas de Implementación en Fabric Deployment Pipelines",
      "summary": "Automatización de cambios de entorno (Dev, Test, Prod) sin tocar código.",
      "keyPoints": [
        "Tipos de reglas: Reglas de origen de datos (Data source rules) y Reglas de parámetros (Parameter rules).",
        "Reglas de parámetros: La mejor práctica recomendada es utilizar parámetros de Power Query (ej. ServerName, DBName) y aplicar una regla para cambiar el valor según la fase.",
        "Comparación de fases: El pipeline resalta visualmente si hay diferencias entre fases (verde = sincronizado, naranja = diferencias detectadas).",
        "Compatibilidad: Funciona con informes, modelos semánticos, Dataflows, Notebooks y Lakehouses."
      ],
      "examTrap": "Para conectar automáticamente a diferentes bases de datos al promover entre fases, se configuran 'Deployment Rules' (Reglas de implementación).",
      "searchQuery": "Fabric deployment pipelines deployment rules DP-600"
    },
    "references": [
      {
        "title": "Create deployment rules in Fabric deployment pipelines | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/create-rules"
      }
    ]
  },
  {
    id: "DP600-083",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Accesos Directos de OneLake (OneLake Shortcuts)",
    topicIcon: "onelake",
    tags: ["OneLake", "Shortcuts", "Amazon S3", "ADLS Gen2", "Zero-Copy"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una multinacional tiene 50 terabytes de archivos Delta Parquet históricos en un bucket de Amazon Web Services (AWS S3) y en cuentas externas de Azure Data Lake Storage Gen2. Los ingenieros de datos de Microsoft Fabric necesitan consultar y combinar estos datos con las tablas del Lakehouse corporativo de Fabric sin duplicar el almacenamiento, sin incurrir en costes continuos de transferencia de salida (egress) por duplicación masiva y sin escribir canalizaciones ETL. ¿Qué característica de OneLake deben utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Accesos directos de OneLake (OneLake Shortcuts).",
        "isCorrect": true,
        "rationale": "Los accesos directos (Shortcuts) de OneLake son objetos incrustados que apuntan a ubicaciones de almacenamiento existentes (ADLS Gen2, AWS S3, Google Cloud Storage, Dataverse u otros Lakehouses de Fabric). Permiten consultar los datos directamente in-situ sin moverlos ni duplicarlos."
      },
      {
        id: "opt_2",
        "text": "Descargar los 50 TB por FTP a una máquina virtual local y volver a subirlos.",
        "isCorrect": false,
        "rationale": "Es una aproximación ineficiente, propensa a fallos y extremadamente lenta que multiplica costes."
      },
      {
        id: "opt_3",
        "text": "Crear un archivo .ZIP de 50 TB en OneDrive Personal.",
        "isCorrect": false,
        "rationale": "OneDrive Personal no admite archivos de 50 TB ni sirve como motor analítico corporativo."
      },
      {
        id: "opt_4",
        "text": "Desactivar OneLake en la configuración del inquilino.",
        "isCorrect": false,
        "rationale": "Desactivar OneLake inutilizaría todo el entorno de Fabric."
      }
    ],
    "explanation": "OneLake Shortcuts permite virtualizar datos de Azure Storage, AWS S3 y Dataverse dentro de un Lakehouse o Warehouse de Fabric sin duplicación física de almacenamiento.",
    "theoryPill": {
      "title": "Accesos Directos de OneLake (OneLake Shortcuts)",
      "summary": "Virtualización de almacenamiento multicloud sin copias de datos.",
      "keyPoints": [
        "Orígenes admitidos: ADLS Gen2, Azure Blob, AWS S3, Google Cloud Storage, Microsoft Dataverse y ubicaciones internas de OneLake.",
        "Ubicación en Lakehouse: Se pueden crear en 'Tables' (si los datos son Delta Parquet) o en 'Files' (para cualquier formato de archivo).",
        "Sin duplicación: Los motores analíticos (Spark, SQL Endpoint, Direct Lake) leen directamente los datos del origen remoto a través del shortcut.",
        "Seguridad: Utiliza conexiones configuradas con credenciales delegadas, entidades de servicio o claves de acceso de AWS IAM."
      ],
      "examTrap": "Para consultar datos en AWS S3 o ADLS Gen2 SIN mover ni copiar los datos en OneLake, la respuesta es siempre OneLake Shortcuts.",
      "searchQuery": "OneLake shortcuts overview Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "OneLake shortcuts - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts"
      }
    ]
  },
  {
    id: "DP600-084",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Optimización V-Order en Delta Lake de Microsoft Fabric",
    topicIcon: "onelake",
    tags: ["Delta Lake", "V-Order", "Parquet", "Performance", "Direct Lake"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Cuál es el propósito y el beneficio principal de la optimización V-Order aplicada a los archivos Parquet en Microsoft Fabric?",
    options: [
      {
        id: "opt_1",
        "text": "Aplica una ordenación especial y codificaciones optimizadas en tiempo de escritura dentro del formato Parquet que aceleran significativamente los tiempos de lectura para Power BI (Direct Lake e Import) y motores SQL.",
        "isCorrect": true,
        "rationale": "V-Order es una optimización del formato Parquet desarrollada por Microsoft para Fabric. Aplica ordenación y compresión avanzadas en el momento de escritura para optimizar al máximo las lecturas columnares de Power BI Direct Lake y el motor SQL de Fabric, manteniendo un 100% de compatibilidad con el estándar abierto de Parquet."
      },
      {
        id: "opt_2",
        "text": "Convierte los archivos Parquet en documentos HTML navegables por internet.",
        "isCorrect": false,
        "rationale": "V-Order es una optimización interna de almacenamiento columnar, no un convertidor HTML."
      },
      {
        id: "opt_3",
        "text": "Impide que los ingenieros de Spark puedan leer los archivos Parquet.",
        "isCorrect": false,
        "rationale": "Los archivos con V-Order siguen siendo Parquet 100% compatibles y cualquier motor Spark de código abierto puede leerlos."
      },
      {
        id: "opt_4",
        "text": "Borra automáticamente las tablas después de 24 horas de inactividad.",
        "isCorrect": false,
        "rationale": "V-Order no elimina datos ni gestiona ciclos de vida de retención."
      }
    ],
    "explanation": "V-Order es una tecnología de optimización de escritura de Parquet en Fabric que maximiza la velocidad de lectura columnar en Power BI Direct Lake y el motor SQL sin romper la compatibilidad con el formato Parquet abierto.",
    "theoryPill": {
      "title": "Optimización V-Order en Microsoft Fabric",
      "summary": "Compresión y ordenación para acelerar consultas analíticas sobre Delta Lake.",
      "keyPoints": [
        "100% compatible con código abierto: Cualquier lector de Parquet estándar puede leer un archivo optimizado con V-Order.",
        "Escritura en Fabric: Los motores Spark y Dataflows Gen2 de Fabric escriben con V-Order activado de forma predeterminada.",
        "Beneficiarios directos: Modelos semánticos en modo Direct Lake (carga hasta 10 veces más rápida en memoria) y el SQL Analytics Endpoint.",
        "Comando OPTIMIZE: En Spark se puede ejecutar `OPTIMIZE tabla VORDER` para aplicar la optimización a datos existentes."
      ],
      "examTrap": "V-Order añade una pequeña sobrecarga en el momento de la ESCRITURA para conseguir lecturas drásticamente más rápidas en Power BI Direct Lake.",
      "searchQuery": "Delta Lake table optimization and V-Order Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Delta Lake table optimization and V-Order | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimization-and-v-order"
      }
    ]
  },
  {
    id: "DP600-085",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Fabric Warehouse T-SQL: CTAS (CREATE TABLE AS SELECT)",
    topicIcon: "warehouse",
    tags: ["Warehouse", "T-SQL", "CTAS", "Delta", "ETL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "CREATE TABLE dbo.AggregatedSales\nAS\nSELECT \n    CustomerKey,\n    YEAR(OrderDate) AS OrderYear,\n    SUM(TotalAmount) AS TotalSales\nFROM dbo.RawOrders\nGROUP BY CustomerKey, YEAR(OrderDate);",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse, necesitas crear una nueva tabla que consolide y agregue datos de una tabla existente de 50 millones de filas. Deseas crear la tabla de destino y cargar los datos agregados en una única operación transaccional de alto rendimiento optimizada para el motor columnar, minimizando el registro de transacciones. ¿Qué instrucción T-SQL es la más eficiente?",
    options: [
      {
        id: "opt_1",
        "text": "CREATE TABLE AS SELECT (CTAS).",
        "isCorrect": true,
        "rationale": "CTAS es la instrucción T-SQL por excelencia en almacenes de datos analíticos como Fabric Warehouse. Crea la tabla y escribe los datos en paralelo directamente en archivos Delta Parquet con registro mínimo, siendo mucho más rápida que un CREATE TABLE seguido de un INSERT INTO masivo."
      },
      {
        id: "opt_2",
        "text": "Un bucle WHILE en T-SQL que inserte una fila a la vez con INSERT INTO.",
        "isCorrect": false,
        "rationale": "Insertar fila por fila en un almacén columnar es la operación más lenta e ineficiente imaginable, pudiendo tardar días."
      },
      {
        id: "opt_3",
        "text": "DROP DATABASE seguido de CREATE DATABASE.",
        "isCorrect": false,
        "rationale": "Destruiría todo el Warehouse borrando todos los artefactos existentes."
      },
      {
        id: "opt_4",
        "text": "SELECT * INTO con cursores dinámicos en SQL Server 2000.",
        "isCorrect": false,
        "rationale": "En almacenes de datos distribuidos modernos, la instrucción nativa recomendada y optimizada es CTAS."
      }
    ],
    "explanation": "CREATE TABLE AS SELECT (CTAS) es la operación T-SQL óptima en Fabric Warehouse para crear una tabla y poblarla con el resultado de una consulta en una sola operación columnar masiva.",
    "theoryPill": {
      "title": "CTAS (CREATE TABLE AS SELECT) en Fabric Warehouse",
      "summary": "Ingesta y transformación masiva de alto rendimiento con T-SQL.",
      "keyPoints": [
        "Rendimiento: Escribe directamente los archivos Parquet optimizados con V-Order en OneLake.",
        "Operación atómica: La tabla solo se crea y se hace visible si la consulta completa finaliza con éxito.",
        "Deducción de tipos: Los tipos de datos de las columnas se infieren automáticamente de la cláusula SELECT.",
        "Reemplazo de tablas: Patrón habitual para regenerar tablas de hechos agregadas o dimensiones transformadas."
      ],
      "examTrap": "Para transformar y cargar datos masivos en una nueva tabla dentro de un Fabric Warehouse, CTAS siempre supera en rendimiento a CREATE TABLE + INSERT INTO.",
      "searchQuery": "CREATE TABLE AS SELECT CTAS Fabric warehouse DP-600"
    },
    "references": [
      {
        "title": "CREATE TABLE AS SELECT (Transact-SQL) - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse"
      }
    ]
  },
  {
    id: "DP600-086",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Tablas Clonadas en Fabric Warehouse (Zero-Copy Cloning)",
    topicIcon: "warehouse",
    tags: ["Warehouse", "Clone", "Zero-Copy", "T-SQL", "Testing"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "CREATE TABLE dbo.Orders_QA\nAS CLONE OF dbo.Orders;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un Fabric Warehouse de producción de 5 terabytes, los desarrolladores necesitan una copia idéntica de la tabla 'Orders' para probar un proceso de actualización crítico sin afectar la tabla original ni pagar por 5 TB adicionales de almacenamiento. Necesitan que la copia se cree en cuestión de segundos. ¿Qué comando T-SQL nativo de Fabric Warehouse deben utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "CREATE TABLE dbo.Orders_QA AS CLONE OF dbo.Orders;",
        "isCorrect": true,
        "rationale": "La clonación de tablas en Fabric Warehouse (`AS CLONE OF`) crea una copia de metadatos de coste cero (zero-copy clone) casi instantánea. Solo hace referencia a los archivos Delta Parquet existentes y solo consume almacenamiento adicional cuando se realizan modificaciones o eliminaciones sobre la tabla clonada."
      },
      {
        id: "opt_2",
        "text": "SELECT * INTO dbo.Orders_QA FROM dbo.Orders;",
        "isCorrect": false,
        "rationale": "SELECT INTO duplicaría físicamente todos los 5 TB de datos consumiendo almacenamiento, capacidad de computación y tardando mucho tiempo."
      },
      {
        id: "opt_3",
        "text": "Exportar la tabla a un archivo .CSV y descargarlo al escritorio del desarrollador.",
        "isCorrect": false,
        "rationale": "Descargar 5 TB a un equipo local es inviable y no crea la tabla en el Warehouse para pruebas."
      },
      {
        id: "opt_4",
        "text": "BACKUP DATABASE TO DISK con compresión zip.",
        "isCorrect": false,
        "rationale": "Fabric Warehouse es una solución SaaS en la nube donde las copias de seguridad de almacenamiento no usan rutas locales de disco."
      }
    ],
    "explanation": "La clonación de tablas (`AS CLONE OF`) en Fabric Warehouse es una operación instantánea de copia cero que permite a los desarrolladores aislar entornos de prueba y recuperación ante desastres sin duplicar almacenamiento físico.",
    "theoryPill": {
      "title": "Clonación de Tablas con Copia Cero (Table Clone) en Fabric Warehouse",
      "summary": "Copias instantáneas basadas en metadatos para entornos de prueba y auditoría.",
      "keyPoints": [
        "Zero-Copy: Crea una instantánea lógica de metadatos apuntando a los archivos Delta Parquet subyacentes.",
        "Velocidad: Tarda pocos segundos independientemente de si la tabla tiene 10 GB o 50 TB.",
        "Aislamiento: Los cambios posteriores en la tabla original o en la tabla clonada no afectan a la otra (mecanismo Copy-on-Write).",
        "Casos de uso: Pruebas de integración, soporte de auditorías a fecha fija, entornos de desarrollo y staging sin coste extra de almacenamiento."
      ],
      "examTrap": "La sintaxis exacta en Fabric Warehouse es `CREATE TABLE [Nueva] AS CLONE OF [Original]`.",
      "searchQuery": "Clone table T-SQL Microsoft Fabric warehouse DP-600"
    },
    "references": [
      {
        "title": "Clone table in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/clone-table"
      }
    ]
  },
  {
    id: "DP600-087",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Consultas entre Elementos (Cross-Database Querying en Fabric SQL)",
    topicIcon: "warehouse",
    tags: ["Cross-Database", "Three-Part Naming", "Warehouse", "Lakehouse", "T-SQL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "SELECT \n    w.CustomerID,\n    w.CustomerName,\n    l.SensorTemperature\nFROM SalesWarehouse.dbo.DimCustomer w\nINNER JOIN TelemetryLakehouse.dbo.RawTelemetry l\n    ON w.DeviceID = l.DeviceID;",
    "codeLanguage": "sql",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un área de trabajo de Microsoft Fabric tienes un Warehouse llamado 'SalesWarehouse' y un Lakehouse llamado 'TelemetryLakehouse'. Necesitas escribir una consulta T-SQL que combine datos de clientes de 'SalesWarehouse' con telemetría almacenada en 'TelemetryLakehouse' en una sola consulta relacional sin mover datos entre ellos. ¿Cómo se referencia la tabla del Lakehouse desde la sesión del Warehouse?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizando la nomenclatura estándar de tres partes de T-SQL: [TelemetryLakehouse].[dbo].[RawTelemetry].",
        "isCorrect": true,
        "rationale": "El motor de consultas SQL unificado de Microsoft Fabric admite consultas entre múltiples bases de datos (Cross-Database Querying) dentro de la misma área de trabajo utilizando la convención estándar de nomenclatura de tres partes: [NombreElemento].[Esquema].[Tabla]."
      },
      {
        id: "opt_2",
        "text": "Configurando un servidor vinculado (Linked Server) de SQL Server con OLE DB.",
        "isCorrect": false,
        "rationale": "Fabric no utiliza servidores vinculados clásicos de SQL Server; la conectividad entre elementos de la misma área de trabajo es nativa y directa."
      },
      {
        id: "opt_3",
        "text": "Exportando ambas tablas a archivos de Excel y combinándolas con BUSCARV (VLOOKUP).",
        "isCorrect": false,
        "rationale": "No es una solución T-SQL analítica empresarial escalable."
      },
      {
        id: "opt_4",
        "text": "No es posible consultar un Warehouse y un Lakehouse en la misma instrucción.",
        "isCorrect": false,
        "rationale": "Es una de las características clave más potentes del motor SQL de Fabric."
      }
    ],
    "explanation": "Fabric admite consultas directas entre bases de datos en la misma área de trabajo mediante la nomenclatura estándar de tres partes ([Elemento].[Esquema].[Tabla]), permitiendo hacer JOINs entre Warehouses y Lakehouses sin duplicar datos.",
    "theoryPill": {
      "title": "Consultas Entre Elementos (Cross-Database Querying) en Fabric",
      "summary": "Unificación de Warehouses y Lakehouses mediante el motor T-SQL distribuido.",
      "keyPoints": [
        "Sintaxis: [NombreWarehouse_o_Lakehouse].[Esquema].[Tabla].",
        "Ámbito: Funciona de forma transparente entre artefactos de la misma área de trabajo (y entre áreas de trabajo si el usuario tiene permisos ReadData).",
        "Rendimiento: El optimizador de consultas genera un plan distribuido eficiente que lee directamente de las tablas Delta en OneLake.",
        "Seguridad: Se verifican los permisos del usuario de forma independiente en cada elemento involucrado en la consulta."
      ],
      "examTrap": "Para combinar datos de un Lakehouse y un Warehouse en T-SQL, usa la nomenclatura de tres partes `[NombreArtefacto].[dbo].[NombreTabla]`.",
      "searchQuery": "Cross-database queries in Microsoft Fabric T-SQL DP-600"
    },
    "references": [
      {
        "title": "Query multiple warehouses and lakehouses in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/query-multiple-warehouses"
      }
    ]
  },
  {
    id: "DP600-088",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "DAX Studio Server Timings: Formula Engine (FE) vs Storage Engine (SE)",
    topicIcon: "powerbi",
    tags: ["DAX Studio", "Server Timings", "Formula Engine", "Storage Engine", "VertiPaq"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Estás optimizando una medida DAX compleja utilizando la herramienta DAX Studio con Server Timings activado. Al ejecutar la consulta, el panel Server Timings muestra: Tiempo Total = 8.500 ms; Storage Engine (SE) = 200 ms (1 consulta VertiPaq); Formula Engine (FE) = 8.300 ms (97,6% del tiempo total). ¿Qué indica este diagnóstico sobre la causa raíz de la lentitud de la medida?",
    options: [
      {
        id: "opt_1",
        "text": "La medida depende en exceso del Formula Engine (FE), el cual es monohilo (single-threaded) y no almacena en caché columnar, habitualmente debido a iteradores complejos, lógica condicional pesada o funciones DAX no optimizables por VertiPaq.",
        "isCorrect": true,
        "rationale": "El Storage Engine (SE / VertiPaq) es multihilo, ejecuta en memoria ultrarrápida y escala con los núcleos de la CPU. El Formula Engine (FE) es de un solo hilo y resuelve lógica procedimental compleja. Un tiempo de FE superior al 30-40% indica un cuello de botella en la fórmula DAX que debe reescribirse para delegar más trabajo al Storage Engine."
      },
      {
        id: "opt_2",
        "text": "El disco duro del servidor de Azure se ha quedado sin espacio de almacenamiento.",
        "isCorrect": false,
        "rationale": "DAX Studio Server Timings mide el tiempo de CPU del motor en memoria, no el espacio de disco físico."
      },
      {
        id: "opt_3",
        "text": "La consulta es óptima porque el Storage Engine tardó menos de 500 ms.",
        "isCorrect": false,
        "rationale": "Un tiempo total de 8,5 segundos es inaceptable para una experiencia de usuario interactiva en Power BI."
      },
      {
        id: "opt_4",
        "text": "Se debe reiniciar Power BI Desktop para borrar la caché del navegador.",
        "isCorrect": false,
        "rationale": "El cuello de botella es estructural en la lógica DAX monohilo del Formula Engine."
      }
    ],
    "explanation": "Un alto porcentaje de tiempo en el Formula Engine (FE) en DAX Studio Server Timings revela que la medida está atrapada en un procesamiento de un solo hilo que no puede paralelizarse en VertiPaq (Storage Engine).",
    "theoryPill": {
      "title": "Diagnóstico DAX con Server Timings: FE vs SE",
      "summary": "Identificación de cuellos de botella de rendimiento en modelos semánticos.",
      "keyPoints": [
        "Storage Engine (SE / VertiPaq): Multihilo (usa todos los núcleos de CPU), ultrarrápido, realiza escaneos y agregaciones directas en memoria caché.",
        "Formula Engine (FE): Monohilo (un solo hilo de CPU), evalúa lógica condicional (IF, SWITCH), maneja relaciones complejas y genera el resultado tabular final.",
        "Regla de oro: Una medida bien optimizada debe pasar la inmensa mayoría de su tiempo en el Storage Engine (SE > 80%).",
        "Acción correctora: Eliminar columnas calculadas innecesarias, evitar iterar tablas grandes con SUMX si basta SUM, simplificar filtros dentro de CALCULATE."
      ],
      "examTrap": "Si FE% > 50%, la medida está sufriendo por lógica monohilo; se debe reescribir la expresión para empujar el cálculo al Storage Engine (SE).",
      "searchQuery": "DAX Studio server timings Formula Engine vs Storage Engine DP-600"
    },
    "references": [
      {
        "title": "Use DAX Studio to optimize DAX queries | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/guidance/dax-studio-overview"
      }
    ]
  },
  {
    id: "DP600-089",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Optimización de Rendimiento DAX: DIVIDE() vs Operador de División",
    topicIcon: "powerbi",
    tags: ["DAX", "DIVIDE", "Best Practices", "Error Handling", "Performance"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "Margen = DIVIDE([Total Beneficio], [Total Ventas])",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Por qué las directrices oficiales de Microsoft recomiendan utilizar la función DAX `DIVIDE(Numerador, Denominador)` en lugar de escribir manualmente `Numerador / Denominador` o usar `IF(Denominador <> 0, Numerador / Denominador, 0)`?",
    options: [
      {
        id: "opt_1",
        "text": "DIVIDE gestiona de forma nativa la división por cero devolviendo BLANK() de manera más eficiente y sin provocar errores, evitando evaluar dos veces el denominador como ocurriría con una sentencia IF.",
        "isCorrect": true,
        "rationale": "DIVIDE() está optimizada internamente en C++ en el motor VertiPaq. Maneja divisiones por cero devolviendo BLANK() (o un valor alternativo opcional) sin forzar evaluaciones redundantes del denominador y mejorando la generación del plan de ejecución."
      },
      {
        id: "opt_2",
        "text": "Porque el operador de división '/' no es reconocido por el analizador sintáctico de DAX.",
        "isCorrect": false,
        "rationale": "El operador '/' es perfectamente válido en DAX, pero produce errores en caso de división por cero o requiere condicionales lentos."
      },
      {
        id: "opt_3",
        "text": "Porque DIVIDE() multiplica el resultado por 100 de forma automática.",
        "isCorrect": false,
        "rationale": "DIVIDE() calcula el cociente matemático exacto sin aplicar formatos porcentuales automáticos."
      },
      {
        id: "opt_4",
        "text": "Porque DIVIDE() solo admite números enteros menores que 10.",
        "isCorrect": false,
        "rationale": "Admite cualquier número decimal o entero de precisión flotante."
      }
    ],
    "explanation": "La función DIVIDE() de DAX es más rápida, elegante y segura que una división manual con comprobación IF, ya que previene errores de división por cero devolviendo BLANK() de manera optimizada.",
    "theoryPill": {
      "title": "Uso de la Función DIVIDE() en DAX",
      "summary": "Prevención de errores y optimización de planes de ejecución en divisiones.",
      "keyPoints": [
        "Control de división por cero: Si el denominador es cero o BLANK, DIVIDE devuelve BLANK() por defecto (o el valor del 3er parámetro opcional).",
        "Ventaja sobre IF: `IF(B <> 0, A / B)` evalúa 'B' dos veces en el Formula Engine, mientras que `DIVIDE(A, B)` evalúa 'B' una sola vez.",
        "Visualizaciones: BLANK() en Power BI no se renderiza en matrices, manteniendo limpias las tablas sin filas de ceros innecesarias."
      ],
      "examTrap": "Evita `DIVIDE(A, B, 0)` salvo que sea estrictamente necesario un cero; devolver el BLANK() predeterminado es mucho más eficiente para la compresión de matrices en Power BI.",
      "searchQuery": "DAX DIVIDE function vs divide operator Power BI DP-600"
    },
    "references": [
      {
        "title": "DIVIDE function (DAX) | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dax/divide-function-dax"
      }
    ]
  },
  {
    id: "DP600-090",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Preservación del Contexto con KEEPFILTERS() en DAX",
    topicIcon: "powerbi",
    tags: ["DAX", "KEEPFILTERS", "CALCULATE", "Filter Context", "Semantics"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "Ventas Rojo Keep = \nCALCULATE(\n    [Total Ventas],\n    KEEPFILTERS('Product'[Color] = \"Rojo\")\n)",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una matriz de Power BI que tiene la columna 'Product'[Color] en las filas, observas que una medida definida como `CALCULATE([Total Ventas], 'Product'[Color] = \"Rojo\")` muestra el valor de ventas de los productos rojos en TODAS las filas de la matriz (incluso en la fila 'Azul' o 'Verde'). ¿Qué función DAX debes envolver alrededor del filtro para que se combine mediante intersección lógica (AND) con los filtros externos en lugar de sobrescribirlos?",
    options: [
      {
        id: "opt_1",
        "text": "KEEPFILTERS('Product'[Color] = \"Rojo\").",
        "isCorrect": true,
        "rationale": "De forma predeterminada, los argumentos de filtro en CALCULATE sobrescriben (reemplazan) cualquier filtro previo existente sobre la misma columna. Al envolver el filtro con KEEPFILTERS(), se obliga a que el filtro se intersecte con el contexto de filtro externo existente, devolviendo BLANK() en las filas que no coincidan (como Azul o Verde)."
      },
      {
        id: "opt_2",
        "text": "ALL('Product'[Color]).",
        "isCorrect": false,
        "rationale": "ALL elimina todos los filtros existentes en lugar de conservarlos."
      },
      {
        id: "opt_3",
        "text": "VALUES('Product'[Color]).",
        "isCorrect": false,
        "rationale": "VALUES devuelve una tabla de valores distintos visibles en el contexto actual, pero no modifica el comportamiento de reemplazo de CALCULATE."
      },
      {
        id: "opt_4",
        "text": "IGNOREFILTERS('Product'[Color]).",
        "isCorrect": false,
        "rationale": "'IGNOREFILTERS' no es una función de DAX existente."
      }
    ],
    "explanation": "Por defecto, los predicados de filtro dentro de CALCULATE eliminan y sustituyen cualquier filtro existente sobre las columnas afectadas. KEEPFILTERS altera este comportamiento para que el filtro se agregue (intersección) en lugar de sobrescribir.",
    "theoryPill": {
      "title": "Modificación del Comportamiento de Filtros con KEEPFILTERS en DAX",
      "summary": "Intersección en lugar de reemplazo del contexto de filtro en CALCULATE.",
      "keyPoints": [
        "Comportamiento estándar de CALCULATE: Si filtras por Color='Rojo', cualquier filtro previo sobre Color se descarta y se aplica 'Rojo'.",
        "Comportamiento con KEEPFILTERS: El filtro 'Rojo' se intersecta con el filtro existente. Si la fila actual de la matriz es 'Azul', la intersección ('Rojo' AND 'Azul') resulta vacía y devuelve BLANK().",
        "Uso habitual: Medidas de KPIs específicos que no deben desbordar visualmente sobre otras categorías en tablas o matrices."
      ],
      "examTrap": "Para evitar que un filtro en CALCULATE sobrescriba el contexto de filtro de la visualización, usa KEEPFILTERS().",
      "searchQuery": "KEEPFILTERS DAX function Power BI DP-600"
    },
    "references": [
      {
        "title": "KEEPFILTERS function (DAX) | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dax/keepfilters-function-dax"
      }
    ]
  }
];

console.log(`Prepared third batch of ${dp600QuestionsPart3.length} questions for DP-600.`);
