"use client";

import {animate, motion, useInView, useMotionValue, useTransform} from "framer-motion";
import {useTranslations} from "next-intl";
import {useEffect, useRef} from "react";

function Counter({end, suffix = ""}: {end: number; suffix?: string}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => Math.round(latest));
  const inView = useInView(ref, {once: true, amount: 0.6});

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, end, {duration: 1.2, ease: "easeOut"});
    return () => controls.stop();
  }, [end, inView, value]);

  return (
    <motion.span ref={ref} className="text-4xl font-extrabold text-brand-white">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}

export function StatsStrip() {
  const t = useTranslations("stats");

  return (
    <section id="stats-strip" className="anchor-offset border-y border-white/10 bg-neutral-900">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4">
        <article>
          <Counter end={3} suffix="s" />
          <p className="mt-2 text-sm text-brand-light">{t("a")}</p>
        </article>
        <article>
          <Counter end={70} suffix="%" />
          <p className="mt-2 text-sm text-brand-light">{t("b")}</p>
        </article>
        <article>
          <Counter end={4} suffix="x" />
          <p className="mt-2 text-sm text-brand-light">{t("c")}</p>
        </article>
        <article>
          <Counter end={0} />
          <p className="mt-2 text-sm text-brand-light">{t("d")}</p>
        </article>
      </div>
    </section>
  );
}
