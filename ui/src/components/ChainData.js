import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChainDataRecordFromServer } from '../middleware/thunks';
import { getPrice } from '../utils';

import '../styles/ChainData.css';
// import '../styles/styles.css';

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
    <div className='chain-data-container'>
      {message ? <p className='error'>{message.message}</p> : null}
      <p>chain: {content[0].chain}</p>
      <p>account: {account}</p>
      {content.map((token) => (
        <div key={token.id}>
          <p>
            {token.balance} {token.symbol}
          </p>
          <p>{getPrice(token.symbol, prices)} USD</p>
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
