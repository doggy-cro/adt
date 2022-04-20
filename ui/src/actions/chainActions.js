export const ADD_CHAIN_DATA = 'chain/add';
export const EDIT_CHAIN_DATA = 'chain/edit';
export const DELETE_CHAIN_DATA = 'chain/delete';

export const addChainData = ({ id, address, symbol, balance }) => ({
  type: ADD_CHAIN_DATA,
  record: {
    id,
    address,
    symbol,
    balance,
  },
});

export const editChainData = ({ address, symbol }) => ({
  type: EDIT_CHAIN_DATA,
  record: {
    address,
    symbol,
  },
});

export const deleteChainData = (id) => ({
  type: DELETE_CHAIN_DATA,
  record: {
    id,
  },
});
