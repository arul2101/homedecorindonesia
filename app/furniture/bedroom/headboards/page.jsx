import ProductsPage from "@/components/ProductsPage";
import { fetchJson } from "@/lib/utils";


async function getBedsCategoryId() {
  let cats = await fetchJson(`/products/categories?slug=headboards&per_page=1`);
  if (Array.isArray(cats) && cats[0]?.id) return cats[0].id;

  cats = await fetchJson(`/products/categories?per_page=100`);
  if (!Array.isArray(cats)) return null;

  let match = cats.find((c) => (c?.slug || '').toLowerCase() === 'headboards');
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('headboards'));
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('heads'));
  return match ? match.id : null;
}


export const metadata = {
  title: 'Headboards',
};

export default async function HeadboardsPage() {
  const categoryId = await getBedsCategoryId();
  let products = [];

  if (categoryId) {
    const data = await fetchJson(
      `/products?category=${categoryId}&per_page=100`
    );
    products = Array.isArray(data) ? data : [];
  }

  return <ProductsPage categoryId={categoryId} products={products} category="Headboards" />
}

