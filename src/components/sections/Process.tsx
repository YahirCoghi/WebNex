"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {SplitText, gsap, useGSAP} from "@/lib/gsap";
import {Label} from "../ui/Label";

type ProcessStep = {
  title: string;
  desc: string;
};

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as ProcessStep[];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const split = SplitText.create(".process-title", {
        linesClass: "process-line++",
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
          trigger: ".process-title",
        },
      });

      gsap.from(".process-rule", {
        duration: 0.9,
        ease: "power3.out",
        scaleX: 0,
        scrollTrigger: {
          start: "top 84%",
          trigger: ".process-timeline",
        },
        transformOrigin: "0% 50%",
      });

      gsap.from(".process-step", {
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.08,
        y: 28,
        scrollTrigger: {
          start: "top 82%",
          trigger: ".process-timeline",
        },
      });

      return () => {
        split.revert();
      };
    },
    {scope: container},
  );

  return (
    <section id="process" className="anchor-offset py-20 lg:py-24">
      <div ref={container} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Label>{t("eyebrow")}</Label>
          <h2 className="process-title section-heading mt-6 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[3.1rem]">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="process-timeline relative mt-12">
          <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-[#dbe7fb] via-[#9fc0ff] to-[#dbe7fb] lg:hidden" />
          <div className="process-rule absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-[#dbe7fb] via-[#9fc0ff] to-[#dbe7fb] lg:block" />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="process-step relative rounded-[28px] border border-[#dbe7fb] bg-white/92 p-6 pl-20 shadow-[0_20px_60px_rgba(145,177,233,0.12)] lg:pl-6 lg:pt-20"
              >
                <span className="absolute left-0 top-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#cfe0ff] bg-[#eef4ff] text-sm font-bold text-[#3359a5] shadow-[0_12px_30px_rgba(145,177,233,0.16)] lg:left-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
