import Slider from "./components/Slider";
import Newsletter from "./components/Newsletter";
import Bestsellers from "./sections/Bestsellers";
import Categories from "./sections/Categories";
import { url } from "./constants/constants";

export default async function Home() {
  const res = await fetch(`${url}/api/products?populate=coverImages`);
  const products = await res.json();

  const imagesResponse = await fetch(`${url}/api/slider-images?populate=*`);
  const images = await imagesResponse.json();

  return (
    <main>
      <Slider images={images.data} />
      <Newsletter />
      <Categories />
      <Bestsellers products={products.data} />
    </main>
  );
}
