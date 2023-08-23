"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { cartAtom } from "../lib/atoms";
import { useAtom } from "jotai";

const stripePromise = loadStripe(
  "pk_test_51KsNPHD2JGtC3oa6OQkbmhflMcj5GrbkMYv0CntoAUn3ttNg9yJqst8Fg9zzdJMQW6L4LMe04WE2fyArRZjpP8Ra00TzBHDE1d"
);

export default function Checkout({ totalPrice, userData }: any) {
  const [clientSecret, setClientSecret] = useState("");
  const [cartItems, setCartItems] = useAtom(cartAtom);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pt-6 lg:px-0">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm userData={userData} totalPrice={totalPrice} />
        </Elements>
      )}
    </div>
  );
}
