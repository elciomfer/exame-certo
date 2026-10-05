"use client";

import { MotionConfig } from "motion/react";

/* reducedMotion="user": quem ativou "reduzir movimento" no sistema vê só fades, sem deslocamentos. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
