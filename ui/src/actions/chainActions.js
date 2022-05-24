export const ADD_CHAIN_DATA = 'chain/add';
export const ADD_CHAIN_DATA_ALL = 'chain/add/all';
export const EDIT_CHAIN_DATA = 'chain/edit';
export const DELETE_CHAIN_DATA = 'chain/delete';

export const addChainData = ({ id, chain, account, symbol, balance }) => ({
  type: ADD_CHAIN_DATA,
  record: {
    id,
    chain,
    account,
    symbol,
    balance,
  },
});

export const addChainDataAll = (data) => ({
  type: ADD_CHAIN_DATA_ALL,
  record: data,
});

export const editChainData = ({ chain, account, symbol }) => ({
  type: EDIT_CHAIN_DATA,
  record: {
    chain,
    account,
    symbol,
  },
});

export const deleteChainData = (id) => ({
  type: DELETE_CHAIN_DATA,
  record: {
    id,
  },
});
