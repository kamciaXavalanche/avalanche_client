import Link from "next/link";
import logo from "./logo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} width={160} height={70} alt="logo" />
    </Link>
  );
};

export default Logo;
