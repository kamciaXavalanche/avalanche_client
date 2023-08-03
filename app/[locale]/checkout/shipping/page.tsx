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
        <div className="border border-gray-400 rounded-md px-6 py-2">
          {" "}
          {email && address ? (
            <div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h4 className="text-gray-400 w-[100px]">Kontakt:</h4>
                    <h4>{email}</h4>
                  </div>
                  <Link href="/checkout/information" className="underline">
                    Zmień
                  </Link>
                </div>
              </div>
              <hr className="my-3 border-gray-400" />
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h4 className="text-gray-400 max-w-[100px]">
                      Odbiorca dostawy:
                    </h4>
                    <h4>
                      {address}, {postcode} {city}, {country}
                    </h4>
                  </div>
                  <Link href="/checkout/information" className="underline">
                    Zmień
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/checkout/information"
              className="inline-flex gap-4 items-center hover:text-[#5E2C04] hover:brightness-150"
            >
              Wprowadź dane do wysyłki <BsArrowReturnLeft />
            </Link>
          )}
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
