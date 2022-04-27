import { useSelector } from 'react-redux';
import ChainData from './ChainData';

const ChainDataList = () => {
  const data = useSelector((state) => state.chainData);
  const assets = data.map((asset) => {
    return (
      <ChainData
        key={asset.id}
        id={asset.id}
        address={asset.address}
        symbol={asset.symbol}
        balance={asset.balance}
      />
    );
  });

  return (
    <div>
      <ul>{assets}</ul>
    </div>
  );
};

export default ChainDataList;
