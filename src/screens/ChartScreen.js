import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import Loading from '../components/Loading';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import {
  lastNMonthsExpenses,
  monthlyExpensesOfLastYear,
} from '../utils/HelperFunctions';
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
  const [isBarChart, setIsBarChart] = useState(false);
  const [chartWidth, setChartWidth] = useState();
  const [chartHeight, setChartHeight] = useState();
  const [monthlyExpenses, setMonthlyExpenses] = useState(null);
  const [numberOfMonths, setNumberOfMonths] = useState(12);
  const [months, setMonths] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const {landscape} = useDeviceOrientation();

  const dataForCharts = {
    labels: months,
    datasets: [
      {
        data: expenses,
      },
    ],
  };

  useEffect(() => {
    const allExpenses = monthlyExpensesOfLastYear(transactions);
    setMonthlyExpenses(allExpenses);
  }, [transactions]);

  useEffect(() => {
    if (monthlyExpenses === null) return;
    const response = lastNMonthsExpenses(monthlyExpenses, numberOfMonths);
    setMonths(response.months);
    setExpenses(response.expenses);
  }, [monthlyExpenses, numberOfMonths]);

  useEffect(() => {
    setChartWidth(landscape ? windowHeight - 20 : windowWidth - 10);
    setChartHeight(landscape ? 280 : 250);
  }, [landscape]);

  if (months.length < 1) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
      </View>
    );
  }

  return (
    <>
      {!landscape && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.buttons, styles.buttonDivider]}
              onPress={() => setIsBarChart(false)}>
              <Text style={[styles.headerText, !isBarChart && styles.active]}>
                Line Chart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setIsBarChart(true)}>
              <Text style={[styles.headerText, isBarChart && styles.active]}>
                Bar Chart
              </Text>
            </TouchableOpacity>
          </View>
          <Picker
            dropdownIconColor={textColor}
            style={{color: textColor}}
            selectedValue={numberOfMonths}
            onValueChange={(itemValue, itemIndex) =>
              setNumberOfMonths(itemValue)
            }>
            <Picker.Item label="Last 12 months" value={12} />
            <Picker.Item label="Last 9 months" value={9} />
            <Picker.Item label="Last 6 months" value={6} />
            <Picker.Item label="Last 3 months" value={3} />
          </Picker>
        </>
      )}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {isBarChart ? (
          <BarChart
            data={dataForCharts}
            width={chartWidth}
            height={chartHeight}
            yAxisLabel={'\u20B9'}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        ) : (
          <LineChart
            data={dataForCharts}
            width={chartWidth}
            yAxisLabel={'\u20B9'}
            height={chartHeight}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          />
        )}
      </View>
      {!landscape && (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{color: '#A5A5A5'}}>
            Rotate the screen for a detailed look of the chart.
          </Text>
        </View>
      )}
    </>
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
