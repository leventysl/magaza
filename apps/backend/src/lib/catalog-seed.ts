/**
 * Demo cookware catalog loaded on a fresh database by the initial data seed. Prices are in TRY
 * (major units) and purely illustrative; real products, prices and photos are managed in the
 * admin dashboard. A few variants have low or zero stock so the app's stock states are visible.
 */

export const OPTION_TITLES = {
  size: "Ölçü",
  color: "Renk",
  volume: "Hacim",
} as const;

export type OptionKey = keyof typeof OPTION_TITLES;

export type CategorySeed = {
  handle: string;
  name: string;
};

export type VariantSeed = {
  sku: string;
  options: Partial<Record<OptionKey, string>>;
  price: number;
  stock: number;
};

export type ProductSeed = {
  handle: string;
  title: string;
  category: string;
  material: string;
  description: string;
  weight: number;
  options: OptionKey[];
  variants: VariantSeed[];
};

export const CATEGORIES: CategorySeed[] = [
  { handle: "tencere-setleri", name: "Tencere Setleri" },
  { handle: "tencereler", name: "Tencereler" },
  { handle: "duduklu-tencereler", name: "Düdüklü Tencereler" },
  { handle: "tavalar", name: "Tavalar" },
];

const DEFAULT_STOCK = 50;

