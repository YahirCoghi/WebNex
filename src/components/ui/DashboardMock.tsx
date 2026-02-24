"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

const values = ["126", "42", "31", "24.8%"];

export function DashboardMock() {
  const t = useTranslations("hero");

  return (
    <motion.div
      animate={{y: [0, -7, 0]}}
      transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
      className="will-change-transform rounded-2xl border border-white/15 bg-black/55 p-5 shadow-soft backdrop-blur"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-light">Dashboard</p>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[t("metric_1"), t("metric_2"), t("metric_3"), t("metric_4")].map((metric, i) => (
          <div key={metric} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-brand-light">{metric}</p>
            <p className="mt-2 text-xl font-bold text-brand-white">{values[i]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-brand-light">
          <span>{t("organic")}</span>
          <span>78%</span>
        </div>
        <div className="h-2 rounded-full bg-white/15">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-white/40 to-white" />
        </div>
      </div>
    </motion.div>
  );
}
