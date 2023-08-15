"use client";

import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function ProductSlider({ images }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [direction, setDirection] = useState(null);

  function nextSlide() {
    setDirection("left");
    setSlideNumber((prevSlideNumber) => (prevSlideNumber + 1) % images.length);
  }
  function prevSlide() {
    setDirection("right");
    setSlideNumber(
      (prevSlideNumber) => (prevSlideNumber - 1 + images.length) % images.length
    );
  }

  return (
    <div className="flex justify-between items-center relative basis-[65%] h-[82vh] ">
      <div
        className={`hidden lg:flex flex-col gap-4 w-[10rem] h-full overflow-y-scroll custom-scrollbar`}
      >
        {images?.map((item, index) => (
          <div
            onClick={() => setSlideNumber(index)}
            key={index}
            className={`border-2 w-full full cursor-pointer z-20 ${
              index === slideNumber && "border-black/70"
            }`}
          >
            <Image
              src={item?.attributes?.url || "#"}
              alt="product image"
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
        ))}
      </div>
      <BsChevronLeft
        className="cursor-pointer w-7 lg:w-9 lg:h-9 h-7 z-20 fill-textColor"
        onClick={prevSlide}
      />
      <div className="w-[25rem] h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="w-full h-full relative"
            key={slideNumber}
            initial={(direction) => ({
              x: direction === "left" ? "100%" : "-100%",
            })}
            animate={{ x: 0 }}
            exit={(direction) => ({
              x: direction === "left" ? "-100%" : "100%",
            })}
            transition={{ duration: 0.4 }}
            custom={direction}
          >
            <Image
              className="w-full h-full object-cover"
              src={images[slideNumber]?.attributes.url}
              alt="product image"
              fill
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <BsChevronRight
        className="cursor-pointer w-7 lg:w-9 lg:h-9 h-7 z-20 fill-textColor"
        onClick={nextSlide}
      />
    </div>
  );
}

export default ProductSlider;
