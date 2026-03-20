import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {Label} from "../ui/Label";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-slate-200/80 bg-white/88 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
        <div>
          <Label>{t("eyebrow")}</Label>
          <div className="mt-5 rounded-[30px] border border-[#dbe7fb] bg-[#f8fbff] p-6 shadow-[0_20px_60px_rgba(145,177,233,0.12)]">
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
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">{t("services")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Auditoria Express</li>
            <li>Web Estrategica</li>
            <li>Web + Analytics</li>
            <li>Plataformas empresariales</li>
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
              <Link className="transition hover:text-slate-950" href="tel:+50663904321">
                +506 6390 4321
              </Link>
            </li>
            <li>San Jose, Costa Rica</li>
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

      <div className="border-t border-slate-200/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Copyright {new Date().getFullYear()} NexSystems. {t("legal")}</p>
          <div className="flex gap-4">
            <Link href="#" className="transition hover:text-slate-900">
              {t("privacy")}
            </Link>
            <Link href="#" className="transition hover:text-slate-900">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
