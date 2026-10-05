import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

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
          {/* TODO: sobre */}
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight">Sobre</h2>
          </Reveal>
        </section>

        <section id="results" className={section}>
          {/* TODO: formulário de retirada de exames */}
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight">Resultados</h2>
          </Reveal>
        </section>

        <section id="contact" className={cn(section, "bg-muted")}>
          {/* TODO: contato */}
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight">Contato</h2>
          </Reveal>
        </section>
      </main>

      <div className="snap-end">
        <Footer />
      </div>
    </>
  );
}
