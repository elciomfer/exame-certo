"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/*
 * O next-themes injeta um <script> que aplica o tema antes da página aparecer
 * (evita o "piscar" de claro para escuro). Com React 19.2 / Next 16, renderizar
 * esse script no cliente gera um aviso no console.
 *
 * Contorno: no servidor o script sai normal e roda no HTML inicial; no cliente
 * ele é marcado como "application/json", que não é executável, e o React para de avisar.
 */
const scriptProps = typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

export function ThemeProvider(props: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider scriptProps={scriptProps} {...props} />;
}
