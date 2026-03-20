"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Button} from "../ui/Button";
import {DashboardMock} from "../ui/DashboardMock";
import {Label} from "../ui/Label";

export function Hero() {
  const t = useTranslations("hero");
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

  return (
    <section id="hero" className="section-shell hero-surface anchor-offset min-h-screen pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0, duration: 0.55, ease: "easeOut"}}
          >
            <Label className="bg-white/78 shadow-[0_18px_40px_rgba(145,177,233,0.16)]">{t("eyebrow")}</Label>
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.08, duration: 0.55, ease: "easeOut"}}
            className="max-w-3xl text-4xl font-extrabold leading-[0.98] text-slate-950 sm:text-5xl lg:text-6xl xl:text-[4.65rem]"
          >
            {t("h1_line1")} <span className="font-emphasis font-bold text-[#4a72e6]">{t("h1_em")}</span>
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.16, duration: 0.55, ease: "easeOut"}}
            className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            {t("sub")}
          </motion.p>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.55, ease: "easeOut"}}
            className="max-w-xl text-sm font-medium text-slate-500 sm:text-base"
          >
            {t("mini")}
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.28, duration: 0.55, ease: "easeOut"}}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button href={`https://wa.me/${waNumber}`}>{t("cta_wa")}</Button>
            <Button href="#leadmagnet" variant="outline">
              {t("cta_audit")} -&gt;
            </Button>
          </motion.div>
        </div>

        <div className="lg:pl-4">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
