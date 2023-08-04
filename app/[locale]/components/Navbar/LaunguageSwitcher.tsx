"use client";
import { useState } from "react";
import Link from "next-intl/link";
import { useLocale } from "next-intl";
import { BiChevronDown } from "react-icons/bi";
const LaunguageSwitcher = () => {
  const locale = useLocale();
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setToggle((prev) => !prev)}
        className="cursor-pointer uppercase font-semibold inline-flex items-center"
      >
        {locale} <BiChevronDown size={20} />
      </div>
      {toggle && (
        <div className="absolute flex flex-col gap-1 bg-white justify-center items-center w-10 h-20 rounded-sm">
          <Link
            className="font-medium w-full h-full hover:bg-black/10 flex items-center justify-center"
            href="/"
            locale="pl"
          >
            PL
          </Link>
          <Link
            className="font-medium w-full h-full hover:bg-black/10 flex items-center justify-center"
            href="/"
            locale="en"
          >
            EN
          </Link>
        </div>
      )}
    </div>
  );
};

export default LaunguageSwitcher;
