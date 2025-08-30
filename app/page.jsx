import Carousel from '@/components/Carousel';
import ProductsGrid from '@/components/ProductsGrid';
import ShopByRoom from '@/components/Homepage/ShopByRoom';
import ShopByFabrics from '@/components/Homepage/ShopByFabrics';
import ShopByCategory from '@/components/Homepage/ShopByCategory';
import Services from '@/components/Homepage/Services';
import AccordionLuxurious from '@/components/Homepage/AccordionLuxurious';

export default async function Home() {
	// const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, { next: { revalidate: 60 } });
	// const data = await res.json();
	// const products = data?.products || [];

  return (
    <>
      <Carousel />
      <ShopByCategory />
      <ShopByRoom />
      <ShopByFabrics />
      <Services />
      <AccordionLuxurious />
      {/* <ProductsGrid products={products} /> */}
    </>
  );
}