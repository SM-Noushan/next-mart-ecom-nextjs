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
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedData = null;

  if (accessToken) decodedData = await jwtDecode(accessToken);

  return decodedData;
};

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
        response: token,
      }),
    });
    return res.json();
  } catch (error: any) {
    // console.log(error);
    return Error(error);
  }
};

export const logOutUser = async () => (await cookies()).delete("accessToken");
