"use client";

import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
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
import { createBrand } from "@/app/services/Brand";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

const CreateBrandModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [imageFiles, setImageFiles] = React.useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = React.useState<string[] | []>([]);

  const form = useForm();
  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // console.log(data);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("logo", imageFiles[0] as File);
      const res = await createBrand(formData);
      // console.log("create brand res", res);
      if (res.success) {
        toast.success(res.message);
        setImageFiles([]);
        setImagePreview([]);
        form.reset();
        setIsModalOpen(false);
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Create Brand</Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[85%] max-sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Create Product Brand</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-8 w-full *:mx-auto"
              />
            ) : (
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Logo"
                className="mt-4 md:mt-8 *:!w-full"
              />
            )}

            <Button
              disabled={isSubmitting}
              type="submit"
              className="mt-5 w-full"
            >
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandModal;
