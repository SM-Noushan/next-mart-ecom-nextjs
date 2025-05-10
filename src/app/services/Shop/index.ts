"use server";

import baseApi from "../baseApi";
import { cookies } from "next/headers";

export const createShop = async (data: FormData) => {
  try {
    const res = await fetch(baseApi + "/shop", {
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
