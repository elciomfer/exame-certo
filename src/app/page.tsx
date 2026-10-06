import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/animations/reveal";
import { Units } from "@/components/units";
import { Contact } from "@/components/contact";
import { cn } from "@/lib/utils";
import { Result } from "@/components/form";

/*
 * Cada seção ocupa a área visível abaixo do header (48px = h-12).
 * No celular o snap é "proximity", então seções mais altas que a tela não travam a rolagem.
 */
const section =
  "flex min-h-[calc(100dvh-3rem)] snap-start flex-col justify-center px-[max(1.5rem,calc((100%-980px)/2))] py-16 md:snap-always";

export default function Home() {
  return (
    <>
      <Header />

      <main data-snap-page className="flex-1">
        <section id="home" className={cn(section, "items-center py-10 text-center")}>
          <Hero />
        </section>

        <section id="about" className={cn(section, "bg-muted")}>
          <About />
        </section>

        {/* O form fica fora do h2: dentro dele herdaria a fonte e o peso do título */}
        <section id="results" className={cn(section, "grid items-center gap-10 md:grid-cols-2")}>
          <Reveal>
            <p className="text-[0.7rem] font-medium tracking-[0.25em] text-primary uppercase">Resultados</p>
            <h2 className="mt-3 text-4xl leading-tight font-semibold text-balance md:text-5xl">
              Seu resultado, <span className="text-rose-strong italic">sem sair de casa.</span>
            </h2>
            <p className="mt-4 max-w-md text-pretty text-muted-foreground">
              Use a chave e a senha que você recebeu no atendimento para ver e baixar seus exames.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex justify-center md:justify-end">
            <Result />
          </Reveal>
        </section>

        <section id="units" className={cn(section, "bg-muted")}>
          <Units />
        </section>

        <section id="contact" className={section}>
          <Contact />
        </section>
      </main>

      <div className="snap-end">
        <Footer />
      </div>
    </>
  );
}
