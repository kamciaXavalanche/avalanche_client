import { BiMinus, BiPlus } from "react-icons/bi";

const Counter = () => {
  return (
    <div className="inline-flex items-center border border-borderColor whitespace-nowrap w-fit mt-4">
      <button className="py-4 px-3">
        <BiMinus size={18} />
      </button>
      <input
        className="w-[32px] text-center bg-transparent outline-none"
        type="text"
        defaultValue={1}
      />
      <button className="py-4 px-3">
        <BiPlus size={18} />
      </button>
    </div>
  );
};

export default Counter;
