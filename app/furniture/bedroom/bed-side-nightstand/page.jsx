import { fetchJson } from "@/lib/utils";
import ProductsPage from "@/components/ProductsPage";

async function getBedsCategoryId() {
  let cats = await fetchJson(`/products/categories?slug=bed-side-nightstand&per_page=1`);
  if (Array.isArray(cats) && cats[0]?.id) return cats[0].id;

  cats = await fetchJson(`/products/categories?per_page=100`);
  if (!Array.isArray(cats)) return null;

  let match = cats.find((c) => (c?.slug || '').toLowerCase() === 'bed-side-nightstand');
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('bed-side-nightstand'));
  if (match) return match.id;
  return match ? match.id : null;
}


export const metadata = {
  title: 'Bed Side Nightstand',
};

export default async function BedSideNightstandPage() {
  const categoryId = await getBedsCategoryId();
  let products = [];

  if (categoryId) {
    const data = await fetchJson(
      `/products?category=${categoryId}&per_page=100&page=1&orderby=date&order=desc`
    );
    products = Array.isArray(data) ? data : [];
  }

  return <ProductsPage categoryId={categoryId} products={products} category="Bed Side Nightstand" />
}

