import Link from "next/link";
import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import { fetchAllCategories } from "@/app/services/Category";
import CategoryCard from "@/components/ui/core/CategoryCard";

const Category = async () => {
  const { data: categories } = await fetchAllCategories();
  return (
    <div className="container mx-auto my-20">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-8 my-5">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
