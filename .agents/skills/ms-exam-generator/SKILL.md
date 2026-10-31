---
name: ms-exam-generator
description: >-
  Skill oficial del proyecto MS Student Platform para diseñar, verificar y generar preguntas de certificación Microsoft (DP-900, DP-600, DP-700) con fidelidad Pearson VUE y validación directa contra el servidor MCP oficial de Microsoft Learn (https://learn.microsoft.com/api/mcp).
---

# Microsoft Certification Exam Authoring Skill (Pearson VUE Standard)

Esta skill define el estándar de calidad, estructura JSON y flujo de verificación documental mediante el MCP de Microsoft Learn (`https://learn.microsoft.com/api/mcp`) para el repositorio modular de preguntas (`data/dp900.json`, `data/dp600.json`, `data/dp700.json`).

## 1. Flujo de Verificación con Microsoft Learn MCP (`https://learn.microsoft.com/api/mcp`)

Puedes consultar el MCP ejecutando el script `node scripts/mcp-mslearn.js`:
- Buscar documentación oficial:
  `node scripts/mcp-mslearn.js search "<consulta>"`
- Buscar ejemplos de código oficiales (`sql`, `kusto`, `python`, `powershell`):
  `node scripts/mcp-mslearn.js code "<consulta>" "<lenguaje>"`
- Descargar página completa en Markdown:
  `node scripts/mcp-mslearn.js fetch "<url_microsoft_learn>"`

## 2. Tipologías Reales de Pearson VUE Soportadas

1. **Opción Única (`"questionType": "single"`)**:
   - Se renderiza con botones de radio (`○`).
   - Exactamente 1 opción tiene `"isCorrect": true` y 3 opciones tienen `"isCorrect": false`.
2. **Selección Múltiple (`"questionType": "multi"`, `"requiredSelections": 2`)**:
   - Muy común en exámenes oficiales de Microsoft (*"¿Qué DOS acciones debes realizar? Cada respuesta correcta presenta parte de la solución."*).
   - Se renderiza con casillas cuadradas (`☐`) en Pearson VUE.
   - Incluye entre 4 y 5 opciones, donde exactamente `requiredSelections` (ej. 2) tienen `"isCorrect": true`.
3. **Caso de Estudio con Pestañas (`"caseStudyTabs"`)**:
   - En Pearson VUE, los casos de estudio muestran pestañas a la izquierda (`overview`, `environment`, `requirements`).
   - Puedes incluir `"caseStudyTabs": { "overview": "...", "environment": "...", "requirements": "..." }` además o en lugar de `"caseStudy"`.

## 3. Esquema Exacto de cada Pregunta para el Modo Adaptativo y "Saber Más"

Cada objeto de pregunta debe seguir estrictamente esta estructura:

```json
{
  "id": "DP600-010",
  "certification": "DP-600",
  "domain": "Implement and manage semantic models",
  "topic": "Direct Lake",
  "topicIcon": "onelake",
  "tags": ["Direct Lake", "Fallback", "VertiPaq", "RLS"],
  "difficulty": "hardcore",
  "questionType": "single",
  "requiredSelections": 1,
  "hasCodeSnippet": false,
  "caseStudy": null,
  "caseStudyTabs": null,
  "stem": "Enunciado técnico claro al estilo Pearson VUE...",
  "codeSnippet": null,
  "codeLanguage": null,
  "options": [
    {
      "id": "opt_1",
      "text": "Texto de la opción...",
      "isCorrect": true,
      "rationale": "Explicación técnica de por qué esta opción es correcta."
    }
  ],
  "explanation": "Explicación global detallada de la respuesta...",
  "theoryPill": {
    "title": "Arquitectura y Límites de Direct Lake en Microsoft Fabric",
    "summary": "Resumen teórico profundo pero directo de cómo funciona el servicio por dentro.",
    "keyPoints": [
      "Punto clave 1 para recordar en el examen",
      "Punto clave 2 (regla de oro / límite técnico)",
      "Punto clave 3 (cuándo elegir este servicio frente a otro)"
    ],
    "examTrap": "Trampa típica de Pearson VUE: confundir RLS en el SQL Analytics Endpoint (causa fallback a DirectQuery) con RLS definido en el modelo semántico Direct Lake (soportado en memoria).",
    "searchQuery": "Microsoft Fabric Direct Lake overview fallback"
  },
  "references": [
    {
      "title": "Direct Lake overview - Microsoft Fabric | Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview"
    }
  ]
}
```

### Valores válidos para `topicIcon`:
- `"fabric"` (Microsoft Fabric general / Gobernanza / Workspaces / CI-CD)
- `"onelake"` (OneLake, Shortcuts, Delta Lake storage)
- `"lakehouse"` (Fabric Lakehouse, Medallion Architecture)
- `"warehouse"` (Fabric Data Warehouse, T-SQL, CTAS, COPY INTO)
- `"powerbi"` (Semantic Models, DAX, Direct Lake, VertiPaq, XMLA, Star Schema)
- `"kql"` (Real-Time Intelligence, Eventhouse, KQL Database, Eventstreams, Activator)
- `"spark"` (Apache Spark, PySpark, Notebooks, notebookutils, Spark UI)
- `"pipeline"` (Data Factory Pipelines, Dataflow Gen2, Orchestration)
- `"sql"` (Azure SQL Database, SQL Managed Instance, SQL Server on Azure VMs, ACID/OLTP)
- `"cosmos"` (Azure Cosmos DB, NoSQL, Gremlin, Cassandra, Table/Blob Storage)
- `"security"` (RLS, OLS, CLS, Dynamic Data Masking, Microsoft Purview, Entra ID)
