import {NextResponse} from "next/server";
import {BetaAnalyticsDataClient} from "@google-analytics/data";

export const runtime = "nodejs";

type HeroAnalytics = {
  sessions: number;
  users: number;
  events: number;
  engagementRatePct: number;
  organicTrafficPct: number;
  source: "ga4";
};

const toNumber = (value?: string | null) => {
  const parsed = Number(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
};

function getClient() {
  const clientEmail = process.env.GA4_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    return null;
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
}

async function getCoreMetrics(client: BetaAnalyticsDataClient, property: string, days: number) {
  const report = await client.runReport({
    property: `properties/${property}`,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: "today"}],
    metrics: [{name: "sessions"}, {name: "totalUsers"}, {name: "eventCount"}, {name: "engagementRate"}],
  });

  const row = report[0].rows?.[0];
  const sessions = toNumber(row?.metricValues?.[0]?.value);
  const users = toNumber(row?.metricValues?.[1]?.value);
  const events = toNumber(row?.metricValues?.[2]?.value);
  const engagementRatePct = Number((toNumber(row?.metricValues?.[3]?.value) * 100).toFixed(1));
  return {sessions, users, events, engagementRatePct};
}

async function getOrganicSessions(client: BetaAnalyticsDataClient, property: string, days: number) {
  const report = await client.runReport({
    property: `properties/${property}`,
    dateRanges: [{startDate: `${days}daysAgo`, endDate: "today"}],
    metrics: [{name: "sessions"}],
    dimensionFilter: {
      filter: {
        fieldName: "sessionDefaultChannelGroup",
        stringFilter: {matchType: "EXACT", value: "Organic Search"},
      },
    },
  });

  return toNumber(report[0].rows?.[0]?.metricValues?.[0]?.value);
}

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const days = Math.max(7, Number(process.env.GA4_HERO_DAYS ?? "30"));

  if (!propertyId) {
    return NextResponse.json({message: "GA4_PROPERTY_ID not configured"}, {status: 503});
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json({message: "GA4 service account credentials not configured"}, {status: 503});
  }

  try {
    const core = await getCoreMetrics(client, propertyId, days);
    const organicSessions = await getOrganicSessions(client, propertyId, days);

    const organicTrafficPct = core.sessions > 0 ? Number(((organicSessions / core.sessions) * 100).toFixed(1)) : 0;

    const payload: HeroAnalytics = {
      sessions: core.sessions,
      users: core.users,
      events: core.events,
      engagementRatePct: core.engagementRatePct,
      organicTrafficPct,
      source: "ga4",
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("GA4 hero analytics error", error);
    return NextResponse.json({message: "Failed to fetch GA4 metrics"}, {status: 500});
  }
}
