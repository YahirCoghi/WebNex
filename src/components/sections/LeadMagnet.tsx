"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {auditSchema, type AuditInput} from "@/lib/validations";
import {Button} from "../ui/Button";
import {Label} from "../ui/Label";

export function LeadMagnet() {
  const t = useTranslations("lead");
  const tv = useTranslations("validation");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<AuditInput>({
    resolver: zodResolver(auditSchema),
    defaultValues: {nombre: "", email: "", url: ""},
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/auditoria", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
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
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
          <Label>{t("eyebrow")}</Label>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">{t("subtitle")}</p>
          <div className="mt-6 space-y-3">
            {(t.raw("benefits") as string[]).map((benefit, index) => (
              <div key={benefit} className="flex items-start gap-3 rounded-[24px] border border-[#dbe7fb] bg-white/90 px-4 py-4 shadow-[0_16px_40px_rgba(145,177,233,0.12)]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eef4ff] text-sm font-semibold text-[#4a72e6]">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-slate-600">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="rounded-[32px] border border-[#dbe7fb] bg-white/94 p-6 shadow-[0_28px_80px_rgba(145,177,233,0.16)] sm:p-8"
        >
          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-700">
              {t("name")}
              <input
                {...register("nombre")}
                className="mt-2 w-full rounded-[20px] border border-slate-200 bg-[#f8fbff] px-4 py-3 text-slate-900 outline-none transition focus:border-[#8eb3ff] focus:bg-white"
                placeholder="Ana Perez"
              />
              {errors.nombre && <span className="mt-2 block text-xs text-red-500">{validation(errors.nombre.message)}</span>}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              {t("email")}
              <input
                {...register("email")}
                className="mt-2 w-full rounded-[20px] border border-slate-200 bg-[#f8fbff] px-4 py-3 text-slate-900 outline-none transition focus:border-[#8eb3ff] focus:bg-white"
                placeholder="ana@empresa.com"
              />
              {errors.email && <span className="mt-2 block text-xs text-red-500">{validation(errors.email.message)}</span>}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              {t("url")}
              <input
                {...register("url")}
                className="mt-2 w-full rounded-[20px] border border-slate-200 bg-[#f8fbff] px-4 py-3 text-slate-900 outline-none transition focus:border-[#8eb3ff] focus:bg-white"
                placeholder="https://tuempresa.com"
              />
              {errors.url && <span className="mt-2 block text-xs text-red-500">{validation(errors.url.message)}</span>}
            </label>

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? t("sending") : t("submit")}
            </Button>

            {status === "success" && <p className="text-sm text-[#16a34a]">{t("success")}</p>}
            {status === "error" && <p className="text-sm text-red-500">{t("error")}</p>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
