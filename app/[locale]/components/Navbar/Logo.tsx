import Link from "next/link";
import logo from "./logo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex justify-center w-fit">
      <Image src={logo} width={180} height={70} alt="logo" />
    </Link>
  );
};

export default Logo;
