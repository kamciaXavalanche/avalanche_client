"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import Cookies from "js-cookie";
import { url } from "../constants/constants";
import { useRouter } from "next/navigation";

type PaymentStatus = "idle" | "loading" | "error" | "success";

export default function CheckoutForm({
  userData,
  totalPrice,
}: {
  userData: any;
  totalPrice: any;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [cartItems, setCartItems] = useAtom(cartAtom);

  // const clientUrl = "https://levarde.com";
  const clientUrl = "http://localhost:3000";

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("Payment succeeded!");
  //         postRequest();
  //         setCartItems([]); // Set cartItems to an empty array
  //         Cookies.set("cart", JSON.stringify([]));
  //         Cookies.set("userData", JSON.stringify([]));

  //         break;
  //       case "processing":
  //         setMessage("Your payment is processing.");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("Your payment was not successful, please try again.");
  //         break;
  //       default:
  //         setMessage("Something went wrong.");
  //         break;
  //     }
  //   });
  // }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentStatus("loading");

    const createOrderReponse = await fetch(url + "/api/customer-orders", {
      method: "POST",
      body: JSON.stringify({
        data: {
          totalPrice,
          products: cartItems,
          customerData: userData,
          orderStatus: "not-paid",
        },
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!createOrderReponse.ok) {
      // HANDLE ERROR FOR CREATING AN ORDER IN DB
      // setMessage("custom message")
      setPaymentStatus("error");
      return;
    }

    const createdOrder = await createOrderReponse.json();

    // TEST PAYMENT FLOW BY ADDING DIFFERENT CARDS FOR DIFFERENT AUTH FLOWS
    // https://stripe.com/docs/payments/save-during-payment?platform=web#web-test-the-integration

    const { paymentIntent, error } = await stripe.confirmPayment({
      redirect: "if_required",
      elements,
      confirmParams: {
        return_url:
          clientUrl +
          `/checkout/payment/success?orderId=${createdOrder.data.id}`,
      },
    });

    if (paymentIntent && paymentIntent.status === "succeeded") {
      const updatedSuccessfulOrderStatusResponse = await fetch(
        url + "/api/customer-orders/" + createdOrder.data.id,
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
        // CUSTOM ERROR - PAYMENT SUCCESSFUL, ORDER CREATED, BUT CALL TO DB FAILED TO UPDATE ORDER STATUS
        // setMessage("custom message")
        return;
      }

      setPaymentStatus("success");
      setCartItems([]);
      Cookies.set("cart", JSON.stringify([]));
      Cookies.set("userData", JSON.stringify([]));

      router.push("/checkout/payment/success");
    }

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ? error.message : "");
      } else {
        setMessage("An unexpected error occurred.");
      }

      const updateFailedOrderStatusResponse = await fetch(
        url + "/api/customer-orders",
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              orderStatus: "failed",
            },
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!updateFailedOrderStatusResponse.ok) {
        // CUSTOM ERROR - PAYMENT UNSUCCESSFUL, ORDER CREATED, BUT CALL TO DB FAILED TO UPDATE ORDER STATUS
        // setMessage("custom message")
        return;
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button
        className="button-primary mt-4"
        disabled={paymentStatus !== "idle" || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {paymentStatus === "idle" && "Pay now"}
          {paymentStatus === "loading" && "Processing payment..."}
          {paymentStatus === "success" && "Payment is successful!"}
          {paymentStatus === "error" && "Payment unsuccessful!"}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
