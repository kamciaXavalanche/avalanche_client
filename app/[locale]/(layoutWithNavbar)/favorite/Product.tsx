"use client";
import { url } from "@/app/[locale]/constants/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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
    return <div>Loading image</div>;
  }

  if (!data || !data.data || !data.data.attributes) {
    return <div>Error: Failed to fetch data</div>;
  }

  const { name, coverImages } = data.data.attributes;

  return (
    <Link href={`/products/${slug}`}>
      <div className="w-40 h-80 relative">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src={coverImages.data[0].attributes.url}
          alt=""
        />
      </div>
      <h2 className="text-center">{name}</h2>
    </Link>
  );
};

export default Product;
