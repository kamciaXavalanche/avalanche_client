"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    // <Image
    //   onClick={() => router.push("/")}
    //   src={logo}
    //   alt="logo"
    //   width={140}
    //   height={140}
    //   className="flex-2 text-center mx-14 transition duration-300 hover:opacity-70 cursor-pointer"
    // />
    <h1
      onClick={() => router.push("/")}
      className="text-[1.325rem] lg:text-3xl transition duration-300 hover:opacity-70 cursor-pointer"
    >
      𝒜𝓋𝒶𝓁𝒶𝓃𝒸𝒽𝑒
    </h1>
  );
};

export default Logo;
