"use client";

import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { cartAtom } from "../lib/atoms";
import { formatPrice } from "../utils/functions";
import Cookies from "js-cookie";

const TotalPrice = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartAtom);

  const url = "http://localhost:1337";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
      }
    };

    fetchData();
  }, []);

  const newTotalPrice = cartItems.reduce((total, array) => {
    const item = products?.data?.find(
      (item) => item.attributes.slug === array.slug
    );
    const price = item?.attributes.price ?? 0;
    const discount = item?.attributes.discount ?? 0;
    const newTotal =
      total + (price - (price * discount) / 100) * array.quantity;

    return newTotal;
  }, 0);

  const formattedPrice = formatPrice(newTotalPrice);

  return formattedPrice;
};

export default TotalPrice;
