import Script from "next/script";
import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {Footer} from "@/components/layout/Footer";
import {Navbar} from "@/components/layout/Navbar";
import {WaFloat} from "@/components/ui/WaFloat";
import {routing, type AppLocale} from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

const baseUrl = "https://www.nexsystems.org";

const metadataByLocale: Record<AppLocale, Metadata> = {
  es: {
    title: "NexSystems - Web, software y automatizacion para empresas",
    description:
      "Disenamos y desarrollamos web estrategica, software a medida y automatizacion para empresas que quieren crecer con mas orden.",
    openGraph: {
      title: "NexSystems - Web, software y automatizacion para empresas",
      description:
        "Soluciones digitales para presencia web, gestion interna, ventas, clientes y automatizacion de procesos.",
      url: baseUrl,
      siteName: "NexSystems",
      locale: "es_CR",
      type: "website",
    },
    twitter: {card: "summary_large_image"},
  },
  en: {
    title: "NexSystems - Web, software, and automation for companies",
    description:
      "We design and build strategic websites, custom software, and automation for companies that want to grow with more order.",
    openGraph: {
      title: "NexSystems - Web, software, and automation for companies",
      description:
        "Digital solutions for web presence, internal management, sales, clients, and process automation.",
      url: baseUrl,
      siteName: "NexSystems",
      locale: "en_US",
      type: "website",
    },
    twitter: {card: "summary_large_image"},
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Omit<Props, "children">): Metadata {
  const locale = params.locale as AppLocale;
  const selected = routing.locales.includes(locale) ? locale : "es";

  return {
    ...metadataByLocale[selected],
    alternates: {
      canonical: `${baseUrl}/${selected}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const locale = params.locale;
  if (!routing.locales.includes(locale as AppLocale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NexSystems",
    description: "Strategic web, custom software, and automation for companies that want to grow with more order.",
    url: baseUrl,
    areaServed: {"@type": "Country", name: "Costa Rica"},
    serviceType: ["Strategic web", "Custom software", "Automation", "Analytics"],
    makesOffer: {
      "@type": "OfferCatalog",
      name: "Digital solutions",
      itemListElement: [
        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Strategic web"}},
        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Custom software"}},
        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Automation and integrations"}},
        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Analytics and optimization"}},
      ],
    },
  };

  const gaId = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  const hasValidGaId = Boolean(gaId && /^G-[A-Z0-9]+$/i.test(gaId));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      {hasValidGaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      ) : null}

      <div className="min-h-screen bg-transparent text-slate-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WaFloat />
      </div>
    </NextIntlClientProvider>
  );
}
