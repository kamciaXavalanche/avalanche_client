"use client";

import { useState } from "react";
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
import StepBack from "../StepBack";
import { useRouter } from "next/navigation";

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
      <div className="basis-[55%] pl-[9%] pt-10">
        <Header isActive />
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex justify-between items-center mb-3">
              <h2>Kontakt</h2>
              <div>
                Masz już konto?{" "}
                <span className="underline text-primaryColor">Zaloguj się</span>
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
              <h2>Adres wysyłki</h2>
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
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 border border-black rounded-full flex items-center justify-center">
                i
              </div>
              <div>Dodaj numer domu, jeśli go posiadasz</div>
            </div>
            <div className="flex gap-4 my-4">
              <FloatingLabel
                text="Kod pocztowy"
                type="text"
                handleChange={handleZipcodeChange}
                typedValue={zipcode}
                required
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
          <StepBack
            backTo="cart"
            backToLabel="koszyka"
            goToLabel="wysyłki"
            goTo="shipping"
          />
        </form>
        <hr className="bg-black w-full h-[1.2px] " />
        <ul className="flex gap-4 py-6">
          <Link href="">Polityka zwrotu kosztów</Link>
          <Link href="">Polityka prywatności</Link>
          <Link href="">Warunki świadczenia usług</Link>
        </ul>
      </div>
      <Summary />
    </div>
  );
};

export default Information;
