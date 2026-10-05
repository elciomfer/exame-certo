"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

const hidden = { opacity: 0, y: 24, filter: "blur(8px)" };
const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

/* Elemento único que surge ao entrar na tela. `delay` em segundos. */
const single: Variants = {
  hidden,
  show: (delay: number = 0) => ({ ...shown, transition: { duration: 0.8, ease, delay } }),
};

export function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={single}
      custom={delay}
      {...props}
    />
  );
}

/* Grupo que revela os filhos (RevealItem) um após o outro. */
export function RevealGroup({ stagger = 0.08, ...props }: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    />
  );
}

const item: Variants = {
  hidden,
  show: { ...shown, transition: { duration: 0.7, ease } },
};

export function RevealItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={item} {...props} />;
}
