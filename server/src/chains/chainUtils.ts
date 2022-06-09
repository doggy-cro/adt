import { getBalance as thetaBalance } from './theta/thetaExplorer';
import { getBalance as ethBalance } from './ethereum/etherscan';
import { IChainHandler, balanceClbType, ChainDetailsI } from './chainTypes';

export const ethereumChain: ChainDetailsI = {
  chain: 'ethereum',
  coins: [
    { symbol: 'ETH', address: '' }, // native token
    { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
    { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
    { symbol: 'LINK', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA' },
    { symbol: 'SHIB', address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE' },
    { symbol: 'OMG', address: '0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a' },
    { symbol: 'PPT', address: '0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a' },
    { symbol: 'PXT', address: '0xc14830E53aA344E8c14603A91229A0b925b0B262' },
    { symbol: 'HEX', address: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39' },
    { symbol: 'DOS', address: '0x0A913beaD80F321E7Ac35285Ee10d9d922659cB7' },
  ],
  pattern: '[a-zA-Z0-9]{42}',
};

export const thetaChain: ChainDetailsI = {
  chain: 'theta',
  coins: [
    { symbol: 'THETA', address: '' }, // native token
    { symbol: 'TFUEL', address: '' }, // native fuel token
  ],
  pattern: '[a-zA-Z0-9]{42}',
};

export const neo3Chain: ChainDetailsI = {
  chain: 'nep-3',
  coins: [
    { symbol: 'NEO', address: '' },
    { symbol: 'FLM', address: '0x' },
  ],
  pattern: '[.^*]',
};

class chainHandler implements IChainHandler {
  getBalance: balanceClbType;
  details: ChainDetailsI;

  constructor(getBalance: balanceClbType, details: ChainDetailsI) {
    this.getBalance = getBalance;
    this.details = details;
  }
}

export const getChainHandler = (chain: string) => {
  let handler;
  if (chain === 'ethereum') {
    handler = new chainHandler(ethBalance, ethereumChain);
  } else if (chain === 'theta') {
    handler = new chainHandler(thetaBalance, thetaChain);
  } else if (chain === 'nep-3') {
    handler = null;
  }
  return handler;
};
