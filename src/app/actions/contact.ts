"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z.string().trim().max(20, "Telefone muito longo.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mínimo de 10 caracteres).")
    .max(2000, "Mensagem muito longa."),
  /* Campo invisível: pessoas não preenchem, robôs sim */
  website: z.string().max(0).optional(),
});

type Field = "name" | "email" | "phone" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    // Robô preencheu o campo invisível: finge sucesso e não envia nada
    if (parsed.error.issues.some((i) => i.path[0] === "website")) {
      return { status: "success", message: "Mensagem enviada! Responderemos em breve." };
    }

    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Confira os campos destacados.", errors };
  }

  const { name, email, phone, message } = parsed.data;
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("[contato] Variáveis RESEND_API_KEY, CONTACT_FROM_EMAIL ou CONTACT_TO_EMAIL não definidas.");
    return { status: "error", message: "Não foi possível enviar agora. Tente pelo WhatsApp ou telefone." };
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Contato pelo site: ${name}`,
    text: [`Nome: ${name}`, `E-mail: ${email}`, `Telefone: ${phone || "não informado"}`, "", message].join("\n"),
  });

  if (error) {
    console.error("[contato] Falha no envio:", error);
    return { status: "error", message: "Não foi possível enviar agora. Tente pelo WhatsApp ou telefone." };
  }

  return { status: "success", message: "Mensagem enviada! Responderemos em breve." };
}
