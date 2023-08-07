import CookiesPopup from "../components/CookiesPopup";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import { url } from "../constants/constants";
import Bestsellers from "../sections/Bestsellers";
import Categories from "../sections/Categories";
import { useLocale } from "next-intl";

export default async function Home() {
  const locale = useLocale();
  const res = await fetch(
    `${url}/api/products?locale=${locale}&pagination[pageSize]=8&populate=coverImages`
  );
  const products = await res.json();

  const imagesResponse = await fetch(`${url}/api/slider-images?populate=*`);
  const images = await imagesResponse.json();

  return (
    <main>
      <Slider images={images.data} />
      <CookiesPopup />
      <Newsletter />
      <Categories />
      <Bestsellers products={products.data} />
    </main>
  );
}
