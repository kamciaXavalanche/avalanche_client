"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsDot } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Product from "./Product";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/[locale]/lib/atoms";
import axios from "axios";
import { formatPrice } from "@/app/[locale]/utils/functions";
import Link from "next/link";
import Cookies from "js-cookie";
import { url } from "@/app/[locale]/constants/constants";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

interface CartProps {
  setToggle: (toggle: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ setToggle }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const cartRef = useRef(null);
  const locale = useLocale();
  const t = useTranslations("cart");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/api/products?locale=${locale}&populate=*`
        );
        setProducts(response.data);
        setIsLoadingPrice(false); // Ustawiamy stan na false po zakończeniu pobierania produktów
      } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
      }
    };

    fetchData();
  }, []);

  const totalPrice = cartItems.reduce((total, array) => {
    const item = products?.data?.find(
      (item) => item.attributes.slug === array.slug
    );
    const test = item?.attributes?.productAttributes;
    const znalezionyObiekt = test?.find(
      (obiekt) => obiekt.color === array.color
    );

    const price = znalezionyObiekt?.price ?? 0;
    const discount = znalezionyObiekt?.discount ?? 0;
    return total + (price - (price * discount) / 100) * (array.quantity ?? 0);
  }, 0);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setToggle]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    Cookies.set("totalPrice", totalPrice.toString());
  }, [totalPrice]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        duration: ".4",
      }}
      ref={cartRef}
      className="bg-white right-0 w-[20.125rem] lg:w-[26rem] flex flex-col justify-between "
    >
      <div className="flex justify-between items-center px-7 h-[80px] border-b ">
        <span className="uppercase">{t("cart")}</span>
        <div className="cursor-pointer" onClick={() => setToggle(false)}>
          <IoCloseOutline size={26} />
        </div>
      </div>
      <div className="h-full p-4 lg:p-10 flex flex-col gap-4 overflow-y-scroll">
        {cartItems.length === 0 ? (
          <p className="uppercase text-center">{t("empty")}</p>
        ) : (
          cartItems?.map((item) => (
            <Product
              key={`${item.slug}${item.color}${item.size}`}
              slug={item.slug}
              quantity={item.quantity}
              size={item.size}
              setCartItems={setCartItems}
              cartItems={cartItems}
              uuid={item.uuid}
              color={item.color}
            />
          ))
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          duration: ".2",
          delay: 0.4,
        }}
        className={`px-7 py-8 border-t-[1.5px] flex items-center justify-center ${
          cartItems.length === 0 && "hidden"
        }`}
      >
        {isLoadingPrice ? (
          <div className="button-primary flex items-center justify-center">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <Link
            onClick={() => setToggle(false)}
            href="/checkout/information"
            className="button-primary flex items-center justify-center"
          >
            <span className="flex gap-1 items-center uppercase text-sm lg:text-base">
              {t("summary")} <BsDot />
            </span>
            <span>{formatPrice(totalPrice)}</span>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
