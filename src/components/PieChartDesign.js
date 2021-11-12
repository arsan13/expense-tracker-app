import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import {windowWidth} from '../utils/Dimentions';
import Loading from './Loading';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  // backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  useShadowColorFromDataset: false, // optional
};

const PieChartDesign = ({categories}) => {
  const colors = [
    'cornflowerblue',
    'chartreuse',
    'lightcoral',
    'goldenrod',
    'chocolate',
    'aquamarine',
  ];

  let data = categories.map((item, index) => {
    let obj = {};
    obj.name = item.title;
    obj.expense = item.totalExpense;
    obj.color = colors[index];
    obj.legendFontColor = '#7F7F7F';
    obj.legendFontSize = 15;
    return obj;
  });

  return (
    <>
      {data.length < 1 ? (
        <Loading />
      ) : (
        <PieChart
          data={data}
          width={windowWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={'expense'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          // center={[10, 10]}
          // absolute
        />
      )}
    </>
  );
};

export default PieChartDesign;
