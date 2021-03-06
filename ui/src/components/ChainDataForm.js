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
    const getChainDataFromSrv = getChainDataFromServer(
      setServerMessageGet,
      false
    );
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

  let symbolsJsx;
  if (metadata.length > 0) {
    for (let i = 0; i < metadata.length; i++) {
      if (metadata[i].chain === watch('chain')) {
        symbolsJsx = metadata[i].coins.map((coin) => (
          <option key={coin.symbol} value={coin.symbol}>
            {coin.symbol}
          </option>
        ));
        break;
      }
    }
  } else {
    symbolsJsx = <option></option>;
  }

  let pattern;
  if (metadata.length > 0) {
    const obj = metadata.filter((item) => item.chain === watch('chain'));
    pattern = new RegExp(obj[0].pattern);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-container'>
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
          <button type='submit'>look on chain</button>
          <div className='info-box'>
            <p className='error'>{errors.account?.message}</p>
            <p className={serverMessagePost !== 'saved.' ? 'error' : 'success'}>
              {serverMessagePost}
            </p>
            <p className='error'>{serverMessageGet}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChainDataForm;
