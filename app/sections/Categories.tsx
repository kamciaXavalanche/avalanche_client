import Link from "next/link";
import Komplety from "./IMG-20230703-WA0004.jpg";
import Sukienki from "./IMG-20230703-WA0006.jpg";

const Categories = () => {
  return (
    <div className="my-10 px-4 flex gap-8 items-center justify-center">
      <Link href="/search">
        <img
          src={Sukienki.src}
          alt=""
          className="w-[200px] lg:w-[310px] h-[340px] lg:h-[440px] object-cover cursor-pointer"
        />
        <h2 className="py-2 text-center text-2xl">Sukienki</h2>
      </Link>
      <Link href="/search">
        <img
          src={Komplety.src}
          alt=""
          className="w-[200px] lg:w-[310px] h-[340px] lg:h-[440px] object-cover cursor-pointer"
        />
        <h2 className="py-2 text-center text-2xl">Komplety</h2>
      </Link>
    </div>
  );
};

export default Categories;
