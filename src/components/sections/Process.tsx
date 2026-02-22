"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{title: string; desc: string}>;

  return (
    <section id="process" className="anchor-offset bg-navy-800 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>

        <div className="relative mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/15 lg:block" />
          {steps.map((step, idx) => (
            <motion.article
              key={step.title}
              whileInView={{opacity: 1, y: 0}}
              initial={{opacity: 0, y: 24}}
              viewport={{once: true}}
              transition={{delay: idx * 0.08}}
              className="relative rounded-xl border border-white/10 bg-navy-700/75 p-5"
            >
              <motion.div
                whileHover={{boxShadow: "0 0 24px rgba(59,130,246,.5)"}}
                className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand-accent/50 bg-navy-900 text-xl font-bold text-brand-white"
              >
                {idx + 1}
              </motion.div>
              <h3 className="text-lg font-bold text-brand-white">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-light">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
