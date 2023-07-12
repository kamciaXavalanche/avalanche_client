"use client";

import Logo from "../components/Navbar/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { currentStepAtom } from "@/app/lib/atoms";

const Header = () => {
  const path = usePathname();
  const url = path.split("/").pop();
  const [currentStep] = useAtom(currentStepAtom);

  const navigation = [
    { name: "Koszyk", url: "cart" },
    { name: "Informacje", url: "information" },
    { name: "Wysyłka", url: "shipping" },
    { name: "Płatność", url: "payment" },
  ];

  return (
    <header>
      <Logo />
      <nav className="py-6">
        <ul className="flex gap-2">
          {navigation.map((item) => (
            <li key={item.url}>
              <Link href={`/checkout/${item.url}`}>
                <div
                  className={`${item.url === url ? "text-primaryColor" : ""}`}
                >
                  {item.name}
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
