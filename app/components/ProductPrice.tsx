import { calculateDiscountedPrice, formatPrice } from "../utils/functions";

interface ProductPriceProps {
  price: number;
  discount: number;
  quantity?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, discount }) => {
  return (
    <p>
      {discount ? (
        <>
          <span className="font-medium">
            {calculateDiscountedPrice(price, discount)}
          </span>
          <span className="text-gray-500 line-through">
            {" "}
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span className="font-medium">{formatPrice(price)}</span>
      )}
    </p>
  );
};

export default ProductPrice;
