function formatPrice(price: number): string {
  let formattedPrice = Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
  return formattedPrice;
}

const calculateDiscountedPrice = (price: number, discount: number) => {
  const priceFloat = parseFloat(price);
  const discountFloat = parseFloat(discount);

  if (!isNaN(priceFloat) && !isNaN(discountFloat)) {
    const discountedPrice = priceFloat - (priceFloat * discountFloat) / 100;
    return formatPrice(discountedPrice);
  }

  return price;
};

export { formatPrice, calculateDiscountedPrice };
