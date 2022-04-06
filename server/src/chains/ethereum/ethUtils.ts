import { CONTRACTS } from './ethTypes';

export const getContractAddress = (symbol: string) => {
  try {
    return CONTRACTS[symbol];
  } catch (error) {
    console.error("symbol not supported or doesn't exists");
    return '';
  }
};

export const getBalanceAction = (symbol: string) => {
  if (symbol === 'ETH') {
    return 'balance';
  } else {
    return 'tokenbalance';
  }
};
