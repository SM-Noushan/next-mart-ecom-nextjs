import Category from "@/components/modules/home/category";
import HeroSection from "@/components/modules/home/hero-section";
import FeaturedProducts from "@/components/modules/home/featured-products";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Category />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
