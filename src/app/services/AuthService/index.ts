"use server";

import baseApi from "../baseApi";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(baseApi + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success)
      (await cookies()).set("accessToken", result?.data?.accessToken);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(baseApi + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success)
      (await cookies()).set("accessToken", result?.data?.accessToken);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")!.value;

  let decodedData = null;

  if (accessToken) decodedData = await jwtDecode(accessToken);

  return decodedData;
};
