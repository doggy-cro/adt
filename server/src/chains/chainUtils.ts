import { getBalance as ethBalance } from './ethereum/etherscan';
import { IChainHandler, balanceClbType, ChainSymbolsType } from './chainTypes';

export const chainSymbols: ChainSymbolsType = {
  ethSymbolsArray: ['ETH', 'USDC', 'USDT', 'LINK', 'SHIB', 'OMG', 'PPT', 'PXT'],
  neoSymbolsArray: ['NEO', 'FLM'],
};

class chainHandler implements IChainHandler {
  getBalance: balanceClbType;
  constructor(getBalance: balanceClbType) {
    this.getBalance = getBalance;
  }
}

export const getChainHandler = <T extends string>(symbol: T) => {
  let handler;
  if (chainSymbols.ethSymbolsArray.includes(symbol)) {
    handler = new chainHandler(ethBalance);
  } else if (chainSymbols.neoSymbolsArray.includes(symbol)) {
    handler = null;
  }
  return handler;
};
