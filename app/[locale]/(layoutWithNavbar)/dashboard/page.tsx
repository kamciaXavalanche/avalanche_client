"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "../../lib/atoms";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   const token = Cookies.get("jwtToken");
  //   setIsAuthenticated(!!token);

  //   if (token) {
  //     const decodedToken = jwt_decode(token);
  //     const { id } = decodedToken;

  //     fetch(`http://localhost:1337/api/users/${id}`)
  //       .then((response) => response.json())
  //       .then((user) => {
  //         if (user && user.username) {
  //           setUserName(user.username);
  //         } else {
  //           setUserName(""); // Ustawienie pustego imienia, jeśli użytkownik nie zostanie znaleziony
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(
  //           "Wystąpił błąd podczas pobierania danych użytkownika:",
  //           error
  //         );
  //       });
  //   }
  // }, []);

  return (
    <div className="px-6 lg:px-[18rem] py-8">
      <div className="flex items-start lg:items-center  justify-between mb-16">
        <div>
          <h2 className="text-xl font-medium mb-4">MOJE KONTO</h2>
          <p>Witaj ponownie Norbert!</p>
        </div>
        <button className="button-primary !py-1.5 text-sm !w-32  lg:!w-40">
          WYLOGUJ
        </button>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mr-8">
          {" "}
          <h3 className="text-gray-500">MOJE ZAMÓWIENIA</h3>
          <hr className="my-4 border-black/40" />
          <p>Nie złożyłeś jeszcze żadnego zamówienia.</p>
        </div>
        <div className="flex-1 mt-5 lg:mt-0">
          <h3 className="text-gray-500">ADRES DO WYSYŁKI</h3>
          <hr className="my-4  border-black/40" />
          <p>Andrzej Wydra</p>
          <p>34-400 Nowy Targ</p>
          <p>Polska</p>
          <button className="button-primary !py-2 text-sm mt-4">EDYTUJ</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
