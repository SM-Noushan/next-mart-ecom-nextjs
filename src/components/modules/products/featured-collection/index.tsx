"use client";

import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";

const FeaturedCollection = ({ categories }: { categories: ICategory[] }) => {
  const prevRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useRef<HTMLButtonElement>(null);

  const [prevDisabled, setPrevDisabled] = React.useState(false);
  const [nextDisabled, setNextDisabled] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (prevRef.current && nextRef.current) {
        setPrevDisabled(prevRef.current.disabled);
        setNextDisabled(nextRef.current.disabled);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold my-5">Featured Collection </h2>
        <div className="flex gap-2">
          {[prevRef, nextRef].map((ref, idx) => (
            <Button
              key={idx}
              onClick={() => ref.current?.click()}
              disabled={idx === 0 ? prevDisabled : nextDisabled}
              size="sm"
            >
              {idx === 1 ? "Next" : "Prev"}
            </Button>
          ))}
        </div>
      </div>
      <CarouselContent>
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CarouselItem
            key={idx}
            className="basis-1/2 md:basis-1/4 lg:basis-1/6"
          >
            <CategoryCard category={category} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden" ref={prevRef} />
      <CarouselNext className="hidden" ref={nextRef} />
    </Carousel>
  );
};

export default FeaturedCollection;
