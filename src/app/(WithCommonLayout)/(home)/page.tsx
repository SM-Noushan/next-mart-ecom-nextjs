import Category from "@/components/modules/home/category";
import TopBrands from "@/components/modules/home/top-brands";
import FlashSale from "@/components/modules/home/flash-sale";
import HeroSection from "@/components/modules/home/hero-section";
import FeaturedProducts from "@/components/modules/home/featured-products";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
    </>
  );
};

export default HomePage;
