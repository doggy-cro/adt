import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';

const coinpaprikaClinet = () => {
  return new CoinpaprikaAPI();
};

export const client = coinpaprikaClinet();
