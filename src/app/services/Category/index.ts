"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";

export const fetchAllCategories = async () => {
  try {
    const res = await fetch(baseApi + "/category");
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
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
