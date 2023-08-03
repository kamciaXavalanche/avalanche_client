import Link from "next/link";
import React from "react";

const BuyingPopup = ({ setPopup, name }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-screen z-50 bg-black/80">
      <div className="py-10  lg:w-[30%] lg:h-[40%] bg-white shadow-md text-black flex flex-col gap-2 px-12 items-center justify-center ">
        <h2>
          Dodałeś do koszyka <span className="font-semibold">{name}</span>
        </h2>
        <button onClick={() => setPopup(false)} className="button-primary mt-4">
          Kontynuj zakupy
        </button>
        <Link href="/cart" className="button-secondary text-center">
          Przejdź do zamówienia
        </Link>
      </div>
    </div>
  );
};

export default BuyingPopup;
