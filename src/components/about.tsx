import Image from "next/image";
import { HeartHandshake, Microscope, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/reveal";

/* Os três pilares que aparecem no cartão da marca */
const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Precisão e segurança",
    text: "Processos controlados em cada etapa, da coleta à liberação do laudo.",
  },
  {
    icon: Microscope,
    title: "Qualidade laboratorial",
    text: "Análises feitas com rigor técnico para resultados em que você pode confiar.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado com você",
    text: "Atendimento acolhedor, do primeiro contato até a entrega do resultado.",
  },
];

export function About() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
      <div>
        <Reveal>
          <p className="text-[0.7rem] font-medium tracking-[0.25em] text-primary uppercase">Sobre nós</p>
          <h2 className="mt-3 text-4xl leading-tight font-semibold text-balance md:text-5xl">
            Cuidar de você é o nosso <span className="text-rose-strong italic">superpoder.</span>
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
            A {""}
            <span className="font-medium text-foreground">Exame Certo</span> é um laboratório de análises clínicas que
            une precisão técnica e atendimento acolhedor. Cada etapa é feita com atenção, para você ter tranquilidade no
            que mais importa: a sua saúde.
          </p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title}>
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="size-5 text-primary" aria-hidden />
              </span>
              <h3 className="mt-3 font-sans text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Destaque da coleta infantil, com os adesivos "Eu fui corajoso(a)" */}
      {/* <Reveal delay={0.2}>
        <figure className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
          <Image
            src={coragem}
            alt="Adesivos da Exame Certo com um ursinho super-herói: 'Eu fui corajoso no' e 'Eu fui corajosa no'"
            sizes="(min-width: 768px) 420px, 90vw"
            placeholder="blur"
            className="mx-auto h-auto w-full max-w-sm"
          />
          <figcaption className="mt-6 text-center">
            <span className="block font-heading text-xl font-semibold">Pequenos corajosos</span>
            <span className="mt-1 block text-sm text-pretty text-muted-foreground">
              Na coleta infantil, cada criança sai com o seu adesivo de coragem.
            </span>
          </figcaption>
        </figure>
      </Reveal> */}
    </div>
  );
}
