import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChainDataRecordFromServer } from '../middleware/thunks';
import { getPrice } from '../utils';
import CryptoIcons from './CryptoIcons';

import '../styles/ChainData.css';

const ChainData = ({ account, content }) => {
  const [wantDelete, setWantDelete] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const prices = useSelector((state) => state.priceData);

  const handleDelete = (id) => {
    if (wantDelete === id) {
      const deleteRecordFromServer = deleteChainDataRecordFromServer(
        id,
        setMessage
      );
      dispatch(deleteRecordFromServer);
      setWantDelete(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }
    setWantDelete(id);
  };

  const handleCancel = () => {
    setWantDelete(false);
  };

  return (
    <div className='box'>
      {message ? <p className='error'>{message.message}</p> : null}
      <div className='general-data'>
        <p>chain: {content[0].chain}</p>
        <p>account: {account}</p>
      </div>
      {content.map((token) => (
        <div key={token.id} className='detailed-data'>
          <div className='balance-symbol-pair'>
            <p>
              {token.balance} {token.symbol}
            </p>
            <CryptoIcons symbol={token.symbol} />
          </div>
          <p>
            {getPrice(token.symbol, prices) > 0
              ? getPrice(token.symbol, prices)
              : 'unavailable '}
            <span className='usd'> USD</span>
          </p>
          <p>value: {token.balance * getPrice(token.symbol, prices)} USD</p>
          <button onClick={() => handleDelete(token.id)}>
            {wantDelete === token.id ? 'are you sure?' : 'delete'}
          </button>
          {wantDelete === token.id ? (
            <button onClick={handleCancel}>cancel</button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ChainData;
