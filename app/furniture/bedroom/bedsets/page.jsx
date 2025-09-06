import dynamic from "next/dynamic";
import { fetchJson } from "@/lib/utils";
import ProductsPage from "@/components/ProductsPage";

const ProductsGrid = dynamic(() => import("@/components/ProductsGrid"), { ssr: false });


async function getBedsCategoryId() {
  let cats = await fetchJson(`/products/categories?slug=bedsets&per_page=1`);
  if (Array.isArray(cats) && cats[0]?.id) return cats[0].id;

  cats = await fetchJson(`/products/categories?per_page=100`);
  if (!Array.isArray(cats)) return null;

  let match = cats.find((c) => (c?.slug || '').toLowerCase() === 'bedsets');
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('bedsets'));
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('beds'));
  return match ? match.id : null;
}


export const metadata = {
  title: 'Bed Sets',
};

export default async function BedSetsPage() {
  const categoryId = await getBedsCategoryId();
  let products = [];

  if (categoryId) {
    const data = await fetchJson(
      `/products?category=${categoryId}&per_page=100`
    );
    products = Array.isArray(data) ? data : [];
  }

  return <ProductsPage categoryId={categoryId} products={products} category="Bed Sets" />
}

