"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const fetchAllBrands = async () => {
  try {
    const res = await fetch(baseApi + "/brand", {
      next: {
        tags: ["BRAND"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const createBrand = async (data: FormData) => {
  try {
    const res = await fetch(baseApi + "/brand", {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteBrand = async (brandId: string) => {
  try {
    const res = await fetch(baseApi + "/brand/" + brandId, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
