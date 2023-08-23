"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { url } from "../constants/constants";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const t = useTranslations("newsletter");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Twój kod do wysyłania POST requestu
    try {
      const response = await fetch(url + "/api/email-lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            emailUser: email,
          },
        }),
      });

      if (response.ok) {
        // Tutaj możesz obsłużyć sukces, np. wyświetlić komunikat
        alert("E-mail submitted successfully!");
        setEmail("");
      } else {
        // Obsługa błędu, np. wyświetlenie komunikatu o błędzie
        alert("Error submitting e-mail");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <section className="flex justify-center items-center my-16 ">
      <div className="text-center">
        <h2 className="text-sm lg:text-base uppercase">{t("header")}</h2>
        <p className="py-2 text-xl lg:text-2xl font-semibold uppercase">
          {t("discount-message")} -5% {t("discount-message2")}
        </p>
        <form
          className="flex gap-6 flex-col lg:flex-row lg:w-[600px] mt-4"
          onSubmit={onSubmitHandler}
        >
          <input
            className="input basis-[70%]"
            type="email"
            required
            placeholder={t("input")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button-primary basis-[30%]" type="submit">
            {t("button")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
