"use client";

import { useState } from "react";
import Link from "next/link";

interface attributes {
  createdAt: string;
  name: string;
  publishedAt: string;
  updatedAt: string;
}

interface NavLiProps {
  title: string;
  isActive?: boolean;
  subcategories: attributes;
}

const NavLi: React.FC<NavLiProps> = ({
  subcategories,
  title,
  isActive = false,
}) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsSubMenuVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsSubMenuVisible(false);
    }
  };

  return (
    <div
      onClick={() => setIsSubMenuVisible(true)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative 
        text-lg
        font-medium
        cursor-pointer
        text-textColor
        capitalize
        after:content-[''] 
        after:w-full 
        after:h-[1.5px] 
        after:left-0 
        after:-bottom-[6px] 
        after:bg-textColor 
        after:scale-x-[0] 
        after:absolute 
        after:transition 
        after:duration-300 
        ${isActive && "after:scale-x-[1.1]"} 
        hover:after:scale-x-[1.1] 
        hover:after:bg-textColor
      `}
    >
      {title}
      <div
        className={`
          bg-backgroundColor
          w-fit
          pt-5
          pb-2
          px-6
          text-left
          rounded-b-[4px]
          shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] 
          ${isSubMenuVisible ? "absolute" : "hidden"}
        `}
      >
        {subcategories?.map((subcategory) => (
          <li
            key={subcategory.attributes.slug}
            className={`  
         relative 
         text-lg
         font-medium
         cursor-pointer
         text-textColor
         capitalize
         after:content-[''] 
         after:w-full 
         after:h-[1.5px] 
         after:left-0 
         after:-bottom-[6px] 
         after:bg-textColor 
         after:scale-x-[0] 
         after:absolute 
         after:transition 
         after:duration-300
         hover:after:scale-x-[1.1] 
         hover:after:bg-textColor
         mb-2
         flex
         flex-col
         gap-3
         `}
          >
            <Link
              href={`/collections/${title.toLocaleLowerCase()}/${
                subcategory.attributes.slug
              }`}
            >
              {subcategory.attributes.name}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default NavLi;
