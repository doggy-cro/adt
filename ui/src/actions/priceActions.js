export const ADD_PRICE_DATA = 'price/add';
export const ADD_PRICE_DATA_ALL = 'price/add/all';
export const EDIT_PRICE_DATA = 'price/edit';
export const DELETE_PRICE_DATA = 'price/delete';

export const addPriceData = ({ symbol, price }) => ({
  type: ADD_PRICE_DATA,
  data: {
    symbol,
    price,
  },
});

export const addPriceDataAll = (data) => ({
  type: ADD_PRICE_DATA_ALL,
  data: data,
});

export const editChainData = ({ symbol, price }) => ({
  type: EDIT_PRICE_DATA,
  data: {
    symbol,
    price,
  },
});

export const deletePriceData = (symbol) => ({
  type: DELETE_PRICE_DATA,
  data: {
    symbol,
  },
});
