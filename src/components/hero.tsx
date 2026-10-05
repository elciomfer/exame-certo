"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronRight, FileText, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { RotatingWord } from "@/components/animations/rotating-word";
import { site } from "@/constants/company";
import { results } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import hero from "../../public/images/hero.jpg";

const words = ["lugar", "momento", "laboratório"];

/*
 * Ponto da foto que fica em evidência (x% y%). O assunto dela (seringa e tubo)
 * está à direita e embaixo, então os dois recortes puxam para lá.
 */
const photoFocus = "object-[58%_70%]";

/* A mesma foto, grande, com parallax suave dentro da moldura ao rolar. */
function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative isolate h-[clamp(14rem,34vh,26rem)] w-full overflow-hidden rounded-3xl bg-muted">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-y-[-10%] inset-x-0">
        <Image
          src={hero}
          alt="TODO: descreva o que aparece na foto"
          fill
          sizes="(min-width: 1024px) 980px, 100vw"
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          className={cn("object-cover", photoFocus)}
        />
      </motion.div>

      {/* Leve escurecimento embaixo para as pílulas ficarem legíveis */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent" />

      <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 sm:inset-x-4 sm:bottom-4">
        <span className="flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
          <FileText className="size-3.5" /> Resultados pela internet
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <Reveal>
        <p className="text-sm font-medium text-muted-foreground">Laboratório de análises clínicas</p>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-3 text-[clamp(2.25rem,7.5vw,4.5rem)] leading-[1.05] font-semibold tracking-tight">
          <span className="sr-only">O exame certo, no lugar certo.</span>
          <span aria-hidden>
            <span className="block">O exame certo,</span>
            <span className="block">
              no <RotatingWord words={words} className="text-muted-foreground" />{" "}
              <motion.span layout="position" className="inline-block">
                certo.
              </motion.span>
            </span>
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground md:text-lg">
          Cuidado em cada etapa, da coleta ao resultado, que você retira sem sair de casa.
        </p>
      </Reveal>

      <Reveal delay={0.35} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <a href={results} className={cn(buttonVariants(), "rounded-full px-5")}>
          <FileText /> Retirar exame
        </a>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium hover:underline"
        >
          Como chegar <ChevronRight className="size-4" />
        </a>
      </Reveal>

      <Reveal delay={0.45} className="mt-10 w-full">
        <HeroPhoto />
      </Reveal>
    </>
  );
}
