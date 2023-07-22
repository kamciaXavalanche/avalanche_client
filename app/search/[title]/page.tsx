"use client";

import Filter from "@/app/components/Filter/Filter";
import PriceFilter from "@/app/components/Filter/PriceFilter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Products from "./Products";
import { url } from "../../constants/constants";

interface FilterPageProps {
  params: {
    title: string;
    // other properties if applicable
  };
}

const FilterPage = ({ params }: FilterPageProps) => {
  const [activeParams, setActiveParams] = useState([
    params.title.toUpperCase(),
  ]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState({
    from: 50,
    to: 1000,
  });

  const { data, isLoading } = useQuery(
    ["productData", category, activeParams],
    {
      queryFn: async () => {
        const { data } = await axios.get(`${url}/api/products`);
        return data;
      },
    }
  );
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

  console.log(allSubcategories);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const handleCategoryChange = (item) => {
    setCategory(item);
  };

  return (
    <div className="px-4 lg:px-[9rem] mt-5">
      <nav className="flex gap-4 mb-2 lg:mb-8">
        <div>STRONA GŁÓWNA</div>
        <div>{params.title.toUpperCase()}</div>
      </nav>
      <h1 className="text-xl">{params.title.toUpperCase()}</h1>
      <div className=" mt-6 lg:flex gap-10 ">
        <Filter
          activeParams={activeParams}
          setActiveParams={setActiveParams}
          title="CATEGORY"
          subitems={allCategories}
          handleChange={handleCategoryChange}
          setCategory={setCategory}
        />
        <Filter
          activeParams={activeParams}
          setActiveParams={setActiveParams}
          title="SUBCATEGORY"
          subitems={allSubcategories}
          handleChange={handleCategoryChange}
          setCategory={setCategory}
        />
        <PriceFilter
          activeParams={activeParams}
          setActiveParams={setActiveParams}
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
        title={params.title}
        brand={brand}
        size={size}
        price={price}
      />
    </div>
  );
};

export default FilterPage;
