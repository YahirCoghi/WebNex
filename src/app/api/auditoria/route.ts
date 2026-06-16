import {appendFile, mkdir} from "node:fs/promises";
import {join} from "node:path";
import {NextResponse} from "next/server";
import {Resend} from "resend";
import {auditSchema, type SolutionType} from "@/lib/validations";

export const runtime = "nodejs";

let resendClient: Resend | null = null;

const solutionLabels: Record<SolutionType, string> = {
  booking_appointments: "Reservas o citas",
  ticketing_events: "Entradas o eventos",
  sales_clients: "Ventas y clientes",
  academies_memberships: "Academias o membresias",
  client_portal: "Portal de clientes",
  automation: "Automatizacion",
  website_ecommerce: "Web estrategica o ecommerce",
  custom_system: "Sistema a medida",
  not_sure: "No estoy seguro todavia",
};

function getResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return null;

  resendClient ??= new Resend(resendApiKey);
  return resendClient;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function safeValue(value?: string) {
  return escapeHtml(value?.trim() || "No indicado");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({success: false, message: "Invalid payload"}, {status: 400});
  }

  const parsed = auditSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({success: false, message: "Invalid payload"}, {status: 400});
  }

  const data = parsed.data;
  const payload = {
    nombre: data.nombre,
    email: data.email,
    empresa: data.empresa,
    url: data.url?.trim() || undefined,
    solutionType: data.solutionType,
    solutionLabel: solutionLabels[data.solutionType],
    message: data.message,
    createdAt: new Date().toISOString(),
    source: "nexsystems-landing",
  };

  let delivered = false;
  const resend = getResendClient();
  const emailTo = process.env.EMAIL_TO;
  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (resend && emailTo) {
    try {
      const safeMessage = safeValue(payload.message).replaceAll("\n", "<br />");
      const resendResult = await resend.emails.send({
        from: "NexSystems <onboarding@resend.dev>",
        to: [emailTo],
        subject: "Nueva solicitud de diagnostico digital",
        html: `
          <h2>Nueva solicitud de diagnostico digital</h2>
          <p><strong>Nombre:</strong> ${safeValue(payload.nombre)}</p>
          <p><strong>Email:</strong> ${safeValue(payload.email)}</p>
          <p><strong>Empresa:</strong> ${safeValue(payload.empresa)}</p>
          <p><strong>URL:</strong> ${safeValue(payload.url)}</p>
          <p><strong>Tipo de solucion:</strong> ${safeValue(payload.solutionLabel)}</p>
          <p><strong>Mensaje:</strong><br />${safeMessage}</p>
          <p><strong>Fecha:</strong> ${safeValue(payload.createdAt)}</p>
        `,
      });

      if (resendResult.error) {
        console.error("Resend delivery error", resendResult.error);
      } else {
        delivered = true;
      }
    } catch (error) {
      console.error("Resend delivery failed", error);
    }
  }

  if (sheetsWebhook) {
    try {
      const sheetsResponse = await fetch(sheetsWebhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      if (!sheetsResponse.ok) {
        console.error("Google Sheets webhook failed", sheetsResponse.status);
      } else {
        delivered = true;
      }
    } catch (error) {
      console.error("Google Sheets webhook error", error);
    }
  }

  if (!delivered) {
    try {
      const fallbackDir = join(process.cwd(), "data");
      await mkdir(fallbackDir, {recursive: true});
      await appendFile(join(fallbackDir, "auditoria-leads.ndjson"), `${JSON.stringify(payload)}\n`, "utf8");
    } catch (error) {
      console.error("Local lead fallback failed", error);
      return NextResponse.json({success: false, message: "Unexpected server error"}, {status: 500});
    }
  }

  return NextResponse.json({success: true}, {status: 200});
}
