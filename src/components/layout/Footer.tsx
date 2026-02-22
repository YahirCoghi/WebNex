import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-navy-800">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/logo.png"
            alt="NexSystems"
            width={150}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
          <p className="mt-4 max-w-xs text-sm text-brand-light">{t("desc")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-white">{t("services")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-light">
            <li>Auditoria Express</li>
            <li>Web Estrategica</li>
            <li>Web + Analytics</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-white">{t("contact")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-light">
            <li>hola@nexsystems.cr</li>
            <li>San Jose, Costa Rica</li>
            <li>
              <Link className="hover:text-brand-white" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-brand-light sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Copyright {new Date().getFullYear()} NexSystems. {t("legal")}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-brand-white">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-brand-white">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
