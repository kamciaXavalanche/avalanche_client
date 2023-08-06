"use client";

const qs = require("qs");
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "@/app/[locale]/constants/constants";
import Link from "next/link";
import { useLocale } from "next-intl";

interface ProductsProps {
  slug: string;
}

const Products: React.FC<ProductsProps> = ({ slug }) => {
  const locale = useLocale();
  const query = qs.stringify(
    {
      populate: [
        "categories",
        "coverImages",
        "subcategories",
        "productAttributes",
      ],
      filters: {
        categories: {
          title: {
            $containsi: slug,
          },
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
        `${url}/api/products?locale=${locale}&${query}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <div>Ładowanie ...</div>;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas pobierania danych.</div>;
  }

  return (
    <div>
      <div className="lg:flex flex-wrap gap-y-16 gap-x-6 justify-center items-center my-4 lg:mb-20">
        {responseData.data.map((item) => (
          <Link
            href={`/products/${item?.attributes?.slug}`}
            className=" lg:w-[220px] lg:h-[340px]"
          >
            <img
              className="w-full h-full object-cover lg:hover:scale-[1.05] transition duration-300"
              src={item?.attributes?.coverImages?.data[0]?.attributes?.url}
              alt=""
            />
            <div className="mt-2 text-center">{item?.attributes?.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
