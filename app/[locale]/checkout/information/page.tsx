"use client";

import { useEffect, useState } from "react";
import FloatingLabel from "../FloatingLabel";
import Summary from "../Summary";
import Link from "next/link";
import Header from "../Header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Links from "../Links";
import { useAtom } from "jotai";
import { formAtom } from "../../lib/atoms";

const Information = () => {
  const [form, setForm] = useAtom(formAtom);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedFormData = Cookies.get("userData");

    if (storedFormData) {
      setForm(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    Cookies.set("userData", JSON.stringify(form));
  }, [form]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function isFormFilled(formState: any) {
    return Object.values(formState).every((value) => value !== "");
  }
  const isFilled = isFormFilled(form);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFilled) {
      setFormError("Please fill in all required fields");
      return;
    }
    setFormError("");
    router.push("/checkout/shipping");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="lg:basis-[55%] px-6 lg:pl-[9%] pt-10">
        <Header />
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
              handleChange={handleChange}
              text="E-mail"
              type="e-mail"
              name="email"
              value={form.email}
            />
          </div>
          <div className="flex gap-4 my-4 flex-shrink">
            <FloatingLabel
              type="text"
              handleChange={handleChange}
              text="Imię"
              name="firstName"
              value={form.firstName}
            />
            <FloatingLabel
              text="Nazwisko"
              type="text"
              handleChange={handleChange}
              name="secondName"
              value={form.secondName}
            />
          </div>
          <div>
            <div className="flex flex-col gap-3 mb-3">
              <h2 className="font-semibold mt-2">Adres wysyłki</h2>
              <FloatingLabel
                handleChange={handleChange}
                type="text"
                text="Kraj/region"
                name="country"
                value={form.country}
              />
              <FloatingLabel
                handleChange={handleChange}
                type="text"
                text="Adres"
                name="address"
                value={form.address}
              />
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <AiOutlineInfoCircle size={18} />
              <div>Dodaj numer domu, jeśli go posiadasz</div>
            </div>
            <div className="flex gap-4 my-4">
              <FloatingLabel
                text="Kod pocztowy"
                type="text"
                handleChange={handleChange}
                name="zipCode"
                value={form.zipCode}
              />
              <FloatingLabel
                text="Miasto"
                type="text"
                handleChange={handleChange}
                name="city"
                value={form.city}
              />
            </div>
            <FloatingLabel
              text="Telefon"
              type="tel"
              handleChange={handleChange}
              name="phoneNumber"
              value={form.phoneNumber}
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
