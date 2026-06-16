"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useId, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslations} from "next-intl";
import {SplitText, gsap, useGSAP} from "@/lib/gsap";
import {auditSchema, type AuditInput} from "@/lib/validations";
import {Button} from "../ui/Button";
import {Label} from "../ui/Label";

type SolutionOption = {
  value: AuditInput["solutionType"];
  label: string;
};

type ValidationKey =
  | "name_min"
  | "email_invalid"
  | "company_min"
  | "url_invalid"
  | "solution_type_required"
  | "message_min"
  | "message_max";

const defaultValues: AuditInput = {
  nombre: "",
  email: "",
  empresa: "",
  url: "",
  solutionType: "not_sure",
  message: "",
};

export function LeadMagnet() {
  const t = useTranslations("lead");
  const tv = useTranslations("validation");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const container = useRef<HTMLDivElement>(null);
  const formId = useId();
  const solutionOptions = t.raw("solution_options") as SolutionOption[];

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<AuditInput>({
    defaultValues,
    resolver: zodResolver(auditSchema),
  });

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const split = SplitText.create(".lead-title", {
        linesClass: "lead-line++",
        mask: "lines",
        type: "lines",
      });

      gsap.from(split.lines, {
        autoAlpha: 0,
        duration: 0.78,
        stagger: 0.08,
        yPercent: 110,
        scrollTrigger: {
          start: "top 82%",
          trigger: ".lead-title",
        },
      });

      gsap.from(".lead-benefit", {
        autoAlpha: 0,
        duration: 0.62,
        stagger: 0.08,
        y: 24,
        scrollTrigger: {
          start: "top 84%",
          trigger: ".lead-benefits",
        },
      });

      gsap.from(".lead-form-shell", {
        autoAlpha: 0,
        duration: 0.82,
        x: 42,
        scrollTrigger: {
          start: "top 82%",
          trigger: ".lead-form-shell",
        },
      });

      return () => {
        split.revert();
      };
    },
    {scope: container},
  );

  const onSubmit = handleSubmit(async (data) => {
    if (status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/auditoria", {
        body: JSON.stringify({...data, url: data.url?.trim() || undefined}),
        headers: {"Content-Type": "application/json"},
        method: "POST",
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      reset(defaultValues);
    } catch {
      setStatus("error");
    }
  });

  const validation = (key?: string) => {
    if (!key) return undefined;
    return tv(key.replace("validation.", "") as ValidationKey);
  };

  const fieldClass =
    "mt-2 w-full rounded-[20px] border border-[#d7e2f2] bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#90aff5] focus-visible:ring-2 focus-visible:ring-[#7fa6ff]/60";

  return (
    <section id="leadmagnet" className="anchor-offset py-20">
      <div ref={container} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[38px] border border-[#dbe4f1] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(238,244,255,0.92))] p-6 shadow-[0_32px_90px_rgba(122,142,176,0.12)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <Label>{t("eyebrow")}</Label>
              <h2 className="lead-title section-heading mt-6 max-w-xl text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[3.1rem]">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">{t("subtitle")}</p>

              <div className="lead-benefits mt-8 grid gap-3">
                {(t.raw("benefits") as string[]).map((benefit) => (
                  <article key={benefit} className="lead-benefit glass-panel rounded-[24px] px-4 py-4 text-sm leading-7 text-slate-600">
                    {benefit}
                  </article>
                ))}
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="lead-form-shell glass-panel rounded-[32px] p-6 sm:p-8"
              aria-busy={status === "loading"}
              noValidate
            >
              <div className="space-y-5">
                <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-nombre`}>
                  {t("name")}
                  <input
                    {...register("nombre")}
                    aria-describedby={errors.nombre ? `${formId}-nombre-error` : undefined}
                    aria-invalid={Boolean(errors.nombre)}
                    autoComplete="name"
                    className={fieldClass}
                    id={`${formId}-nombre`}
                    placeholder="Ana Perez"
                  />
                  {errors.nombre ? (
                    <span id={`${formId}-nombre-error`} className="mt-2 block text-xs text-red-500">
                      {validation(errors.nombre.message)}
                    </span>
                  ) : null}
                </label>

                <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-email`}>
                  {t("email")}
                  <input
                    {...register("email")}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                    aria-invalid={Boolean(errors.email)}
                    autoComplete="email"
                    className={fieldClass}
                    id={`${formId}-email`}
                    placeholder="ana@empresa.com"
                    type="email"
                  />
                  {errors.email ? (
                    <span id={`${formId}-email-error`} className="mt-2 block text-xs text-red-500">
                      {validation(errors.email.message)}
                    </span>
                  ) : null}
                </label>

                <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-empresa`}>
                  {t("company")}
                  <input
                    {...register("empresa")}
                    aria-describedby={errors.empresa ? `${formId}-empresa-error` : undefined}
                    aria-invalid={Boolean(errors.empresa)}
                    autoComplete="organization"
                    className={fieldClass}
                    id={`${formId}-empresa`}
                    placeholder="Empresa"
                  />
                  {errors.empresa ? (
                    <span id={`${formId}-empresa-error`} className="mt-2 block text-xs text-red-500">
                      {validation(errors.empresa.message)}
                    </span>
                  ) : null}
                </label>

                <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-url`}>
                  {t("url")}
                  <input
                    {...register("url")}
                    aria-describedby={errors.url ? `${formId}-url-error` : undefined}
                    aria-invalid={Boolean(errors.url)}
                    autoComplete="url"
                    className={fieldClass}
                    id={`${formId}-url`}
                    placeholder="https://tuempresa.com"
                    type="url"
                  />
                  {errors.url ? (
                    <span id={`${formId}-url-error`} className="mt-2 block text-xs text-red-500">
                      {validation(errors.url.message)}
                    </span>
                  ) : null}
                </label>

                <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-solutionType`}>
                  {t("solution_type")}
                  <select
                    {...register("solutionType")}
                    aria-describedby={errors.solutionType ? `${formId}-solutionType-error` : undefined}
                    aria-invalid={Boolean(errors.solutionType)}
                    className={fieldClass}
                    id={`${formId}-solutionType`}
                  >
                    {solutionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.solutionType ? (
                    <span id={`${formId}-solutionType-error`} className="mt-2 block text-xs text-red-500">
                      {validation(errors.solutionType.message)}
                    </span>
                  ) : null}
                </label>

                <label className="block text-sm font-medium text-slate-700" htmlFor={`${formId}-message`}>
                  {t("message")}
                  <textarea
                    {...register("message")}
                    aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                    aria-invalid={Boolean(errors.message)}
                    className={`${fieldClass} min-h-[132px] resize-y`}
                    id={`${formId}-message`}
                    placeholder={t("message_placeholder")}
                  />
                  {errors.message ? (
                    <span id={`${formId}-message-error`} className="mt-2 block text-xs text-red-500">
                      {validation(errors.message.message)}
                    </span>
                  ) : null}
                </label>

                <Button
                  className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={status === "loading"}
                  type="submit"
                >
                  {status === "loading" ? t("sending") : t("submit")}
                </Button>

                <div aria-live="polite" className="min-h-5">
                  {status === "success" ? <p className="text-sm text-[#16a34a]">{t("success")}</p> : null}
                  {status === "error" ? (
                    <p className="text-sm text-red-500" role="alert">
                      {t("error")}
                    </p>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
