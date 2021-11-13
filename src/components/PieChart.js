import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pie from 'react-native-pie';

const PieChart = ({categories, total}) => {
  const rupeesSymbol = '\u20B9';
  const gaugeText = `${total} ${rupeesSymbol}`;
  let data = categories.map(item => {
    let obj = {};
    obj.percentage = item.percentage;
    obj.color = item.color;
    return obj;
  });

  return (
    <View style={styles.container}>
      <Pie
        radius={90}
        innerRadius={50}
        sections={data}
        // dividerSize={2}
        backgroundColor="#ddd"
      />
      <View style={styles.gauge}>
        <Text style={styles.gaugeText}>{gaugeText}</Text>
      </View>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    width: 175,
    alignItems: 'center',
    marginBottom: 10,
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: 'gray',
    fontSize: 24,
    fontWeight: '500',
  },
});