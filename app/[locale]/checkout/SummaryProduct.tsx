"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { calculateDiscountedPrice } from "../utils/functions";
import { url } from "../constants/constants";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

interface SummaryProductProps {
  slug: string;
  quantity: number;
  size: string;
  color: string;
  setCartItems: any;
  cartItems: any;
}

const SummaryProduct: React.FC<SummaryProductProps> = ({
  slug,
  quantity,
  size,
  color,
  setCartItems,
  cartItems,
}) => {
  const [productDetails, setProductDetails] = useState<any>(null);

  const { data: productData, isLoading } = useQuery(["productData", slug], {
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/products/${slug}`);
      return data;
    },
  });

  const productPrice = productDetails
    ? calculateDiscountedPrice(productDetails.price, productDetails.discount)
    : 0;

  useEffect(() => {
    if (!productData || isLoading) return;

    const znalezionyObiekt = productData.data.attributes.productAttributes.find(
      (obiekt: string) => obiekt.color === color
    );

    const productPrice = znalezionyObiekt
      ? calculateDiscountedPrice(
          znalezionyObiekt.price,
          znalezionyObiekt.discount
        )
      : 0;

    setProductDetails(znalezionyObiekt);

    setCartItems((prevCartItems: any) =>
      prevCartItems.map((item: any) => {
        if (item.slug === slug && item.size === size && item.color === color) {
          return { ...item, price: productPrice };
        } else {
          return item;
        }
      })
    );
    Cookies.set("cart", JSON.stringify(cartItems));
  }, [color, slug, size, productPrice, productData]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div className="w-24 h-36 relative">
          {productData ? (
            <Image
              className="w-full h-full object-cover"
              src={
                productData?.data.attributes.coverImages.data[0].attributes.url
              }
              alt="product image"
              fill
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
          <div className="w-7 h-7  border-black absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-white text-black">
            <p className="font-medium">{quantity}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium max-w-[9rem] lg:max-w-none">
            {productData?.data.attributes.name}
          </h2>
          <h2 className="inline-flex gap-2">
            Rozmiar: <p className="font-medium">{size}</p>
          </h2>
          <h2 className="inline-flex gap-2">
            Kolor: <p className="font-medium">{color}</p>
          </h2>
        </div>
      </div>
      <div className="font-medium lg:font-semibold  text-base lg:text-[17px]">
        {productPrice}
      </div>
    </div>
  );
};

export default SummaryProduct;
