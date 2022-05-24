import { CONTRACTS } from './ethTypes';

export const getContractAddress = (symbol: string) => {
  try {
    return CONTRACTS[symbol];
  } catch (error) {
    console.error("symbol not supported or doesn't exists");
    return '';
  }
};

export const getBalanceAction = (address: string) => {
  if (address === '0x') {
    return '0x';
  } else if (address === '') {
    return 'balance';
  } else {
    return 'tokenbalance';
  }
};
