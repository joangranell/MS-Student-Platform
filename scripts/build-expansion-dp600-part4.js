/**
 * scripts/build-expansion-dp600-part4.js
 * Final 10 Questions for DP-600 (DP600-091 to DP600-100)
 */

export const dp600QuestionsPart4 = [
  {
    id: "DP600-091",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Jerarquías Padre-Hijo en DAX (Parent-Child Hierarchies)",
    topicIcon: "powerbi",
    tags: ["DAX", "Parent-Child", "PATH", "PATHITEM", "Hierarchy"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "RutaJerarquia = PATH(Employee[EmployeeKey], Employee[ManagerKey])",
    "codeLanguage": "DAX",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una tabla dimensional de empleados (Employees), la estructura organizativa de la empresa está modelada mediante una jerarquía padre-hijo (cada fila tiene EmployeeKey y ManagerKey que apunta a otro EmployeeKey de la misma tabla, con un número variable de niveles de profundidad). Necesitas desnaturalizar esta jerarquía en columnas calculadas de nivel fijo (Nivel 1 Director, Nivel 2 Gerente, etc.) para que los usuarios puedan utilizar una jerarquía navegable estándar en Power BI. ¿Qué conjunto de funciones DAX debes utilizar?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizar la función PATH() para generar la cadena de delimitación jerárquica y PATHITEM() para extraer el identificador de cada nivel específico.",
        "isCorrect": true,
        "rationale": "Las funciones de jerarquía padre-hijo de DAX (PATH, PATHITEM, PATHLENGTH, PATHCONTAINS) permiten transformar árboles recursivos no balanceados en columnas calculadas fijas para su uso en jerarquías visuales en Power BI."
      },
      {
        id: "opt_2",
        "text": "Crear un bucle FOR en lenguaje DAX que recorra los registros.",
        "isCorrect": false,
        "rationale": "DAX no dispone de bucles procedimentales tradicionales (FOR, WHILE); utiliza funciones especializadas de ruta como PATH."
      },
      {
        id: "opt_3",
        "text": "Eliminar todas las filas que no pertenezcan al director general.",
        "isCorrect": false,
        "rationale": "Eliminaría a todos los empleados de la empresa del modelo de análisis."
      },
      {
        id: "opt_4",
        "text": "Utilizar la función SUM() sobre el nombre del empleado.",
        "isCorrect": false,
        "rationale": "SUM no opera sobre cadenas de texto ni resuelve jerarquías recursivas."
      }
    ],
    "explanation": "La función DAX PATH() crea una cadena delimitada que representa la genealogía completa desde la raíz hasta el nodo actual, y PATHITEM() permite extraer el elemento en una posición determinada para construir columnas por nivel.",
    "theoryPill": {
      "title": "Resolución de Jerarquías Padre-Hijo en DAX",
      "summary": "Transformación de estructuras recursivas organizacionales en jerarquías tabulares.",
      "keyPoints": [
        "PATH(ID_Hijo, ID_Padre): Devuelve una cadena con la lista de identificadores delimitada por barras verticales (ej. '1|5|23').",
        "PATHITEM(Path, Posición, [Tipo]): Extrae el identificador en la posición indicada (ej. Posición 1 = Director raíz).",
        "LOOKUPVALUE: Se combina con PATHITEM para recuperar el nombre legible del gerente de cada nivel.",
        "PATHLENGTH(Path): Devuelve la profundidad o número de niveles en la jerarquía para esa fila."
      ],
      "examTrap": "Para aplanar jerarquías recursivas (empleados/gerentes) en Power BI, el patrón oficial consiste en usar PATH() y PATHITEM().",
      "searchQuery": "Parent-child hierarchies in DAX PATH PATHITEM DP-600"
    },
    "references": [
      {
        "title": "Understanding Functions for Parent-Child Hierarchies in DAX | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dax/understanding-functions-for-parent-child-hierarchies-in-dax"
      }
    ]
  },
  {
    id: "DP600-092",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Dimensiones de Cambio Lento (SCD Tipo 1 vs Tipo 2) en Microsoft Fabric",
    topicIcon: "warehouse",
    tags: ["SCD", "Type 1", "Type 2", "Data Modeling", "Warehouse", "History"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En el diseño del almacén de datos de Fabric, necesitas modelar la dimensión de clientes para que conserve el historial de cambios de dirección postal. Si un cliente se muda de Madrid a Barcelona, las ventas anteriores a la mudanza deben continuar atribuyéndose a la región 'Madrid' en los informes históricos, mientras que las ventas nuevas deben registrarse en 'Barcelona'. ¿Qué tipo de dimensión de cambio lento (Slowly Changing Dimension - SCD) se debe implementar?",
    options: [
      {
        id: "opt_1",
        "text": "Dimensión de cambio lento de Tipo 2 (SCD Tipo 2), introduciendo una clave subrogada (Surrogate Key), una fecha de inicio (StartDate), una fecha de fin (EndDate) y un indicador de registro actual (IsCurrent).",
        "isCorrect": true,
        "rationale": "SCD Tipo 2 preserva el historial completo insertando una nueva fila para cada cambio de atributos con una nueva clave subrogada y columnas de vigencia temporal (StartDate, EndDate, IsCurrent). Permite que las transacciones históricas se vinculen al registro vigente en el momento en que ocurrieron."
      },
      {
        id: "opt_2",
        "text": "Dimensión de cambio lento de Tipo 1 (SCD Tipo 1), sobrescribiendo directamente la columna de dirección en la fila existente.",
        "isCorrect": false,
        "rationale": "SCD Tipo 1 sobrescribe los datos existentes, destruyendo el histórico y reasignando retroactivamente todas las ventas pasadas a la nueva ciudad."
      },
      {
        id: "opt_3",
        "text": "Dimensión de cambio lento de Tipo 0 (SCD Tipo 0), rechazando cualquier cambio de dirección.",
        "isCorrect": false,
        "rationale": "SCD Tipo 0 trata los atributos como inmutables y no permite reflejar la nueva dirección."
      },
      {
        id: "opt_4",
        "text": "Crear una nueva tabla de base de datos para cada cliente individual.",
        "isCorrect": false,
        "rationale": "Es una pésima práctica arquitectónica que destruye el modelo dimensional relacional."
      }
    ],
    "explanation": "SCD Tipo 2 conserva el historial completo insertando una nueva versión del registro con claves subrogadas y fechas de vigencia, garantizando la fidelidad histórica de los informes analíticos.",
    "theoryPill": {
      "title": "Dimensiones de Cambio Lento (Slowly Changing Dimensions - SCD)",
      "summary": "Técnicas de gestión del cambio histórico en dimensiones de Data Warehouse.",
      "keyPoints": [
        "SCD Tipo 1: Sobrescribe el valor antiguo (no guarda historial). Ideal para corregir errores ortográficos.",
        "SCD Tipo 2: Inserta una nueva fila con nueva clave subrogada y marcas temporales (StartDate, EndDate, IsCurrent). Preserva el historial con precisión temporal.",
        "SCD Tipo 3: Añade columnas auxiliares en la misma fila (ej. CurrentCity, PreviousCity). Historial limitado a pocas versiones.",
        "Claves subrogadas: Esenciales en SCD Tipo 2 para que la tabla de hechos apunte a la versión temporal correcta de la dimensión."
      ],
      "examTrap": "Si el requerimiento exige que los informes históricos muestren el estado en el momento de la venta y no el actual, la solución es SCD Tipo 2.",
      "searchQuery": "Slowly changing dimensions SCD Type 2 Microsoft Fabric data warehouse DP-600"
    },
    "references": [
      {
        "title": "Dimensional modeling in a Microsoft Fabric warehouse | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-warehouse/dimensional-modeling"
      }
    ]
  },
  {
    id: "DP600-093",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Formato de Almacenamiento de Modelos Semánticos Grandes (Large Dataset Storage Format)",
    topicIcon: "powerbi",
    tags: ["Large Dataset", "Premium", "Capacity", "VertiPaq", "Memory"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un modelo semántico en modo Importación alojado en una capacidad de Microsoft Fabric crece más allá de 10 gigabytes. El límite predeterminado de tamaño de archivo de Power BI impide publicar o actualizar el modelo. ¿Qué configuración a nivel de modelo semántico o área de trabajo se debe activar para permitir que el modelo escale hasta el tamaño máximo de memoria disponible en la capacidad de Fabric?",
    options: [
      {
        id: "opt_1",
        "text": "Habilitar el formato de almacenamiento de modelos semánticos grandes (Large dataset storage format).",
        "isCorrect": true,
        "rationale": "El formato de almacenamiento de conjuntos de datos grandes (Large dataset storage format) elimina el límite estándar de 10 GB de archivos .pbix comprimidos, permitiendo que los modelos crezcan hasta el límite de memoria asignado a la SKU de capacidad de Fabric o Premium."
      },
      {
        id: "opt_2",
        "text": "Comprimir el archivo con WinRAR y renombrarlo a .pbix.",
        "isCorrect": false,
        "rationale": "Power BI no reconoce archivos creados con compresores externos no estándar."
      },
      {
        id: "opt_3",
        "text": "Convertir todas las columnas del modelo a tipo booleano (True/False).",
        "isCorrect": false,
        "rationale": "Destruiría la precisión y los datos numéricos y textuales de negocio."
      },
      {
        id: "opt_4",
        "text": "Eliminar el 90% de las filas de transacciones históricas.",
        "isCorrect": false,
        "rationale": "Eliminar datos de negocio vulnera los requerimientos de análisis histórico."
      }
    ],
    "explanation": "Large dataset storage format permite a los modelos semánticos de Power BI superar la barrera histórica de 10 GB, escalando hasta cientos de gigabytes según la memoria de la capacidad.",
    "theoryPill": {
      "title": "Formato de Modelos Semánticos Grandes (Large Datasets)",
      "summary": "Escalabilidad para modelos empresariales de cientos de gigabytes.",
      "keyPoints": [
        "Límite estándar: 10 GB después de la compresión en modelos de Power BI sin Large Datasets activado.",
        "Con Large Datasets activado: El límite pasa a ser el tamaño máximo de memoria admitido por la capacidad de Fabric/Premium (ej. cientos de GB).",
        "Optimización de escritura: Los datos se almacenan y actualizan directamente en la memoria de la capacidad optimizando operaciones XMLA y de refresco.",
        "Requisito: Área de trabajo asignada a capacidad Premium (P/EM) o Fabric (F)."
      ],
      "examTrap": "Para modelos en modo Importación mayores de 10 GB en capacidades Premium/Fabric, activa 'Large dataset storage format'.",
      "searchQuery": "Large dataset storage format in Power BI Premium Fabric DP-600"
    },
    "references": [
      {
        "title": "Large semantic models in Power BI Premium | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-large-models"
      }
    ]
  },
  {
    id: "DP600-094",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Roles de Área de Trabajo vs Permisos de Elemento en Microsoft Fabric",
    topicIcon: "fabric",
    tags: ["Security", "Workspace Roles", "Item Permissions", "Admin", "Viewer", "Build"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En Microsoft Fabric, deseas que un grupo de analistas de negocio pueda crear nuevos informes propios conectándose a un modelo semántico existente en un área de trabajo, pero SIN darles acceso de lectura ni permisos para ver o modificar los cuadernos de notas de Spark, canalizaciones de datos o tablas intermedias de esa misma área de trabajo. ¿Cómo debes configurar la seguridad?",
    options: [
      {
        id: "opt_1",
        "text": "No asignar a los analistas ningún rol en el área de trabajo; en su lugar, compartir exclusivamente el modelo semántico específico otorgándoles permisos de Lectura y Compilación (Read and Build permissions).",
        "isCorrect": true,
        "rationale": "Los permisos de elemento (Item Permissions) permiten otorgar acceso pormenorizado sin pertenencia al área de trabajo. El permiso 'Build' en un modelo semántico permite al usuario crear nuevos informes, consultar el modelo mediante Excel o XMLA y generar modelos compuestos, sin ver otros elementos del área de trabajo."
      },
      {
        id: "opt_2",
        "text": "Asignar a los analistas el rol de 'Colaborador' (Contributor) en el área de trabajo.",
        "isCorrect": false,
        "rationale": "El rol Contributor otorga acceso completo de edición a todos los artefactos del área de trabajo (incluidos notebooks, pipelines y Lakehouses)."
      },
      {
        id: "opt_3",
        "text": "Asignar a los analistas el rol de 'Administrador' (Admin) en el área de trabajo.",
        "isCorrect": false,
        "rationale": "El rol Admin otorga control destructivo total sobre toda el área de trabajo."
      },
      {
        id: "opt_4",
        "text": "Publicar las credenciales de administrador en un canal público de Teams.",
        "isCorrect": false,
        "rationale": "Vulnera gravemente todas las normas de seguridad corporativa."
      }
    ],
    "explanation": "Para permitir el autoservicio seguro sobre un modelo semántico sin exponer el resto de los artefactos de datos del área de trabajo, se comparten permisos de elemento individuales con 'Read' y 'Build'.",
    "theoryPill": {
      "title": "Roles de Área de Trabajo vs Permisos de Elemento en Fabric",
      "summary": "Gobierno de acceso con principio de mínimo privilegio.",
      "keyPoints": [
        "Roles de área de trabajo: Admin, Member, Contributor, Viewer (aplican a TODOS los elementos dentro del área de trabajo).",
        "Viewer en área de trabajo: Permite leer datos pero ve la lista de todos los artefactos.",
        "Permisos de elemento (Item Permissions): Read (ver informes), ReadData (consultar tablas Delta), Build (crear nuevo contenido sobre el modelo semántico), Reshare (compartir con otros).",
        "Permiso Build: Esencial para que los usuarios puedan crear informes secundarios en sus propias áreas de trabajo conectándose al modelo certificado."
      ],
      "examTrap": "Para permitir que un usuario cree informes sobre un modelo semántico SIN darle acceso al área de trabajo donde reside, concédele permiso de 'Compilación' (Build).",
      "searchQuery": "Build permission for shared semantic models Power BI DP-600"
    },
    "references": [
      {
        "title": "Build permission for shared semantic models | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-build-permissions"
      }
    ]
  },
  {
    id: "DP600-095",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Orquestación de Modelos Semánticos en Fabric Data Pipelines",
    topicIcon: "pipeline",
    tags: ["Data Pipelines", "Semantic Model Refresh", "Orchestration", "Dependencies"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una solución analítica de Fabric de extremo a extremo, una canalización de datos (Data Pipeline) extrae datos de un ERP mediante Copy Activity y ejecuta un Notebook de PySpark que actualiza las tablas Delta en el Lakehouse. Necesitas que, inmediatamente después de que el Notebook finalice con éxito, el modelo semántico de Power BI se actualice automáticamente para que los usuarios vean los datos frescos sin esperar a una hora fija del programador. ¿Qué actividad nativa debes encadenar en la canalización?",
    options: [
      {
        id: "opt_1",
        "text": "La actividad de actualización del modelo semántico de Power BI (Semantic model refresh activity).",
        "isCorrect": true,
        "rationale": "Fabric Data Factory incluye una actividad nativa 'Semantic model refresh' que permite disparar de forma orquestada la actualización de un modelo semántico inmediatamente tras la finalización exitosa de los pasos de ingesta previos."
      },
      {
        id: "opt_2",
        "text": "Una actividad de tipo Espera (Wait) de 24 horas.",
        "isCorrect": false,
        "rationale": "Una espera no dispara la actualización del modelo y retrasa la disponibilidad de los datos."
      },
      {
        id: "opt_3",
        "text": "Enviar un mensaje por correo electrónico pidiendo al analista que haga clic en 'Actualizar'.",
        "isCorrect": false,
        "rationale": "No es una solución automatizada de orquestación analítica continua."
      },
      {
        id: "opt_4",
        "text": "La actividad de eliminación de archivos (Delete activity).",
        "isCorrect": false,
        "rationale": "La actividad Delete borraría archivos en lugar de actualizar el modelo semántico."
      }
    ],
    "explanation": "La actividad 'Semantic model refresh' en Fabric Data Pipelines permite orquestar de forma dirigida por eventos la actualización de modelos semánticos en cuanto terminan las fases previas de carga de datos.",
    "theoryPill": {
      "title": "Orquestación de Refrescos de Modelos Semánticos con Data Pipelines",
      "summary": "Canalizaciones guiadas por eventos en lugar de programaciones rígidas.",
      "keyPoints": [
        "Ventaja sobre programación horaria: Evita condiciones de carrera donde el modelo se actualiza antes de que la carga del Data Lake haya terminado.",
        "Dependencias: Permite encadenar el refresco solo ante la condición de éxito ('Upon completion / Success') del Notebook o Dataflow.",
        "Parámetros: Permite especificar el modelo semántico y configurar si la actividad espera a que el refresco termine antes de continuar con la siguiente actividad.",
        "Gestión de errores: Si el refresco falla, la canalización puede enviar alertas automáticas por Teams o correo."
      ],
      "examTrap": "Para actualizar un modelo semántico automáticamente tras finalizar una ingesta en Fabric, usa la actividad 'Semantic model refresh' en el pipeline.",
      "searchQuery": "Semantic model refresh activity in Fabric data pipeline DP-600"
    },
    "references": [
      {
        "title": "Semantic model refresh activity in Data Factory for Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/data-factory/semantic-model-refresh-activity"
      }
    ]
  },
  {
    id: "DP600-096",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Optimización de M en Power Query: Table.Buffer()",
    topicIcon: "pipeline",
    tags: ["Power Query", "Table.Buffer", "Performance", "Memory", "Mashup"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "BufferedDimension = Table.Buffer(SourceDimensionTable)",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un script avanzado de Power Query (lenguaje M), estás realizando una operación de combinación (Merge) o búsqueda iterativa fila por fila contra una tabla de referencia pequeña (ej. 5.000 filas) a lo largo de una tabla principal de 2 millones de filas. Observas que el motor Mashup evalúa y solicita repetidamente la tabla pequeña millones de veces. ¿Cómo se puede almacenar en memoria temporal la tabla de referencia pequeña para evitar solicitudes redundantes?",
    options: [
      {
        id: "opt_1",
        "text": "Utilizando la función Table.Buffer() sobre la tabla pequeña de referencia antes de la operación de combinación.",
        "isCorrect": true,
        "rationale": "Table.Buffer() carga una tabla completa en memoria RAM del motor Mashup, aislando su evaluación de llamadas repetidas subsiguientes. En combinaciones locales donde una tabla pequeña se consulta millones de veces de forma no plegada, el uso selectivo de Table.Buffer() puede acelerar el tiempo de carga drásticamente."
      },
      {
        id: "opt_2",
        "text": "Aplicando Table.Buffer() a la tabla principal de 2 millones de filas.",
        "isCorrect": false,
        "rationale": "Hacer buffer de tablas gigantescas satura la memoria del equipo o contenedor provocando errores de desbordamiento de memoria (OutOfMemory)."
      },
      {
        id: "opt_3",
        "text": "Cerrar Power BI Desktop y no volver a abrirlo.",
        "isCorrect": false,
        "rationale": "No resuelve el problema de ingeniería de datos."
      },
      {
        id: "opt_4",
        "text": "Eliminar todas las claves de combinación de ambas tablas.",
        "isCorrect": false,
        "rationale": "Sin claves de combinación no es posible relacionar los datos."
      }
    ],
    "explanation": "Table.Buffer() aísla y memoriza en RAM una tabla pequeña de referencia, evitando que el evaluador perezoso de Power Query reevalúe la misma consulta miles de veces durante iteraciones no plegadas.",
    "theoryPill": {
      "title": "Uso Estratégico de Table.Buffer() en Power Query",
      "summary": "Memorización de tablas auxiliares para optimizar bucles y combinaciones locales.",
      "keyPoints": [
        "Comportamiento: Forza la lectura inmediata y retención completa de la tabla en memoria.",
        "Cuándo usarlo: Exclusivamente sobre tablas pequeñas de referencia o dimensiones auxiliares en combinaciones pesadas no plegables.",
        "Cuándo evitarlo: Rompe el plegado de consultas (Query Folding) y nunca debe aplicarse sobre tablas de hechos grandes.",
        "Evaluación perezosa (Lazy evaluation): Por defecto Power Query evalúa solo lo necesario; Table.Buffer() convierte la evaluación en entusiasta (eager)."
      ],
      "examTrap": "Table.Buffer() rompe el Query Folding; úsalo solo cuando la consulta ya no pliega y requieras fijar una tabla pequeña en memoria para acelerar un Merge.",
      "searchQuery": "Power Query Table.Buffer performance guidance DP-600"
    },
    "references": [
      {
        "title": "Table.Buffer - PowerQuery M | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/powerquery-m/table-buffer"
      }
    ]
  },
  {
    id: "DP600-097",
    certification: "DP-600",
    domain: "Prepare data",
    topic: "Decisión Arquitectónica: Fabric Notebooks (PySpark) vs Dataflows Gen2",
    topicIcon: "spark",
    tags: ["Notebooks", "Dataflows Gen2", "PySpark", "Power Query", "Architecture"],
    difficulty: "intermediate",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Un equipo de analistas de negocio con amplios conocimientos en fórmulas de Excel y Power Query necesita limpiar y enriquecer datos tabulares departamentales sin escribir código de programación. Por otro lado, un equipo de ingenieros de datos necesita procesar diariamente 10 terabytes de archivos semiestructurados con transformaciones complejas de machine learning y optimización pormenorizada de particiones en clúster. ¿Qué herramienta de Fabric debe asignarse a cada equipo respectivamente?",
    options: [
      {
        id: "opt_1",
        "text": "Dataflows Gen2 (interfaz visual sin código / bajo código de Power Query) para los analistas de negocio, y Fabric Notebooks (PySpark con computación elástica distribuida) para los ingenieros de datos.",
        "isCorrect": true,
        "rationale": "Dataflows Gen2 ofrece la experiencia familiar de Power Query basada en GUI para transformaciones de bajo código, mientras que los Notebooks de Apache Spark ofrecen la potencia, paralelismo y bibliotecas avanzadas de PySpark/Scala necesarias para macrodatos a escala de terabytes."
      },
      {
        id: "opt_2",
        "text": "Fabric Notebooks para los analistas sin experiencia en código y Microsoft Word para los ingenieros.",
        "isCorrect": false,
        "rationale": "Los analistas sin código encontrarían frustrante escribir código en Notebooks y Word no es una herramienta de ingeniería de datos."
      },
      {
        id: "opt_3",
        "text": "Ambos equipos deben usar exclusivamente la calculadora de Windows.",
        "isCorrect": false,
        "rationale": "La calculadora de Windows no es una plataforma analítica empresarial en la nube."
      },
      {
        id: "opt_4",
        "text": "Dataflows Gen2 para los 10 TB de macrodatos y Notebooks para hojas de cálculo de 50 filas.",
        "isCorrect": false,
        "rationale": "Invierte por completo la arquitectura óptima y los puntos fuertes de cada tecnología."
      }
    ],
    "explanation": "Dataflows Gen2 es la opción de bajo código preferida para usuarios de negocio y analistas, mientras que Fabric Notebooks con Spark es la solución de escala masiva para ingeniería de datos pesada.",
    "theoryPill": {
      "title": "Criterios de Elección: Dataflows Gen2 vs Fabric Notebooks",
      "summary": "Selección de motor según perfil de usuario, volumen y complejidad.",
      "keyPoints": [
        "Dataflows Gen2: Interfaz visual basada en Power Query, sin código/bajo código, ideal para analistas de BI, volúmenes pequeños y medianos (< 100 GB).",
        "Fabric Notebooks: Entorno de código en PySpark/Scala/SQL, computación masivamente paralela (Spark Pools), ideal para ingenieros y científicos de datos, terabytes de datos, ML y streaming.",
        "Destino común: Ambas herramientas escriben en tablas Delta Parquet dentro de OneLake.",
        "Orquestación: Ambas se pueden orquestar y encadenar como actividades dentro de Fabric Data Pipelines."
      ],
      "examTrap": "Bajo código / experiencia Power Query = Dataflow Gen2; Grandes volúmenes (> TB) / código Python distribuido = Fabric Notebooks.",
      "searchQuery": "Choose between Dataflows and Notebooks Microsoft Fabric DP-600"
    },
    "references": [
      {
        "title": "Data Factory and Data Engineering in Microsoft Fabric | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/get-started/decision-guide"
      }
    ]
  },
  {
    id: "DP600-098",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "Etiquetas de Sensibilidad de Microsoft Purview en Fabric",
    topicIcon: "security",
    tags: ["Microsoft Purview", "Sensitivity Labels", "Information Protection", "Security", "DLP"],
    difficulty: "basic",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "Una entidad bancaria necesita garantizar que si un analista aplica la etiqueta de confidencialidad 'Altamente Confidencial' a un modelo semántico en Microsoft Fabric, cualquier informe de Power BI derivado de ese modelo y cualquier archivo de Excel descargado mediante la opción 'Analizar en Excel' o exportado a PDF herede automáticamente la misma etiqueta de protección y el cifrado de derechos digitales de Microsoft Purview. ¿Qué funcionalidad proporciona esta protección descendente continua?",
    options: [
      {
        id: "opt_1",
        "text": "Herencia descendente de etiquetas de confidencialidad de Microsoft Purview Information Protection.",
        "isCorrect": true,
        "rationale": "Purview Information Protection en Microsoft Fabric y Power BI admite la herencia descendente (downstream inheritance): cuando se aplica una etiqueta a un modelo semántico, los informes construidos sobre él heredan automáticamente la etiqueta, y al exportar a Excel, PowerPoint o PDF el archivo resultante conserva el cifrado y las restricciones de derechos."
      },
      {
        id: "opt_2",
        "text": "Poner una contraseña en el archivo ZIP del informe.",
        "isCorrect": false,
        "rationale": "No proporciona herencia automatizada corporativa basada en directivas de Purview."
      },
      {
        id: "opt_3",
        "text": "Desactivar la exportación a Excel para todos los usuarios del mundo.",
        "isCorrect": false,
        "rationale": "Es una medida indiscriminada que no utiliza las capacidades de clasificación de Purview."
      },
      {
        id: "opt_4",
        "text": "Cambiar el tema visual de Power BI a color rojo.",
        "isCorrect": false,
        "rationale": "Los temas visuales no aplican directivas de cifrado ni seguridad de la información."
      }
    ],
    "explanation": "La herencia de etiquetas de confidencialidad de Microsoft Purview garantiza que la clasificación de datos sensibles se propague automáticamente desde los modelos semánticos hacia los informes e incluso los archivos exportados.",
    "theoryPill": {
      "title": "Etiquetas de Confidencialidad y DLP en Microsoft Fabric",
      "summary": "Protección de datos de extremo a extremo con Microsoft Purview.",
      "keyPoints": [
        "Herencia descendente: Aplicar una etiqueta a un Lakehouse o modelo semántico propaga automáticamente la etiqueta a los informes downstream.",
        "Protección en exportación: Al exportar a Excel, CSV o PDF, los archivos quedan cifrados según las políticas de Information Protection de la organización.",
        "Políticas DLP (Data Loss Prevention): Detectan automáticamente datos sensibles (números de tarjeta, DNI) y muestran advertencias o bloquean el uso compartido.",
        "Auditoría: Los registros de acceso e inspección se registran en el portal de cumplimiento de Purview."
      ],
      "examTrap": "Las etiquetas de Purview persisten y protegen los datos INCLUSO cuando se exportan a archivos Excel fuera del servicio Power BI.",
      "searchQuery": "Sensitivity labels in Power BI Microsoft Purview DP-600"
    },
    "references": [
      {
        "title": "Sensitivity labels in Power BI | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-security-sensitivity-label-overview"
      }
    ]
  },
  {
    id: "DP600-099",
    certification: "DP-600",
    domain: "Maintain a data analytics solution",
    topic: "API REST de Actualización Mejorada de Modelos Semánticos (Enhanced Refresh REST API)",
    topicIcon: "fabric",
    tags: ["REST API", "Enhanced Refresh", "TMSL", "CommitMode", "Partial Refresh"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": true,
    "codeSnippet": "POST https://api.powerbi.com/v1.0/myorg/groups/{groupId}/datasets/{datasetId}/refreshes\n{\n  \"type\": \"Full\",\n  \"commitMode\": \"transactional\",\n  \"maxParallelism\": 4,\n  \"objects\": [\n    { \"table\": \"FactSales\", \"partition\": \"FactSales_2024Q1\" }\n  ]\n}",
    "codeLanguage": "yaml",
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En una arquitectura analítica empresarial, necesitas actualizar únicamente una partición histórica específica ('FactSales_2024Q1') de una tabla de hechos masiva sin refrescar el resto del modelo semántico de 200 GB, y requieres la capacidad de cancelar la operación en curso si supera los 30 minutos. ¿Qué método de automatización proporciona esta granularidad de procesamiento?",
    options: [
      {
        id: "opt_1",
        "text": "La API REST de actualización mejorada de Power BI (Enhanced Refresh REST API).",
        "isCorrect": true,
        "rationale": "La Enhanced Refresh REST API para modelos en capacidades Fabric/Premium permite actualizar tablas o particiones individuales, definir el modo de confirmación transaccional (`commitMode`), controlar el paralelismo (`maxParallelism`), consultar el estado detallado de cada partición y cancelar actualizaciones en curso mediante HTTP DELETE."
      },
      {
        id: "opt_2",
        "text": "Hacer clic en el botón 'Actualizar ahora' en la interfaz web de Power BI.",
        "isCorrect": false,
        "rationale": "El botón 'Actualizar ahora' de la interfaz estándar ejecuta un refresco completo de todo el modelo y no permite seleccionar particiones individuales."
      },
      {
        id: "opt_3",
        "text": "Descargar el .pbix a Power BI Desktop y pulsar F5.",
        "isCorrect": false,
        "rationale": "Power BI Desktop no admite refrescos de particiones individuales específicas de modelos remotos de 200 GB."
      },
      {
        id: "opt_4",
        "text": "Crear un acceso directo en el escritorio de Windows.",
        "isCorrect": false,
        "rationale": "No tiene ninguna relación con las APIs REST de procesamiento analítico en la nube."
      }
    ],
    "explanation": "La API REST de actualización mejorada permite actualizar particiones específicas a nivel de objeto, controlar el paralelismo y cancelar operaciones de procesamiento de modelos semánticos en Fabric.",
    "theoryPill": {
      "title": "API de Actualización Mejorada (Enhanced Refresh REST API)",
      "summary": "Procesamiento pormenorizado y programático de particiones de modelos semánticos.",
      "keyPoints": [
        "Nivel de objeto: Permite enviar un cuerpo JSON especificando tablas y particiones exactas a procesar.",
        "CommitMode: 'transactional' (todo o nada en una única transacción) o 'partialBatch' (confirma por lotes).",
        "Control de paralelismo: 'maxParallelism' limita cuántos hilos procesan simultáneamente para no saturar orígenes relacionales.",
        "Cancelación: Admite llamadas HTTP DELETE para cancelar un refresco largo que esté consumiendo excesiva memoria o capacidad."
      ],
      "examTrap": "Para refrescar una única partición específica mediante API en lugar de todo el modelo, se utiliza la 'Enhanced Refresh REST API'.",
      "searchQuery": "Enhanced refresh with the Power BI REST API DP-600"
    },
    "references": [
      {
        "title": "Enhanced refresh with the Power BI REST API | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/power-bi/connect-data/asynchronous-refresh"
      }
    ]
  },
  {
    id: "DP600-100",
    certification: "DP-600",
    domain: "Implement and manage semantic models",
    topic: "Enmarcado Direct Lake (Direct Lake Framing & Automatic Sync)",
    topicIcon: "onelake",
    tags: ["Direct Lake", "Framing", "Delta Lake", "Sync", "Low Latency"],
    difficulty: "hardcore",
    questionType: "single",
    requiredSelections: 1,
    "hasCodeSnippet": false,
    caseStudy: null,
    caseStudyTabs: null,
    stem: "En un modelo semántico en modo Direct Lake sobre un Fabric Lakehouse, un Notebook de Spark escribe nuevas filas en la tabla Delta subyacente cada 10 minutos. Necesitas comprender el proceso por el cual el modelo semántico en memoria detecta y carga la última confirmación de transacciones (Delta commit) sin requerir un proceso de refresco pesado de datos. ¿Cómo se denomina este proceso interno de sincronización de metadatos en Direct Lake?",
    options: [
      {
        id: "opt_1",
        "text": "Enmarcado de Direct Lake (Direct Lake Framing / Framing the model).",
        "isCorrect": true,
        "rationale": "El enmarcado (Framing) es el proceso mediante el cual el motor de Direct Lake actualiza sus metadatos internos para apuntar a la versión más reciente del registro de transacciones de Delta Lake (_delta_log). Es una operación ligera de metadatos (tarda menos de 1 segundo) que no mueve ni copia datos y puede ocurrir automáticamente o dispararse mediante una actualización de metadatos."
      },
      {
        id: "opt_2",
        "text": "Reinstalación del sistema operativo del clúster de Spark.",
        "isCorrect": false,
        "rationale": "No interviene en la sincronización de metadatos de modelos semánticos en OneLake."
      },
      {
        id: "opt_3",
        "text": "Conversión forzada a Microsoft Access MDB.",
        "isCorrect": false,
        "rationale": "Microsoft Access no forma parte de la arquitectura en memoria de Direct Lake en Fabric."
      },
      {
        id: "opt_4",
        "text": "Ejecución de un comando TRUNCATE TABLE sobre todas las tablas Delta.",
        "isCorrect": false,
        "rationale": "TRUNCATE borraría todos los datos de la empresa en lugar de sincronizarlos."
      }
    ],
    "explanation": "El enmarcado (Framing) en Direct Lake es la operación ultrarrápida de sincronización de metadatos en la que el motor VertiPaq lee el registro de transacciones de Delta Lake y actualiza sus punteros a las columnas de la última versión.",
    "theoryPill": {
      "title": "Enmarcado (Framing) en Modelos Direct Lake",
      "summary": "Sincronización instantánea de metadatos con el registro Delta de OneLake.",
      "keyPoints": [
        "Definición: 'Framing' es el acto de sincronizar la vista del modelo semántico con la última instantánea de la tabla Delta.",
        "Velocidad: Como los datos residen en OneLake en formato Parquet, el 'refresco' de un modelo Direct Lake solo consiste en actualizar punteros de metadatos (menos de 1 segundo).",
        "Sincronización automática: Direct Lake puede enmarcarse automáticamente cuando se consulta el informe si hay nuevas confirmaciones Delta.",
        "Aislamiento de transacciones: Garantiza que los informes vean una instantánea consistente del lago sin lecturas sucias durante cargas de Spark en curso."
      ],
      "examTrap": "El refresco de un modelo Direct Lake no descarga datos; simplemente realiza 'Framing' (actualización del puntero al último commit del delta log).",
      "searchQuery": "Direct Lake framing Microsoft Fabric Power BI DP-600"
    },
    "references": [
      {
        "title": "Direct Lake overview - Framing | Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview#framing"
      }
    ]
  }
];

console.log(`Prepared fourth batch of ${dp600QuestionsPart4.length} questions for DP-600.`);
