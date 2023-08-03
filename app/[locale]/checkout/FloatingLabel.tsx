"use client";
import { useState } from "react";

type Props = {
  text: string;
  type: string;
  handleChange: (param: any) => void;
  typedValue: string | number;
  required?: boolean;
};

function FloatingLabel({
  text,
  type,
  handleChange,
  typedValue,
  required,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleChange(value);
  };

  return (
    <div className="relative">
      <input
        autoComplete="off"
        id={text}
        className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-black bg-transparent rounded-sm border border-borderColor appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
        placeholder=" "
        type={type}
        value={typedValue ? typedValue : inputValue}
        onChange={handleInputChange}
        required={required}
      />
      <label
        htmlFor={text}
        className="absolute text-sm text-[#888]  duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-backgroundColor  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 uppercase"
      >
        {text}
      </label>
    </div>
  );
}

export default FloatingLabel;
