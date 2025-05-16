import { fetchAllProducts } from "@/app/services/Product";
import ManageProducts from "@/components/modules/shop/product";

const ManageProductsPage = async () => {
  const { data } = await fetchAllProducts();
  return <ManageProducts products={data} />;
};

export default ManageProductsPage;
