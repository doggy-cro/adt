import {
  ADD_CHAIN_DATA,
  EDIT_CHAIN_DATA,
  DELETE_CHAIN_DATA,
} from '../actions/chainActions';

// complete chain record {id: '', address: '', symbol: ''}
export const chainReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CHAIN_DATA:
      return [...state, action.record];
    case EDIT_CHAIN_DATA:
      return state.map((item) => {
        if (item.id !== action.record.address) {
          return item;
        }
        const { address, symbol } = action.record;
        return {
          id: item.id,
          address,
          symbol,
          balance: item.balance,
        };
      });
    case DELETE_CHAIN_DATA:
      return state.filter((record) => record.id !== action.record.id);
    default:
      return state;
  }
};
