"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

const coverageBars = [92, 96, 88];
const coverageKeys = [1, 2, 3] as const;

export function DashboardMock() {
  const t = useTranslations("hero");

  return (
    <motion.div
      animate={{y: [0, -7, 0]}}
      transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
      className="will-change-transform rounded-[32px] border border-[#dbe7fb] bg-white/90 p-5 shadow-[0_34px_100px_rgba(145,177,233,0.22)] backdrop-blur"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-[#e2ecff] bg-[#f8fbff] p-4">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#dfeaff] blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#9db8ff]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d2e1ff]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#eef4ff]" />
            </div>
            <span className="rounded-full border border-[#cfe0ff] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">
              {t("panel_badge")}
            </span>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[24px] border border-[#dbe7fb] bg-white p-5 shadow-[0_18px_40px_rgba(145,177,233,0.12)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t("panel_title")}</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">{t("panel_sub")}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] border border-[#e2ecff] bg-[#f8fbff] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t("panel_track_1")}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{t("panel_item_1_title")}</p>
                </div>
                <div className="rounded-[20px] border border-[#e2ecff] bg-[#f8fbff] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t("panel_track_2")}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{t("panel_item_2_title")}</p>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-[#dbe7fb] bg-[#eef4ff] p-4">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>{t("panel_track_3")}</span>
                  <span>{t("panel_badge")}</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {coverageBars.map((value, index) => (
                    <div key={value} className="rounded-[18px] border border-white/80 bg-white p-3">
                      <p className="text-2xl font-extrabold text-slate-900">{value}%</p>
                      <div className="mt-2 h-1.5 rounded-full bg-[#dbe7fb]">
                        <div className="h-full rounded-full bg-[#5c88f6]" style={{width: `${value}%`}} />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{t(`panel_track_${coverageKeys[index]}`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-[22px] border border-[#dbe7fb] bg-white p-4 shadow-[0_16px_32px_rgba(145,177,233,0.12)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a72e6]">{t(`panel_item_${item}_title`)}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{t(`panel_item_${item}_desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
