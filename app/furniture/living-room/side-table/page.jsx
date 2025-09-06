import ProductsPage from "@/components/ProductsPage";
import { fetchJson } from "@/lib/utils";

async function getBedsCategoryId() {
  let cats = await fetchJson(`/products/categories?slug=side-table&per_page=1`);
  if (Array.isArray(cats) && cats[0]?.id) return cats[0].id;

  cats = await fetchJson(`/products/categories?per_page=100`);
  if (!Array.isArray(cats)) return null;

  let match = cats.find((c) => (c?.slug || '').toLowerCase() === 'side-table');
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('side-table'));
  if (match) return match.id;
  return match ? match.id : null;
}


export const metadata = {
  title: 'Side Table',
};

export default async function SideTablePage() {
  const categoryId = await getBedsCategoryId();
  let products = [];

  if (categoryId) {
    const data = await fetchJson(
      `/products?category=${categoryId}&per_page=100`
    );
    products = Array.isArray(data) ? data : [];
  }

  return <ProductsPage categoryId={categoryId} products={products} category="Side Table" />
}

