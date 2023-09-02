import React, { useState } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import { url } from "../constants/constants";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Order = ({ totalPrice, userData }: any) => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [isOrdering, setIsOrdering] = useState(false);
  const router = useRouter();

  const handleOrderClick = async () => {
    try {
      setIsOrdering(true);

      const createOrderResponse = await fetch(url + "/api/customer-orders", {
        method: "POST",
        body: JSON.stringify({
          data: {
            totalPrice,
            products: cartItems,
            customerData: userData,
            orderStatus: "cash-on-delivery",
          },
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (createOrderResponse.ok) {
        setCartItems([]);
        Cookies.set("cart", JSON.stringify([]));
        Cookies.set("userData", JSON.stringify([]));
        router.push("/checkout/payment/success");
      } else {
        throw new Error("Wystąpił błąd"); // Rzuć błąd w przypadku niepowodzenia
      }
    } catch (error) {
      // Obsłuż błąd związany z zapytaniem HTTP
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <button
      onClick={handleOrderClick}
      className="button-primary mt-6 lg:mt-0"
      disabled={isOrdering}
    >
      {isOrdering ? "Trwa zamawianie..." : "Zamawiam za pobraniem"}
    </button>
  );
};

export default Order;
