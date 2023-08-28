"use client";

type Props = {
  text: string;
  type: string;
  handleChange: (param: any) => void;
  required?: boolean;
  name: string;
  value: string | number;
};

function FloatingLabel({
  text,
  type,
  name,
  handleChange,
  required,
  value,
}: Props) {
  return (
    <div className="relative flex-grow">
      <input
        autoComplete="on"
        id={text}
        className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-black bg-transparent rounded-sm border border-borderColor appearance-none focus:outline-none focus:ring-0 focus:border-primaryColor peer"
        placeholder=" "
        type={type}
        onChange={handleChange}
        required={required}
        name={name}
        value={value}
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
