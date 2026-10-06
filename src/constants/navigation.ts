/* Links compartilhados entre header e footer. Os ids precisam existir no page.tsx. */
export const navigation = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Resultados", href: "#results" },
  { label: "Unidades", href: "#units" },
  { label: "Contato", href: "#contact" },
];

/* Ids das seções, usados para destacar o link ativo no header. */
export const section = navigation.map(({ href }) => href.slice(1));

/* Âncora da seção com o formulário de retirada de exames. */
export const results = "#results";
