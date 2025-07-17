import { ICategory } from "@/types";
import { fetchAllProducts } from "@/app/services/Product";
import NMContainer from "@/components/ui/core/NMContainer";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { fetchAllCategories } from "@/app/services/Category";
import ProductBanner from "@/components/modules/products/banner";
import AllProducts from "@/components/modules/products";

const AllProductsPage = async () => {
  const { data: categories } = await fetchAllCategories();
  const { data: products } = await fetchAllProducts();

  return (
    <NMContainer>
      <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection </h2>
      <div className="grid grid-cols-6 gap-6">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <AllProducts products={products} />
    </NMContainer>
  );
};

export default AllProductsPage;
