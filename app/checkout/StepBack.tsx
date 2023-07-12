"use client";

import Link from "next/link";
import React from "react";

interface StepBackProps {
  goTo: string;
  backTo: string;
  goToLabel: string;
  backToLabel: string;
  handleSubmit: any;
}

const StepBack: React.FC<StepBackProps> = ({
  goTo,
  backTo,
  goToLabel,
  backToLabel,
  handleSubmit,
}) => {
  return (
    <div className="flex justify-between py-12">
      <Link href={`/checkout/${backTo}`}>Wróc do {backToLabel}</Link>
      <div>
        <button
          type="submit"
          className="bg-black text-white px-6 py-1 rounded-md"
        >
          Przejdź do {goToLabel}
        </button>
      </div>
    </div>
  );
};

export default StepBack;
