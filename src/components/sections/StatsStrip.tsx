"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {gsap, useGSAP} from "@/lib/gsap";

export function StatsStrip() {
  const t = useTranslations("stats");
  const container = useRef<HTMLDivElement>(null);

  const items = [
    {value: "01", label: t("a")},
    {value: "02", label: t("b")},
    {value: "03", label: t("c")},
    {value: "04", label: t("d")},
  ];

  useGSAP(
    () => {
      gsap.from(".stats-card", {
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08,
        y: 24,
        scrollTrigger: {
          start: "top 84%",
          trigger: container.current,
        },
      });
    },
    {scope: container},
  );

  return (
    <section id="stats-strip" className="anchor-offset -mt-8 pb-14">
      <div ref={container} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-3 rounded-[30px] border border-[#dbe4f1] bg-white/90 p-3 shadow-[0_28px_80px_rgba(122,142,176,0.1)] sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.label} className="stats-card rounded-[24px] border border-[#e2eaf6] bg-[#f9fbff] px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3359a5]">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