export const PRODUCTS: ProductSeed[] = [
  {
    handle: "granit-tencere-seti-7-parca",
    title: "Granit Tencere Seti 7 Parça",
    category: "tencere-setleri",
    material: "Granit kaplama alüminyum",
    description:
      "18, 20 ve 24 cm tencere ile 24 cm tava; cam kapaklı. Yapışmaz granit kaplama, indüksiyon dahil tüm ocaklarla uyumlu.",
    weight: 6500,
    options: ["color"],
    variants: [
      { sku: "GTS7-SIYAH", options: { color: "Siyah" }, price: 3499.9, stock: DEFAULT_STOCK },
      { sku: "GTS7-BORDO", options: { color: "Bordo" }, price: 3499.9, stock: 3 },
    ],
  },
  {
    handle: "celik-tencere-seti-9-parca",
    title: "Çelik Tencere Seti 9 Parça",
    category: "tencere-setleri",
    material: "18/10 paslanmaz çelik",
    description:
      "Dört tencere ve bir sos tenceresi; kapsül taban ısıyı eşit dağıtır. Bulaşık makinesinde yıkanabilir.",
    weight: 8200,
    options: ["color"],
    variants: [
      { sku: "CTS9-GUMUS", options: { color: "Gümüş" }, price: 4999.9, stock: DEFAULT_STOCK },
    ],
  },
  {
    handle: "granit-tencere",
    title: "Granit Tencere",
    category: "tencereler",
    material: "Granit kaplama alüminyum",
    description: "Hafif, yapışmaz granit kaplama; cam kapaklı ve buhar delikli.",
    weight: 1400,
    options: ["size", "color"],
    variants: [
      { sku: "GT-18-SIYAH", options: { size: "18 cm", color: "Siyah" }, price: 649.9, stock: DEFAULT_STOCK },
      { sku: "GT-18-BORDO", options: { size: "18 cm", color: "Bordo" }, price: 649.9, stock: DEFAULT_STOCK },
      { sku: "GT-20-SIYAH", options: { size: "20 cm", color: "Siyah" }, price: 749.9, stock: DEFAULT_STOCK },
      { sku: "GT-20-BORDO", options: { size: "20 cm", color: "Bordo" }, price: 749.9, stock: 2 },
      { sku: "GT-24-SIYAH", options: { size: "24 cm", color: "Siyah" }, price: 899.9, stock: DEFAULT_STOCK },
      { sku: "GT-24-BORDO", options: { size: "24 cm", color: "Bordo" }, price: 899.9, stock: 0 },
    ],
  },
  {
    handle: "celik-tencere",
    title: "Çelik Tencere",
    category: "tencereler",
    material: "18/10 paslanmaz çelik",
    description: "Kapsül tabanlı, ölçü çizgili paslanmaz çelik tencere.",
    weight: 1800,
    options: ["size"],
    variants: [
      { sku: "CT-18", options: { size: "18 cm" }, price: 799.9, stock: DEFAULT_STOCK },
      { sku: "CT-20", options: { size: "20 cm" }, price: 899.9, stock: DEFAULT_STOCK },
      { sku: "CT-24", options: { size: "24 cm" }, price: 1099.9, stock: DEFAULT_STOCK },
    ],
  },
  {
    handle: "dokum-guvec",
    title: "Döküm Güveç",
    category: "tencereler",
    material: "Emaye kaplı döküm demir",
    description: "Isıyı uzun süre tutar; ocakta ve fırında kullanılabilir. Ağır kapağı buharı içeride tutar.",
    weight: 4300,
    options: ["size"],
    variants: [
      { sku: "DG-20", options: { size: "20 cm" }, price: 1299.9, stock: DEFAULT_STOCK },
      { sku: "DG-24", options: { size: "24 cm" }, price: 1599.9, stock: 0 },
    ],
  },
  {
    handle: "celik-duduklu-tencere",
    title: "Çelik Düdüklü Tencere",
    category: "duduklu-tencereler",
    material: "18/10 paslanmaz çelik",
    description: "Çift emniyet valfli, tek elle kilitlenen kapak; pişirme süresini kısaltır.",
    weight: 3100,
    options: ["volume"],
    variants: [
      { sku: "CDT-5L", options: { volume: "5 L" }, price: 1899.9, stock: DEFAULT_STOCK },
      { sku: "CDT-7L", options: { volume: "7 L" }, price: 2199.9, stock: DEFAULT_STOCK },
    ],
  },
  {
    handle: "granit-tava",
    title: "Granit Tava",
    category: "tavalar",
    material: "Granit kaplama alüminyum",
    description: "Az yağla pişirme için yapışmaz granit kaplama; ısınmayan bakalit sap.",
    weight: 900,
    options: ["size"],
    variants: [
      { sku: "GTV-24", options: { size: "24 cm" }, price: 549.9, stock: DEFAULT_STOCK },
      { sku: "GTV-28", options: { size: "28 cm" }, price: 649.9, stock: DEFAULT_STOCK },
    ],
  },
  {
    handle: "dokum-tava",
    title: "Döküm Tava",
    category: "tavalar",
    material: "Döküm demir",
    description: "Yüksek ısıda mühürleme için ideal; kullandıkça doğal yapışmazlık kazanır.",
    weight: 2600,
    options: ["size"],
    variants: [
      { sku: "DTV-24", options: { size: "24 cm" }, price: 999.9, stock: DEFAULT_STOCK },
      { sku: "DTV-28", options: { size: "28 cm" }, price: 1199.9, stock: 1 },
    ],
  },
  {
    handle: "granit-krep-tavasi",
    title: "Granit Krep Tavası",
    category: "tavalar",
    material: "Granit kaplama alüminyum",
    description: "Alçak kenarlı, geniş tabanlı krep ve gözleme tavası.",
    weight: 800,
    options: ["size"],
    variants: [
      { sku: "GKT-26", options: { size: "26 cm" }, price: 449.9, stock: DEFAULT_STOCK },
    ],
  },
];

/** Every value each option takes across the catalog, in first-seen order. */
export function collectOptionValues(products: ProductSeed[]): Record<OptionKey, string[]> {
  const values: Record<OptionKey, string[]> = { size: [], color: [], volume: [] };
  for (const product of products) {
    for (const variant of product.variants) {
      for (const [key, value] of Object.entries(variant.options) as [OptionKey, string][]) {
        if (!values[key].includes(value)) values[key].push(value);
      }
    }
  }
  return values;
}

/** Display title of a variant, e.g. "20 cm / Bordo". */
export function variantTitle(product: ProductSeed, variant: VariantSeed): string {
  return product.options.map((key) => variant.options[key]).join(" / ");
}

/** Variant options keyed by the option titles Medusa stores. */
export function variantOptions(product: ProductSeed, variant: VariantSeed): Record<string, string> {
  return Object.fromEntries(
    product.options.map((key) => [OPTION_TITLES[key], variant.options[key] as string])
  );
}

export function stockBySku(products: ProductSeed[]): Map<string, number> {
  return new Map(products.flatMap((product) => product.variants.map((v) => [v.sku, v.stock])));
}
