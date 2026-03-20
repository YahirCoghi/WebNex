"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

export function StatsStrip() {
  const t = useTranslations("stats");

  const items = [
    {value: "01", label: t("a")},
    {value: "02", label: t("b")},
    {value: "03", label: t("c")},
    {value: "04", label: t("d")},
  ];

  return (
    <section id="stats-strip" className="anchor-offset -mt-6 pb-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 rounded-[32px] border border-[#dbe7fb] bg-white/88 p-4 shadow-[0_26px_70px_rgba(145,177,233,0.16)] sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.06}}
              className="rounded-[24px] border border-[#e2ecff] bg-[#f8fbff] p-5"
            >
              <p className="text-4xl font-extrabold text-slate-950 sm:text-[2.8rem]">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
