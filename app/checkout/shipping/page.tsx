"use client";

import {
  addressAtom,
  cityAtom,
  countryAtom,
  emailAtom,
  zipcodeAtom,
} from "@/app/lib/atoms";
import { useAtomValue } from "jotai";
import Header from "../Header";
import Summary from "../Summary";
import StepBack from "../StepBack";
import { useRouter } from "next/navigation";
import { BsArrowReturnLeft } from "react-icons/bs";
import Link from "next/link";
import Links from "../Links";

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
    <div className="flex flex-col lg:flex-row gap-14">
      <form
        onSubmit={handleSubmit}
        className="basis-[55%] pl-[9%] pt-10 flex flex-col justify-between"
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
        <StepBack
          backToLabel="informacji"
          goToLabel="płatności"
          backTo="information"
          goTo="payment"
        />
        <Links />
      </form>
      <Summary />
    </div>
  );
};

export default Shipping;
