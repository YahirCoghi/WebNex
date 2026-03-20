"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Label} from "../ui/Label";

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{title: string; desc: string}>;

  return (
    <section id="process" className="anchor-offset py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Label>{t("eyebrow")}</Label>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="relative mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-[#dbe7fb] via-[#9fc0ff] to-[#dbe7fb] lg:block" />
          {steps.map((step, idx) => (
            <motion.article
              key={step.title}
              whileInView={{opacity: 1, y: 0}}
              initial={{opacity: 0, y: 24}}
              viewport={{once: true}}
              transition={{delay: idx * 0.08}}
              className="relative rounded-[28px] border border-[#dbe7fb] bg-white/92 p-6 shadow-[0_20px_60px_rgba(145,177,233,0.12)]"
            >
              <motion.div
                whileHover={{boxShadow: "0 0 0 10px rgba(92,136,246,0.08)"}}
                className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#cfe0ff] bg-[#eef4ff] text-xl font-bold text-[#4a72e6]"
              >
                {idx + 1}
              </motion.div>
              <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
