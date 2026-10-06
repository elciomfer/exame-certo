"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronRight, FileText, Heart } from "lucide-react";
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
 * está à direita e embaixo, então o recorte puxa para lá.
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
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 inset-y-[-10%]">
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

      {/* Véu verde sálvia embaixo, para as pílulas ficarem legíveis e a foto conversar com a marca */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[oklch(0.35_0.05_163/0.6)] to-transparent"
      />

      <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 sm:inset-x-4 sm:bottom-4">
        <span className="flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
          <FileText className="size-3.5 text-primary" /> Resultados pela internet
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
          <Heart className="size-3.5 text-rose-strong" /> Cuidado com você
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <Reveal>
        <p className="text-[0.7rem] font-medium tracking-[0.25em] text-primary uppercase">
          Laboratório de análises clínicas
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-4 text-[clamp(2.25rem,7.5vw,4.5rem)] leading-[1.08] font-semibold">
          <span className="sr-only">O exame certo, no lugar certo.</span>
          <span aria-hidden>
            <span className="block">O exame certo,</span>
            <span className="block">
              {/* Itálico da Playfair em rosa, como os slogans da identidade visual */}
              no <RotatingWord words={words} className="text-rose-strong italic" />{" "}
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
          className="flex items-center text-sm font-medium text-primary hover:underline"
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
