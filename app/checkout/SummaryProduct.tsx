"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { calculateDiscountedPrice } from "../utils/functions";
import { url } from "../constants/constants";

interface SummaryProductProps {
  slug: string;
  quantity: number;
  size: string;
  color: string;
}

const SummaryProduct: React.FC<SummaryProductProps> = ({
  slug,
  quantity,
  size,
  color,
}) => {
  const { data: productData, isLoading } = useQuery(["productData", slug], {
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/products/${slug}`);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

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
      <div>
        {calculateDiscountedPrice(
          productData.data.attributes.price,
          productData.data.attributes.discount
        )}
      </div>
    </div>
  );
};

export default SummaryProduct;
