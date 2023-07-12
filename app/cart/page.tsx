"use client";
import { loadStripe } from "@stripe/stripe-js";

import { useAtomValue } from "jotai";

import axios from "axios";

const products = [
  {
    id: 1,
    name: "komplet",
  },
];

const Cart = () => {
  const stripePromise = loadStripe(
    "pk_live_51KsNPHD2JGtC3oa6aWSG2OMt6psjeg4T2T6CxKC4uW5TLoQnPExbEMiSSRXsghPzQj1NOXvXZV6YyyyMILrXW6Tp002y1MxE1B"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await axios.post("http://localhost:1337/api/orders", {
        products,
      });
      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {}
  };

  return <button onClick={handlePayment}>checkout</button>;
};

export default Cart;
