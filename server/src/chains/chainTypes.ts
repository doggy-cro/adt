export type balanceClbType = <T extends string>(
  account: string,
  symbol: T
) => Promise<number>;

export interface IChainHandler {
  getBalance: balanceClbType;
}

export type ChainSymbolsType = {
  readonly ethSymbolsArray: Array<string>;
  readonly neoSymbolsArray: Array<string>;
};
