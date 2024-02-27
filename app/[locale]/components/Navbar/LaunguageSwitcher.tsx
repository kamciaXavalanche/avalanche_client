"use client";
import { useState } from "react";
import { Link } from "../../../../navigation";
import { useLocale } from "next-intl";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";

const LaunguageSwitcher = () => {
  const locale = useLocale();
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setToggle((prev) => !prev)}
        className="cursor-pointer uppercase font-semibold inline-flex items-center gap-1"
      >
        <RiGlobalLine size={20} /> {locale}{" "}
        {toggle ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
      </div>
      {toggle && (
        <div className="absolute bottom-10 flex flex-col gap-1 bg-white justify-center items-center w-14 h-20 rounded-sm shadow-md">
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
