import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteChainDataRecordFromServer } from '../middleware/thunks';
import '../styles/ChainData.css';
import '../styles/styles.css';

const ChainData = ({ id, address, symbol, balance }) => {
  const [wantDelete, setWantDelete] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (wantDelete) {
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
    setWantDelete(true);
  };
  const handleCancel = () => {
    setWantDelete(false);
  };

  return (
    <div className='chain-data-container'>
      <p className='error'>{message}</p>
      <p>address: {address}</p>
      <p>
        balance: {balance} {symbol}
      </p>
      <button onClick={handleDelete}>
        {wantDelete ? 'are you sure?' : 'delete'}
      </button>
      {wantDelete ? <button onClick={handleCancel}>cancel</button> : null}
    </div>
  );
};

export default ChainData;
