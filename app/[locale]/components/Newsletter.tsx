import { useTranslations } from "next-intl";

const Newsletter = () => {
  const t = useTranslations("newsletter");
  return (
    <section className="flex justify-center items-center my-16 ">
      <div className="text-center">
        <h2 className="text-sm lg:text-base uppercase">{t("header")}</h2>
        <p className="py-2 text-xl lg:text-2xl font-semibold uppercase">
          {t("discount-message")} -5% {t("discount-message2")}
        </p>
        <form className="flex gap-6 flex-col lg:flex-row lg:w-[600px] mt-4">
          <input
            className="input basis-[70%]"
            type="email"
            placeholder={t("input")}
          />
          <button className="button-primary basis-[30%]">{t("button")}</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
