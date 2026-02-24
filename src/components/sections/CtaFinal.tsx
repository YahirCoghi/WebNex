import {getTranslations} from "next-intl/server";
import {Button} from "../ui/Button";

export async function CtaFinal() {
  const t = await getTranslations("ctaFinal");
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

  return (
    <section id="cta-final" className="anchor-offset section-shell bg-black py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.16),transparent_48%)]" />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold text-brand-white sm:text-5xl">{t("title")}</h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`https://wa.me/${waNumber}`}>{t("wa")}</Button>
          <Button href="#leadmagnet" variant="outline">
            {t("audit")}
          </Button>
        </div>
      </div>
    </section>
  );
}
