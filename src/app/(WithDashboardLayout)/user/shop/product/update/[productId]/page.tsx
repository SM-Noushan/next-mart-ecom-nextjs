import { fetchAllBrands } from "@/app/services/Brand";
import { fetchSingleProduct } from "@/app/services/Product";
import { fetchAllCategories } from "@/app/services/Category";
import UpdateProductForm from "@/components/modules/shop/product/UpdateProductForm";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: brands } = await fetchAllBrands();
  const { data: categories } = await fetchAllCategories();
  const { data: product } = await fetchSingleProduct(productId);

  return (
    <div className="flex items-center justify-center">
      <UpdateProductForm
        brands={brands}
        product={product}
        categories={categories}
      />
    </div>
  );
};

export default UpdateProductPage;
