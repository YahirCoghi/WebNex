"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {ScrollTrigger, SplitText, gsap, useGSAP} from "@/lib/gsap";
import {Label} from "../ui/Label";

type SolutionItem = {
  id: string;
  title: string;
  description: string;
  need: string;
  result: string;
  features: string[];
};

export function Solutions() {
  const t = useTranslations("solutions");
  const items = t.raw("items") as SolutionItem[];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const split = SplitText.create(".solutions-title", {
        linesClass: "solutions-line++",
        mask: "lines",
        type: "lines",
      });

      gsap.from(split.lines, {
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        yPercent: 110,
        scrollTrigger: {
          start: "top 82%",
          trigger: ".solutions-title",
        },
      });

      ScrollTrigger.batch(".solution-card", {
        batchMax: 3,
        interval: 0.08,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            {autoAlpha: 0, y: 30},
            {autoAlpha: 1, duration: 0.72, overwrite: true, stagger: 0.1, y: 0},
          ),
        start: "top 86%",
      });

      return () => {
        split.revert();
      };
    },
    {scope: container},
  );

  return (
    <section id="solutions" className="anchor-offset bg-white/55 py-20 lg:py-24">
      <div ref={container} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Label>{t("eyebrow")}</Label>
          <h2 className="solutions-title section-heading mt-6 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[3.1rem]">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{t("copy")}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((solution) => (
            <article
              key={solution.id}
              className="solution-card rounded-[30px] border border-[#dbe4f1] bg-white/92 p-6 shadow-[0_24px_70px_rgba(122,142,176,0.1)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="max-w-[14rem] text-xl font-bold text-slate-950">{solution.title}</h3>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#cfe0ff] bg-[#eef4ff] text-xs font-bold text-[#3359a5]">
                  {solution.id}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">{solution.description}</p>

              <div className="mt-6 space-y-4 border-y border-[#dbe4f1] py-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3359a5]">
                    {t("need_label")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{solution.need}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3359a5]">
                    {t("result_label")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{solution.result}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2258ff]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
