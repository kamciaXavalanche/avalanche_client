import { useState } from "react";

interface Cupon {
  cuponName: string;
  discount: number;
}

interface PromoCodeProps {
  cupons: Cupon[];
  setCupons: React.Dispatch<React.SetStateAction<Cupon[]>>;
  activeCode: string;
  setActiveCode: React.Dispatch<React.SetStateAction<string>>;
}

function PromoCode({ activeCode, setActiveCode, cupons }: PromoCodeProps) {
  const [codeQuery, setCodeQuery] = useState("");

  function checkIfCode(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    setCodeQuery("");
    const cupon = cupons.find((c) => c.cuponName === codeQuery);
    if (cupon) {
      alert(`Your code ${cupon.cuponName} has been activated`);
      setActiveCode(cupon.cuponName);
    } else {
      alert("You entered a wrong code");
    }
  }

  function checkIfButton() {
    if (codeQuery === "" || activeCode) {
      return true;
    } else {
      return false;
    }
  }

  console.log(checkIfButton());

  return (
    <div className="flex-1">
      <h2 className="text-[color:var(--cx-color-primary)] text-[1.125rem]">
        Have a promo code?
      </h2>
      <div className="mt-2">
        <form onSubmit={checkIfCode} className="flex gap-4 ">
          <input
            value={codeQuery}
            maxLength={8}
            onChange={(e) => setCodeQuery(e.target.value)}
            className="bg-black border border-white/50 px-2 py-3  w-full lg:w-[60%] rounded-md focus:border-[color:var(--cx-color-primary)] focus:border-2 focus:outline-none	"
            type="text"
          />
          <button
            disabled={checkIfButton()}
            type="submit"
            className="bg-[color:var(--cx-color-primary)] text-black font-semibold rounded-md px-8"
          >
            Apply
          </button>
        </form>
        {activeCode && (
          <p className="text-lg text-white/80 mt-2 underline">
            Discount applied{" "}
            {cupons.find((c) => c.cuponName === activeCode)?.discount
              ? cupons.find((c) => c.cuponName === activeCode)!.discount * 100
              : 0}
            %
          </p>
        )}
      </div>
    </div>
  );
}

export default PromoCode;
