import dynamic from "next/dynamic";
import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

const ProductsGrid = dynamic(() => import("@/components/ProductsGrid"), { ssr: false });

async function fetchJson(path) {
  const base = process.env.NEXT_PUBLIC_WC_STORE_URL; // gunakan domain WooCommerce langsung
  const key = process.env.WC_READ_KEY;
  const secret = process.env.WC_READ_SECRET;

  // Basic Auth
  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch(`${base}/wp-json/wc/v3${path}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  return res.json();
}


async function getBedsCategoryId() {
  let cats = await fetchJson(`/products/categories?slug=sectional-corner-sofa&per_page=1`);
  if (Array.isArray(cats) && cats[0]?.id) return cats[0].id;

  cats = await fetchJson(`/products/categories?per_page=100`);
  if (!Array.isArray(cats)) return null;

  let match = cats.find((c) => (c?.slug || '').toLowerCase() === 'sectional-corner-sofa');
  if (match) return match.id;
  match = cats.find((c) => (c?.name || '').toLowerCase().includes('sectional-corner-sofa'));
  if (match) return match.id;
  return match ? match.id : null;
}


export const metadata = {
  title: 'Scectional Corner Sofas',
};

export default async function ScectionalCornerSofasPage() {
  const { products, categoryId } = await getProducts('sectional-corner-sofa', ['sectional-corner-sofa'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Scectional Corner Sofas" />
}

