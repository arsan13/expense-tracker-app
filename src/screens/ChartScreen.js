import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import Loading from '../components/Loading';
import {windowWidth} from '../utils/Dimentions';
import {monthlyExpenses} from '../utils/HandleExpenses';
import {textColor} from '../utils/GlobalStyle';

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
  const [isBarChart, setIsBarChart] = useState(true);
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
      {months.length > 0 && months.length !== expenses.length ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Loading />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.buttons, styles.buttonDivider]}
              onPress={() => setIsBarChart(true)}>
              <Text style={[styles.headerText, isBarChart && styles.active]}>
                Bar Chart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setIsBarChart(false)}>
              <Text style={[styles.headerText, !isBarChart && styles.active]}>
                Line Chart
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 5}}>
            {isBarChart ? (
              <BarChart
                data={dataForCharts}
                width={windowWidth - 10}
                height={250}
                yAxisLabel={'\u20B9'}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
              />
            ) : (
              <LineChart
                data={dataForCharts}
                width={windowWidth - 10}
                yAxisLabel={'\u20B9'}
                height={250}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  buttons: {
    paddingVertical: 15,
    width: '50%',
  },
  buttonDivider: {
    borderRightWidth: 1,
    borderRightColor: '#D3D3D3',
  },
  headerText: {
    fontSize: 15,
    color: textColor,
    textAlign: 'center',
  },
  active: {
    fontWeight: 'bold',
  },
});
