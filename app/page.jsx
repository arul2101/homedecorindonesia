import WallpaperShowroomCarousel from '@/components/Carousel';
import CategorySection from '@/components/CategorySection';
import ProductsGrid from '@/components/ProductsGrid';
import ShopByRoom from '@/components/ShopByRoom';
import ShopByFabrics from '@/components/ShopByFabrics';

export default async function Home() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, { next: { revalidate: 60 } });
	const data = await res.json();
	const products = data?.products || [];

  return (
    <>
      <WallpaperShowroomCarousel />
      <CategorySection />
      <ShopByRoom />
      <ShopByFabrics />
      <ProductsGrid products={products} />
    </>
  );
}