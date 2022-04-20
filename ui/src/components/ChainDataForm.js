import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addChainData } from '../actions/chainActions';
import { getAddressPattern } from '../utils';
import { routes } from '../routes';

import '../styles/styles.css';
import '../styles/ChainDataForm.css';

const ChainDataForm = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    getSymbols();
  }, []);

  const getSymbols = async () => {
    const symb = [];
    const res = await fetch(routes.getSymbols);
    const data = await res.json();
    setSymbols([]);
    Object.values(data).map((item) => {
      symb.push(...item);
    });
    setSymbols([...symb]);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      address: '',
      symbol: symbols.length > 0 ? symbols[0] : '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data.symbol);
    console.log(data.address);
    dispatch(
      addChainData({
        // id: data.address,
        // address: data.address,
        // symbol: data.symbol,
        id: '0x213i0124w',
        address: '0x123',
        symbol: 'ETH',
        balance: 0,
      })
    );
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
        <button type='submit'>look on chain</button>
      </form>
    </fieldset>
  );
};

export default ChainDataForm;
