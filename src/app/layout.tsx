import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion";
import { ThemeProvider } from "@/components/providers/theme";
import { site } from "@/constants/company";
import { cn } from "@/lib/utils";

/* Tipografia da identidade visual: Montserrat para textos, Playfair Display para títulos e marca */
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"], // itálico de verdade, usado nos destaques em rosa
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: `${site.name} | Laboratório de análises clínicas`,
  description: site.description,
  // Os ícones estão em public/, então precisam ser apontados aqui
  icons: {
    icon: "/svgs/icon.svg",
    apple: "/images/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth scroll-pt-12 antialiased",
        "font-sans",
        montserrat.variable,
        playfair.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
