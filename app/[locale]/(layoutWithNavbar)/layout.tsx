import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { url } from "../constants/constants";
import { useLocale } from "next-intl";

const layout = async ({ children }: any) => {
  const locale = useLocale();

  const res = await fetch(
    `${url}/api/categories?locale=${locale}&populate=subcategories`
  );
  const categories = await res.json();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar categories={categories.data} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
