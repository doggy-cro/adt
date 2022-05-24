type contractType<T extends string> = { [ethSymbolType in T]: string };

export const CONTRACTS: contractType<string> = {
  ETH: '',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  SHIB: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  OMG: '0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a',
  PPT: '0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a',
  PXT: '0xc14830E53aA344E8c14603A91229A0b925b0B262',
  HEX: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',
  DOS: '0x0A913beaD80F321E7Ac35285Ee10d9d922659cB7',
};

interface IQuery {
  module?: string;
  action: string;
  account: string;
  contractaddress?: string;
  tag?: string;
  getQuery: () => string;
}

export class QueryCls implements IQuery {
  account: string;
  action: string;
  module?: string;
  tag?: string;
  contractaddress?: string;

  constructor(
    action: string,
    account: string,
    contractaddress?: string,
    module: string = 'account',
    tag: string = 'latest'
  ) {
    this.account = account;
    this.action = action;
    this.module = module;
    this.tag = tag;
    this.contractaddress = contractaddress;
  }

  getQuery() {
    const contractAddress = this.contractaddress
      ? `&contractaddress=${this.contractaddress}`
      : '';
    return `?module=${this.module}&action=${this.action}${contractAddress}&address=${this.account}&tag=${this.tag}`;
  }
}
