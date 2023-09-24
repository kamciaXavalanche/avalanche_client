"use client";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { calculateDiscountedPrice } from "../utils/functions";

const Bestsellers = ({ products }) => {
  const [wishlist, setWishlist] = useState([]);
  const t = useTranslations("bestsellers");

  useEffect(() => {
    const wishlistFromCookies = Cookies.get("wishlist");
    if (wishlistFromCookies) {
      setWishlist(JSON.parse(wishlistFromCookies));
    }
  }, []);

  const handleAddToWishlist = (slug) => {
    if (wishlist.includes(slug)) {
      const updatedWishlist = wishlist.filter(
        (wishlistSlug) => wishlistSlug !== slug
      );
      setWishlist(updatedWishlist);
      Cookies.set("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = [...wishlist, slug];
      setWishlist(updatedWishlist);
      Cookies.set("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const isProductInWishlist = (slug) => {
    return wishlist.includes(slug);
  };

  return (
    <section className="px-6 lg:px-[9rem] flex flex-col items-center text-center mb-20">
      <div className="my-6">
        <h2 className="font-medium text-lg">{t("header")}</h2>
      </div>
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-x-5 gap-y-16">
        {products.map((product) => (
          <div
            className="relative product hover:shadow-md hover:shadow-black"
            key={product.id}
          >
            <div
              onClick={() => handleAddToWishlist(product.attributes.slug)}
              className="absolute flex items-center justify-center rounded bg-white w-12 h-10 top-4 right-0 lg:right-0 z-10 cursor-pointer"
            >
              {isProductInWishlist(product.attributes.slug) ? (
                <AiFillStar className="fill-red" size={28} />
              ) : (
                <AiOutlineStar className="fill-black/80" size={28} />
              )}
            </div>
            <Link
              href={`/products/${product.attributes.slug}`}
              className="product-img w-full h-full "
            >
              <div className="w-full h-full relative">
                {product.attributes?.coverImages?.data?.[0]?.attributes
                  ?.url && (
                  <>
                    <img
                      className="object-cover w-full h-full "
                      src={
                        product.attributes.coverImages.data[0].attributes.url
                      }
                      alt=""
                    />
                    {product.attributes?.coverImages?.data?.[1]?.attributes
                      ?.url && (
                      <img
                        src={
                          product.attributes.coverImages.data[1].attributes.url
                        }
                        alt=""
                        className="rear-img object-cover"
                      />
                    )}
                  </>
                )}
              </div>
            </Link>
            <div className="w-full h-fit pl-4 my-1 text-left">
              <p className=" text-gray-600 font-medium">
                {product.attributes.name}
              </p>
              <p className="font-medium text-lg">
                {calculateDiscountedPrice(
                  product.attributes.productAttributes[0].price,
                  product.attributes.productAttributes[0].discount
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/search" className="button-primary mt-14 lg:mt-24 !w-fit">
        {t("check-more")}
      </Link>
    </section>
  );
};

export default Bestsellers;
