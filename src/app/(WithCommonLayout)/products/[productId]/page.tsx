import NMContainer from "@/components/ui/core/NMContainer";
import { fetchSingleProduct } from "@/app/services/Product";
import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/product-details";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await fetchSingleProduct(productId);

  return (
    <NMContainer>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <ProductDetails product={product} />
    </NMContainer>
  );
};

export default ProductDetailsPage;
