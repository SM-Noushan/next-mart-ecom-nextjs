import Link from "next/link";
import { IProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { fetchAllProducts } from "@/app/services/Product";
import ProductCard from "@/components/ui/core/ProductCard";

const FeaturedProducts = async () => {
  const { data: products } = await fetchAllProducts();

  return (
    <div className="bg-white bg-opacity-50 py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Featured Products</h2>
          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-8 my-5">
          {Array(5)
            .fill(products?.[0])
            .map((product: IProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
