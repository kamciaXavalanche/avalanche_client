import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import { url } from "../constants/constants";
import Bestsellers from "../sections/Bestsellers";
import Categories from "../sections/Categories";

const layout = async ({children}) => {

    const res = await fetch(`${url}/api/categories?populate=subcategories`);
    const categories = await res.json();
    const productsResponse = await fetch(`${url}/api/products?populate=coverImages`);
    const products = await productsResponse.json();
  
    const imagesResponse = await fetch(`${url}/api/slider-images?populate=*`);
    const images = await imagesResponse.json();

  return (
    <div>
        <Navbar categories={categories.data} />
        {children}
        <Footer />
    </div>
  )
}

export default layout