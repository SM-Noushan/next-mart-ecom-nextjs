"use server";

import baseApi from "../baseApi";
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

    return res.json();
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

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
