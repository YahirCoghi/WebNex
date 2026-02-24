"use client";

import Image from "next/image";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {Button} from "../ui/Button";

const sections = [
  {key: "services", href: "#services"},
  {key: "about", href: "#why"},
  {key: "process", href: "#process"},
  {key: "audit", href: "#leadmagnet"},
] as const;

function replaceLocaleInPath(pathname: string, locale: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${locale}`;
  parts[0] = locale;
  return `/${parts.join("/")}`;
}

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextLocale = locale === "es" ? "en" : "es";
  const localePath = useMemo(() => replaceLocaleInPath(pathname, nextLocale), [pathname, nextLocale]);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";
  const homePath = `/${locale}`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/15 bg-black/80 shadow-nav backdrop-blur-[18px]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`${homePath}#hero`} className="shrink-0">
          <Image
            src="/logo.png"
            alt="NexSystems"
            width={180}
            height={38}
            className="h-[38px] w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {sections.map((section) => (
            <Link
              key={section.key}
              href={`${homePath}${section.href}`}
              className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/80 transition hover:text-white"
            >
              {t(section.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={localePath}
            className="rounded-md border border-white/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-brand-white transition hover:border-white/55"
          >
            {locale.toUpperCase()} / {nextLocale.toUpperCase()}
          </Link>
          <Button href={`https://wa.me/${waNumber}`}>{t("cta")} -&gt;</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-white/25 bg-black/30 px-3 py-2 text-sm backdrop-blur lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menu")}
        >
          {t("menu")}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/90 p-4 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <Link
                key={section.key}
                href={`${homePath}${section.href}`}
                className="text-[11px] uppercase tracking-[0.2em] text-white/80"
                onClick={() => setOpen(false)}
              >
                {t(section.key)}
              </Link>
            ))}
            <Link href={localePath} className="text-[11px] uppercase tracking-[0.2em] text-white" onClick={() => setOpen(false)}>
              {locale.toUpperCase()} / {nextLocale.toUpperCase()}
            </Link>
            <Button href={`https://wa.me/${waNumber}`} className="w-full" onClick={() => setOpen(false)}>
              {t("cta")} -&gt;
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
