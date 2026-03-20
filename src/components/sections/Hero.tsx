"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Button} from "../ui/Button";
import {DashboardMock} from "../ui/DashboardMock";
import {Label} from "../ui/Label";

export function Hero() {
  const t = useTranslations("hero");
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";
  const trustItems = [t("trust_1"), t("trust_2"), t("trust_3")];

  return (
    <section id="hero" className="section-shell hero-surface anchor-offset min-h-screen pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-7">
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

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.24, duration: 0.55, ease: "easeOut"}}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button href={`https://wa.me/${waNumber}`}>{t("cta_wa")}</Button>
            <Button href="#leadmagnet" variant="outline">
              {t("cta_audit")} -&gt;
            </Button>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.32, duration: 0.55, ease: "easeOut"}}
            className="grid gap-3 pt-2 sm:grid-cols-3"
          >
            {trustItems.map((item, index) => (
              <article
                key={item}
                className="rounded-[26px] border border-[#dbe7fb] bg-white/84 p-4 shadow-[0_18px_50px_rgba(145,177,233,0.14)]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">0{index + 1}</span>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="lg:pl-6">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
