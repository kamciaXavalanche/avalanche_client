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

const Cart: React.FC<CartProps> = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/api/products?populate=*");
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
    Cookies.set("totalPrice", totalPrice.toString());
  }, [totalPrice]);

  return (
    <div className="bg-backgroundColor w-full flex flex-col justify-between ">
      <div className="flex justify-center items-center px-7 h-[80px] border-b ">
        <span className="text-2xl">Koszyk</span>
      </div>
      <div className="h-full p-4 lg:px-40 flex flex-col gap-4 ">
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
      <div
        className={`px-7 py-8 border-t-[1.5px] flex items-center justify-center ${
          cartItems.length === 0 && "hidden"
        }`}
      >
        {isLoadingPrice ? ( // Dodajemy warunek do wyświetlania ładowania lub ceny
          "Wczytywanie ceny ... "
        ) : (
          <Link
            href="/checkout/information"
            className="button-primary inline-flex items-center justify-center"
          >
            PODSUMOWANIE <BsDot /> {formatPrice(totalPrice)}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
