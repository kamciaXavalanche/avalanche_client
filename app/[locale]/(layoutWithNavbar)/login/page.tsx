"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticatedAtom } from "../../lib/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const Login = () => {
  const [isAuth] = useAtom(isAuthenticatedAtom);
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: credentials.identifier,
        password: credentials.password,
      })
      .then((response) => {
        console.log("User profile", response);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  // Monitorowanie zmiany wartości `isAuth` i przekierowanie na /dashboard, gdy isAuth jest true
  useEffect(() => {
    if (isAuth) {
      router.push("/dashboard");
    }
  }, [isAuth, router]);

  return (
    <div className="h-[50vh] px-4 lg:px-[9rem] flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-2 px-4 py-2 w-[400px]"
      >
        <h2 className="text-2xl">Login</h2>
        <p>Wpisz swój e-mail i hasło</p>
        <input
          onChange={(e) => {
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              identifier: e.target.value,
            }));
          }}
          className="input"
          type="text"
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
        <button className="button-primary mt-3">LOGIN</button>
        <Link href="/register">Nie masz konta? Stwórz je</Link>
      </form>
    </div>
  );
};

export default Login;
