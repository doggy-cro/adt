import { ethers } from 'ethers';
import axios from 'axios';
import dotenv from 'dotenv';

import { balanceClbType } from '../chainTypes';
import { QueryCls } from './ethTypes';
import { getBalanceAction, getContractAddress } from './ethUtils';

dotenv.config();

const etherscan_url = 'https://api.etherscan.io/api';

export const getBalance: balanceClbType = async <T>(
  account: string,
  symbol: string
): Promise<number> => {
  let contractaddress;
  try {
    const action = getBalanceAction(symbol);

    if (action === 'tokenbalance') {
      contractaddress = getContractAddress(symbol);
    }

    const query = new QueryCls(
      action,
      account.trim(),
      contractaddress
    ).getQuery();
    const apiRequest = `${etherscan_url}${query}&apikey=${process.env.ETHSCAN_API_KEY}`;

    const apiResponse = await axios.get(apiRequest);

    if (apiResponse['data']['message'] === 'NOTOK') {
      return -1;
    }

    const balance =
      symbol === 'USDC'
        ? Number(ethers.utils.formatUnits(apiResponse['data']['result'], 6))
        : Number(ethers.utils.formatEther(apiResponse['data']['result']));
    return balance;
  } catch (error) {
    console.log(error);
    return Number(-1);
  }
};
