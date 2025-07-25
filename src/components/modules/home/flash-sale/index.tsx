import React from "react";
import Link from "next/link";
import { IProduct } from "@/types";
import CountDown from "./CountDown";
import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";
import ProductCard from "@/components/ui/core/ProductCard";
import { fetchFlashSaleProducts } from "@/app/services/FlashSale";

const FlashSale = async () => {
  const { data: products } = await fetchFlashSaleProducts();

  return (
    products.length > 0 && (
      <div className=" bg-white bg-opacity-50 pt-6 pb-8">
        <NMContainer className="my-16">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-8">
              <h2 className="text-3xl font-bold">Flash Sale</h2>
              <CountDown />
            </div>

            <Link href="/products">
              <Button variant="outline" className="rounded-full">
                All Collection
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-10">
            {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </NMContainer>
      </div>
    )
  );
};

export default FlashSale;
