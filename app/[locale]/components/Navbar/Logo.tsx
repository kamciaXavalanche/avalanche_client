import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex justify-center w-fit">
      <Image src="/logo.svg" width={165} height={30} alt="logo" />
    </Link>
  );
};

export default Logo;
