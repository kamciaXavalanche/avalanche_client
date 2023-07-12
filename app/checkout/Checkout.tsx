"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { url } from "../constants/constants";

const stripePromise = loadStripe(
  "pk_test_51KsNPHD2JGtC3oa6OQkbmhflMcj5GrbkMYv0CntoAUn3ttNg9yJqst8Fg9zzdJMQW6L4LMe04WE2fyArRZjpP8Ra00TzBHDE1d"
);

export default function Checkout({ totalPrice }: any) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${url}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: totalPrice }),
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
    <div className="p-28 pt-8">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
