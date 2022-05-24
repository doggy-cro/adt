import _ from 'lodash';

import {
  ADD_CHAIN_DATA,
  ADD_CHAIN_DATA_ALL,
  EDIT_CHAIN_DATA,
  DELETE_CHAIN_DATA,
} from '../actions/chainActions';

// complete chain record {id: '', chain: '', account: '', symbol: '', balance: ''}
export const chainReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CHAIN_DATA:
      return [...state, ..._.differenceWith([action.record], state, _.isEqual)];
    case ADD_CHAIN_DATA_ALL:
      return [...state, ..._.differenceWith(action.record, state, _.isEqual)];
    case EDIT_CHAIN_DATA:
      return state.map((item) => {
        if (item.id !== action.record.id) {
          return item;
        }
        const { chain, account, symbol } = action.record;
        return {
          id: item.id,
          chain,
          account,
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
