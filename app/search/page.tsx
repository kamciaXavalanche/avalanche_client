"use client";

import Filter from "@/app/components/Filter/Filter";
import PriceFilter from "@/app/components/Filter/PriceFilter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Products from "./Products";
import { url } from "../constants/constants";
import Loader from "@/app/components/Loader";
import ColorFilter from "../components/Filter/ColorFilter";

const FilterPage = () => {
  const [activeParams, setActiveParams] = useState([]);
  const [category, setCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState({
    from: 30,
    to: 900,
  });

  const { data, isLoading } = useQuery(["productData", category], {
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/api/products?populate=productAttributes`
      );
      return data;
    },
  });
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    ["category", category, activeParams],
    {
      queryFn: async () => {
        const { data } = await axios.get(`${url}/api/categories`);
        return data;
      },
    }
  );
  const { data: subcategoryData, isLoading: subcategoryLoading } = useQuery(
    ["subcategory"],
    {
      queryFn: async () => {
        const { data } = await axios.get(`${url}/api/subcategories`);
        return data;
      },
    }
  );

  const allCategories =
    categoryData && categoryData.data
      ? categoryData.data.map((item) => item.attributes.title)
      : [];

  const allSubcategories =
    subcategoryData && subcategoryData.data
      ? subcategoryData.data.map((item) => item.attributes.name)
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

  function getPricesFromProductAttributes(products) {
    return (
      products?.flatMap(
        (product) =>
          product?.attributes?.productAttributes?.map(
            (attribute) => attribute?.price
          ) ?? []
      ) ?? []
    );
  }

  const pricesArray = getPricesFromProductAttributes(data?.data);

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
          subitems={allCategories}
          setCategory={setCategory}
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
      <Products category={category} price={price} colors={colors} />
    </div>
  );
};

export default FilterPage;
