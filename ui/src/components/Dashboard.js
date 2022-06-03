import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const data = useSelector((state) => state.chainData);
  const prices = useSelector((state) => state.priceData);

  let pieChartData = {};
  data.map((item) => {
    let price = 0;
    prices.some((i) => {
      if (i.symbol === item.symbol) {
        price = i.price;
        return true;
      }
    });

    if (pieChartData[item.symbol] !== undefined) {
      pieChartData[item.symbol] += item.balance * price;
    } else {
      pieChartData[item.symbol] = item.balance * price;
    }
  });

  let labels = [];
  let values = [];
  Object.entries(pieChartData).map((k) => {
    labels.push(k[0]);
    values.push(k[1]);
  });
  let sum = 0;
  if (values.length > 0) {
    sum = values.reduce(function (a, b) {
      return a + b;
    });
  }

  return (
    <div className='dashboard'>
      <Plot
        data={[
          {
            values: values,
            labels: labels,
            domain: { column: 0 },
            name: '',
            hoverinfo: 'label+percent+name',
            hole: 0.7,
            type: 'pie',
            color: 'black',
          },
        ]}
        layout={{
          annotations: [{ text: sum.toFixed(2) + ' $', showarrow: false }],
          width: 400,
          height: 400,
          title: 'Value summary',
          color: 'black',
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
        }}
      />
    </div>
  );
};

export default Dashboard;
