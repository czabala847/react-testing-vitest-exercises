# Vitest + React Testing Library — Bitácora de configuración

Este repo es de práctica/aprendizaje de testing en React. Este README documenta, en orden cronológico, qué se instaló y qué se configuró para dejar el entorno de testing funcionando, para poder repetirlo en otro proyecto.

## 1. Vitest (test runner)

```bash
pnpm install -D vitest
```

Configuración en `vite.config.ts` (Vitest reutiliza la config de Vite):

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,        // permite usar describe/test/expect sin importarlos
    environment: 'jsdom',  // simula el DOM del navegador (necesario para testear componentes)
  },
})
```

Scripts en `package.json`:

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest run --coverage"
```

## 2. React Testing Library

```bash
pnpm install -D @testing-library/react @testing-library/dom @types/react @types/react-dom
```

- `@testing-library/react`: `render`, `screen`, etc. para testear componentes.
- `@testing-library/dom`: dependencia interna que usa RTL para las queries (`getByText`, `getByTestId`, ...).
- `@types/react` / `@types/react-dom`: tipados, necesarios aunque el proyecto ya use React, porque los tests importan JSX/React directamente.

## 3. jest-dom (matchers extra para el DOM)

```bash
pnpm install -D @testing-library/jest-dom
```

Sin esto, `expect(elemento).toBeInTheDocument()` no existe (ni en runtime ni en tipos): TypeScript tira `Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'`.

**Setup file** — `src/setupTests.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Se usa el entrypoint `/vitest` (no el genérico `@testing-library/jest-dom`) porque además de registrar los matchers en runtime, trae la extensión de tipos para el `expect` de Vitest sin tener que escribir un `declare module 'vitest'` a mano.

**Registrar el setup file en `vite.config.ts`:**

```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/setupTests.ts'],
},
```

Con esto matchers como `toBeInTheDocument`, `toHaveTextContent`, `toHaveClass`, etc. quedan disponibles y tipados en todos los tests.

## Estructura de un test típico

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { MyAwesomeApp } from "../MyAwesomeApp"

describe("MyAwesomeApp", () => {
  test("should render firstName and lastName", () => {
    render(<MyAwesomeApp />)

    expect(screen.getByTestId("name")).toBeInTheDocument()
  })
})
```

## Notas / troubleshooting

- Si el error de tipos de `toBeInTheDocument` persiste en el editor después de instalar y configurar todo, reiniciar el servidor de TypeScript de VSCode (`Ctrl+Shift+P` → "TypeScript: Restart TS Server").
- El `setupFiles` debe apuntar a un archivo dentro de `src` (o incluido por `tsconfig.app.json`) para que TypeScript lo tipe correctamente.

## Pendiente / por explorar

- [ ] `@testing-library/user-event` para simular interacciones de usuario (click, type) de forma más realista que `fireEvent`.
- [ ] Cobertura de tests (`vitest --coverage`, revisar qué proveedor usa — v8 o istanbul).
- [ ] MSW (Mock Service Worker) si se empiezan a testear componentes que hacen fetch.
