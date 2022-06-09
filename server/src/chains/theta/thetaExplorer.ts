import { ethers } from 'ethers';
import axios from 'axios';

import { balanceClbType } from '../chainTypes';

const thetaexplorer_url = 'https://explorer.thetatoken.org:8443/api';

export const getBalance: balanceClbType = async <T>(
  account: string,
  symbol: string,
  address: string
): Promise<number> => {
  try {
    const apiRequest = `${thetaexplorer_url}/account/${account.trim()}`;
    const apiResponse = await axios.get(apiRequest);
    //@ts-ignore
    const thetawei = apiResponse?.data?.body?.balance?.thetawei;
    const tfuelwei = apiResponse?.data?.body?.balance?.tfuelwei;

    if (typeof thetawei === 'undefined' || typeof tfuelwei === 'undefined') {
      return -1;
    }

    let balance = -1;
    if (symbol === 'THETA')
      balance = Number(ethers.utils.formatUnits(thetawei, 18));
    if (symbol === 'TFUEL')
      balance = Number(ethers.utils.formatUnits(tfuelwei, 18));

    return balance;
  } catch (error) {
    console.error(error);
    return Number(-1);
  }
};
