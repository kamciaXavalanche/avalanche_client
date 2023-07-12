"use client";

import { useState, useEffect } from "react";
import Checkout from "../Checkout";
import Header from "../Header";
import Summary from "../Summary";
import Cookies from "js-cookie";

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);

  console.log(totalPrice);

  useEffect(() => {
    const total = Cookies.get("totalPrice");
    setTotalPrice(total);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="basis-[55%] pl-[9%] pt-10">
        <Header />
        <div>
          {totalPrice !== null ? (
            <Checkout totalPrice={Math.round(totalPrice)} />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
      <Summary />
    </div>
  );
};

export default Payment;
