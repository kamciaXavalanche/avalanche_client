"use client";

import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import SummaryProduct from "./SummaryProduct";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/functions";
import { useQuery } from "@tanstack/react-query";
import { url } from "../constants/constants";
import axios from "axios";
import Loader from "../components/Loader";

interface PromoCode {
  id: number;
  attributes: {
    discount: number;
    numberOfUsage: number;
    codeName: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

const Summary = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [totalPrice, setTotalPrice] = useState(0);
  const [codeQuery, setCodeQuery] = useState("");
  const [activeCode, setActiveCode] = useState({
    name: "",
    isActive: false,
  });

  useEffect(() => {
    const totalPriceFromCookie = parseFloat(Cookies.get("totalPrice") || "0");
    setTotalPrice(totalPriceFromCookie);
    const cartFromCookies = JSON.parse(Cookies.get("cart"));
    setCartItems(cartFromCookies);
  }, []);

  const { data: cupons, isLoading } = useQuery<PromoCode[]>(["cupons"], {
    queryFn: async () => {
      const { data: cupons } = await axios.get(
        `${url}/api/promo-codes?populate=*`
      );
      return cupons.data;
    },
  });

  if (isLoading) {
    <Loader />;
  }

  const totalPriceWithDiscount =
    totalPrice -
    totalPrice *
      cupons?.find((c) => c.attributes.codeName === activeCode.name)?.attributes
        .discount!;

  async function checkIfCode(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    setCodeQuery("");
    const cupon = cupons?.find(
      (c) => c.attributes.codeName.toUpperCase() === codeQuery.toUpperCase()
    );
    if (cupon) {
      alert(`Your code ${cupon.attributes.codeName} has been activated`);
      setActiveCode({
        name: cupon.attributes.codeName,
        isActive: true,
      });
      const total = totalPrice - totalPrice * cupon.attributes.discount;
      Cookies.set("totalPrice", total.toString());
    } else {
      alert("You entered a wrong code");
    }
  }

  function checkIfButton() {
    if (codeQuery === "" || activeCode.name) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="hidden lg:block lg:basis-[45%] bg-gray-200 pr-[9%] pl-8 pt-10 border-l-2 border-gray-300 ">
      <div className="flex gap-2 flex-col">
        {cartItems?.map((item: any) => (
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
      <form onSubmit={checkIfCode} className="flex gap-5 my-4">
        <input
          value={codeQuery}
          maxLength={8}
          placeholder="Twój kod promocyjny"
          onChange={(e) => setCodeQuery(e.target.value.toUpperCase())}
          className="bg-white border uppercase text-center border-white px-2 py-3  w-full lg:w-[200%] rounded-sm focus:border-black focus:shadow-sm focus:shadow-black focus:border focus:outline-none"
          type="text"
        />
        <button
          disabled={checkIfButton()}
          type="submit"
          className="bg-black text-white font-semibold rounded-sm px-8 w-full focus:shadow-black focus:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Zastosuj
        </button>
      </form>
      <div className="flex justify-between mb-4">
        <div>Wysyłka</div>
        <div>Gratis</div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="font-medium text-lg">Suma </div>
        </div>
        {totalPriceWithDiscount ? (
          <div className="text-xl font-medium">
            {formatPrice(totalPriceWithDiscount)}
            <span className="text-red-500 line-through ml-1">
              {" "}
              {formatPrice(totalPrice)}
            </span>
          </div>
        ) : (
          <div className="text-xl font-medium">{formatPrice(totalPrice)}</div>
        )}
      </div>
      {activeCode.isActive && (
        <p className="text-lg text-black mt-2 underline">
          Zastosowano kupon o wartości{" "}
          {cupons?.find((c) => c.attributes.codeName === activeCode.name)
            ?.attributes.discount
            ? cupons?.find((c) => c.attributes.codeName === activeCode.name)
                ?.attributes.discount * 100
            : 0}
          %
        </p>
      )}
    </div>
  );
};

export default Summary;
