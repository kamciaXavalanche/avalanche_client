import React from "react";

const Newsletter = () => {
  return (
    <section className="flex justify-center items-center my-16 ">
      <div className="text-center">
        <h2 className="text-sm lg:text-base">
          ZAPISZ SIĘ DO NASZEGO NEWSLETTERA
        </h2>
        <p className="py-2 text-xl lg:text-2xl font-semibold">
          OTRZYMASZ -25% NA ZAKUPY
        </p>
        <form className="flex gap-6 flex-col lg:flex-row lg:w-[600px] mt-4">
          <input
            className="input basis-[70%]"
            type="email"
            placeholder="Wprowadź E-mail"
          />
          <button className="button-primary basis-[30%]">subskrybuj</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
