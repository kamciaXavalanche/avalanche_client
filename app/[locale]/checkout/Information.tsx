"use client";

import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import React, { useEffect } from "react";
import { formAtom } from "../lib/atoms";
import { BsArrowReturnLeft } from "react-icons/bs";
import Cookies from "js-cookie";

const Information = () => {
  const [form, setForm] = useAtom(formAtom);

  useEffect(() => {
    const storedFormData = Cookies.get("userData");

    if (storedFormData) {
      setForm(JSON.parse(storedFormData));
    }
  }, []);

  return (
    <div className="border border-gray-400 rounded-md px-6 py-2">
      {" "}
      {form.email && form.address ? (
        <div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex">
                <h4 className="text-gray-400 w-[100px]">Kontakt:</h4>
                <h4>{form.email}</h4>
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
                  {form.address}, {form.zipCode} {form.city}, {form.country}
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
  );
};

export default Information;
