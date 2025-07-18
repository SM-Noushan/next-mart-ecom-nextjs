import { fetchAllProducts } from "@/app/services/Product";
import ManageProducts from "@/components/modules/shop/product";

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await fetchAllProducts(page);
  return <ManageProducts products={data} meta={meta} />;
};

export default ManageProductsPage;
