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
    <section id="services" className="anchor-offset bg-navy-800 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-brand-white sm:text-4xl">{t("title")}</h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((service, index) => {
            const featured = index === 1;
            return (
              <motion.article
                key={service.id}
                whileHover={{y: -3, boxShadow: "0 18px 30px rgba(17, 36, 84, 0.28)"}}
                className={`relative rounded-2xl border bg-navy-700/80 p-6 transition-all duration-300 ${
                  featured ? "border-brand-accent/70" : "border-white/10"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl ${
                    featured ? "bg-gradient-to-r from-brand-blue to-brand-accent" : "bg-transparent"
                  }`}
                />
                {featured && <Label className="mb-4">{t("popular")}</Label>}
                <p className="text-sm font-semibold text-brand-accent">{service.id}</p>
                <h3 className="mt-2 text-xl font-bold text-brand-white">{service.name}</h3>
                <p className="mt-3 text-sm text-brand-light">{service.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-brand-light">
                  {service.features.map((feature) => (
                    <li key={feature}>? {feature}</li>
                  ))}
                </ul>
                <p className="mt-6 text-2xl font-extrabold text-brand-white">
                  {t("from")} <span className="text-brand-accent">{service.price}</span>
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
