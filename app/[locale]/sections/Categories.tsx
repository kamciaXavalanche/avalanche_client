import Link from "next/link";
import Komplety from "./IMG-20230703-WA0004.jpg";
import Sukienki from "./IMG-20230703-WA0006.jpg";
import { useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations("bestsellers");
  return (
    <div className="my-10 px-4 flex gap-3 items-center justify-center">
      <Link href={`/collections/${t("dresses")}`}>
        <img
          src={Sukienki.src}
          alt=""
          className="w-[200px] lg:w-[310px] h-[340px] lg:h-[440px] object-cover cursor-pointer hover:grayscale-[1] transition-all duration-500"
        />
        <h3 className="py-2 text-center text-2xl capitalize">{t("dresses")}</h3>
      </Link>
      <Link href={`/collections/${t("sets")}`}>
        <img
          src={Komplety.src}
          alt=""
          className="w-[200px] lg:w-[310px] h-[340px] lg:h-[440px] object-cover cursor-pointer hover:grayscale-[1] transition-all duration-500"
        />
        <h3 className="py-2 text-center text-2xl capitalize">{t("sets")}</h3>
      </Link>
    </div>
  );
};

export default Categories;
