import React from "react";

const BuyingPopup = ({ setPopup, name }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-screen z-50 ">
      <div className="w-[30%] h-[40%] bg-white shadow-md text-black flex flex-col gap-2 px-10 items-center justify-center ">
        <h2>
          Dodałeś do koszyka <span className="font-semibold">{name}</span>
        </h2>
        <button onClick={() => setPopup(false)} className="button-primary mt-4">
          Kontynuj zakupy
        </button>
        <button className="button-secondary ">Przejdź do zamówienia</button>
      </div>
    </div>
  );
};

export default BuyingPopup;
