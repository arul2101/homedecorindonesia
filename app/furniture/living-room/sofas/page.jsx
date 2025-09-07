import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";


export const metadata = {
  title: 'Sofa',
};

export default async function SofaPage() {
  const { products, categoryId } = await getProducts('sofas', ['sofas'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Sofa" />
}

