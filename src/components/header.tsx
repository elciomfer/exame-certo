"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "motion/react";
import { FileText, Languages, Menu, Moon, Sun } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/constants/company";
import { navigation, results, section } from "@/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const languages = [
  { value: "pt-BR", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

/* true só no cliente, sem setState dentro de useEffect */
const useMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label="Alternar tema claro e escuro"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="flex"
        >
          {isDark ? <Moon /> : <Sun />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

function LanguageMenu() {
  // TODO: ligar ao i18n quando existir. Por enquanto só guarda a escolha.
  const [language, setLanguage] = useState("pt-BR");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Idioma"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
      >
        <Languages />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          {languages.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* Links do menu mobile entram em cascata quando o Sheet abre */
const mobileList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const mobileItem: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(section);

  // Transparente no topo, vidro fosco depois de rolar
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border/60 bg-background/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-12 max-w-5xl items-center gap-2 px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Marca */}
        <Link href="/" aria-label={`${site.name}, página inicial`} className="mr-auto md:mr-0 md:justify-self-start">
          <Logo className="text-[0.95rem]" />
        </Link>

        {/* Navegação (desktop) com indicador que desliza até o link ativo */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate block rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Ações */}
        <div className="flex items-center justify-end gap-1">
          <motion.a
            href={results}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={cn(buttonVariants({ size: "sm" }), "mr-1 rounded-full px-4 text-xs")}
          >
            <FileText className="hidden sm:block" />
            Retirar exame
          </motion.a>

          <div className="hidden items-center gap-1 md:flex">
            <ThemeToggle />
            <LanguageMenu />
          </div>

          {/* Menu (mobile) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Abrir menu"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full md:hidden")}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="top" className="gap-0 pb-6">
              <SheetHeader>
                <SheetTitle className="font-sans">
                  <Logo className="text-[0.95rem]" />
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Principal" className="px-4">
                <motion.ul variants={mobileList} initial="hidden" animate="show" className="flex flex-col">
                  {navigation.map(({ label, href }) => (
                    <motion.li key={href} variants={mobileItem}>
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block py-2.5 font-heading text-3xl font-semibold transition-colors hover:text-foreground",
                          active === href.slice(1) ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <Separator className="my-4" />

              <div className="flex items-center justify-between px-4">
                <span className="text-xs text-muted-foreground">Tema e idioma</span>
                <div className="flex items-center gap-1">
                  <ThemeToggle />
                  <LanguageMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
