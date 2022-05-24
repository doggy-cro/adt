export type balanceClbType = <T extends string>(
  account: string,
  symbol: T,
  address: string
) => Promise<number>;

export interface IChainHandler {
  getBalance: balanceClbType;
}

export interface CoinDetailsI {
  symbol: string;
  address: string;
}

export interface ChainDetailsI {
  chain: string;
  coins: Array<CoinDetailsI>;
}
