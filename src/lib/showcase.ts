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
    repo: "adopciones-kalo",
    title: "Adopciones Kalo",
    category: {
      es: "CMS + experiencia social",
      en: "CMS + social experience",
    },
    summary: {
      es: "Portal de adopcion con gestion de contenido, flujo de solicitud y narrativa enfocada en accion.",
      en: "Adoption portal with content management, application flow, and action-oriented storytelling.",
    },
    highlight: {
      es: "Caso ideal para marcas con comunidad, contenido frecuente y conversion no tradicional.",
      en: "A strong fit for community-driven brands, frequent content, and non-traditional conversion flows.",
    },
    stack: ["Astro", "Tailwind", "Decap CMS", "Netlify"],
    liveUrl: "https://adopciones-kalo.netlify.app",
  },
  {
    repo: "Gold-Group",
    title: "Gold Group",
    category: {
      es: "Ecosistema deportivo y experiencia digital",
      en: "Sports ecosystem and digital experience",
    },
    summary: {
      es: "Plataforma web con multiples modulos, narrativa institucional, formularios de contacto y arquitectura lista para crecer por lineas de negocio.",
      en: "Web platform with multiple modules, institutional storytelling, contact flows, and an architecture built to scale by business line.",
    },
    highlight: {
      es: "Demuestra capacidad para estructurar marcas complejas con secciones, rutas y conversiones mas alla de una landing tradicional.",
      en: "Shows our ability to structure complex brands with sections, routes, and conversion flows beyond a traditional landing page.",
    },
    stack: ["Next.js", "TypeScript", "Forms", "Vercel"],
    liveUrl: "https://goldacademies.com",
  },
  {
    repo: "ERP",
    title: "ERP",
    category: {
      es: "Producto interno empresarial",
      en: "Enterprise internal product",
    },
    summary: {
      es: "Base de un ERP modular con logica de negocio, capas separadas y enfoque de operacion real.",
      en: "Foundation for a modular ERP with business logic, clean layering, and real operational use in mind.",
    },
    highlight: {
      es: "Aporta credibilidad tecnica cuando un cliente necesita algo mas profundo que una landing comercial.",
      en: "Adds technical credibility when a client needs more than a commercial landing page.",
    },
    stack: [".NET", "React", "API", "SQL"],
  },
  {
    repo: "NexSystem",
    title: "NexSystem",
    category: {
      es: "Marca y software B2B",
      en: "B2B brand and software",
    },
    summary: {
      es: "Exploracion de presencia corporativa para software, con foco en estructura comercial y propuesta de valor.",
      en: "Corporate web exploration for software positioning, centered on commercial structure and value proposition.",
    },
    highlight: {
      es: "Sirve como referencia de como trabajamos marcas tecnicas con narrativa clara y ejecucion moderna.",
      en: "A reference for how we build technical brands with clear narrative and modern execution.",
    },
    stack: ["TypeScript", "Frontend", "Brand", "Vercel"],
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
