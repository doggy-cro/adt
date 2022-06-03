export const getPrice = (symbol, prices) => {
  const obj = prices.filter((obj) => obj.symbol === symbol);
  if (!obj || !obj[0]) {
    return 0;
  }
  return obj[0].price.toFixed(4);
};
