"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Label} from "../ui/Label";

export function Why() {
  const t = useTranslations("why");
  const cards = t.raw("cards") as Array<{title: string; desc: string}>;

  return (
    <section id="why" className="anchor-offset py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
          <Label>{t("eyebrow")}</Label>
          <div className="mt-5 rounded-[32px] border border-[#dbe7fb] bg-white/92 p-7 shadow-[0_24px_70px_rgba(145,177,233,0.14)] sm:p-8">
            <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">{t("copy")}</p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.08}}
              className="rounded-[28px] border border-[#dbe7fb] bg-white/90 p-6 shadow-[0_20px_60px_rgba(145,177,233,0.12)]"
            >
              <span className="inline-flex rounded-full border border-[#cfe0ff] bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{card.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
