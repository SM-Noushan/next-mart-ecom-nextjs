"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const fetchAllProducts = async () => {
  try {
    const res = await fetch(baseApi + "/product", {
      next: {
        tags: ["PRODUCT"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const createProduct = async (data: FormData) => {
  try {
    const res = await fetch(baseApi + "/product", {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const res = await fetch(baseApi + "/product/" + productId, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
