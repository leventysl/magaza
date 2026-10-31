import {
  CATEGORIES,
  PRODUCTS,
  collectOptionValues,
  stockBySku,
  variantOptions,
  variantTitle,
} from "../catalog-seed";

describe("catalog seed", () => {
  const skus = PRODUCTS.flatMap((product) => product.variants.map((variant) => variant.sku));

  it("uses unique SKUs and product handles", () => {
    expect(new Set(skus).size).toBe(skus.length);
    const handles = PRODUCTS.map((product) => product.handle);
    expect(new Set(handles).size).toBe(handles.length);
  });

  it("puts every product in a known category", () => {
    const categories = new Set(CATEGORIES.map((category) => category.handle));
    for (const product of PRODUCTS) {
      expect(categories.has(product.category)).toBe(true);
    }
  });

  it("gives every variant exactly the product's options and a positive price", () => {
    for (const product of PRODUCTS) {
      for (const variant of product.variants) {
        expect(Object.keys(variant.options).sort()).toEqual([...product.options].sort());
        expect(variant.price).toBeGreaterThan(0);
        expect(variant.stock).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("keeps variant option combinations unique within a product", () => {
    for (const product of PRODUCTS) {
      const titles = product.variants.map((variant) => variantTitle(product, variant));
      expect(new Set(titles).size).toBe(titles.length);
    }
  });

  it("includes out-of-stock and low-stock variants for the app's stock states", () => {
    const stock = [...stockBySku(PRODUCTS).values()];
    expect(stock).toContain(0);
    expect(stock.some((quantity) => quantity > 0 && quantity <= 3)).toBe(true);
  });

  it("maps option keys to Medusa option titles", () => {
    const product = PRODUCTS.find((p) => p.handle === "granit-tencere")!;
    const variant = product.variants[3];
    expect(variantTitle(product, variant)).toBe("20 cm / Bordo");
    expect(variantOptions(product, variant)).toEqual({ Ölçü: "20 cm", Renk: "Bordo" });
  });

  it("collects each option value once", () => {
    const values = collectOptionValues(PRODUCTS);
    expect(values.size).toEqual(["18 cm", "20 cm", "24 cm", "28 cm", "26 cm"]);
    expect(values.volume).toEqual(["5 L", "7 L"]);
  });
});
