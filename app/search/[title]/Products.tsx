"use client";

const qs = require("qs");
import Logo from "@/app/components/Navbar/Logo";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductPrice from "@/app/components/ProductPrice";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { url } from "@/app/constants/constants";

interface ProductsProps {
  title: string;
  brand: string[];
  size: string[];
  price: number[];
}

const Products: React.FC<ProductsProps> = ({
  title,
  size,
  price,
  category,
}) => {
  const query = qs.stringify(
    {
      populate: ["categories", "coverImages"],
      filters: {
        categories: {
          title: {
            $contains: category,
          },
        },
        // brand: {
        //   $contains: brand,
        // },
        sizes: {
          $contains: size,
        },
        price: {
          $gr: price.from,
          $lt: price.to,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery(["productData", query], {
    queryFn: async () => {
      const { data } = await axios.get(
        url + "/api/products?populate=coverImages"
      );
      // const { data } = await axios.get(url + "api/products?" + query);
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas pobierania danych.</div>;
  }

  console.log(responseData.data);

  return (
    <div className="lg:flex flex-wrap gap-y-16 gap-x-6 justify-center items-center my-4 lg:my-20">
      {responseData.data.map((item) => (
        <Link
          href={`/products/${item?.attributes?.slug}`}
          className=" lg:w-[220px] lg:h-[340px]"
        >
          <img
            className="w-full h-full object-cover hover:scale-[1.05] transition duration-300"
            src={item?.attributes?.coverImages?.data[0]?.attributes?.url}
            alt=""
          />
          <div className="mt-2">{item?.attributes?.name}</div>
          <ProductPrice
            price={item?.attributes?.price}
            discount={item?.attributes?.discount}
          />
        </Link>
      ))}
    </div>
  );
};

export default Products;
