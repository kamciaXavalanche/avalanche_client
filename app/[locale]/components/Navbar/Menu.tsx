"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

interface MenuProps {
  setToggleMenu: (toggle: boolean) => void;
  categories: any;
}

const Menu: React.FC<MenuProps> = ({ setToggleMenu, categories }) => {
  const cartRef = useRef(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setToggleMenu]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  console.log(categories);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{
        duration: ".4",
      }}
      ref={cartRef}
      className="bg-white left-0 w-[18rem] lg:w-[26rem] flex flex-col justify-between"
    >
      <div className="flex items-center px-7 h-[80px] border-b ">
        <div className="cursor-pointer" onClick={() => setToggleMenu(false)}>
          <IoCloseOutline size={26} />
        </div>
      </div>
      <div className="h-full p-10 flex flex-col gap-4 overflow-y-scroll">
        <ul className="flex flex-col gap-2 justify-start ">
          {categories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            return (
              <div key={category.id}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedCategory((prev) =>
                      prev === category.id ? null : category.id
                    )
                  }
                >
                  <li className="text-lg font-semibold pb-2">
                    {category.attributes.title}
                  </li>
                  {isExpanded ? "-" : "+"}
                </div>
                <hr className="bg-black w-full " />
                {isExpanded && (
                  <div className="ml-6">
                    {category.attributes.subcategories.data.map(
                      (subcategory) => (
                        <>
                          <Link
                            onClick={() => setToggleMenu(false)}
                            href={`/collections/${category.attributes.title.toLowerCase()}/${
                              subcategory.attributes.slug
                            }`}
                          >
                            <li
                              className="py-2 font-medium"
                              key={subcategory.id}
                            >
                              {subcategory.attributes.name}
                            </li>
                          </Link>
                          <hr className="bg-black w-full " />
                        </>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <Link
            onClick={() => setToggleMenu(false)}
            href="/login"
            className="text-xl"
          >
            Konto
          </Link>
          <hr className="bg-black w-full " />
          <Link
            onClick={() => setToggleMenu(false)}
            href="/favorite"
            className="text-xl"
          >
            Ulubione
          </Link>
        </ul>
      </div>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          duration: ".2",
          delay: 0.4,
        }}
        className="px-7 py-8 border-t-[1.5px] flex items-center justify-around"
      >
        <BsFacebook size={18} />
        <BsInstagram size={18} />
      </motion.div>
    </motion.div>
  );
};

export default Menu;
