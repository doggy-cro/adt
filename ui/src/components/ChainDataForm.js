import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { getAddressPattern } from '../utils';
import { getSymbols, saveChainData } from '../api';

import '../styles/styles.css';
import '../styles/ChainDataForm.css';

const ChainDataForm = () => {
  const [symbols, setSymbols] = useState([]);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    getSymbols(setSymbols);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      address: '',
      symbol: symbols.length > 0 ? symbols[0] : 'ETH',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const status = await saveChainData(data);
    setServerMessage(status);
    setTimeout(() => {
      setServerMessage('');
    }, 3000);
  };

  const pattern = getAddressPattern(watch('symbol'));

  return (
    <fieldset>
      <legend>fill chain data and check balance</legend>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-section'>
          <input
            {...register('address', {
              required: 'Address is required',
              pattern: {
                value: pattern,
                message: 'Wrong address format',
              },
            })}
            placeholder='type address'
          />
          <select {...register('symbol')}>
            {symbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
        <p className='error'>{errors.address?.message}</p>
        <p className={serverMessage !== 'saved.' ? 'error' : 'success'}>
          {serverMessage}
        </p>
        <button type='submit'>look on chain</button>
      </form>
    </fieldset>
  );
};

export default ChainDataForm;
