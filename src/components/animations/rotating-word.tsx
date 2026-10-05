"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Palavra que troca de tempos em tempos, entrando de baixo e saindo por cima.
 * É só visual: coloque o texto completo num sr-only para leitores de tela.
 */
export function RotatingWord({
  words,
  interval = 2600,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    /*
     * clip-path em vez de overflow-hidden: overflow muda a linha de base do elemento
     * e desalinha a palavra do resto do texto. O recorte tem folga para acentos e descendentes.
     */
    <span className={cn("relative inline-flex [clip-path:inset(-0.2em_-0.1em)]", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
