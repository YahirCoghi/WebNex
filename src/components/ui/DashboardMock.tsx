"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

const bars = [92, 96, 88];

export function DashboardMock() {
  const t = useTranslations("hero");

  return (
    <motion.div
      animate={{y: [0, -7, 0]}}
      transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
      className="will-change-transform rounded-2xl border border-white/15 bg-black/55 p-5 shadow-soft backdrop-blur"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-light">{t("panel_title")}</p>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">{t("panel_badge")}</span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-brand-light">{t("panel_sub")}</p>

      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-brand-light">{t(`panel_item_${item}_title`)}</p>
            <p className="mt-1 text-sm font-semibold text-brand-white">{t(`panel_item_${item}_desc`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs text-brand-light">{t("panel_coverage")}</p>
        {[1, 2, 3].map((item, index) => (
          <div key={item} className="mb-2">
            <div className="mb-1 flex items-center justify-between text-[11px] text-brand-light">
              <span>{t(`panel_track_${item}`)}</span>
              <span>{bars[index]}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-white/35 to-white"
                style={{width: `${bars[index]}%`}}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
