"use client";

import Filter from "@/app/[locale]/components/Filter/Filter";
import PriceFilter from "@/app/[locale]/components/Filter/PriceFilter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Products from "./Products";
import { url } from "../../constants/constants";
import Loader from "@/app/[locale]/components/Loader";
import ColorFilter from "../../components/Filter/ColorFilter";
import { useLocale } from "next-intl";

const SearchPage = () => {
  const [activeParams, setActiveParams] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState({
    from: 30,
    to: 900,
  });
  const locale = useLocale();

  const subcategoryArray = Object.values(subcategory).flat();

  const { data, isLoading } = useQuery(["productData", category], {
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/api/products?locale=${locale}&populate=productAttributes`
      );
      return data;
    },
  });
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    ["category", category, activeParams],
    {
      queryFn: async () => {
        const { data } = await axios.get(
          `${url}/api/categories?locale=${locale}&populate=subcategories`
        );
        return data;
      },
    }
  );

  const test =
    categoryData && categoryData.data
      ? categoryData.data.map((item) => item.attributes)
      : [];

  function getColorsFromProductAttributes(products) {
    return (
      products?.flatMap(
        (product) =>
          product?.attributes?.productAttributes?.map(
            (attribute) => attribute?.color
          ) ?? []
      ) ?? []
    );
  }

  const colorsArray = getColorsFromProductAttributes(data?.data);

  const uniqueColorsArray = Array.isArray(colorsArray)
    ? colorsArray.filter((color, index) => colorsArray.indexOf(color) === index)
    : [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-4 lg:px-[9rem] mt-5">
      <nav className="flex gap-4 mb-2 lg:mb-8">
        <div>STRONA GŁÓWNA</div>
      </nav>
      <div className=" mt-6 lg:flex gap-10 ">
        <Filter
          activeParams={activeParams}
          setActiveParams={setActiveParams}
          title="CATEGORY"
          subitems={test}
          setCategory={setCategory}
          setSubcategory={setSubcategory}
        />
        <ColorFilter
          activeParams={activeParams}
          setActiveParams={setActiveParams}
          title="COLORS"
          subitems={uniqueColorsArray}
          setColors={setColors}
        />
        <PriceFilter
          activeParams={activeParams}
          setActiveParams={setActiveParams}
          setPrice={setPrice}
          price={price}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4">
        {activeParams.map((param) => {
          return (
            <div
              onClick={() =>
                setActiveParams((prev) => prev.filter((item) => item !== param))
              }
              className="mt-4 flex  justify-between min-w-[100px] items-center bg-black text-white text-sm px-2  py-1 cursor-pointer"
            >
              <div>{param}</div>
              <div>
                <IoCloseOutline size={16} />
              </div>
            </div>
          );
        })}
      </div>
      <Products
        category={category}
        subcategory={subcategoryArray}
        price={price}
        colors={colors}
        locale={locale}
      />
    </div>
  );
};

export default SearchPage;
