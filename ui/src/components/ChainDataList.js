import { useSelector } from 'react-redux';
import ChainData from './ChainData';

import '../styles/ChainDataList.css';

const ChainDataList = () => {
  const data = useSelector((state) => state.chainData);

  let groupByAccount = {};
  data.map((item) => {
    if (groupByAccount[item.account]) {
      groupByAccount[item.account] = [...groupByAccount[item.account], item];
    } else {
      groupByAccount[item.account] = [item];
    }
  });

  const boxes = Object.keys(groupByAccount).map((account) => {
    return (
      <ChainData
        key={account}
        account={account}
        content={groupByAccount[account]}
      />
    );
  });

  return <div className='chain-data-container'>{boxes}</div>;
};

export default ChainDataList;
