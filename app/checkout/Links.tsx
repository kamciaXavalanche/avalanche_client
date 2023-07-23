import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <ul className="flex gap-4 py-6 border-t border-gray-400 ">
      <Link
        className="text-sm underline text-[#5E2C04] hover:brightness-150"
        href=""
      >
        Polityka zwrotu kosztów
      </Link>
      <Link
        className="text-sm underline text-[#5E2C04] hover:brightness-150"
        href=""
      >
        Polityka prywatności
      </Link>
      <Link
        className="text-sm underline text-[#5E2C04] hover:brightness-150"
        href=""
      >
        Warunki świadczenia usług
      </Link>
    </ul>
  );
};

export default Links;
