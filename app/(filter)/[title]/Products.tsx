"use client";

const qs = require("qs");
import Logo from "@/app/components/Navbar/Logo";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductPrice from "@/app/components/ProductPrice";
import Link from "next/link";

interface ProductsProps {
  title: string;
  brand: string[];
  size: string[];
  price: number[];
}

const Products: React.FC<ProductsProps> = ({
  title,
  brand,
  size,
  price,
  category,
}) => {
  const query = qs.stringify(
    {
      populate: ["categories", "images"],
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

  const url = "http://localhost:1337/";
  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery(["productData", query], {
    queryFn: async () => {
      const { data } = await axios.get(url + "api/products?" + query);
      return data;
    },
  });

  if (isLoading) {
    return (
      <motion.div className="fixed top-0 left-0 w-full h-screen z-[999] bg-white flex justify-center items-center overflow-hidden">
        <Logo />
      </motion.div>
    );
  }

  if (isError) {
    return <div>Wystąpił błąd podczas pobierania danych.</div>;
  }

  console.log(responseData.data);

  return (
    <div className="lg:flex gap-4 justify-center items-center my-4 lg:my-20">
      {responseData.data.map((item) => (
        <Link
          href={`/products/${item?.attributes?.slug}`}
          className=" lg:w-[200px] lg:h-[300px]"
        >
          <img
            className="w-full h-full object-cover"
            src={item?.attributes?.images?.data[0]?.attributes?.url}
            alt=""
          />
          <div>{item?.attributes?.name}</div>
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
