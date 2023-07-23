import Logo from "../components/Navbar/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { currentStepAtom } from "@/app/lib/atoms";
import { IoIosArrowForward } from "react-icons/io";

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
          {navigation.map((item, index) => (
            <li key={item.url}>
              <Link href={`/checkout/${item.url}`}>
                <div
                  className={`inline-flex items-center gap-2 text-[#5E2C04] hover:brightness-150 ${
                    item.url === url
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
