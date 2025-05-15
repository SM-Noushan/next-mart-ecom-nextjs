"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const fetchAllCategories = async () => {
  try {
    const res = await fetch(baseApi + "/category", {
      next: {
        tags: ["CATEGORY"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(baseApi + "/category", {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await fetch(baseApi + "/category/" + categoryId, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
