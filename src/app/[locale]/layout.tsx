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
    title: "NexSystems - Páginas Web que Generan Leads | Costa Rica",
    description:
      "Diseñamos páginas web estratégicas para pymes en Costa Rica. Orientadas a conversión, con analytics y mobile-first. Auditoría express gratis.",
    openGraph: {
      title: "NexSystems - Páginas Web que Generan Leads",
      description:
        "Diseñamos páginas web estratégicas para pymes en Costa Rica. Orientadas a conversión, con analytics y mobile-first.",
      url: baseUrl,
      siteName: "NexSystems",
      locale: "es_CR",
      type: "website",
    },
    twitter: {card: "summary_large_image"},
  },
  en: {
    title: "NexSystems - Lead-Generating Websites | Costa Rica",
    description:
      "We design strategic websites for small businesses in Costa Rica. Conversion-focused, analytics-ready, mobile-first. Free express audit.",
    openGraph: {
      title: "NexSystems - Lead-Generating Websites",
      description:
        "Strategic websites for Costa Rican SMBs, built for conversion with analytics and mobile-first UX.",
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
    "@type": "LocalBusiness",
    name: "NexSystems",
    description: "Strategic lead-focused web development for Costa Rican SMBs.",
    url: baseUrl,
    address: {"@type": "PostalAddress", addressCountry: "CR", addressLocality: "San Jose"},
    serviceArea: {"@type": "Country", name: "Costa Rica"},
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

      <div className="bg-navy-900 text-brand-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WaFloat />
      </div>
    </NextIntlClientProvider>
  );
}
