"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

export function DashboardMock() {
  const t = useTranslations("hero");

  return (
    <motion.div
      animate={{y: [0, -5, 0]}}
      transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
      className="will-change-transform rounded-[32px] border border-[#dbe7fb] bg-white/92 p-4 shadow-[0_30px_90px_rgba(145,177,233,0.18)]"
    >
      <div className="overflow-hidden rounded-[28px] border border-[#e2ecff] bg-[#f8fbff]">
        <div className="flex items-center justify-between border-b border-[#e2ecff] bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#9db8ff]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d2e1ff]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#eef4ff]" />
          </div>
          <span className="rounded-full border border-[#cfe0ff] bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">
            {t("panel_badge")}
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div className="rounded-[22px] border border-[#dbe7fb] bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t("panel_title")}</p>
            <p className="mt-3 text-base font-bold text-slate-950">{t("panel_item_1_title")}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{t("panel_item_1_desc")}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[#dbe7fb] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t("panel_track_2")}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{t("panel_item_2_title")}</p>
            </div>
            <div className="rounded-[22px] border border-[#dbe7fb] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t("panel_track_3")}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{t("panel_item_3_title")}</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#dbe7fb] bg-[#eef4ff] px-4 py-3">
            <p className="text-sm text-slate-600">{t("panel_sub")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
