"use client";

import Counter from "./Counter";
import ProductSlider from "./ProductSlider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/lib/atoms";
import Cookies from "js-cookie";
import { useState } from "react";
import { url } from "@/app/constants/constants";
import { calculateDiscountedPrice, formatPrice } from "@/app/utils/functions";
import BuyingPopup from "@/app/components/BuyingPopup/BuyingPopup";
import Loader from "@/app/components/Loader";

const ProductPage = ({ params }) => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [choosenSize, setChoosenSize] = useState("");
  const [choosenColor, setChoosenColor] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [popup, setPopup] = useState(false);

  function increaseCartQuantity(slug: string, size: string, color: string) {
    const uuid = crypto.randomUUID();

    if (!size) {
      alert("Wybierz rozmiar");
      return;
    }

    setCartItems((currItems) => {
      const existingItem = currItems.find(
        (item) =>
          item.slug === slug && item.size === size && item.color === color
      );

      if (existingItem == null) {
        const updatedItems = [
          ...currItems,
          { slug, size, color, quantity: 1, uuid },
        ];
        Cookies.set("cart", JSON.stringify(updatedItems));
        setPopup(true);
        return updatedItems;
      } else {
        const updatedItems = currItems.map((item) => {
          if (
            item.slug === slug &&
            item.size === size &&
            item.color === color
          ) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        Cookies.set("cart", JSON.stringify(updatedItems));
        setPopup(true);
        return updatedItems;
      }
    });
  }

  const { data, isLoading } = useQuery(["productData", params.slug], {
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/api/products/${params.slug}?populate=*`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.data || !data.data.attributes) {
    return <div>Error: Failed to fetch data</div>;
  }

  const { brand, name, description, sizes, categories, subcategories } =
    data.data.attributes;

  const availabilitySizes =
    data.data.attributes.productAttributes[selectedColor].availability;

  const photos = data.data.attributes.productAttributes.flatMap(
    (item) => item.images.data
  );

  const selectedVariant = data.data.attributes.productAttributes[selectedColor];

  const price = selectedVariant.price;
  const discount = selectedVariant.discount;

  return (
    <div className="px-4 lg:pl-[9rem] lg:pr-[12rem] flex flex-col lg:flex-row gap-10 justify-between my-10">
      <div>
        <div className="mb-4">
          Strona Główna {">"} {categories?.data[0]?.attributes?.title} {">"}{" "}
          {subcategories?.data[0]?.attributes?.name}
        </div>
        <ProductSlider images={photos} />
      </div>
      <div className="basis-[35%] w-full h-full flex flex-col">
        <div className="border-b flex flex-col">
          <h2 className="pb-1">{brand}</h2>
          <h1 className="text-xl font-medium">{name}</h1>
          <span className="text-lg text-neutral-500 pt-2 pb-4">
            {discount ? (
              <>
                <span>{calculateDiscountedPrice(price, discount)} </span>
                <span className="line-through text-black/90">
                  {formatPrice(price)}
                </span>
              </>
            ) : (
              <span>{formatPrice(price)}</span>
            )}
          </span>
        </div>
        <ReactMarkdown className="pt-4 pb-1">{description}</ReactMarkdown>
        <div className="pb-1">
          {choosenColor === "" ? (
            <div>Wybierz kolor</div>
          ) : (
            <div>
              Kolor: <span className="font-medium">{choosenColor}</span>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          {data.data.attributes.productAttributes &&
            Array.isArray(data.data.attributes.productAttributes) &&
            data.data.attributes.productAttributes.map((item, index) => {
              // Sprawdzenie czy item.images.data jest zdefiniowane i czy jest tablicą
              const imageUrl =
                item.images?.data && Array.isArray(item.images.data)
                  ? item.images.data[0]?.attributes?.url
                  : null;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${
                    choosenColor !== "" &&
                    selectedColor === index &&
                    "border-2 border-black"
                  }`}
                  onClick={() => {
                    setSelectedColor(index);
                    setChoosenColor(item.color);
                  }}
                >
                  {imageUrl ? (
                    <img
                      className="w-28 h-40 object-cover"
                      src={imageUrl}
                      alt=""
                    />
                  ) : (
                    <span>Image not available</span>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <span className="py-4">Wybierz rozmiar:</span>
          <div className="flex gap-4">
            {availabilitySizes.length > 0 ? (
              availabilitySizes.map((item) => {
                if (item.size && item.quantity > 0) {
                  return (
                    <div
                      onClick={() => setChoosenSize(item.size)}
                      className={`w-14 h-7 border border-black flex items-center justify-center cursor-pointer ${
                        item.size === choosenSize && "bg-black text-white"
                      }`}
                    >
                      {item.size}
                    </div>
                  );
                }
              })
            ) : (
              <div>brak dostępnych produktów</div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            increaseCartQuantity(
              data.data.attributes.slug,
              choosenSize,
              choosenColor
            );
          }}
          className="button-secondary my-4"
        >
          dodaj do koszyka
        </button>
        <button className="button-primary">kup teraz</button>
      </div>
      {popup && <BuyingPopup setPopup={setPopup} name={name} />}
    </div>
  );
};

export default ProductPage;
