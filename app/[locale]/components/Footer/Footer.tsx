import { BsFacebook, BsInstagram } from "react-icons/bs";
import Logo from "../Navbar/Logo";
import { useTranslations } from "next-intl";
const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-textColor bg-primaryColor">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="mt-3 max-w-[500px]">{t("description")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-lg cursor-pointer font-semibold  capitalize font-beautyFont">
                Avalanche
              </h2>
              <ul className="font-base">
                <li className="mb-4">
                  <a href="" className="hover:underline">
                    O nas
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Logowanie
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg cursor-pointer font-semibold capitalize font-beautyFont">
                Śledź nas
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
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg cursor-pointer font-semibold capitalize font-beautyFont">
                obsługa klienta
              </h2>
              <ul className="font-base">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Polityka Prywatności
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Regulamin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-textColor sm:text-center">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Avalanche™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <BsFacebook size={18} />
            <BsInstagram size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
