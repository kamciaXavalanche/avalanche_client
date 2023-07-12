"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BsDot } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import NavLi from "./NavLi";

interface MenuProps {
  setToggleMenu: (toggle: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ setToggleMenu }) => {
  const cartRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Sprawdź, czy kliknięcie nastąpiło poza elementem <Cart />
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // Zamknij koszyk
        setToggleMenu(false);
      }
    };

    // Dodaj obsługę zdarzeń dla kliknięcia na elementach nadrzędnych
    document.addEventListener("click", handleOutsideClick);

    // Usuń obsługę zdarzeń po odmontowaniu komponentu
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setToggleMenu]);

  useEffect(() => {
    // Blokuj przewijanie, gdy komponent zostanie zamontowany
    document.body.style.overflow = "hidden";

    // Odblokuj przewijanie, gdy komponent zostanie odmontowany
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
        <ul className="flex flex-col gap-2 justify-start items-center">
          <NavLi title="sukienki" id={3} />
          <hr className="bg-black w-full " />
          <NavLi title="komplety" id={4} />
          <hr className="bg-black w-full " />
          <li className="text-xl">Konto</li>
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
        className="px-7 py-8 border-t-[1.5px]"
      ></motion.div>
    </motion.div>
  );
};

export default Menu;
