import {getLocale, getTranslations} from "next-intl/server";
import {ShowcaseClient} from "./ShowcaseClient";
import {getShowcaseProjects} from "@/lib/showcase";

export async function Showcase() {
  const locale = (await getLocale()) === "en" ? "en" : "es";
  const t = await getTranslations("showcase");
  const projects = await getShowcaseProjects(locale);

  return (
    <ShowcaseClient
      locale={locale}
      projects={projects}
      strings={{
        copy: t("copy"),
        current: t("current"),
        eyebrow: t("eyebrow"),
        live: t("live"),
        repo: t("repo"),
        summaryLive: t("summary_live"),
        summaryProjects: t("summary_projects"),
        summaryStack: t("summary_stack"),
        title: t("title"),
        updated: t("updated"),
      }}
    />
  );
}
