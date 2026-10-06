import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/animations/reveal";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { site } from "@/constants/company";
import { navigation, results } from "@/constants/navigation";

const linkClass = "transition-colors hover:text-foreground hover:underline";

/* Os títulos das colunas são h2 por semântica, mas ficam na Montserrat (font-sans), não na Playfair */
const columnTitle = "font-sans font-semibold text-foreground";

export function Footer() {
  const { address } = site;

  return (
    <footer className="bg-muted text-xs text-muted-foreground">
      {/* Faixa com as cores da marca, como nos elementos gráficos da identidade */}
      <div aria-hidden className="flex h-1">
        <span className="flex-1 bg-sage" />
        <span className="flex-1 bg-rose" />
        <span className="flex-1 bg-wood" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <RevealGroup className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Marca */}
          <RevealItem className="sm:col-span-2">
            <Link href="/" aria-label={`${site.name}, página inicial`} className="inline-block text-foreground">
              <Logo tagline className="text-lg" />
            </Link>
            <p className="mt-4 max-w-xs text-pretty">{site.description}</p>
            <a href={results} className="mt-4 inline-block font-medium text-primary hover:underline">
              Retirar resultado de exame
            </a>
          </RevealItem>

          {/* Navegação */}
          <RevealItem>
            <nav aria-label="Rodapé">
              <h2 className={columnTitle}>Navegação</h2>
              <ul className="mt-3 space-y-2">
                {navigation.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className={linkClass}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealItem>

          {/* Contato */}
          <RevealItem>
            <h2 className={columnTitle}>Atendimento</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={site.phone.href} className={linkClass}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.district}, {address.city}/{address.state}
                    <br />
                    CEP {address.zip}
                  </address>
                </a>
              </li>
            </ul>
          </RevealItem>
        </RevealGroup>

        <p className="mt-10 max-w-2xl text-pretty">
          Os resultados de exames devem ser interpretados por um profissional de saúde. Em caso de dúvida, procure o
          médico que fez a solicitação.
        </p>

        <Separator className="my-6" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p>
            {site.legalName} · CNPJ {site.cnpj}
          </p>
        </div>
      </div>
    </footer>
  );
}
