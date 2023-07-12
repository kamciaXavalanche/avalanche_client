"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleNavigation = () => {
    if (localStorage.getItem("token")) {
      router.push("/favorites");
    } else {
      router.push("/dashboard");
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: "konrad",
        password: "eloeloelo",
      })
      .then((response) => {
        console.log("User profile", response);
        console.log("User profile", response.data.username);
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("username", response.data.user.username);
        handleNavigation();
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="h-[50vh] px-4 lg:px-[9rem] flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-2 px-4 py-2 w-[400px]"
      >
        <h2 className="text-2xl">Login</h2>
        <p>Wpisz swój e-mail i hasło</p>
        <input className="input" type="text" placeholder="E-mail" />
        <input className="input" type="password" placeholder="Hasło" />
        <button className="button-primary mt-3">LOGIN</button>
        <Link href="/register">Nie masz konta? Stwórz je</Link>
      </form>
    </div>
  );
};

export default Login;
