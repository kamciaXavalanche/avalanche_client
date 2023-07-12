"use client";
import React, { useState } from "react";

const Search = () => {
  const [inputVisible, setInputVisible] = useState(false);

  const handleMouseEnter = () => {
    setInputVisible(true);
  };

  const handleMouseLeave = () => {
    setInputVisible(false);
  };

  return (
    <div className="flex h-5  lg:min-w-[16rem] relative">
      <input
        onMouseLeave={handleMouseLeave}
        type="text"
        placeholder="Szukaj"
        className={`outline-none border-b-2 border-textColor/90 py-4 w-full bg-transparent placeholder:text-textColor/90 ${
          inputVisible ? "block" : "hidden"
        }`}
      />
      <svg
        onMouseEnter={handleMouseEnter}
        className="w-[1.325rem] h-[1.325rem] absolute right-2 text-textColor/90  cursor-pointer "
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
    </div>
  );
};

export default Search;
