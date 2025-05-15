import { fetchAllBrands } from "@/app/services/Brand";
import ManageBrands from "@/components/modules/shop/brand";

const ProductBrandPage = async () => {
  const { data } = await fetchAllBrands();
  return (
    <div>
      <ManageBrands brands={data} />
    </div>
  );
};

export default ProductBrandPage;
