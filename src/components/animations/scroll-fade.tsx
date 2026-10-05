"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/*
 * Conteúdo que encolhe e some suavemente conforme a página rola para baixo,
 * como nos heros da Apple. Ideal para o conteúdo do primeiro bloco da página.
 */
export function ScrollFade({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 com o conteúdo centralizado na tela, 1 quando o topo dele chega ao topo da tela
  const { scrollYProgress } = useScroll({ target: ref, offset: ["center center", "start start"] });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { opacity, scale, y }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
