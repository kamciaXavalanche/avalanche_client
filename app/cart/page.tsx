"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { url } from "../constants/constants";

const products = [
  {
    id: 1,
    name: "komplet",
  },
];

const Cart = () => {
  const postRequest = async () => {
    await axios
      .post(url + "/api/customer-orders", {
        data: {
          totalPrice: 421,
          products: products,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <button className="bg-blue-600 p-4 border-rounded" onClick={postRequest}>
      checkout
    </button>
  );
};

export default Cart;
