"use client";

import { addressAtom, emailAtom } from "@/app/lib/atoms";
import { useAtomValue } from "jotai";
import Header from "../Header";
import Summary from "../Summary";
import StepBack from "../StepBack";
import { useRouter } from "next/navigation";

const Shipping = () => {
  const email = useAtomValue(emailAtom);
  const address = useAtomValue(addressAtom);
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/checkout/payment");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <form onSubmit={handleSubmit} className="basis-[55%] pl-[9%] pt-10">
        <Header isActive />
        <div>
          {" "}
          {email && address ? (
            <div>
              {" "}
              <div>Kontakt - {email}</div>
              <div>Odbiorca - {address} </div>
            </div>
          ) : (
            <div>wprowadź dane do wysyłki</div>
          )}
        </div>
        <StepBack
          backToLabel="informacji"
          goToLabel="płatności"
          backTo="information"
          goTo="payment"
        />
      </form>
      <Summary />
    </div>
  );
};

export default Shipping;
