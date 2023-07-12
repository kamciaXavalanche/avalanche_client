"use client";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface FilterProps {
  title: string;
  subitems: string[];
  activeParams: string[];
  setActiveParams: (param: any) => void;
  setCategory: (param: any) => void;
}

const Filter: React.FC<FilterProps> = ({
  title,
  subitems,
  activeParams,
  setActiveParams,
  setCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (item) => {
    if (!activeParams.includes(item)) {
      // Dodawanie nowego tagu, jeśli nie istnieje w tablicy activeParams
      setActiveParams((prev) => [...prev, item]);
      setCategory((prev) => [...prev, item]);
    } else {
      // Usuwanie tagu, jeśli już istnieje w tablicy activeParams
      setActiveParams((prev) => prev.filter((param) => param !== item));
      setCategory((prev) => prev.filter((param) => param !== item));
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center mb-2 py-2 px-6 w-[200px] bg-gray-200 border border-black text-black hover:text-white hover:bg-black cursor-pointer"
      >
        <div>{title.toUpperCase()}</div>
        <div>
          <BsChevronDown />
        </div>
      </div>
      {isOpen && subitems && subitems.length > 0 && (
        <div className="absolute z-20 h-fit w-full bg-white border px-6 py-3 flex flex-col gap-2">
          {subitems.map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-4 h-4 border border-black ${
                  activeParams.includes(item) && "bg-black"
                } `}
              />
              <p className="uppercase">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
