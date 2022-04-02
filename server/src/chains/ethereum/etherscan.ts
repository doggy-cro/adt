import { ethers } from 'ethers';
import axios from 'axios';
import dotenv from 'dotenv';

import { symbolsType, QueryCls, CONTRACTS } from './interfaces';
import { getBalanceAction } from './utils';

dotenv.config();

const etherscan_url = 'https://api.etherscan.io/api';

export async function getBalance(account: string, symbol: symbolsType | 'ETH') {
  let contractaddress;
  try {
    const action = getBalanceAction(symbol);

    if (action === 'tokenbalance') {
      contractaddress = CONTRACTS[symbol];
    }

    const query = new QueryCls(action, account, contractaddress).getQuery();
    const apiRequest = `${etherscan_url}${query}&apikey=${process.env.ETHSCAN_API_KEY}`;

    const apiResponse = await axios.get(apiRequest);
    return ethers.utils.formatEther(apiResponse['data']['result']);
  } catch (error) {
    console.log(error);
    return '';
  }
}
