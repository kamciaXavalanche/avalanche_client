"use client";

import { useQuery } from "@tanstack/react-query";
import Counter from "../components/Cart/Counter";
import axios from "axios";
import Cookies from "js-cookie";
import ProductPrice from "../components/ProductPrice";
import { url } from "@/app/constants/constants";
import Image from "next/image";

interface ProductProps {
  slug: string;
  quantity: number;
  color: string;
}

const Product: React.FC<ProductProps> = ({
  slug,
  quantity,
  setCartItems,
  size,
  uuid,
  color,
}) => {
  const { data: productData, isLoading } = useQuery(["productData", slug], {
    queryFn: async () => {
      const { data } = await axios.get(`${url}/api/products/${slug}`);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  function removeFromCart(uuid: number) {
    setCartItems((currItems) => {
      const updatedItems = currItems.filter((item) => item.uuid !== uuid);
      Cookies.set("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  const test = productData.data.attributes.productAttributes;

  const znalezionyObiekt = test.find((obiekt) => obiekt.color === color);

  return (
    <div className="flex gap-3 lg:gap-8">
      <div className="basis-[45%]">
        <div className="w-24 h-36 relative">
          <Image
            fill
            className="object-cover"
            src={productData.data.attributes.coverImages.data[0].attributes.url}
            alt=""
          />
        </div>
      </div>
      <div className="basis-[55%] flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">{productData.data.attributes.name}</h2>
          <h2 className="text-sm lg:">
            Rozmiar: <span className="font-medium">{size}</span>
          </h2>
          <h2 className="text-sm lg:">
            Kolor: <span className="font-medium">{color}</span>
          </h2>
          <ProductPrice
            price={znalezionyObiekt.price * quantity}
            discount={znalezionyObiekt.discount * quantity}
          />
        </div>
        <div className="flex justify-between items-center">
          <Counter slug={slug} quantity={quantity} size={size} uuid={uuid} />
          <div
            onClick={() => removeFromCart(uuid)}
            className="border-b-[1.2px] border-black  hover:border-white text-xs lg:text-sm transition duration-500 cursor-pointer"
          >
            USUŃ
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
