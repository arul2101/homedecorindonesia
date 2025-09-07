import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const metadata = {
  title: 'Bed Benches',
};

export default async function BedBenchesPage() {
  const { products, categoryId } = await getProducts('bed-benches', ['bed-benches'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Bed Benches" />
}

