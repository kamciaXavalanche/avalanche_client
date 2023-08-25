"use client";

import Logo from "../components/Navbar/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import SummaryMobile from "./SummaryMobile";

const Header = () => {
  const path = usePathname();

  const navigation = [
    { name: "Koszyk", url: "/cart" },
    { name: "Informacje", url: "/checkout/information" },
    { name: "Wysyłka", url: "/checkout/shipping" },
    { name: "Płatność", url: "/checkout/payment" },
  ];
  return (
    <header>
      <Logo />
      <SummaryMobile />
      <nav className="py-6">
        <ul className="flex gap-2 text-sm lg:text-base">
          {navigation.map((item, index) => (
            <li key={item.url}>
              <Link href={`${item.url}`}>
                <div
                  className={`inline-flex items-center gap-2 text-[#5E2C04] hover:brightness-150 ${
                    item.url === path
                      ? "text-black font-semibold cursor-text"
                      : ""
                  }`}
                >
                  {item.name}
                  {index !== navigation.length - 1 && <IoIosArrowForward />}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
