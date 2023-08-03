import React from "react";
import Link from "next-intl/link";
const LaunguageSwitcher = () => {
  return (
    <nav className="flex gap-4 justify-center mt-4">
      <Link
        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-400"
        href="/"
        locale="pl"
      >
        PL
      </Link>
      <Link
        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-400"
        href="/"
        locale="en"
      >
        EN
      </Link>
    </nav>
  );
};

export default LaunguageSwitcher;
