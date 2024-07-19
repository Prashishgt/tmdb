// components/CarouselItem.js
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";

const CarouselItem = ({ item }) => {
  return (
    <div className="w-full h-screen lg:py-[12.813rem]">
      <MaxWidthWrapper>
        <div className="w-full flex-shrink-0 basis-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${item.backdrop_path}`}
            alt={item.id}
            className="w-full"
            fill
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CarouselItem;
