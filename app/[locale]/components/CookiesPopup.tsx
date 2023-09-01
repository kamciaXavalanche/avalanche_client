"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookiesPopup = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cookiesAccepted = Cookies.get("cookiesAccepted");
    if (!cookiesAccepted) {
      // Show the popup after 2 seconds
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []); // Run this effect only once on initial component mount

  const handleClose = (setting: boolean) => {
    setIsActive(false);
    Cookies.set("cookiesAccepted", setting, { expires: 60 });
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
          <h3 className="font-medium text-xl text-center">Cookies settings</h3>
        </div>
        <p>
          We use cookies and similar technologies to help personalize content,
          tailor and measure ads, and provide a better experience. By clicking
          accept, you agree to this, as outlined in our{" "}
          <span className="font-medium cursor-pointer underline">
            Cookie Policy
          </span>
          .
        </p>
        <div className="flex gap-4">
          <button
            className="button-secondary rounded-lg mt-10"
            onClick={() => {
              handleClose(false);
            }}
          >
            Decline
          </button>
          <button
            className="button-primary rounded-lg mt-10"
            onClick={() => {
              handleClose(true);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesPopup;
