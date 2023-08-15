"use client";

import ProductSlider from "./ProductSlider";
import BuyingPopup from "@/app/[locale]/components/BuyingPopup/BuyingPopup";
import Loader from "@/app/[locale]/components/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/[locale]/lib/atoms";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { url } from "@/app/[locale]/constants/constants";
import {
  calculateDiscountedPrice,
  formatPrice,
} from "@/app/[locale]/utils/functions";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProductPage = ({ params }) => {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [choosenSize, setChoosenSize] = useState("");
  const [choosenColor, setChoosenColor] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [popup, setPopup] = useState(false);
  const router = useRouter();
  const t = useTranslations("product");

  const { data, isLoading } = useQuery(["productData", params.slug], {
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/api/products/${params.slug}?populate=*`
      );
      return data;
    },
  });

  useEffect(() => {
    if (
      data &&
      data.data.attributes.productAttributes &&
      Array.isArray(data.data.attributes.productAttributes) &&
      data.data.attributes.productAttributes.length > 0
    ) {
      const defaultColor = data.data.attributes.productAttributes[0].color; // Wybierz pierwszy kolor jako domyślny
      setChoosenColor(defaultColor);
      setSelectedColor(0); // Ustaw także indeks pierwszego koloru jako wybrany
    }
    window.scrollTo(0, 0);
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  function increaseCartQuantity(slug: string, size: string, color: string) {
    const uuid = crypto.randomUUID();

    if (!color) {
      alert("Wybierz kolor");
      return;
    }

    if (!size) {
      setSizeError(true);
      setTimeout(() => {
        setSizeError(false);
      }, 1000); // Czas w milisekundach (tutaj 1000ms to 1 sekunda)
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

  function addToCart(slug: string, size: string, color: string) {
    const uuid = crypto.randomUUID();

    if (!size || !color) {
      alert("Wybierz rozmiar i kolor");
      return;
    }

    // Dodaj pojedynczy produkt do koszyka
    setCartItems((currItems) => {
      const existingItem = currItems.find(
        (item) =>
          item.slug === slug && item.size === size && item.color === color
      );

      if (existingItem == null) {
        const updatedItems = [
          ...currItems,
          { slug, size, color, quantity: 1, uuid }, // Ustawiamy quantity na 1 dla nowego produktu
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
            return { ...item, quantity: item.quantity + 1 }; // Zwiększamy quantity dla istniejącego produktu
          } else {
            return item;
          }
        });
        Cookies.set("cart", JSON.stringify(updatedItems));
        setPopup(true);
        return updatedItems;
      }
    });
    router.push("/cart");
  }

  const { brand, name, description, categories, subcategories } =
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
        <div className="mb-4 inline-flex items-center gap-1">
          <Link className="hover:font-medium " href="/">
            {t("home")}
          </Link>{" "}
          <IoIosArrowForward />
          <Link
            className="hover:font-medium "
            href={`/collections/${categories?.data[0]?.attributes?.title.toLowerCase()}`}
          >
            {categories?.data[0]?.attributes?.title}
          </Link>
          <IoIosArrowForward />
          <Link
            href={`/collections/${categories?.data[0]?.attributes?.title.toLowerCase()}/${
              subcategories?.data[0]?.attributes?.slug
            }`}
            className="font-medium"
          >
            {subcategories?.data[0]?.attributes?.name}
          </Link>
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
        <div className="pb-2">
          {choosenColor === "" ? (
            <p>{t("select-color")}:</p>
          ) : (
            <div>
              {t("color")}: <span className="font-medium">{choosenColor}</span>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          {data.data.attributes.productAttributes &&
            Array.isArray(data.data.attributes.productAttributes) &&
            data.data.attributes.productAttributes.map(
              (item, index: number) => {
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
                      <div className="w-28 h-40 relative">
                        <Image
                          className="w-full h-full object-cover"
                          src={imageUrl}
                          alt=""
                          fill
                        />
                      </div>
                    ) : (
                      <span>Image not available</span>
                    )}
                  </div>
                );
              }
            )}
        </div>
        <div className="pt-3 pb-2">
          <span className={`${sizeError && "text-red-500 font-medium"}`}>
            {t("select-size")}:
          </span>
          <div className="flex gap-4 mt-2">
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
              <div>Brak dostępnych produktów</div>
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
          {t("add-button")}
        </button>
        <button
          onClick={() => {
            addToCart(data.data.attributes.slug, choosenSize, choosenColor);
          }}
          className="button-primary"
        >
          {t("buy-button")}
        </button>
      </div>
      {popup && <BuyingPopup setPopup={setPopup} name={name} />}
    </div>
  );
};

export default ProductPage;
