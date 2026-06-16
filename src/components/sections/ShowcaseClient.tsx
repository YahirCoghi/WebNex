"use client";

import Link from "next/link";
import {useRef} from "react";
import {SplitText, gsap, useGSAP} from "@/lib/gsap";
import type {ShowcaseProject} from "@/lib/showcase";
import {Label} from "../ui/Label";

type ShowcaseClientProps = {
  locale: "es" | "en";
  projects: ShowcaseProject[];
  strings: {
    copy: string;
    current: string;
    eyebrow: string;
    live: string;
    repo: string;
    summaryLive: string;
    summaryProjects: string;
    summaryStack: string;
    title: string;
    updated: string;
  };
};

export function ShowcaseClient({locale, projects, strings}: ShowcaseClientProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".showcase-title", {
        linesClass: "showcase-line++",
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
          trigger: ".showcase-title",
        },
      });

      gsap.from(".showcase-summary-card", {
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
        y: 18,
        scrollTrigger: {
          start: "top 84%",
          trigger: ".showcase-summary-grid",
        },
      });

      gsap.from(".showcase-row", {
        autoAlpha: 0,
        duration: 0.78,
        stagger: 0.12,
        y: 42,
        scrollTrigger: {
          start: "top 80%",
          trigger: ".showcase-rows",
        },
      });

      return () => {
        split.revert();
      };
    },
    {scope: container},
  );

  const formatter = new Intl.DateTimeFormat(locale, {month: "short", year: "numeric"});
  const liveCount = projects.filter((project) => project.liveUrl).length;
  const stackCount = new Set(projects.flatMap((project) => project.stack)).size;

  return (
    <section id="showcase" className="anchor-offset py-20">
      <div ref={container} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Label>{strings.eyebrow}</Label>
          <h2 className="showcase-title section-heading mt-6 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[3.1rem]">
            {strings.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{strings.copy}</p>
        </div>

        <div className="showcase-summary-grid mt-8 grid gap-3 md:grid-cols-3">
          {[
            {label: strings.summaryProjects, value: String(projects.length).padStart(2, "0")},
            {label: strings.summaryLive, value: String(liveCount).padStart(2, "0")},
            {label: strings.summaryStack, value: String(stackCount).padStart(2, "0")},
          ].map((item) => (
            <article key={item.label} className="showcase-summary-card rounded-[24px] border border-[#dbe4f1] bg-white/88 px-5 py-5 shadow-[0_22px_60px_rgba(122,142,176,0.08)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3359a5]">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>

        <div className="showcase-rows mt-10 rounded-[34px] border border-[#dbe4f1] bg-white/88 px-5 py-2 shadow-[0_28px_80px_rgba(122,142,176,0.1)] sm:px-8">
          {projects.map((project) => (
            <article key={project.title} className="showcase-row soft-divider grid gap-8 py-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
              <div>
                <Label>{project.category}</Label>
                <h3 className="mt-5 text-2xl font-bold text-slate-950 sm:text-[2rem]">{project.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{project.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#dbe4f1] bg-[#f7faff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex h-full flex-col justify-between gap-5">
                <p className="text-sm leading-7 text-slate-600">{project.highlight}</p>

                <div className="rounded-[24px] border border-[#dbe4f1] bg-[#f9fbff] px-5 py-4 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">{project.language}</span> -{" "}
                    {project.updatedAt ? `${strings.updated} ${formatter.format(new Date(project.updatedAt))}` : strings.current}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <Link
                      className="inline-flex items-center justify-center rounded-full border border-[#1e4fbf] bg-[linear-gradient(135deg,#2258ff_0%,#103b8d_100%)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5"
                      href={project.liveUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {strings.live}
                    </Link>
                  ) : null}
                  <Link
                    className="inline-flex items-center justify-center rounded-full border border-[#c8d6ec] bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900 transition hover:-translate-y-0.5 hover:border-[#90aff5]"
                    href={project.repoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {strings.repo}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
