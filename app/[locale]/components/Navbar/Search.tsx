"use client";

import { searchQueryAtom } from "@/app/[locale]/lib/atoms";
import { useAtom } from "jotai";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Search = ({ setToggleSearch }) => {
  const [inputQuery, setInputQuery] = useState("");
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const router = useRouter();
  const t = useTranslations("search");

  const handleInputChange = (e: any) => {
    setInputQuery(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchQuery(inputQuery); // Ustaw wartość searchQuery po zatwierdzeniu
    setToggleSearch(false);
    router.push("/search" + "?query=" + inputQuery);
  };

  return (
    <div className="flex w-full h-14 lg:h-20 bg-backgroundColor lg:border-t lg:border-textColor">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between w-full px-6 lg:px-20"
      >
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
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="square"
              >
                <path d="M18 18l-5.7096-5.7096"></path>
                <circle cx="7.2" cy="7.2" r="7.2"></circle>
              </g>
            </svg>
            <input
              onChange={handleInputChange}
              className="bg-transparent outline-none text-black w-full placeholder:text-textColor/90 uppercase text-md lg:text-lg"
              placeholder={`${t("search-input")} . . .`}
              type="text"
            />
          </div>
        </div>
        <div>
          <IoCloseOutline
            className="cursor-pointer text-3xl lg:text-4xl"
            onClick={() => setToggleSearch(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
