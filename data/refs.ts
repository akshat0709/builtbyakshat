/**
 * Re-exporting from the product registry to satisfy backwards-compatible imports.
 * Directly backed by `data/products.ts`.
 */
import { PRODUCTS, getProductByRef, Product } from "./products";

export { PRODUCTS, getProductByRef };
export type { Product };

export const REF_MAPPINGS: Record<string, string> = Object.keys(PRODUCTS).reduce(
  (acc, key) => {
    acc[key] = PRODUCTS[key].name;
    return acc;
  },
  {} as Record<string, string>
);

export function getProjectNameFromRef(
  rawRef: string | null | undefined
): string | null {
  const product = getProductByRef(rawRef);
  return product ? product.name : null;
}
