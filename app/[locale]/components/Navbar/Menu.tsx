"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";

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
          {categories.map((category, i) => {
            const isExpanded = expandedCategory === category.id;
            return (
              <div
                key={`${category.attributes.title}${category.attributes.id}${i}`}
              >
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
                  {isExpanded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.4}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.4}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  )}
                </div>
                <hr className="bg-black w-full " />
                {isExpanded && (
                  <div className="ml-6">
                    {category.attributes.subcategories.data.map(
                      (subcategory, i) => (
                        <div key={`${category.attributes.title}${i}`}>
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
                        </div>
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
            className="text-xl inline-flex gap-4"
          >
            <div className="w-[26px] flex items-center pl-0.5">
              <svg
                className="w-[1.325rem] h-[1.325rem]"
                role="presentation"
                viewBox="0 0 20 20"
              >
                <g
                  transform="translate(1 1)"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="square"
                >
                  <path d="M0 18c0-4.5188182 3.663-8.18181818 8.18181818-8.18181818h1.63636364C14.337 9.81818182 18 13.4811818 18 18"></path>
                  <circle cx="9" cy="4.90909091" r="4.90909091"></circle>
                </g>
              </svg>
            </div>
            <h4 className="font-medium">Konto</h4>
          </Link>
          <hr className="bg-black w-full " />
          <Link
            onClick={() => setToggleMenu(false)}
            href="/favorite"
            className="text-xl inline-flex gap-4"
          >
            <AiOutlineStar size={26} />
            <h4 className="font-medium">Ulubione</h4>
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
        <Link href="https://m.facebook.com/profile.php/?id=100093022143540">
          <BsFacebook size={22} />
        </Link>
        <Link href="https://www.instagram.com/levarde_/?fbclid=IwAR3CwA2SzAOvrM8QtXC65JEJDJZMKeSYljOVw1zsh-4spmbX9uQIrFX2ipI">
          <BsInstagram size={22} />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Menu;
