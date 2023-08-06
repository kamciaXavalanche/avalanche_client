"use client";

const qs = require("qs");
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "@/app/[locale]/constants/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";

type PriceProp = {
  from: number;
  to: number;
};

interface ProductsProps {
  category: string[] | string;
  colors: string[] | string;
  subcategory: string[] | string;
  price: PriceProp;
  locale: any;
  searchQueryParam: string;
}

const Products: React.FC<ProductsProps> = ({
  category,
  subcategory,
  colors,
  price,
  locale,
  searchQueryParam,
}) => {
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
            $containsi: category,
          },
        },
        subcategories: {
          name: {
            $containsi: subcategory,
          },
        },
        productAttributes: {
          color: {
            $containsi: colors,
          },
          price: {
            $gte: price.from,
            $lt: price.to,
          },
        },
        name: {
          $containsi: searchQueryParam,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const t = useTranslations("searchPage");

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
  console.log(responseData);

  return (
    <div>
      <div className="my-6 text-center">
        {t("results")}:{" "}
        <span className="font-medium">{responseData.data.length}</span>{" "}
        {searchQueryParam && (
          <span>
            {t("for")} "{searchQueryParam}"
          </span>
        )}
      </div>
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
