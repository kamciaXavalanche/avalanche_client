"use client";

import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import SummaryProduct from "./SummaryProduct";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/functions";

const Summary = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPriceFromCookie = parseFloat(Cookies.get("totalPrice") || "0");
    setTotalPrice(totalPriceFromCookie);
    const cartFromCookies = JSON.parse(Cookies.get("cart"));
    setCartItems(cartFromCookies);
  }, []);

  return (
    <div className="hidden lg:block lg:basis-[45%] bg-gray-200 pr-[9%] pl-8 pt-10 border-l-2 border-gray-300 ">
      <div className="flex gap-2 flex-col">
        {cartItems?.map((item) => (
          <SummaryProduct
            key={`${item.slug}${item.color}${item.size}`}
            slug={item.slug}
            quantity={item.quantity}
            setCartItems={setCartItems}
            cartItems={cartItems}
            size={item.size}
            color={item.color}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 py-4">
        <div className="basis-[70%]">
          <input
            className="px-4 w-full h-full py-[0.86rem]"
            type="text"
            placeholder="Kod rabatowy"
          />
        </div>
        <div className="basis-[30%]">
          <button className="button-primary">Zastosuj</button>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>Suma częściowa</div>
        {formatPrice(totalPrice)}
      </div>
      <div className="flex justify-between mb-4">
        <div>Wysyłka</div>
        <div>Gratis</div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="font-medium text-lg">Suma</div>
        </div>
        <span className="text-xl font-medium">{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default Summary;
