# WebNex Code Audit

Fecha: 2026-06-12

## Resumen ejecutivo

WebNex es una landing bilingue de NexSystems con foco actual en web estrategica, software a medida y automatizacion para empresas. Usa Next.js 14.2.35, React 18, Tailwind 3, next-intl, GSAP, Resend y Google Analytics Data API.

No se encontraron Auth.js, Drizzle, base de datos, AI SDK, artifacts, file uploads, Vitest ni Playwright.

## Inventario

Rutas App Router:

- `/`: redirige a `/es`.
- `/[locale]`: landing SSG para `/es` y `/en`.
- `/api/auditoria`: API route `POST`, runtime `nodejs`, guarda leads por Resend, Google Sheets webhook o fallback local.
- `/api/analytics/hero`: API route `GET`, runtime `nodejs`, consulta GA4.
- `/robots.txt` y `/sitemap.xml`: rutas generadas por Next.

Server Components:

- `src/app/layout.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/page.tsx`
- `src/components/sections/Showcase.tsx`
- `src/components/sections/CtaFinal.tsx`, no montado actualmente.

Client Components:

- `Navbar`, `WaFloat`, `Button`, `DashboardMock`
- `Hero`, `Problem`, `Services`, `Solutions`, `Process`, `ShowcaseClient`, `LeadMagnet`
- `Why` y `StatsStrip`, conservados pero no montados actualmente.
- `src/lib/gsap.ts` registra GSAP plugins del lado cliente.

API, datos y servicios:

- `POST /api/auditoria` valida con Zod y recibe `nombre`, `email`, `empresa`, `url` opcional, `solutionType` y `message`.
- `GET /api/analytics/hero` usa `@google-analytics/data`.
- No hay base de datos, migraciones ni ORM.
- No hay autenticacion.
- No hay uploads de archivos.
- No hay integracion AI SDK.

Variables de entorno:

- Publicas: `NEXT_PUBLIC_WA_NUMBER`, `NEXT_PUBLIC_GA4_ID`.
- Servidor: `RESEND_API_KEY`, `EMAIL_TO`, `GOOGLE_SHEETS_WEBHOOK_URL`, `GA4_PROPERTY_ID`, `GA4_SERVICE_ACCOUNT_EMAIL`, `GA4_SERVICE_ACCOUNT_PRIVATE_KEY`, `GA4_HERO_DAYS`.

Scripts:

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run start`

## Hallazgos clasificados

### Critical

- `npm audit` reporta vulnerabilidades transitivas existentes. No se aplico `npm audit fix --force` porque podria implicar cambios mayores fuera del alcance de esta fase.

### High

- `next@14.2.35` aparece afectado por advisories actuales en `npm audit`. El upgrade sugerido por npm apunta a una version major y requiere PR separado.
- La carga de GA4 se movio a estrategia no bloqueante con `next/script`.
- `Resend` se inicializa de forma lazy dentro del handler.
- `POST /api/auditoria` ya no devuelve detalles internos de entrega al navegador.

### Medium

- Hay componentes no montados: `Why`, `StatsStrip`, `CtaFinal`. No se eliminan hasta confirmar si son contenido futuro.
- Hay muchos colores hardcodeados y gradientes inline en clases Tailwind. No se cambiaron masivamente para evitar regresiones visuales.
- `src/app/[locale]/layout.tsx` usa `dangerouslySetInnerHTML` para JSON-LD y GA config. El GA id se valida con regex antes de interpolarse; JSON-LD usa `JSON.stringify`.
- `/en` hereda `<html lang="es">` por la forma actual del root layout. Queda como riesgo pendiente porque una solucion SSR completa requiere reorganizar layouts en un PR separado.
- No hay tests automatizados para formulario, menu movil ni APIs.

### Low

- `public/next.svg` y `public/vercel.svg` parecen residuos de template. No hay referencias en el codigo.
- `allowJs` esta en `false`; no hay `.js/.jsx` de aplicacion.
- `console.error` existe en API routes. Se mantiene porque solo registra errores del servidor y las respuestas al cliente son genericas.

### Keep as-is

- `middleware.ts` se mantiene porque Next.js 14 usa middleware; la migracion a `proxy.ts` aplica a Next 16.
- `skipLibCheck` se mantiene para evitar ruido de terceros durante esta limpieza.
- `gsap` y `@gsap/react` se mantienen porque son parte central de la experiencia.
- `package-lock.json` se mantiene; no se migra a pnpm.

## Dependencias

Dependencias directas relevantes:

- Usadas: `next`, `react`, `react-dom`, `next-intl`, `gsap`, `@gsap/react`, `react-hook-form`, `@hookform/resolvers`, `zod`, `resend`, `@google-analytics/data`.
- Removidas: `@next/third-parties` y Framer Motion.

Dependencias con atencion futura:

- `next` y `eslint-config-next`: revisar upgrade mayor en una fase separada.
- `next-intl`, `resend` y dependencias transitivas de Google Analytics: revisar actualizaciones compatibles.

## Codigo no alcanzado y propuestas

- `Why`, `StatsStrip`, `CtaFinal`: no hay imports actuales. Se conservan por posible uso futuro.
- `public/next.svg` y `public/vercel.svg`: candidatos a eliminar si el propietario confirma que no se usan externamente.

## Notas de base de datos y migraciones

No hay Drizzle, Prisma, SQL, migraciones ni tablas en este repo. El build no ejecuta mutaciones de base de datos.

## Decisiones pendientes

- Confirmar si `Why`, `StatsStrip` y `CtaFinal` deben volver a la landing o eliminarse.
- Definir si el proyecto debe migrar a una version mayor de Next/React en un PR separado.
- Definir si se agregan Playwright o pruebas unitarias en una fase posterior.
- Revisar copia comercial, precios y enlaces legales antes de publicar cambios de contenido.
