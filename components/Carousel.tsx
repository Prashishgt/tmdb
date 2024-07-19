import { NavigationButton } from "@/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

interface CarouselProps {
  items: {
    backdrop_path: string;
    id: string;
    title: string;
    release_date: string;
    genre_names: string[];
    overview: string;
    poster_path: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(nextSlide, 2000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (currentIndex >= items.length) {
      setCurrentIndex(items.length - 1);
    }
  }, [items, currentIndex]);

  const currentItem = items[currentIndex] || {};

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-screen h-screen relative flex-shrink-0"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${item.backdrop_path}`}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 z-20"
      >
        <NavigationButton className="bg-transparent" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 z-20"
      >
        <NavigationButton className="rotate-180 bg-transparent" />
      </button>
      <MaxWidthWrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border py-4 bg-opacity-50 bg-black text-white z-10">
        <div className="space-y-4">
          <h2 className="text-5xl font-extrabold">{currentItem.title}</h2>
          <div className="font-medium">
            {currentItem.release_date || "N/A"} |{" "}
            {currentItem.genre_names?.join(", ") || "N/A"}
          </div>
          <p className="text-lg font-normal">
            {currentItem.overview || "No overview available."}
          </p>
        </div>
      </MaxWidthWrapper>
      <div className="cursor-pointer absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-8 py-2 h-auto z-20 w-screen overflow-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "relative w-[8rem] h-[12rem] transition-all duration-300 border-[2px] border-color-secondary rounded-[10px]",
              {
                "translate-y-[-40px]": index === currentIndex,
              }
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <div className="w-[8rem] h-[12rem] relative rounded-[10px] overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${item.poster_path}`}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
