"use client";

import Image from "next/image";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {useEffect, useId, useMemo, useState} from "react";
import {Button} from "../ui/Button";

const sections = [
  {key: "solutions", href: "#solutions"},
  {key: "process", href: "#process"},
  {key: "work", href: "#showcase"},
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
  const menuId = useId();

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
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex h-[76px] w-full max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/90 bg-white/88 shadow-[0_22px_70px_rgba(110,130,165,0.18)] backdrop-blur-xl"
            : "border-white/70 bg-white/70 shadow-[0_16px_50px_rgba(110,130,165,0.12)] backdrop-blur-xl"
        }`}
      >
        <Link
          href={`${homePath}#hero`}
          className="flex shrink-0 items-center gap-3 rounded-full bg-white/86 px-3 py-2 shadow-[0_12px_32px_rgba(136,160,201,0.12)]"
        >
          <Image
            src="/logo.png"
            alt="NexSystems"
            width={180}
            height={38}
            className="h-[30px] w-auto object-contain sm:h-[34px]"
            priority
          />
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 xl:block">
            Costa Rica
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
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
            className="rounded-full border border-[#ced8e8] bg-white/88 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-[#8fb0f6] hover:text-slate-950"
          >
            {locale.toUpperCase()} / {nextLocale.toUpperCase()}
          </Link>
          <Button href={`https://wa.me/${waNumber}`}>{t("cta")} -&gt;</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-[#ced8e8] bg-white/88 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(146,173,222,0.12)] backdrop-blur lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("menu")}
          aria-controls={menuId}
          aria-expanded={open}
        >
          {t("menu")}
        </button>
      </div>

      {open && (
        <div
          id={menuId}
          className="mx-auto mt-3 w-full max-w-6xl rounded-[28px] border border-white/80 bg-white/92 p-4 shadow-[0_24px_70px_rgba(110,130,165,0.16)] backdrop-blur lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <Link
                key={section.key}
                href={`${homePath}${section.href}`}
                className="rounded-2xl border border-[#d6e0ef] bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700"
                onClick={() => setOpen(false)}
              >
                {t(section.key)}
              </Link>
            ))}
            <Link
              href={localePath}
              className="rounded-2xl border border-[#d6e0ef] bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700"
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
