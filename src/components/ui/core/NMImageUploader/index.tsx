import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../../input";

type TNMImageUploaderProps = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  label?: string;
  className?: string;
};

const NMImageUploader = ({
  setImageFiles,
  setImagePreview,
  label = "Upload Images",
  className,
}: TNMImageUploaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prevFiles) => [...prevFiles, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prevPreview) => [
          ...prevPreview,
          reader.result as string,
        ]);
      };
      reader.readAsDataURL(file);
    }
    // Clear the input value after selection
    event.target.value = "";
  };
  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        className="hidden"
        id="image-uploader"
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
      />
      <label
        htmlFor="image-uploader"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        {label}
      </label>
    </div>
  );
};

export default NMImageUploader;
