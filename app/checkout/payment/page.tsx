"use client";
import { useState, useEffect } from "react";
import Checkout from "../Checkout";
import Header from "../Header";
import Summary from "../Summary";
import Cookies from "js-cookie";
import Links from "../Links";
import { useAtomValue } from "jotai";
import { addressAtom, emailAtom } from "@/app/lib/atoms";
import Link from "next/link";
import { BsArrowReturnLeft } from "react-icons/bs";

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [userData, setUserData] = useState([]);
  const email = useAtomValue(emailAtom);
  const address = useAtomValue(addressAtom);

  useEffect(() => {
    // Pobieranie danych z cookies przy użyciu parseFloat, aby uzyskać wartość liczbową
    const total = parseFloat(Cookies.get("totalPrice") || "0");
    const userData = Cookies.get("userData");
    setTotalPrice(total);
    setUserData(userData);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="basis-[55%] pl-[9%] pt-10 flex flex-col justify-between">
        <Header />
        {email && address ? (
          <>
            {totalPrice !== null ? (
              <Checkout
                totalPrice={Math.round(totalPrice)}
                userData={userData}
              />
            ) : (
              "Loading..."
            )}
          </>
        ) : (
          <Link
            href="/checkout/information"
            className="border border-gray-400 rounded-md px-6 py-2 inline-flex gap-4 items-center  hover:text-[#5E2C04] hover:brightness-150"
          >
            Wprowadź dane do wysyłki <BsArrowReturnLeft />
          </Link>
        )}

        <Links />
      </div>

      <Summary />
    </div>
  );
};

export default Payment;
