"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {ScrollTrigger, SplitText, gsap, useGSAP} from "@/lib/gsap";
import {Label} from "../ui/Label";

type ServiceItem = {
  id: string;
  name: string;
  desc: string;
  tag: string;
  features: string[];
};

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const titleSplit = SplitText.create(".services-title", {
        linesClass: "services-line++",
        mask: "lines",
        type: "lines",
      });

      gsap.from(titleSplit.lines, {
        autoAlpha: 0,
        duration: 0.82,
        stagger: 0.08,
        yPercent: 110,
        scrollTrigger: {
          start: "top 82%",
          trigger: ".services-title",
        },
      });

      ScrollTrigger.batch(".service-card", {
        batchMax: 2,
        interval: 0.08,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            {autoAlpha: 0, y: 26},
            {autoAlpha: 1, duration: 0.72, overwrite: true, stagger: 0.1, y: 0},
          ),
        start: "top 84%",
      });

      return () => {
        titleSplit.revert();
      };
    },
    {scope: container},
  );

  return (
    <section id="services" className="anchor-offset py-20 lg:py-24">
      <div ref={container} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Label>{t("eyebrow")}</Label>
          <h2 className="services-title section-heading mt-6 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[3.1rem]">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{t("copy")}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((service) => (
            <article
              key={service.id}
              className="service-card relative overflow-hidden rounded-[30px] border border-[#dbe4f1] bg-white/92 p-6 shadow-[0_24px_70px_rgba(122,142,176,0.1)] sm:p-7"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#8fb0ff] to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#3359a5]">{service.id}</p>
                  <h3 className="mt-4 max-w-sm text-2xl font-bold text-slate-950">{service.name}</h3>
                </div>
                <span className="rounded-full border border-[#cfe0ff] bg-[#eef4ff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3359a5]">
                  {service.tag}
                </span>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">{service.desc}</p>

              <ul className="mt-8 space-y-3 text-sm text-slate-700">
                {service.features.map((feature) => (
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
