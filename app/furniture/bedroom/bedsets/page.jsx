import dynamic from "next/dynamic";

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

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Bed Sets</h1>

      {!categoryId ? (
        <p className="text-sm text-gray-500">
          Kategori <q>Bedsets</q> tidak ditemukan.
        </p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-500">Produk tidak tersedia.</p>
      ) : (
        <ProductsGrid products={products} />
      )}
    </main>
  );
}

