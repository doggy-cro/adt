import ChainDataForm from './components/ChainDataForm';
import ChainDataList from './components/ChainDataList';
import ChartsAndCalc from './components/ChartsAndCalc';

import './styles/app.css';

function App() {
  return (
    <div className='app'>
      <div className='brand'>
        <p className='adt'>ADT</p>
        <p className='tracker'>tracker</p>
        <div className='line'></div>
      </div>
      <div className='form'>
        <ChainDataForm />
      </div>
      <hr />
      <div className='dashboard'>
        <div className='cards'>
          <ChainDataList />
        </div>
        <div className='charts'>
          <ChartsAndCalc />
        </div>
        <div className='summary'></div>
        <div className=''></div>
      </div>
    </div>
  );
}

export default App;
