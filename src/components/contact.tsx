"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Reveal } from "@/components/animations/reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/constants/company";
import { cn } from "@/lib/utils";

const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Exame Certo e gostaria de mais informações.",
)}`;

const field = "h-11 rounded-xl bg-background";

/* Campo com label e mensagem de erro ligada por aria-describedby */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const e = state.errors ?? {};

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const invalid = (name: keyof typeof e) =>
    e[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};

  return (
    <form ref={formRef} action={action} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Nome" error={e.name}>
          <Input id="name" name="name" autoComplete="name" required className={field} {...invalid("name")} />
        </Field>
        <Field id="phone" label="Telefone (opcional)" error={e.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className={field} {...invalid("phone")} />
        </Field>
      </div>

      <Field id="email" label="E-mail" error={e.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={field}
          {...invalid("email")}
        />
      </Field>

      <Field id="message" label="Mensagem" error={e.message}>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          className="min-h-28 resize-none rounded-xl bg-background"
          {...invalid("message")}
        />
      </Field>

      {/* Honeypot: escondido de pessoas e leitores de tela */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <Button
        type="submit"
        disabled={pending}
        className="mt-1 h-11 w-full rounded-full sm:w-auto sm:self-start sm:px-6"
      >
        {pending ? <Loader2 className="animate-spin" /> : <Send />}
        {pending ? "Enviando..." : "Enviar mensagem"}
      </Button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {state.status === "success" && (
          <span className="inline-flex items-center gap-1.5 text-primary">
            <CheckCircle2 className="size-4" /> {state.message}
          </span>
        )}
        {state.status === "error" && <span className="text-destructive">{state.message}</span>}
      </p>

      <p className="-mt-2 text-xs text-muted-foreground">Usamos seus dados apenas para responder ao seu contato.</p>
    </form>
  );
}

export function Contact() {
  return (
    <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr]">
      <Reveal className="flex flex-col gap-6">
        <div>
          <p className="text-[0.7rem] font-medium tracking-[0.25em] text-primary uppercase">Contato</p>
          <h2 className="mt-3 text-4xl leading-tight font-semibold text-balance md:text-5xl">
            Vamos <span className="text-rose-strong italic">conversar?</span>
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            Tire dúvidas sobre exames, preparo e coleta. O jeito mais rápido é pelo WhatsApp.
          </p>
        </div>

        {/* WhatsApp em destaque */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
          <div aria-hidden className="absolute -top-16 -right-16 -z-10 size-48 rounded-full bg-rose/40 blur-3xl" />
          <MessageCircle className="size-8" aria-hidden />
          <p className="mt-4 font-heading text-2xl font-semibold">Fale pelo WhatsApp</p>
          <p className="mt-1 text-sm text-primary-foreground/80">{site.whatsapp.display}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "mt-6 h-11 rounded-full px-6 text-secondary-foreground",
            )}
          >
            Iniciar conversa
          </a>
        </div>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3">
            <Phone className="size-4 text-primary" aria-hidden />
            <a href={site.phone.href} className="hover:underline">
              {site.phone.display}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="size-4 text-primary" aria-hidden />
            <a href={`mailto:${site.email}`} className="break-all hover:underline">
              {site.email}
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
          <p className="font-heading text-2xl font-semibold">Prefere e-mail?</p>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">Envie sua mensagem e retornamos o quanto antes.</p>
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
