"use client";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

const CookiesPopup = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cookiesAccepted = Cookies.get("cookiesAccepted");
    if (!cookiesAccepted) {
      // Show the popup after 2 seconds
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []); // Run this effect only once on initial component mount

  const handleClose = () => {
    setIsActive(false);
    Cookies.set("cookiesAccepted", true, { expires: 365 });
  };

  useEffect(() => {
    if (isActive) {
      // Prevent scrolling when the popup is active
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when the popup is closed
      document.body.style.overflow = "unset";
    }
  }, [isActive]);

  if (!isActive) {
    return null; // Return null if the popup is not active
  }

  return (
    <div
      className={`fixed inset-0 h-screen bg-black/60 z-[999] flex justify-center items-end pb-40 lg:pb-22 `}
    >
      <div className="w-[22rem] lg:w-[36rem] bg-white px-10 py-8 rounded-md">
        <div className="flex items-center justify-between my-6">
          <h3 className="font-medium text-xl">Cookies settings</h3>
          <IoMdClose
            className="cursor-pointer hover:fill-slate-300"
            size={24}
            onClick={handleClose}
          />
        </div>
        <p>
          We use cookies and similar technologies to help personalize content,
          tailor and measure ads, and provide a better experience. By clicking
          accept, you agree to this, as outlined in our Cookie Policy.
        </p>
        <button
          className="button-primary rounded-lg mt-10"
          onClick={handleClose}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiesPopup;
