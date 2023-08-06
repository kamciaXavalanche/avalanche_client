"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <h1
      onClick={() => router.push("/")}
      className="text-[1.5rem] lg:text-3xl transition duration-300 hover:opacity-70 cursor-pointer"
    >
      𝐋𝐄𝐕𝐀𝐑𝐃𝐄
    </h1>
  );
};

export default Logo;
