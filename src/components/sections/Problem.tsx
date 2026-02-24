"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

const icons = ["!", ">", "#", "M", "S"];

export function Problem() {
  const t = useTranslations("problem");
  const cards = t.raw("cards") as Array<{title: string; desc: string}>;

  return (
    <section id="problem" className="anchor-offset bg-neutral-950 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-[100px] lg:self-start">
          <h2 className="text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-md text-brand-light">{t("subtitle")}</p>
        </div>

        <div className="space-y-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.45, delay: index * 0.06}}
              className="rounded-xl border border-white/10 bg-neutral-900/70 p-5 transition-all duration-300 hover:translate-x-[3px] hover:border-white/35"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 text-sm font-semibold text-white">
                  {icons[index]}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-brand-light">{card.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
