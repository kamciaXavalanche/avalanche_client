import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { url } from "@/app/[locale]/constants/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export async function POST(request: Request) {
  const body = await request.text();

  const headersList = headers();
  const stripeSignature = headersList.get("stripe-signature");

  if (!stripeSignature) {
    return NextResponse.json(
      { message: "No stripe signature." },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Could not construct stripe webhook event." },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object as any;

      const customerOrder = await fetch(
        url +
          `/api/customer-orders?filters[stripePaymentIntentId][$eq]=${paymentIntentSucceeded.id}`
      );

      if (!customerOrder.ok) {
        return NextResponse.json(
          {
            message: "Could not find order in DB with Stripe payment ID.",
          },
          { status: 400 }
        );
      }

      const customerOrderParsed = await customerOrder.json();

      if (
        paymentIntentSucceeded.id ===
          customerOrderParsed.data[0].attributes.stripePaymentIntentId &&
        paymentIntentSucceeded.amount ===
          customerOrderParsed.data[0].attributes.totalPrice * 100
      ) {
        const updatedStripeVerifiedResponse = await fetch(
          url + "/api/customer-orders/" + customerOrderParsed.data[0].id,
          {
            method: "PUT",
            body: JSON.stringify({
              data: {
                isStripeVerified: true,
              },
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!updatedStripeVerifiedResponse.ok) {
          return NextResponse.json(
            { message: "The isStripeVerified could not be updated." },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "The data may be falsified. Check the order." },
          { status: 400 }
        );
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("success");
}
