import { useTranslations } from "next-intl";

const AnnouncementBar = () => {
  const t = useTranslations("announcmentbar");

  return (
    <div className="bg-primaryColor w-full h-[35px]  flex items-center justify-center ">
      <h2 className="uppercase text-center text-xs lg:text-base font-medium tracking-wide">
        DARMOWA DOSTAWA! Zapraszamy do zakupów. ☀️
        {t("message")}
      </h2>
    </div>
  );
};

export default AnnouncementBar;
