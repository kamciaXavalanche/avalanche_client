"use client";

import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import SummaryProduct from "./SummaryProduct";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/functions";
import { BsCart2, BsChevronDown } from "react-icons/bs";

const SummaryMobile = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openSummary, setOpenSummary] = useState(false);

  console.log(cartItems);

  useEffect(() => {
    const totalPriceFromCookie = parseFloat(Cookies.get("totalPrice") || "0");
    setTotalPrice(totalPriceFromCookie);
  }, [cartItems, totalPrice]);

  return (
    <div className=" lg:hidden ">
      <div className="flex items-center justify-between my-4">
        <div
          onClick={() => setOpenSummary((prev) => !prev)}
          className="text-sm inline-flex items-center "
        >
          <BsCart2 /> Pokaż podsumowanie zamówienia{" "}
          <BsChevronDown className="text-sm font-bold" />
        </div>
        <div className="font-semibold">{formatPrice(totalPrice)}</div>
      </div>
      {openSummary && (
        <>
          <div className="flex gap-2 flex-col">
            {cartItems?.map((item) => (
              <SummaryProduct
                key={item.id}
                slug={item.slug}
                quantity={item.quantity}
                id={item.id}
                setCartItems={setCartItems}
                cartItems={cartItems}
                size={item.size}
                color={item.color}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="basis-[70%] ">
              <input
                className="px-4 w-full h-full py-[0.75rem]"
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
            <span className="text-xl font-medium">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryMobile;
