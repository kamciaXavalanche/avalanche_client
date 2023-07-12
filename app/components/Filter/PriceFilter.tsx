"use client";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BsChevronDown } from "react-icons/bs";

interface PriceFilterProps {
  activeParams: string[];
  setActiveParams: (param: any) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  setActiveParams,
  activeParams,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 1000]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleClick = () => {
    setActiveParams((prev: string[]) => {
      const updatedParams = [...prev];
      const priceFromIndex = updatedParams.findIndex((param) =>
        param.startsWith("PRICE FROM")
      );
      const priceToIndex = updatedParams.findIndex((param) =>
        param.startsWith("PRICE TO")
      );

      if (priceFromIndex !== -1) {
        updatedParams[priceFromIndex] = `PRICE FROM ${priceRange[0]}`;
      } else {
        updatedParams.push(`PRICE FROM ${priceRange[0]}`);
      }

      if (priceToIndex !== -1) {
        updatedParams[priceToIndex] = `PRICE TO ${priceRange[1]}`;
      } else {
        updatedParams.push(`PRICE TO ${priceRange[1]}`);
      }

      return updatedParams;
    });
  };
  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center py-2 px-6 w-[200px] bg-gray-200 border border-black text-black hover:text-white hover:bg-black cursor-pointer"
      >
        <div>PRICE</div>
        <div>
          <BsChevronDown />
        </div>
      </div>
      {isOpen && (
        <div className="absolute h-fit w-full bg-white border px-6 py-3 flex flex-col gap-2">
          <div>
            <div className="flex justify-between mb-4">
              <input
                className="outline-none w-[40px] border-b border-black"
                type="text"
                inputMode="numeric"
                pattern="[0-9]+"
                value={priceRange[0]}
              />
              <div>-</div>
              <input
                className="outline-none w-[40px] border-b border-black"
                type="text"
                inputMode="numeric"
                pattern="[0-9]+"
                value={priceRange[1]}
              />
            </div>
            <Slider
              min={0}
              max={1000}
              value={priceRange}
              onChange={handlePriceRangeChange}
              range
            />
            <button
              onClick={() => handleClick()}
              className="bg-black text-white uppercase text-center w-full py-1 mt-3"
            >
              apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
