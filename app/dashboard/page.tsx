"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "../lib/atoms";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    setIsAuthenticated(!!token);

    if (token) {
      const decodedToken = jwt_decode(token);
      const { id } = decodedToken;

      fetch(`http://localhost:1337/api/users/${id}`)
        .then((response) => response.json())
        .then((user) => {
          if (user && user.username) {
            setUserName(user.username);
          } else {
            setUserName(""); // Ustawienie pustego imienia, jeśli użytkownik nie zostanie znaleziony
          }
        })
        .catch((error) => {
          console.log(
            "Wystąpił błąd podczas pobierania danych użytkownika:",
            error
          );
        });
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <p>Witaj, {userName}!</p>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </div>
  );
};

export default Page;
