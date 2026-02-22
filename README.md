# NexSystems Landing

Landing page corporativa bilingue (ES/EN) para NexSystems, construida con Next.js 14 (App Router), Tailwind CSS, Framer Motion, next-intl y formulario de auditoria con API route.

## Requisitos

- Node.js 20+
- npm 10+

## Variables de entorno

Crea `.env.local` usando `.env.example`:

```bash
RESEND_API_KEY=
EMAIL_TO=hola@nexsystems.cr
NEXT_PUBLIC_WA_NUMBER=506XXXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
GOOGLE_SHEETS_WEBHOOK_URL=
```

## Scripts

```bash
npm run dev        # desarrollo
npm run lint       # lint eslint
npm run typecheck  # chequeo TypeScript
npm run build      # build de produccion
npm run start      # levantar build de produccion
```

## Levantar local (modo profesional)

1. Instalar dependencias:
```bash
npm install
```
2. Validar calidad:
```bash
npm run lint && npm run typecheck && npm run build
```
3. Levantar build de produccion:
```bash
npm run start
```

## Deploy en Vercel

1. Importar el repo en Vercel.
2. Configurar las variables de entorno del bloque anterior.
3. Deploy.

## URLs clave

- Landing ES: `/es`
- Landing EN: `/en`
- API formulario: `POST /api/auditoria`
- SEO técnico: `/robots.txt` y `/sitemap.xml`
