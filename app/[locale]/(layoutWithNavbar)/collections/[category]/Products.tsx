"use client";

const qs = require("qs");
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "@/app/[locale]/constants/constants";
import Link from "next/link";
import { useLocale } from "next-intl";
import { calculateDiscountedPrice } from "@/app/[locale]/utils/functions";

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
    <section className="lg:px-20 py-2 lg:py-6">
      <div className="grid grid-cols-1 mg:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-4 mb-20">
        {responseData.data.map((item) => (
          <Link
            href={`/products/${item?.attributes?.slug}`}
            className=" lg:h-full lg:w-full"
          >
            <img
              className="w-full h-full object-cover lg:hover:scale-[1.03] lg:hover:shadow-sm lg:hover:shadow-black overflow-hidden transition duration-300"
              src={item?.attributes?.coverImages?.data[0]?.attributes?.url}
              alt=""
            />
            <div className="mt-2 mb-4 flex flex-col font-semibold">
              <h2 className="text-gray-600"> {item?.attributes?.name}</h2>
              <h3>
                {calculateDiscountedPrice(
                  item?.attributes.productAttributes[0].price,
                  item?.attributes.productAttributes[0].discount
                )}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
