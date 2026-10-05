import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion";
import { ThemeProvider } from "@/components/providers/theme";
import { site } from "@/constants/company";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: `${site.name} | Análises clínicas em ${site.address.city}`,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full scroll-smooth scroll-pt-12 antialiased", "font-sans", inter.variable)}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
