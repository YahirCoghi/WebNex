import Image from "next/image";
import Link from "next/link";
import {getLocale, getTranslations} from "next-intl/server";
import {Label} from "../ui/Label";

type FooterLink = {
  label: string;
  href: string;
};

function localizeAnchor(href: string, locale: string) {
  if (!href.startsWith("#")) return href;
  return `/${locale}${href}`;
}

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const links = t.raw("links") as FooterLink[];
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[#dbe4f1] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(244,248,253,0.95))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8db0ff] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#cbdcff]/40 blur-3xl" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="relative">
          <Label>{t("eyebrow")}</Label>
          <div className="mt-5 rounded-[34px] border border-[#dbe4f1] bg-white/92 p-6 shadow-[0_24px_70px_rgba(122,142,176,0.1)]">
            <Image
              src="/logo.png"
              alt="NexSystems"
              width={160}
              height={30}
              className="h-[32px] w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">{t("desc")}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">{t("links_title")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {links.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-slate-950" href={localizeAnchor(item.href, locale)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">{t("contact")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <Link className="transition hover:text-slate-950" href="mailto:nexsystemss@gmail.com">
                nexsystemss@gmail.com
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-slate-950"
                href={`https://wa.me/${waNumber}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t("whatsapp")}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-slate-950"
                href="https://www.instagram.com/nex_systems/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-slate-950"
                href="https://github.com/YahirCoghi"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#dbe4f1]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Copyright {new Date().getFullYear()} NexSystems. {t("legal")}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}#leadmagnet`} className="transition hover:text-slate-900">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}#leadmagnet`} className="transition hover:text-slate-900">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
