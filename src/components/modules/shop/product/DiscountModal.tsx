"use client";

import React from "react";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addFlashSale } from "@/app/services/FlashSale";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IDiscountModalProps {
  selectedIdsForFlashSale: string[];
  setSelectedIdsForFlashSale: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiscountModal = ({
  selectedIdsForFlashSale,
  setSelectedIdsForFlashSale,
}: IDiscountModalProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const form = useForm();
  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      products: [...selectedIdsForFlashSale],
      discountPercentage: parseFloat(data.discountPercentage),
    };
    // console.log(payload);
    try {
      const res = await addFlashSale(payload);
      // console.log("add discount res", res);
      if (res.success) {
        toast.success(res.message);
        setIsModalOpen(false);
        form.reset();
        setSelectedIdsForFlashSale([]);
        router.push("/");
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button disabled={selectedIdsForFlashSale.length === 0}>
          Add Flash Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[85%] max-sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Create Product Brand</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 flex items-center justify-between gap-4"
          >
            <FormField
              control={form.control}
              name="discountPercentage"
              rules={{
                required: "Discount percentage is required",
                min: {
                  value: 0,
                  message: "Discount percentage cannot be negative",
                },
                max: {
                  value: 100,
                  message: "Discount percentage cannot exceed 100",
                },
              }}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ""}
                      placeholder="Discount Percentage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Adding Discount..." : "Add Discount"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
