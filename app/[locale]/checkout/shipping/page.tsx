"use client";

import {
  addressAtom,
  cityAtom,
  countryAtom,
  emailAtom,
  zipcodeAtom,
} from "@/app/[locale]/lib/atoms";
import { useAtomValue } from "jotai";
import Header from "../Header";
import Summary from "../Summary";
import StepBack from "../StepBack";
import { useRouter } from "next/navigation";
import { BsArrowReturnLeft } from "react-icons/bs";
import Link from "next/link";
import Links from "../Links";
import { IoIosArrowBack } from "react-icons/io";
import Information from "../Information";

const Shipping = () => {
  const email = useAtomValue(emailAtom);
  const address = useAtomValue(addressAtom);
  const postcode = useAtomValue(zipcodeAtom);
  const city = useAtomValue(cityAtom);
  const country = useAtomValue(countryAtom);
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/checkout/payment");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-14 h-screen	">
      <form
        onSubmit={handleSubmit}
        className="lg:basis-[55%] h-full px-6 lg:pl-[9%] pt-10 flex flex-col lg:justify-between "
      >
        <Header isActive />
        <Information />
        <div>
          <h3 className="text-lg font-medium my-4">Metoda wysyłki</h3>
          <div className="w-full border border-gray-400 h-16 rounded-md px-8 flex gap-2 items-center justify-between cursor-pointer">
            <div className="flex gap-3 items-center">
              <div className="w-6 h-6 flex items-center justify-center bg-black rounded-full">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <p>Kurier</p>
            </div>
            <p>Darmowa</p>
          </div>
        </div>
        <div className="flex justify-between py-12">
          <Link
            className="text-[#5E2C04] hover:brightness-150 inline-flex items-center gap-2"
            href={`/checkout/information`}
          >
            <IoIosArrowBack /> Wróc do informacji
          </Link>
          <Link
            className="bg-black text-white px-3 py-2 text-sm lg:text-base lg:px-6 lg:py-4 rounded-md hover:bg-black/80"
            href={`/checkout/payment`}
          >
            Przejdź do płatności
          </Link>
        </div>
        <Links />
      </form>
      <Summary />
    </div>
  );
};

export default Shipping;
