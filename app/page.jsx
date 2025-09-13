import Carousel from '@/components/Carousel';
import ShopByRoom from '@/components/Homepage/ShopByRoom';
import ShopByFabrics from '@/components/Homepage/ShopByFabrics';
import ShopByCategory from '@/components/Homepage/ShopByCategory';
import Services from '@/components/Homepage/Services';
import AccordionLuxurious from '@/components/Homepage/AccordionLuxurious';
import Reviews from '@/components/Homepage/Reviews';
import Showrooms from '@/components/Homepage/Showrooms';

export default async function Home() {

  return (
    <>
      <Carousel isActiveButton={false} />
      <ShopByCategory />
      <ShopByRoom />
      <ShopByFabrics />
      <Services />
      <AccordionLuxurious />
      <Reviews />
      <Showrooms />
    </>
  );
}