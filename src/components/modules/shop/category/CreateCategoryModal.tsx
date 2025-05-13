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
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/app/services/Category";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

const CreateCategoryModal = () => {
  const [imageFiles, setImageFiles] = React.useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = React.useState<string[] | []>([]);

  const form = useForm();
  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // console.log(data);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("icon", imageFiles[0] as File);
      const res = await createCategory(formData);
      // console.log("create shop res", res);
      if (res.success) {
        toast.success(res.message);
        setImageFiles([]);
        setImagePreview([]);
        form.reset();
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Product Category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <div className="flex max-md:flex-col md:items-center justify-between mt-5 w-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-36 md:w-72"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="max-md:w-full">
                  {imagePreview.length > 0 ? (
                    <ImagePreviewer
                      setImageFiles={setImageFiles}
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                      className="mt-8 w-full max-md: *:mx-auto"
                    />
                  ) : (
                    <NMImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Icon"
                      className="mt-4 md:mt-8"
                    />
                  )}
                </div>
              </div>

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
    </div>
  );
};

export default CreateCategoryModal;
