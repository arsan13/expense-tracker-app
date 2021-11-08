import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DateTypeSelection from '../components/DateTypeSelection';
import ErrorScreen from './ErrorScreen';

const HomeScreen = ({handleToken, categories, navigation}) => {
  return (
    <>
      {categories === null ? (
        <ErrorScreen handleToken={handleToken} />
      ) : (
        <View style={styles.container}>
          <View style={styles.dates}>
            {/* <Text>Date</Text> */}
            <DateTypeSelection />
          </View>
          <View style={styles.chart}>
            <Text>Chart</Text>
            <Button
              title="Add Transaction"
              onPress={() => {
                navigation.navigate('AddTransactionScreen');
              }}
            />
          </View>
          <View style={styles.data}>
            <Text>Categories</Text>
          </View>
          {/* <Button
            title="Add Transaction"
            onPress={() => {
              navigation.navigate('AddTransactionScreen');
            }}
          /> */}
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dates: {flex: 1, backgroundColor: 'lime'},
  chart: {flex: 3, backgroundColor: 'yellow'},
  data: {flex: 4, backgroundColor: 'orange'},
});
