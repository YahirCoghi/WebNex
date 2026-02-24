"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Label} from "../ui/Label";

type ServiceItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
  features: string[];
};

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="anchor-offset bg-neutral-900 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((service, index) => {
            const featured = index === 1;
            const enterprise = index === 3;
            return (
              <motion.article
                key={service.id}
                whileHover={{y: -3, boxShadow: "0 18px 34px rgba(0, 0, 0, 0.35)"}}
                className={`relative rounded-2xl border bg-neutral-950/80 p-6 transition-all duration-300 ${
                  featured || enterprise ? "border-white/45" : "border-white/10"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl ${
                    featured || enterprise
                      ? "bg-gradient-to-r from-white/20 via-white/70 to-white/20"
                      : "bg-transparent"
                  }`}
                />
                {featured && <Label className="mb-4">{t("popular")}</Label>}
                {enterprise && <Label className="mb-4">{t("enterprise")}</Label>}
                <p className="text-sm font-semibold text-white/70">{service.id}</p>
                <h3 className="mt-2 text-xl font-bold text-brand-white">{service.name}</h3>
                <p className="mt-3 text-sm text-brand-light">{service.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-brand-light">
                  {service.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
                <p className="mt-6 text-2xl font-extrabold text-brand-white">
                  {t("from")} <span className="text-white">{service.price}</span>
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
