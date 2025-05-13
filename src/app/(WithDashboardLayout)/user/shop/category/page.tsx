import { fetchAllCategories } from "@/app/services/Category";
import ManageCategories from "@/components/modules/shop/category";

const ProductCategoryPage = async () => {
  const { data } = await fetchAllCategories();
  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
