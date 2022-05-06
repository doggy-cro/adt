export type balanceClbType = <T extends string>(
  account: string,
  symbol: T
) => Promise<number>;

export interface IChainHandler {
  getBalance: balanceClbType;
}

export type ChainSymbolsType = {
  readonly ethereum: Array<string>;
  readonly neo3: Array<string>;
};

export type chainDataType = {
  id: string;
  address: string;
  symbol: string;
  balance: string;
};
