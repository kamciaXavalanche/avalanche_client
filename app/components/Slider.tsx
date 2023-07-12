"use client";

import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { ApiSliderImageSliderImage } from "../types/schemas";

const Slider = ({ images }) => {
  const largeImages = images[0].attributes.ImagesXL.data;

  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % 3);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + 3) % 3);
  };

  return (
    <div className="w-full group h-[460px] overflow-hidden relative">
      <div
        className="w-full h-full flex transition-all duration-700 ease-in-out "
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {largeImages?.map((image) => (
          <div
            style={{
              backgroundImage: `url('${image.attributes.url}')`,
            }}
            className="w-full h-full flex-shrink-0 bg-cover lg:bg-center relative "
          >
            <div className="absolute w-full h-full bg-black/10"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-end justify-center gap-6 z-20">
        {largeImages?.map((i, index) => (
          <div
            onClick={() => setSlideIndex(index)}
            className={`mb-6 w-3.5 h-3.5 rounded-full cursor-pointer ${
              index === slideIndex ? "bg-gray-200" : "border"
            }`}
          />
        ))}
      </div>
      <div className="hidden group-hover:flex absolute inset-0  justify-between items-center px-6 lg:px-8">
        <BsChevronLeft
          onClick={prevSlide}
          className="cursor-pointer z-20 w-7 lg:w-14 lg:h-14 h-7 fill-gray-200"
        />
        <BsChevronRight
          onClick={nextSlide}
          className="cursor-pointer z-20 w-7 lg:w-14 lg:h-14  h-7 fill-gray-200"
        />
      </div>
    </div>
  );
};

export default Slider;
