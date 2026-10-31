const formatters = new Map<string, Intl.NumberFormat>();

/** Medusa'nın ana birimdeki tutarını yerel para biçimine çevirir: 1299.9 → "₺1.299,90". */
export function formatPrice(amount: number, currencyCode: string): string {
  const currency = currencyCode.toUpperCase();
  let formatter = formatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency });
    formatters.set(currency, formatter);
  }
  return formatter.format(amount);
}
