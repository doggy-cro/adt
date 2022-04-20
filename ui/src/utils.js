const CHAINS = {
  ETH: ['ETH', 'LINK', 'SHIB', 'USDC', 'USDT'],
  BTC: ['BTC'],
  N3: ['NEO', 'FLM'],
};

const ETH_PATTERN = /[a-zA-Z0-9]{42}/;
const BTC_PATTERN = /[.^*]/;
const N3_PATTERN = /[.^*]/;

export const getAddressPattern = (symbol) => {
  switch (_getChainFromSymbol(symbol)) {
    case 'ETH':
      return ETH_PATTERN;
    case 'BTC':
      return BTC_PATTERN;
    case 'N3':
      return N3_PATTERN;
    default:
      return /[.^*]/;
  }
};

const _getChainFromSymbol = (symbol) => {
  if (CHAINS.ETH.includes(symbol)) {
    return 'ETH';
  } else if (CHAINS.BTC.includes(symbol)) {
    return 'BTC';
  } else if (CHAINS.N3.includes(symbol)) {
    return 'N3';
  } else {
    return '';
  }
};
