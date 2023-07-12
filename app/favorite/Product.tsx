"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "../constants/constants";

const Product = ({ slug }) => {
  const { data, isLoading } = useQuery(["productData", slug], {
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/api/products/${slug}?populate=images`
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

  const { brand, name, price, discount, images, description, color, sizes } =
    data.data.attributes;

  return <div>{name}</div>;
};

export default Product;
