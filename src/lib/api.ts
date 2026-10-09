import { Product } from "@/types/type";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  return res.json();
}