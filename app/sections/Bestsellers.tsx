"use client";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Bestsellers = ({ products }) => {
  const [wishlist, setWishlist] = useState([]);

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
    <section className="px-4 lg:px-[9rem] flex flex-col items-center text-center mb-20">
      <div className="my-10">
        <h2>NASZE BESTSELLERY</h2>
        <nav className="flex gap-10 list-none mt-4">
          <li className="text-2xl border-b-2 border-black cursor-pointer">
            SUKIENKI
          </li>
          <li className="text-2xl cursor-pointer">KOMPLETY</li>
        </nav>
      </div>
      <div className="w-full  grid grid-cols-1 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div
            className="w-full h-full relative cursor-pointer product"
            key={product.id}
          >
            <div
              onClick={() => handleAddToWishlist(product.attributes.slug)}
              className="absolute top-2 lg:top-4 right-2 lg:right-4 z-10"
            >
              {isProductInWishlist(product.attributes.slug) ? (
                <AiFillStar className="fill-red" size={28} />
              ) : (
                <AiOutlineStar className="fill-black/80" size={28} />
              )}
            </div>

            <Link
              href={`/products/${product.attributes.slug}`}
              className="product-img h-full"
            >
              {product.attributes?.coverImages?.data?.[0]?.attributes?.url && (
                <img
                  className="object-cover"
                  src={product.attributes.coverImages.data[0].attributes.url}
                  alt=""
                />
              )}
              {product.attributes?.coverImages?.data?.[1]?.attributes?.url && (
                <img
                  src={product.attributes.coverImages.data[1].attributes.url}
                  alt=""
                  className="rear-img object-cover"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
      <button className="button-primary mt-8 !w-fit">
        SPRAWDZ WIĘCEJ PRODUKTÓW
      </button>
    </section>
  );
};

export default Bestsellers;
