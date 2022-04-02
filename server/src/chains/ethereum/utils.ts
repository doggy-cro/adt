import { symbolsType, CONTRACTS } from './interfaces';

export const getContractAddress = (symbol: symbolsType) => {
  try {
    return CONTRACTS[symbol];
  } catch (error) {
    console.error("symbol not supported or doesn't exists");
    return '';
  }
};

export const getBalanceAction = (symbol: symbolsType) => {
  if (symbol === 'ETH') {
    return 'balance';
  } else {
    return 'tokenbalance';
  }
};
