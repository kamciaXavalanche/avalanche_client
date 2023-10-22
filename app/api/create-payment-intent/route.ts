import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { url } from "@/app/[locale]/constants/constants";
// ADD process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const cartItemSchema = z.object({
  uuid: z.string().uuid(),
  slug: z.string(),
  size: z.string(),
  color: z.string(),
  quantity: z.number(),
});

const cartItemsSchema = z.object({
  totalPrice: z.number(),
  cartItems: z.array(cartItemSchema),
});

type CartItemSchema = z.infer<typeof cartItemSchema>;

const calculateOrderAmount = async (
  cartItems: CartItemSchema[],
  promoCode: number
) => {
  let totalAmountPLN = 0;
  const productRequests = [];

  // We create an array of fetch functions in order to be able to fetch each of the products concurrently in a batch

  for (const cartItem of cartItems) {
    productRequests.push(
      fetch(`${url}/api/products/${cartItem.slug}`).then((res) => res.json())
    );
  }

  try {
    // We fetch the products concurrently
    const products = await Promise.all(productRequests);

    // We loop over the products returned from Strapi and compare them with the products from frontend to find their price and to check whether the price matches
    // When we find the product, we match calculate the subtotal and add it to the total in PLN currency

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const cartItem = cartItems[i];

      // TODO
      // What should be compared?
      const filteredProduct = product.data.attributes.productAttributes.find(
        (filteredProduct: any) => filteredProduct.color === cartItem.color
      );

      if (filteredProduct) {
        const discount = filteredProduct.discount
          ? (filteredProduct.discount / 100) *
            filteredProduct.price *
            cartItem.quantity
          : 0;
        if (promoCode !== 0) {
          const hej = filteredProduct.price * cartItem.quantity - discount;
          totalAmountPLN += hej - hej * promoCode;
        } else {
          totalAmountPLN +=
            filteredProduct.price * cartItem.quantity - discount;
        }
      }
    }

    return totalAmountPLN;
  } catch (err) {
    return NextResponse.json({ message: "ERROR!" }, { status: 400 });
  }
};

const convertPLNToInt = (plnAmount: number) => {
  return Math.round(plnAmount * 100);
};

type PromoCuponType = {
  name: string;
  discount: number;
  totalPrice: number;
};

export async function POST(request: Request) {
  const body = await request.json();

  const response = cookies().get("promoCupon")?.value;
  const promoCupon: PromoCuponType = response
    ? JSON.parse(response)
    : { name: "", discount: 0, totalPrice: 0 };

  const parsedBody = cartItemsSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "The provided data is wrong!" },
      { status: 400 }
    );
  }

  const calculatedOrderAmount = await calculateOrderAmount(
    parsedBody.data.cartItems,
    promoCupon.discount
  );

  // const totalFromDb = convertPLNToInt(
  //   promoCupon.discount
  //     ? parsedBody.data.totalPrice -
  //         parsedBody.data.totalPrice * promoCupon.discount
  //     : parsedBody.data.totalPrice
  // );

  const test = promoCupon
    ? parsedBody.data.totalPrice -
      parsedBody.data.totalPrice * promoCupon.discount
    : parsedBody.data.totalPrice;

  console.log("calculatedOrderAmount", calculatedOrderAmount);
  console.log("parsedBody", test);
  if (calculatedOrderAmount !== test) {
    return NextResponse.json(
      {
        message:
          "The total order amount does not match the server calculated order amount!",
      },
      { status: 400 }
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: convertPLNToInt(calculatedOrderAmount),
    currency: "pln",
    payment_method_types: ["card", "blik", "p24"],
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
