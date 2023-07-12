"use client";
import axios from "axios";
import { url } from "../constants/constants";

const Register = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url}/api/auth/local/register`, {
        username: "konrad",
        email: "konr.jankowski@gmail.com",
        password: "eloeloelo",
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
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
        <input className="input" type="text" placeholder="Imię" />
        <input className="input" type="text" placeholder="Nazwisko" />
        <input className="input" type="email" placeholder="E-mail" />
        <input className="input" type="password" placeholder="Hasło" />
        <button className="button-primary">STWÓRZ MOJE KONTO</button>
      </form>
    </div>
  );
};

export default Register;
