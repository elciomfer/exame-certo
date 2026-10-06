import { site } from "@/constants/company";

export type Unit = {
  id: string;
  name: string;
  street: string;
  district: string;
  city: string;
  state: string;
  zip: string;
  phone?: { display: string; href: string };
  /** Ex.: ["Seg a sex: 7h às 17h", "Sáb: 7h às 11h"] */
  hours?: string[];
};

/*
 * Unidades do laboratório. Hoje só a matriz; para incluir outra, basta adicionar
 * um objeto aqui. Com mais de uma, a seção mostra uma lista para trocar o mapa.
 */
export const units: Unit[] = [
  {
    id: "itaiopolis",
    name: `Unidade ${site.address.city}`,
    ...site.address,
    phone: site.phone,
    hours: undefined, // TODO: horário de atendimento e de coleta
  },
];

const query = (u: Unit) => `${u.street}, ${u.district}, ${u.city} - ${u.state}, ${u.zip}`;

/* Mapa incorporado do Google, sem precisar de chave de API */
export const mapEmbedUrl = (u: Unit) => `https://www.google.com/maps?q=${encodeURIComponent(query(u))}&output=embed`;

/* Link que abre o Google Maps (ou o app no celular) com a rota */
export const mapLinkUrl = (u: Unit) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query(u))}`;
