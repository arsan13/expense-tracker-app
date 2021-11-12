import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import Loading from '../components/Loading';
import Index from '../Index';
import {windowWidth} from '../utils/Dimentions';
import {monthlyExpenses} from '../utils/HandleExpenses';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  // backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const ChartScreen = ({transactions}) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [months, setMonths] = useState(monthNames);
  const [expenses, setExpenses] = useState([]);

  const transformTransactions = () => {
    const response = monthlyExpenses(transactions, 2021);
    console.log({response});
    let tempMonths = [];
    let tempExpenses = [];
    monthNames.forEach((item, index) => {
      // Filter only last 6 months, subtracted by 5(but not 6) because of 0 based indexing.
      if (index > new Date().getMonth() - 5) {
        tempMonths.push(item);
        if (response.hasOwnProperty(item)) tempExpenses.push(response[item]);
        else tempExpenses.push(0);
      }
    });
    setMonths(tempMonths);
    setExpenses(tempExpenses);
  };

  const dataForCharts = {
    labels: months,
    datasets: [
      {
        data: expenses,
      },
    ],
  };

  useEffect(() => {
    transformTransactions();
  }, [transactions]);

  return (
    <View>
      <Text>Visual Representation</Text>
      {months.length > 0 && months.length !== expenses.length ? (
        <Loading />
      ) : (
        <View>
          <BarChart
            // style={graphStyle}
            data={dataForCharts}
            width={windowWidth}
            height={220}
            yAxisLabel="Rs "
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
          <LineChart
            style={{marginTop: 10}}
            data={dataForCharts}
            width={windowWidth}
            yAxisLabel="Rs "
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      )}
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({});
