"use client";

import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import SummaryProduct from "./SummaryProduct";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/functions";
import { BsCart2, BsChevronDown, BsChevronUp } from "react-icons/bs";
import Loader from "../components/Loader";
import { url } from "../constants/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const SummaryMobile = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [totalPrice, setTotalPrice] = useState(0);
  const [codeQuery, setCodeQuery] = useState("");
  const [openSummary, setOpenSummary] = useState(false);
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
      const discountObject = {
        name: cupon.attributes.codeName,
        discount: cupon.attributes.discount,
        totalPrice: total,
      };
      Cookies.set("promoCupon", JSON.stringify(discountObject));
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
    <div className=" lg:hidden ">
      <div className="flex items-center justify-between my-4">
        <div
          onClick={() => setOpenSummary((prev) => !prev)}
          className="text-sm flex gap-1 items-center justify-center"
        >
          <div className="inline-flex gap-4">
            <BsCart2 size={17} />{" "}
            {openSummary ? "Twoje zamówienie" : "Pokaż podsumowanie zamówienia"}{" "}
          </div>
          {openSummary ? (
            <BsChevronUp className="text-sm font-bold" />
          ) : (
            <BsChevronDown className="text-sm font-bold" />
          )}
        </div>
        <div className="font-semibold">{formatPrice(totalPrice)}</div>
      </div>
      {openSummary && (
        <>
          <div className="flex gap-2 flex-col">
            {cartItems?.map((item) => (
              <SummaryProduct
                key={`${item.slug}${item.size}${item.color}`}
                slug={item.slug}
                quantity={item.quantity}
                setCartItems={setCartItems}
                cartItems={cartItems}
                size={item.size}
                color={item.color}
              />
            ))}
          </div>
          <form onSubmit={checkIfCode} className="flex gap-3 my-4">
            <input
              value={codeQuery}
              maxLength={8}
              placeholder="Twój kod promocyjny"
              onChange={(e) => setCodeQuery(e.target.value.toUpperCase())}
              className="bg-white placeholder:text-[0.925rem] border uppercase text-center border-white px-2 py-3  w-[230%] rounded-sm focus:border-black focus:shadow-sm focus:shadow-black focus:border focus:outline-none"
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
              <div className="text-xl font-medium">
                {formatPrice(totalPrice)}
              </div>
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
        </>
      )}
    </div>
  );
};

export default SummaryMobile;
