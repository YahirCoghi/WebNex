import {Resend} from "resend";
import {NextResponse} from "next/server";
import {appendFile, mkdir} from "node:fs/promises";
import {join} from "node:path";
import {auditSchema} from "@/lib/validations";

const resendApiKey = process.env.RESEND_API_KEY;
const emailTo = process.env.EMAIL_TO;
const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;
export const runtime = "nodejs";

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = auditSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({success: false, message: "Invalid payload"}, {status: 400});
    }

    const payload = {
      ...parsed.data,
      createdAt: new Date().toISOString(),
      source: "nexsystems-landing",
    };

    const safeNombre = escapeHtml(payload.nombre);
    const safeEmail = escapeHtml(payload.email);
    const safeUrl = escapeHtml(payload.url);
    let delivered = false;
    const channels: string[] = [];

    if (resend && emailTo) {
      const resendResult = await resend.emails.send({
        from: "NexSystems <onboarding@resend.dev>",
        to: [emailTo],
        subject: "Nueva solicitud de auditoria",
        html: `<h2>Nueva auditoria</h2><p><strong>Nombre:</strong> ${safeNombre}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>URL:</strong> ${safeUrl}</p><p><strong>Fecha:</strong> ${payload.createdAt}</p>`,
      });
      if (resendResult.error) {
        console.error("Resend delivery error", resendResult.error);
      } else {
        delivered = true;
        channels.push("resend");
      }
    }

    if (sheetsWebhook) {
      const sheetsResponse = await fetch(sheetsWebhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      if (!sheetsResponse.ok) {
        console.error("Google Sheets webhook failed", sheetsResponse.status);
      } else {
        delivered = true;
        channels.push("sheets");
      }
    }

    if (!delivered) {
      const fallbackDir = join(process.cwd(), "data");
      await mkdir(fallbackDir, {recursive: true});
      await appendFile(join(fallbackDir, "auditoria-leads.ndjson"), `${JSON.stringify(payload)}\n`, "utf8");
      channels.push("local");
    }

    return NextResponse.json({success: true, channels}, {status: 200});
  } catch {
    return NextResponse.json(
      {success: false, message: "Unexpected server error"},
      {status: 500},
    );
  }
}
