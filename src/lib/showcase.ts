type Locale = "es" | "en";

type RepoApiResponse = {
  html_url: string;
  language: string | null;
  updated_at: string;
};

type ShowcaseSeed = {
  repo: string;
  title: string;
  category: Record<Locale, string>;
  summary: Record<Locale, string>;
  highlight: Record<Locale, string>;
  stack: string[];
  liveUrl?: string;
};

export type ShowcaseProject = {
  title: string;
  category: string;
  summary: string;
  highlight: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  language: string;
  updatedAt: string | null;
};

const owner = "YahirCoghi";

const showcaseSeeds: ShowcaseSeed[] = [
  {
    repo: "EcommercePizza",
    title: "Fornaio",
    category: {
      es: "Ecommerce para restaurante artesanal",
      en: "Artisan restaurant ecommerce",
    },
    summary: {
      es: "Aplicacion full-stack para una pizzeria premium con menu filtrable, carrito persistente, confirmacion de pedidos y panel administrativo protegido.",
      en: "Full-stack application for a premium pizzeria with a filterable menu, persistent cart, order confirmation, and protected admin panel.",
    },
    highlight: {
      es: "Demuestra una experiencia comercial completa: vitrina editorial, flujo de compra, persistencia de pedidos y gestion interna desde admin.",
      en: "Shows a complete commerce experience: editorial storefront, purchase flow, order persistence, and internal admin management.",
    },
    stack: ["Next.js", "TypeScript", "Ecommerce", "Admin"],
    liveUrl: "https://fornaio.vercel.app/",
  },
  {
    repo: "Gold-Group",
    title: "GoldGroupofficial",
    category: {
      es: "Marca deportiva y presencia digital",
      en: "Sports brand and digital presence",
    },
    summary: {
      es: "Sitio web para una marca deportiva con narrativa institucional, estructura comercial y rutas listas para crecer por lineas de negocio.",
      en: "Website for a sports brand with institutional storytelling, commercial structure, and routes ready to scale by business line.",
    },
    highlight: {
      es: "Un proyecto que muestra como ordenamos marcas con varias iniciativas, contenido publico y puntos claros de contacto.",
      en: "A project that shows how we organize brands with multiple initiatives, public content, and clear contact paths.",
    },
    stack: ["Next.js", "TypeScript", "Forms", "Vercel"],
    liveUrl: "https://gold-group.vercel.app/",
  },
  {
    repo: "hammmburguesas",
    title: "Hammmburguesas",
    category: {
      es: "Restaurante y experiencia comercial",
      en: "Restaurant and commercial experience",
    },
    summary: {
      es: "Experiencia web para restaurante enfocada en presentar la marca, facilitar la exploracion de la oferta y abrir contacto directo con clientes.",
      en: "Restaurant web experience focused on presenting the brand, making the offer easy to explore, and opening direct contact with customers.",
    },
    highlight: {
      es: "Referencia de trabajo para negocios locales que necesitan una presencia digital clara, moderna y facil de usar.",
      en: "A reference for local businesses that need a clear, modern, and easy-to-use digital presence.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    liveUrl: "https://hammmburguesas.vercel.app/",
  },
  {
    repo: "bloomclubcr",
    title: "BloomClub",
    category: {
      es: "Ecommerce y catalogo wellness",
      en: "Ecommerce and wellness catalog",
    },
    summary: {
      es: "Storefront para Bloom Club CR con catalogo de productos, filtros por categoria, detalle de producto y contacto directo por WhatsApp.",
      en: "Storefront for Bloom Club CR with product catalog, category filters, product detail pages, and direct WhatsApp contact.",
    },
    highlight: {
      es: "Muestra capacidad para construir experiencias comerciales con contenido estructurado y flujo de compra consultiva.",
      en: "Shows the ability to build commercial experiences with structured content and a consultative purchase flow.",
    },
    stack: ["Next.js", "TypeScript", "Catalog", "WhatsApp"],
    liveUrl: "https://bloomclubcr.com/",
  },
  {
    repo: "facturacionSeminario",
    title: "Sistema de facturacion para seminario",
    category: {
      es: "Sistema interno de facturacion",
      en: "Internal billing system",
    },
    summary: {
      es: "Sistema de facturacion desarrollado para el seminario, pensado para ordenar registros, procesos administrativos y control operativo.",
      en: "Billing system developed for the seminar, designed to organize records, administrative processes, and operational control.",
    },
    highlight: {
      es: "Evidencia trabajo mas alla de sitios publicos: soluciones internas que apoyan tareas reales del negocio.",
      en: "Shows work beyond public websites: internal solutions that support real business operations.",
    },
    stack: ["Full-stack", "Facturacion", "Admin", "Procesos"],
  },
];

async function fetchRepo(repo: string): Promise<RepoApiResponse | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "NexSystems-Website",
      },
      next: {revalidate: 60 * 60 * 24},
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as RepoApiResponse;
  } catch {
    return null;
  }
}

export async function getShowcaseProjects(locale: Locale): Promise<ShowcaseProject[]> {
  const repoResponses = await Promise.all(showcaseSeeds.map((project) => fetchRepo(project.repo)));

  return showcaseSeeds.map((project, index) => {
    const repo = repoResponses[index];

    return {
      title: project.title,
      category: project.category[locale],
      summary: project.summary[locale],
      highlight: project.highlight[locale],
      stack: project.stack,
      liveUrl: project.liveUrl,
      repoUrl: repo?.html_url ?? `https://github.com/${owner}/${project.repo}`,
      language: repo?.language ?? project.stack[0],
      updatedAt: repo?.updated_at ?? null,
    };
  });
}
