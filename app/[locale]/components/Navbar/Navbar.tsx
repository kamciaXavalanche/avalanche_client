"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineStar } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import AnnouncementBar from "./AnnouncementBar";
import Link from "next/link";
import Logo from "./Logo";
import NavLi from "./NavLi";
import Search from "./Search";
import Menu from "./Menu";
import Cart from "../Cart/Cart";
import { cartAtom } from "../../lib/atoms";
import { useAtom } from "jotai";
import Cookies from "js-cookie";

const Navbar = ({ categories }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [hideAnnouncementBar, setHideAnnouncementBar] = useState(false);
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [toggleSearch, setToggleSearch] = useState(false);

  const attributes = categories?.map((item) => item.attributes);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setHideAnnouncementBar(scrollTop > 0);
    };

    const cartData = Cookies.get("cart");
    if (cartData) {
      const parsedCartItems = JSON.parse(cartData);
      setCartItems(parsedCartItems);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const announcementBarVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <div className="sticky top-0 left-0 right-0 z-40 ">
      <AnimatePresence>
        {!hideAnnouncementBar && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={announcementBarVariants}
            className="overflow-hidden"
          >
            <AnnouncementBar />
          </motion.div>
        )}
      </AnimatePresence>
      <header
        className={`
        px-6 lg:px-[9rem]
        py-2 lg:py-4
        font-beautyFont 
        bg-backgroundColor
        tracking-wider
        border-b
        border-textColor
        relative
        z-50
      `}
      >
        <AnimatePresence>
          {toggleSearch && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="w-full h-screen bg-black/70 absolute top-[90px] lg:top-[100px] left-0 right-0 bottom-0"
            >
              <Search setToggleSearch={setToggleSearch} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between items-center py-4 ">
          <nav className="flex-1  start text-center">
            <ul className="hidden lg:flex  justify-start items-center gap-10">
              {attributes?.map((category) => (
                <NavLi
                  id={category.title}
                  title={category.title}
                  subcategories={category.subcategories.data}
                />
              ))}
            </ul>
            <div
              onClick={() => setToggleMenu(true)}
              className="block lg:hidden"
            >
              <RxHamburgerMenu size={21} />
            </div>
          </nav>
          <Logo />
          <nav className="flex-1 text-center">
            <ul className="flex justify-end items-center gap-3 lg:gap-6">
              <div onClick={() => setToggleSearch(true)}>
                <svg
                  className="w-[1.325rem] h-[1.325rem] text-textColor/90  cursor-pointer "
                  role="presentation"
                  viewBox="0 0 21 21"
                >
                  <g
                    transform="translate(1 1)"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="square"
                  >
                    <path d="M18 18l-5.7096-5.7096"></path>
                    <circle cx="7.2" cy="7.2" r="7.2"></circle>
                  </g>
                </svg>
              </div>
              <Link className="hidden lg:block" href="/favorite">
                <AiOutlineStar size={26} />
              </Link>
              <Link className="hidden lg:block" href="/login">
                <svg
                  className="w-[1.325rem] h-[1.325rem]"
                  role="presentation"
                  viewBox="0 0 20 20"
                >
                  <g
                    transform="translate(1 1)"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="square"
                  >
                    <path d="M0 18c0-4.5188182 3.663-8.18181818 8.18181818-8.18181818h1.63636364C14.337 9.81818182 18 13.4811818 18 18"></path>
                    <circle cx="9" cy="4.90909091" r="4.90909091"></circle>
                  </g>
                </svg>
              </Link>
              <div
                className="cursor-pointer relative"
                onClick={() => setToggle((prev) => !prev)}
              >
                <div className="absolute -right-3.5 -top-3.5 border border-primaryColor w-6 h-6 rounded-full bg-black text-white flex justify-center items-start text-sm">
                  {cartQuantity}
                </div>
                <svg
                  className="w-[1.325rem] h-[1.325rem]"
                  role="presentation"
                  viewBox="0 0 19 23"
                >
                  <path
                    d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </ul>
          </nav>
        </div>

        <AnimatePresence>
          {toggle && (
            <div className="fixed top-0 right-0  w-full h-full bg-black/70 flex justify-end">
              <Cart setToggle={setToggle} />
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {toggleMenu && (
            <div className="fixed top-0 left-0 right-0 w-full h-full bg-black/70 flex justify-start">
              <Menu setToggleMenu={setToggleMenu} categories={categories} />
            </div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;
