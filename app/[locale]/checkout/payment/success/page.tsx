"use client";

import Logo from "@/app/[locale]/components/Navbar/Logo";
import { url } from "@/app/[locale]/constants/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";

const SuccesPage = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    async function updateOrder(orderId: number) {
      const updatedSuccessfulOrderStatusResponse = await fetch(
        url + "/api/customer-orders/" + orderId,
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              orderStatus: "successful",
            },
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!updatedSuccessfulOrderStatusResponse.ok) {
        // HANDLE ERRORS HERE
        return;
      }
    }

    if (orderId) {
      console.log("Calling update order");
      updateOrder(Number(orderId));
    }
  }, []);
  return (
    <div className="px-6 py-8 flex flex-col items-center justify-center text-center">
      <Logo />
      <div className="flex justify-center my-5 items-center gap-2">
        <BsCheckCircle size={24} />
        <h2>Dziękujęmy za złożenie zamówienia!</h2>
      </div>
      <Link href="/">
        <button className="button-primary mt-1 lg:w-[24rem]">
          Wróc do sklepu
        </button>
      </Link>
    </div>
  );
};

export default SuccesPage;
