"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Label} from "../ui/Label";

export function Problem() {
  const t = useTranslations("problem");
  const cards = t.raw("cards") as Array<{title: string; desc: string}>;

  return (
    <section id="problem" className="anchor-offset py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="lg:sticky lg:top-[104px] lg:self-start">
          <Label>{t("eyebrow")}</Label>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[2.85rem]">{t("title")}</h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="grid gap-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.45, delay: index * 0.06}}
              className="rounded-[28px] border border-[#dbe7fb] bg-white/88 p-6 shadow-[0_20px_60px_rgba(145,177,233,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd0f5]"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#cfe0ff] bg-[#eef4ff] text-sm font-semibold text-[#4a72e6]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
