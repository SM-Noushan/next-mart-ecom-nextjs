"use client";

import Link from "next/link";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { toast } from "sonner";
import Logo from "@/app/assets/svgs/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "./loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/app/services/AuthService";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    try {
      const res = await loginUser(data);
      //   console.log(res);
      if (res?.success) toast.success(res?.message);
      else toast.error(res?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Don&#39;t have any account?&nbsp;
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
