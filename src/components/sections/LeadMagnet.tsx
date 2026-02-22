"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {auditSchema, type AuditInput} from "@/lib/validations";
import {Button} from "../ui/Button";

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
    <section id="leadmagnet" className="anchor-offset bg-navy-700 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
          <h2 className="text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-lg text-brand-light">{t("subtitle")}</p>
          <ul className="mt-6 space-y-2 text-sm text-brand-light">
            {(t.raw("benefits") as string[]).map((benefit) => (
              <li key={benefit}>? {benefit}</li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="rounded-2xl border border-white/10 bg-navy-900/65 p-6"
        >
          <div className="space-y-4">
            <label className="block text-sm text-brand-light">
              {t("name")}
              <input
                {...register("nombre")}
                className="mt-1 w-full rounded-lg border border-white/15 bg-navy-600 px-4 py-3 text-brand-white outline-none transition focus:border-brand-accent"
                placeholder="Ana Perez"
              />
              {errors.nombre && <span className="mt-1 block text-xs text-red-300">{validation(errors.nombre.message)}</span>}
            </label>

            <label className="block text-sm text-brand-light">
              {t("email")}
              <input
                {...register("email")}
                className="mt-1 w-full rounded-lg border border-white/15 bg-navy-600 px-4 py-3 text-brand-white outline-none transition focus:border-brand-accent"
                placeholder="ana@empresa.com"
              />
              {errors.email && <span className="mt-1 block text-xs text-red-300">{validation(errors.email.message)}</span>}
            </label>

            <label className="block text-sm text-brand-light">
              {t("url")}
              <input
                {...register("url")}
                className="mt-1 w-full rounded-lg border border-white/15 bg-navy-600 px-4 py-3 text-brand-white outline-none transition focus:border-brand-accent"
                placeholder="https://tuempresa.com"
              />
              {errors.url && <span className="mt-1 block text-xs text-red-300">{validation(errors.url.message)}</span>}
            </label>

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? t("sending") : t("submit")}
            </Button>

            {status === "success" && <p className="text-sm text-brand-green">{t("success")}</p>}
            {status === "error" && <p className="text-sm text-red-300">{t("error")}</p>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
