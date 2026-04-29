"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslations} from "next-intl";
import {SplitText, gsap, useGSAP} from "@/lib/gsap";
import {auditSchema, type AuditInput} from "@/lib/validations";
import {Button} from "../ui/Button";
import {Label} from "../ui/Label";

export function LeadMagnet() {
  const t = useTranslations("lead");
  const tv = useTranslations("validation");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const container = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<AuditInput>({
    defaultValues: {nombre: "", email: "", url: ""},
    resolver: zodResolver(auditSchema),
  });

  useGSAP(
    () => {
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
    setStatus("loading");
    try {
      const response = await fetch("/api/auditoria", {
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
        method: "POST",
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  const validation = (key?: string) => {
    if (!key) return undefined;
    return tv(key as "name_min" | "email_invalid" | "url_invalid");
  };

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

            <form onSubmit={onSubmit} className="lead-form-shell glass-panel rounded-[32px] p-6 sm:p-8">
              <div className="space-y-5">
                <label className="block text-sm font-medium text-slate-700">
                  {t("name")}
                  <input
                    {...register("nombre")}
                    className="mt-2 w-full rounded-[20px] border border-[#d7e2f2] bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#90aff5]"
                    placeholder="Ana Perez"
                  />
                  {errors.nombre ? <span className="mt-2 block text-xs text-red-500">{validation(errors.nombre.message)}</span> : null}
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  {t("email")}
                  <input
                    {...register("email")}
                    className="mt-2 w-full rounded-[20px] border border-[#d7e2f2] bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#90aff5]"
                    placeholder="ana@empresa.com"
                  />
                  {errors.email ? <span className="mt-2 block text-xs text-red-500">{validation(errors.email.message)}</span> : null}
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  {t("url")}
                  <input
                    {...register("url")}
                    className="mt-2 w-full rounded-[20px] border border-[#d7e2f2] bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#90aff5]"
                    placeholder="https://tuempresa.com"
                  />
                  {errors.url ? <span className="mt-2 block text-xs text-red-500">{validation(errors.url.message)}</span> : null}
                </label>

                <Button className="w-full" disabled={status === "loading"} type="submit">
                  {status === "loading" ? t("sending") : t("submit")}
                </Button>

                {status === "success" ? <p className="text-sm text-[#16a34a]">{t("success")}</p> : null}
                {status === "error" ? <p className="text-sm text-red-500">{t("error")}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
