"use client";

const qs = require("qs");
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "@/app/[locale]/constants/constants";
import Link from "next/link";
import { useLocale } from "next-intl";
import { calculateDiscountedPrice } from "@/app/[locale]/utils/functions";
import Loader from "@/app/[locale]/components/Loader";
import Image from "next/image";

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
        subcategories: {
          slug: {
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
    return <Loader />;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas pobierania danych.</div>;
  }

  return (
    <section className="px-2 lg:px-20 py-2 lg:py-6">
      <div className="grid grid-cols-1  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5  gap-x-4 mb-20">
        {responseData.data.map((item) => (
          <Link
            key={item?.attributes?.slug}
            href={`/products/${item?.attributes?.slug}`}
          >
            <div className="relative w-full h-[28rem] lg:h-[24rem]">
              <Image
                className="w-full h-full object-cover lg:hover:scale-[1.0115] lg:hover:shadow-sm lg:hover:shadow-black overflow-hidden transition duration-300"
                src={item?.attributes?.coverImages?.data[0]?.attributes?.url}
                alt={item?.attributes?.name}
                fill
              />
            </div>
            <div className="mt-2 mb-4 flex flex-col font-semibold text-black z-30">
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
