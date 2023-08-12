import Logo from "@/app/[locale]/components/Navbar/Logo";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";

const SuccesPage = () => {
  return (
    <div className="px-6 py-8 flex flex-col justify-center text-center">
      <Logo />
      <div className="flex justify-center my-5 items-center gap-2">
        <BsCheckCircle size={24} />
        <h2>Dziękujęmy za złożenie zamówienia!</h2>
      </div>
      <Link href="/">
        <button className="button-primary mt-1 lg:w-[24rem]">
          Wróc do sklepu
        </button>
      </Link>
    </div>
  );
};

export default SuccesPage;
