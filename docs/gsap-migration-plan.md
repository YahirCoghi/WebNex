# GSAP Migration Plan

Fecha: 2026-06-12

## Resumen

WebNex usa GSAP como sistema de animacion para la landing renderizada. En esta fase `Process` se migro a GSAP, `Why` quedo sin dependencia de animacion externa y Framer Motion se retiro porque ya no quedan imports.

## Inventario de animaciones

| Archivo | Componente | Libreria | Trigger | Propiedades | Reduced motion | Riesgo |
| --- | --- | --- | --- | --- | --- | --- |
| `src/components/sections/Hero.tsx` | `Hero` | GSAP + SplitText | Mount | opacity, y, rotateX, yPercent | Si | Medio |
| `src/components/ui/DashboardMock.tsx` | `DashboardMock` | GSAP | Mount + pointermove | opacity, y, rotateX, scale, x, rotation | Si | Medio |
| `src/components/sections/Problem.tsx` | `Problem` | GSAP + ScrollTrigger + SplitText | Scroll enter | opacity, y, yPercent | Parcial | Bajo |
| `src/components/sections/Services.tsx` | `Services` | GSAP + ScrollTrigger + SplitText | Scroll enter | opacity, y, yPercent | Si | Bajo |
| `src/components/sections/Solutions.tsx` | `Solutions` | GSAP + ScrollTrigger + SplitText | Scroll enter | opacity, y, yPercent | Si | Bajo |
| `src/components/sections/Process.tsx` | `Process` | GSAP + SplitText | Scroll enter | opacity, y, scaleX, yPercent | Si | Bajo |
| `src/components/sections/ShowcaseClient.tsx` | `ShowcaseClient` | GSAP + SplitText | Scroll enter | opacity, y, yPercent | Parcial | Bajo |
| `src/components/sections/LeadMagnet.tsx` | `LeadMagnet` | GSAP + SplitText | Scroll enter | opacity, x, y, yPercent | Si | Bajo |
| `src/components/sections/StatsStrip.tsx` | `StatsStrip` | GSAP | Scroll enter | opacity, y | Parcial | Bajo |
| `src/components/ui/WaFloat.tsx` | `WaFloat` | Tailwind keyframes | Infinite loop | transform scale, opacity | Pendiente | Bajo |
| Varios componentes | Links/buttons/cards | CSS transitions | Hover/focus | transform, color, border, shadow | Browser default | Bajo |

## Estado actual

- GSAP esta centralizado en `src/lib/gsap.ts`.
- Plugins registrados: `useGSAP`, `ScrollTrigger`, `SplitText`, `CustomEase`.
- Easings creados: `nex-smooth`, `nex-sweep`.
- `Services` ya no usa pin horizontal; ahora usa grid para reducir riesgo de overflow y mejorar legibilidad.
- `Process` esta montado en la landing y usa timeline responsive con GSAP.
- No se agregaron librerias nuevas de animacion.

## Reglas para futuras animaciones

- Usar `@gsap/react` `useGSAP` con refs acotadas.
- Respetar `prefers-reduced-motion` antes de crear SplitText o timelines.
- Evitar selectores globales cuando un ref local pueda limitar scope.
- Animar `transform` y `opacity` para movimientos frecuentes.
- Evitar animar layout (`width`, `height`, `top`, `left`) salvo necesidad real.
- Llamar `revert()` en cada instancia de SplitText.
- Usar ScrollTrigger solo cuando la animacion dependa realmente del scroll.

## Pendientes

- Agregar reduced-motion explicito a `WaFloat`.
- Revisar `Problem`, `ShowcaseClient` y `StatsStrip` para homogeneizar reduced-motion.
- Validar visualmente con navegador real en desktop y mobile despues de cada cambio de animacion.
