import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getMetadata } from './api';
import { getChainDataFromServer, getPricesFromServer } from './middleware/thunks';

import ChainDataForm from './components/ChainDataForm';
import ChainDataList from './components/ChainDataList';
import ChartsAndCalc from './components/ChartsAndCalc';

import './styles/app.css';

function App() {
  const [metadata, setMetadata] = useState([]);
  const [srvMsg, setSrvMsg] = useState('');
  const [srvMsg2, setSrvMsg2] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (metadata.length === 0) {
      getMetadata(setMetadata);
    }

    const getChainDataFromSrv = getChainDataFromServer(setSrvMsg);
    const getPricesFromSrv = getPricesFromServer(setSrvMsg2, ['eth-ethereum', 'hex-hex']);
    //@ts-ignore
    dispatch(getChainDataFromSrv);
    //@ts-ignore
    dispatch(getPricesFromSrv);
  }, []);

  return (
    <div className='app'>
      <div className='brand'>
        <p className='adt'>ADT</p>
        <p className='tracker'>tracker</p>
        <div className='line'></div>
      </div>
      <div className='form'>
        <ChainDataForm metadata={metadata}/>
      </div>
      <hr />
      <div className='dashboard'>
        <div className='cards'>
          <ChainDataList />
        </div>
        <div className='charts'>
          {/* <ChartsAndCalc /> */}
        </div>
        <div className='summary'></div>
        <div className=''></div>
      </div>
    </div>
  );
}

export default App;
