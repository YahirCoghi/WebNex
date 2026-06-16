# WebNex / NexSystems

Landing bilingue de NexSystems para comunicar web estrategica, software a medida y automatizacion para empresas que quieren crecer con mas orden.

La aplicacion mantiene una experiencia publica simple en `/es` y `/en`, con formulario de diagnostico, enlaces a WhatsApp, showcase, SEO tecnico, analitica opcional y entrega de leads por Resend, Google Sheets webhook o fallback local.

## Stack

- Next.js 14.2.35 App Router
- React 18
- TypeScript
- Tailwind CSS 3
- next-intl para `/es` y `/en`
- GSAP para animaciones
- React Hook Form, Zod y Resend
- Google Analytics Data API para metricas internas
- npm con `package-lock.json`

## Variables de entorno

Crea `.env.local` con las variables que apliquen:

```bash
RESEND_API_KEY=
EMAIL_TO=hola@nexsystems.org
NEXT_PUBLIC_WA_NUMBER=506XXXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
GOOGLE_SHEETS_WEBHOOK_URL=
GA4_PROPERTY_ID=
GA4_SERVICE_ACCOUNT_EMAIL=
GA4_SERVICE_ACCOUNT_PRIVATE_KEY=
GA4_HERO_DAYS=30
```

Notas:

- `NEXT_PUBLIC_GA4_ID` debe tener formato `G-XXXXXXXXXX`; si no es valido, no se carga GA4 en el cliente.
- `GA4_SERVICE_ACCOUNT_PRIVATE_KEY` debe guardarse con saltos de linea escapados (`\n`).
- Si no hay `RESEND_API_KEY`, `EMAIL_TO` ni `GOOGLE_SHEETS_WEBHOOK_URL`, `POST /api/auditoria` guarda en `data/auditoria-leads.ndjson`. Ese fallback es local y no persistente en Vercel.

## Desarrollo local

```bash
npm ci
npm run dev
```

La app queda disponible normalmente en `http://localhost:3000`.

## Verificacion

```bash
npm run lint
npm run typecheck
npm run build
```

## Rutas

- `/` redirige a `/es`
- `/es` landing en espanol
- `/en` landing en ingles
- `POST /api/auditoria` recibe solicitudes de diagnostico con nombre, email, empresa, URL opcional, tipo de solucion y mensaje
- `GET /api/analytics/hero` devuelve metricas GA4 para paneles internos cuando las credenciales existen
- `/robots.txt` y `/sitemap.xml` apuntan al dominio canonico `https://www.nexsystems.org`

## Deploy en Vercel

1. Importar el repositorio.
2. Configurar variables de entorno.
3. Usar el build por defecto: `npm run build`.
4. Validar `/es`, `/en`, formulario de diagnostico, WhatsApp, sitemap y carga de GA4 cuando `NEXT_PUBLIC_GA4_ID` este configurado.

## Documentacion

- `docs/code-audit.md`: auditoria tecnica del repo.
- `docs/gsap-migration-plan.md`: inventario de animaciones.
- `docs/repositioning.md`: decisiones de reposicionamiento, mensajes clave y textos comerciales pendientes.
