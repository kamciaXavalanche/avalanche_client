"use client";

import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface StepBackProps {
  goTo: string;
  backTo: string;
  goToLabel: string;
  backToLabel: string;
  handleSubmit: any;
}

const StepBack: React.FC<StepBackProps> = ({
  backTo,
  goToLabel,
  backToLabel,
}) => {
  return (
    <div className="flex justify-between py-12">
      <Link
        className="text-[#5E2C04] hover:brightness-150 inline-flex items-center gap-2"
        href={`/checkout/${backTo}`}
      >
        <IoIosArrowBack /> Wróc do {backToLabel}
      </Link>
      <div>
        <button
          type="submit"
          className="bg-black text-white px-3 py-2 text-sm lg:text-base lg:px-6 lg:py-4 rounded-md hover:bg-black/80"
        >
          Przejdź do {goToLabel}
        </button>
      </div>
    </div>
  );
};

export default StepBack;
