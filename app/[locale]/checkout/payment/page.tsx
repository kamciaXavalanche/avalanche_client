"use client";

import { useState, useEffect } from "react";
import Checkout from "../Checkout";
import Header from "../Header";
import Summary from "../Summary";
import Cookies from "js-cookie";
import Links from "../Links";
import { useAtomValue } from "jotai";
import { addressAtom, emailAtom } from "@/app/[locale]/lib/atoms";
import Information from "../Information";

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [userData, setUserData] = useState([]);
  const [choosePayment, setChoosePayment] = useState(null);
  const email = useAtomValue(emailAtom);
  const address = useAtomValue(addressAtom);

  useEffect(() => {
    const total = parseFloat(Cookies.get("totalPrice") || "0");
    const userData = Cookies.get("userData");
    setTotalPrice(total);
    setUserData(userData);
  }, []);

  const choosePaymentMethod = (item) => {
    setChoosePayment(item);
  };

  console.log(choosePayment);

  return (
    <div className="flex flex-col lg:flex-row gap-14 min-h-screen ">
      <div className="basis-[55%] px-6 lg:pl-[9%] pt-10 flex flex-col justify-between">
        <Header />
        <Information />
        <div>
          <h3 className="text-lg font-medium my-4">Płatność</h3>
          <div className="w-full border border-gray-400 h-16 rounded-md rounded-b-none px-8 flex gap-2 items-center justify-between cursor-pointer">
            <div
              onClick={() => choosePaymentMethod("online")}
              className="flex gap-3 items-center"
            >
              {choosePayment === "online" ? (
                <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center bg-white border border-gray-500 rounded-full" />
              )}
              <p>Online</p>
            </div>
            <p>Darmowa</p>
          </div>
          <div
            onClick={() => choosePaymentMethod("przy-odbiorze")}
            className="w-full border border-gray-400 border-t-0 h-16 rounded-md rounded-t-none  px-8 flex gap-2 items-center justify-between cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              {choosePayment === "przy-odbiorze" ? (
                <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center bg-white border border-gray-500 rounded-full" />
              )}
              <p>Przy odbiorze</p>
            </div>
            <p>Darmowa</p>
          </div>
        </div>
        {email &&
          address &&
          choosePayment === "online" &&
          totalPrice !== null && (
            <Checkout totalPrice={Math.round(totalPrice)} userData={userData} />
          )}
        <Links />
      </div>
      <Summary />
    </div>
  );
};

export default Payment;
