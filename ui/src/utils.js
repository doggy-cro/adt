export const getPrice = (symbol, prices) => {
  const obj = prices.filter((obj) => obj.symbol === symbol);
  return obj[0].price;
};
