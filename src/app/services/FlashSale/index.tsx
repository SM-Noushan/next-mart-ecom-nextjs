"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const addFlashSale = async (payload: {
  products: string[];
  discountPercentage: number;
}) => {
  try {
    const res = await fetch(baseApi + "/flash-sale", {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    ["PRODUCT", "FLASH_SALE_PRODUCTS"].forEach((tag) => revalidateTag(tag));
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const fetchFlashSaleProducts = async () => {
  try {
    const res = await fetch(baseApi + "/flash-sale", {
      next: {
        tags: ["FLASH_SALE_PRODUCTS"],
      },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
