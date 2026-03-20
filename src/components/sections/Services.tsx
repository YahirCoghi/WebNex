"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Label} from "../ui/Label";

type ServiceItem = {
  id: string;
  name: string;
  desc: string;
  features: string[];
};

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="anchor-offset py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <Label>{t("eyebrow")}</Label>
          <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-[2.85rem]">{t("title")}</h2>
          <p className="text-base leading-8 text-slate-600">{t("copy")}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((service, index) => {
            const featured = index === 1;
            const enterprise = index === 3;
            return (
              <motion.article
                key={service.id}
                whileHover={{y: -5}}
                className={`relative overflow-hidden rounded-[30px] border p-6 transition-all duration-300 ${
                  featured
                    ? "border-[#a8c3ff] bg-[linear-gradient(180deg,#f4f8ff_0%,#eaf2ff_100%)] shadow-[0_26px_70px_rgba(92,136,246,0.16)]"
                    : enterprise
                      ? "border-[#d8e3f8] bg-[#f8fbff] shadow-[0_20px_60px_rgba(145,177,233,0.12)]"
                      : "border-[#dbe7fb] bg-white/90 shadow-[0_20px_60px_rgba(145,177,233,0.12)]"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#82a7ff] via-[#5c88f6] to-[#82a7ff] opacity-90" />
                {featured && <Label className="mb-4">{t("popular")}</Label>}
                {enterprise && <Label className="mb-4">{t("enterprise")}</Label>}
                {!featured && !enterprise ? <span className="mb-4 inline-flex text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">{service.id}</span> : null}
                {(featured || enterprise) ? <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">{service.id}</p> : null}
                <h3 className="mt-3 text-xl font-bold text-slate-950">{service.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.desc}</p>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#5c88f6]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
