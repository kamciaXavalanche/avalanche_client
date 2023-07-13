import React from "react";

const BuyingPopup = ({ setPopup }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-screen z-50">
      <div className="w-[30%] h-[40%] bg-black text-white flex items-center justify-center relative">
        <div
          onClick={() => setPopup(false)}
          className="absolute right-4 top-4 cursor-pointer"
        >
          close
        </div>
        <h2>Hurra you have buy a item!</h2>
      </div>
    </div>
  );
};

export default BuyingPopup;
