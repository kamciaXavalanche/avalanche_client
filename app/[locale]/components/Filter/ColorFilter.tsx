"use client";

import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface FilterProps {
  title: string;
  subitems: string[];
  activeParams: string[];
  setActiveParams: (param: any) => void;
  setColors: (colors: string[]) => void; // New prop for setting colors array
}

const ColorFilter: React.FC<FilterProps> = ({
  title,
  subitems,
  activeParams,
  setActiveParams,
  setColors, // Include setColors in the props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempParams, setTempParams] = useState<string[]>(activeParams); // Temporary array of selected parameters

  const handleClick = (item: string) => {
    // Update the temporary array tempParams when a subitem is clicked
    if (!tempParams.includes(item)) {
      setTempParams((prev) => [...prev, item]);
    } else {
      setTempParams((prev) => prev.filter((param) => param !== item));
    }
  };

  const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    // Apply filtering only when "apply" is clicked
    setActiveParams(tempParams);
    setColors(tempParams); // Update the colors array using setColors
    setIsOpen(false); // Close the form when "apply" is clicked
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
        <form
          className="absolute z-20 h-fit w-full bg-white border px-4 py-3 flex flex-col gap-2"
          onSubmit={handleApply} // Handle form submission
        >
          {subitems.map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-4 h-4 border border-black ${
                  tempParams.includes(item) && "bg-black"
                } `}
              />
              <p className="uppercase">{item}</p>
            </div>
          ))}
          <button
            type="submit"
            className="bg-black text-white uppercase text-center w-full py-1 mt-3"
          >
            apply
          </button>
        </form>
      )}
    </div>
  );
};

export default ColorFilter;
