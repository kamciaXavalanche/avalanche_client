"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import FloatingLabel from "../FloatingLabel";
import Summary from "../Summary";
import Link from "next/link";
import Header from "../Header";
import {
  addressAtom,
  cityAtom,
  countryAtom,
  emailAtom,
  nameAtom,
  numberAtom,
  secondNameAtom,
  zipcodeAtom,
} from "@/app/lib/atoms";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Links from "../Links";

export const metadata = {
  title: "Informacja",
  description: "Avalanche - realizacja zakupu",
};

const Information = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [name, setName] = useAtom(nameAtom);
  const [secondName, setSecondName] = useAtom(secondNameAtom);
  const [zipcode, setZipcode] = useAtom(zipcodeAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [number, setNumber] = useAtom(numberAtom);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  useEffect(() => {
    Cookies.set(
      "userData",
      JSON.stringify([
        {
          email: email,
          address: address,
          country: country,
          firstname: name,
          secondname: secondName,
          postcode: zipcode,
          city: city,
          number: number,
        },
      ])
    );
  }, [email, address, country, name, secondName, zipcode, city, number]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
  };
  const handleCountryChange = (value: string) => {
    setCountry(value);
  };
  const handleNameChange = (value: string) => {
    setName(value);
  };
  const handleSecondNameChange = (value: string) => {
    setSecondName(value);
  };
  const handleZipcodeChange = (value: string) => {
    setZipcode(value);
  };
  const handleCityChange = (value: string) => {
    setCity(value);
  };
  const handleNumberChange = (value: string) => {
    setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !email ||
      !address ||
      !country ||
      !name ||
      !secondName ||
      !zipcode ||
      !city ||
      !number
    ) {
      setFormError("Please fill in all required fields");
      return;
    }

    setFormError("");
    router.push("/checkout/shipping");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="lg:basis-[55%] px-6 lg:pl-[9%] pt-10">
        <Header isActive />
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold ">Kontakt</h2>
              <div className="text-sm">
                Masz już konto?{" "}
                <Link href="/login" className="underline text-[#5E2C04]">
                  Zaloguj się
                </Link>
              </div>
            </div>
            <FloatingLabel
              handleChange={handleEmailChange}
              typedValue={email}
              text="E-mail"
              type="e-mail"
            />
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold mt-2">Adres wysyłki</h2>
            </div>
            <FloatingLabel
              handleChange={handleCountryChange}
              typedValue={country}
              type="country"
              text="Kraj/region"
            />
            <div className="flex gap-4 my-4">
              <FloatingLabel
                type="text"
                handleChange={handleNameChange}
                typedValue={name}
                text="Imię (opcjonalnie)"
              />
              <FloatingLabel
                text="Nazwisko"
                type="text"
                handleChange={handleSecondNameChange}
                typedValue={secondName}
              />
            </div>
            <FloatingLabel
              handleChange={handleAddressChange}
              type="text"
              typedValue={address}
              text="Adres"
            />
            <div className="flex gap-2 mt-3 items-center">
              <AiOutlineInfoCircle size={18} />
              <div>Dodaj numer domu, jeśli go posiadasz</div>
            </div>
            <div className="flex gap-4 my-4">
              <FloatingLabel
                text="Kod pocztowy"
                type="text"
                handleChange={handleZipcodeChange}
                typedValue={zipcode}
              />
              <FloatingLabel
                text="Miasto"
                type="text"
                typedValue={city}
                handleChange={handleCityChange}
              />
            </div>
            <FloatingLabel
              text="Telefon"
              type="tel"
              handleChange={handleNumberChange}
              typedValue={number}
            />
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          <div className="flex justify-between py-12">
      
        <button
          type="submit"
          className="bg-black w-full text-white px-3 py-3 text-sm lg:text-base lg:px-6 lg:py-4 rounded-md hover:bg-black/80"
        >
          Przejdź do wysyłki
        </button>
    </div>
        </form>
        <Links />
      </div>
      <Summary />
    </div>
  );
};

export default Information;
