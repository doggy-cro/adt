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
  address?: string;

  constructor(
    action: string,
    account: string,
    address?: string,
    module: string = 'account',
    tag: string = 'latest'
  ) {
    this.account = account;
    this.action = action;
    this.module = module;
    this.tag = tag;
    this.address = address;
  }

  getQuery() {
    const address = this.address ? `&contractaddress=${this.address}` : '';
    return `?module=${this.module}&action=${this.action}${address}&address=${this.account}&tag=${this.tag}`;
  }
}
