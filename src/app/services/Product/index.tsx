"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const fetchAllProducts = async (page?: string) => {
  try {
    const res = await fetch(baseApi + `/product?page=${page}`, {
      next: {
        tags: ["PRODUCT"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const fetchSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(baseApi + "/product/" + productId);
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

export const updateProduct = async (data: FormData, productId: string) => {
  try {
    const res = await fetch(baseApi + "/product/" + productId, {
      method: "PATCH",
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
