import {z} from "zod";

export const auditSchema = z.object({
  nombre: z.string().trim().min(2, "validation.name_min"),
  email: z.string().trim().email("validation.email_invalid"),
  url: z.string().trim().url("validation.url_invalid"),
});

export type AuditInput = z.infer<typeof auditSchema>;
