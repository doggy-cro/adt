import _ from 'lodash';

import {
  ADD_PRICE_DATA,
  ADD_PRICE_DATA_ALL,
  EDIT_PRICE_DATA,
  DELETE_PRICE_DATA,
} from '../actions/priceActions';

export const priceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PRICE_DATA:
      return [...state, ..._.differenceWith([action.data], state, _.isEqual)];
    case ADD_PRICE_DATA_ALL:
      return [...state, ..._.differenceWith(action.data, state, _.isEqual)];
    case EDIT_PRICE_DATA:
      return state.map((item) => {
        if (item.symbol !== action.data.symbol) {
          return item;
        }
        const { symbol, price } = action.data;
        return {
          symbol,
          price,
        };
      });
    case DELETE_PRICE_DATA:
      return state.filter((data) => data.symbol !== action.data.symbol);
    default:
      return state;
  }
};
