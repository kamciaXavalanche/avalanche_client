"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsDot } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Product from "./Product";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/lib/atoms";
import axios from "axios";
import { formatPrice } from "@/app/utils/functions";
import Link from "next/link";
import Cookies from "js-cookie";
import { url } from "@/app/constants/constants";

interface CartProps {
  setToggle: (toggle: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ setToggle }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const cartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/api/products"); // Zmień ścieżkę na odpowiednią dla twojej aplikacji
        setProducts(response.data);
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
    const price = item?.attributes.price ?? 0;
    const discount = item?.attributes.discount ?? 0;
    return total + (price - (price * discount) / 100) * array.quantity;
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
      className="bg-white right-0 w-[18rem] lg:w-[26rem] flex flex-col justify-between "
    >
      <div className="flex justify-between items-center px-7 h-[80px] border-b ">
        <span>Koszyk</span>
        <div className="cursor-pointer" onClick={() => setToggle(false)}>
          <IoCloseOutline size={26} />
        </div>
      </div>
      <div className="h-full p-10 flex flex-col gap-4 overflow-y-scroll">
        {cartItems.length === 0
          ? "TWÓJ KOSZYK JEST PUSTY"
          : cartItems?.map((item) => (
              <Product
                key={item.id}
                slug={item.slug}
                quantity={item.quantity}
                size={item.size}
                setCartItems={setCartItems}
                cartItems={cartItems}
                uuid={item.uuid}
                color={item.color}
              />
            ))}
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
        <Link
          onClick={() => setToggle(false)}
          href="/checkout/information"
          className="button-primary inline-flex items-center"
        >
          PODSUMOWANIE <BsDot /> {formatPrice(totalPrice)}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
