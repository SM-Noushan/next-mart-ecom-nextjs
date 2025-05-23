"use client";

import {
  useForm,
  FieldValues,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import Logo from "@/assets/svgs/Logo";
import { IBrand, ICategory } from "@/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/app/services/Product";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

type TAddProductFormProps = {
  categories: ICategory[];
  brands: IBrand[];
};

const AddProductForm = ({ categories, brands }: TAddProductFormProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      brand: "",
      stock: "",
      weight: "",
      category: "",
      description: "",
      keyFeatures: [{ value: "" }],
      availableColors: [{ value: "" }],
      specification: [{ key: "", value: "" }],
    },
  });
  const router = useRouter();
  const { isSubmitting } = form.formState;
  const [imageFiles, setImageFiles] = React.useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = React.useState<string[] | []>([]);

  const { append: appendColor, fields: colorFields } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });

  const addColor = () => appendColor({ value: "" });

  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });

  const addFeatures = () => appendFeatures({ value: "" });

  const { append: appendSpecs, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  const addSpecs = () => appendSpecs({ key: "", value: "" });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);

    const availableColors = data?.availableColors.map(
      (color: { value: string }) => color.value
    );

    const keyFeatures = data?.keyFeatures.map(
      (color: { value: string }) => color.value
    );

    const specification: { [key: string]: string } = {};
    data?.specification.forEach(
      (spec: { key: string; value: string }) =>
        (specification[spec.key] = spec.value)
    );

    // console.log({ availableColors, keyFeatures, specification });

    const modifiedData = {
      ...data,
      availableColors,
      keyFeatures,
      specification,
      price: parseFloat(data?.price),
      stock: parseInt(data?.stock),
      weight: parseFloat(data?.weight),
    };

    // console.log({ modifiedData });
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    for (const file of imageFiles) {
      formData.append("images", file);
    }
    try {
      const res = await createProduct(formData);
      // console.log({ res });
      if (res?.success) {
        toast.success(res?.message);
        router.push("/user/shop/product");
      } else toast.error(res?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center space-x-4 mb-5">
        <Logo />
        <h1 className="text-xl font-bold">Add Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Category*/}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category?._id} value={category?._id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand?._id} value={brand?._id}>
                          {brand?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            {/* Product Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Product Images */}
          <>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex max-md:flex-col gap-4">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="md:w-fit mt-0"
              />
              <ImagePreviewer
                className="flex max-md:justify-center flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </>

          {/* Product Colors */}
          <>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Colors</p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addColor}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {colorFields.map((colorField, index) => (
                <div key={colorField.id}>
                  <FormField
                    control={form.control}
                    name={`availableColors.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </>

          {/* Product Features */}
          <>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Key Features</p>
              <Button
                onClick={addFeatures}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`keyFeatures.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </>

          {/* Product Specification */}
          <>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Specifications</p>
              <Button
                onClick={addSpecs}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {specFields.map((specField, index) => (
              <div
                key={specField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specification.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`specification.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </>

          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Creating...." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
