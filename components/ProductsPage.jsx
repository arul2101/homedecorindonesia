import dynamic from "next/dynamic";

const ProductsGrid = dynamic(() => import("@/components/ProductsGrid"), { ssr: false });

export default function ProductsPage({ products, category, categoryId }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{category}</h1>
      <p>Showing all {products.length} results</p>

      {!categoryId ? (
        <p className="text-sm text-gray-500">
          Kategori <q>{category}</q> tidak ditemukan.
        </p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-500">Produk tidak tersedia.</p>
      ) : (
        <ProductsGrid products={products} />
      )}
    </main>
  )
}
