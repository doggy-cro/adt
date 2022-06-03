import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getMetadata } from './api';
import { getChainDataFromServer, getPricesFromServer } from './middleware/thunks';

import ChainDataForm from './components/ChainDataForm';
import ChainDataList from './components/ChainDataList';
import Dashboard from './components/Dashboard';

import './styles/app.css';

function App() {
  const [metadata, setMetadata] = useState([]);
  const [srvMsg, setSrvMsg] = useState('');
  const [srvMsg2, setSrvMsg2] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect call!")
    if (metadata.length === 0) {
      getMetadata(setMetadata);
    }

    const getPricesFromSrv = getPricesFromServer(setSrvMsg2, ['eth-ethereum', 'hex-hex', 'link-chainlink', 'usdc-usd-coin']);
    //@ts-ignore
    dispatch(getPricesFromSrv);
    const getChainDataFromSrv = getChainDataFromServer(setSrvMsg);
    //@ts-ignore
    dispatch(getChainDataFromSrv);
  }, []);

  return (
    <div className='app'>
      <div className='brand'>
        <p className='adt'>ADT</p>
        <p className='tracker'>tracker</p>
        <div className='line'></div>
      </div>
      <ChainDataForm metadata={metadata}/>
      <Dashboard />
      <ChainDataList />
    </div>
  );
}

export default App;
