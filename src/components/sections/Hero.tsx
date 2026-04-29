"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {gsap, SplitText, useGSAP} from "@/lib/gsap";
import {Button} from "../ui/Button";
import {DashboardMock} from "../ui/DashboardMock";
import {Label} from "../ui/Label";

export function Hero() {
  const t = useTranslations("hero");
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";
  const container = useRef<HTMLDivElement>(null);

  const trustItems = [t("trust_1"), t("trust_2"), t("trust_3")];
  const metrics = [
    {value: "01", label: t("metric_1")},
    {value: "02", label: t("metric_2")},
    {value: "03", label: t("metric_3")},
    {value: "04", label: t("metric_4")},
  ];

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const split = SplitText.create(".hero-title-line", {
        mask: "words",
        type: "words",
      });

      const intro = gsap.timeline({defaults: {ease: "nex-smooth"}});

      intro
        .from(".hero-chip", {
          autoAlpha: 0,
          duration: 0.7,
          y: 18,
        })
        .from(
          split.words,
          {
            autoAlpha: 0,
            duration: 1.05,
            rotateX: -80,
            stagger: 0.055,
            transformOrigin: "50% 100%",
            yPercent: 120,
          },
          "-=0.3",
        )
        .from(
          ".hero-copy",
          {
            autoAlpha: 0,
            duration: 0.78,
            y: 24,
          },
          "-=0.72",
        )
        .from(
          ".hero-mini",
          {
            autoAlpha: 0,
            duration: 0.72,
            y: 20,
          },
          "-=0.6",
        )
        .from(
          ".hero-action",
          {
            autoAlpha: 0,
            duration: 0.64,
            stagger: 0.08,
            y: 20,
          },
          "-=0.5",
        )
        .from(
          ".hero-proof-item",
          {
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            y: 22,
          },
          "-=0.4",
        )
        .from(
          ".hero-metric",
          {
            autoAlpha: 0,
            duration: 0.54,
            stagger: 0.06,
            y: 16,
          },
          "-=0.42",
        );

      return () => {
        split.revert();
      };
    },
    {scope: container},
  );

  return (
    <section id="hero" className="section-shell hero-surface anchor-offset min-h-screen pt-32">
      <div ref={container} className="section-grid mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-14 pb-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <div className="hero-chip">
              <Label>{t("eyebrow")}</Label>
            </div>

            <h1 className="section-heading mt-7 max-w-4xl text-[3.3rem] font-extrabold leading-[0.92] text-slate-950 sm:text-[4.4rem] xl:text-[5.5rem]">
              <span className="hero-title-line split-clip block">{t("h1_line1")}</span>
              <span className="hero-title-line split-clip mt-2 block bg-[linear-gradient(135deg,#244eff_0%,#0f3977_100%)] bg-clip-text text-transparent">
                {t("h1_em")}
              </span>
            </h1>

            <p className="hero-copy mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-[1.08rem]">
              {t("sub")}
            </p>
            <p className="hero-mini mt-5 max-w-xl text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              {t("mini")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="hero-action" href={`https://wa.me/${waNumber}`}>
                {t("cta_wa")}
              </Button>
              <Button className="hero-action" href="#leadmagnet" variant="outline">
                {t("cta_audit")} -&gt;
              </Button>
            </div>

            <div className="mt-10 grid gap-3 lg:max-w-3xl lg:grid-cols-3">
              {trustItems.map((item) => (
                <article
                  key={item}
                  className="hero-proof-item glass-panel rounded-[24px] px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </article>
              ))}
            </div>
          </div>

          <div className="relative z-10 lg:pl-4">
            <DashboardMock />
          </div>
        </div>

        <div className="glass-panel relative z-10 grid gap-3 rounded-[30px] p-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="hero-metric rounded-[24px] border border-[#dfe8f5] bg-white/82 px-5 py-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3359a5]">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{metric.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
