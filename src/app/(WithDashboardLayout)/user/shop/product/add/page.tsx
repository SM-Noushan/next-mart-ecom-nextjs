import { fetchAllBrands } from "@/app/services/Brand";
import { fetchAllCategories } from "@/app/services/Category";
import AddProductForm from "@/components/modules/shop/product/AddProductForm";

const AddProductPage = async () => {
  const { data: brands } = await fetchAllBrands();
  const { data: categories } = await fetchAllCategories();

  return (
    <div className="flex items-center justify-center">
      <AddProductForm categories={categories} brands={brands} />
    </div>
  );
};

export default AddProductPage;
