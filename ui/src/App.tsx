import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getMetadata } from './api';
import { getChainDataFromServer } from './middleware/thunks';

import ChainDataForm from './components/ChainDataForm';
import ChainDataList from './components/ChainDataList';
import Dashboard from './components/Dashboard';

import './styles/app.css';

function App() {
  const [metadata, setMetadata] = useState([]);
  const [srvMsg, setSrvMsg] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (metadata.length === 0) {
      getMetadata(setMetadata);
    }

    const getChainDataFromSrv = getChainDataFromServer(setSrvMsg, true);
    //@ts-ignore
    dispatch(getChainDataFromSrv);
  }, []);

  useEffect(() => {

    const id = setInterval(() => {
      const getChainDataFromSrv = getChainDataFromServer(setSrvMsg, true);
      //@ts-ignore
      dispatch(getChainDataFromSrv);
    }, 10000)

    return () => {
      clearInterval(id);
    }
  }, [])

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
