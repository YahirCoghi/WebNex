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
    <section id="showcase" className="anchor-offset py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-[104px]">
            <Label>{t("eyebrow")}</Label>
            <h2 className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[2.85rem]">{t("title")}</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">{t("copy")}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <article className="rounded-[24px] border border-[#dbe7fb] bg-white/90 p-5 shadow-[0_18px_50px_rgba(145,177,233,0.12)]">
                <p className="text-3xl font-extrabold text-slate-950">{projects.length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{t("summary_projects")}</p>
              </article>
              <article className="rounded-[24px] border border-[#dbe7fb] bg-white/90 p-5 shadow-[0_18px_50px_rgba(145,177,233,0.12)]">
                <p className="text-3xl font-extrabold text-slate-950">{liveCount}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{t("summary_live")}</p>
              </article>
              <article className="rounded-[24px] border border-[#dbe7fb] bg-white/90 p-5 shadow-[0_18px_50px_rgba(145,177,233,0.12)]">
                <p className="text-3xl font-extrabold text-slate-950">{techCount}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{t("summary_stack")}</p>
              </article>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-[30px] border border-[#dbe7fb] bg-white/92 p-6 shadow-[0_24px_70px_rgba(145,177,233,0.14)] transition duration-300 hover:-translate-y-1 hover:border-[#bed2f6]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c5d8ff] via-[#5c88f6] to-[#c5d8ff] opacity-90" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Label>{project.category}</Label>
                    <h3 className="mt-4 text-2xl font-bold text-slate-950">{project.title}</h3>
                  </div>
                  <span className="rounded-full border border-[#dbe7fb] bg-[#f8fbff] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">
                    {project.language}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">{project.summary}</p>

                <p className="mt-4 rounded-[22px] border border-[#dbe7fb] bg-[#f8fbff] px-4 py-4 text-sm leading-7 text-slate-700">
                  {project.highlight}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#dbe7fb] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-[#e5eefc] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {t("updated")} <span className="text-slate-900">{project.updatedAt ? formatter.format(new Date(project.updatedAt)) : t("current")}</span>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl ? (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#5c88f6] bg-[#5c88f6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#2f68ee]"
                      >
                        {t("live")}
                      </Link>
                    ) : null}
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-[#8eb3ff] hover:bg-[#eef4ff]"
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
