"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {ScrollTrigger, SplitText, gsap, useGSAP} from "@/lib/gsap";
import {Label} from "../ui/Label";

export function Problem() {
  const t = useTranslations("problem");
  const cards = t.raw("cards") as Array<{title: string; desc: string}>;
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".problem-title", {
        linesClass: "problem-line++",
        mask: "lines",
        type: "lines",
      });

      gsap.from(split.lines, {
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        yPercent: 110,
        scrollTrigger: {
          start: "top 80%",
          trigger: ".problem-title",
        },
      });

      ScrollTrigger.batch(".problem-card", {
        interval: 0.08,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            {autoAlpha: 0, y: 34},
            {autoAlpha: 1, duration: 0.75, overwrite: true, stagger: 0.1, y: 0},
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
    <section id="problem" className="anchor-offset py-20">
      <div ref={container} className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-[124px] lg:self-start">
          <Label>{t("eyebrow")}</Label>
          <h2 className="problem-title section-heading mt-6 max-w-xl text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[3.1rem]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="relative space-y-4">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`problem-card glass-panel rounded-[28px] px-6 py-6 ${index % 2 === 1 ? "md:ml-10" : ""}`}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d7e3f6] bg-white text-sm font-semibold text-[#3359a5]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
