"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Button} from "../ui/Button";
import {DashboardMock} from "../ui/DashboardMock";

export function Hero() {
  const t = useTranslations("hero");
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

  return (
    <section id="hero" className="section-shell hero-surface anchor-offset min-h-screen pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0, duration: 0.55, ease: "easeOut"}}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-light backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            {t("eyebrow")}
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.1, duration: 0.55, ease: "easeOut"}}
            className="max-w-2xl text-4xl font-extrabold leading-[1.05] text-brand-white sm:text-5xl lg:text-6xl"
          >
            {t("h1_line1")} <span className="font-emphasis font-bold text-brand-light">{t("h1_em")}</span>
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.55, ease: "easeOut"}}
            className="max-w-[520px] border-l-2 border-white/30 pl-4 text-[17px] leading-relaxed text-brand-silver"
          >
            {t("sub")}
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3, duration: 0.55, ease: "easeOut"}}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button href={`https://wa.me/${waNumber}`}>{t("cta_wa")}</Button>
            <Button href="#leadmagnet" variant="outline">
              {t("cta_audit")} -&gt;
            </Button>
          </motion.div>

          <motion.ul
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.4, duration: 0.55, ease: "easeOut"}}
            className="space-y-2 text-sm text-brand-light"
          >
            {[t("trust_1"), t("trust_2"), t("trust_3")].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-white/5 text-xs font-semibold text-white">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div>
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
