import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const metadata = {
  title: 'Scectional Corner Sofas',
};

export default async function ScectionalCornerSofasPage() {
  const { products, categoryId } = await getProducts('sectional-corner-sofas', ['sectional-corner-sofas'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Scectional Corner Sofas" />
}

