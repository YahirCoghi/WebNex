import {z} from "zod";

export const solutionTypeValues = [
  "booking_appointments",
  "ticketing_events",
  "sales_clients",
  "academies_memberships",
  "client_portal",
  "automation",
  "website_ecommerce",
  "custom_system",
  "not_sure",
] as const;

export const auditSchema = z.object({
  nombre: z.string().trim().min(2, "validation.name_min"),
  email: z.string().trim().email("validation.email_invalid"),
  empresa: z.string().trim().min(2, "validation.company_min"),
  url: z.union([z.literal(""), z.string().trim().url("validation.url_invalid")]).optional(),
  solutionType: z.enum(solutionTypeValues, {message: "validation.solution_type_required"}),
  message: z.string().trim().min(10, "validation.message_min").max(1200, "validation.message_max"),
});

export type AuditInput = z.infer<typeof auditSchema>;
export type SolutionType = AuditInput["solutionType"];
