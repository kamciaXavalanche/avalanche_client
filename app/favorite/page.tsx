"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Product from "./Product";

const Favorite = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const wishlistFromCookies = Cookies.get("wishlist");
    if (wishlistFromCookies) {
      setWishlist(JSON.parse(wishlistFromCookies));
    }
  }, []);

  return (
    <div className="px-4 lg:px-[9%] py-6 flex gap-6">
      {wishlist.map((item) => (
        <Product slug={item} />
      ))}
    </div>
  );
};

export default Favorite;
