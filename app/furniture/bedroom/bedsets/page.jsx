import { getProducts } from "@/services/api";
import ProductsPage from "@/components/ProductsPage";

export const metadata = {
  title: 'Bed Sets',
};

export default async function BedSetsPage() {
  const { products, categoryId } = await getProducts("bedsets", ['bedsets', 'beds'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Bed Sets" />
}

