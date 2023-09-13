import { BsFacebook, BsInstagram } from "react-icons/bs";
import Logo from "../Navbar/Logo";
import { useTranslations } from "next-intl";
import LaunguageSwitcher from "../Navbar/LaunguageSwitcher";
import Link from "next/link";
const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-textColor bg-primaryColor  ">
      <div className="mx-auto w-full px-6 lg:px-[9rem] py-4 lg:py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="mt-3 max-w-[500px]">{t("description")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-lg cursor-pointer font-semibold  capitalize font-beautyFont">
                Levarde
              </h2>
              <ul className="font-base">
                <li className="mb-4">
                  <a href="" className="hover:underline">
                    {t("about")}
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    {t("login")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg cursor-pointer font-semibold capitalize font-beautyFont">
                {t("follow")}
              </h2>
              <ul className=" font-base">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100093022143540"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg cursor-pointer font-semibold capitalize font-beautyFont">
                {t("client")}
              </h2>
              <ul className="font-base">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    {t("policy")}
                  </a>
                </li>
                <li>
                  <Link href="/regulations" className="hover:underline">
                    {t("statue")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <LaunguageSwitcher />
          <span className="text-sm text-textColor sm:text-center">
            © 2023{" "}
            <a href="/" className="hover:underline">
              Avalanche™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link href="https://www.facebook.com/profile.php?id=100093022143540">
              <BsFacebook
                className="hover:fill-white hover:scale-[1.1]"
                size={18}
              />
            </Link>
            <Link href="https://www.instagram.com/levarde_/?fbclid=IwAR3CwA2SzAOvrM8QtXC65JEJDJZMKeSYljOVw1zsh-4spmbX9uQIrFX2ipI">
              <BsInstagram
                className="hover:fill-white hover:scale-[]"
                size={18}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
