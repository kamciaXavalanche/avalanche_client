"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "../constants/constants";
import Image from "next/image";

const Product = ({ slug }) => {
  const { data, isLoading } = useQuery(["productData", slug], {
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/api/products/${slug}?populate=coverImages`
      );
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data || !data.data || !data.data.attributes) {
    return <div>Error: Failed to fetch data</div>;
  }

  const {
    brand,
    name,
    price,
    discount,
    coverImages,
    description,
    color,
    sizes,
  } = data.data.attributes;

  return (
    <div>
      <Image
        width={160}
        height={260}
        src={coverImages.data[0].attributes.url}
        alt=""
      />
      <h2>{name}</h2>
    </div>
  );
};

export default Product;
