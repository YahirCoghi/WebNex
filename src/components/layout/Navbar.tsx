"use client";

import Image from "next/image";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {Button} from "../ui/Button";

const sections = [
  {key: "services", href: "#services"},
  {key: "work", href: "#showcase"},
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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          ? "border-slate-200/80 bg-white/82 shadow-[0_18px_70px_rgba(133,164,218,0.18)] backdrop-blur-[18px]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`${homePath}#hero`} className="shrink-0 rounded-full border border-slate-200/70 bg-white/78 px-3 py-2 shadow-[0_12px_36px_rgba(146,173,222,0.16)]">
          <Image
            src="/logo.png"
            alt="NexSystems"
            width={180}
            height={38}
            className="h-[32px] w-auto object-contain sm:h-[38px]"
            priority
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {sections.map((section) => (
            <Link
              key={section.key}
              href={`${homePath}${section.href}`}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:text-slate-950"
            >
              {t(section.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={localePath}
            className="rounded-full border border-slate-300 bg-white/78 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-[#8eb3ff] hover:text-slate-950"
          >
            {locale.toUpperCase()} / {nextLocale.toUpperCase()}
          </Link>
          <Button href={`https://wa.me/${waNumber}`}>{t("cta")} -&gt;</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white/82 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(146,173,222,0.16)] backdrop-blur lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("menu")}
        >
          {t("menu")}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/80 bg-white/92 p-4 shadow-[0_18px_60px_rgba(133,164,218,0.18)] backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <Link
                key={section.key}
                href={`${homePath}${section.href}`}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700"
                onClick={() => setOpen(false)}
              >
                {t(section.key)}
              </Link>
            ))}
            <Link
              href={localePath}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700"
              onClick={() => setOpen(false)}
            >
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
