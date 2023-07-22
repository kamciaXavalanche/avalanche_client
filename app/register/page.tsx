"use client";
import axios from "axios";
import { url } from "../constants/constants";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url}/api/auth/local/register`, {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        console.log(response.data);
        Cookies.set("jwtToken", JSON.stringify(response.data.jwt));
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="h-[50vh] px-4 lg:px-[9rem] flex justify-center items-center mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 px-4 py-2 w-[400px] "
      >
        <h2 className="text-2xl">REJESTRUJ</h2>
        <p>Prosimy podaj poniższe informację</p>
        <input
          onChange={(e) => {
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              username: e.target.value,
            }));
          }}
          className="input"
          type="text"
          placeholder="Imię"
        />{" "}
        <input
          onChange={(e) => {
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              email: e.target.value,
            }));
          }}
          className="input"
          type="email"
          placeholder="E-mail"
        />
        <input
          onChange={(e) => {
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              password: e.target.value,
            }));
          }}
          className="input"
          type="password"
          placeholder="Hasło"
        />
        <button className="button-primary">STWÓRZ MOJE KONTO</button>
      </form>
    </div>
  );
};

export default Register;
