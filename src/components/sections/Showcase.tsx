import Link from "next/link";
import {getLocale, getTranslations} from "next-intl/server";
import {Label} from "../ui/Label";
import {getShowcaseProjects} from "@/lib/showcase";

export async function Showcase() {
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const t = await getTranslations("showcase");
  const projects = await getShowcaseProjects(locale);

  const liveCount = projects.filter((project) => project.liveUrl).length;
  const techCount = new Set(projects.flatMap((project) => project.stack)).size;
  const formatter = new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <section id="showcase" className="anchor-offset bg-neutral-950 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-[104px]">
            <Label>{t("eyebrow")}</Label>
            <h2 className="mt-5 text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 max-w-xl text-brand-light">{t("copy")}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <article className="rounded-2xl border border-white/10 bg-neutral-900/80 p-4">
                <p className="text-3xl font-extrabold text-brand-white">{projects.length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-light">{t("summary_projects")}</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-neutral-900/80 p-4">
                <p className="text-3xl font-extrabold text-brand-white">{liveCount}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-light">{t("summary_live")}</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-neutral-900/80 p-4">
                <p className="text-3xl font-extrabold text-brand-white">{techCount}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-light">{t("summary_stack")}</p>
              </article>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Label className="border-white/15 bg-white/5 text-brand-white">{project.category}</Label>
                    <h3 className="mt-4 text-2xl font-bold text-brand-white">{project.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-light">
                    {project.language}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-brand-light">{project.summary}</p>

                <p className="mt-4 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-brand-white/90">
                  {project.highlight}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-light"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-light">
                    {t("updated")}{" "}
                    <span className="text-brand-white">
                      {project.updatedAt ? formatter.format(new Date(project.updatedAt)) : t("current")}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl ? (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-white transition hover:border-white hover:bg-white hover:text-black"
                      >
                        {t("live")}
                      </Link>
                    ) : null}
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-light transition hover:border-white/30 hover:text-brand-white"
                    >
                      {t("repo")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
