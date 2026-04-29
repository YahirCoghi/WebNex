"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {gsap, useGSAP} from "@/lib/gsap";

export function DashboardMock() {
  const t = useTranslations("hero");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = container.current;
      if (!node) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reducedMotion) {
        const intro = gsap.timeline({defaults: {ease: "nex-smooth"}});

        intro
          .from(".panel-frame", {
            autoAlpha: 0,
            duration: 1.1,
            rotateX: 10,
            transformOrigin: "50% 100%",
            y: 44,
          })
          .from(
            ".panel-orb",
            {
              autoAlpha: 0,
              duration: 1.2,
              scale: 0.76,
              stagger: 0.08,
            },
            "-=0.84",
          )
          .from(
            ".panel-card",
            {
              autoAlpha: 0,
              duration: 0.72,
              stagger: 0.08,
              y: 24,
            },
            "-=0.72",
          )
          .from(
            ".panel-line",
            {
              duration: 0.7,
              scaleY: 0,
              stagger: 0.05,
              transformOrigin: "50% 100%",
            },
            "-=0.52",
          );

        gsap.to(".floating-node", {
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          stagger: {each: 0.18, from: "random"},
          yPercent: -14,
          yoyo: true,
        });
      }

      const layers = gsap.utils.toArray<HTMLElement>(".parallax-layer", node);
      const controls = layers.map((layer) => ({
        depth: Number(layer.dataset.depth ?? 1),
        rotateTo: gsap.quickTo(layer, "rotation", {duration: 0.7, ease: "power3.out"}),
        xTo: gsap.quickTo(layer, "x", {duration: 0.7, ease: "power3.out"}),
        yTo: gsap.quickTo(layer, "y", {duration: 0.7, ease: "power3.out"}),
      }));

      const onMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const x = gsap.utils.clamp(-1, 1, gsap.utils.mapRange(rect.left, rect.right, -1, 1, event.clientX));
        const y = gsap.utils.clamp(-1, 1, gsap.utils.mapRange(rect.top, rect.bottom, -1, 1, event.clientY));

        controls.forEach(({depth, rotateTo, xTo, yTo}) => {
          xTo(x * depth * 12);
          yTo(y * depth * 12);
          rotateTo(x * depth * 1.2);
        });
      };

      const reset = () => {
        controls.forEach(({rotateTo, xTo, yTo}) => {
          xTo(0);
          yTo(0);
          rotateTo(0);
        });
      };

      if (!reducedMotion) {
        node.addEventListener("pointermove", onMove);
        node.addEventListener("pointerleave", reset);
      }

      return () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", reset);
      };
    },
    {scope: container},
  );

  return (
    <div ref={container} className="hero-panel-shell perspective-[1800px]">
      <div className="panel-frame relative overflow-hidden rounded-[34px] border border-[#d6e1f4] bg-[#08152a] p-5 shadow-[0_36px_110px_rgba(17,36,73,0.28)]">
        <div
          className="panel-orb parallax-layer absolute -left-12 top-10 h-40 w-40 rounded-full bg-[#4f7fff]/30 blur-3xl"
          data-depth="0.8"
        />
        <div
          className="panel-orb parallax-layer absolute right-0 top-0 h-44 w-44 rounded-full bg-[#d8e6ff]/18 blur-3xl"
          data-depth="1.2"
        />
        <div
          className="panel-orb parallax-layer absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-[#8db0ff]/18 blur-3xl"
          data-depth="1.5"
        />

        <div className="relative z-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="panel-card flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="floating-node h-2.5 w-2.5 rounded-full bg-[#6d97ff]" />
              <span className="floating-node h-2.5 w-2.5 rounded-full bg-[#91b4ff]" />
              <span className="floating-node h-2.5 w-2.5 rounded-full bg-[#d4e3ff]" />
            </div>
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#dbe7ff]">
              {t("panel_badge")}
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="panel-card parallax-layer rounded-[24px] border border-white/10 bg-white/[0.05] p-5" data-depth="1.1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb0f6]">{t("panel_title")}</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{t("panel_item_1_title")}</h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-slate-300">{t("panel_item_1_desc")}</p>

              <div className="mt-7 flex items-end gap-2">
                {[46, 72, 54, 88, 62].map((value) => (
                  <span
                    key={value}
                    className="panel-line w-3 rounded-full bg-[linear-gradient(180deg,#8fb0ff_0%,#2b63eb_100%)]"
                    style={{height: `${value}px`}}
                  />
                ))}
              </div>
            </article>

            <div className="space-y-4">
              <article className="panel-card parallax-layer rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4" data-depth="1.4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb0f6]">{t("panel_track_2")}</p>
                <p className="mt-3 text-sm font-semibold text-white">{t("panel_item_2_title")}</p>
              </article>

              <article className="panel-card parallax-layer rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4" data-depth="1.7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb0f6]">{t("panel_track_3")}</p>
                <p className="mt-3 text-sm font-semibold text-white">{t("panel_item_3_title")}</p>
              </article>

              <article className="panel-card rounded-[24px] border border-[#2e508f] bg-[#0b1b34] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb0f6]">{t("organic")}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{t("panel_sub")}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
