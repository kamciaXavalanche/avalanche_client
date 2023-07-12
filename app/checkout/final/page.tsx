"use client";

import React, { useEffect } from "react";
import { cartAtom } from "@/app/lib/atoms";
import { useAtom } from "jotai";
import Cookies from "js-cookie";

const page = () => {
  const [cartItems, setCartItems] = useAtom(cartAtom);

  useEffect(() => {
    setCartItems([]);
    Cookies.set("cart", JSON.stringify([]));
  }, []);

  return <div>Dziękujemy za zakupy w naszym sklepie</div>;
};

export default page;
