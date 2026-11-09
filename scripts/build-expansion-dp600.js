/**
 * scripts/build-expansion-dp600.js
 * Additional 30 Questions for DP-600 (DP600-071 to DP600-100)
 */

export const dp600QuestionsPart2 = [
  {
    id: "DP600-071",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Destinos de Salida en Dataflow Gen2",
    topicIcon: "pipeline",
    tags: ["Dataflow Gen2", "Output Destination", "Lakehouse", "Warehouse", "Fast Copy"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En Microsoft Fabric, estás diseñando un Dataflow Gen2 para transformar datos maestros de clientes extraídos de un sistema ERP. Necesitas almacenar la tabla resultante directamente en OneLake para que esté disponible de inmediato en formato Delta Parquet tanto para análisis T-SQL en el SQL Analytics Endpoint como para modelos Direct Lake. ¿Qué destino de salida (Output Destination) debes configurar en la consulta de Dataflow Gen2?",
    options: [
      {
        id: "opt_1",
        "text": "Fabric Lakehouse (escribiendo en la sección 'Tables').",
        "isCorrect": true,
        "rationale": "Configurar un Lakehouse como destino de salida en Dataflow Gen2 almacena automáticamente la tabla como tabla Delta administrada en OneLake ('Tables/'), haciéndola accesible de inmediato para Direct Lake y el SQL Endpoint."
      },
      {
        id: "opt_2",
        "text": "Azure Cosmos DB con API Gremlin.",
        "isCorrect": false,
        "rationale": "Cosmos DB Gremlin es una base de datos NoSQL de grafos, no un destino nativo Delta Parquet en OneLake para Direct Lake."
      },
      {
        id: "opt_3",
        "text": "Un archivo de texto plano delimitado por tabulaciones en el disco C:\\ local.",
        "isCorrect": false,
        "rationale": "Dataflow Gen2 es un servicio SaaS en la nube y no escribe tablas Delta directamente en rutas de discos locales del usuario."
      },
      {
        id: "opt_4",
        "text": "Una biblioteca de SharePoint en formato .XLSX.",
        "isCorrect": false,
        "rationale": "SharePoint XLSX no es un formato analítico Delta ni admite Direct Lake ni SQL Endpoint."
      }
    ],
    "explanation": "Dataflow Gen2 permite escribir tablas directamente en destinos de Microsoft Fabric como Lakehouses o Warehouses, generando automáticamente tablas Delta Parquet en OneLake.",
    "theoryPill": {
      "title": "Destinos de Datos en Dataflows Gen2",
      "summary": "Persistencia de datos transformados en OneLake.",
      "keyPoints": [
        "Destinos admitidos: Fabric Lakehouse, Fabric Warehouse, Azure SQL Database, Azure Synapse y Azure Data Explorer (KQL).",
        "Escribir en Lakehouse: Crea tablas Delta gestionadas que se descubren automáticamente en el SQL Endpoint.",
        "Modos de actualización: Reemplazar (Drop & Recreate / Overwrite) o Anexar (Append).",
        "Tipos de datos: Dataflow Gen2 mapea automáticamente tipos de Power Query a tipos Delta/Parquet."
      ],
      "examTrap": "Para habilitar Direct Lake sin configuración adicional, escribe en la sección 'Tables' de un Fabric Lakehouse.",
      "searchQuery": "Dataflow Gen2 data destinations Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Dataflow Gen2 data destinations and managed staging | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/dataflows-gen2-data-destinations-and-managed-staging"
      }
    ]
  },
  {
    id: "DP600-072",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Copia Rápida (Fast Copy) y Áreas de Almacenamiento Provisional (Staging) en Dataflow Gen2",
    topicIcon: "pipeline",
    tags: ["Dataflow Gen2", "Fast Copy", "Staging", "Performance", "ETL"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Al ejecutar un Dataflow Gen2 que ingiere 50 gigabytes desde Azure SQL Database hacia un Fabric Lakehouse, observas que el proceso tarda varias horas. Necesitas acelerar drásticamente la ingesta aprovechando las capacidades de movimiento masivo en paralelo de Data Factory sin transformar fila a fila mediante el motor Mashup. ¿Qué funcionalidad debes activar en la conexión del origen en Dataflow Gen2?",
    options: [
      {
        id: "opt_1",
        "text": "Habilitar la Copia Rápida (Fast Copy / Scale-out data movement).",
        "isCorrect": true,
        "rationale": "Fast Copy en Dataflow Gen2 utiliza el motor distribuido de movimiento de datos de Azure Data Factory para extraer e insertar terabytes de datos en paralelo directamente al almacenamiento intermedio (Staging Lakehouse) sin la sobrecarga del evaluador Mashup."
      },
      {
        id: "opt_2",
        "text": "Reducir la memoria RAM del navegador del desarrollador.",
        "isCorrect": false,
        "rationale": "Dataflow Gen2 se ejecuta en la nube de Fabric, no en el navegador web del usuario."
      },
      {
        id: "opt_3",
        "text": "Desactivar la compresión en la base de datos de origen.",
        "isCorrect": false,
        "rationale": "Desactivar la compresión aumenta el volumen de red transferido y empeora el tiempo de carga."
      },
      {
        id: "opt_4",
        "text": "Dividir la tabla en 500 archivos de texto de 100 KB cada uno.",
        "isCorrect": false,
        "rationale": "Generar miles de archivos diminutos (problema de 'small files') degrada gravemente el rendimiento en sistemas basados en lago."
      }
    ],
    "explanation": "Fast Copy en Dataflows Gen2 utiliza el motor de copia backend de Azure Data Factory para transferir grandes volúmenes de datos relacionales directamente al Lakehouse de staging a velocidades de gigabytes por segundo.",
    "theoryPill": {
      "title": "Copia Rápida (Fast Copy) en Dataflows Gen2",
      "summary": "Aceleración de ingesta masiva de datos mediante computación distribuida.",
      "keyPoints": [
        "Mecanismo: Usa el motor de Data Factory Copy Activity para la ingesta en lugar del motor mashup de Power Query de un solo hilo.",
        "Orígenes admitidos: Azure SQL Database, SQL Server local (con puerta de enlace VNet/OPDG), ADLS Gen2, Snowflake.",
        "Requisitos: La consulta de Power Query inicial debe ser una extracción simple sin transformaciones no plegables.",
        "Staging Lakehouse: Los datos se colocan temporalmente en el Lakehouse de staging administrado antes de transformarse."
      ],
      "examTrap": "Para ingestas masivas lentas en Dataflows Gen2 desde orígenes relacionales, la solución de optimización recomendada es 'Fast Copy'.",
      "searchQuery": "Fast copy in Dataflow Gen2 Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Fast copy in Dataflows Gen2 - Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/fast-copy-dataflows"
      }
    ]
  },
  {
    id: "DP600-073",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Actualización Incremental (Incremental Refresh) en Power BI",
    topicIcon: "powerbi",
    tags: ["Incremental Refresh", "RangeStart", "RangeEnd", "Partitioning", "VertiPaq"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "RangeStart: 2024-01-01 00:00:00\nRangeEnd:   2024-01-02 00:00:00",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo semántico en modo Importación que consulta 200 millones de registros de transacciones, cada actualización completa tarda más de dos horas y satura los recursos de la capacidad. Necesitas que solo se actualicen los últimos 7 días de datos modificados, manteniendo archivados los últimos 5 años de histórico en particiones fijas. ¿Qué parámetros reservados obligatorios deben definirse en Power Query para configurar la directiva de actualización incremental?",
    options: [
      {
        id: "opt_1",
        "text": "RangeStart y RangeEnd (de tipo Date/Time).",
        "isCorrect": true,
        "rationale": "RangeStart y RangeEnd son parámetros reservados del sistema con distinción entre mayúsculas y minúsculas (case-sensitive) y de tipo Date/Time, requeridos por Power BI para particionar dinámicamente el modelo."
      },
      {
        id: "opt_2",
        "text": "StartDate y EndDate (de tipo Texto).",
        "isCorrect": false,
        "rationale": "Los nombres exactos reconocidos por el motor de actualización incremental son RangeStart y RangeEnd, y deben ser obligatoriamente Date/Time."
      },
      {
        id: "opt_3",
        "text": "MinYear y MaxYear (de tipo Número entero).",
        "isCorrect": false,
        "rationale": "No son los nombres reservados de la funcionalidad de actualización incremental."
      },
      {
        id: "opt_4",
        "text": "FilterFrom y FilterTo (de tipo Booleano).",
        "isCorrect": false,
        "rationale": "Parámetros no reconocidos por la directiva de actualización incremental."
      }
    ],
    "explanation": "La directiva de actualización incremental en Power BI exige definir exactamente los parámetros 'RangeStart' y 'RangeEnd' de tipo DateTime para que el servicio filtre y particione los datos en el origen.",
    "theoryPill": {
      "title": "Configuración de Actualización Incremental (Incremental Refresh)",
      "summary": "Particionamiento automático para reducir tiempos de actualización y consumo de capacidad.",
      "keyPoints": [
        "Parámetros: RangeStart y RangeEnd (sensibles a mayúsculas, tipo Fecha/Hora).",
        "Plegado de consultas (Query Folding): Esencial en el filtro de fecha para que el origen relacional solo transmita los registros del rango.",
        "Partición histórica: Datos archivados que no se modifican ni se vuelven a solicitar al origen.",
        "Partición de actualización: Ventana móvil de días/meses que se actualiza periódicamente.",
        "Detección de cambios de datos: Permite actualizar solo las particiones donde haya cambiado una columna de fecha de modificación."
      ],
      "examTrap": "RangeStart y RangeEnd DEBEN tener el tipo de datos 'Fecha y hora' (DateTime); si se configuran como 'Solo Fecha' (Date), la actualización incremental no se activará.",
      "searchQuery": "Incremental refresh for semantic models Power BI DP-600"
    },
    "references": [
      {
        "title": "Incremental refresh for semantic models | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-overview"
      }
    ]
  },
  {
    id: "DP600-074",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Plegado de Consultas (Query Folding) en Power Query",
    topicIcon: "pipeline",
    tags: ["Power Query", "Query Folding", "M", "SQL", "Performance"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Cuál de las siguientes transformaciones en el editor de Power Query romperá casi con toda seguridad el plegado de consultas (Query Folding) al consultar una base de datos relacional SQL, forzando al motor Mashup local a descargar toda la tabla en memoria para procesarla?",
    options: [
      {
        id: "opt_1",
        "text": "Invocar una función personalizada de Power Query en M que realiza llamadas HTTP externas a una API o aplicar una operación Table.Buffer().",
        "isCorrect": true,
        "rationale": "Funciones M personalizadas con lógica no traducible a SQL, llamadas a APIs externas o el uso explícito de Table.Buffer() impiden que el motor de Power Query traduzca los pasos a una consulta SQL nativa en el servidor, rompiendo el plegado."
      },
      {
        id: "opt_2",
        "text": "Filtrar filas mediante una condición WHERE simple (ej. Status = 'Active').",
        "isCorrect": false,
        "rationale": "Los filtros de filas se pliegan de forma nativa como cláusulas WHERE en SQL."
      },
      {
        id: "opt_3",
        "text": "Seleccionar y quitar columnas específicas (SELECT col1, col2).",
        "isCorrect": false,
        "rationale": "La selección o eliminación de columnas se traduce directamente en la cláusula SELECT de SQL."
      },
      {
        id: "opt_4",
        "text": "Agrupar filas y calcular la suma de una columna (GROUP BY ... SUM).",
        "isCorrect": false,
        "rationale": "Las agrupaciones estándar se pliegan nativamente como GROUP BY en SQL."
      }
    ],
    "explanation": "El plegado de consultas se interrumpe cuando se introducen transformaciones complejas en lenguaje M que no tienen equivalente en la sintaxis SQL del origen relacional (como Table.Buffer, llamadas Web o transformaciones basadas en índices locales).",
    "theoryPill": {
      "title": "Plegado de Consultas (Query Folding) en Power Query",
      "summary": "Delegación del procesamiento de transformaciones en el motor de la base de datos de origen.",
      "keyPoints": [
        "Ventajas: Máxima velocidad, mínimo tráfico de red, habilita actualización incremental y DirectQuery.",
        "Pasos que pliegan bien: Filtrado de filas (WHERE), selección de columnas (SELECT), combinaciones de tablas (JOIN), agrupaciones (GROUP BY).",
        "Pasos que rompen el plegado: Inserción de columnas de índice (Table.AddIndexColumn), Table.Buffer, llamadas a funciones personalizadas en M, unión de orígenes heterogéneos.",
        "Comprobación: Clic derecho en el paso aplicado -> 'Ver consulta nativa' (View Native Query). Si está deshabilitado, el plegado se ha roto en ese paso."
      ],
      "examTrap": "Si 'Ver consulta nativa' está atenuado en gris, el paso actual o uno anterior ha roto el plegado de consultas.",
      "searchQuery": "Power Query query folding guidance Power BI DP-600"
    },
    "references": [
      {
        "title": "Query folding guidance in Power BI Desktop | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/guidance/power-query-folding"
      }
    ]
  },
  {
    id: "DP600-075",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Transición de Contexto en DAX (Context Transition)",
    topicIcon: "powerbi",
    tags: ["DAX", "Context Transition", "CALCULATE", "Row Context", "Filter Context"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "// Columna calculada en la tabla 'Customers':\nTotalVentasCliente = CALCULATE( SUM(Sales[Amount]) )",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo semántico creas una columna calculada en la tabla 'Customers' utilizando la expresión `CALCULATE( SUM(Sales[Amount]) )`. La tabla 'Customers' se relaciona con 'Sales' mediante CustomerKey (1 a varios). ¿Por qué esta columna calculada devuelve las ventas exclusivas de cada cliente en lugar del total general de ventas de toda la empresa?",
    options: [
      {
        id: "opt_1",
        "text": "Porque CALCULATE realiza una transición de contexto (Context Transition), convirtiendo automáticamente el contexto de fila actual de la tabla 'Customers' en un contexto de filtro equivalente sobre todas sus columnas.",
        "isCorrect": true,
        "rationale": "La transición de contexto es el mecanismo por el cual CALCULATE (o la invocación de cualquier medida, que lleva un CALCULATE implícito) transforma el contexto de fila existente en un contexto de filtro que restringe el cálculo a la fila actual."
      },
      {
        id: "opt_2",
        "text": "Porque SUM() siempre ignora a todos los demás clientes por defecto.",
        "isCorrect": false,
        "rationale": "SUM() por sí solo opera sobre el contexto de filtro existente; sin CALCULATE en una columna calculada devolvería el total general."
      },
      {
        id: "opt_3",
        "text": "Porque la relación entre Customers y Sales es de varios a varios.",
        "isCorrect": false,
        "rationale": "La relación es de uno a varios estándar."
      },
      {
        id: "opt_4",
        "text": "Porque Power BI Desktop detectó la palabra 'Customers' y filtró el modelo automáticamente.",
        "isCorrect": false,
        "rationale": "El comportamiento está estrictamente regido por las reglas de evaluación de CALCULATE y transición de contexto de DAX."
      }
    ],
    "explanation": "La función CALCULATE produce la transición de contexto: transforma el contexto de fila de una columna calculada o iterador en un contexto de filtro idéntico para evaluar la expresión.",
    "theoryPill": {
      "title": "Transición de Contexto en DAX (Context Transition)",
      "summary": "Transformación de contexto de fila en contexto de filtro mediante CALCULATE.",
      "keyPoints": [
        "Desencadenante: Se activa cuando se ejecuta CALCULATE o CALCULATETABLE en presencia de un contexto de fila activo.",
        "Invocación de medidas: TODA medida DAX invocada dentro de un iterador (SUMX, FILTER) o columna calculada ejecuta un CALCULATE invisible y realiza transición de contexto.",
        "Efecto: Todas las columnas de la fila actual se aplican como filtros unarios en el modelo.",
        "Riesgo de rendimiento: En tablas de millones de filas, crear columnas calculadas con transición de contexto satura la CPU y memoria del motor VertiPaq."
      ],
      "examTrap": "Llamar a una medida [TotalVentas] dentro de una columna calculada ejecuta automáticamente una transición de contexto porque las medidas están envueltas implícitamente en CALCULATE().",
      "searchQuery": "Context transition in DAX CALCULATE Power BI DP-600"
    },
    "references": [
      {
        "title": "Understand evaluation context in DAX | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dax/dax-overview#evaluation-context"
      }
    ]
  },
  {
    id: "DP600-076",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Medidas Semi-aditivas en DAX",
    topicIcon: "powerbi",
    tags: ["DAX", "Semi-additive", "LASTDATE", "Balance", "Inventory"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "Saldo Final Mes = \nCALCULATE(\n    SUM('AccountBalances'[BalanceAmount]),\n    LASTDATE('Date'[Date])\n)",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo semántico para una entidad financiera, los saldos de cuentas corrientes bancarias o los niveles de stock de un almacén son métricas semi-aditivas (se pueden sumar a través de clientes o sucursales, pero NO se deben sumar a lo largo del tiempo, ya que el saldo de un mes debe reflejar el estado en el último día hábil de ese mes). ¿Qué patrón DAX debes utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar CALCULATE con funciones como LASTDATE, LASTNONBLANK o CLOSINGBALANCEMONTH para filtrar la fecha final del período seleccionado.",
        "isCorrect": true,
        "rationale": "Las métricas semi-aditivas (stocks, inventarios, saldos de cuenta) requieren calcular la suma de la métrica en la última fecha válida del contexto temporal mediante LASTDATE o LASTNONBLANK."
      },
      {
        id: "opt_2",
        "text": "SUM('AccountBalances'[BalanceAmount]) simple sin ningún filtro de fecha.",
        "isCorrect": false,
        "rationale": "Una suma simple acumularía erróneamente los saldos de los 30 días del mes en lugar de mostrar el saldo al cierre."
      },
      {
        id: "opt_3",
        "text": "COUNTROWS('AccountBalances') multiplicado por 100.",
        "isCorrect": false,
        "rationale": "Contar filas no calcula el importe del saldo contable."
      },
      {
        id: "opt_4",
        "text": "Eliminar la tabla de fechas del modelo relacional.",
        "isCorrect": false,
        "rationale": "Eliminar la tabla de fechas destruiría la capacidad de análisis temporal del modelo financiero."
      }
    ],
    "explanation": "Las medidas semi-aditivas no se agregan a lo largo de la dimensión temporal; se resuelven evaluando la métrica en la última fecha de cada período mediante LASTDATE o LASTNONBLANK.",
    "theoryPill": {
      "title": "Métricas Semi-Aditivas en DAX (Saldos e Inventarios)",
      "summary": "Modelado de medidas que no se pueden sumar a través del tiempo.",
      "keyPoints": [
        "Métricas aditivas: Se pueden sumar por todas las dimensiones (Ventas, Unidades vendidas).",
        "Métricas semi-aditivas: Se pueden sumar por dimensiones no temporales (Sucursal, Cliente), pero se evalúan en un punto temporal específico (Saldo bancario, Stock, Headcount).",
        "Métricas no aditivas: No se pueden sumar por ninguna dimensión (Ratios, Porcentajes, Temperaturas).",
        "Patrones DAX: LASTDATE('Date'[Date]) o LASTNONBLANK('Date'[Date], CALCULATE(COUNTROWS(...)))."
      ],
      "examTrap": "Para inventario o saldos bancarios, sumar a través del tiempo es un error conceptual crítico; se debe usar LASTDATE o CLOSINGBALANCEMONTH.",
      "searchQuery": "Semi-additive calculations in DAX Power BI DP-600"
    },
    "references": [
      {
        "title": "Semi-additive measures in DAX | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dax/closingbalancemonth-function-dax"
      }
    ]
  },
  {
    id: "DP600-077",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Modelos Compuestos (Composite Models)",
    topicIcon: "powerbi",
    tags: ["Composite Models", "DirectQuery", "Import", "Storage Mode", "Enterprise"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "¿Qué caracteriza a un modelo compuesto (Composite Model) en Power BI?",
    options: [
      {
        id: "opt_1",
        "text": "Combina tablas de más de un modo de almacenamiento (como Import y DirectQuery) o combina datos de múltiples orígenes DirectQuery independientes o modelos semánticos de Power BI empresariales en un único modelo.",
        "isCorrect": true,
        "rationale": "Un modelo compuesto rompe la restricción de tener todas las tablas en un único modo, permitiendo que algunas tablas residan en memoria (Import), otras en DirectQuery, e integrando modelos semánticos corporativos con datos departamentales propios."
      },
      {
        id: "opt_2",
        "text": "Un modelo que solo admite tablas con un máximo de dos columnas.",
        "isCorrect": false,
        "rationale": "No existe tal restricción en los modelos compuestos."
      },
      {
        id: "opt_3",
        "text": "Un modelo donde todas las consultas se ejecutan únicamente en Microsoft Excel.",
        "isCorrect": false,
        "rationale": "Los modelos compuestos son una capacidad nativa del motor de Power BI / Analysis Services."
      },
      {
        id: "opt_4",
        "text": "Un modelo que no permite crear ninguna medida DAX.",
        "isCorrect": false,
        "rationale": "Los modelos compuestos admiten medidas DAX completas."
      }
    ],
    "explanation": "Los modelos compuestos permiten combinar tablas en modo Import con tablas en modo DirectQuery o integrar múltiples fuentes DirectQuery en una misma solución analítica.",
    "theoryPill": {
      "title": "Modelos Compuestos (Composite Models) en Power BI",
      "summary": "Arquitectura híbrida de almacenamiento e integración de modelos.",
      "keyPoints": [
        "Flexibilidad: Permite mezclar tablas en caché VertiPaq (Import) con tablas de macrodatos en tiempo real (DirectQuery).",
        "DirectQuery para modelos semánticos de Power BI: Permite a los analistas conectarse a un modelo corporativo certificado y extenderlo con sus propias tablas y medidas.",
        "Relaciones de cardinalidad débil (Limited Relationships): Se crean automáticamente entre tablas de diferentes grupos de almacenamiento o islas de orígenes.",
        "Riesgo de seguridad: Implica considerar el envío de datos entre orígenes al evaluar filtros cruzados."
      ],
      "examTrap": "Las relaciones que cruzan diferentes orígenes en un modelo compuesto se clasifican como relaciones de cardinalidad limitada (Limited Relationships).",
      "searchQuery": "Use composite models in Power BI Desktop DP-600"
    },
    "references": [
      {
        "title": "Use composite models in Power BI Desktop | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-composite-models"
      }
    ]
  },
  {
    id: "DP600-078",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Seguridad de Nivel de Objeto (OLS) vs Seguridad de Nivel de Fila (RLS)",
    topicIcon: "security",
    tags: ["OLS", "RLS", "Security", "Tabular Editor", "Metadata"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo semántico corporativo de recursos humanos y ventas, necesitas que los usuarios del rol 'Vendedores' puedan consultar la tabla 'Employees', pero ocultarles por completo la existencia de la columna sensible 'Salary' y la tabla confidencial 'DisciplinaryActions'. Si un vendedor intenta consultar esas columnas en un visual, el motor debe responder como si dichas columnas y tablas no existieran en absoluto en el modelo. ¿Qué mecanismo de seguridad debes aplicar?",
    options: [
      {
        id: "opt_1",
        "text": "Seguridad de nivel de objeto (Object-Level Security - OLS).",
        "isCorrect": true,
        "rationale": "Object-Level Security (OLS) permite restringir el acceso a tablas enteras o columnas específicas para roles de usuario determinados. Para los usuarios no autorizados, los objetos protegidos por OLS no existen (sus metadatos se ocultan por completo)."
      },
      {
        id: "opt_2",
        "text": "Seguridad de nivel de fila (Row-Level Security - RLS).",
        "isCorrect": false,
        "rationale": "RLS filtra las filas visibles dentro de una tabla (ej. ver solo filas del país España), pero no oculta la estructura de columnas ni tablas del modelo."
      },
      {
        id: "opt_3",
        "text": "Ocultar la columna en Power BI Desktop haciendo clic derecho en 'Ocultar en vista de informes'.",
        "isCorrect": false,
        "rationale": "Ocultar un campo en el diseñador es solo cosmético para el panel de campos; cualquier usuario con herramientas externas (DAX Studio, Excel) o creando una medida puede acceder a él."
      },
      {
        id: "opt_4",
        "text": "Cifrar la base de datos con una contraseña ZIP.",
        "isCorrect": false,
        "rationale": "No es una característica de seguridad de modelos semánticos en Microsoft Fabric."
      }
    ],
    "explanation": "Object-Level Security (OLS) oculta tablas y columnas completas de la estructura del modelo semántico para roles específicos, mientras que RLS solo filtra filas.",
    "theoryPill": {
      "title": "Row-Level Security (RLS) vs Object-Level Security (OLS)",
      "summary": "Mecanismos de control de acceso granular en modelos tabulares.",
      "keyPoints": [
        "RLS (Row-Level Security): Filtra horizontalmente las filas devueltas (WHERE Region = 'EMEA'). Las columnas siguen siendo visibles en el modelo.",
        "OLS (Object-Level Security): Protege verticalmente columnas específicas o tablas completas. Los metadatos del objeto desaparecen para el rol denegado.",
        "Configuración de OLS: Se configura mediante herramientas de metadatos como Tabular Editor o scripts TMSL.",
        "Comportamiento de informes: Si un visual utiliza una columna protegida por OLS para un usuario denegado, el visual completo mostrará un error de objeto no encontrado."
      ],
      "examTrap": "Diferencia clave: RLS filtra datos (filas); OLS oculta metadatos y objetos enteros (columnas o tablas).",
      "searchQuery": "Object-level security OLS Power BI Tabular Editor DP-600"
    },
    "references": [
      {
        "title": "Object-level security (OLS) in Power BI | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-object-level-security"
      }
    ]
  },
  {
    id: "DP600-079",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Seguridad Dinámica de Nivel de Fila (Dynamic RLS con USERPRINCIPALNAME)",
    topicIcon: "security",
    tags: ["Dynamic RLS", "USERPRINCIPALNAME", "Security Mapping", "Entra ID", "DAX"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "[Email] = USERPRINCIPALNAME()",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo semántico de ventas para una multinacional con 5.000 gerentes de tienda, deseas que cada gerente vea exclusivamente los datos de su propia tienda al abrir los informes. No es factible crear 5.000 roles estáticos individuales en el modelo. ¿Cómo se implementa una solución de Seguridad Dinámica de Nivel de Fila (Dynamic RLS)?",
    options: [
      {
        id: "opt_1",
        "text": "Crear un único rol en el modelo y definir una regla DAX sobre la tabla de usuarios autorizados utilizando la función USERPRINCIPALNAME() vinculada mediante relaciones a la tabla de tiendas.",
        "isCorrect": true,
        "rationale": "Dynamic RLS utiliza una tabla de asignación de seguridad con las direcciones de correo de los usuarios y aplica la función DAX USERPRINCIPALNAME() en un único rol, filtrando dinámicamente según la identidad autenticada en Microsoft Entra ID."
      },
      {
        id: "opt_2",
        "text": "Crear 5.000 áreas de trabajo de Fabric separadas, una para cada gerente.",
        "isCorrect": false,
        "rationale": "Crear y mantener 5.000 áreas de trabajo independientes es una pesadilla de gobernanza completamente inviable e innecesaria."
      },
      {
        id: "opt_3",
        "text": "Enviar por correo electrónico archivos .pbix individuales cada mañana a los 5.000 gerentes.",
        "isCorrect": false,
        "rationale": "Vulnera todas las directivas de seguridad corporativa y sobrecarga de trabajo al equipo de BI."
      },
      {
        id: "opt_4",
        "text": "Deshabilitar la autenticación de Entra ID en la capacidad de Fabric.",
        "isCorrect": false,
        "rationale": "Fabric no admite deshabilitar Entra ID; es el proveedor de identidad corporativo central."
      }
    ],
    "explanation": "Dynamic RLS utiliza la función DAX USERPRINCIPALNAME() en una tabla de asignación de seguridad (Security Mapping Table) para aplicar filtros personalizados a miles de usuarios mediante un único rol configurado.",
    "theoryPill": {
      "title": "Seguridad Dinámica de Nivel de Fila (Dynamic RLS)",
      "summary": "Filtrado automático de datos según el usuario autenticado.",
      "keyPoints": [
        "USERPRINCIPALNAME(): Devuelve el UPN (correo electrónico corporativo) del usuario que ejecuta la consulta.",
        "Tabla de seguridad: Tabla que contiene el UPN del usuario y el ID de la tienda o región autorizada.",
        "Relación: Se relaciona la tabla de seguridad con la dimensión de negocio con filtrado bidireccional si es necesario.",
        "Ventaja: Un solo rol de seguridad en el modelo sirve para miles de usuarios; las asignaciones se administran actualizando los datos de la tabla, sin redelegar el modelo."
      ],
      "examTrap": "Para probar Dynamic RLS en Power BI Desktop, utiliza la opción 'Ver como' (View as) seleccionando el rol y escribiendo el UPN de prueba en 'Otro usuario'.",
      "searchQuery": "Dynamic row level security USERPRINCIPALNAME Power BI DP-600"
    },
    "references": [
      {
        "title": "Row-level security (RLS) with Power BI | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls"
      }
    ]
  },
  {
    id: "DP600-080",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Aplicación Fabric Capacity Metrics (Interactive vs Background & Throttling)",
    topicIcon: "fabric",
    tags: ["Capacity Metrics", "Throttling", "Interactive", "Background", "Overload"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Los usuarios de un área de trabajo de Fabric reportan que sus informes de Power BI y consultas ad-hoc están sufriendo demoras de hasta 20 segundos para renderizar, y en la aplicación Fabric Capacity Metrics observas que la capacidad ha entrado en la fase de 'Interactive Delay' debido a un uso intensivo continuado de unidades de capacidad (CU). ¿Cuál es la diferencia entre operaciones interactivas y operaciones en segundo plano (Background) al gestionar la sobrecarga de la capacidad?",
    options: [
      {
        id: "opt_1",
        "text": "Las operaciones interactivas (consultas visuales de informes, DAX ad-hoc) se suavizan en ventanas cortas (5 minutos), mientras que las operaciones en segundo plano (refrescos de modelos, canalizaciones y trabajos de Spark) se distribuyen y suavizan a lo largo de una ventana de 24 horas.",
        "isCorrect": true,
        "rationale": "Fabric implementa un sistema de suavizado (smoothing): las operaciones interactivas se promedian en ventanas breves (5 minutos) para reflejar la demanda en tiempo real, mientras que las operaciones en segundo plano (jobs de Spark, Dataflows, scheduled refreshes) se distribuyen uniformemente a lo largo de 24 horas para absorber picos sin penalizar a los usuarios interactivos."
      },
      {
        id: "opt_2",
        "text": "Las operaciones interactivas son gratuitas y nunca consumen unidades de capacidad (CU).",
        "isCorrect": false,
        "rationale": "Todas las operaciones en Fabric consumen CUs de la capacidad asignada."
      },
      {
        id: "opt_3",
        "text": "Las operaciones en segundo plano siempre se cancelan automáticamente después de 60 segundos.",
        "isCorrect": false,
        "rationale": "Las operaciones en segundo plano pueden ejecutarse durante horas dentro de los límites de tiempo de cada servicio."
      },
      {
        id: "opt_4",
        "text": "La aplicación Fabric Capacity Metrics solo se puede instalar en teléfonos móviles con Android.",
        "isCorrect": false,
        "rationale": "La aplicación Fabric Capacity Metrics es una aplicación de plantilla de Power BI accesible desde el servicio web."
      }
    ],
    "explanation": "Fabric Capacity Metrics clasifica el consumo en Interactivo (suavizado en 5 minutos) y Background (suavizado en 24 horas), permitiendo que trabajos de datos pesados se distribuyan sin bloquear inmediatamente las consultas interactivas.",
    "theoryPill": {
      "title": "Gestión de Sobrecarga y Suavizado (Smoothing) en Microsoft Fabric",
      "summary": "Supervisión del consumo de CUs y prevención de estrangulamiento (throttling).",
      "keyPoints": [
        "Unidades de capacidad (CU): La unidad de medida de cómputo en todas las cargas de trabajo de Fabric.",
        "Interactive: Consultas de informes Power BI, consultas T-SQL exploratorias. Ventana de suavizado: 5 minutos.",
        "Background: Refrescos programados, canalizaciones de Data Factory, Notebooks de Spark. Ventana de suavizado: 24 horas.",
        "Estados de sobrecarga: Interactive Delay (las consultas se ralentizan deliberadamente) -> Interactive Rejection (las nuevas consultas se rechazan) -> Background Rejection."
      ],
      "examTrap": "Las operaciones en segundo plano (refrescos y Spark) se amortizan en una ventana de 24 horas en el algoritmo de suavizado de Fabric.",
      "searchQuery": "Fabric capacity metrics app smoothing throttling DP-600"
    },
    "references": [
      {
        "title": "Understand the Capacity Metrics app compute page | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page"
      }
    ]
  }
];

console.log(`Prepared second batch of ${dp600QuestionsPart2.length} questions for DP-600.`);
