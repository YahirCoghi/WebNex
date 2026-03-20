import {getTranslations} from "next-intl/server";
import {Button} from "../ui/Button";

export async function CtaFinal() {
  const t = await getTranslations("ctaFinal");
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

  return (
    <section id="cta-final" className="anchor-offset py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-[#bfd3f8] bg-[linear-gradient(135deg,#f4f8ff_0%,#d9e8ff_48%,#eef4ff_100%)] px-6 py-12 shadow-[0_34px_90px_rgba(145,177,233,0.18)] sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-10 -top-8 h-40 w-40 rounded-full bg-white/70 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-[#bfd3f8]/70 blur-3xl" />
          <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-extrabold text-slate-950 sm:text-5xl">{t("title")}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{t("subtitle")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`https://wa.me/${waNumber}`}>{t("wa")}</Button>
              <Button href="#leadmagnet" variant="outline">
                {t("audit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
