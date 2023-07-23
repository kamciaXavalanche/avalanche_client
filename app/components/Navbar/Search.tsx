"use client";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Search = ({ setToggleSearch }) => {
  return (
    <div className="flex w-full h-14 lg:h-20 bg-backgroundColor lg:border-t lg:border-textColor">
      <div className="flex items-center justify-between w-full px-6 lg:px-20">
        <div className="w-full">
          <div className="flex gap-4 w-full">
            <svg
              className="w-[1.325rem] h-[1.325rem] text-textColor  cursor-pointer "
              role="presentation"
              viewBox="0 0 21 21"
            >
              <g
                transform="translate(1 1)"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="square"
              >
                <path d="M18 18l-5.7096-5.7096"></path>
                <circle cx="7.2" cy="7.2" r="7.2"></circle>
              </g>
            </svg>
            <input
              className="bg-transparent outline-none text-black w-full placeholder:text-textColor/90 uppercase text-md lg:text-lg"
              placeholder="SZUKAJ . . ."
              type="text"
            />
          </div>
        </div>
        <div>
          <IoCloseOutline
            className="cursor-pointer text-3xl lg:text-4xl"
            onClick={() => setToggleSearch(false)}
            // size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
