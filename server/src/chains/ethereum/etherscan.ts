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
  symbol: string,
  address: string
): Promise<number> => {
  try {
    if (address === '0x') {
      console.error('coin not supported!');
      return -1;
    }

    const action = getBalanceAction(address);
    const query = new QueryCls(action, account.trim(), address).getQuery();
    const apiRequest = `${etherscan_url}${query}&apikey=${process.env.ETHSCAN_API_KEY}`;

    const apiResponse = await axios.get(apiRequest);

    if (apiResponse['data']['message'] === 'NOTOK') {
      return -1;
    }

    let decimal = 18;
    if (symbol === 'USDC') decimal = 6;
    if (symbol === 'HEX') decimal = 8;
    const balance = Number(
      ethers.utils.formatUnits(apiResponse['data']['result'], decimal)
    );
    return balance;
  } catch (error) {
    console.log(error);
    return Number(-1);
  }
};
