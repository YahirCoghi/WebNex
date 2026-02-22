"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

export function Why() {
  const t = useTranslations("why");
  const cards = t.raw("cards") as Array<{title: string; desc: string}>;

  return (
    <section id="why" className="anchor-offset bg-navy-900 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
          <h2 className="text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-lg text-brand-light">{t("copy")}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.08}}
              className="rounded-xl border border-white/10 bg-navy-800/55 p-5"
            >
              <h3 className="text-lg font-bold text-brand-white">{card.title}</h3>
              <p className="mt-2 text-sm text-brand-light">{card.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
