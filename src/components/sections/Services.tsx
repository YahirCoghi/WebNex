"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {ScrollTrigger, SplitText, gsap, useGSAP} from "@/lib/gsap";
import {Label} from "../ui/Label";

type ServiceItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
  features: string[];
};

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const {desktop, motion} = context.conditions as {desktop: boolean; motion: boolean};
          if (!desktop || !motion) return;

          const shell = container.current?.querySelector(".services-pin-shell") as HTMLElement | null;
          const track = container.current?.querySelector(".services-track") as HTMLElement | null;
          if (!shell || !track) return;

          const distance = () => Math.max(0, track.scrollWidth - shell.clientWidth);
          const snapConfig =
            items.length > 1
              ? {delay: 0.04, duration: 0.28, ease: "power1.inOut", snapTo: 1 / (items.length - 1)}
              : undefined;

          const trackTween = gsap.to(track, {
            ease: "none",
            x: () => -distance(),
            scrollTrigger: {
              end: () => `+=${distance() + window.innerHeight * 0.35}`,
              invalidateOnRefresh: true,
              pin: true,
              scrub: 1,
              snap: snapConfig,
              start: "top top+=104",
              trigger: shell,
            },
          });

          gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
            const pieces = card.querySelectorAll(".service-reveal");
            gsap.fromTo(
              pieces,
              {autoAlpha: 0, y: 28},
              {
                autoAlpha: 1,
                duration: 0.72,
                overwrite: true,
                stagger: 0.06,
                y: 0,
                scrollTrigger: {
                  containerAnimation: trackTween,
                  end: "left 42%",
                  start: "left 76%",
                  trigger: card,
                },
              },
            );
          });
        },
      );

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
        mm.revert();
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

        <div className="mt-10">
          <div className="services-pin-shell overflow-hidden rounded-[36px] border border-[#dbe4f1] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(239,245,255,0.9))] p-4 shadow-[0_30px_90px_rgba(122,142,176,0.1)] sm:p-6 lg:p-8">
            <div className="services-track flex flex-col gap-4 lg:w-max lg:flex-row">
              {items.map((service, index) => {
                const featured = index === 1;
                return (
                  <article
                    key={service.id}
                    className={`service-card relative w-full shrink-0 overflow-hidden rounded-[30px] border p-6 lg:w-[31rem] xl:w-[34rem] ${
                      featured
                        ? "border-[#a9c4ff] bg-[linear-gradient(180deg,#ffffff_0%,#edf3ff_100%)]"
                        : "border-[#dde6f2] bg-white/92"
                    }`}
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#8fb0ff] to-transparent" />
                    <div className="service-reveal flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#3359a5]">
                          {service.id}
                        </p>
                        <h3 className="mt-4 max-w-sm text-2xl font-bold text-slate-950">{service.name}</h3>
                      </div>
                      {featured ? <Label>{t("popular")}</Label> : null}
                    </div>

                    <p className="service-reveal mt-6 max-w-md text-sm leading-7 text-slate-600">{service.desc}</p>

                    <div className="service-reveal mt-8 rounded-[24px] border border-[#dfe7f4] bg-[#f9fbff] px-5 py-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3359a5]">{t("from")}</p>
                      <p className="mt-3 text-2xl font-bold text-slate-950">{service.price}</p>
                    </div>

                    <ul className="mt-8 space-y-3 text-sm text-slate-700">
                      {service.features.map((feature) => (
                        <li key={feature} className="service-reveal flex gap-3">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[#2258ff]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
