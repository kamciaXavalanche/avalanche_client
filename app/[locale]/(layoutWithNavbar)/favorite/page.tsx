"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Product from "./Product";
import Link from "next/link";

const Favorite = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const wishlistFromCookies = Cookies.get("wishlist");
    if (wishlistFromCookies) {
      setWishlist(JSON.parse(wishlistFromCookies));
    }
  }, []);

  return (
    <div className="px-4 lg:px-[9%] py-6 flex gap-6 overflow-x-auto">
      {wishlist.length > 0 ? (wishlist.map((item) => (
        <Product key={item} slug={item} />
      ))) : <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
          <p> Brak ulubionych przedmiotów</p>
          <Link href="/search" className="button-primary !w-60 text-center">Zobacz wszystkie</Link>
        </div>}
    </div>
  );
};

export default Favorite;