import ChainDataForm from './components/ChainDataForm';

import './styles/app.css';

function App() {
  return (
    <div className='app'>
      <div className='brand'>
        <p className='adt'>ADT</p>
        <p className='tracker'>tracker</p>
        <div className='line'></div>
      </div>
      <div className='board'>
        <ChainDataForm />
      </div>
    </div>
  );
}

export default App;
