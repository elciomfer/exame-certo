"use client";

import { useState } from "react";
import { ExternalLink, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/* Portal da Worklab: o form envia direto para lá e o resultado abre em outra aba */
const ACTION = "https://portal.worklabweb.com.br/resultados/4127";

const opcoes = [
  { value: "paciente", label: "Paciente" },
  { value: "medico", label: "Médico" },
  { value: "convenio", label: "Convênio" },
  { value: "unidade", label: "Unidade" },
] as const;

type Opcao = (typeof opcoes)[number]["value"];

const field = "h-11 rounded-xl bg-background";

export function Result() {
  const [opcao, setOpcao] = useState<Opcao>("paciente");

  return (
    <div className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
      <form method="post" action={ACTION} target="_blank" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="tbCodigo">Chave</Label>
          <Input
            id="tbCodigo"
            name="tbCodigo"
            type="text"
            maxLength={16}
            autoComplete="username"
            required
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tbSenha">Senha</Label>
          <Input
            id="tbSenha"
            name="tbSenha"
            type="password"
            maxLength={16}
            autoComplete="current-password"
            required
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="rdbOpcao">Acessar como</Label>
          {/* A prop "name" faz o Radix renderizar um <select> nativo oculto,
              então o valor é enviado normalmente junto com o form */}
          <Select name="rdbOpcao" value={opcao} onValueChange={(v) => setOpcao(v as Opcao)}>
            <SelectTrigger id="rdbOpcao" className={`${field} w-full data-[size=default]:h-11`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {opcoes.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-2 h-11 w-full rounded-full">
          Ver resultados
        </Button>
      </form>

      <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
        <LockKeyhole className="mt-px size-3.5 shrink-0 text-primary" />
        Seus dados vão direto para o portal seguro do laboratório e o resultado abre em uma nova aba.
      </p>

      <a
        href={ACTION}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        Prefere acessar pelo portal? <ExternalLink className="size-3" />
      </a>
    </div>
  );
}
