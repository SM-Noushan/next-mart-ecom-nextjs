import AllProducts from "@/components/modules/products";
import { fetchAllProducts } from "@/app/services/Product";
import NMContainer from "@/components/ui/core/NMContainer";
import { fetchAllCategories } from "@/app/services/Category";
import ProductBanner from "@/components/modules/products/banner";
import FeaturedCollection from "@/components/modules/products/featured-collection";

const AllProductsPage = async () => {
  const { data: categories } = await fetchAllCategories();
  const { data: products } = await fetchAllProducts();

  return (
    <NMContainer>
      <ProductBanner title="All Products" path="Home - Products" />
      <FeaturedCollection categories={categories} />

      <AllProducts products={products} />
    </NMContainer>
  );
};

export default AllProductsPage;
