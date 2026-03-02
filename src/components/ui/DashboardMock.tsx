"use client";

import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";

type HeroAnalyticsResponse = {
  sessions: number;
  users: number;
  events: number;
  engagementRatePct: number;
  organicTrafficPct: number;
  source: "ga4";
};

const fallbackValues = {
  sessions: 0,
  users: 0,
  events: 0,
  engagementRatePct: 0,
  organicTrafficPct: 0,
};

const compactFormat = new Intl.NumberFormat("es-CR", {notation: "compact", maximumFractionDigits: 1});

function formatMetric(value: number, suffix = "") {
  if (suffix) {
    return `${value.toFixed(1)}${suffix}`;
  }
  return compactFormat.format(value);
}

export function DashboardMock() {
  const t = useTranslations("hero");
  const [data, setData] = useState<HeroAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadAnalytics() {
      try {
        const response = await fetch("/api/analytics/hero", {cache: "no-store"});
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const payload = (await response.json()) as HeroAnalyticsResponse;
        if (mounted) {
          setData(payload);
        }
      } catch {
        if (mounted) {
          setData(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadAnalytics();
    return () => {
      mounted = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const values = data ?? fallbackValues;
    return [
      formatMetric(values.sessions),
      formatMetric(values.users),
      formatMetric(values.events),
      formatMetric(values.engagementRatePct, "%"),
    ];
  }, [data]);

  const organicPct = data?.organicTrafficPct ?? fallbackValues.organicTrafficPct;
  const barWidth = `${Math.max(0, Math.min(100, organicPct))}%`;
  const hasTraffic = (data?.sessions ?? 0) > 0;

  return (
    <motion.div
      animate={{y: [0, -7, 0]}}
      transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
      className="will-change-transform rounded-2xl border border-white/15 bg-black/55 p-5 shadow-soft backdrop-blur"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-light">Dashboard</p>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
          {loading ? "Sync..." : hasTraffic ? "Live GA4" : "Setup Status"}
        </span>
      </div>
      {hasTraffic ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            {[t("metric_1"), t("metric_2"), t("metric_3"), t("metric_4")].map((metric, i) => (
              <div key={metric} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs text-brand-light">{metric}</p>
                <p className="mt-2 text-xl font-bold text-brand-white">{metrics[i]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs text-brand-light">
              <span>{t("organic")}</span>
              <span>{formatMetric(organicPct, "%")}</span>
            </div>
            <div className="h-2 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gradient-to-r from-white/40 to-white" style={{width: barWidth}} />
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-brand-light">GA4 conectado</p>
            <p className="mt-2 text-sm font-semibold text-brand-white">{data?.source === "ga4" ? "Si" : "Pendiente"}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-brand-light">Formulario auditoria</p>
            <p className="mt-2 text-sm font-semibold text-brand-white">Operativo</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-brand-light">Canal WhatsApp</p>
            <p className="mt-2 text-sm font-semibold text-brand-white">Operativo</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-brand-light">Estado de datos</p>
            <p className="mt-2 text-sm font-semibold text-brand-white">Aun sin trafico suficiente</p>
            <p className="mt-1 text-xs text-brand-light">
              Cuando exista actividad real, este panel mostrara sesiones, usuarios, eventos y engagement automaticamente.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
