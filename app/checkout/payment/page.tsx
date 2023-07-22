"use client";

import { useState, useEffect } from "react";
import Checkout from "../Checkout";
import Header from "../Header";
import Summary from "../Summary";
import Cookies from "js-cookie";

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const total = Cookies.get("totalPrice");
    const userData = Cookies.get("userData");
    setTotalPrice(total);
    setUserData(userData);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="basis-[55%] pl-[9%] pt-10">
        <Header />
        <div>
          {totalPrice !== null ? (
            <Checkout totalPrice={Math.round(totalPrice)} userData={userData} />
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
