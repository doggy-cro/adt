import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { saveChainData } from '../api';
import { getChainDataFromServer } from '../middleware/thunks';

import '../styles/styles.css';
import '../styles/ChainDataForm.css';

const ChainDataForm = ({ metadata }) => {
  const [serverMessagePost, setServerMessagePost] = useState('');
  const [serverMessageGet, setServerMessageGet] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      chain: metadata.length > 0 ? metadata[0].chain : 'ethereum',
      symbol: metadata.length > 0 ? metadata[0].coins[0] : 'ETH',
      account: '',
    },
  });

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const status = await saveChainData(data);
    const getChainDataFromSrv = getChainDataFromServer(setServerMessageGet);
    dispatch(getChainDataFromSrv);
    setServerMessagePost(status);

    setTimeout(() => {
      setServerMessagePost('');
    }, 3000);
  };

  const chainsJsx =
    metadata.length > 0 ? (
      metadata.map((item) => (
        <option key={item.chain} value={item.chain}>
          {item.chain}
        </option>
      ))
    ) : (
      <option></option>
    );

  let elements;
  const symbolsJsx =
    metadata.length > 0 ? (
      metadata.map((item) => {
        if (item.chain === watch('chain')) {
          elements = item.coins.map((coin) => (
            <option key={coin.symbol} value={coin.symbol}>
              {coin.symbol}
            </option>
          ));
        }
        return elements;
      })
    ) : (
      <option></option>
    );

  let pattern;
  if (metadata.length > 0) {
    const obj = metadata.filter((item) => item.chain === watch('chain'));
    pattern = new RegExp(obj[0].pattern);
  }

  return (
    <fieldset>
      <legend>fill chain data and check balance</legend>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-section'>
          <input
            {...register('account', {
              required: 'Account address is required',
              pattern: {
                value: pattern,
                message: 'Wrong address format',
              },
            })}
            placeholder='type account address'
          />
          <select {...register('chain')}>{chainsJsx}</select>
          <select {...register('symbol')}>{symbolsJsx}</select>
        </div>
        <p className='error'>{errors.account?.message}</p>
        <p className={serverMessagePost !== 'saved.' ? 'error' : 'success'}>
          {serverMessagePost}
        </p>
        <p className='error'>{serverMessageGet}</p>
        <button type='submit'>look on chain</button>
      </form>
    </fieldset>
  );
};

export default ChainDataForm;
