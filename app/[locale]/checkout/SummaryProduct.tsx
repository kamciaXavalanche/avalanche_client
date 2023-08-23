"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { calculateDiscountedPrice } from "../utils/functions";
import { url } from "../constants/constants";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (productData) {
      const test = productData.data.attributes.productAttributes;
      const znalezionyObiekt = test?.find(
        (obiekt: string) => obiekt.color === color
      );
      setProductDetails(znalezionyObiekt);
    }
  }, [productData, color]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const productPrice = productDetails
    ? calculateDiscountedPrice(productDetails.price, productDetails.discount)
    : 0;

  useEffect(() => {
    if (productDetails) {
      setCartItems((prevCartItems: any) =>
        prevCartItems.map((item: any) => {
          if (
            item.slug === slug &&
            item.size === size &&
            item.color === color
          ) {
            return { ...item, price: productPrice };
          } else {
            return item;
          }
        })
      );
    }
  }, [productPrice, slug, size, color, setCartItems, productDetails]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div className="w-28 h-28 relative">
          <img
            src={productData.data.attributes.coverImages.data[0].attributes.url}
            alt=""
            className="w-full h-full object-contain"
          />
          <div className="w-6 h-6 border border-black absolute top-0 right-0 flex items-center justify-center rounded-full bg-white text-black">
            {quantity}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2>{productData.data.attributes.name}</h2>
          <h2>Rozmiar: {size}</h2>
          <h2>Kolor: {color}</h2>
        </div>
      </div>
      <div>{productPrice}</div>
    </div>
  );
};

export default SummaryProduct;
