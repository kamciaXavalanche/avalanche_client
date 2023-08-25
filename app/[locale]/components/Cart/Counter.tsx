"use client";

import { cartAtom } from "@/app/[locale]/lib/atoms";
import { useAtom } from "jotai";
import { BiMinus, BiPlus } from "react-icons/bi";
import Cookies from "js-cookie";

interface CounterProps {
  quantity: number;
  slug: string;
}

const Counter: React.FC<CounterProps> = ({ slug, quantity, size, uuid }) => {
  const [cartItems, setCartItems] = useAtom(cartAtom);

  function decreaseCartQuantity(uuid) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.uuid === uuid)?.quantity === 1) {
        const updatedItems = currItems.filter((item) => item.uuid !== uuid);
        Cookies.set("cart", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = currItems.map((item) => {
          if (item.uuid === uuid) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        Cookies.set("cart", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  }

  function increaseCartQuantity(slug, size, uuid) {
    setCartItems((currItems) => {
      const existingItem = currItems.find(
        (item) => item.slug === slug && item.size === size && item.uuid === uuid
      );

      if (existingItem == null) {
        const updatedItems = [...currItems, { slug, size, quantity: 1, uuid }];
        Cookies.set("cart", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = currItems.map((item) => {
          if (item.slug === slug && item.size === size && item.uuid === uuid) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        Cookies.set("cart", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  }

  return (
    <div className="inline-flex items-center border border-borderColor whitespace-nowrap w-fit">
      <button
        onClick={() => decreaseCartQuantity(uuid)}
        className="py-1 px-2 lg:py-2 lg:px-3"
      >
        <BiMinus className="text-[16px]  lg:text-[18px]" />
      </button>
      <span className="w-[20px] text-center bg-transparent outline-none">
        {quantity}
      </span>
      <button
        onClick={() => increaseCartQuantity(slug, size, uuid)}
        className="py-1 px-2 lg:py-2 lg:px-3"
      >
        <BiPlus className="text-[16px] lg:text-[18px]" />
      </button>
    </div>
  );
};

export default Counter;
