import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Ingresa tu nombre (mínimo 2 caracteres).")
    .max(80, "El nombre es demasiado largo."),
  email: z.string().email("Ingresa un correo electrónico válido."),
  phone: z
    .string()
    .min(6, "Ingresa un teléfono válido.")
    .max(20, "El teléfono es demasiado largo.")
    .regex(/^[0-9+\s()-]+$/, "El teléfono solo puede contener números."),
  message: z
    .string()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(1000, "El mensaje es demasiado largo."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
