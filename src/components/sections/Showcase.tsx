import Link from "next/link";
import {getLocale, getTranslations} from "next-intl/server";
import {Label} from "../ui/Label";
import {getShowcaseProjects} from "@/lib/showcase";

export async function Showcase() {
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const t = await getTranslations("showcase");
  const projects = (await getShowcaseProjects(locale)).slice(0, 3);

  return (
    <section id="showcase" className="anchor-offset py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <Label>{t("eyebrow")}</Label>
          <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">{t("title")}</h2>
          <p className="text-base leading-8 text-slate-600">{t("copy")}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-[30px] border border-[#dbe7fb] bg-white/92 p-6 shadow-[0_24px_70px_rgba(145,177,233,0.14)]"
            >
              <Label>{project.category}</Label>
              <h3 className="mt-4 text-2xl font-bold text-slate-950">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{project.summary}</p>

              <div className="mt-6 flex gap-2">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
