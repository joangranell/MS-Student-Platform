# Política de Trabajo Git: Repositorio Privado de Desarrollo vs Público

> [!IMPORTANT]
> **REGLA PERMANENTE DE FLUJO DE TRABAJO (MEMORIZADA):**
> 
> 1. **Repositorio de Desarrollo (Privado - `MS-Student-Platform-Dev`):**
>    - Cualquier cambio rutinario, nueva funcionalidad, ajuste de preguntas o código que solicite el usuario se desarrollará, confirmará y subirá **SIEMPRE** al repositorio privado de desarrollo (`MS-Student-Platform-Dev`).
>    - Todos los comentarios de commits, iteraciones y pruebas intermedias se mantienen exclusivamente en este repositorio privado para proteger la privacidad del proceso de desarrollo.
> 
> 2. **Repositorio Público (`MS-Student-Platform` - Rama `Public`):**
>    - **NUNCA** se suben cambios intermedios de desarrollo directamente a la rama pública ni al repositorio público.
>    - **ÚNICAMENTE** se publicará en la rama `Public` del repositorio público cuando el usuario lo solicite de **manera expresa** (ej. *"publica en público"*, *"sube a la rama public"*, *"haz release pública"*).
>    - En ese momento, se consolidará el proyecto en un commit limpio y profesional de versión, sin exponer los comentarios de commits intermedios de desarrollo.
